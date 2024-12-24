import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LMS System",
  description: "Learning Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
