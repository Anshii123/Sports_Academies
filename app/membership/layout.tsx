import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athlete Membership Plans & Academy Admission Tiers",
  description:
    "Structured academy admission plans for developmental, performance, and elite scholarship athletes. Transparent terms, coaching ratios, and access.",
  alternates: {
    canonical: "/membership",
  },
  openGraph: {
    title: "Academy Membership Plans & Admissions | APEX Sports Academy",
    description:
      "Join Starter, Performance, or Elite athlete tiers. Includes certified coaching, biomechanics assessments, and tournament travel rosters.",
    url: "/membership",
    images: [
      {
        url: "/images/hero/hero_athlete_motion.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy Membership and Admissions",
      },
    ],
  },
};

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Membership & Admissions",
        "item": "https://apex-sports.academy/membership"
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
