import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Academy — Founding Story & 2012-2026 Milestones",
  description:
    "Founded in 2012, Apex Sports Academy is an 18-acre private high-performance campus dedicated to elite youth and pre-professional athletic development.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About APEX Sports Academy — History & High-Performance Vision",
    description:
      "14 years of developing national-tier athletes with Olympic facilities, biomechanics labs, and certified international coaching directors.",
    url: "/about",
    images: [
      {
        url: "/images/hero/hero_athlete_motion.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy Campus and Athletic Heritage",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://apex-sports.academy"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About the Academy",
        "item": "https://apex-sports.academy/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
