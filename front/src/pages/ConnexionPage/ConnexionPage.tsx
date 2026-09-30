import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { useToastStore } from "@/stores/toastStore";
import { useAuthStore } from "@/stores/loginAuthed";

import "./connexionPage.css";
import { Toast } from "@/components/toast/Toast";


export default function ConnexionPage(): React.ReactNode {
  const [password, setPassword] = useState<any>("");
  const setLoginStore = useAuthStore((s) => s.setLogin);
  const login = useAuthStore((s) => s.login);


  const showToast = useToastStore((state) => state.showToast);

  const navigate = useNavigate();



  async function handlerSubmit(login: string, password: string) {
    try {
      console.log("le log: " + res);
      setLoginStore(login);
      showToast("connexion réussie", "success");
      navigate("/home");
    } catch {
      if (login === "" || password === "") return showToast("Merci de remplir tous les champs", "error");
      showToast("authentification échouée", "error");
      return null;
    }
  }

  return (
    <div className="connexion-account_container">
      <div className="connexion-account_formContainer">
        <div className="connexion-account_mainTitleContainer">
          <h1 className="typo-h2 connexion-account_mainTitle">
            DeskFlow
          </h1>
        </div>
        <div className="connexion-account_accountCreationContainer">
          <h2 className="typo-h3 connexion-account_title">Connexion</h2>
          <div className="connexion-account_loginContainer">
            <p>Login</p>
            <Input
              name="login"
              placeholder="votre login"
              variant="default"
              onChange={(e) => setLoginStore(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit(login!, password);
              }}
              />
          </div>
          <div className="connexion-account_passwordContainer">
            <p>Mot de passe</p>
            <Input
              name="password"
              placeholder="mot de passe"
              variant="secret"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit(login!, password);
              }}
            />
          </div>
          <div className="connexion-account_password-forgotten_container">
              <p className="connexion-account_password-forgotten_link">mot de passe oublié</p>
          </div>
          <Button
            id="connexionPageButtonSubmitter"
            children="Valider"
            buttonType="largeTallType"
            onClick={() => handlerSubmit(login!, password)}
          />
          <Button
            id="connexionPageButtonSubmitter"
            children="Effacer"
            variant="canceller"
            buttonType="largeTallType"
            onClick={() => handlerSubmit(login!, password)}
          />
        </div>
      </div>
      <Toast />
    </div>
  );
}
