import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

const roboto = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHRTNR",
  description:
    "Shorten URLs quickly and easily with our efficient URL shortener. Create manageable, shareable links with custom aliases, analytics tracking, and more. Perfect for social media, emails, and simplifying long URLs. Try it now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="flex flex-col h-[100%]">
      <body className={`${roboto.className} flex flex-col flex-1 h-[100%]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
