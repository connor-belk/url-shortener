import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHRTNR",
  description:
    "Shorten URLs instantly with SHRTNR — a fast, free URL shortener with custom aliases, analytics, and link management. Perfect for social media and emails.",
  openGraph: {
    title: "SHRTNR - Shorten URLs quickly and easily",
    description:
      "Shorten URLs instantly with SHRTNR — a fast, free URL shortener with custom aliases, analytics, and link management. Perfect for social media and emails.",
    url: "https://shrtnr.belkweb.dev/",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col h-[100%]">
      <Analytics />
      <body
        className={`${roboto.className} flex flex-col h-[100%] bg-black text-gray-100`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
