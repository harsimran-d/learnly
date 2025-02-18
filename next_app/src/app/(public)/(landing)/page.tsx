"use client";

import Hero from "./_components/Hero";
import CourseShowcase from "./_components/CourseShowcase";
import HowItWorks from "./_components/HowItWorks";
import WhyChoose from "./_components/WhyChoose";
import Testimonials from "./_components/Testimonials";
import Pricing from "./_components/Pricing";
import CTA from "./_components/CTA";
import FAQ from "./_components/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CourseShowcase />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Pricing />
      <CTA />
      <FAQ />
    </>
  );
}
