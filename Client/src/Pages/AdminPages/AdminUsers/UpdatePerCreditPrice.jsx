import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UpdateCreditPrice } from "../../../lib/APIs/adminAPIs";

const UpdatePerCreditPrice = ({ userId, perCreditPrice }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(perCreditPrice || 60);

  const formatCurrency = (amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateCreditPrice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["allAdmins"] });
      queryClient.invalidateQueries({ queryKey: ["allAgents"] });
      queryClient.invalidateQueries({ queryKey: ["allDisableUsers"] });
      toast.success(data?.message || "Credit price updated!");
      setEditing(false);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update price");
    },
  });

  const handleUpdate = () => {
    if (!value || value <= 0) return toast.error("Enter a valid price");
    const payload = {
      creditPrice: value,
      userId,
    };
    mutate(payload);
  };

  const handleCancel = () => {
    setValue(perCreditPrice || 60);
    setEditing(false);
  };

  return (
    <div className="text-center text-zinc-900 dark:text-white">
      <div className="flex items-center justify-center gap-2 group relative">
        <AnimatePresence mode="wait">
          {!editing ? (
            <motion.div
              key="display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <span>{formatCurrency(Math.round(perCreditPrice))}</span>
              <button
                onClick={() => setEditing(true)}
                className="p-1 rounded-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 hover:bg-zinc-200 dark:hover:bg-gray-700"
                aria-label="Edit credit price"
              >
                <Pencil size={16} className="text-zinc-500 hover:text-red-500" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-gray-400 text-sm">£</span>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-20 pl-5 pr-2 py-1.5 bg-white dark:bg-[#1c1d1e] border border-zinc-300 dark:border-gray-600 rounded-md text-sm text-zinc-900 dark:text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  autoFocus
                />
              </div>
              <button
                onClick={handleUpdate}
                disabled={isPending}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-md transition-all disabled:opacity-50 whitespace-nowrap"
              >
                {isPending ? "..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                disabled={isPending}
                className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-zinc-200 dark:hover:bg-gray-700 rounded-md transition-all disabled:opacity-50"
                aria-label="Cancel"
              >
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UpdatePerCreditPrice;
