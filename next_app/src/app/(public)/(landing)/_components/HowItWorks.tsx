"use client";

import { motion } from "motion/react";
import { CheckCircleIcon } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Sign Up",
    description: "Create your free account in seconds.",
  },
  {
    id: 2,
    title: "Enroll in Courses",
    description: "Choose from a variety of expert-led courses.",
  },
  {
    id: 3,
    title: "Learn & Track Progress",
    description:
      "Watch videos, complete assignments, and monitor your progress.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          Get started in just three simple steps.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800"
            >
              <div className="flex items-center justify-center">
                <CheckCircleIcon className="h-12 w-12 text-[hsl(25_100_50)]" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
