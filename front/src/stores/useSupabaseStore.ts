import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

interface UserProfile {
  id_utilisateur: string;
  login: string;
  mail: string;
  role: 'Admin' | 'Gestionnaire' | 'Membre';
  quota: number;
  fk_site: number | null;
}

interface Site {
  id_site: number;
  nom: string;
  adresse: string;
  zip_code: string;
  horaire_ouverture: string;
  horaire_fermeture: string;
  total_bureaux: number;
  total_salles: number;
}

interface Ressource {
  id_ressource: number;
  nom_de_la_ressource: string;
  types: 'Bureau' | 'Salle';
  fk_site: number;
  capacite_totale: number;
  places_disponibles: number;
}

interface SupabaseStore {
  loading: boolean;
  currentUser: UserProfile | null;
  currentSite: Site | null;
  sites: Site[];
  ressources: Ressource[];
  
  signInWithLogin: (loginInput: string, passwordInput: string) => Promise<{ success: boolean; error?: string }>;
  fetchUserSession: () => Promise<void>;
  fetchSites: () => Promise<void>;
  fetchRessourcesBySite: (siteId: number) => Promise<void>;
}

export const useSupabaseStore = create<SupabaseStore>((set) => ({
  loading: false,
  currentUser: null,
  currentSite: null,
  sites: [],
  ressources: [],

  signInWithLogin: async (loginInput: string, passwordInput: string) => {
    set({ loading: true });
    try {
      const cleanInput = loginInput.trim();
      const { data: userData, error: fetchError } = await supabase
        .from('utilisateurs')
        .select('*')
        .or(`login.ilike.${cleanInput},mail.ilike.${cleanInput}`)
        .maybeSingle();

      if (fetchError || !userData) {
        set({ loading: false });
        return { success: false, error: "le login ou le mot de passe ne sont pas bon" };
      }

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: userData.mail,
        password: passwordInput,
      });

      if (authError) {
        set({ loading: false });
        return { success: false, error: "le login ou le mot de passe ne sont pas bon" };
      }

      set({ currentUser: userData, loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return { success: false, error: "le login ou le mot de passe ne sont pas bon" };
    }
  },

  fetchUserSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data: userProfile } = await supabase
      .from('utilisateurs')
      .select('*')
      .eq('id_utilisateur', session.user.id)
      .maybeSingle();

    if (userProfile) {
      set({ currentUser: userProfile });
      if (userProfile.fk_site) {
        const { data: siteData } = await supabase
          .from('sites')
          .select('*')
          .eq('id_site', userProfile.fk_site)
          .maybeSingle();
        if (siteData) set({ currentSite: siteData });
      }
    }
  },

  fetchSites: async () => {
    const { data } = await supabase.from('sites').select('*');
    if (data) set({ sites: data });
  },

  fetchRessourcesBySite: async (siteId: number) => {
    const { data } = await supabase
      .from('ressources')
      .select('*')
      .eq('fk_site', siteId);
    if (data) set({ ressources: data });
  },
}));