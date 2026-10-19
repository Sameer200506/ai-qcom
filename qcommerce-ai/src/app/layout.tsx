import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QCommerce AI — Quick Commerce Intelligence Platform",
  description: "AI-powered analytics, forecasting, and competitive intelligence for FMCG & D2C brands on Blinkit, Zepto, and Swiggy Instamart.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
