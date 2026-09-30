import { supabase } from "@/lib/supabaseClient";

interface RegisterPayload {
  email: string;
  login: string;
  password: string;
  siteId: number;
  formulaId: number;
}

export const authService = {
  async register({ email, password, login, siteId, formulaId }: RegisterPayload) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          login,
          site_id: siteId,
          formula_id: formulaId,
        },
        // URL de redirection après clic sur le lien dans le mail
        emailRedirectTo: `${window.location.origin}/login`, 
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },
};