import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import ProtectedRoute from "./ProtectedRoute";
import { AutoLogoutChecker } from "./AutoLogoutChecker";
import LandingPage from "@/pages/LandingPage/LandingPage";
import { FirstLayout } from "@/components/layout/FirstLayout";
import DesignSystemView from "@/views/DesignSystemView";
import AccountCreationPage from "@/pages/AccountCreationPage/AccountCreationPage";
import SiteChoiceOnboardingPage from "@/pages/SiteChoiceOnboardingPage/SiteChoiceOnboardingPage";
import FormulaChoiceOnboardingPage from "@/pages/FormulaChoiceOnboardingPage/FormulaChoiceOnboardingPage";
import InfosConfirmationPageOnboardingPage from "@/pages/InfosConfirmationPageOnboardingPage/InfosConfirmationPageOnboardingPage";
import MailConfirmationOnboardingPage from "@/pages/MailConfirmationOnboardingPage/MailConfirmationOnboardingPage";
import ConnexionPage from "@/pages/ConnexionPage/ConnexionPage";
import { ConnexionLayout } from "@/components/layout/ConnexionLayout";
import HomePage from "@/pages/Home";
import MemberAddingBookingOverlay from "@/components/overlays/MemberAddingBookingOverlay/MemberAddingBookingOverlay";
import ReservationPage from "@/pages/ReservationPage/ReservationPage";
import MemberAnnulationOverlay from "@/components/overlays/MemberAnnulationOverlay/MemberAnnulationOverlay";
import UpdatePasswordPage from "@/pages/UpdatePasswordPage/UpdatePasswordPage";

export function AppRouter() {
  return (
    <BrowserRouter>
    <AutoLogoutChecker/>
      <Routes>
        <Route>
          <Route path="/" element={<LandingPage />} />
          <Route element={<FirstLayout />}>
            <Route path="/signup" element={<AccountCreationPage />} />
            <Route path="/siteChoiceOnboarding" element={<SiteChoiceOnboardingPage />} />
            <Route path="/formulaChoiceOnboarding" element={<FormulaChoiceOnboardingPage />} />
            <Route path="/infosConfirmationPageOnboarding" element={<InfosConfirmationPageOnboardingPage />} />
            <Route path="/mailConfirmationOnboarding" element={<MailConfirmationOnboardingPage />} />
          </Route>
        </Route>
          <Route element={<ConnexionLayout />}>
            <Route path="/signin" element={<ConnexionPage />} />
            <Route path="/updatePassword" element={<UpdatePasswordPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/memberBooking" element={<MemberAddingBookingOverlay />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/memberAnnulation" element={<MemberAnnulationOverlay />} />
          </Route>
        </Route>
        <Route element={<Navigate to="/signin" replace />} />
          <Route path="/design-system" element={<DesignSystemView />} />
      </Routes>
    </BrowserRouter>
  );
}
