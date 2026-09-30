import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabaseClient";

interface OnboardingState {
  activeStep: number;
  email: string;
  login: string;
  password: string;
  confirmPassword: string;
  selectedSiteId: number | null;
  selectedFormulaId: string | null; // <--- MODIFIÉ ICI (string au lieu de number)

  // Actions
  setActiveStep: (step: number) => void;
  setSelectedSiteId: (id: number | null) => void;
  setSelectedFormulaId: (id: string | null) => void; // <--- MODIFIÉ ICI
  updateField: (field: string, value: any) => void;
  resetOnboarding: () => void;
  
  finalizeOnboarding: () => Promise<{ success: boolean; error?: string }>;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      activeStep: 1,
      email: "",
      login: "",
      password: "",
      confirmPassword: "",
      selectedSiteId: null,
      selectedFormulaId: null,

      setActiveStep: (step) => set({ activeStep: step }),
      setSelectedSiteId: (id) => set({ selectedSiteId: id }),
      setSelectedFormulaId: (id) => set({ selectedFormulaId: id }),
      updateField: (field, value) => set({ [field]: value }),

      resetOnboarding: () =>
        set({
          activeStep: 1,
          email: "",
          login: "",
          password: "",
          confirmPassword: "",
          selectedSiteId: null,
          selectedFormulaId: null,
        }),

      finalizeOnboarding: async () => {
        const state = get();

        if (!state.email || !state.password || !state.login) {
          return { success: false, error: "Informations de compte manquantes." };
        }
        if (!state.selectedSiteId) {
          return { success: false, error: "Aucun site sélectionné." };
        }
        if (!state.selectedFormulaId) {
          return { success: false, error: "Aucune formule sélectionnée." };
        }

        // Plus d'erreur ici puisque selectedFormulaId est bien une string ("Classique" / "Premium")
        let quotaValue = 0; 
        if (state.selectedFormulaId === 'Classique') {
          quotaValue = 20;
        } else if (state.selectedFormulaId === 'Premium') {
          quotaValue = 50;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: state.email,
          password: state.password,
          options: {
            data: {
              login: state.login,
            },
          },
        });

        if (authError || !authData.user) {
          return { success: false, error: authError?.message || "Erreur lors de la création du compte." };
        }

        const userId = authData.user.id;

        const { error: userTableError } = await supabase
          .from('utilisateurs')
          .insert([
            {
              id_utilisateur: userId,
              login: state.login,
              mail: state.email,
              role: 'Membre',
              quota: quotaValue
            }
          ]);

        if (userTableError) {
          return { success: false, error: "Erreur lors de la création du profil utilisateur : " + userTableError.message };
        }

        const { error: siteError } = await supabase
          .from('utilisateurs_sites')
          .insert([
            { fk_utilisateurs: userId, fk_sites: state.selectedSiteId }
          ]);

        if (siteError) {
          return { success: false, error: "Erreur lors de l'association du site : " + siteError.message };
        }

        return { success: true };
      },
    }),
    {
      name: "deskflow-onboarding-storage",
    }
  )
);