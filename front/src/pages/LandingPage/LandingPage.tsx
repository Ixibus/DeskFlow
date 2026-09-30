import { Button } from "@/components/buttons/Buttons";
import { useNavigate } from "react-router";


import "./landingPage.css";
import { Toast } from "@/components/toast/Toast";


export default function LandingPage(): React.ReactNode {
  const navigate = useNavigate();



  return (
    <div className="landing-page_container">
      <div className="landing-page_form-container">
        <div className="landing-page_main-title-container">
          <h1 className="typo-h1 landing-page_main-title">DESKFLOW</h1>
          <h3 className="typo-body landing-page_catch-phrase">
            Gérer facilement vos réservations de coworking
          </h3>
        </div>
        <div className="landing-page_buttons-container">
          <Button
            variant="tertiary"
            buttonType="largeTallType"
            onClick={() => navigate("/signup")}
          >
            Créer un compte
          </Button>
          <Button
            buttonType="largeTallType"
            onClick={() => navigate("/signin")}
          >
            Connexion
          </Button>
        </div>
      </div>
      <Toast />
    </div>
  );
}
