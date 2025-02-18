import { ThemeProvider } from "@/providers/theme-provider";
import { ToasterProvider } from "@/providers/toaster-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToasterProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
