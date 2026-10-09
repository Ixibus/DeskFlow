import { Button } from "@/components/buttons/Buttons";
import { Card } from "@/components/cards/Card";
import type { Ressource } from "@/stores/useSupabaseStore";
import "./ressourceCard.css";

interface RessourceCardProps {
  ressource: Ressource;
  siteName?: string; // si fourni → variante admin "Ressources du réseau"
  selected?: boolean;
  onBook: (r: Ressource) => void;
}

export function RessourceCard({
  ressource,
  siteName,
  selected = false,
  onBook,
}: RessourceCardProps): React.ReactNode {
  const imgClass =
    ressource.types === "Salle" ? "card_site_room_img" : "card_site_desk_img";
  const selectedClass = selected ? " ressourceCard--selected" : "";

  return (
    // Toute la carte est cliquable ; le clic sur "réserver" remonte jusqu'ici
    <Card
      className={`card_site_container-display ressourceCard${selectedClass}`}
      onClick={() => onBook(ressource)}
    >
      <div className="card_site_inner-container-display">
        <div className="card_site_img-container">
          <div className={imgClass} />
        </div>
        <div className="card_site_info-container">
          <div className="card_site_info-inner-container">
            <h2 className="card_site_info-container-resource-name typo-h2">
              {ressource.nom_de_la_ressource}
            </h2>
            <p
              className={`card_site_info-container-free-places ${siteName !== undefined ? "typo-body" : "typo-h3"}`}
            >
              capacité : {ressource.places_disponibles} place(s)
            </p>
            {siteName !== undefined && (
              <p className="card_site_info-site-belong typo-body"> site : {siteName}</p>
            )}
          </div>
          <Button
            children="réserver"
            variant="validator"
            buttonType="largeMediumType"
            buttonPosition="center"
          />
        </div>
      </div>
    </Card>
  );
}
