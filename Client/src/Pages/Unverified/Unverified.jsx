import porscheImage from "../../assets/AuthImages/car1.png";
import useAuthUser from "../../hooks/useAuthUser";
import { toast } from "react-toastify";
import useLogout from "../../hooks/useLogout";

import useResendSignupEmailVerify from "../../hooks/useResendSignupEmailVerify";

const Unverified = () => {
  const { authUser, isLoading } = useAuthUser();

  const { isPending, resendEmailMutation } = useResendSignupEmailVerify();

  const { logoutMutation } = useLogout();

  const handleResendVerification = () => {
    try {
      if (!authUser?.email) {
        return toast.error(
          "Email not found. Please continue with different account."
        );
      }
      resendEmailMutation(authUser.email);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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

          <h2 className="text-zinc-900 dark:text-white text-2xl font-semibold mb-4">
            Please verify your email address
          </h2>

          <p className="text-zinc-600 dark:text-gray-300 mb-4">
            A fresh verification link has been sent to your email address.
          </p>

          <p className="text-zinc-600 dark:text-gray-300 mb-6">
            Before proceeding, please check your email for a verification link.{" "}
            <button
              onClick={handleResendVerification}
              className="text-red-500 hover:text-red-400 transition-colors underline"
            >
              Click here
            </button>{" "}
            to request another if you did not receive the email.
          </p>

          <div className="border-t border-zinc-200 dark:border-gray-700 pt-6">
            <p className="text-zinc-600 dark:text-gray-300">
              Want to use a different account?{" "}
              <button
                onClick={logoutMutation}
                className="text-red-500 hover:text-red-400 transition-colors underline"
              >
                Click here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unverified;
