"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    review:
      "Learnly transformed the way I learn! The courses are top-notch, and the platform is so easy to use.",
    rating: 5,
    image: "/images/emily.webp",
  },
  {
    id: 2,
    name: "Michael Brown",
    review:
      "The expert-led courses helped me land my dream job. Highly recommend to anyone looking to upskill.",
    rating: 5,
    image: "/images/michael.webp",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    review:
      "A fantastic learning experience. The progress tracking keeps me motivated to finish my courses.",
    rating: 4.5,
    image: "/images/sophia.webp",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          What Our Students Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-2 text-gray-600 dark:text-gray-300"
        >
          Hear from learners who have transformed their careers.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg bg-gray-100 p-6 shadow-lg dark:bg-gray-800"
            >
              <div className="flex justify-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {`"${testimonial.review}"`}
              </p>
              <div className="mt-3 flex justify-center">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-500" />
                ))}
                {testimonial.rating % 1 !== 0 && (
                  <StarIcon className="h-5 w-5 text-yellow-500 opacity-50" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
