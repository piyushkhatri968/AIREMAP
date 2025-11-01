import { motion } from "framer-motion";
import { useState } from "react";
import useAuthUser from "../../../hooks/useAuthUser";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import { countries } from "../../../utils/CountriesData";

const Settings = () => {
  const { authUser } = useAuthUser();
  const [formData, setFormData] = useState({
    firstName: authUser?.firstName || "",
    lastName: authUser?.lastName || "",
    country: authUser?.country || "",
    city: authUser?.city || "",
    address: authUser?.address || "",
    postalCode: authUser?.postalCode || "",
  });

  const { isPending, updateProfileMutation } = useUpdateProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateProfileMutation(formData);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-50 dark:bg-[#242526]/90 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-gray-700 m-3 sm:m-6 mt-6 sm:mt-0"
    >
      <div className="bg-white dark:bg-[#1C1C1C] rounded-xl p-4 sm:p-8 border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg sm:text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Profile Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full px-4 py-2.5 bg-white dark:bg-[#141414] border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:border-red-600 dark:focus:border-red-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500"
              />
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
              Country <span className="text-red-600 dark:text-red-500">*</span>
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
              City <span className="text-red-600 dark:text-red-500">*</span>
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

          {/* Address + Post Code */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm text-gray-500 dark:text-zinc-400">
                Address{" "}
                <span className="text-red-600 dark:text-red-500">*</span>
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
                Post Code{" "}
                <span className="text-red-600 dark:text-red-500">*</span>
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

export default Settings;
