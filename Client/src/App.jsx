import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Signin from "./Pages/SignIn/Signin";
import Signup from "./Pages/Signup/Signup";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Unverified from "./Pages/Unverified/Unverified";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./components/Loader/PageLoader";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.onBoarded;
  const isVerified = authUser?.verified;
  if (isLoading) return <PageLoader />;

  return (
    <Routes>
      {/* public Routes */}
      <Route
        path="/signin"
        element={
          !(isAuthenticated && isOnboarded && isVerified) ? (
            <Signin />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/signup"
        element={
          !(isAuthenticated && isOnboarded && isVerified) ? (
            <Signup />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/password-reset"
        element={
          !(isAuthenticated && isOnboarded && isVerified) ? (
            <PasswordReset />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Onboarding & Verification Routes (requires token) */}
      <Route
        path="/onboarding"
        element={
          isAuthenticated && !(isOnboarded && isVerified) ? (
            <OnBoarding />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/unverified"
        element={
          isAuthenticated && isOnboarded && !isVerified ? (
            <Unverified />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/verify-email"
        element={
          isAuthenticated && isOnboarded && !isVerified ? (
            <VerifyEmail />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/"
        element={
          isAuthenticated &&
          isOnboarded &&
          isVerified &&
          authUser?.role === "user" ? (
            <UserDashboard />
          ) : authUser?.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
    </Routes>
  );
};
export default App;
