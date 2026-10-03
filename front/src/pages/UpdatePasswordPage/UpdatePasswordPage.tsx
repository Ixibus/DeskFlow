import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabaseClient";
import { useToastStore } from "@/stores/toastStore";

import "./updatePasswordPage.css";
import { Toast } from "@/components/toast/Toast";

export default function UpdatePasswordPage(): React.ReactNode {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSessionReady, setIsSessionReady] = useState<boolean>(false); // 👈 Sécurité pour bloquer le formulaire si pas de session

  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérification de la session au montage du composant
    const checkSession = async () => {
      // 1. On vérifie si une session existe déjà
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsSessionReady(true);
        return;
      }

      // 2. Si pas de session immédiate, on écoute le changement d'état (cas du clic sur le lien e-mail)
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
        if (event === "PASSWORD_RECOVERY" || currentSession) {
          setIsSessionReady(true);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    checkSession();
  }, []);

  async function handleUpdatePassword() {
    setPasswordError("");
    setConfirmPasswordError("");

    // Sécurité supplémentaire : s'assurer que la session est bien établie
    if (!isSessionReady) {
      showToast("Session invalide ou expirée. Veuillez refaire une demande.", "error");
      return;
    }

    let hasError = false;

    if (!password) {
      setPasswordError("Veuillez renseigner un nouveau mot de passe");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Veuillez confirmer le mot de passe");
      hasError = true;
    }

    if (hasError) {
      showToast("Veuillez corriger les erreurs", "error");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(" "); 
      showToast(
        "Il faut:\n - 8 caractères minimum\n - une majuscule\n - une minuscule\n - un chiffre\n - un caractère spécial",
        "error"
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        showToast(error.message, "error");
        setIsSubmitting(false);
        return;
      }

      showToast("Mot de passe mis à jour avec succès !", "success");
      
      setTimeout(() => {
        navigate("/signin");
      }, 1500);

    } catch (err) {
      showToast("Une erreur est survenue lors de la mise à jour", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="update-password_container">
      <div className="update-password_formContainer">
        <div className="update-password_mainTitleContainer">
          <h1 className="typo-h2 update-password_mainTitle">
            DeskFlow
          </h1>
        </div>
        <div className="update-password_cardContainer">
          <h2 className="typo-h3 update-password_title">Nouveau mot de passe</h2>
          
          <div className="update-password_inputGroup">
            <p>Recréez votre nouveau mot de passe</p>
            <Input
              name="password"
              placeholder="••••••••"
              variant="secret"
              value={password}
              error={Boolean(passwordError)}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
              }}
            />
            <span
              style={{
                color: "crimson",
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
                visibility: passwordError && passwordError !== " " ? "visible" : "hidden",
                minHeight: "18px",
              }}
            >
              {passwordError !== " " ? passwordError : ""}
            </span>
          </div>

          <div className="update-password_inputGroup">
            <p>Confirmer le mot de passe</p>
            <Input
              name="confirmPassword"
              placeholder="••••••••"
              variant="secret"
              value={confirmPassword}
              error={Boolean(confirmPasswordError)}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPasswordError) setConfirmPasswordError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleUpdatePassword();
              }}
            />
            <span
              style={{
                color: "crimson",
                fontSize: "12px",
                display: "block",
                marginTop: "4px",
                visibility: confirmPasswordError ? "visible" : "hidden",
                minHeight: "18px",
              }}
            >
              {confirmPasswordError || ""}
            </span>
          </div>

          <Button
            id="updatePasswordButtonSubmitter"
            children={isSubmitting ? "Mise à jour..." : "Modifier le mot de passe"}
            buttonType="largeTallType"
            onClick={handleUpdatePassword}
          />
        </div>
      </div>
      <Toast />
    </div>
  );
}