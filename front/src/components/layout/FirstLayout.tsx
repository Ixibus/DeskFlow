import { NavLink, Outlet} from "react-router";
import { PageContainer } from "@/components/layout/PageContainer";
import { Toast } from "@/components/toast/Toast";
import "./firstLayout.css";
import OnboardingProgressionBar from "../onboardingProgressionBar/OnboardingProgressionBar";


export function FirstLayout(): React.ReactNode {

  return (
    <div className="firstLayout-shell">
      <nav className="firstLayout">
        <div className="firstLayout__links">
        </div>
          <NavLink to="/" className="logoutIconArrowAnimation">
            <span className="firstLayout_text">retour</span>
            <span className="firstLayout_icon">
            </span>
          </NavLink>
      </nav>
      <OnboardingProgressionBar/>
      <PageContainer>
        <Outlet />
      </PageContainer>
      <Toast />
    </div>
  );
}
