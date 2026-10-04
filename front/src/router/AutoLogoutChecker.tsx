import { useEffect } from "react";
import { useLocation } from "react-router";
import { supabase } from "@/lib/supabaseClient";

export function AutoLogoutChecker() {
  const location = useLocation();

  useEffect(() => {
    // Liste des routes publiques ou non protégées où tu veux forcer la déconnexion
    const publicRoutes = ["/", "/signin", "/signup", "/landing"];

    // Si l'utilisateur navigue vers l'une de ces routes
    if (publicRoutes.includes(location.pathname)) {
      const performLogout = async () => {
        // On vérifie s'il y a une session active avant de tout nettoyer
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.signOut();
          localStorage.clear();
          console.log("Déconnexion automatique suite au passage sur une route publique");
        }
      };

      performLogout();
    }
  }, [location.pathname]); // Se déclenche à chaque changement d'URL

  return null;
}