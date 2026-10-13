import type { Metadata } from "next";
import { SPORTS_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Sports Disciplines & Athletic Programs | Football, Cricket, Tennis",
  description:
    "Explore Olympic-standard training programs across 8 disciplines: football, cricket, basketball, tennis, badminton, track, swimming, and strength labs.",
  alternates: {
    canonical: "/sports",
  },
  openGraph: {
    title: "Sports Training Programs | APEX Sports Academy",
    description:
      "World-class sports coaching across football, cricket, tennis, basketball, track, and swimming. Biomechanics, laser-timed sprint gates, and pro combines.",
    url: "/sports",
    images: [
      {
        url: "/images/sports/football.jpg",
        width: 1200,
        height: 630,
        alt: "Athletic disciplines at Apex Sports Academy",
      },
    ],
  },
};

export default function SportsLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Sports Disciplines",
        "item": "https://apex-sports.academy/sports"
      }
    ]
  };

  const sportsItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "APEX Sports Academy Disciplines & Training Programs",
    "description": "High-performance youth and elite athletic development across Olympic disciplines.",
    "numberOfItems": SPORTS_DATA.length,
    "itemListElement": SPORTS_DATA.map((sport, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Course",
        "name": sport.name,
        "description": sport.description,
        "url": `https://apex-sports.academy/sports#${sport.slug}`,
        "provider": {
          "@type": "SportsOrganization",
          "name": "APEX Sports Academy",
          "sameAs": "https://apex-sports.academy"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "OnSite",
          "instructor": {
            "@type": "Person",
            "name": sport.leadCoach
          }
        }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsItemListJsonLd) }}
      />
      {children}
    </>
  );
}
