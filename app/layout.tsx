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

const siteUrl = "https://portfolio-frncszxc.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Francis Gerard A. Cruz | Web Developer & Technical Support Engineer in Cavite, Philippines",
    template: "%s | Francis Gerard A. Cruz",
  },
  description:
    "Official website and portfolio of Francis Gerard A. Cruz (Francis Cruz) - Full-Stack Web Developer & Technical Support Engineer based in Imus City, Cavite, Philippines. Building custom websites, React/Next.js/Laravel web apps, and providing IT support, PC assembly, Active Directory, and network configuration.",
  keywords: [
    "francis cruz",
    "francis cruz website",
    "francis cruz portfolio",
    "francis gerard cruz",
    "francis gerard a. cruz",
    "francis gerard",
    "francis cruz developer",
    "francis cruz web developer",
    "francis cruz cavite",
    "dashotz",
    "frncszxc",
    "web developers near me",
    "web dev near me",
    "web developer near me",
    "freelance web developer near me",
    "full stack developer near me",
    "website developer near me",
    "website maker near me",
    "web developer imus",
    "web developer imus cavite",
    "web developer bacoor",
    "web developer cavite",
    "web developer metro manila",
    "web developer philippines",
    "hire web developer philippines",
    "freelance web developer cavite",
    "custom website developer philippines",
    "technical support engineer near me",
    "it support near me",
    "it support specialist cavite",
    "computer repair imus cavite",
    "pc assembly cavite",
    "system administration",
    "active directory",
    "network configuration",
    "full stack developer",
    "technical support engineer",
    "software engineer philippines",
    "react developer philippines",
    "next.js developer philippines",
    "laravel developer philippines",
    "ai code evaluation",
  ],
  authors: [{ name: "Francis Gerard A. Cruz", url: siteUrl }],
  creator: "Francis Gerard A. Cruz",
  publisher: "Francis Gerard A. Cruz",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteUrl,
    title: "Francis Gerard A. Cruz | Web Developer & Technical Support Engineer",
    description:
      "Official portfolio of Francis Gerard A. Cruz. Full-Stack Web Developer & Technical Support Engineer in Imus City, Cavite, Philippines specializing in React, Next.js, Laravel, IT support, and networking.",
    siteName: "Francis Gerard A. Cruz Website",
    images: [
      {
        url: "/images/hero-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Francis Gerard A. Cruz - Full-Stack Web Developer & Technical Support Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Francis Gerard A. Cruz | Web Developer & Technical Support Engineer",
    description:
      "Full-Stack Web Developer & Technical Support Engineer in Imus City, Cavite, Philippines. Custom websites, React, Next.js, Laravel, and IT infrastructure support.",
    images: ["/images/hero-banner.jpg"],
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
  other: {
    "geo.region": "PH-CAV",
    "geo.placename": "Imus City, Cavite, Philippines",
    "geo.position": "14.4297;120.9367",
    ICBM: "14.4297, 120.9367",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Francis Gerard A. Cruz",
      alternateName: ["Francis Cruz", "Francis Gerard Cruz", "Dashotz", "frncszxc"],
      url: siteUrl,
      image: `${siteUrl}/images/hero-banner.jpg`,
      email: "mailto:frncsgerard02@gmail.com",
      telephone: "+639208040444",
      jobTitle: "Technical Support Engineer & Full-Stack Web Developer",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Cavite State University - Imus Campus",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Imus City",
        addressRegion: "Cavite",
        addressCountry: "PH",
      },
      sameAs: [
        "https://github.com/Dashotz",
        "https://www.linkedin.com/in/frncszxc/",
      ],
      knowsAbout: [
        "Web Development",
        "Full-Stack Development",
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "PHP",
        "Node.js",
        "Technical Support",
        "System Administration",
        "Active Directory",
        "Network Configuration",
        "PC Assembly and Troubleshooting",
        "AI Code Evaluation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Francis Gerard A. Cruz - Official Website & Portfolio",
      alternateName: ["Francis Cruz Website", "Francis Cruz Portfolio"],
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en-PH",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: "Francis Gerard A. Cruz - Web Development & IT Support Services",
      url: siteUrl,
      image: `${siteUrl}/images/hero-banner.jpg`,
      telephone: "+639208040444",
      email: "frncsgerard02@gmail.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Imus City",
        addressRegion: "Cavite",
        addressCountry: "PH",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 14.4297,
        longitude: 120.9367,
      },
      areaServed: [
        { "@type": "City", name: "Imus City" },
        { "@type": "City", name: "Bacoor City" },
        { "@type": "AdministrativeArea", name: "Cavite" },
        { "@type": "AdministrativeArea", name: "Metro Manila" },
        { "@type": "Country", name: "Philippines" },
      ],
      founder: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
