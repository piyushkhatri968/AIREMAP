import { Menu, User, LogOut, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

import useLogout from "../../../../hooks/useLogout";

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
