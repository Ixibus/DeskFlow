import "./OnboardingProgressionBarStyle.css";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function OnboardingProgressionBar() {
  const activeStep = useOnboardingStore((state) => state.activeStep);

  return (
    <div 
      className="onboardingProgressionBarWrapper"
      role="region"
      aria-label="Progression de l'inscription"
    >
      <ul className="onboardingProgressionBarStyle">
        <li 
          className={`stepContainer ${activeStep >= 1 ? "is-active" : ""}`}
          aria-current={activeStep === 1 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            aria-label={`Étape 1 sur 4 : Création de compte`}
          >
            1
          </p>
          <span className="stepText">Création</span>
        </li>

        <div 
          className={`segment ${activeStep >= 2 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        <li 
          className={`stepContainer ${activeStep >= 2 ? "is-active" : ""}`}
          aria-current={activeStep === 2 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            aria-label={`Étape 2 sur 4 : Choix du site`}
          >
            2
          </p>
          <span className="stepText">Site</span>
        </li>

        <div 
          className={`segment ${activeStep >= 3 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        <li 
          className={`stepContainer ${activeStep >= 3 ? "is-active" : ""}`}
          aria-current={activeStep === 3 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            aria-label={`Étape 3 sur 4 : Choix de la formule`}
          >
            3
          </p>
          <span className="stepText">Formule</span>
        </li>

        <div 
          className={`segment ${activeStep >= 4 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        <li 
          className={`stepContainer ${activeStep >= 4 ? "is-active" : ""}`}
          aria-current={activeStep === 4 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            aria-label={`Étape 4 sur 4 : Confirmation`}
          >
            4
          </p>
          <span className="stepText">Confirmation</span>
        </li>
      </ul>
    </div>
  );
}