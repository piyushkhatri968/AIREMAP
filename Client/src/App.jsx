import { Navigate, Route, Routes } from "react-router";
import Signup from "./Pages/Signup/Signup";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Unverified from "./Pages/Unverified/Unverified";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import UploadFile from "./Pages/UserPages/UploadFile/UploadFile";
import PageLoader from "./components/Loader/PageLoader/PageLoader";

import UserDashboardLayout from "./components/Layout/DashboardLayout/UserDashboardLayout";
import AdminDashboardLayout from "./components/Layout/DashboardLayout/AdminDashboardLayout";

import useAuthUser from "./hooks/useAuthUser";
import MyFiles from "./Pages/UserPages/MyFiles/MyFiles";
import Signin from "./Pages/Signin/Signin";
import BuyCredits from "./Pages/UserPages/BuyCredits/BuyCredits";
import OrderDetails from "./Pages/UserPages/OrderDetails/OrderDetails";
import Checkout from "./Pages/UserPages/Checkout/Checkout";
import ModificationPlan from "./Pages/UserPages/ModificationPlan/ModificationPlan";
import Overview from "./Pages/UserPages/Overview/Overview";
import ScrollToTop from "./components/ScrollToTop";
import PriceList from "./Pages/UserPages/PriceList/PriceList";
import Transactions from "./Pages/UserPages/Transactions/Transactions";
import AdminCredits from "./Pages/AdminPages/AdminCredits/AdminCredits";
import AdminFiles from "./Pages/AdminPages/AdminFiles/AdminFiles";
import AdminTransactions from "./Pages/AdminPages/AdminTransactions/AdminTransactions";
import AdminSettings from "./Pages/AdminPages/AdminSettings/AdminSettings";
import AdminUsers from "./Pages/AdminPages/AdminUsers/AdminUsers";
import AdminUnverifiedUsers from "./Pages/AdminPages/AdminUnverifiedUsers/AdminUnverifiedUsers";
import ProfileSettings from "./Pages/UserPages/ProfileSettings/ProfileSettings";
import TicketDetails from "./Pages/UserPages/TicketDetails/TicketDetails";
import AdminTicket from "./Pages/AdminPages/AdminTicket/AdminTicket";
import DisablePop from "./components/DisablePop";

import AdminDisabledUsers from "./Pages/AdminPages/AdminDisabledUsers/AdminDisabledUsers";
import AgentDashboardLayout from "./components/Layout/DashboardLayout/AgentDashboardLayout";
import AgentSettings from "./Pages/AgentPages/AgentSettings/AgentSettings";
import AdminAdmins from "./Pages/AdminPages/AdminAdmins/AdminAdmins";
import AdminAgents from "./Pages/AdminPages/AdminAgents/AdminAgents";
import AgentFiles from "./Pages/AgentPages/AgentFiles/AgentFiles";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";
import FaultyCodesPage from "./Pages/FaultyCodesPage/FaultyCodesPage";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";

import AutoData from "./Pages/UserPages/AutoData/AutoData";
import Car from "./Pages/UserPages/AutoData/Car/Car";
import Van from "./Pages/UserPages/AutoData/Van/Van";
import Pickup from "./Pages/UserPages/AutoData/Pickup/Pickup";
import Atv from "./Pages/UserPages/AutoData/Atv/Atv";
import Motorhome from "./Pages/UserPages/AutoData/Motorhome/Motorhome";
import Truck from "./Pages/UserPages/AutoData/Truck/Truck";
import Agriculture from "./Pages/UserPages/AutoData/Agriculture/Agriculture";
import Bike from "./Pages/UserPages/AutoData/Bike/Bike";
import Jetski from "./Pages/UserPages/AutoData/Jetski/Jetski";
import SnowMobile from "./Pages/UserPages/AutoData/SnowMobile/SnowMobile";
import Construction from "./Pages/UserPages/AutoData/Construction/Construction";
import Bus from "./Pages/UserPages/AutoData/Bus/Bus";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.onBoarded;
  const isVerified = authUser?.verified;
  const role = authUser?.role;
  const isDisabled = authUser?.disabled;

  const redirectIfAuth = () => {
    if (!isAuthenticated) return null;
    if (!isOnboarded) return <Navigate to="/onboarding" />;
    if (!isVerified) return <Navigate to="/unverified" />;
    return (
      <Navigate to={authUser?.role === "agent" ? "/files" : "/dashboard"} />
    );
  };

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate
                to={authUser?.role === "agent" ? "/files" : "/dashboard"}
              />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {isAuthenticated && isOnboarded && isVerified && role === "user" && (
          <Route element={<UserDashboardLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/price-list" element={<PriceList />} />
            <Route path="/buy-credits" element={<BuyCredits />} />
            <Route path="/order-details" element={<OrderDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/upload-file" element={<UploadFile />} />
            <Route path="/modification-plan" element={<ModificationPlan />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/my-files" element={<MyFiles />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route
              path="/ticket-details/:ticketNumber"
              element={<TicketDetails />}
            />
            <Route path="/fault-codes" element={<FaultyCodesPage />} />
            <Route path="/auto-data" element={<AutoData />} />
            <Route path="/cars" element={<Car />} />
            <Route path="/vans" element={<Van />} />
            <Route path="/pickups" element={<Pickup />} />
            <Route path="/motorhomes" element={<Motorhome />} />
            <Route path="/trucks" element={<Truck />} />
            <Route path="/agriculture" element={<Agriculture />} />
            <Route path="/atv" element={<Atv />} />
            <Route path="/bikes" element={<Bike />} />
            <Route path="/jet-ski" element={<Jetski />} />
            <Route path="/snow-mobile" element={<SnowMobile />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/bus" element={<Bus />} />
          </Route>
        )}

        {isAuthenticated && isOnboarded && isVerified && role === "admin" && (
          <Route element={<AdminDashboardLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/credits" element={<AdminCredits />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/agents" element={<AdminAgents />} />
            <Route path="/admins" element={<AdminAdmins />} />
            <Route
              path="/unverified-users"
              element={<AdminUnverifiedUsers />}
            />
            <Route path="/disabled-users" element={<AdminDisabledUsers />} />
            <Route path="/files" element={<AdminFiles />} />
            <Route path="/transactions" element={<AdminTransactions />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/ticket/:ticketNumber" element={<AdminTicket />} />
          </Route>
        )}

        {isAuthenticated && isOnboarded && isVerified && role === "agent" && (
          <Route element={<AgentDashboardLayout />}>
            <Route path="/files" element={<AgentFiles />} />
            <Route path="/ticket/:ticketNumber" element={<AdminTicket />} />
            <Route path="/credits" element={<AdminCredits />} />
            <Route path="/settings" element={<AgentSettings />} />
          </Route>
        )}

        <Route path="/signin" element={redirectIfAuth() || <Signin />} />
        <Route path="/signup" element={redirectIfAuth() || <Signup />} />

        <Route
          path="/password-reset"
          element={
            !isAuthenticated ? <PasswordReset /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/update-password/:token"
          element={
            !isAuthenticated ? <UpdatePassword /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnBoarding />
              ) : isVerified ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/unverified" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        <Route
          path="/unverified"
          element={
            isAuthenticated ? (
              isOnboarded && !isVerified ? (
                <Unverified />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/verify-email"
          element={
            isAuthenticated ? (
              isOnboarded && !isVerified ? (
                <VerifyEmail />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
      {isDisabled && (
        <div className="fixed inset-0 z-[9999]">
          <DisablePop />
        </div>
      )}
    </div>
  );
};

export default App;
