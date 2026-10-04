import { useLocation, useNavigate } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import "./navBar.css";

export default function Navbar() {
  const navigate = useNavigate();

  function navHandler(path: string) {
    navigate(path);
  }

  async function logoutHandler() {
    try {
      // 1. Déconnexion via l'API Supabase Auth
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error(
          "Erreur lors de la déconnexion Supabase :",
          error.message,
        );
        return;
      }

      // 2. Effacement complet du localStorage (et nettoyage de sécurité)
      localStorage.clear();

      console.log("déconnexion réussie + token/localStorage effacé");

      // 3. Redirection vers la page de connexion (ajusté sur /signin selon ton routeur)
      navigate("/signin", { replace: true });
    } catch (error) {
      console.error("Erreur inattendue lors de la déconnexion :", error);
    }
  }

  // Exemple dans un composant de navigation ou de Navbar
  async function handlePublicNavigation(publicPath: string) {
    // Optionnel : déconnecter proprement de Supabase si on quitte l'espace sécurisé
    await supabase.auth.signOut();
    localStorage.clear();

    // Rediriger vers la page non protégée
    navigate(publicPath);
  }

  return (
    <nav className="navBar_container">
      <div className="navBar_greeting-container">
        <div className="navBar_greeting-img" />
        <p className="navBar_greeting-text">{"login dynamique"}</p>
      </div>

      <ul className="navBar_navigation-container navBar_navigation_ressources-container">
        <li className="navBar_navigation-element">
          <div onClick={() => navHandler("/home")}>Ressources</div>
        </li>

        <li className="navBar_navigation-element navBar_navigation_reservation-container">
          <div onClick={() => navHandler("/reservation")}>Réservation</div>
        </li>
      </ul>

      <div className="navBar_logoutWrapper">
        <div
          className="navBar_logoutContainer"
          onClick={logoutHandler}
          aria-label="Se déconnecter de l'application"
          style={{ cursor: "pointer" }}
        >
          <span className="navBar_logout-text">Déconnexion</span>
          <div className="navBar_logout-img" />
        </div>
      </div>
    </nav>
  );
}
