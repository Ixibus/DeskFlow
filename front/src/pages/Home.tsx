import { Button } from "@/components/buttons/Buttons";
import "./home.css";
import { Card } from "@/components/cards/Card";

export default function HomePage(): React.ReactNode {
  return (
    <>
      {/* --- Affichage Membre/Gestionnaire --- */}

      <div className="home_info_container">
        <div className="home_site-info_container">
          <div className="home_site-info_left-container">
            <div className="home_site-info-img" />
            <div className="home_site-name_container">
              <p className="home_site-name_text typo-body">Le Capitol</p>
            </div>
          </div>
          <div className="home_site-places-infos_container">
            <div className="home_site-number-places-infos_container">
              <p className="home_site-number-places-infos typo-body">9</p>
            </div>
            <div className="home_site-places-infos-text-container">
              <p className="home_site-places-infos-text typo-body">
                place(s) disponible(s)
              </p>
            </div>
          </div>
        </div>

        <h2 className="home_ressources-title typo-h2">Ressources</h2>

        <h3 className="home_ressource-type_title home_ressource_desks_title typo-h3">
          Bureaux
        </h3>
        <div className="home_desks-ressource_container">
          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_desk_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-resource-name typo-h2">
                    lila
                  </h2>
                  <p className="card_site_info-container-free-places typo-h3">
                    1 place(s) libre(s)
                  </p>
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

          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_desk_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-resource-name typo-h2">
                    rose
                  </h2>
                  <p className="card_site_info-container-free-places typo-h3">
                    0 place(s) libre(s)
                  </p>
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
        </div>

        <h3 className="home_ressource-type_title home_ressource_rooms_title typo-h3">
          Salles
        </h3>
        <div className="home_rooms-ressource_container">
          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_room_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-resource-name typo-h2">
                    Tulipe
                  </h2>
                  <p className="card_site_info-container-free-places typo-h3">
                    2 place(s) libre(s)
                  </p>
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
          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_room_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-resource-name typo-h2">
                    Marguerite
                  </h2>
                  <p className="card_site_info-container-free-places typo-h3">
                    6 place(s) libre(s)
                  </p>
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
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            height: "1px",
            width: "100%",
            borderBottom: "1px solid black",
          }}
        >
          Admin
        </div>

        {/* --- Affichage Admin --- */}

        <h2 className="home_ressources-title typo-h2">Sites</h2>

        <div className="home_desks-ressource_container">
          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_le-capitol_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-site-name typo-h2">
                    Le Capitole
                  </h2>
                  <p className="card_site_info-container-site-address typo-body">
                    Place Capitole
                  </p>
                  <p className="card_site_info-container-site-zip-code typo-body">
                    31000 Toulouse
                  </p>
                  <p className="card_site_info-container-site-available-places typo-body">
                    20 place(s) libre(s) total
                  </p>
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

          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_le-sathonay_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-site-name typo-h2">
                    Le Sathonay
                  </h2>
                  <p className="card_site_info-container-site-address typo-body">
                    Place Sathonay
                  </p>
                  <p className="card_site_info-container-site-zip-code typo-body">
                    69001 Lyon
                  </p>
                  <p className="card_site_info-container-site-available-places typo-body">
                    12 place(s) libre(s) total
                  </p>
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

          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_le-royale_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-site-name typo-h2">
                    Le Royal
                  </h2>
                  <p className="card_site_info-container-site-zip-code typo-body">
                    Place Royal
                  </p>
                  <p className="card_site_info-container-site-zip-code typo-body">
                    44000 Nantes
                  </p>
                  <p className="card_site_info-container-site-available-places typo-body">
                    1 place(s) libre(s) total
                  </p>
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
        </div>

        <h3 className="admin-home_total-ressource-type_title typo-h3">
          Total des ressources du réseau
        </h3>
        <div className="admin-home_total-ressource-infos_container">
          <p className="admin-home_desks-total">total bureaux : 20</p>
          <p className="admin-home_rooms-total">total salles : 60</p>
        </div>
        <div className="home_total-rooms-ressource_container">
          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_room_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-resource-name typo-h2">
                    Tulipe
                  </h2>
                  <p className="card_site_info-container-free-places typo-body">
                    2 place(s) libre(s)
                  </p>
                  <p className="card_site_info-site-belong typo-h3">
                    Le Capitole
                  </p>
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
          <Card className="card_site_container-display">
            <div className="card_site_inner-container-display">
              <div className="card_site_img-container">
                <div className="card_site_room_img" />
              </div>
              <div className="card_site_info-container">
                <div className="card_site_info-inner-container">
                  <h2 className="card_site_info-container-resource-name typo-h2">
                    Marguerite
                  </h2>
                  <p className="card_site_info-container-free-places typo-body">
                    6 place(s) libre(s)
                  </p>
                  <p className="card_site_info-site-belong typo-h3">
                    Le Royale
                  </p>
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
        </div>
      </div>
    </>
  );
}
