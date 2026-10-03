import { Input } from "@/components/inputs/Inputs";
import { Button } from "@/components/buttons/Buttons";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useToastStore } from "@/stores/toastStore";

import "./forgotPasswordOverlay.css";

interface ForgotPasswordOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgotPasswordOverlay({ isOpen, onClose }: ForgotPasswordOverlayProps): React.ReactNode {
  const [forgotLogin, setForgotLogin] = useState<string>("");
  const [forgotLoginError, setForgotLoginError] = useState<string>("");
  const [isSubmittingForgot, setIsSubmittingForgot] = useState<boolean>(false);

  const showToast = useToastStore((state) => state.showToast);

  if (!isOpen) return null;

  async function handleForgotPasswordSubmit() {
    setForgotLoginError("");

    if (!forgotLogin.trim()) {
      setForgotLoginError("merci de renseigner votre login");
      return;
    }

    setIsSubmittingForgot(true);

    try {
      // 1. On récupère l'e-mail lié au login dans la table "utilisateurs"
      const { data: userData, error: userError } = await supabase
        .from("utilisateurs")
        .select("mail")
        .eq("login", forgotLogin.trim())
        .single();

      if (userError || !userData?.mail) {
        setForgotLoginError("Aucun compte associé à ce login");
        setIsSubmittingForgot(false);
        return;
      }

      // 2. On demande à Supabase d'envoyer l'e-mail de réinitialisation
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(userData.mail, {
        redirectTo: `${window.location.origin}/updatePassword`,
      });

      if (resetError) {
        showToast(resetError.message, "error");
        setIsSubmittingForgot(false);
        return;
      }

      showToast("E-mail de réinitialisation envoyé avec succès !", "success");
      setForgotLogin("");
      onClose();
    } catch (err) {
      showToast("Une erreur est survenue", "error");
    } finally {
      setIsSubmittingForgot(false);
    }
  }

  return (
    <div className="forgot-modal_overlay">
      <div className="forgot-modal_container">
        <h3 className="forgot-modal_title">Mot de passe oublié</h3>
        <p className="forgot-modal_description">
          Entrez votre login pour recevoir un e-mail de réinitialisation.
        </p>

        <div className="forgot-modal_inputGroup">
          <p className="forgot-modal_label">Login</p>
          <Input
            name="forgotLogin"
            placeholder="votre login"
            variant="default"
            value={forgotLogin}
            error={Boolean(forgotLoginError)}
            onChange={(e) => {
              setForgotLogin(e.target.value);
              if (forgotLoginError) setForgotLoginError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleForgotPasswordSubmit();
            }}
          />
          <span className="forgot-modal_error">
            {forgotLoginError || ""}
          </span>
        </div>

        <div className="forgot-modal_actions">
          <Button
            children={isSubmittingForgot ? "Envoi..." : "Envoyer"}
            buttonType="largeTallType"
            onClick={handleForgotPasswordSubmit}
          />
          <Button
            children="Annuler"
            variant="canceller"
            buttonType="largeTallType"
            onClick={() => {
              setForgotLogin("");
              setForgotLoginError("");
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}