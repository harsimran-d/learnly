"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import DarkModeToggle from "@/components/buttons/DarkModeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-50 w-full bg-white transition-all dark:bg-gray-900 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <motion.h1
            className="text-2xl font-bold text-gray-900 dark:text-white"
            whileHover={{ scale: 1.1 }}
          >
            <div className="flex justify-center space-x-2">
              <Image height="32" width="32" alt="logo" src="/logo.svg" />
              <h1 className="text-3xl font-semibold text-gray-900 drop-shadow-lg dark:text-white">
                Learnly
              </h1>
            </div>
          </motion.h1>
        </Link>
        <div className="flex items-center gap-4">
          {/* <DarkModeToggle /> */}
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
