import "./accountCreationPage.css";

import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useEffect, useState } from "react";
import { useToastStore } from "@/stores/toastStore";
import { useNavigate } from "react-router";
import { Toast } from "@/components/toast/Toast";
import { supabase } from "@/lib/supabaseClient";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

interface AccountCreationPageProps {
  isModal?: boolean;
  onClose?: () => void;
  closeButton?: React.ReactNode;
}

export default function AccountCreationPage({
  isModal = false,
  onClose,
  closeButton,
}: AccountCreationPageProps): React.ReactNode {
  const store = useOnboardingStore();

  const [email, setEmail] = useState(store.email || "");
  const [login, setLogin] = useState(store.login || "");
  const [password, setPassword] = useState(store.password || "");
  const [confirmPassword, setConfirmPassword] = useState(
    store.confirmPassword || "",
  );

  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  useEffect(() => {
    store.setActiveStep(1);
  }, [store.setActiveStep]);

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

    if (!email.trim()) {
      setEmailError("L'email est obligatoire");
      hasError = true;
    }
    if (!login.trim()) {
      setLoginError("Le login est obligatoire");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Le mot de passe est obligatoire");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("La confirmation est obligatoire");
      hasError = true;
    }

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
      setPasswordError("format du mot de passe incorrect");
      showToast("Il faut:\n - 8 caractères minimum\n - une majuscule\n - une minuscule\n - un chiffre\n - un caractère spécial", "error");
      return;
    }

    try {
      const { data: loginExists } = await supabase.rpc("check_login_exists", {
        p_login: login,
      });

      if (loginExists) {
        setLoginError("Ce login est déjà pris.");
        showToast("Ce login est déjà pris", "error");
        return;
      }

      store.updateField("email", email);
      store.updateField("login", login);
      store.updateField("password", password);
      store.updateField("confirmPassword", confirmPassword);

      showToast("Informations enregistrées avec succès.", "success");

      if (isModal && onClose) {
        onClose();
      } else {
        store.setActiveStep(2);
        navigate("/siteChoiceOnboarding");
      }
    } catch (error: any) {
      showToast(error.message || "Une erreur est survenue", "error");
    }
  }

  return (
    <div className="create-account_container">
      <div className="create-account_formContainer">
        <div className="create-account_accountCreationContainer">
          {isModal && closeButton}
          <h2>Création de compte</h2>

          {/* Champ Email */}
          <div className="create-account_emailContainer">
            <p>Email</p>
            <Input
              placeholder="entrez votre email"
              variant="default"
              value={email}
              error={Boolean(emailError)}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError(""); // Efface l'erreur dès la saisie
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
                  visibility: emailError ? "visible" : "hidden",
                }}
              >
                {emailError || "placeholder-invisible"}
              </span>

          </div>

          {/* Champ Login */}
          <div className="create-account_loginContainer">
            <p>Login</p>
            <Input
              placeholder="entrez votre login"
              variant="default"
              value={login}
              error={Boolean(loginError)}
              onChange={(e) => {
                setLogin(e.target.value);
                if (loginError) setLoginError(""); // Efface l'erreur dès la saisie
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
                }}
              >
                {loginError || "placeholder-invisible"}
              </span>

          </div>

          {/* Champ Mot de passe */}
          <div className="create-account_passwordContainer">
            <p>Mot de passe</p>
            <Input
              placeholder="saisissez un mot de passe"
              variant="secret"
              value={password}
              error={Boolean(passwordError)}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError(""); // Efface l'erreur dès la saisie
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
                }}
              >
                {passwordError || "placeholder-invisible"}
              </span>

          </div>

          {/* Champ Confirmation mot de passe */}
          <div className="create-account_passwordConfirmationContainer">
            <p>Confirmation - mot de passe</p>
            <Input
              placeholder="confirmer votre mot de passe"
              variant="secret"
              value={confirmPassword}
              error={Boolean(confirmPasswordError)}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError(""); // Efface l'erreur dès la saisie
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
                  visibility: confirmPasswordError ? "visible" : "hidden",
                }}
              >
                {confirmPasswordError || "placeholder-invisible"}
              </span>

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
