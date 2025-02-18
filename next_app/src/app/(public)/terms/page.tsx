"use client";

import { motion } from "motion/react";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-3xl font-bold"
      >
        Terms of Service
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        By accessing and using this website, you agree to the following terms
        and conditions. This is a generic placeholder text for a hobby project.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 space-y-4"
      >
        <p className="text-gray-600">
          - You may not use this website for unlawful purposes.
        </p>
        <p className="text-gray-600">
          - We are not responsible for any damages caused by using this site.
        </p>
        <p className="text-gray-600">
          - These terms are subject to change at any time.
        </p>
      </motion.div>
    </div>
  );
}
