import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import { Input } from "../../../components/ui/input";
import usePaymentHistory from "../../../hooks/usePaymentHistory";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

import { useTranslation } from "react-i18next";

const Transactions = () => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = usePaymentHistory();
  const [searchTerms, setSearchTerms] = useState("");

  const searchedTransaction = data?.data.filter((x) =>
    x.serialNo.toLowerCase().includes(searchTerms.toLowerCase())
  );

  if (isError) toast.error(t("transactions.loadError"));

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-4"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {t("transactions.title")}
      </h2>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-gray-500 h-4 w-4" />

        <Input
          className="pl-10 bg-zinc-50 dark:bg-[#242526]/90 border-zinc-200 dark:border-gray-700 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-gray-400"
          placeholder={t("transactions.searchPlaceholder")}
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl border border-zinc-200 dark:border-gray-700">
        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-sm text-zinc-900 dark:text-white">
            <thead className="text-xs font-medium text-zinc-500 dark:text-gray-400 border-b border-zinc-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-4 text-center">{t("transactions.table.date")}</th>
                <th className="py-3 px-4 text-center">{t("transactions.table.serialNumber")}</th>
                <th className="py-3 px-4 text-center">{t("transactions.table.credits")}</th>
                <th className="py-3 px-4 text-center">{t("transactions.table.total")}</th>
                <th className="py-3 px-4 text-center">{t("transactions.table.status")}</th>
                <th className="py-3 px-4 text-center">{t("transactions.table.invoice")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-200 dark:divide-gray-700">
              {isLoading ? (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td colSpan="6" className="py-10 text-center">
                    <div className="flex items-center justify-center text-zinc-500 dark:text-gray-400">
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      {t("transactions.loading")}
                    </div>
                  </td>
                </motion.tr>
              ) : searchedTransaction?.length > 0 ? (
                searchedTransaction.map((row, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4 px-4 text-center">{formatDateTime(row.createdAt)}</td>
                    <td className="py-4 px-4 text-center">{row.serialNo}</td>
                    <td className="py-4 px-4 text-center">{row.credits}</td>
                    <td className="py-4 px-4 text-center">£{row.amount}</td>

                    <td
                      className={`py-4 px-4 text-center font-medium ${row.status === "Completed"
                          ? "text-green-500"
                          : row.status === "Failed"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }`}
                    >
                      {row.status}
                    </td>

                    <td className="py-4 px-4 text-center">
                      <Button
                        variant="secondary"
                        size="xs"
                        className="bg-zinc-100 hover:bg-zinc-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-zinc-900 dark:text-white text-xs"
                      >
                        {t("transactions.download")}
                      </Button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <td
                    colSpan="6"
                    className="py-8 text-center text-zinc-500 dark:text-gray-400"
                  >
                    {t("transactions.noData")}
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


export default Transactions;
