import "./formulaChoiceOnboardingPage.css";

import { Toast } from "@/components/toast/Toast";
import { Button } from "@/components/buttons/Buttons";
import { OnboardingFormulaCard } from "@/components/cards/OnboardingFormulaCard";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";

export default function FormulaChoiceOnboardingPage(): React.ReactNode {
      const showToast = useToastStore((state) => state.showToast);
  
  const { activeStep, login, selectedSiteId, selectedFormulaId, setSelectedFormulaId, setActiveStep } = useOnboardingStore();
  const navigate = useNavigate();

  // Garde de sécurité : vérifie que les étapes précédentes ont bien été remplies
  useEffect(() => {
    if (!login || !selectedSiteId || activeStep < 3) {
      navigate("/signup"); // Redirection vers l'étape initiale si manquement
    }
  }, [activeStep, login, selectedSiteId, navigate]);

  const handleValidate = () => {
    if (!selectedFormulaId) {
      // Optionnel : tu pourrais afficher un toast ici pour dire de choisir une formule
      showToast("Veuillez sélectionner une formule.", "error");
      return;
    }

    // Passage à l'étape 4 (Confirmation)
    setActiveStep(4);
    navigate("/onboarding/confirmation"); // Adapte la route vers ta page de confirmation finale si besoin
  };

  return (
    <div className="formula-choice-onboarding_container">
      <div className="formula-choice-onboarding_title-container">
        <h2 className="formula-choice-onboarding_title">Choix de la formule</h2>
      </div>
      
      <div className="formula-choice-onboarding_formulas-container">
        <OnboardingFormulaCard
          interactive={true}
          selected={selectedFormulaId === "Classique"}
          onClick={() => setSelectedFormulaId("Classique")}
          className="card_onboarding-formula-choice_container-display"
        >
          <div className="card_onboarding-formula-choice_closeItem-container" />
          <div className="card_onboarding-formula-choice_info-container">
            <h2 className="card_onboarding-formula-choice_info-container_formula-name typo-h2">
              Classique
            </h2>
            <h3 className="card_onboarding-formula-choice_info-container_formula-hours typo-h3">
              20 heures/mois
            </h3>
            <p className="card_onboarding-formula-choice_info-container_formula-freeOption typo-body">
              Annulation gratuite !
            </p>
          </div>
        </OnboardingFormulaCard>

        <OnboardingFormulaCard
          interactive={true}
          selected={selectedFormulaId === "Premium"}
          onClick={() => setSelectedFormulaId("Premium")}
          className="card_onboarding-formula-choice_container-display"
        >
          <div className="card_onboarding-formula-choice_closeItem-container" />
          <div className="card_onboarding-formula-choice_info-container">
            <h2 className="card_onboarding-formula-choice_info-container_formula-name typo-h2">
              Premium
            </h2>
            <h3 className="card_onboarding-formula-choice_info-container_formula-hours typo-h3">
              50 heures/mois
            </h3>
            <p className="card_onboarding-formula-choice_info-container_formula-freeOption typo-body">
              Annulation gratuite !
            </p>
          </div>
        </OnboardingFormulaCard>
      </div>

      <Button
        variant="validator"
        buttonType="largeValidatorType"
        buttonPosition="center"
        onClick={handleValidate}
      >
        Valider
      </Button>
      <Toast />
    </div>
  );
}