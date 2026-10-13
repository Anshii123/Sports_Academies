import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "18-Acre World-Class Sports Campus & Performance Lab",
  description:
    "Tour our Olympic-standard facilities: FIFA-grade turf arena, Mondo 8-lane sprint track, cricket nets, hydro recovery suites, and Keiser strength lab.",
  alternates: {
    canonical: "/facilities",
  },
  openGraph: {
    title: "Olympic-Grade Training Facilities | APEX Sports Campus",
    description:
      "18-acre private athletic facility featuring synthetic pitches, aquatic center, indoor hardwood dome, and sports biomechanics laboratory.",
    url: "/facilities",
    images: [
      {
        url: "/images/facilities/turf_arena.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy 18-Acre Training Facilities",
      },
    ],
  },
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  const facilityJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Apex Sports Academy Performance Campus",
    "description": "18-acre Olympic standard multi-sport training campus and biomechanics facility.",
    "url": "https://apex-sports.academy/facilities",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 Olympic Way, Sports City Complex",
      "addressLocality": "Sports City",
      "addressRegion": "CA",
      "postalCode": "90210",
      "addressCountry": "US"
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "FIFA Pro Turf Arena", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Mondo 8-Lane Olympic Track", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Keiser Strength & Conditioning Lab", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Cryotherapy & Hydro Recovery Suite", "value": true }
    ]
  };

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
        "name": "Campus Facilities",
        "item": "https://apex-sports.academy/facilities"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(facilityJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
