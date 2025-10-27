import { motion } from "framer-motion";
import useLogout from "../hooks/useLogout";

const DisablePop = () => {
  const { logoutMutation } = useLogout();
  return (
    <div className="w-full min-h-screen bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white dark:bg-[#242526] border border-zinc-200 dark:border-gray-700 shadow-xl rounded-2xl w-[90%] sm:w-[400px] max-w-[90vw] p-8 text-center"
      >
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
          Account Disabled
        </h1>
        <p className="mt-6 text-zinc-600 dark:text-zinc-300 leading-relaxed">
          Your account has been temporarily disabled. Please contact our support
          team for assistance.
        </p>

        <div className="mt-10">
          <a
            href="mailto:support@example.com"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
          >
            Contact Support
          </a>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-3">
            or mail us at{" "}
            <a href="" className="text-red-600 cursor-pointer hover:underline">support@airemap.com</a>
          </p>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-8">
            Log in with another account.{" "}
            <button className="text-red-600 hover:underline hover:text-red-700 transition-all duration-300" onClick={logoutMutation}>
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default DisablePop;
