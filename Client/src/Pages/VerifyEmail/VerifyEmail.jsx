import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useSignupEmailVerify from "../../hooks/useSignupEmailVerify";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const formData = { token, email };

  const { isPending, signupEmailVerifyMutation } = useSignupEmailVerify();

  const handleEmailVerification = () => {
    signupEmailVerifyMutation(formData);
  };

  useEffect(() => {
    if (token && email) handleEmailVerification();
  }, [token, email]);

  return (
    <div className="flex justify-center items-center h-screen">
      {isPending ? (
        <div className="text-center text-gray-300 text-lg">
          Verifying your email...
        </div>
      ) : (
        <div className="text-center text-green-500 text-lg">
          Verification process complete (you’ll be redirected shortly)
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
