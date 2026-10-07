import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/buttons/Buttons";
import "./home.css";
import { Card } from "@/components/cards/Card";
import { useSupabaseStore } from "@/stores/useSupabaseStore";
import type { Ressource, Site } from "@/stores/useSupabaseStore";
// ⚠️ Adapte ce chemin à l'emplacement réel de ton overlay
import AdminAddingBookingOverlay from "@/components/overlays/AdminAddingBookingOverlay/AdminAddingBookingOverlay";

/* ---------- Helpers ---------- */

// Associe un site à sa classe d'image existante (fallback sur Le Capitole)
function getSiteImgClass(nom: string): string {
  const n = nom.toLowerCase();
  if (n.includes("sathonay")) return "card_site_le-sathonay_img";
  if (n.includes("royal")) return "card_site_le-royale_img";
  return "card_site_le-capitol_img";
}

function sumPlaces(list: Ressource[]): number {
  return list.reduce((acc, r) => acc + (r.places_disponibles ?? 0), 0);
}

/* ---------- Cartes (markup et classes identiques à l'original) ---------- */

interface RessourceCardProps {
  ressource: Ressource;
  siteName?: string; // si fourni → variante admin "Total des ressources du réseau"
  onBook: (r: Ressource) => void;
}

function RessourceCard({ ressource, siteName, onBook }: RessourceCardProps) {
  const imgClass =
    ressource.types === "Salle" ? "card_site_room_img" : "card_site_desk_img";
  return (
    <Card className="card_site_container-display">
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
              {ressource.places_disponibles} place(s) libre(s)
            </p>
            {siteName !== undefined && (
              <p className="card_site_info-site-belong typo-h3">{siteName}</p>
            )}
          </div>
          <Button
            children="réserver"
            variant="validator"
            buttonType="largeMediumType"
            buttonPosition="center"
            onClick={() => onBook(ressource)}
          />
        </div>
      </div>
    </Card>
  );
}

interface SiteCardProps {
  site: Site;
  freePlaces: number;
  onSelect: (s: Site) => void;
}

function SiteCard({ site, freePlaces, onSelect }: SiteCardProps) {
  return (
    <Card className="card_site_container-display">
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
            <p className="card_site_info-container-site-available-places typo-body">
              {freePlaces} place(s) libre(s) total
            </p>
          </div>
          <Button
            children="réserver"
            variant="validator"
            buttonType="largeMediumType"
            buttonPosition="center"
            onClick={() => onSelect(site)}
          />
        </div>
      </div>
    </Card>
  );
}

/* ---------- Bloc Bureaux / Salles d'un site (Membre, Gestionnaire, et site choisi par l'admin) ---------- */

function SiteRessources({
  ressources,
  onBook,
}: {
  ressources: Ressource[];
  onBook: (r: Ressource) => void;
}) {
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
          <RessourceCard key={r.id_ressource} ressource={r} onBook={onBook} />
        ))}
      </div>

      <h3 className="home_ressource-type_title home_ressource_rooms_title typo-h3">
        Salles
      </h3>
      <div className="home_rooms-ressource_container">
        {salles.length === 0 && <p className="typo-body">Aucune salle</p>}
        {salles.map((r) => (
          <RessourceCard key={r.id_ressource} ressource={r} onBook={onBook} />
        ))}
      </div>
    </>
  );
}

/* ---------- Page ---------- */

export default function HomePage(): React.ReactNode {
  const {
    currentUser,
    currentSite,
    sites,
    ressources,
    allRessources,
    fetchUserSession,
    fetchSites,
    fetchRessourcesBySite,
    fetchAllRessources,
  } = useSupabaseStore();

  const [bookingRessource, setBookingRessource] = useState<Ressource | null>(
    null,
  );
  const [adminSelectedSite, setAdminSelectedSite] = useState<Site | null>(null);

  const isAdmin = currentUser?.role === "Admin";

  // Restaure la session si on arrive directement sur la page (refresh)
  useEffect(() => {
    if (!currentUser) fetchUserSession();
  }, []);

  // Chargement des données selon le rôle
  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.role === "Admin") {
      fetchSites();
      fetchAllRessources();
    } else if (currentUser.fk_site) {
      fetchRessourcesBySite(currentUser.fk_site);
    }
  }, [currentUser?.id_utilisateur, currentUser?.role]);

  // Admin : places libres par site + nom du site par id
  const placesBySite = useMemo(() => {
    const map = new Map<number, number>();
    allRessources.forEach((r) =>
      map.set(
        r.fk_site,
        (map.get(r.fk_site) ?? 0) + (r.places_disponibles ?? 0),
      ),
    );
    return map;
  }, [allRessources]);

  const siteNameById = useMemo(() => {
    const map = new Map<number, string>();
    sites.forEach((s) => map.set(s.id_site, s.nom));
    return map;
  }, [sites]);

  const totalBureaux = allRessources.filter((r) => r.types === "Bureau").length;
  const totalSalles = allRessources.filter((r) => r.types === "Salle").length;
  const toutesLesSalles = allRessources.filter((r) => r.types === "Salle");

  const handleAdminSelectSite = (site: Site) => {
    setAdminSelectedSite(site);
    fetchRessourcesBySite(site.id_site);
  };

  if (!currentUser) return null;

  return (
    <>
      <div className="home_info_container">
        {!isAdmin ? (
          /* --- Affichage Membre/Gestionnaire --- */
          <>
            <div className="home_site-info_container">
              <div className="home_site-info_left-container">
                <div className="home_site-info-img" />
                <div className="home_site-name_container">
                  <p className="home_site-name_text typo-body">
                    {currentSite?.nom ?? "—"}
                  </p>
                </div>
              </div>
              <div className="home_site-places-infos_container">
                <div className="home_site-number-places-infos_container">
                  <p className="home_site-number-places-infos typo-body">
                    {sumPlaces(ressources)}
                  </p>
                </div>
                <div className="home_site-places-infos-text-container">
                  <p className="home_site-places-infos-text typo-body">
                    place(s) disponible(s)
                  </p>
                </div>
              </div>
            </div>

            <SiteRessources
              ressources={ressources}
              onBook={setBookingRessource}
            />
          </>
        ) : (
          /* --- Affichage Admin --- */
          <>
            <h2 className="home_ressources-title typo-h2">Sites</h2>
            <h3 className="admin-home_total-ressource-type_title typo-h3">
              Total des ressources du réseau
            </h3>
            <div className="admin-home_total-ressource-infos_container">
              <p className="admin-home_desks-total">
                total bureaux : {totalBureaux}
              </p>
              <p className="admin-home_rooms-total">
                total salles : {totalSalles}
              </p>
            </div>

            <div className="home_desks-ressource_container">
              {sites.map((site) => (
                <SiteCard
                  key={site.id_site}
                  site={site}
                  freePlaces={placesBySite.get(site.id_site) ?? 0}
                  onSelect={handleAdminSelectSite}
                />
              ))}
            </div>

            {/* Ressources du site choisi via le bouton "réserver" d'une carte site */}
            {adminSelectedSite && (
              <>
                <h3 className="home_ressource-type_title typo-h3">
                  {adminSelectedSite.nom}
                </h3>
                <SiteRessources
                  ressources={ressources}
                  onBook={setBookingRessource}
                />
              </>
            )}

            {/* <div className="home_total-rooms-ressource_container">
              {toutesLesSalles.map((r) => (
                <RessourceCard
                  key={r.id_ressource}
                  ressource={r}
                  siteName={siteNameById.get(r.fk_site) ?? ""}
                  onBook={setBookingRessource}
                />
              ))}
            </div> */}
          </>
        )}
      </div>

      {bookingRessource && (
        <AdminAddingBookingOverlay
          selectedRessource={bookingRessource}
          onClose={() => setBookingRessource(null)}
        />
      )}
    </>
  );
}
