import { Navigate, Route, Routes } from "react-router";
import Signup from "./Pages/Signup/Signup";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Unverified from "./Pages/Unverified/Unverified";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";
import UploadFile from "./Pages/UserPages/UploadFile/UploadFile";
import PageLoader from "./components/Loader/PageLoader/PageLoader";

import UserDashboardLayout from "./components/Layout/DashboardLayout/UserDashboardLayout";
import AdminDashboardLayout from "./components/Layout/DashboardLayout/AdminDashboardLayout";

import useAuthUser from "./hooks/useAuthUser";
import MyFiles from "./Pages/UserPages/MyFiles/MyFiles";
import Signin from "./Pages/Signin/Signin";
import BuyCredits from "./Pages/UserPages/BuyCredits/BuyCredits";
import NotFound from "./Pages/NotFound/NotFound";
import OrderDetails from "./Pages/UserPages/OrderDetails/OrderDetails";
import Checkout from "./Pages/UserPages/Checkout/Checkout";
import ModificationPlan from "./Pages/UserPages/ModificationPlan/ModificationPlan";
import Overview from "./Pages/UserPages/Overview/Overview";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.onBoarded;
  const isVerified = authUser?.verified;
  const role = authUser?.role;

  const requireAuth = (element) => {
    if (!isAuthenticated) return <Navigate to="/signin" />;
    if (!isOnboarded) return <Navigate to="/onboarding" />;
    if (!isVerified) return <Navigate to="/unverified" />;
    return element;
  };

  const redirectIfAuth = () => {
    if (!isAuthenticated) return null;
    if (!isOnboarded) return <Navigate to="/onboarding" />;
    if (!isVerified) return <Navigate to="/unverified" />;
    return <Navigate to="/dashboard" />;
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {isAuthenticated && isOnboarded && isVerified && role === "user" && (
        <Route element={<UserDashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/buy-credits" element={<BuyCredits />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/upload-file" element={<UploadFile />} />
          <Route path="/modification-plan" element={<ModificationPlan />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/my-files" element={<MyFiles />} />
        </Route>
      )}

      {isAuthenticated && isOnboarded && isVerified && role === "admin" && (
        <Route element={<AdminDashboardLayout />}>
          <Route path="/dashboard" element={<AdminDashboard />} />
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
  );
};

export default App;
