import { motion } from "framer-motion";
import useAuthUser from "../../../hooks/useAuthUser";
import carBackground from "../../../assets/AuthImages/car2.png";
import favIcon from "../../../../public/favicon.png";
import { useQuery } from "@tanstack/react-query";
import { StatsAPI } from "../../../lib/APIs/authAPIs";
import FileStatsChart from "./Charts/FileStatsChart";
import MoneyStatsChart from "./Charts/MoneyStatsChart";
import { useNavigate } from "react-router";



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

  const formatDateTime = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
    if (diffDay === 1) return "Yesterday";
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;

    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const { data, isLoading } = useQuery({
    queryFn: StatsAPI,
    queryKey: ["statsData"],
  });

  const statsData = data?.data || [];

  const fileStatsChartData =
    statsData.length === 1
      ? [
          { month: `Start`, files: 0 },
          {
            month: statsData[0].month,
            files: statsData[0].totalFilesSubmitted,
          },
        ]
      : statsData.map((item) => ({
          month: item.month,
          files: item.totalFilesSubmitted,
        }));
  const amountSpentStatsChartData =
    statsData.length === 1
      ? [
          { month: `Start`, money: 0 },
          { month: statsData[0].month, money: statsData[0].totalMoneySpent },
        ]
      : statsData.map((item) => ({
          month: item.month,
          money: item.totalMoneySpent,
        }));

  const StatsCardSkeleton = () => (
    <>
      <div className="bg-zinc-100 dark:bg-[#242526]/90 rounded-xl p-4 sm:p-6 relative overflow-hidden animate-pulse">
        <div className="relative z-10">
          <div className="flex items-baseline space-x-2 mb-2">
            <span className="h-10 w-1/4 bg-zinc-300 dark:bg-zinc-700 rounded"></span>
          </div>
          <p className="h-3 w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded mt-4"></p>
        </div>
        <div className="h-32 mt-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
      </div>
      <div className="bg-zinc-100 dark:bg-[#242526]/90 rounded-xl p-6 relative overflow-hidden animate-pulse">
        <div className="relative z-10">
          <div className="h-10 w-2/5 bg-zinc-300 dark:bg-zinc-700 rounded mb-4"></div>
          <p className="h-3 w-1/3 bg-zinc-300 dark:bg-zinc-700 rounded"></p>
        </div>
        <div className="h-32 mt-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
      </div>
    </>
  );

  const navigate = useNavigate();



  return (
    <div className="bg-white dark:bg-[#171819] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl text-zinc-900 dark:text-white">
          Welcome Back,{" "}
          <span className="font-bold">
            {authUser?.firstName || ""} {authUser?.lastName || ""}
          </span>
        </h1>
        <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-gray-400 mb-2">
          Last login {formatDateTime(authUser?.lastLoginTime)}
        </p>

        <div className="bg-zinc-100 dark:bg-[#242526]/90 rounded-xl mt-6 mb-6 sm:mb-10 px-4 sm:px-6 py-4 sm:py-12 relative overflow-hidden">
          <div
            className="absolute left-0 top-0 w-full h-full opacity-20"
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
                className="w-10 rounded-full"
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
              // onClick={() => navigate("/auto-data")}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2 rounded-md font-medium text-sm transition-colors duration-200"
            >
              Open Autodata
            </button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {isLoading ? (
            <StatsCardSkeleton />
          ) : (
            <>
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
                <div className="absolute bottom-0 left-0 right-0">
                  <FileStatsChart data={fileStatsChartData} />
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
                <div className="absolute bottom-0 left-0 right-0">
                  <MoneyStatsChart
                    data={amountSpentStatsChartData}
                    formatCurrency={formatCurrency}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
