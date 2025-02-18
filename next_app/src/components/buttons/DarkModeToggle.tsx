"use client";

import { motion } from "motion/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme("light")}
          className="rounded-full bg-gray-200 p-2 text-gray-900 transition dark:bg-gray-800 dark:text-white"
        >
          <SunIcon className="h-6 w-6" />
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme("dark")}
          className="rounded-full bg-gray-200 p-2 text-gray-900 transition dark:bg-gray-800 dark:text-white"
        >
          <MoonIcon className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}
