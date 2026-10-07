import { Button } from "@/components/buttons/Buttons";
import "./adminAddingBookingOverlay.css";
import { Card } from "@/components/cards/Card";
import { OverlayBackground } from "../OverlayBackground/OverlayBackground";
import CustomRangeInput from "@/components/inputs/CustomRangeInput";
import { useState } from "react";
import CustomTimeSlotInput from "@/components/inputs/CustomTimeSlotInput";
import CustomSelectUser from "@/components/inputs/CustomSelectUser";
import { BackgroundSet1 } from "@/components/backgroundSet/BackgroundSet1/BackgroundSet1";
import { supabase } from "@/lib/supabaseClient";

export default function AdminAddingBookingOverlay(): React.ReactNode {
  const [selectedUserId, setSelectedUserId] = useState("");

  // Exemple de 10 utilisateurs (qui viendront plus tard de Supabase)
  const fakeUsers = [
    { id: 1, prenom: "Alice", nom: "Dupont" },
    { id: 2, prenom: "Bob", nom: "Martin" },
    { id: 3, prenom: "Charlie", nom: "Bernard" },
    { id: 4, prenom: "Diane", nom: "Thomas" },
    { id: 5, prenom: "Evan", nom: "Petit" },
    { id: 6, prenom: "Fanny", nom: "Robert" },
    { id: 7, prenom: "Gabriel", nom: "Richard" },
    { id: 8, prenom: "Hélène", nom: "Durand" },
    { id: 9, prenom: "Ivan", nom: "Leroy" },
    { id: 10, prenom: "Julia", nom: "Moreau" },
  ];
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
    <OverlayBackground className="admin-adding-booking-overlay_container">
      <h2 className="admin-adding-booking-overlay_title typo-h2">
        Réserver des places
      </h2>

      <h3 className="admin-adding-booking-overlay_member-selection_title typo-h3">
        choisissez le membre
      </h3>
      <CustomSelectUser
        label="Membre sélectionné"
        items={fakeUsers}
        selectedValue={selectedUserId}
        onChange={(val) => setSelectedUserId(val)}
        placeholder="-- Choisir un profil --"
        renderOption={(user) => `${user.prenom} ${user.nom}`}
      />

      <BackgroundSet1>
        
        <h3 className="admin-adding-booking-overlay_container-resource-name typo-h3">
          Lila
        </h3>
        <Card className="card_site_container-display">
          <div className="card_site_inner-container-display">
            <div className="card_site_img-container">
              <div className="card_site_desk_img" />
            </div>
            <div className="card_site_info-container">
              <div className="card_site_info-inner-container">
                <p className="card_site_info-container-place-configuration typo-body">
                  ressource solo
                </p>
                <p className="card_site_info-container-places typo-body">
                  1 place
                </p>
              </div>
            </div>
          </div>
        </Card>
        <h3 className="admin-adding-booking-overlay_places-choice_title">
          choisissez le nombre de place
        </h3>
        <BackgroundSet1 className="card_site_container-display">
          <CustomRangeInput
            label="Nombre de places souhaitées"
            min={1}
            max={6}
            value={places}
            onChange={(e) => setPlaces(Number(e.target.value))}
            unit="place(s)"
          />
        </BackgroundSet1>
        <h3 className="admin-adding-booking-overlay_slot-choice_title">
          choisissez le créneau
        </h3>
        <BackgroundSet1 className="card_site_container-display">
          <CustomTimeSlotInput
            date={date}
            startTime={startTime}
            endTime={endTime}
            onDateChange={setDate}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        </BackgroundSet1>
      </BackgroundSet1>
      <BackgroundSet1>
        
        <h3 className="admin-adding-booking-overlay_container-resource-name typo-h3">
          Tulipe
        </h3>
        <Card className="card_site_container-display">
          <div className="card_site_inner-container-display">
            <div className="card_site_img-container">
              <div className="card_site_desk_img" />
            </div>
            <div className="card_site_info-container">
              <div className="card_site_info-inner-container">
                <p className="card_site_info-container-place-configuration typo-body">
                  ressource collective
                </p>
                <p className="card_site_info-container-places typo-body">
                  6 places
                </p>
              </div>
            </div>
          </div>
        </Card>
        <h3 className="admin-adding-booking-overlay_places-choice_title">
          choisissez le nombre de place
        </h3>
        <BackgroundSet1 className="card_site_container-display">
          <CustomRangeInput
            label="Nombre de places souhaitées"
            min={1}
            max={6}
            value={places}
            onChange={(e) => setPlaces(Number(e.target.value))}
            unit="place(s)"
          />
        </BackgroundSet1>
        <h3 className="admin-adding-booking-overlay_slot-choice_title">
          choisissez le créneau
        </h3>
        <BackgroundSet1 className="card_site_container-display">
          <CustomTimeSlotInput
            date={date}
            startTime={startTime}
            endTime={endTime}
            onDateChange={setDate}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        </BackgroundSet1>
      </BackgroundSet1>

        <div className="admin-adding-booking-overlay_boutons_container">
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
