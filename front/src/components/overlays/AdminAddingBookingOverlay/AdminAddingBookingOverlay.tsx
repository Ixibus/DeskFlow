import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/buttons/Buttons";
import { Card } from "@/components/cards/Card";
import CustomRangeInput from "@/components/inputs/CustomRangeInput";
import CustomTimeSlotInput from "@/components/inputs/CustomTimeSlotInput";
import CustomSelectUser from "@/components/inputs/CustomSelectUser";
import { BackgroundSet1 } from "@/components/backgroundSet/BackgroundSet1/BackgroundSet1";
import { useSupabaseStore } from "@/stores/useSupabaseStore";
import type { Ressource, Site } from "@/stores/useSupabaseStore";
import "./adminAddingBookingOverlay.css";
import "./adminBookingModal.css";
import { useToastStore } from "@/stores/toastStore";

interface AdminAddingBookingOverlayProps {
  selectedRessource?: Ressource | null;
  selectedSite?: Site | null;
  onClose: () => void;
}

export default function AdminAddingBookingOverlay({
  selectedRessource = null,
  selectedSite = null,
  onClose,
}: AdminAddingBookingOverlayProps): React.ReactNode {
  const {
    currentUser,
    users,
    ressources,
    fetchUsers,
    bookRessource,
    fetchRessourcesBySite,
    fetchAllRessources,
  } = useSupabaseStore();

  const isAdmin = currentUser?.role === "Admin";

  const showToast = useToastStore((state) => state.showToast);

  const [chosenRessource, setChosenRessource] = useState<Ressource | null>(selectedRessource);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [places, setPlaces] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAdmin) fetchUsers();
  }, [isAdmin]);

  useEffect(() => {
    if (selectedSite) fetchRessourcesBySite(selectedSite.id_site);
  }, [selectedSite?.id_site]);


  const siteRessources = useMemo(
    () => (selectedSite ? ressources.filter((r) => r.fk_site === selectedSite.id_site) : []),
    [ressources, selectedSite?.id_site],
  );

  const targetSiteId = useMemo(() => {
    if (selectedSite) return selectedSite.id_site;
    if (chosenRessource) return chosenRessource.fk_site;
    if (selectedRessource) return selectedRessource.fk_site;
    return null;
  }, [selectedSite, chosenRessource, selectedRessource]);

    console.log("Liste brute des users :", users);
  console.log("Site cible actuel (targetSiteId) :", targetSiteId);

  const filteredUsers = useMemo(() => {
    const baseList = targetSiteId 
      ? users.filter((u) => u.fk_site === targetSiteId) 
      : users;

    return baseList.filter((u) => {
      const role = (u.role || "").toLowerCase();
      return role !== "admin" && role !== "gestionnaire" && role !== "manager";
    });
  }, [users, targetSiteId]);

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

  if (!selectedRessource && !selectedSite) return null;

  const handleChooseRessource = (r: Ressource) => {
    if (r.places_disponibles <= 0) return;
    setChosenRessource(r);
    setPlaces(1);
    setErrorMessage("");
  };

  const forceFullHour = (timeStr: string) => {
    if (!timeStr) return "09:00";
    const [hours] = timeStr.split(":");
    return `${hours}:00`;
  };

  const handleValidate = async () => {
    setErrorMessage("");
    if (!chosenRessource) {
      setErrorMessage("Veuillez choisir une ressource");
      return;
    }
    const userId = isAdmin ? selectedUserId : currentUser?.id_utilisateur ?? "";
    if (!userId) {
      setErrorMessage("Veuillez choisir un membre");
      return;
    }

    setSubmitting(true);
    const result = await bookRessource(
      chosenRessource.id_ressource,
      userId,
      date,
      forceFullHour(startTime),
      forceFullHour(endTime),
      places,
    );
    setSubmitting(false);

    if (result.success) {
      showToast("Réservation effectuée avec succès !", "success"); 
      fetchRessourcesBySite(chosenRessource.fk_site);
      if (isAdmin) fetchAllRessources();
      onClose();
    } else {
      showToast(result.error ?? "Échec de la réservation", "error"); 
    }
  };

  return (
    <div className="booking-modal_overlay" onClick={onClose}>
      <div
        className="booking-modal_container admin-adding-booking-overlay_container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="booking-modal-title"
          className="booking-modal_title admin-adding-booking-overlay_title typo-h2"
        >
          Réserver des places
        </h2>

        {isAdmin && (
          <>
            <h3 className="admin-adding-booking-overlay_member-selection_title typo-h3">
              choisissez le membre
            </h3>
            <CustomSelectUser
              label="Membre sélectionné"
              items={filteredUsers}
              selectedValue={selectedUserId}
              onChange={(val) => setSelectedUserId(val)}
              placeholder="-- Choisir un profil --"
              renderOption={(user: any) => `${user.login || user.mail}`}
            />
          </>
        )}

        {selectedSite && (
          <>
            <h3 className="admin-adding-booking-overlay_member-selection_title typo-h3">
              choisissez la ressource ({selectedSite.nom})
            </h3>
            <div className="booking-modal_ressource-list">
              {siteRessources.length === 0 && (
                <p className="typo-body">Aucune ressource sur ce site</p>
              )}
              {siteRessources.map((r) => {
                const isSelected = chosenRessource?.id_ressource === r.id_ressource;
                const isFull = r.places_disponibles <= 0;
                const cardClass = [
                  "card_site_container-display",
                  "bookingRessourceCard",
                  isSelected ? "bookingRessourceCard--selected" : "",
                  isFull ? "bookingRessourceCard--full" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={r.id_ressource}
                    role="button"
                    tabIndex={isFull ? -1 : 0}
                    aria-pressed={isSelected}
                    aria-disabled={isFull}
                    className="booking-modal_ressource-item"
                    onClick={() => handleChooseRessource(r)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleChooseRessource(r);
                      }
                    }}
                  >
                    <Card className={cardClass}>
                      <div className="card_site_inner-container-display">
                        <div className="card_site_img-container">
                          <div className={r.types === "Salle" ? "card_site_room_img" : "card_site_desk_img"} />
                        </div>
                        <div className="card_site_info-container">
                          <div className="card_site_info-inner-container">
                            <h3 className="admin-adding-booking-overlay_container-resource-name typo-h3">
                              {r.nom_de_la_ressource}
                            </h3>
                            <p className="card_site_info-container-place-configuration typo-body">
                              {r.types} ({r.capacite_totale} place(s) max)
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {chosenRessource && (
          <BackgroundSet1>
            <h3 className="admin-adding-booking-overlay_container-resource-name typo-h3">
              {chosenRessource.nom_de_la_ressource}
            </h3>

            {!selectedSite && (
              <Card className="card_site_container-display">
                <div className="card_site_inner-container-display">
                  <div className="card_site_img-container">
                    <div className={chosenRessource.types === "Salle" ? "card_site_room_img" : "card_site_desk_img"} />
                  </div>
                  <div className="card_site_info-container">
                    <div className="card_site_info-inner-container">
                      <p className="card_site_info-container-place-configuration typo-body">
                        {chosenRessource.types} ({chosenRessource.capacite_totale} place(s) max)
                      </p>
                      <p className="card_site_info-container-places typo-body">
                        {chosenRessource.places_disponibles} place(s) disponible(s)
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <h3 className="admin-adding-booking-overlay_places-choice_title">
              choisissez le nombre de place
            </h3>
            <BackgroundSet1 className="card_site_container-display">
              <CustomRangeInput
                label="Nombre de places souhaitées"
                min={1}
                max={chosenRessource.places_disponibles || 1}
                value={places}
                onChange={(e) => setPlaces(Number(e.target.value))}
                unit="place(s)"
              />
            </BackgroundSet1>

            <h3 className="admin-adding-booking-overlay_slot-choice_title">
              choisissez le créneau (heures pleines)
            </h3>
            <BackgroundSet1 className="card_site_container-display">
              <CustomTimeSlotInput
                date={date}
                startTime={startTime}
                endTime={endTime}
                onDateChange={setDate}
                onStartTimeChange={(val) => setStartTime(forceFullHour(val))}
                onEndTimeChange={(val) => setEndTime(forceFullHour(val))}
              />
            </BackgroundSet1>
          </BackgroundSet1>
        )}

        <span
          className="booking-modal_error"
          style={{ visibility: errorMessage ? "visible" : "hidden" }}
        >
          {errorMessage || "placeholder-invisible"}
        </span>

        <div className="booking-modal_actions admin-adding-booking-overlay_boutons_container">
          <Button
            children={submitting ? "..." : "valider"}
            variant="validator"
            buttonType="largeValidatorType"
            buttonPosition="center"
            onClick={submitting ? undefined : handleValidate}
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