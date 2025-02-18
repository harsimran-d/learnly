"use client";

import { ReactNode } from "react";
import Navbar from "./(landing)/_components/Navbar";
import Footer from "./(landing)/_components/Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white transition-colors dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow pt-[68px]">{children}</main>
      <Footer />
    </div>
  );
}
