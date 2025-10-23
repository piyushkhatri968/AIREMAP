import React, { useState } from "react";
import porscheImage from "../../assets/AuthImages/car1.png";
import aiRemapLogo from "../../assets/logo/logo.png";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import useOnboarding from "../../hooks/useOnboarding";
import { countries } from "../../utils/CountriesData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const OnBoarding = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const { isPending, OnboardingMutation } = useOnboarding();

  const handleLogin = (e) => {
    e.preventDefault();
    OnboardingMutation(formData);
  };
  return (
    <div className="min-h-screen relative font-sans antialiased">
      {/* Background Image */}
      <div className="fixed inset-0">
        <img
          src={porscheImage}
          alt="Red Porsche Sports Car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex">
        {/* Desktop Logo Container - Centered */}
        <div className="hidden lg:flex w-1/2 items-center justify-center">
          <div className="flex flex-col mb-40 items-center">
            <img
              src={aiRemapLogo}
              alt="Ai REMAP Logo"
              className="w-96 h-auto -mb-40"
            />
            <h2 className="text-white text-2xl font-semibold text-center drop-shadow-lg italic">
              World Leading File Portal
            </h2>
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden w-full absolute -top-[1rem] flex flex-col items-center z-20">
          <img
            src={aiRemapLogo}
            alt="Ai REMAP Logo"
            className="w-60 h-auto -mb-[8.4rem]"
          />
          <h2 className="text-white italic text-sm font-semibold mt-8 text-center drop-shadow-lg">
            World Leading File Portal
          </h2>
        </div>

        {/* Form Container - Right side on desktop */}

        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-4 lg:mt-0">
          <div className="w-full lg:w-9/12 bg-zinc-50/90 dark:bg-[#242526]/90 backdrop-blur lg:p-16 p-10 rounded-lg shadow-2xl z-10">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-semibold mb-2">
              Complete Your Profile
            </h2>
            <p className="text-zinc-500 dark:text-gray-400 text-sm mb-8">
              Please provide your profile details to complete registration
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                  >
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                  >
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="country"
                  className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                >
                  Country
                </Label>
                <Select
                  value={formData.country}
                  required
                  onValueChange={(value) =>
                    handleSelectChange("country", value)
                  }
                >
                  <SelectTrigger className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400">
                    <SelectValue placeholder="Enter your country" />
                  </SelectTrigger>
                  <SelectContent
                    className="dark:bg-[#242526] relative"
                    side="top"
                  >
                    {countries.map((item) => (
                      <SelectItem
                        className="dark:text-white dark:bg-[#242526] dark:hover:bg-[#2f3031] cursor-pointer"
                        key={item.code}
                        value={item.code}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <Input
                  type="text"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Select your country"
                  className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  required
                /> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label
                    htmlFor="city"
                    className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                  >
                    City
                  </Label>
                  <Input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="postalCode"
                    className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                  >
                    Post Code
                  </Label>
                  <Input
                    type="text"
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Enter your post code"
                    className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="address"
                  className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                >
                  Address
                </Label>
                <Input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="flex gap-6 justify-end items-center">
                {/* <Link
                  to="/signin"
                  className="hover:bg-[#374151] text-white font-medium py-1.5 px-5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-lg"
                  data-testid="button-submit"
                >
                  Back
                </Link> */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className=" bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-lg"
                  data-testid="button-submit"
                >
                  {isPending ? "Saving..." : "Save Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
