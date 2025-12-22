import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Lenis } from "@/components/lenis";
import { GSAPRuntime } from "@/components/gsap/runtime";
import { ReactTempus } from "tempus/react";
import Favicon from "@/components/Favicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio - Francis Cruz",
  description: "Full Stack Developer & Creative Problem Solver. I create beautiful, functional, and user-centered digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <Favicon />
        {children}
        <Lenis root options={{ duration: 1.2 }}>
          {/* Empty - Lenis handles root scrolling internally */}
        </Lenis>
        {/* Animation framework */}
        <GSAPRuntime />
        {/* RAF management */}
        <ReactTempus patch={true} />
        <Analytics />
      </body>
    </html>
  );
}
