import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/commerce/CartDrawer";
import { ToastProvider } from "@/components/ui/Toast";
import { PRICING } from "@/lib/pricing";
import { isWaitlistMode } from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trytechloop.com"),
  title: "Techloop: Try AI wearables before you buy",
  description: `Try AI glasses, rings, earbuds and more before you buy. Rent for about ${PRICING.ratePct}% of retail a month, and your payments count toward owning it.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-2XYTMJLW0N`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2XYTMJLW0N');
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans text-paragraph antialiased bg-background`}>
        <ToastProvider>
          <TopNav />
          {/* The sidebar and bag only make sense once rentals are open. */}
          {!isWaitlistMode && <Sidebar />}
          {!isWaitlistMode && <CartDrawer />}

          {/* Main Content Area - offset for the sidebar when it is shown */}
          <div className={`flex flex-col min-h-screen${isWaitlistMode ? "" : " md:pl-64"}`}>
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
