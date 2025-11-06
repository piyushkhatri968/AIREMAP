import React, { useState } from "react";
import { motion } from "framer-motion";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { EyeIcon, EyeOff, X } from "lucide-react";
import useCreateAdmin from "../../../hooks/Adminhooks/useCreateAdmin";

const CreateAdmin = ({ setAddAdminPopup }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const { createAdminMutation, isPending } = useCreateAdmin({
    setAddAdminPopup,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAdminMutation(formData);
  };

  return (
    <div className="w-full min-h-screen bg-black/40 flex items-center justify-center backdrop-blur-sm fixed inset-0 z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white dark:bg-[#242526] border border-zinc-200 dark:border-gray-700 shadow-2xl rounded-2xl w-[90%] sm:w-[420px] max-w-[90vw] p-8"
      >
        {/* Close Button */}
        <button
          onClick={() => setAddAdminPopup(false)}
          className="absolute right-5 top-5 text-zinc-500 dark:text-gray-400 hover:text-zinc-800 dark:hover:text-white transition-colors"
        >
          <X />
        </button>

        {/* Header */}
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white text-center mb-2">
          Create Admin
        </h1>
        <p className="text-zinc-500 dark:text-gray-400 text-sm text-center mb-6">
          Add a new admin to your team
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name */}
          <div>
            <Label
              htmlFor="firstName"
              className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
              className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-gray-400"
            />
          </div>

          {/* Last Name */}
          <div>
            <Label
              htmlFor="lastName"
              className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              required
              className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div>
            <Label
              htmlFor="email"
              className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none placeholder:text-zinc-500 dark:placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {isPending ? "Creating..." : "Create Admin"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAdmin;
