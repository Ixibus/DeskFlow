import { OnboardingSiteCard } from '@/components/cards/OnboardingSiteCard';
import './siteChoiceOnboardingPage.css'

import { Toast } from "@/components/toast/Toast";
import { Button } from '@/components/buttons/Buttons';

export default function SiteChoiceOnboardingPage(): React.ReactNode {


  return (
    <div className="site-choice-onboarding_container">
        <div className="site-choice-onboarding_title-container">
          <h2 className="site-choice-onboarding_title">Choix du site</h2>
        </div>
          <div className="site-choice-onboarding_sites-container">
            <OnboardingSiteCard className="card_onboarding-site-choice_container-display">
              <div className="card_onboarding-site-choice_site-img-container">
                <div className="card_onboarding-site-choice_site-img" />
              </div>
              <div className="card_onboarding-site-choice_info-container">
                <h2 className="card_onboarding-site-choice_info-container_site-name typo-h2">
                  Le Capitole
                </h2>
                <h3 className="card_onboarding-site-choice_info-container_site-address typo-h3">
                  Place Capitole
                </h3>
                <p className="card_onboarding-site-choice_info-container_site-zipCode typo-body">
                  31000 Toulouse
                </p>
              </div>
            </OnboardingSiteCard>
            <OnboardingSiteCard className="card_onboarding-site-choice_container-display">
              <div className="card_onboarding-site-choice_site-img-container">
                <div className="card_onboarding-site-choice_site-img" />
              </div>
              <div className="card_onboarding-site-choice_info-container">
                <h2 className="card_onboarding-site-choice_info-container_site-name typo-h2">
                  Le Capitole
                </h2>
                <h3 className="card_onboarding-site-choice_info-container_site-address typo-h3">
                  Place Capitole
                </h3>
                <p className="card_onboarding-site-choice_info-container_site-zipCode typo-body">
                  31000 Toulouse
                </p>
              </div>
            </OnboardingSiteCard>
            <OnboardingSiteCard className="card_onboarding-site-choice_container-display">
              <div className="card_onboarding-site-choice_site-img-container">
                <div className="card_onboarding-site-choice_site-img" />
              </div>
              <div className="card_onboarding-site-choice_info-container">
                <h2 className="card_onboarding-site-choice_info-container_site-name typo-h2">
                  Le Capitole
                </h2>
                <h3 className="card_onboarding-site-choice_info-container_site-address typo-h3">
                  Place Capitole
                </h3>
                <p className="card_onboarding-site-choice_info-container_site-zipCode typo-body">
                  31000 Toulouse
                </p>
              </div>
            </OnboardingSiteCard>
          </div>
        <Button variant="validator" buttonType="largeValidatorType" onClick={() => console.log("clicked")}>
          Valider
        </Button>
       <Toast/>
    </div>
  );
}