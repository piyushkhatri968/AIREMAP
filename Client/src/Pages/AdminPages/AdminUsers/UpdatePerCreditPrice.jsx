import { useState } from "react";
import { Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UpdateCreditPrice } from "../../../lib/APIs/adminAPIs";

const UpdatePerCreditPrice = ({ userId, perCreditPrice }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(perCreditPrice || 60);

  const formatCurrency = (amount) => {
    console.log(typeof amount);
    if (typeof amount !== "number" || isNaN(amount)) return "£0.00";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP", // British Pound
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: UpdateCreditPrice,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
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

  return (
    <div className="col-span-1 text-center text-zinc-900 dark:text-white">
      <div className="flex items-center justify-center gap-2 group relative">
        {!editing && (
          <>
            <span>{formatCurrency(Math.round(perCreditPrice))}</span>
            <span
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              onClick={() => setEditing(true)}
            >
              <Pencil size={16} className="text-zinc-500 hover:text-red-500" />
            </span>
          </>
        )}

        <AnimatePresence>
          {editing && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-16 bg-transparent border-b border-zinc-400 focus:border-red-500 text-sm text-center text-zinc-900 dark:text-white outline-none"
              />
              <button
                onClick={handleUpdate}
                disabled={isPending}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md transition-all disabled:opacity-50"
              >
                {isPending ? "Updating..." : "Update"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UpdatePerCreditPrice;
