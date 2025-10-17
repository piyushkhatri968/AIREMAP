  import React from "react";
  import {
    Menu,
    User,
    LogOut,
    Moon,
    Sun,
    Monitor,
    Globe,
    Check,
  } from "lucide-react";
  import { motion } from "framer-motion";
  import { useNavigate } from "react-router";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
  } from "../../../ui/dropdown-menu";

  import useLogout from "../../../../hooks/useLogout";

  const languages = [
    { label: "English", value: "en", flag: "🇬🇧" },
    { label: "اردو", value: "ur", flag: "🇵🇰" },
    { label: "हिंदी", value: "hi", flag: "🇮🇳" },
    { label: "Türkçe", value: "tr", flag: "🇹🇷" },
    { label: "中文", value: "zh", flag: "🇨🇳" },
  ];

  const UserNavbar = ({ onMenuToggle, isSidebarOpen }) => {
    const navigate = useNavigate();

    const { logoutMutation } = useLogout();

    return (
      <nav className="h-16 bg-white dark:bg-[#1C1C1C] border-b border-zinc-200 dark:border-zinc-800 px-3 sm:px-6 flex items-center fixed top-0 left-0 right-0 z-50">
        {/* Left Section */}
        <div className="flex items-center flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden mr-2 sm:mr-4 p-1.5 sm:p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <motion.div
              animate={{ rotate: isSidebarOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-zinc-400" />
            </motion.div>
          </button>

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center mr-4 sm:mr-40 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="text-base sm:text-xl font-bold">
              <span className="text-red-600 dark:text-red-500 text-[1.1rem] sm:text-[1.3rem]">
                AI
              </span>
              <span className="text-gray-900 dark:text-zinc-100">REMAP</span>
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none focus:outline-none">
              <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-700 rounded-md flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                <User className="w-5 h-5 text-gray-600 dark:text-zinc-300" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 rounded-lg p-1 bg-white dark:bg-[#1C1C1C] border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              {/* 🌐 Language Selector */}
              {/* <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
                  <Globe className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                    Language
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-white dark:bg-[#1C1C1C] border border-zinc-200 dark:border-zinc-800 min-w-[160px]">
                  <DropdownMenuRadioGroup value="en">
                    {languages.map((lang) => (
                      <DropdownMenuRadioItem
                        key={lang.value}
                        value={lang.value}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <span>{lang.flag}</span>
                        <span className="text-sm text-gray-700 dark:text-zinc-300">
                          {lang.label}
                        </span>
                        {lang.value === "en" && (
                          <Check className="w-4 h-4 text-green-500 ml-auto" />
                        )}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub> */}

              {/* 🌗 Theme Selector */}
              {/* <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
                  <Moon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                    Theme
                  </span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-white dark:bg-[#1C1C1C] border border-zinc-200 dark:border-zinc-800 min-w-[160px]">
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Sun className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    <span className="text-sm text-gray-700 dark:text-zinc-300">
                      Light
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Moon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    <span className="text-sm text-gray-700 dark:text-zinc-300">
                      Dark
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Monitor className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                    <span className="text-sm text-gray-700 dark:text-zinc-300">
                      System
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub> */}

              {/* <DropdownMenuSeparator className="my-1 bg-zinc-200 dark:bg-zinc-800" />  */}

              {/* 🚪 Logout */}
              <DropdownMenuItem
                onClick={logoutMutation}
                className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-zinc-800"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="text-sm text-zinc-800 dark:text-white font-medium">
                  Sign Out
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    );
  };

  export default UserNavbar;
