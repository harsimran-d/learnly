"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(30_100_75)] to-[hsl(25_100_50)] py-20 text-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold md:text-6xl"
      >
        Master Any Skill, Anytime, Anywhere
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-4 max-w-2xl text-lg md:text-xl"
      >
        Learnly provides expert-led courses and a seamless learning experience
        to help you succeed.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mt-6"
      >
        <Button asChild size="lg">
          <Link href="/register">Get Started for Free</Link>
        </Button>
      </motion.div>
    </section>
  );
};

export default Hero;
