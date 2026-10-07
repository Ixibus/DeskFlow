import React, { useState, useEffect } from "react";
import { Button } from "@/components/buttons/Buttons";
import { Card } from "@/components/cards/Card";
import CustomRangeInput from "@/components/inputs/CustomRangeInput";
import CustomTimeSlotInput from "@/components/inputs/CustomTimeSlotInput";
import CustomSelectUser from "@/components/inputs/CustomSelectUser";
import { BackgroundSet1 } from "@/components/backgroundSet/BackgroundSet1/BackgroundSet1";
import { useSupabaseStore } from "@/stores/useSupabaseStore";
import "./adminAddingBookingOverlay.css";

interface AdminAddingBookingOverlayProps {
  selectedRessource: any; // La ressource cliquée/sélectionnée
  onClose: () => void;    // Pour fermer l'overlay après validation ou annulation
}

export default function AdminAddingBookingOverlay({
  selectedRessource,
  onClose,
}: AdminAddingBookingOverlayProps): React.ReactNode {
  const {
    currentUser,
    users,
    fetchUsers,
    bookRessource,
    fetchRessourcesBySite,
    fetchAllRessources,
  } = useSupabaseStore();

  // Seul l'admin choisit le membre ; membre / gestionnaire réservent pour eux-mêmes
  const isAdmin = currentUser?.role === "Admin";

  const [selectedUserId, setSelectedUserId] = useState("");
  const [places, setPlaces] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  useEffect(() => {
    // Chargement des utilisateurs uniquement si admin (la RLS doit de toute façon le restreindre)
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  // Fermeture avec Échap + blocage du scroll de la page derrière la modale
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (!selectedRessource) return null;

  const handleValidate = async () => {
    const userId = isAdmin ? selectedUserId : currentUser?.id_utilisateur ?? "";
    if (!userId) {
      console.error("Aucun membre sélectionné");
      return;
    }

    const result = await bookRessource(
      selectedRessource.id_ressource,
      userId,
      date,
      startTime,
      endTime,
      places
    );

    if (result.success) {
      console.log("Réservation réussie !");
      // Rafraîchir les ressources du site concerné (+ réseau entier côté admin)
      if (selectedRessource.fk_site) {
        fetchRessourcesBySite(selectedRessource.fk_site);
      }
      if (isAdmin) fetchAllRessources();
      onClose();
    } else {
      console.error("Erreur lors de la réservation :", result.error);
    }
  };

  return (
    // Fond assombri : un clic dessus ferme la modale
    <div className="booking-modal_overlay" onClick={onClose}>
      {/* Conteneur blanc : on stoppe la propagation pour ne pas fermer en cliquant dedans */}
      <div
        className="booking-modal_container admin-adding-booking-overlay_container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
      <h2 id="booking-modal-title" className="booking-modal_title admin-adding-booking-overlay_title typo-h2">
        Réserver des places
      </h2>

      {isAdmin && (
        <>
          <h3 className="admin-adding-booking-overlay_member-selection_title typo-h3">
            choisissez le membre
          </h3>
          <CustomSelectUser
            label="Membre sélectionné"
            items={users}
            selectedValue={selectedUserId}
            onChange={(val) => setSelectedUserId(val)}
            placeholder="-- Choisir un profil --"
            renderOption={(user: any) => `${user.login || user.mail}`}
          />
        </>
      )}

      <BackgroundSet1>
        <h3 className="admin-adding-booking-overlay_container-resource-name typo-h3">
          {selectedRessource.nom_de_la_ressource}
        </h3>
        
        <Card className="card_site_container-display">
          <div className="card_site_inner-container-display">
            <div className="card_site_img-container">
              <div className={selectedRessource.types === 'Salle' ? "card_site_room_img" : "card_site_desk_img"} />
            </div>
            <div className="card_site_info-container">
              <div className="card_site_info-inner-container">
                <p className="card_site_info-container-place-configuration typo-body">
                  {selectedRessource.types} ({selectedRessource.capacite_totale} max)
                </p>
                <p className="card_site_info-container-places typo-body">
                  {selectedRessource.places_disponibles} place(s) disponible(s)
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
            max={selectedRessource.places_disponibles || 1}
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

      <div className="booking-modal_actions admin-adding-booking-overlay_boutons_container">
        <Button
          children="valider"
          variant="validator"
          buttonType="largeValidatorType"
          buttonPosition="center"
          onClick={handleValidate}
        />
        <Button
          children="annuler"
          variant="canceller"
          buttonType="largeValidatorType"
          buttonPosition="center"
          onClick={onClose}
        />
      </div>
      </div>
    </div>
  );
}
