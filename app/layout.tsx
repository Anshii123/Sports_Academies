import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://apex-sports.academy"),
  title: {
    default: "APEX Sports Academy — High Performance Athletic Training & Development",
    template: "%s | APEX Sports Academy",
  },
  description:
    "Premier athletic training institution. Elite coaching in football, cricket, tennis, basketball, track & swimming with Olympic facilities and biomechanics.",
  keywords: [
    "Sports Academy",
    "High Performance Athletic Training",
    "Football Academy",
    "Cricket Coaching",
    "Tennis Academy",
    "Olympic Strength and Conditioning",
    "Youth Sports Development",
    "Biomechanics Sports Lab",
    "Sports Trials and Combines",
  ],
  authors: [{ name: "Apex Sports Academy" }],
  creator: "Apex Sports Academy",
  publisher: "Apex Sports Academy",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "APEX Sports Academy — Train Smarter. Play Bigger.",
    description:
      "Elite youth and pre-professional athletic training. Olympic facilities, biomechanics labs, and certified coaching.",
    url: "https://apex-sports.academy",
    siteName: "APEX Sports Academy",
    images: [
      {
        url: "/images/hero/hero_athlete_motion.jpg",
        width: 1200,
        height: 630,
        alt: "Athletes training at Apex Sports Academy Olympic campus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX Sports Academy — High Performance Athletic Training",
    description:
      "Elite youth and pre-professional athletic training. Olympic facilities, biomechanics labs, and certified coaching.",
    images: ["/images/hero/hero_athlete_motion.jpg"],
    creator: "@ApexSportsAcad",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "APEX Sports Academy",
  "url": "https://apex-sports.academy",
  "logo": "https://apex-sports.academy/images/hero/hero_athlete_motion.jpg",
  "image": "https://apex-sports.academy/images/hero/hero_athlete_motion.jpg",
  "description": "Private, high-performance athletic development institution established in 2012 offering Olympic facilities and certified coaching.",
  "telephone": "+1-800-458-2739",
  "email": "admissions@apex-sports.academy",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Olympic Way, Sports City Complex",
    "addressLocality": "Sports City",
    "addressRegion": "CA",
    "postalCode": "90210",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "34.0522",
    "longitude": "-118.2437"
  },
  "sport": ["Soccer", "Cricket", "Basketball", "Tennis", "Badminton", "Track and Field", "Swimming"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "06:00",
      "closes": "21:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "07:00",
      "closes": "18:00"
    }
  ]
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "APEX Sports Academy",
  "url": "https://apex-sports.academy",
  "description": "High Performance Athletic Training & Youth Sports Development Academy",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://apex-sports.academy/sports?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book a complimentary athletic assessment at Apex Sports Academy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Athletes and parents can reserve a 90-minute complimentary trial by clicking 'Book a Trial' on our website or calling our admissions desk. Assessments include laser-timed sprint mechanics, ForceDecks jump kinetics, and sport-specific skill evaluations with our certified coaching directors."
      }
    },
    {
      "@type": "Question",
      "name": "What sports training disciplines are offered at the 18-acre campus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Apex provides high-performance coaching across 8 flagship disciplines: Football (Soccer), Cricket, Basketball, Tennis, Badminton, Track & Field, Swimming, and Olympic Strength & Conditioning across dedicated Olympic-grade arenas."
      }
    },
    {
      "@type": "Question",
      "name": "What age groups and athletic skill levels do you accept?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer programs for Young Olympians (Ages 6-12), Academy Squads (Ages 13-16), Pre-Professional Draft Prep (Ages 16-21), and Adult Elite performance athletes, ranging from foundational development to college scholarship and professional draft combines."
      }
    },
    {
      "@type": "Question",
      "name": "What coaching licenses and certifications do Apex directors possess?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our faculty comprises UEFA Pro License football directors, BCCI Level 3 cricket mentors, PTR certified tennis directors, FIBA basketball coaches, and Olympic sprint faculty with decades of international coaching pedigree."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F7F2] text-[#171A18] antialiased selection:bg-[#F4512C] selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F4512C] focus:text-white focus:rounded-md focus:shadow-xl focus:font-extrabold focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Skip to main content
        </a>
        <AuthProvider>
          <Navbar />
          <main id="main-content" className="flex-grow pt-[68px] sm:pt-[72px]">
            {children}
          </main>
          <Footer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
