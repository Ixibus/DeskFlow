import { useCallback, useEffect, useMemo, useState } from "react";
import "./home.css";
import { useSupabaseStore } from "@/stores/useSupabaseStore";
import type { Ressource, Site } from "@/stores/useSupabaseStore";
import { SiteCard } from "@/components/cards/SiteCard";
import { RessourceCard } from "@/components/cards/RessourceCard";
import { SiteRessources } from "@/components/ressources/SiteRessources";
// ⚠️ Adapte ce chemin à l'emplacement réel de ton overlay
import AdminAddingBookingOverlay from "@/components/overlays/AdminAddingBookingOverlay/AdminAddingBookingOverlay";

function sumPlaces(list: Ressource[]): number {
  return list.reduce((acc, r) => acc + (r.places_disponibles ?? 0), 0);
}

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

  // Ce qui ouvre la modale : soit une ressource précise, soit un site entier
  const [bookingRessource, setBookingRessource] = useState<Ressource | null>(null);
  const [bookingSite, setBookingSite] = useState<Site | null>(null);

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
      map.set(r.fk_site, (map.get(r.fk_site) ?? 0) + (r.places_disponibles ?? 0)),
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

  // Ressources du réseau triées par site puis par nom
  const ressourcesReseau = useMemo(
    () =>
      [...allRessources].sort(
        (a, b) =>
          (siteNameById.get(a.fk_site) ?? "").localeCompare(siteNameById.get(b.fk_site) ?? "") ||
          a.nom_de_la_ressource.localeCompare(b.nom_de_la_ressource),
      ),
    [allRessources, siteNameById],
  );

  // useCallback : évite de ré-abonner l'écouteur Échap de la modale à chaque rendu
  const handleCloseOverlay = useCallback(() => {
    setBookingRessource(null);
    setBookingSite(null);
  }, []);

  const handleOpenSite = (site: Site) => {
    setBookingRessource(null);
    setBookingSite(site);
  };

  const handleOpenRessource = (r: Ressource) => {
    setBookingSite(null);
    setBookingRessource(r);
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
              selectedId={bookingRessource?.id_ressource}
              onBook={handleOpenRessource}
            />
          </>
        ) : (
          /* --- Affichage Admin --- */
          <>
            {/* Partie haute : sites + totaux */}
            <h2 className="home_ressources-title typo-h2">Sites</h2>
            <h3 className="admin-home_total-ressource-type_title typo-h3">
              Total des ressources du réseau
            </h3>
            <div className="admin-home_total-ressource-infos_container">
              <p className="admin-home_desks-total">total bureaux : {totalBureaux}</p>
              <p className="admin-home_rooms-total">total salles : {totalSalles}</p>
            </div>

            <div className="home_desks-ressource_container">
              {sites.map((site) => (
                <SiteCard
                  key={site.id_site}
                  site={site}
                  freePlaces={placesBySite.get(site.id_site) ?? 0}
                  selected={bookingSite?.id_site === site.id_site}
                  onSelect={handleOpenSite}
                />
              ))}
            </div>

            {/* Partie basse : toutes les ressources du réseau */}
            <h2 className="home_ressources-title typo-h2">Ressources du réseau</h2>
            <div className="home_total-rooms-ressource_container">
              {ressourcesReseau.length === 0 && (
                <p className="typo-body">Aucune ressource</p>
              )}
              {ressourcesReseau.map((r) => (
                <RessourceCard
                  key={r.id_ressource}
                  ressource={r}
                  siteName={siteNameById.get(r.fk_site) ?? ""}
                  selected={bookingRessource?.id_ressource === r.id_ressource}
                  onBook={handleOpenRessource}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {(bookingRessource || bookingSite) && (
        <AdminAddingBookingOverlay
          selectedRessource={bookingRessource}
          selectedSite={bookingSite}
          onClose={handleCloseOverlay}
        />
      )}
    </>
  );
}
