import "./formulaChoiceOnboardingPage.css";

import { Toast } from "@/components/toast/Toast";
import { Button } from "@/components/buttons/Buttons";
import { OnboardingFormulaCard } from "@/components/cards/OnboardingFormulaCard";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";

interface FormulaChoiceOnboardingPageProps {
  isModal?: boolean;
  onClose?: () => void;
  closeButton?: React.ReactNode;
}

export default function FormulaChoiceOnboardingPage({
  isModal = false,
  onClose,

  closeButton,
}: FormulaChoiceOnboardingPageProps): React.ReactNode {
  const showToast = useToastStore((state) => state.showToast);

  const {
    login,
    selectedSiteId,
    selectedFormulaId,
    setSelectedFormulaId,
    setActiveStep,
  } = useOnboardingStore();
  const navigate = useNavigate();

useEffect(() => {
    if (isModal) return; // Ignore en mode modale

    // On se contente de mettre à jour l'étape active à 3, sans bloquer le retour arrière
    setActiveStep(3);
  }, [setActiveStep, isModal]);

  const handleValidate = () => {
    if (!selectedFormulaId) {
      showToast("Veuillez sélectionner une formule.", "error");
      return;
    }

    // Comportement conditionnel : Modale vs Parcours normal
    if (isModal && onClose) {
      onClose(); // Ferme la modale et revient sur la confirmation
    } else {
      setActiveStep(4);
      navigate("/infosConfirmationPageOnboarding");
    }
  };

  return (
    <div className="formula-choice-onboarding_container">
      {/* Le bouton s'affiche physiquement ici uniquement en mode modale */}

      {isModal && closeButton}
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
