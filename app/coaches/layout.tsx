import type { Metadata } from "next";
import { COACHES_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Elite Coaching Staff & International Directors Directory",
  description:
    "Meet our UEFA Pro, BCCI certified, and Olympic performance directors with decades of international coaching and national championship pedigree.",
  alternates: {
    canonical: "/coaches",
  },
  openGraph: {
    title: "International Coaching Staff Directory | APEX Sports Academy",
    description:
      "Mentorship from certified international directors in football, cricket, tennis, basketball, track & Olympic performance science.",
    url: "/coaches",
    images: [
      {
        url: "/images/coaches/marcus_vance.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy Coaching Directors",
      },
    ],
  },
};

export default function CoachesLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Coaching Staff Directory",
        "item": "https://apex-sports.academy/coaches"
      }
    ]
  };

  const coachesItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "APEX Sports Academy Elite Coaching Staff",
    "description": "International directors and Olympic performance mentors at APEX Sports Academy.",
    "numberOfItems": COACHES_DATA.length,
    "itemListElement": COACHES_DATA.map((coach, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Person",
        "name": coach.name,
        "jobTitle": coach.role,
        "description": coach.bio,
        "image": `https://apex-sports.academy${coach.image}`,
        "worksFor": {
          "@type": "SportsOrganization",
          "name": "APEX Sports Academy",
          "sameAs": "https://apex-sports.academy"
        },
        "knowsAbout": [coach.sport, coach.specialization, ...coach.certifications]
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coachesItemListJsonLd) }}
      />
      {children}
    </>
  );
}
