import "./accountCreationPage.css";

import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useState } from "react";
import { useToastStore } from "@/stores/toastStore";
import { useNavigate } from "react-router";
import { Toast } from "@/components/toast/Toast";
import { supabase } from "@/lib/supabaseClient";
import { useOnboardingStore } from "@/stores/useOnboardingStore"; // <--- Import du store

export default function AccountCreationPage(): React.ReactNode {
  // On peut initialiser avec les valeurs du store si l'utilisateur revient en arrière
  const store = useOnboardingStore();
  const [email, setEmail] = useState(store.email || "");
  const [login, setLogin] = useState(store.login || "");
  const [password, setPassword] = useState(store.password || "");
  const [confirmPassword, setConfirmPassword] = useState(store.confirmPassword || "");

  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleClear = () => {
    setEmail("");
    setLogin("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setLoginError("");
    setPasswordError("");
    setConfirmPasswordError("");
    store.resetOnboarding();
  };

  async function handlerSubmit() {
    setEmailError("");
    setLoginError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    if (!email.trim()) { setEmailError("L'email est obligatoire"); hasError = true; }
    if (!login.trim()) { setLoginError("Le login est obligatoire"); hasError = true; }
    if (!password) { setPasswordError("Le mot de passe est obligatoire"); hasError = true; }
    if (!confirmPassword) { setConfirmPasswordError("La confirmation est obligatoire"); hasError = true; }

    if (hasError) {
      showToast("Tous les champs doivent être renseignés", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Format d'e-mail invalide");
      showToast("Format d'e-mail invalide", "error");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("8 caractères min, 1 maj, 1 min, 1 chiffre, 1 spécial.");
      showToast("Le mot de passe ne respecte pas les critères", "error");
      return;
    }

    try {
      // On garde juste la vérification du login en base (ce qui est très bien)
      const { data: loginExists } = await supabase.rpc("check_login_exists", {
        p_login: login,
      });

      if (loginExists) {
        setLoginError("Ce login est déjà pris.");
        showToast("Ce login est déjà pris", "error");
        return;
      }

      // --- CHANGEMENT MAJEUR ICI ---
      // On ne fait PLUS de supabase.auth.signUp ici ! 
      // On stocke tout proprement dans Zustand et on avance d'étape.
      store.updateField("email", email);
      store.updateField("login", login);
      store.updateField("password", password);
      store.updateField("confirmPassword", confirmPassword);
      store.setActiveStep(2); // Passage à l'étape 2

      showToast("Informations enregistrées avec succès.", "success");
      navigate("/siteChoiceOnboarding"); // Redirection vers le choix du site

    } catch (error: any) {
      showToast(error.message || "Une erreur est survenue", "error");
    }
  }

  return (
    <div className="create-account_container">
      <div className="create-account_formContainer">
        <div className="create-account_accountCreationContainer">
          <h2>Création de compte</h2>

          {/* Champ Email */}
          <div className="create-account_emailContainer">
            <p>Email</p>
            <Input
              placeholder="entrez votre email"
              variant="default"
              value={email}
              error={Boolean(emailError)}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit();
              }}
            />
            {emailError && (
              <span
                style={{
                  color: "crimson",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {emailError}
              </span>
            )}
          </div>

          {/* Champ Login */}
          <div className="create-account_loginContainer">
            <p>Login</p>
            <Input
              placeholder="entrez votre login"
              variant="default"
              value={login}
              error={Boolean(loginError)}
              onChange={(e) => setLogin(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit();
              }}
            />
            {loginError && (
              <span
                style={{
                  color: "crimson",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {loginError}
              </span>
            )}
          </div>

          {/* Champ Mot de passe */}
          <div className="create-account_passwordContainer">
            <p>Mot de passe</p>
            <Input
              placeholder="saisissez un mot de passe"
              variant="secret"
              value={password}
              error={Boolean(passwordError)}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit();
              }}
            />
            {passwordError && (
              <span
                style={{
                  color: "crimson",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {passwordError}
              </span>
            )}
          </div>

          {/* Champ Confirmation mot de passe */}
          <div className="create-account_passwordConfirmationContainer">
            <p>Confirmation - mot de passe</p>
            <Input
              placeholder="confirmer votre mot de passe"
              variant="secret"
              value={confirmPassword}
              error={Boolean(confirmPasswordError)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlerSubmit();
              }}
            />
            {confirmPasswordError && (
              <span
                style={{
                  color: "crimson",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "4px",
                }}
              >
                {confirmPasswordError}
              </span>
            )}
          </div>

          <Button buttonType="largeType" onClick={handlerSubmit}>
            Valider
          </Button>
          <Button
            buttonType="largeType"
            variant="canceller"
            onClick={handleClear}
          >
            Effacer
          </Button>
        </div>
      </div>
      <Toast />
    </div>
  );
}
