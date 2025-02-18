"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";

const pricingPlans = [
  {
    id: 1,
    name: "Free Plan",
    price: "$0",
    features: [
      "Access to free courses",
      "Pay per course",
      "Community support",
      "Limited course materials",
    ],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    id: 2,
    name: "Pro Plan",
    price: "$19/month",
    features: [
      "Unlimited course access",
      "Expert mentorship",
      "Exclusive course materials",
      "Progress tracking & certificates",
    ],
    buttonText: "Start Learning",
    isPopular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "Custom",
    features: [
      "Team training & analytics",
      "Dedicated account manager",
      "Priority support",
      "Custom course creation",
    ],
    buttonText: "Contact Sales",
    isPopular: false,
  },
];

export default function Pricing() {
  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          Affordable plans tailored to your learning needs.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`rounded-lg p-6 shadow-lg ${
                plan.isPopular
                  ? "bg-[hsl(25_100_50)] text-white"
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-4xl font-bold">{plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className={cn(
                      "text-gray-700 dark:text-gray-300",
                      plan.isPopular && "text-white",
                    )}
                  >
                    • {feature}
                  </li>
                ))}
              </ul>
              <Link href={plan.name != "Enterprise" ? "/register" : "/contact"}>
                <button
                  className={`mt-6 w-full rounded-lg py-2 transition ${
                    plan.isPopular
                      ? "bg-white text-[hsl(25_100_50)] hover:bg-gray-200"
                      : "bg-[hsl(25_100_50)] text-white hover:bg-[hsl(25_100_45)]"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
