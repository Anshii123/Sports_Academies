import type { Metadata } from "next";

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
