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
  title: "Francis Gerard A. Cruz | Technical Support Engineer & Full-Stack Developer",
  description: "Portfolio of Francis Gerard A. Cruz. Technical Support Engineer & Full-Stack Developer experienced in hardware/software troubleshooting, Active Directory management, network configuration, IT asset management, full-stack web development, and AI code evaluation.",
  keywords: [
    "francis",
    "francis cruz",
    "francis gerard cruz",
    "francis gerard",
    "gerard",
    "francis portfolio",
    "portfolio",
    "technical support engineer",
    "system administration",
    "active directory",
    "network configuration",
    "full stack developer",
    "web developer",
    "software engineer",
    "react developer",
    "next.js developer",
    "laravel developer",
    "ai code evaluation"
  ],
  authors: [{ name: "Francis Gerard A. Cruz" }],
  creator: "Francis Gerard A. Cruz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-frncszxc.vercel.app",
    title: "Francis Gerard A. Cruz | Technical Support Engineer & Full-Stack Developer",
    description: "Technical Support Engineer & Full-Stack Developer experienced in system administration, networking, IT support, web development, and AI code evaluation.",
    siteName: "Francis Gerard A. Cruz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Francis Gerard A. Cruz | Technical Support Engineer & Full-Stack Developer",
    description: "Technical Support Engineer & Full-Stack Developer experienced in system administration, networking, IT support, web development, and AI code evaluation.",
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
