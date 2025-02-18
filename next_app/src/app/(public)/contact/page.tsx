"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-3xl font-bold"
      >
        Contact Us
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6 text-gray-600"
      >
        Have a question or just want to say hi? Fill out the form below!
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-4"
      >
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="h-32 w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
        >
          Send Message
        </motion.button>
      </motion.form>
    </div>
  );
}
