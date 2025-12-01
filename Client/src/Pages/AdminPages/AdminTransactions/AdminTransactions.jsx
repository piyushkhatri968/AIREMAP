import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetAllTransactionHistory } from "../../../lib/APIs/adminAPIs";
import { motion } from "framer-motion";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";

const AdminTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data, isError } = useQuery({
    queryFn: GetAllTransactionHistory,
    queryKey: ["allTransactionHistory"],
  });

  if (isError) toast.error("Failed to load transactions");

  const filteredTransactions = data?.data?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item?.userId?.email?.toLowerCase().includes(query) ||
      item?.userId?.firstName?.toLowerCase().includes(query) ||
      item?.userId?.lastName?.toLowerCase().includes(query) ||
      item?.serialNo?.toLowerCase().includes(query) ||
      item?.status?.toLowerCase().includes(query)
    );
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatCurrency = (amount) => {
    if (amount) amount = Number(amount);
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Transaction History
        </h2>
        <Input
          placeholder="Search by email, name, transaction ID, or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-80 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
        />
      </div>

      {/* Table Container */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead>
              <tr className="bg-zinc-100 dark:bg-[#1c1d1e] border-b border-zinc-200 dark:border-gray-700 whitespace-nowrap font-medium">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
              {isLoading ? (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td
                    colSpan="7"
                    className="py-10 text-zinc-500 dark:text-gray-400"
                  >
                    <div className="flex justify-center items-center">
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Fetching Transactions...
                    </div>
                  </td>
                </motion.tr>
              ) : filteredTransactions?.length > 0 ? (
                filteredTransactions.map((row, index) => (
                  <motion.tr
                    key={row._id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="whitespace-nowrap text-xs sm:text-sm"
                  >
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.serialNo}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.userId?.firstName + " " + row?.userId?.lastName}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.userId?.email}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {formatCurrency(row?.amount)}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {row?.credits}
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full min-w-[70px] inline-block 
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
                    </td>
                    <td className="py-3 px-4 text-zinc-900 dark:text-white">
                      {formatDateTime(row?.createdAt)}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td
                    colSpan="7"
                    className="py-12 text-zinc-500 dark:text-gray-400"
                  >
                    No transactions found.
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminTransactions;
