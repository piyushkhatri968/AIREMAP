import React from "react";
import { motion } from "framer-motion";
import aiRemapLogo from "../../../assets/logo/logo.png";

const PageLoader = () => {
  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-gray-900 text-zinc-900 dark:text-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Logo with smooth zoom in/out animation */}
        <motion.img
          src={aiRemapLogo}
          alt="Ai REMAP Logo"
          className="w-72 h-auto"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default PageLoader;
