import { Menu, User, LogOut, Settings, Moon, Sun, Monitor, Globe, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

import favIcon from "../../../../../public/favicon.png";

import useLogout from "../../../../hooks/useLogout";
import { useTheme } from "../../../../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { QueueFiles } from "../../../../lib/APIs/ecuFileAPIs";
import { useEffect, useState } from "react";
import useLanguageUpdate from "../../../../hooks/useLanguageUpdate";
import i18n from "../../../../i18n";

const UserNavbar = ({ onMenuToggle, isSidebarOpen, authUser }) => {
  const navigate = useNavigate();
  const { t } = useTranslation()


  const { logoutMutation } = useLogout();
  const { updateLanguageMutation } = useLanguageUpdate()
  const { setTheme, theme } = useTheme();

  const { data, isLoading } = useQuery({
    queryFn: QueueFiles,
    queryKey: ["queueFiles"],
  });

  const [fileRoomStatus, setFileRoomStatus] = useState("Closed");
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 6 = Saturday
      const hour = now.getHours();
      const minute = now.getMinutes();
      const time = hour + minute / 60;

      let isOpen = false;

      if (day >= 1 && day <= 5) {
        // Monday - Friday: 9am - 7pm
        isOpen = time >= 9 && time < 19;
      } else if (day === 6) {
        // Saturday: 9am - 2pm
        isOpen = time >= 9 && time < 14;
      } else {
        // Sunday: closed
        isOpen = false;
      }
      setFileRoomStatus(isOpen ? "Open" : "Closed");
    };

    updateStatus(); // run immediately
    const interval = setInterval(updateStatus, 60 * 1000); // update every minute

    return () => clearInterval(interval);
  }, []);

  // Available languages
  const languages = [
    { label: 'English', value: 'en', flag: '🇬🇧' },
    { label: 'Español', value: 'es', flag: '🇪🇸' },
    { label: 'Français', value: 'fr', flag: '🇫🇷' },
    { label: 'Deutsch', value: 'de', flag: '🇩🇪' },
    { label: 'Italiano', value: 'it', flag: '🇮🇹' },
    { label: '日本語', value: 'ja', flag: '🇯🇵' },
    { label: '한국어', value: 'ko', flag: '🇰🇷' },
    { label: '中文', value: 'zh', flag: '🇨🇳' },
    { label: 'اردو', value: 'ur', flag: '🇵🇰' },
    { label: 'العربية', value: 'ar', flag: '🇸🇦' },
    { label: 'हिंदी', value: 'hi', flag: '🇮🇳' },
    { label: 'Türkçe', value: 'tr', flag: '🇹🇷' }
  ];

  const [language, setLanguage] = useState(authUser?.preferredLanguage || 'en');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage)
    updateLanguageMutation({ language: newLanguage })
  };

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
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 mr-4 sm:mr-24 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src={favIcon}
            alt="Airemap Autodata"
            className="w-10 rounded-full"
          />
          <span className="text-base sm:text-xl font-bold">
            <span className="text-red-600 dark:text-red-500 text-[1.1rem] sm:text-[1.3rem]">
              AI
            </span>
            <span className="text-gray-900 dark:text-zinc-100">REMAP</span>
          </span>
        </div>
        {/* Status Info - Hide on mobile */}
        {isLoading ? null : (
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-zinc-400">
                {t('fileRoom')}:
              </span>
              <span
                className={`text-sm font-medium px-2 py-0.5 rounded ${fileRoomStatus === "Open"
                  ? "text-green-600 dark:text-green-400 bg-green-400/10"
                  : "text-red-600 dark:text-red-500 bg-red-400/10"
                  }`}
              >
                {fileRoomStatus}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-gray-400 dark:text-zinc-600">|</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-zinc-400">
                  Queue:
                </span>
                <span className="text-sm font-medium px-2 py-0.5 rounded text-green-600 dark:text-green-400 bg-green-400/10">
                  {data?.data || 0}
                </span>
              </div>
            </div>
          </div>
        )}
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
            {/* Theme Selector */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
                <Moon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                  Theme
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white dark:bg-[#1C1C1C] border border-zinc-200 dark:border-zinc-800 min-w-[160px]">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 ${theme === "light" ? "font-semibold" : ""
                    }`}
                >
                  <Sun className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                  <span>Light</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 ${theme === "dark" ? "font-semibold" : ""
                    }`}
                >
                  <Moon className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                  <span>Dark</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 ${theme === "system" ? "font-semibold" : ""
                    }`}
                >
                  <Monitor className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Language Selector */}

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md">
                <Globe className="w-4 h-4 text-gray-500 dark:text-zinc-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                  Language
                </span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-white dark:bg-[#1C1C1C] border border-zinc-200 dark:border-zinc-800 min-w-[160px]">
                {
                  languages.map((lang, index) =>
                    <DropdownMenuItem key={index}
                      onClick={() => handleLanguageChange(lang.value)}
                      className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 ${theme === "light" ? "font-semibold" : ""
                        }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {language === lang.value && (
                        <Check className="w-4 h-4 text-green-500 ml-auto" />
                      )}
                    </DropdownMenuItem>)
                }


              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Settings */}
            <DropdownMenuItem
              onClick={() => navigate("/profile-settings")}
              className="flex items-center gap-2 px-3 py-2  cursor-pointer hover:bg-red-50 dark:hover:bg-zinc-800"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm text-zinc-800 dark:text-white font-medium">
                Settings
              </span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 bg-zinc-200 dark:bg-zinc-800" />
            {/* Logout */}
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
