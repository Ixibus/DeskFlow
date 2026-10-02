import { Button } from '@/components/buttons/Buttons';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import './mailConfirmationOnboardingPage.css';

export default function MailConfirmationOnboardingPage(): React.ReactNode {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    // Récupère l'e-mail stocké de manière sécurisée juste avant le reset
    const savedEmail = sessionStorage.getItem("registeredEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
    }
    // Fonction de nettoyage : s'exécute automatiquement lorsque le composant est démonté (quand on quitte la page)
    return () => {
      sessionStorage.removeItem("registeredEmail");
    };
  }, []);

  

  const handleBackToLogin = () => {
    navigate('/signin'); 
  };

  return (
    <div className='mailConfirmation_container'>
      <h2 className="mailConfirmation_title typo-h2">Merci pour votre inscription !</h2>
      <p className="mailConfirmation_information typo-body">
        Un mail de confirmation vous a été envoyé à l'adresse mail
      </p>
      <p className="mailConfirmation_email-address typo-body">
        {userEmail || "Chargement..."}
      </p>
      <p className="mailConfirmation_advicer typo-body">
        Merci de confirmer l'inscription via le lien dans ce mail de confirmation
      </p>
      <Button 
        variant="canceller" 
        onClick={handleBackToLogin}
      >
        Retour à la connexion
      </Button>
    </div>
  );
}