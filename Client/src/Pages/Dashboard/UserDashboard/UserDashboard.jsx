import { motion } from "framer-motion";
import useAuthUser from "../../../hooks/useAuthUser";
import carBackground from "../../../assets/AuthImages/car2.png";
import favIcon from "../../../../public/favicon.png";
const UserDashboard = () => {
  const { authUser } = useAuthUser();

  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP", // British Pound
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#171819] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Welcome Back, {authUser?.firstName || ""} {authUser?.lastName || ""}
        </h1>

        {/* <div className="bg-zinc-100 dark:bg-[#242526]/90 rounded-xl mb-6 sm:mb-10 px-4 sm:px-6 py-4 sm:py-6 relative overflow-hidden">
          <div
            className="absolute right-0 sm:right-48 top-0 w-full sm:w-2/3 h-full opacity-20"
            style={{
              background: `linear-gradient(to left, rgba(220, 38, 38, 0.2), transparent),
                        url(${carBackground})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center right 10%",
              zIndex: 0,
              pointerEvents: "none",
              marginBottom: "100px",
            }}
          ></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center space-x-3">
              <img
                src={favIcon}
                alt="Airemap Autodata"
                className="w-8 sm:w-auto"
              />
              <div>
                <div className="text-zinc-600 dark:text-gray-300 text-xs sm:text-sm">
                  The most advanced
                </div>
                <div className="text-zinc-900 dark:text-white text-lg sm:text-xl font-bold">
                  Airemap Autodata
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/auto-data")}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-md font-medium text-sm transition-colors duration-200"
            >
              Open Autodata
            </button>
          </div>
        </div> */}
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Files Card */}
          <div className="bg-zinc-100 dark:bg-[#242526]/90 rounded-xl p-4 sm:p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl sm:text-5xl font-light text-zinc-900 dark:text-white">
                  {authUser?.totalFilesSubmitted || 0}
                </span>
                <span className="text-base sm:text-lg text-zinc-600 dark:text-gray-400">
                  Files
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-gray-400">
                Your account file queries
              </p>
            </div>
            {/* Green wave */}
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 64"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,40 C100,35 200,30 300,28 C350,27 400,26 400,25 L400,64 L0,64 Z"
                  fill="#22c55e"
                  opacity="0.8"
                />
                <path
                  d="M0,40 C100,35 200,30 300,28 C350,27 400,26 400,25"
                  stroke="#22c55e"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Purchases Card */}
          <div className="bg-zinc-100 dark:bg-[#242526]/90 rounded-xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-5xl font-light text-zinc-900 dark:text-white mb-2">
                {formatCurrency(authUser?.totalMoneySpent)}
              </div>
              <p className="text-zinc-600 dark:text-gray-400 text-sm">
                Your account purchases
              </p>
            </div>
            {/* Red wave */}
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 64"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,35 C100,32 200,29 300,27 C350,26 400,25 400,24 L400,64 L0,64 Z"
                  fill="#ef4444"
                  opacity="0.8"
                />
                <path
                  d="M0,35 C100,32 200,29 300,27 C350,26 400,25 400,24"
                  stroke="#ef4444"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
