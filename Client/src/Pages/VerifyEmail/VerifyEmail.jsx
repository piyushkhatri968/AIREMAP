import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import porscheImage from "../../assets/AuthImages/car1.png";
import useSignupEmailVerify from "../../hooks/useSignupEmailVerify";
import useResendSignupEmailVerify from "../../hooks/useResendSignupEmailVerify";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const { isPending, signupEmailVerifyMutation, error, isSuccess } =
    useSignupEmailVerify();
  const { isPending: isResending, resendEmailMutation } =
    useResendSignupEmailVerify();

  const [hasTried, setHasTried] = useState(false);

  const formData = { token, email };

  const handleEmailVerification = () => {
    if (!token || !email) return;
    setHasTried(true);
    signupEmailVerifyMutation(formData);
  };

  const handleResend = () => {
    if (!email) return toast.error("Email not found!");
    resendEmailMutation(email);
  };

  useEffect(() => {
    if (token && email) handleEmailVerification();
  }, [token, email]);

  const renderContent = () => {
    if (isPending) {
      return (
        <>
          <h2 className="text-zinc-900 dark:text-white text-2xl font-semibold mb-3">
            Verifying your email...
          </h2>
          <p className="text-zinc-600 dark:text-gray-300">
            Please wait while we confirm your email address.
          </p>
        </>
      );
    }

    if (isSuccess) {
      return (
        <>
          <h2 className="text-green-500 text-2xl font-semibold mb-3">
            Email verified successfully!
          </h2>
          <p className="text-zinc-600 dark:text-gray-300">
            You’ll be redirected shortly. Thanks for confirming your email.
          </p>
        </>
      );
    }

    if (error && hasTried) {
      return (
        <>
          <h2 className="text-red-500 text-2xl font-semibold mb-3">
            Verification failed
          </h2>
          <p className="text-zinc-600 dark:text-gray-300 mb-4">
            The verification link might be expired or invalid.
          </p>
          <p className="text-zinc-600 dark:text-gray-300 mb-6">
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-red-500 hover:text-red-400 transition-colors underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Click here"}
            </button>{" "}
            to send a new verification link.
          </p>
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen relative font-sans antialiased">
      {/* Background Image */}
      <div className="fixed inset-0">
        <img
          src={porscheImage}
          alt="Red Porsche Sports Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-zinc-50/90 dark:bg-gray-800/90 backdrop-blur p-8 rounded-lg shadow-2xl text-center">
          {/* Email Icon */}
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
