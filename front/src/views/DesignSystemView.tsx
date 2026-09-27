import { Badge } from "@/components/badge/Badge";
import { Button } from "@/components/buttons/Buttons";
import { OnboardingSiteCard } from "@/components/cards/OnboardingSiteCard";
import { OnboardingFormulaCard } from "@/components/cards/OnboardingFormulaCard";
import { OnboardingInfoConfirmationCard } from "@/components/cards/OnboardingInfoConfirmationCard";
import { OnboardingSiteConfirmationCard } from "@/components/cards/OnboardingSiteConfirmationCard";
import { OnboardingFormulaConfirmationCard } from "@/components/cards/OnboardingFormulaConfirmationCard";
import ButtonTest from "@/components/composantStore/ButtonStore";
import ButtonTest2 from "@/components/composantStore/ButtonStore2";
import { Input } from "@/components/inputs/Inputs";
import OnboardingProgressionBar from "@/components/OnboardingProgressionBar/OnboardingProgressionBar";
import { Link } from "react-router";

import "./designSystemView.css";

const SearchIcon = () => <span>🔍</span>;

export default function DesignSystemView(): React.ReactNode {
  return (
    <div style={{ padding: "40px", backgroundColor: "#f5efe7" }}>
      {/* TITRE */}
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Titres
      </h2>
      <section style={{ marginBottom: "40px" }}>
        <h1>Design System</h1>
        <h2> Titre h2</h2>
        <h3> Titre h3</h3>
      </section>

      {/* Boutons  */}
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Boutons
      </h2>
      <section style={{ marginBottom: "40px" }}>
        <h3>Bouton 1</h3>
        <Button variant="primary" onClick={() => console.log("clicked")}>
          Créer un compte
        </Button>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h3>Bouton 2</h3>
        <Button variant="secondary">Connexion</Button>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h3>Bouton 3</h3>
        <Button
          variant="validator"
          buttonType="defaultType"
          onClick={() => console.log("clicked")}
        >
          Valider
        </Button>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h3>Bouton 4</h3>
        <Button variant="canceller">Annuler/Effacer/Modifier</Button>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h3>Bouton invisible</h3>
        <Button variant="ghost" onClick={() => console.log("cancelled")}>
          Annuler
        </Button>
      </section>

      {/*Éléments progress bar (Onboarding)*/}
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Progress Bar
      </h2>
      <section style={{ marginBottom: "80px" }}>
        <OnboardingProgressionBar />
      </section>

      {/* INPUTS */}
      {/* INPUT DEFAULT */}
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Inputs
      </h2>
      <div style={{ marginBottom: "40px" }}>
        <section className="design-section">
          <h2>Input - formulaire </h2>
          <Input placeholder="Entrez votre email" />
        </section>

        {/* SEARCH BAR */}
        <section className="design-section">
          <h2>Input - Recherche </h2>
          <Input
            variant="search"
            placeholder="Rechercher par nom, code APE..."
            icon={<SearchIcon />}
          />
        </section>

        {/* TEXTAREA */}
        <section className="design-section">
          <h2>Input - Description, commentaires</h2>
          <Input variant="textarea" placeholder="Décrivez votre produit..." />
        </section>
      </div>

      {/*vignettes*/}
      <h2
        style={{
          marginBottom: "20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Vignettes
      </h2>
      <div style={{ marginBottom: "40px" }}>
        <section className="design-section" style={{ marginBottom: "20px" }}>
          <h2>Onboarding - choix du Site</h2>
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
        </section>

        <section className="design-section" style={{ marginBottom: "20px" }}>
          <h2>Onboarding - choix de la formule</h2>
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
        </section>

        <section className="design-section" style={{ marginBottom: "20px" }}>
          <h2>Onboarding - confirmation infos</h2>
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
        </section>

        <section className="design-section" style={{ marginBottom: "20px" }}>
          <h2>Onboarding - confirmation du site</h2>
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
        </section>
      </div>

        <section className="design-section" style={{ marginBottom: "20px" }}>
          <h2>Onboarding - choix de la formule</h2>
          <OnboardingFormulaConfirmationCard className="card_onboarding-formula-confirmation_container-display">
            <Button
              variant="canceller"
              buttonType="largeMediumType"
              buttonPosition="right"
            >
              Modifier
            </Button>
            <div className="card_onboarding-formula-confirmation_info-container">
              <h2 className="card_onboarding-formula-confirmation_info-container_formula-name typo-h2">
                Classique
              </h2>
              <h3 className="card_onboarding-formula-confirmation_info-container_formula-hours typo-h3">
                20 heures/mois
              </h3>
              <p className="card_onboarding-formula-confirmation_info-container_formula-freeOption typo-body">
                Annulation gratuite !
              </p>
            </div>
          </OnboardingFormulaConfirmationCard>
        </section>

      {/* exemple de store */}
      <section>
        <h2>test store</h2>
        <ButtonTest />
        <ButtonTest2 />
      </section>
    </div>
  );
}
