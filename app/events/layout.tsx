import type { Metadata } from "next";
import { EVENTS_DATA } from "@/lib/data";

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

  const eventsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "APEX Sports Academy Events, Combines & Masterclasses",
    "description": "Upcoming athletic combines, training camps, tournaments, and trials.",
    "numberOfItems": EVENTS_DATA.length,
    "itemListElement": EVENTS_DATA.map((evt, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SportsEvent",
        "name": evt.title,
        "description": evt.description,
        "startDate": "2026-11-01T09:00:00+00:00",
        "location": {
          "@type": "Place",
          "name": evt.location,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Apex Olympic Way, Sports District",
            "addressLocality": "London",
            "postalCode": "E20 2ST",
            "addressCountry": "GB"
          }
        },
        "organizer": {
          "@type": "SportsOrganization",
          "name": "APEX Sports Academy",
          "url": "https://apex-sports.academy"
        },
        "eventStatus": "https://schema.org/EventScheduled"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsItemListJsonLd) }}
      />
      {children}
    </>
  );
}
