"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const courses = [
  {
    id: 1,
    title: "Master React in 30 Days",
    instructor: "John Doe",
    enrollments: "12,500",
    image: "/images/react.webp",
  },
  {
    id: 2,
    title: "The Complete Next.js Guide",
    instructor: "Jane Smith",
    enrollments: "9,800",
    image: "/images/nextjs.webp",
  },
  {
    id: 3,
    title: "Tailwind CSS from Scratch",
    instructor: "Alex Johnson",
    enrollments: "7,300",
    image: "/images/tailwindcss.png",
  },
];

export default function CourseShowcase() {
  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          Explore Our Popular Courses
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-center text-gray-600 dark:text-gray-300"
        >
          Learn from expert instructors and advance your skills.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800"
            >
              <Image
                src={course.image}
                alt={course.title}
                width={400}
                height={250}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {course.title}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {course.instructor}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {course.enrollments} enrolled
                </p>
                <Link href="/register">
                  <button className="mt-4 w-full rounded-lg bg-[hsl(25_100_50)] py-2 text-white transition hover:bg-[hsl(25_100_45)]">
                    Enroll Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
