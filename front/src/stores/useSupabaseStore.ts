import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';

interface SupabaseStore {
  loading: boolean;
  signInWithLogin: (loginInput: string, passwordInput: string) => Promise<{ success: boolean; error?: string }>;
  // Emplacements prévus pour tes futurs appels CRUD (User, Sites, etc.)
  // ex: fetchSites: async () => {}
}

export const useSupabaseStore = create<SupabaseStore>((set) => ({
  loading: false,

  signInWithLogin: async (loginInput: string, passwordInput: string) => {
    set({ loading: true });
    try {
      // 1. Récupérer l'e-mail associé au login dans la table publique 'utilisateurs'
      const { data: userData, error: fetchError } = await supabase
        .from('utilisateurs')
        .select('mail')
        .eq('login', loginInput)
        .single();

      if (fetchError || !userData) {
        set({ loading: false });
        return { success: false, error: "le login ou le mot de passe ne sont pas bon" };
      }

      // 2. Authentifier l'utilisateur auprès de Supabase Auth avec l'e-mail trouvé et le mot de passe
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: userData.mail,
        password: passwordInput,
      });

      if (authError) {
        set({ loading: false });
        return { success: false, error: "le login ou le mot de passe ne sont pas bon" };
      }

      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      return { success: false, error: "le login ou le mot de passe ne sont pas bon" };
    }
  },
}));