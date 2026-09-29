import { useLocation, useNavigate } from "react-router";
import "./navBar.css";
import { Button } from "../buttons/Buttons";

const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  function navHandler(path: string) {
    navigate(path);
  }

  async function logoutHandler() {
    try {
      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("déconnexion réussie + token effacé");
        navigate("/connexionPage");
      } else {
        console.error("déconnexion non réussie");
      }
    } catch (error) {
      console.error("Erreur réseau lors de la déconnexion :", error);
    }
  }

  return (
    <nav className="navBar_container">
      <div className="navBar_greeting-container">
        <div className="navBar_greeting-img" />
        <p className="navBar_greeting-text">{"login dynamique"}</p>
      </div>

      <ul className="navBar_navigation-container navBar_navigation_ressources-container">
        <li className="navBar_navigation-element">
          <div onClick={() => navHandler("/homePage")}>Ressources</div>
        </li>

        <li className="navBar_navigation-element navBar_navigation_reservation-container">
          <div onClick={() => navHandler("/homePage")}>Réservation</div>
        </li>
      </ul>

      <div className="navBar_logoutWrapper">
        <div
          className="navBar_logoutContainer"
          onClick={logoutHandler}
          aria-label="Se déconnecter de l'application"
        >
          <span className="navBar_logout-text">Déconnexion</span>
          <div className="navBar_logout-img" />
        </div>
      </div>
    </nav>
  );
}
