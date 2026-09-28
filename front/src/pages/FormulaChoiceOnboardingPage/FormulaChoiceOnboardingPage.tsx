import "./formulaChoiceOnboardingPage.css";

import { Toast } from "@/components/toast/Toast";
import { Button } from "@/components/buttons/Buttons";
import { OnboardingFormulaCard } from "@/components/cards/OnboardingFormulaCard";

export default function FormulaChoiceOnboardingPage(): React.ReactNode {
  return (
    <div className="formula-choice-onboarding_container">
      <div className="formula-choice-onboarding_title-container">
        <h2 className="formula-choice-onboarding_title">Choix du formula</h2>
      </div>
      <div className="formula-choice-onboarding_formulas-container">
        <OnboardingFormulaCard className="card_onboarding-formula-choice_container-display">
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
        <OnboardingFormulaCard className="card_onboarding-formula-choice_container-display">
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
        onClick={() => console.log("clicked")}
      >
        Valider
      </Button>
      <Toast />
    </div>
  );
}
