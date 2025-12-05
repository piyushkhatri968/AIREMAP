import { motion } from "framer-motion";
import { useState } from "react";
import useAuthUser from "../../../hooks/useAuthUser";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import { countries } from "../../../utils/CountriesData";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { authUser } = useAuthUser();
  const { t } = useTranslation()


  const [formData, setFormData] = useState({
    firstName: authUser?.firstName || "",
    lastName: authUser?.lastName || "",
    country: authUser?.country || "",
    city: authUser?.city || "",
    address: authUser?.address || "",
    postalCode: authUser?.postalCode || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    isUpdatePassword: false,
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { isPending, updateProfileMutation } = useUpdateProfile({ setFormData });

  const [showPasswordPanel, setShowPasswordPanel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordPanel = () => {
    setShowPasswordPanel((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      isUpdatePassword: !prev.isUpdatePassword,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.isUpdatePassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        return toast.error("Passwords do not match!");
      }
      if (formData.newPassword.length < 6) {
        return toast.error("Password must be at least 6 characters long!");
      }
    }

    updateProfileMutation(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700 m-3 sm:m-6 mt-6 sm:mt-0"
    >
      <div className="bg-white dark:bg-[#1C1C1C] rounded-xl p-4 sm:p-8 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          {t('profileSettings.title')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                {t('profileDetails.labels.firstName')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                {t('profileDetails.labels.lastName')}<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
              {t('country')} <span className="text-red-600">*</span>
            </label>
            <select
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white appearance-none"
            >
              {countries.map((item) => (
                <option value={item.code} key={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
              {t('profileDetails.labels.city')} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
            />
          </div>

          {/* Address + Postal Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                {t('profileDetails.labels.address')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                {t('profileDetails.labels.postCode')} <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Post Code"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>
          </div>

          {/* Password Panel Toggle */}
          <button
            type="button"
            onClick={togglePasswordPanel}
            className="text-right text-gray-900 dark:text-white hover:text-red-600"
          >
            {showPasswordPanel ? t("profileDetails.labels.closePassPanel") : t("profileDetails.labels.wannaUpdatePass")}
          </button>

          {showPasswordPanel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                  {t("profileDetails.labels.currentPass")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required={showPasswordPanel}
                    placeholder={t("profileDetails.labels.currentPass")}
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
                  {t("profileDetails.labels.newPass")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    required={showPasswordPanel}
                    onChange={handleChange}
                    placeholder={t("profileDetails.labels.newPass")}
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
                  {t("profileDetails.labels.confirmPass")} <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    required={showPasswordPanel}
                    onChange={handleChange}
                    placeholder={t("profileDetails.labels.confirmPass")}
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


          {/* Submit Button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="px-5 sm:px-6 py-2.5 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors rounded-lg text-white font-medium disabled:bg-red-400"
            >
              {isPending ? t("saving") : t("saveChanges")}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Settings;
