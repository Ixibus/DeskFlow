import { OnboardingSiteCard } from "@/components/cards/OnboardingSiteCard";
import "./siteChoiceOnboardingPage.css";
import { Toast } from "@/components/toast/Toast";
import { Button } from "@/components/buttons/Buttons";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import { useNavigate } from "react-router";
import { useToastStore } from "@/stores/toastStore";

type Site = {
  id_site: number;
  nom: string;
  adresse: string;
  zip_code: string;
  horaire_ouverture: string;
  horaire_fermeture: string;
  total_bureaux: number;
  total_salles: number;
};

interface SiteChoiceOnboardingPageProps {
  isModal?: boolean;
  onClose?: () => void;
  closeButton?: React.ReactNode;
}

export default function SiteChoiceOnboardingPage({
  isModal = false,
  onClose,
  closeButton,
}: SiteChoiceOnboardingPageProps): React.ReactNode {
  const showToast = useToastStore((state) => state.showToast);
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { selectedSiteId, setSelectedSite, setActiveStep, login } =
    useOnboardingStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Si l'overlay est actif (en mode modale)
    if (isModal) {
      // Bloque le scroll de la page en arrière-plan
      document.body.style.overflow = "hidden";
    }

    // Fonction de nettoyage (cleanup) qui s'exécute quand l'overlay se ferme ou se démonte
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModal]);

  useEffect(() => {
    if (isModal) return; // Ignore la redirection de sécurité si on est dans la modale

    if (!login) {
      navigate("/signup");
    } else {
      setActiveStep(2);
    }
  }, [login, navigate, setActiveStep, isModal]);

  useEffect(() => {
    async function fetchSites() {
      const { data, error } = await supabase.from("sites").select("*");
      if (error) {
        console.error("Erreur lors du chargement des sites:", error.message);
        showToast("Erreur lors du chargement des sites", "error");
      } else if (data) {
        setSites(data);
      }
      setLoading(false);
    }
    fetchSites();
  }, [showToast]);

  const handleValidate = () => {
    if (!selectedSiteId) {
      showToast("Veuillez sélectionner un site.", "error");
      return;
    }

    // Comportement conditionnel : Modale vs Parcours normal
    if (isModal && onClose) {
      onClose(); // Ferme la modale et met à jour la confirmation
    } else {
      setActiveStep(3);
      navigate("/formulaChoiceOnboarding");
    }
  };
  return (
    <div className="site-choice-onboarding_container">
      {/* Le bouton s'affiche physiquement ici uniquement en mode modale */}
      {isModal && closeButton}

      <div className="site-choice-onboarding_title-container">
        <h2 className="site-choice-onboarding_title">Choix du site</h2>
      </div>

      <div className="site-choice-onboarding_sites-container">
        {loading ? (
          <p className="typo-body">Chargement des sites...</p>
        ) : (
          sites.map((site) => (
            <OnboardingSiteCard
              key={site.id_site}
              interactive={true}
              selected={selectedSiteId === site.id_site}
              // On envoie l'objet site complet au store pour alimenter le récapitulatif final
              onClick={() => setSelectedSite(site)}
              className="card_onboarding-site-choice_container-display"
            >
              <div className="card_onboarding-site-choice_site-img-container">
                <div className="card_onboarding-site-choice_site-img" />
              </div>
              <div className="card_onboarding-site-choice_info-container">
                <h2 className="card_onboarding-site-choice_info-container_site-name typo-h2">
                  {site.nom}
                </h2>
                <h3 className="card_onboarding-site-choice_info-container_site-address typo-h3">
                  <ul>
                    <li className="card_onboarding-site-choice_address-info">
                      {site.adresse}
                    </li>
                    <li className="card_onboarding-site-choice_zip-code-info">
                      {site.zip_code}
                    </li>
                  </ul>
                </h3>
                <p className="card_onboarding-site-choice_info-container_site-zipCode typo-body">
                  Ouverture : {site.horaire_ouverture} -{" "}
                  {site.horaire_fermeture}
                </p>
              </div>
            </OnboardingSiteCard>
          ))
        )}
      </div>

      <Button
        variant="validator"
        buttonType="largeValidatorType"
        onClick={handleValidate}
      >
        Valider
      </Button>
      <Toast />
    </div>
  );
}
