import { createClient } from "@supabase/supabase-js";

// Récupération des variables d'environnement Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Veuillez configurer VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans vos variables d'environnement (.env)");
}

// Export nommé indispensable pour correspondre à ton import { supabase }
export const supabase = createClient(supabaseUrl, supabaseAnonKey);