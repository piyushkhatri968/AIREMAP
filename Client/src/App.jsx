import React from "react";
import { Route, Routes } from "react-router";
import Signin from "./Pages/SignIn/Signin";
import Signup from "./Pages/Signup/Signup";
import PasswordReset from "./Pages/PasswordReset/PasswordReset";
import OnBoarding from "./Pages/Onboarding/OnBoarding";
import Unverified from "./Pages/Unverified/Unverified";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";

const App = () => {
  return (
    <Routes>
      {/* public Routes */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Onboarding & Verification Routes (requires token) */}
      <Route path="/onboarding" element={<OnBoarding />} />
      <Route path="/unverified" element={<Unverified />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/" element={<UserDashboard />} />
    </Routes>
  );
};

export default App;
