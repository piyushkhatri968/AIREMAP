import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Signin from "./Pages/SignIn/Signin";
import Signup from "./Pages/Signup/Signup";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Unverified from "./Pages/Unverified/Unverified";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "./Pages/Dashboard/AdminDashboard/AdminDashboard";
import useAuthUser from "./hooks/useAuthUser";
import PageLoader from "./components/Loader/PageLoader";
import UploadFile from "./Pages/UploadFile/UploadFile";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return <PageLoader />;

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.onBoarded;
  const isVerified = authUser?.verified;
  const role = authUser?.role;

  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route
        path="/signin"
        element={
          isAuthenticated ? (
            isVerified ? (
              <Navigate to="/" />
            ) : isOnboarded ? (
              <Navigate to="/unverified" />
            ) : (
              <Navigate to="/onboarding" />
            )
          ) : (
            <Signin />
          )
        }
      />
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            isVerified ? (
              <Navigate to="/" />
            ) : isOnboarded ? (
              <Navigate to="/unverified" />
            ) : (
              <Navigate to="/onboarding" />
            )
          ) : (
            <Signup />
          )
        }
      />
      <Route
        path="/password-reset"
        element={!isAuthenticated ? <PasswordReset /> : <Navigate to="/" />}
      />

      {/* 🧭 Onboarding Routes */}
      <Route
        path="/onboarding"
        element={
          isAuthenticated ? (
            !isOnboarded ? (
              <OnBoarding />
            ) : isVerified ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/unverified" />
            )
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* 📩 Unverified Routes */}
      <Route
        path="/unverified"
        element={
          isAuthenticated ? (
            isOnboarded && !isVerified ? (
              <Unverified />
            ) : isVerified ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/onboarding" />
            )
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* ✅ Email Verification Page */}
      <Route
        path="/verify-email"
        element={
          isAuthenticated ? (
            isOnboarded && !isVerified ? (
              <VerifyEmail />
            ) : isVerified ? (
              <Navigate to="/" />
            ) : (
              <Navigate to="/onboarding" />
            )
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      {/* 🏠 Authenticated Dashboard Routes */}
      <Route
        path="/"
        element={
          isAuthenticated && isOnboarded && isVerified ? (
            role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          ) : !isOnboarded ? (
            <Navigate to="/onboarding" />
          ) : !isVerified ? (
            <Navigate to="/unverified" />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated && isOnboarded && isVerified ? (
            role === "admin" ? (
              <AdminDashboard />
            ) : (
              <UserDashboard />
            )
          ) : !isOnboarded ? (
            <Navigate to="/onboarding" />
          ) : !isVerified ? (
            <Navigate to="/unverified" />
          ) : (
            <Navigate to="/signin" />
          )
        }
      />

      <Route path="/upload-file" element={<UploadFile />} />
    </Routes>
  );
};

export default App;
