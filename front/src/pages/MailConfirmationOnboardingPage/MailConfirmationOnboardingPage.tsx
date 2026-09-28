import { Button } from '@/components/buttons/Buttons'
import './mailConfirmationOnboardingPage.css'

export default function MailConfirmationOnboardingPage(): React.ReactNode {
return(
    <div className='mailConfirmation_container'>
        <h2 className="mailConfirmation_title typo-h2">Merci pour votre inscription !</h2>
        <p className="mailConfirmation_information typo-body">Un mail de confirmation vous a été envoyé à l'adresse mail</p>
        <p className="mailConfirmation_email-address typo-body">[adresse mail]</p>
        <p className="mailConfirmation_advicer typo-body">Merci de confimer l'inscription via le lien dans ce mail de confirmation </p>
        <Button variant="canceller" children="retour à la page d'accueil"/>
    </div>
)
}