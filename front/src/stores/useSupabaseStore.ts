import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';
 
export interface UserProfile {
  id_utilisateur: string;
  login: string;
  mail: string;
  role: 'Admin' | 'Gestionnaire' | 'Membre';
  quota: number;
  fk_site: number | null;
}
 
export interface Site {
  id_site: number;
  nom: string;
  adresse: string;
  zip_code: string;
  horaire_ouverture: string;
  horaire_fermeture: string;
  total_bureaux: number;
  total_salles: number;
}
 
export interface Ressource {
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
  ressources: Ressource[];      // ressources d'UN site (membre / gestionnaire / site choisi par l'admin)
  allRessources: Ressource[];   // ressources de TOUT le réseau (admin)
  users: UserProfile[];
  fetchUsers: () => Promise<void>;
  bookRessource: (ressourceId: number, userId: string, date: string, startTime: string, endTime: string, places: number) => Promise<{ success: boolean; error?: string }>;
  signInWithLogin: (loginInput: string, passwordInput: string) => Promise<{ success: boolean; error?: string }>;
  fetchUserSession: () => Promise<void>;
  fetchSites: () => Promise<void>;
  fetchRessourcesBySite: (siteId: number) => Promise<void>;
  fetchAllRessources: () => Promise<void>;
}
 
export const useSupabaseStore = create<SupabaseStore>((set, get) => ({
  loading: false,
  currentUser: null,
  currentSite: null,
  sites: [],
  ressources: [],
  allRessources: [],
  users: [],
 
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
 
      set({ currentUser: userData });
      // Charge aussi le site rattaché (currentSite) juste après la connexion
      await get().fetchUserSession();
      set({ loading: false });
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
    const { data } = await supabase.from('sites').select('*').order('nom');
    if (data) set({ sites: data });
  },
 
  fetchRessourcesBySite: async (siteId: number) => {
    const { data } = await supabase
      .from('ressources')
      .select('*')
      .eq('fk_site', siteId)
      .order('nom_de_la_ressource');
    if (data) set({ ressources: data });
  },
 
  // Toutes les ressources du réseau (vue admin). La RLS doit autoriser ce SELECT uniquement pour l'Admin.
  fetchAllRessources: async () => {
    const { data } = await supabase
      .from('ressources')
      .select('*')
      .order('nom_de_la_ressource');
    if (data) set({ allRessources: data });
  },
 
  // Récupérer tous les utilisateurs (pour le select admin)
  fetchUsers: async () => {
    const { data, error } = await supabase.from('utilisateurs').select('*');
    if (!error && data) {
      set({ users: data });
    }
  },
 
  // Action de réservation via la RPC Supabase
bookRessource: async (ressourceId, userId, date, startTime, endTime, places) => {
    try {
      const p_heure_debut = new Date(`${date}T${startTime}:00`).toISOString();
      const p_heure_fin = new Date(`${date}T${endTime}:00`).toISOString();

      const { data, error } = await supabase.rpc("reserver_ressource", {
        p_id_ressource: ressourceId,
        p_heure_debut,
        p_heure_fin,
        p_places: places,
        p_id_utilisateur: userId, // 👈 Transmet l'ID du membre choisi par l'admin (ou l'utilisateur courant)
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data && data.success === false) {
        return { success: false, error: data.error };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Une erreur est survenue" };
    }
  },
}));