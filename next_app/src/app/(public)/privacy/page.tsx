"use client";

import { motion } from "motion/react";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-3xl font-bold"
      >
        Privacy Policy
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600"
      >
        Your privacy is important to us. This generic privacy policy outlines
        how we collect, use, and protect your data while using this site.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 space-y-4"
      >
        <p className="text-gray-600">
          - We do not collect or sell your personal data.
        </p>
        <p className="text-gray-600">
          - Any information you provide is solely for the functionality of this
          site.
        </p>
        <p className="text-gray-600">
          - We use standard security measures to protect your information.
        </p>
      </motion.div>
    </div>
  );
}
