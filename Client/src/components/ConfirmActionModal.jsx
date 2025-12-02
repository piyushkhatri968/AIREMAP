import { motion } from "framer-motion";
import { Button } from "./ui/button";

const ConfirmActionModal = ({ open, onClose, onConfirm, title, message }) => {
    if (!open) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-[#1f1f1f] rounded-2xl shadow-xl p-6 w-[90%] max-w-sm border border-zinc-200 dark:border-zinc-700"
            >
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-gray-400 mt-2">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-zinc-300 dark:border-zinc-600 text-white"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700 text-white px-4"
                    >
                        Confirm
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmActionModal;
