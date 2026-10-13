import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Sports Camps, Combines & Open Trials Calendar",
  description:
    "Register for upcoming high-performance summer camps, pro combines, scouting showcases, and complimentary athletic assessment trials at Apex.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Academy Camps & Combine Trials Calendar | APEX Sports Academy",
    description:
      "Join state combines, elite residential camps, and open trials. Evaluated by international scouting directors.",
    url: "/events",
    images: [
      {
        url: "/images/hero/hero_athlete_motion.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy Events, Camps & Trials",
      },
    ],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Camps & Trials Calendar",
        "item": "https://apex-sports.academy/events"
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
