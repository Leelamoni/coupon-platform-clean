import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coupon Platform – Best Deals & Promo Codes",
  description: "Find verified coupons, promo codes, and best deals for top brands.",
  verification: {
    google: "aEy9TxruLlxHPJwwd2lhCqxEi5rKLXcdCFdg6WiV_zA"   // 👈 your Google Search Console code
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


