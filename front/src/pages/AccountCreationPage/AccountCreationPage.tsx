import "./accountCreationPage.css";

import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useState } from "react";
import { UserRepository } from "@/data/repositories/UserRepository";
import { createHttpClient } from "@/data/api/createHttpClient";

import { useToastStore } from "@/stores/toastStore";

import { useNavigate } from "react-router";

import { Toast } from "@/components/toast/Toast";

const userRepository = new UserRepository(createHttpClient());

export default function AccountCreationPage(): React.ReactNode {
  const [email, setEmail] = useState<any>();
  const [login, setLogin] = useState<any>();
  const [password, setPassword] = useState<any>();

  const showToast = useToastStore((state) => state.showToast);

  const navigate = useNavigate();

  async function handlerSubmit(email: string, login: string, password: string) {
    try {
      await userRepository.register({ email, login, password });
      showToast(
        "Demande de compte créé avec succes. Merci d'attendre la confirmation de création de votre compte",
        "success",
      );
      navigate("/siteChoiceOnboardingPage");
    } catch (error: any) {
      let message =
        "Demande de création échouée. Tous les champs doivent être renseignés";

      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (typeof error?.response?.data === "string") {
        message = error.response.data;
      }

      showToast(message, "error");
      return null;
    }
  }

  return (
    <div className="create-account_container">
      <div className="create-account_formContainer">
        <div className="create-account_accountCreationContainer">
          <h2>Création de compte</h2>
          <div className="create-account_emailContainer">
            <p>Email</p>
            <Input
              placeholder="entrez votre email"
              variant="default"
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit(email, login, password);
              }}
            />
          </div>
          <div className="create-account_loginContainer">
            <p>Login</p>
            <Input
              placeholder="entrez votre login"
              variant="default"
              onChange={(e) => setLogin(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit(email, login, password);
              }}
            />
          </div>
          <div className="create-account_passwordContainer">
            <p>Mot de passe</p>
            <Input
              placeholder="saisissez un mot de passe"
              variant="secret"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit(email, login, password);
              }}
            />
          </div>
          <div className="create-account_passwordConfirmationContainer">
            <p>Confirmation - mot de passe</p>
            <Input
              placeholder="confirmer votre mot de passe"
              variant="secret"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit(email, login, password);
              }}
            />
          </div>
          <Button
            children="Valider"
            buttonType="largeType"
            onClick={() => handlerSubmit(email, login, password)}
          />
          <Button
            children="Effacer"
            buttonType="largeType"
            variant="canceller"
            onClick={() => handlerSubmit(email, login, password)}
          />
        </div>
      </div>
      <Toast />
    </div>
  );
}
