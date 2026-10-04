// src/components/pages/ConnexionPage.tsx
import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useToastStore } from "@/stores/toastStore";
import { useAuthStore } from "@/stores/loginAuthed";
import { useSupabaseStore } from "@/stores/useSupabaseStore";
import { ForgotPasswordOverlay } from "@/components/overlays/ForgotPasswordOverlay/ForgotPasswordOverlay";
import { supabase } from "@/lib/supabaseClient"; // 👈 Import de supabase pour le diagnostic

import "./connexionPage.css";
import { Toast } from "@/components/toast/Toast";

export default function ConnexionPage(): React.ReactNode {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginError, setLoginError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  
  // État d'ouverture de la modale
  const [isForgotModalOpen, setIsForgotModalOpen] = useState<boolean>(false);

  // État spécifique pour activer uniquement les contours crimson en cas d'échec d'authentification
  const [isAuthError, setIsAuthError] = useState<boolean>(false);

  const setLoginStore = useAuthStore((s) => s.setLogin);
  const signInWithLogin = useSupabaseStore((s) => s.signInWithLogin);

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleClear = () => {
    setLogin("");
    setPassword("");
    setLoginError("");
    setPasswordError("");
    setIsAuthError(false);
  };

  async function handlerSubmit() {
    setLoginError("");
    setPasswordError("");
    setIsAuthError(false);

    let hasError = false;

    if (!login.trim()) {
      setLoginError("merci de renseigner le login");
      hasError = true;
    }
    if (!password) {
      setPasswordError("merci de renseigner le mot de passe");
      hasError = true;
    }

    if (hasError) {
      showToast("Veuillez remplir tous les champs obligatoires", "error");
      return;
    }

    const result = await signInWithLogin(login, password);
    
    // 🔍 DIAGNOSTIC : On inspecte le résultat et la session active juste après
    console.log("Résultat de signInWithLogin :", result);
    const { data: { session } } = await supabase.auth.getSession();
    console.log("Session active après connexion :", session);

    if (!result.success) {
      const authErrorMessage = result.error || "le login ou le mot de passe ne sont pas bon";
      setIsAuthError(true);
      showToast(authErrorMessage, "error");
      return;
    }

    setLoginStore(login);
    showToast("connexion réussie", "success");
    navigate("/home");
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
          
          {/* Champ Login */}
          <div className="connexion-account_loginContainer">
            <p>Login</p>
            <Input
              name="login"
              placeholder="votre login"
              variant="default"
              value={login}
              error={isAuthError || Boolean(loginError)}
              onChange={(e) => {
                setLogin(e.target.value);
                if (loginError) setLoginError("");
                if (isAuthError) setIsAuthError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit();
              }}
            />
            <span
              style={{
                color: "crimson",
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
                visibility: loginError ? "visible" : "hidden",
                minHeight: "18px",
              }}
            >
              {loginError || "placeholder-invisible"}
            </span>
          </div>

          {/* Champ Mot de passe */}
          <div className="connexion-account_passwordContainer">
            <p>Mot de passe</p>
            <Input
              name="password"
              placeholder="mot de passe"
              variant="secret"
              value={password}
              error={isAuthError || Boolean(passwordError)}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
                if (isAuthError) setIsAuthError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit();
              }}
            />
            <span
              style={{
                color: "crimson",
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
                visibility: passwordError ? "visible" : "hidden",
                minHeight: "18px",
              }}
            >
              {passwordError || "placeholder-invisible"}
            </span>
          </div>

          {/* Lien Mot de passe oublié cliquable */}
          <div className="connexion-account_password-forgotten_container">
            <p 
              className="connexion-account_password-forgotten_link"
              onClick={() => setIsForgotModalOpen(true)}
              style={{ cursor: "pointer", display: "inline-block" }}
            >
              mot de passe oublié
            </p>
          </div>

          <Button
            id="connexionPageButtonSubmitter"
            children="Valider"
            buttonType="largeTallType"
            onClick={handlerSubmit}
          />
          <Button
            id="connexionPageButtonClear"
            children="Effacer"
            variant="canceller"
            buttonType="largeTallType"
            onClick={handleClear}
          />
        </div>
      </div>

      {/* Appel du composant Modale */}
      <ForgotPasswordOverlay
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />

      <Toast />
    </div>
  );
}