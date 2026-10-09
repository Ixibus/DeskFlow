import "./infosConfirmationPageOnboardingPage.css";

import { Toast } from "@/components/toast/Toast";
import { Button } from "@/components/buttons/Buttons";
import { OnboardingInfoConfirmationCard } from "@/components/cards/OnboardingInfoConfirmationCard";
import { OnboardingSiteConfirmationCard } from "@/components/cards/OnboardingSiteConfirmationCard";
import { OnboardingFormulaConfirmationCard } from "@/components/cards/OnboardingFormulaConfirmationCard";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useToastStore } from "@/stores/toastStore";

import AccountCreationPage from "@/pages/AccountCreationPage/AccountCreationPage";
import SiteChoiceOnboardingPage from "@/pages/SiteChoiceOnboardingPage/SiteChoiceOnboardingPage";
import FormulaChoiceOnboardingPage from "@/pages/FormulaChoiceOnboardingPage/FormulaChoiceOnboardingPage";

type EditingType = "infos" | "site" | "formula" | null;

export default function InfosConfirmationPageOnboardingPage(): React.ReactNode {
  const showToast = useToastStore((state) => state.showToast);
  const [editingSection, setEditingSection] = useState<EditingType>(null);

  const {
    activeStep,
    login,
    email,
    selectedSiteId,
    selectedSiteName,
    selectedSiteAddress,
    selectedSiteZipCode,
    selectedFormulaId,
    setActiveStep,
    finalizeOnboarding,
    resetOnboarding,
  } = useOnboardingStore();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setActiveStep(4);
  }, [activeStep]);

  useEffect(() => {
    if (isSubmitting) return;

    if (!login || !selectedSiteId || !selectedFormulaId) {
      navigate("/signup");
    }
  }, [login, selectedSiteId, selectedFormulaId, navigate, isSubmitting]);

  const handleFinalConfirmation = async () => {
    setIsSubmitting(true);
    
    const result = await finalizeOnboarding();

    if (!result.success) {
      setIsSubmitting(false);
      showToast(
        result.error || "Une erreur est survenue lors de la validation.",
        "error",
      );
      return;
    }

    if (email) {
      sessionStorage.setItem("registeredEmail", email);
    }

    resetOnboarding();

    navigate("/mailConfirmationOnboarding");
  };

  const formulaHours =
    selectedFormulaId === "Premium" ? "50 heures/mois" : "20 heures/mois";

  return (
    <div className="infos-confirmation-onboarding_container">
      <div className="infos-confirmation-onboarding_title-container">
        <h2 className="infos-confirmation-onboarding_title">
          Confirmez vos informations
        </h2>
      </div>

      <div className="infos-confirmation-onboarding_infoss-container">
        {/* SECTION INFOS PERSONNELLES */}
        <h3 className="infos-confirmation-onboarding_subtitle">
          Vos informations personnelles
        </h3>
        <OnboardingInfoConfirmationCard className="card_onboarding-info-confimation_container-display">
          <Button
            variant="canceller"
            buttonType="largeMediumType"
            buttonPosition="right"
            onClick={() => setEditingSection("infos")}
          >
            Modifier
          </Button>
          <div className="card_onboarding-info-confimation_info-container">
            <p className="card_onboarding-info-confimation_login typo-body">
              {login || "Mon login"}
            </p>
            <p className="card_onboarding-info-confimation_mail typo-body">
              {email || "mon.email@exemple.com"}
            </p>
            <p className="card_onboarding-info-confimation_hiddenPassword typo-body">
              *******
            </p>
          </div>
        </OnboardingInfoConfirmationCard>

        {/* SECTION SITE D'ATTRIBUTION */}
        <h3 className="infos-confirmation-onboarding_subtitle">
          Votre site d'attribution
        </h3>
        <OnboardingSiteConfirmationCard className="card_onboarding-site-confimation_container-display">
          <Button
            variant="canceller"
            buttonType="largeMediumType"
            buttonPosition="right"
            onClick={() => setEditingSection("site")}
          >
            Modifier
          </Button>
          <div className="card_onboarding-site-confirmation_container-display">
            <div className="card_onboarding-site-confimation_site-container">
              <div className="card_onboarding-site-confimation_site-img" />
            </div>
            <div className="card_onboarding-site-confimation_info-container">
              <h2 className="card_onboarding-site-confimation_info-container_site-name typo-h2">
                {selectedSiteName || "Nom du site"}
              </h2>
              <h3 className="card_onboarding-site-confimation_info-container_site-address typo-h3">
                {selectedSiteAddress || "Adresse du site"}
              </h3>
              <p className="card_onboarding-site-confimation_info-container_site-zipCode typo-body">
                {selectedSiteZipCode || "Code postal"}
              </p>
            </div>
          </div>
        </OnboardingSiteConfirmationCard>

        {/* SECTION FORMULE */}
        <h3 className="infos-confirmation-onboarding_subtitle">
          Votre formule
        </h3>
        <OnboardingFormulaConfirmationCard className="card_onboarding-infos-confirmation_container-display">
          <Button
            variant="canceller"
            buttonType="largeMediumType"
            buttonPosition="right"
            onClick={() => setEditingSection("formula")}
          >
            Modifier
          </Button>
          <div className="card_onboarding-infos-confirmation_info-container">
            <h2 className="card_onboarding-infos-confirmation_info-container_infos-name typo-h2">
              {selectedFormulaId || "Classique"}
            </h2>
            <h3 className="card_onboarding-infos-confirmation_info-container_infos-hours typo-h3">
              {formulaHours}
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
        onClick={handleFinalConfirmation}
      >
        Valider
      </Button>

      {editingSection !== null && (
        <div className="onboarding-overlay-backdrop">
          <div className="onboarding-overlay-content">
            {editingSection === "infos" && (
              <AccountCreationPage
                isModal={true}
                onClose={() => setEditingSection(null)}
                closeButton={
                  <button
                    type="button"
                    className="onboarding-overlay-close-btn"
                    onClick={() => setEditingSection(null)}
                  />
                }
              />
            )}

            {editingSection === "site" && (
              <SiteChoiceOnboardingPage
                isModal={true}
                onClose={() => setEditingSection(null)}
                closeButton={
                  <button
                    type="button"
                    className="onboarding-overlay-close-btn"
                    onClick={() => setEditingSection(null)}
                  />
                }
              />
            )}

            {editingSection === "formula" && (
              <FormulaChoiceOnboardingPage
                isModal={true}
                onClose={() => setEditingSection(null)}
                closeButton={
                  <button
                    type="button"
                    className="onboarding-overlay-close-btn"
                    onClick={() => setEditingSection(null)}
                  />
                }
              />
            )}
          </div>
        </div>
      )}

      <Toast />
    </div>
  );
}
