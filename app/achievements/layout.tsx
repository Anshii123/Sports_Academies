import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall of Fame, State Championships & Professional Alumni",
  description:
    "Explore 45+ state trophies, national championships, and professional selections achieved by Apex athletes across football, cricket, and tennis.",
  alternates: {
    canonical: "/achievements",
  },
  openGraph: {
    title: "Championship Honors & Wall of Fame | APEX Sports Academy",
    description:
      "Celebrating regional trophies, collegiate scholarships, and youth national caps earned through dedicated academy development.",
    url: "/achievements",
    images: [
      {
        url: "/images/hero/hero_athlete_motion.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy Wall of Fame and Honors",
      },
    ],
  },
};

export default function AchievementsLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Achievements & Honors",
        "item": "https://apex-sports.academy/achievements"
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
