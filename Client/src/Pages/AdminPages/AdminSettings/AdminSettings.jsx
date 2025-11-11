import { motion } from "framer-motion";
import useAuthUser from "../../../hooks/useAuthUser";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProfile } from "../../../lib/APIs/adminAPIs";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

const AdminSettings = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    firstName: authUser?.firstName || "",
    lastName: authUser?.lastName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    isUpdatePassword: false,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showPasswordPanel, setShowPasswordPanel] = useState(false);

  const hadlePasswordPanel = () => {
    setShowPasswordPanel((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      isUpdatePassword: !prev.isUpdatePassword,
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    }));
  };

  const { isPending, mutate } = useMutation({
    mutationFn: async () => await UpdateProfile(formData),
    onSuccess: (data) => {
      setFormData({
        confirmPassword: "",
        currentPassword: "",
        newPassword: "",
      });
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.isUpdatePassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        return toast.error("Passwords do not match!");
      }
      if (formData.newPassword.length < 6) {
        return toast.error("Password must be at least 6 characters long!");
      }
    }
    mutate(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700 sm:m-6 mt-6 sm:mt-0"
    >
      <div className="bg-white dark:bg-[#1C1C1C] rounded-xl p-4 sm:p-8 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Profile Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                First Name{" "}
                <span className="text-red-600 dark:text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="First Name"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                Last Name{" "}
                <span className="text-red-600 dark:text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                required
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>

            <button
              type="button"
              onClick={hadlePasswordPanel}
              className="text-right text-gray-900 dark:text-white hover:text-red-600"
            >
              {showPasswordPanel
                ? "Close password panel?"
                : "Wanna update password?"}
            </button>

            {showPasswordPanel && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                    Current Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrent ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      required={showPasswordPanel}
                      placeholder="Current Password"
                      className="w-full px-4 py-2.5 pr-10 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                    New Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showNew ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      required={showPasswordPanel}
                      onChange={handleChange}
                      placeholder="New Password"
                      className="w-full px-4 py-2.5 pr-10 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                    Confirm Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      required={showPasswordPanel}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2.5 pr-10 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-white"
                    >
                      {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="px-5 sm:px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors rounded-lg text-white font-medium disabled:bg-red-400"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
