import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Admissions & Schedule an On-Campus Tour",
  description:
    "Connect with admissions coordinators, schedule an on-campus evaluation tour, or call our athletic desk at 100 Olympic Way, Sports City Complex.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Admissions Desk & Campus Visits | APEX Sports Academy",
    description:
      "Direct coordinator desk, campus tour reservations, trial scheduling, and emergency athletic medical contacts.",
    url: "/contact",
    images: [
      {
        url: "/images/hero/hero_athlete_motion.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Apex Sports Academy Campus",
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "APEX Sports Academy Admissions & Tour Desk",
    "description": "Connect with athletic admissions, book campus evaluations, and visit our 18-acre sports complex.",
    "mainEntity": {
      "@type": "SportsOrganization",
      "name": "APEX Sports Academy",
      "telephone": "+1-800-555-APEX",
      "email": "admissions@apex-sports.academy",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "100 Olympic Way, Sports City Complex",
        "addressLocality": "Sports City",
        "addressRegion": "CA",
        "postalCode": "90210",
        "addressCountry": "US"
      }
    }
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
        "name": "Contact & Campus Visits",
        "item": "https://apex-sports.academy/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
