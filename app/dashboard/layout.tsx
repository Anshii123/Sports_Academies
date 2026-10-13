import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Athlete Portal & Performance Dashboard",
  description:
    "Confidential athlete portal for active Academy members. Track personal training analytics, upcoming combine schedules, and coaching logs.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
