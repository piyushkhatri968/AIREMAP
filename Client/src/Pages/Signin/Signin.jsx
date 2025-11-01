import React, { useState } from "react";
import porscheImage from "../../assets/AuthImages/car1.png";
import aiRemapLogo from "../../assets/logo/logo.png";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Link } from "react-router";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import useSignIn from "../../hooks/useSignIn";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const { isPending, signinMutation } = useSignIn();
  const handleLogin = (e) => {
    e.preventDefault();
    signinMutation(formData);
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
          <div className="flex flex-col items-center">
            <img
              src={aiRemapLogo}
              alt="Ai REMAP Logo"
              className="w-96 h-auto"
            />
            <h2 className="text-white text-2xl font-semibold text-center drop-shadow-lg italic">
              World Leading File Portal
            </h2>
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden w-full absolute top-24 flex flex-col items-center z-20">
          <img src={aiRemapLogo} alt="Ai REMAP Logo" className="w-60 h-auto" />
          <h2 className="text-white italic text-sm font-semibold text-center drop-shadow-lg">
            World Leading File Portal
          </h2>
        </div>

        {/* Form Container - Right side on desktop */}

        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start px-4 lg:mt-0">
          <div className="w-full lg:w-9/12 bg-zinc-50/90 dark:bg-[#242526]/90 backdrop-blur lg:p-16 p-10 rounded-lg shadow-2xl z-10">
            <h2 className="text-zinc-900 dark:text-white text-2xl font-semibold mb-2">
              Login to AIREMAP
            </h2>
            <p className="text-zinc-500 dark:text-gray-400 text-sm mb-8">
              Please login to continue using our system
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600  focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="block text-zinc-900 dark:text-white text-sm font-medium mb-2"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 bg-white dark:bg-[#242526] text-zinc-900 dark:text-white rounded-lg border border-zinc-200 dark:border-gray-600 focus:outline-none transition-colors placeholder:text-zinc-500 dark:placeholder:text-gray-400"
                    required
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked)}
                    className="w-4 h-4 data-[state=checked]:bg-red-600 dark:data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 dark:data-[state=checked]:border-red-600 bg-white dark:bg-[#242526] border-zinc-200 dark:border-gray-600 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-zinc-500 dark:text-gray-300 text-sm cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/password-reset"
                  className="text-red-500 text-sm hover:text-red-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-gray-800 disabled:bg-zinc-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                data-testid="button-submit"
              >
                {isPending ? "Loading..." : "Continue"}
              </Button>
            </form>
            <div className="text-center text-zinc-500 dark:text-gray-400 text-sm mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-red-500 hover:text-red-400 transition-colors"
                data-testid="link-signin"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
