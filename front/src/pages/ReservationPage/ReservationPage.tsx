import { Button } from "@/components/buttons/Buttons";
import "./reservationPage.css";
import { Card } from "@/components/cards/Card";
import { useState } from "react";
import CustomSelectUser from "@/components/inputs/CustomSelectUser";
import { supabase } from "@/lib/supabaseClient";

export default function ReservationPage(): React.ReactNode {
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

  // Les trois sites

  const [sitesId, setSitesId] = useState("");

  const sites = [
    {
      id: 1,
      name: "Le Sathonay",
      address: "Place Sathonay",
      zipCode: "69001 Lyon",
    },
    {
      id: 1,
      name: "Le Royale",
      address: "Place Royale",
      zipCode: "44000 Nantes",
    },
    {
      id: 1,
      name: "Le Capitole",
      address: "Place Capitole",
      zipCode: "31000 Toulouse",
    },
  ];

  // Exemple de 10 utilisateurs (qui viendront plus tard de Supabase)

  const [selectedUserId, setSelectedUserId] = useState("");

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

  return (
    <div className="reservation-page_container">
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Administrateur
      </div>

      {/* --- Affichage Administrateur --- */}

      <h3 className="admin-adding-booking-overlay_member-selection_title typo-h3">
        choisissez le site
      </h3>
      <CustomSelectUser
        label="Site sélectionné"
        items={sites}
        selectedValue={sitesId}
        onChange={(val) => setSitesId(val)}
        placeholder="-- Choisir un site --"
        renderOption={(site) => `${site.name} (${site.zipCode})`}
      />

      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          height: "1px",
          width: "100%",
          borderBottom: "1px solid black",
        }}
      >
        Gestionnaire de site et Administrateur 
      </div>

      {/* --- Affichage Gestionnaire --- */}

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
        Membre, Gestionnaire de site et Administrateur
      </div>

      {/* --- Affichage Membre --- */}

      <h2 className="member-booking-overlay_title typo-h2">Mes réservations</h2>

      <Card className="card_site_container-display">
        <div className="reservation-page_card_site_inner-container-display">
          <div className="card_site_img-container">
            <div className="card_site_desk_img" />
          </div>
          <div className="card_site_info-container">
            <div className="reservation-page_card_site_info-inner-container">
              <p className="reservation-page_card_site_info-container-resource-name typo-h3">
                Lila
              </p>
              <p className="reservation-page_card_site_info-container-free-places typo-body">
                1 place réservée
              </p>
              <ul className="reservation-page_info-reservation-container">
                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 13h à 14h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>

                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 8h à 14h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>

                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 16h à 18h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>

                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 9h à 10h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
      <Card className="card_site_container-display">
        <div className="reservation-page_card_site_inner-container-display">
          <div className="card_site_img-container">
            <div className="card_site_desk_img" />
          </div>
          <div className="card_site_info-container">
            <div className="reservation-page_card_site_info-inner-container">
              <p className="reservation-page_card_site_info-container-resource-name typo-h3">
                Tulipe
              </p>
              <p className="reservation-page_card_site_info-container-free-places typo-body">
                3 places réservées
              </p>
              <ul className="reservation-page_info-reservation-container">
                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 13h à 14h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>

                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 8h à 14h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>

                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 16h à 18h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>

                <li className="reservation-page_reservation-slot-container">
                  <p className="reservation-page_reservation-slot-info">
                    réservé de 9h à 10h le 14/05/26
                  </p>
                  <Button
                    children="Annuler"
                    variant="validator"
                    buttonType="largeMediumType"
                    buttonPosition="right"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
