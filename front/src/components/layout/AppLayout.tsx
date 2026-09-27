// import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { ToastContainer } from "@/components/toast/Toast";
import "./AppLayout.css";
// import { MagnifyingGlassWithHat } from "../icons/MagnifyingGlassWithHat";

import { useAuthStore } from "@/stores/loginAuthed";
// import { Logout } from "../icons/Logout";

export function AppLayout(): React.ReactNode {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  return (
    <div className="app-shell">
      <nav className="app-nav">
        <h1 className="app-nav__title" onClick={() => navigate("/home")}>
          {/* <MagnifyingGlassWithHat /> */}
          CRM Detective
        </h1>
        <div className="app-nav__links">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `app-nav__link ${isActive ? "app-nav__link--active" : ""}`
            }
          >
            Produits QCQC
          </NavLink>
        </div>
        {login && (
          <NavLink to="/signin" className="logoutIconArrowAnimation">
            <span className="app-nav__user-text">{login}</span>
            <span className="app-nav__user-icon">
              {/* <Logout /> */}
            </span>
          </NavLink>
        )}
      </nav>
      <PageContainer>
        <Outlet />
      </PageContainer>
      <ToastContainer />
    </div>
  );
}
