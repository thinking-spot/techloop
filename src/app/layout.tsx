import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TechLoop - Rent the Future",
  description: "Experience the latest tech gadgets with our flexible rental subscription.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans text-paragraph antialiased bg-background`}>
        <TopNav />
        <Sidebar />
        <CartDrawer />

        {/* Main Content Area - Offset for Sidebar and TopNav */}
        <div className="flex flex-col min-h-screen md:pl-64 pt-16">
          <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
