import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "techloop | Rent AI wearables",
  description: "Try tomorrow's tech, today. No commitment, just curiosity.",
};

import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <TopNav />
        <div className="flex pt-16"> {/* Offset for sticky header */}
          {/* Sidebar is fixed, so we don't need it in the flex flow to take space, but we need to reserve space for it */}
          <Sidebar />
          <main className="flex-1 w-full md:pl-60 flex flex-col min-h-[calc(100vh-4rem)]">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
