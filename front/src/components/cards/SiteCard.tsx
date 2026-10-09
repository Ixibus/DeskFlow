import { Button } from "@/components/buttons/Buttons";
import { Card } from "@/components/cards/Card";
import type { Site } from "@/stores/useSupabaseStore";
import "./siteCard.css";

// Associe un site à sa classe d'image existante (fallback sur Le Capitole)
function getSiteImgClass(nom: string): string {
  const n = nom.toLowerCase();
  if (n.includes("sathonay")) return "card_site_le-sathonay_img";
  if (n.includes("royal")) return "card_site_le-royale_img";
  return "card_site_le-capitol_img";
}

interface SiteCardProps {
  site: Site;
  freePlaces: number;
  selected?: boolean;
  onSelect: (s: Site) => void;
}

export function SiteCard({ site, freePlaces, selected = false, onSelect }: SiteCardProps): React.ReactNode {
  const selectedClass = selected ? " siteCard--selected" : "";

  return (
    // Toute la carte est cliquable ; le clic sur "réserver" remonte jusqu'ici
    <Card
      className={`card_site_container-display siteCard${selectedClass}`}
      onClick={() => onSelect(site)}
    >
      <div className="card_site_inner-container-display">
        <div className="card_site_img-container">
          <div className={getSiteImgClass(site.nom)} />
        </div>
        <div className="card_site_info-container">
          <div className="card_site_info-inner-container">
            <h2 className="card_site_info-container-site-name typo-h2">
              {site.nom}
            </h2>
            <p className="card_site_info-container-site-address typo-body">
              {site.adresse}
            </p>
            <p className="card_site_info-container-site-zip-code typo-body">
              {site.zip_code}
            </p>
            {/* <p className="card_site_info-container-site-available-places typo-body">
              {freePlaces} place(s) libre(s) total
            </p> */}
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
