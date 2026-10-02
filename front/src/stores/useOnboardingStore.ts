import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabaseClient";

interface OnboardingState {
  activeStep: number;
  email: string;
  login: string;
  password: string;
  confirmPassword: string;

  // Stockage de l'ID et des détails du site pour l'affichage récapitulatif
  selectedSiteId: number | null;
  selectedSiteName: string | null;
  selectedSiteAddress: string | null;
  selectedSiteZipCode: string | null;

  selectedFormulaId: string | null;

  // Actions
  setActiveStep: (step: number) => void;
  setSelectedSite: (
    site: {
      id_site: number;
      nom: string;
      adresse: string;
      zip_code: string;
    } | null,
  ) => void;
  setSelectedFormulaId: (id: string | null) => void;
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
      selectedSiteName: null,
      selectedSiteAddress: null,
      selectedSiteZipCode: null,
      selectedFormulaId: null,

      setActiveStep: (step) => set({ activeStep: step }),

      // Nouvelle action pour enregistrer le site complet d'un coup
      setSelectedSite: (site) =>
        set({
          selectedSiteId: site ? site.id_site : null,
          selectedSiteName: site ? site.nom : null,
          selectedSiteAddress: site ? site.adresse : null,
          selectedSiteZipCode: site ? site.zip_code : null,
        }),

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
          selectedSiteName: null,
          selectedSiteAddress: null,
          selectedSiteZipCode: null,
          selectedFormulaId: null,
        }),

      finalizeOnboarding: async () => {
        const state = get();

        if (!state.email || !state.password || !state.login) {
          return {
            success: false,
            error: "Informations de compte manquantes.",
          };
        }
        if (!state.selectedSiteId) {
          return { success: false, error: "Aucun site sélectionné." };
        }
        if (!state.selectedFormulaId) {
          return { success: false, error: "Aucune formule sélectionnée." };
        }

        let quotaValue = 0;
        if (state.selectedFormulaId === "Classique") {
          quotaValue = 20;
        } else if (state.selectedFormulaId === "Premium") {
          quotaValue = 50;
        }

        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email: state.email,
            password: state.password,
            options: {
              data: {
                login: state.login,
              },
            },
          },
        );

        if (authError || !authData.user) {
          return {
            success: false,
            error:
              authError?.message || "Erreur lors de la création du compte.",
          };
        }

        const userId = authData.user.id;

        // Utilisation de upsert pour la table utilisateurs
        const { error: userTableError } = await supabase
          .from("utilisateurs")
          .upsert(
            [
              {
                id_utilisateur: userId,
                login: state.login,
                mail: state.email,
                role: "Membre",
                quota: quotaValue,
              },
            ],
            { onConflict: "id_utilisateur" },
          );

        if (userTableError) {
          return {
            success: false,
            error:
              "Erreur lors de la création du profil utilisateur : " +
              userTableError.message,
          };
        }

        // Utilisation de upsert pour la table utilisateurs_sites avec la contrainte unique sur fk_utilisateurs
        const { error: siteError } = await supabase
          .from("utilisateurs_sites")
          .upsert(
            [{ fk_utilisateurs: userId, fk_sites: state.selectedSiteId }],
            { onConflict: "fk_utilisateurs" },
          );

        if (siteError) {
          return {
            success: false,
            error:
              "Erreur lors de l'association du site : " + siteError.message,
          };
        }

        return { success: true };
      },
    }),
    {
      name: "deskflow-onboarding-storage",
    },
  ),
);
