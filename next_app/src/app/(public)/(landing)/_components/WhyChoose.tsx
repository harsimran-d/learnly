"use client";

import { motion } from "motion/react";
import { Video, ChartBarIcon, Users, Tablet } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Expert-Led Video Courses",
    description:
      "Learn from industry professionals with high-quality video content.",
    icon: <Video className="h-12 w-12 text-blue-600" />,
  },
  {
    id: 2,
    title: "Track Your Progress",
    description: "Monitor your learning journey and achieve your goals.",
    icon: <ChartBarIcon className="h-12 w-12 text-green-600" />,
  },
  {
    id: 3,
    title: "Community & Support",
    description:
      "Engage with instructors and fellow learners through discussions.",
    icon: <Users className="h-12 w-12 text-yellow-600" />,
  },
  {
    id: 4,
    title: "Access Anytime, Anywhere",
    description: "Learn on desktop, tablet, or mobile, whenever you want.",
    icon: <Tablet className="h-12 w-12 text-purple-600" />,
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          Why Choose Learnly?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          The best learning experience, tailored for you.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            >
              {benefit.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {benefit.title}
              </h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
