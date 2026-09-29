import { Button } from "@/components/buttons/Buttons";
import "./memberBookingOverlay.css";
import { Card } from "@/components/cards/Card";
import { OverlayBackground } from "../OverlayBackground/OverlayBackground";
import CustomRangeInput from "@/components/inputs/CustomRangeInput";
import { useState } from "react";
import CustomTimeSlotInput from "@/components/inputs/CustomTimeSlotInput";

export default function MemberBookingOverlay(): React.ReactNode {
  const [places, setPlaces] = useState(1);

  const [date, setDate] = useState("2026-09-28");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const handleReserver = async () => {
    // Conversion propre pour Supabase (TIMESTAMPTZ)
    const p_heure_debut = new Date(`${date}T${startTime}:00`).toISOString();
    const p_heure_fin = new Date(`${date}T${endTime}:00`).toISOString();

    const { data, error } = await supabase.rpc("reserver_ressource", {
      p_id_ressource: 1, // ID de la ressource choisie
      p_heure_debut,
      p_heure_fin,
      p_places: 1,
    });

    if (error) {
      console.error("Erreur:", error.message);
    } else {
      console.log("Succès:", data);
    }
  };

  return (
    <OverlayBackground className="member-booking-overlay_container">
      <h2 className="member-booking-overlay_title typo-h2">Réserver des places</h2>
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
                1 place libre
              </p>
            </div>
          </div>
        </div>
      </Card>

        <h3 className="member-booking-overlay_places-choice_title">choisissez le nombre de place</h3>
      <OverlayBackground className="card_site_container-display">

      <CustomRangeInput
        label="Nombre de places souhaitées"
        min={1}
        max={6}
        value={places}
        onChange={(e) => setPlaces(Number(e.target.value))}
        unit="place(s)"
        />
        </OverlayBackground>

        <h3 className="member-booking-overlay_slot-choice_title">choisissez le créneau</h3>
      <OverlayBackground className="card_site_container-display">
      <CustomTimeSlotInput
        date={date}
        startTime={startTime}
        endTime={endTime}
        onDateChange={setDate}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        />
        </OverlayBackground>

      <div className="member-booking-overlay_boutons_container">
        <Button
          children="valider"
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
