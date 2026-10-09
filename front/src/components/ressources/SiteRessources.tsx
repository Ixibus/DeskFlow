import { RessourceCard } from "@/components/cards/RessourceCard";
import type { Ressource } from "@/stores/useSupabaseStore";

interface SiteRessourcesProps {
  ressources: Ressource[];
  selectedId?: number;
  onBook: (r: Ressource) => void;
}

export function SiteRessources({ ressources, selectedId, onBook }: SiteRessourcesProps): React.ReactNode {
  const bureaux = ressources.filter((r) => r.types === "Bureau");
  const salles = ressources.filter((r) => r.types === "Salle");

  return (
    <>
      <h2 className="home_ressources-title typo-h2">Ressources</h2>

      <h3 className="home_ressource-type_title home_ressource_desks_title typo-h3">
        Bureaux
      </h3>
      <div className="home_desks-ressource_container">
        {bureaux.length === 0 && <p className="typo-body">Aucun bureau</p>}
        {bureaux.map((r) => (
          <RessourceCard
            key={r.id_ressource}
            ressource={r}
            selected={selectedId === r.id_ressource}
            onBook={onBook}
          />
        ))}
      </div>

      <h3 className="home_ressource-type_title home_ressource_rooms_title typo-h3">
        Salles
      </h3>
      <div className="home_rooms-ressource_container">
        {salles.length === 0 && <p className="typo-body">Aucune salle</p>}
        {salles.map((r) => (
          <RessourceCard
            key={r.id_ressource}
            ressource={r}
            selected={selectedId === r.id_ressource}
            onBook={onBook}
          />
        ))}
      </div>
    </>
  );
}
