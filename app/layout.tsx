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
  title: "Francis Cruz | Full Stack Developer Portfolio",
  description: "Portfolio of Francis Cruz (Francis Gerard). Full Stack Developer & Creative Problem Solver creating beautiful, functional, and user-centered digital experiences.",
  keywords: [
    "francis",
    "francis cruz",
    "francis gerard",
    "gerard",
    "francis portfolio",
    "portfolio",
    "full stack developer",
    "web developer",
    "software engineer",
    "react developer",
    "next.js developer"
  ],
  authors: [{ name: "Francis Cruz" }],
  creator: "Francis Cruz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-frncszxc.vercel.app",
    title: "Francis Cruz | Full Stack Developer Portfolio",
    description: "Portfolio of Francis Cruz (Francis Gerard). Full Stack Developer & Creative Problem Solver.",
    siteName: "Francis Cruz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francis Cruz | Full Stack Developer Portfolio",
    description: "Portfolio of Francis Cruz (Francis Gerard). Full Stack Developer & Creative Problem Solver.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "c42EcKQbGMEbCBTco-3WMamT8mBzjCKT9agvcAkiAUM",
  },
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
