"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply create an account, browse courses, and click 'Enroll Now' on the course page.",
  },
  {
    question: "Are there any free courses available?",
    answer:
      "Yes! We offer a selection of free courses alongside our premium content.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes! Completing a course grants you a certificate that you can share on LinkedIn.",
  },
  {
    question: "Can I access courses on mobile?",
    answer:
      "Absolutely! Learnly is fully responsive and works seamlessly on all devices.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="mx-auto mt-12 max-w-2xl">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="border-b border-gray-300 dark:border-gray-700"
            >
              <button
                className="flex w-full items-center justify-between py-4 text-left font-medium text-gray-900 focus:outline-none dark:text-white"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <ChevronDownIcon
                  className={`h-6 w-6 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
