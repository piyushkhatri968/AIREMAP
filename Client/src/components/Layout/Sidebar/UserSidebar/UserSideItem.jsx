import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
const UserSideItem = ({
  icon,
  label,
  isActive,
  onClick,
  hasSubmenu,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`space-y-0.5 ${className || ""}`}>
      <motion.button
        whileHover={{ x: 2 }}
        onClick={() => {
          if (hasSubmenu) {
            setIsOpen(!isOpen);
          } else if (onClick) {
            onClick();
          }
        }}
        className={`w-full flex items-center gap-3 px-2 py-1.5 rounded text-left transition-all ${
          isActive
            ? "bg-red-500 text-white"
            : hasSubmenu
            ? "text-gray-700 dark:text-zinc-300"
            : "text-gray-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-gray-900 dark:hover:bg-[#2B2B2B] dark:hover:text-white"
        } ${
          hasSubmenu
            ? "hover:bg-transparent hover:text-gray-900 dark:hover:text-white cursor-pointer"
            : ""
        }`}
      >
        {icon}
        <span className="text-sm flex-1">{label}</span>
        {hasSubmenu && (
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </motion.button>
      {hasSubmenu && isOpen && (
        <div className="pl-9 space-y-0.5">{children}</div>
      )}
    </div>
  );
};

export default UserSideItem;
