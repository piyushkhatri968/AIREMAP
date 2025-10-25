import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetAllTransactionHistory } from "../../../lib/APIs/adminAPIs";
import { motion, number } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";

const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllTransactionHistory,
    queryKey: ["allTransactionHistory"],
  });

  const filteredTransactions = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();

    const emailMatch = item?.userId?.email?.toLowerCase().includes(query);
    const firstNameMatch = item?.userId?.firstName
      ?.toLowerCase()
      .includes(query);
    const lastNameMatch = item?.userId?.lastName?.toLowerCase().includes(query);
    const serialNoMatch = item?.serialNo?.toLowerCase().includes(query);
    const statusMatch = item?.status?.toLowerCase().includes(query);

    // Agar koi bhi match ho, to user ko include karo
    return (
      emailMatch ||
      firstNameMatch ||
      lastNameMatch ||
      serialNoMatch ||
      statusMatch
    );
  });

  if (isError) toast.error("Failed to load transactions");

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
      month: "short", // e.g. Aug
      day: "2-digit", // e.g. 30
      year: "numeric", // e.g. 2025
      hour: "2-digit", // e.g. 09
      minute: "2-digit", // e.g. 53
      hour12: false, // 24-hour format (set true for AM/PM)
    });
  };

  const formatCurrency = (amount) => {
    if (amount) amount = Number(amount);
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP", // British Pound
      minimumFractionDigits: 2,
    }).format(amount);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Transaction History</h2>
        <Input
          placeholder="Search transactions by email, name, transaction Id, status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
          data-testid="input-search-users"
        />
      </div>
      {/* Transactions Table */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-7 gap-4 py-3 text-xs font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
            <div className="text-center">Transaction ID</div>
            <div className="text-center">User</div>
            <div className="text-center">Email</div>
            <div className="text-center">Amount</div>
            <div className="text-center">Credits</div>
            <div className="text-center">Status</div>
            <div className="text-center">Date</div>
          </div>
          {/* Content */}
          <div className="divide-y divide-zinc-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching
                Transactions...
              </div>
            ) : filteredTransactions?.length > 0 ? (
              filteredTransactions.map((row) => (
                <div
                  key={row._id}
                  className="grid grid-cols-7 items-center gap-4 py-4 text-sm"
                >
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.serialNo}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.userId?.firstName + " " + row?.userId?.lastName}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.userId?.email}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {formatCurrency(row?.amount)}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row?.credits}
                  </div>
                  <div className="col-span-1 flex justify-center items-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full min-w-[70px] text-center whitespace-nowrap 
    ${
      row?.status === "Completed"
        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
        : row?.status === "Failed"
        ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
    }`}
                    >
                      {row?.status || "N/A"}
                    </span>
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {formatDateTime(row?.createdAt)}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-zinc-500 dark:text-gray-400">
                No transactions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminTransactions;
