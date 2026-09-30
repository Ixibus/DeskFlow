import { OnboardingSiteCard } from '@/components/cards/OnboardingSiteCard';
import './siteChoiceOnboardingPage.css';
import { Toast } from "@/components/toast/Toast";
import { Button } from '@/components/buttons/Buttons';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { useNavigate } from 'react-router';

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

export default function SiteChoiceOnboardingPage(): React.ReactNode {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { selectedSiteId, setSelectedSiteId, setActiveStep } = useOnboardingStore();
  const navigate = useNavigate();
  const { activeStep, login } = useOnboardingStore();

useEffect(() => {
  // Si l'utilisateur n'a pas rempli le login de l'étape 1 ou si l'étape active est inférieure
  if (!login || activeStep < 2) {
    navigate("/signup"); // Redirection vers l'étape initiale
  }
}, [activeStep, login, navigate]);

  // Chargement des sites depuis la base pour affichage (en lecture seule)
  useEffect(() => {
    async function fetchSites() {
      const { data, error } = await supabase.from('sites').select('*');
      if (error) {
        console.error("Erreur lors du chargement des sites:", error.message);
      } else if (data) {
        setSites(data);
      }
      setLoading(false);
    }
    fetchSites();
  }, []);

  const handleValidate = () => {
    if (!selectedSiteId) {
      console.warn("Veuillez sélectionner un site avant de continuer.");
      return;
    }

    // Mise à jour de l'étape active dans le store
    setActiveStep(3); // Passage à l'étape suivante (ex: formule)
    navigate("/formulaChoiceOnboarding"); // Remplace par ta route de l'étape suivante
  };

  return (
    <div className="site-choice-onboarding_container">
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
              onClick={() => setSelectedSiteId(site.id_site)}
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
                    <li className="card_onboarding-site-choice_address-info">{site.adresse}</li>
                    <li className="card_onboarding-site-choice_zip-code-info">{site.zip_code}</li>
                  </ul>
                </h3>
                <p className="card_onboarding-site-choice_info-container_site-zipCode typo-body">
                  Ouverture : {site.horaire_ouverture} - {site.horaire_fermeture}
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