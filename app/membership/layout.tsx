import type { Metadata } from "next";
import { MEMBERSHIP_PLANS } from "@/lib/data";

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

  const membershipItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "APEX Sports Academy Membership Plans",
    "description": "Athlete development and training memberships with expert coaching.",
    "numberOfItems": MEMBERSHIP_PLANS.length,
    "itemListElement": MEMBERSHIP_PLANS.map((plan, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Product",
        "name": `${plan.name} Membership`,
        "description": plan.subtitle,
        "category": "Sports Coaching Membership",
        "offers": {
          "@type": "Offer",
          "price": plan.monthlyPrice,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://apex-sports.academy/membership",
          "priceValidUntil": "2027-12-31"
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(membershipItemListJsonLd) }}
      />
      {children}
    </>
  );
}
