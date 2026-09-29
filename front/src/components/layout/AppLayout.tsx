// import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { Toast } from "@/components/toast/Toast";
import "./AppLayout.css";
// import { MagnifyingGlassWithHat } from "../icons/MagnifyingGlassWithHat";

import { useAuthStore } from "@/stores/loginAuthed";
import NavBar from "../navBar/NavBar";
// import { Logout } from "../icons/Logout";

export function AppLayout(): React.ReactNode {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  return (
    <div className="app-shell">
      <NavBar/>
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Toast />
    </div>
  );
}
