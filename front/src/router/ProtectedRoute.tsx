// src/components/routes/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { supabase } from "@/lib/supabaseClient";

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (isMounted) {
        setIsAuthenticated(!!session);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setIsAuthenticated(!!session);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Pendant qu'on vérifie, on affiche un écran de chargement neutre (mais SANS laisser passer l'Outlet)
  if (isAuthenticated === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <p>Vérification de l'authentification...</p>
      </div>
    );
  }

  // Si c'est faux ou non connecté, redirection ferme vers /signin
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
}