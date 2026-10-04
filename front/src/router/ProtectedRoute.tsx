// src/components/routes/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [, setUserRole] = useState<string | null>(null);
  const [, setUserSite] = useState<number | null>(null);

  
  useEffect(() => {
    let isMounted = true;
    
    const checkAuthAndProfile = async (session: any) => {
      
      if (!session) {
        if (isMounted) {
          setIsAuthenticated(false);
          setUserRole(null);
          setUserSite(null);
        }
        return;
      }

      // Session valide, on récupère le profil dans la table 'utilisateurs'
      const { data: userData, error } = await supabase
        .from('utilisateurs')
        .select('role, fk_site')
        .eq('id_utilisateur', session.user.id)
        .maybeSingle(); // 👈 Évite le 406 si la ligne n'existe pas encore

      if (error) {
        console.error("Erreur lors de la récupération du profil utilisateur :", error.message);
      }

      if (isMounted) {
        setIsAuthenticated(true);
        setUserRole(userData?.role || 'Membre');
        setUserSite(userData?.fk_site || null);
      }
    };

    // 1. Vérification initiale de la session
    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAuthAndProfile(session);
    });

    // 2. Écoute des changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAuthAndProfile(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Pendant qu'on vérifie la session et le profil
  if (isAuthenticated === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Vérification de l'authentification...</p>
      </div>
    );
  }

  // Si non connecté, redirection ferme vers /signin
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}