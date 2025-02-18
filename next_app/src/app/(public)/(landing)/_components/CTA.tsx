"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-[hsl(25_100_50)] py-16 text-center text-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold md:text-4xl"
        >
          Start Learning Today!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-lg"
        >
          Join thousands of students and take your skills to the next level.
        </motion.p>
        <Link href="/register">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-[hsl(25_100_50)] shadow-lg transition hover:bg-gray-200"
          >
            Get Started for Free
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
