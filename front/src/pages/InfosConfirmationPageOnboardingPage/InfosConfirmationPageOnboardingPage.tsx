import "./infosConfirmationPageOnboardingPage.css";

import { Toast } from "@/components/toast/Toast";
import { Button } from "@/components/buttons/Buttons";
import { OnboardingInfoConfirmationCard } from "@/components/cards/OnboardingInfoConfirmationCard";
import { OnboardingSiteConfirmationCard } from "@/components/cards/OnboardingSiteConfirmationCard";
import { OnboardingFormulaConfirmationCard } from "@/components/cards/OnboardingFormulaConfirmationCard";

export default function InfosConfirmationPageOnboardingPage(): React.ReactNode {
  return (
    <div className="infos-confirmation-onboarding_container">
      <div className="infos-confirmation-onboarding_title-container">
        <h2 className="infos-confirmation-onboarding_title">
          Confimez vos informations
        </h2>
      </div>
      <div className="infos-confirmation-onboarding_infoss-container">
        <h3 className="infos-confirmation-onboarding_subtitle">
          Vos informations personnels
        </h3>
        <OnboardingInfoConfirmationCard className="card_onboarding-info-confimation_container-display">
          <Button
            variant="canceller"
            buttonType="largeMediumType"
            buttonPosition="right"
          >
            Modifier
          </Button>
          <div className="card_onboarding-info-confimation_info-container">
            <p className="card_onboarding-info-confimation_login typo-body">
              leLogin
            </p>
            <p className="card_onboarding-info-confimation_mail typo-body">
              leMail
            </p>
            <p className="card_onboarding-info-confimation_hiddenPassword typo-body">
              *******
            </p>
          </div>
        </OnboardingInfoConfirmationCard>
        <h3 className="infos-confirmation-onboarding_subtitle">
          Votre site d'attribution
        </h3>
        <OnboardingSiteConfirmationCard className="card_onboarding-site-confimation_container-display">
          <Button
            variant="canceller"
            buttonType="largeMediumType"
            buttonPosition="right"
          >
            Modifier
          </Button>
          <div className="card_onboarding-site-confirmation_container-display">
            <div className="card_onboarding-site-confimation_site-container">
              <div className="card_onboarding-site-confimation_site-img" />
            </div>
            <div className="card_onboarding-site-confimation_info-container">
              <h2 className="card_onboarding-site-confimation_info-container_site-name typo-h2">
                Le Capitole
              </h2>
              <h3 className="card_onboarding-site-confimation_info-container_site-address typo-h3">
                Place Capitole
              </h3>
              <p className="card_onboarding-site-confimation_info-container_site-zipCode typo-body">
                31000 Toulouse
              </p>
            </div>
          </div>
        </OnboardingSiteConfirmationCard>
        <h3 className="infos-confirmation-onboarding_subtitle">
          Votre formule
        </h3>
        <OnboardingFormulaConfirmationCard className="card_onboarding-infos-confirmation_container-display">
          <Button
            variant="canceller"
            buttonType="largeMediumType"
            buttonPosition="right"
          >
            Modifier
          </Button>
          <div className="card_onboarding-infos-confirmation_info-container">
            <h2 className="card_onboarding-infos-confirmation_info-container_infos-name typo-h2">
              Classique
            </h2>
            <h3 className="card_onboarding-infos-confirmation_info-container_infos-hours typo-h3">
              20 heures/mois
            </h3>
            <p className="card_onboarding-infos-confirmation_info-container_infos-freeOption typo-body">
              Annulation gratuite !
            </p>
          </div>
        </OnboardingFormulaConfirmationCard>
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
