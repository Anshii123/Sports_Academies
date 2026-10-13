import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coaching Methodology & Athletic Development Pathways",
  description:
    "Scientific sports coaching methodology incorporating biomechanics, periodized strength phases, video tactical analysis, and mental conditioning.",
  alternates: {
    canonical: "/coaching",
  },
  openGraph: {
    title: "High Performance Coaching Methodology | APEX Academy",
    description:
      "Periodized training protocols, ForceDecks jump diagnostics, video analysis suites, and individual athlete development plans.",
    url: "/coaching",
    images: [
      {
        url: "/images/hero/hero_coach_mentorship.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Academy Coaching Methodology",
      },
    ],
  },
};

export default function CoachingLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Coaching Methodology",
        "item": "https://apex-sports.academy/coaching"
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
