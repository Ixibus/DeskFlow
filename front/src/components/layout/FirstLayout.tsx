import { NavLink, Outlet} from "react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ToastContainer } from "@/components/toast/Toast";
import "./firstLayout.css";

// import { Logout } from "../icons/Logout";

export function FirstLayout(): React.ReactNode {

  return (
    <div className="firstLayout-shell">
      <nav className="firstLayout">
        <div className="firstLayout__links">
        </div>
          <NavLink to="/" className="logoutIconArrowAnimation">
            <span className="firstLayout_text">retour</span>
            <span className="firstLayout_icon">
              {/* <Logout /> */}
            </span>
          </NavLink>
      </nav>
      <PageContainer>
        <Outlet />
      </PageContainer>
      <ToastContainer />
    </div>
  );
}
