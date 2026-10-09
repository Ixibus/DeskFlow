import { useEffect } from "react";
import { useLocation } from "react-router";
import { supabase } from "@/lib/supabaseClient";

export function AutoLogoutChecker() {
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/signin", "/signup", "/landing"];

    if (publicRoutes.includes(location.pathname)) {
      const performLogout = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase.auth.signOut();
          localStorage.clear();
          console.log("Déconnexion automatique suite au passage sur une route publique");
        }
      };

      performLogout();
    }
  }, [location.pathname]);

  return null;
}