import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athlete Case Studies & High-Performance Success Stories",
  description:
    "In-depth documentary case studies of youth athletes who transformed speed, mechanics, and match discipline to reach state and national squads.",
  alternates: {
    canonical: "/stories",
  },
  openGraph: {
    title: "Documentary Athlete Case Studies | APEX Sports Academy",
    description:
      "Real stories of athletic breakthroughs: mechanical adjustments, resilience training, and national squad call-ups.",
    url: "/stories",
    images: [
      {
        url: "/images/stories/rohan_cricket.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Sports Academy Athlete Case Studies",
      },
    ],
  },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
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
        "name": "Athlete Stories",
        "item": "https://apex-sports.academy/stories"
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
