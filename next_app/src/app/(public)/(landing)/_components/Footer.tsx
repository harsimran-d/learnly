"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 py-8 text-white"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold">Learnly</h3>
            <p className="mt-1 text-gray-400">
              Master any skill, anytime, anywhere.
            </p>
          </motion.div>

          <nav className="mt-4 flex space-x-6 md:mt-0">
            <Link href="/terms">
              <span className="cursor-pointer text-gray-400 transition hover:text-white">
                Terms
              </span>
            </Link>
            <Link href="/privacy">
              <span className="cursor-pointer text-gray-400 transition hover:text-white">
                Privacy
              </span>
            </Link>
            <Link href="/contact">
              <span className="cursor-pointer text-gray-400 transition hover:text-white">
                Contact
              </span>
            </Link>
          </nav>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Learnly. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}
