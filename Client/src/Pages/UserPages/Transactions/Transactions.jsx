import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { Input } from "../../../components/ui/input";
import usePaymentHistory from "../../../hooks/usePaymentHistory";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

const Transactions = () => {
  const { data, isLoading, isError } = usePaymentHistory();
  const [searchTerms, setSearchTerms] = useState("");

  const searchedTransaction = data?.data.filter((x) =>
    x.serialNo.toLowerCase().includes(searchTerms.toLowerCase())
  );

  if (isError) toast.error("Failed to load payment history");

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-gray-500 h-4 w-4" />
        <Input
          className="pl-10 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
          placeholder="Search transaction by serial no"
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 py-3 px-4 text-xs font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
            <div className="text-center">DATE</div>
            <div className="text-center">SERIAL NUMBER</div>
            <div className="text-center">CREDITS</div>
            <div className="text-center">TOTAL</div>
            <div className="text-center">STATUS</div>
            <div className="text-center">INVOICE</div>
          </div>

          {/* Content */}
          <div className="divide-y divide-zinc-200 dark:divide-gray-700">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-zinc-500 dark:text-gray-400">
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Fetching
                Data...
              </div>
            ) : searchedTransaction?.length > 0 ? (
              searchedTransaction.map((row, index) => (
                <div
                  key={index}
                  className="grid grid-cols-6 gap-4 py-4 px-4 text-sm"
                >
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {formatDateTime(row.createdAt)}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row.serialNo}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    {row.credits}
                  </div>
                  <div className="col-span-1 text-center text-zinc-900 dark:text-white">
                    £{row.amount}
                  </div>
                  <div
                    className={`col-span-1 text-center font-medium ${
                      row.status === "Completed"
                        ? "text-green-500"
                        : row.status === "Failed"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {row.status}
                  </div>
                  <div className="col-span-1 text-center">
                    <Button
                      variant="secondary"
                      size="xs"
                      className="bg-zinc-100 hover:bg-zinc-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-zinc-900 dark:text-white text-xs"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-zinc-500 dark:text-gray-400">
                No transactions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Transactions;
