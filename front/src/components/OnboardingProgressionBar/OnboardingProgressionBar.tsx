import "./OnboardingProgressionBarStyle.css";
import { useStepStore } from "@/stores/useStepStore";

export default function OnboardingProgressionBar() {
  const activeStep = useStepStore((state) => state.activeStep);

  return (
    <div 
      className="onboardingProgressionBarWrapper"
      role="region"
      aria-label="Progression de l'inscription"
    >
      <ul className="onboardingProgressionBarStyle">
        {/* Étape 1 */}
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

        {/* Segment 1–2 */}
        <div 
          // className={`segment ${activeStep >= 2 ? "filled" : ""}`} 
          className="segment filled" 
          aria-hidden="true" 
        />

        {/* Étape 2 */}
        <li 
          // className={`stepContainer ${activeStep >= 2 ? "is-active" : ""}`}
          className="stepContainer is-active"
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

        {/* Segment 2–3 */}
        <div 
          className={`segment ${activeStep >= 3 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        {/* Étape 3 */}
        <li 
          className={`stepContainer ${activeStep >= 3 ? "is-active" : ""}`}
          aria-current={activeStep === 3 ? "step" : undefined}
        >
          <p 
            className="stepNumberContainer" 
            aria-label={`Étape 3 sur 4 : choix de la fomrule`}
          >
            3
          </p>
          <span className="stepText">Formule</span>
        </li>

        {/* Segment 3–4 */}
        <div 
          className={`segment ${activeStep >= 4 ? "filled" : ""}`} 
          aria-hidden="true" 
        />

        {/* Étape 4 */}
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