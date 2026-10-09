import { Button } from "@/components/buttons/Buttons";
import "./memberAnnulationOverlay.css";
import { Card } from "@/components/cards/Card";
import { OverlayBackground } from "../OverlayBackground/OverlayBackground";
import CustomRangeInput from "@/components/inputs/CustomRangeInput";
import { useState } from "react";
import CustomTimeSlotInput from "@/components/inputs/CustomTimeSlotInput";
import { BackgroundSet1 } from "@/components/backgroundSet/BackgroundSet1/BackgroundSet1";
import { Badge } from "@/components/badge/Badge";

export default function MemberAnnulationOverlay(): React.ReactNode {
  const [places, setPlaces] = useState(1);

  const [date, setDate] = useState("2026-09-28");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");


  return (
    <OverlayBackground className="member-annulation-booking-overlay_container">
      <h2 className="member-annulation-booking-overlay_title typo-h2">
        Annuler la réservation
      </h2>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Gestionnaire et Administrateur
      </div>

      {/* --- Gestionnaire et Administrateur --- */}

      <h3 className="member-annulation-booking-overlay_date-info-title typo-h3">
        Membre
      </h3>
      <Badge children="Charlie Bernard" />

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Administrateur
      </div>

      {/* --- Affichage Administrateur --- */}

      <h3 className="member-annulation-booking-overlay_date-info-title typo-h3">
        Site de la réservation
      </h3>
      <BackgroundSet1>
        <div className="member-annulation-booking-overlay_site-info-container">
          <div className="member-annulation-booking-overlay_img" />
          <div className="member-annulation-booking-overlay_site-name-container">
            <p className="member-annulation-booking-overlay_site-name typo-body">
              Le Capitole
            </p>
          </div>
        </div>
      </BackgroundSet1>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Membre et Gestionnaire et Administrateur
      </div>

      {/* --- Membre et Gestionnaire et Administrateur --- */}

      <h3 className="member-annulation-booking-overlay_date-info-title typo-h3">
        Element réservé
      </h3>
      <Card className="card_site_container-display">
        <div className="card_site_inner-container-display">
          <div className="card_site_img-container">
            <div className="card_site_desk_img" />
          </div>
          <div className="card_site_info-container">
            <div className="card_site_info-inner-container">
              <p className="card_site_info-container-resource-name typo-body">
                Nom de la ressource
              </p>
              <p className="card_site_info-container-place-configuration typo-body">
                ressource individuel
              </p>
              <p className="card_site_info-container-free-places typo-body">
                1 place réservée
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="member-annulation-booking-overlay_info-container">
        <h3 className="member-annulation-booking-overlay_date-info-title typo-h3">
          Lundi 23 mars 2026
        </h3>
      </div>
      <div className="member-annulation-booking-overlay_info-container">
        <h3 className="member-annulation-booking-overlay_slot-info-title typo-h3">
          13h - 14h
        </h3>
      </div>
      <div className="member-annulation-booking-overlay_info-container">
        <h3 className="member-annulation-booking-overlay_slot-info-title typo-h3">
          1 place à annuler
        </h3>
      </div>

      <div className="member-annulation-booking-overlay_adviser-container">
        <h3 className="member-annulation-booking-overlay_title-adviser typo-h3">
          {" "}
          Attention !{" "}
        </h3>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Membre
      </div>

      {/* --- Affichage Membre --- */}
        
        <p className="member-annulation-booking-overlay_text-adviser typo-body">
          {" "}
          Annulation à moins de 24 heures de votre réservation. L'annulation
          sera effective mais vous perdrez vos crédits.
        </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Gestionnaire de site
      </div>

      {/* --- Affichage Gestionnaire de site --- */}


        <p className="member-annulation-booking-overlay_text-adviser typo-body">
          {" "}
          Annulation à moins de 24 heures de votre réservation. L'annulation
          sera effective mais [MEMBRE] perdra ces crédits de réservation.
        </p>

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Administrateur
      </div>

      {/* --- Affichage Administrateur --- */}

        <p className="member-annulation-booking-overlay_text-adviser typo-body">
          {" "}
          Annulation à moins de 24 heures de votre réservation. L'annulation
          sera effective mais [MEMBRE] du site [SITE] perdra ces crédits de réservation.
        </p>
      </div>
      
      <div className="member-annulation-booking-overlay_boutons_container">
        <Button
          children="confirmer mon annulation"
          variant="validator"
          buttonType="largeValidatorType"
          buttonPosition="center"
        />
        <Button
          children="annuler"
          variant="canceller"
          buttonType="largeValidatorType"
          buttonPosition="center"
        />
      </div>
    </OverlayBackground>
  );
}
