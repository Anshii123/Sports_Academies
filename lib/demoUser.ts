export interface DemoUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: "USER" | "ADMIN";
  preferredSport: string;
  age: number;
  membership: {
    plan: "NONE" | "STARTER" | "PERFORMANCE" | "ELITE";
    status: "ACTIVE" | "PENDING" | "EXPIRED";
    billingCycle: "MONTHLY" | "ANNUAL";
    startDate: Date;
  };
  metrics: {
    sessionsCompleted: number;
    attendanceRate: number;
    fitnessScore: number;
    techniqueScore: number;
    tacticalScore: number;
    enduranceScore: number;
  };
  createdAt: Date;
}

export interface DemoBooking {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
  title: string;
  sport: string;
  date?: string;
  timeSlot?: string;
  experienceLevel?: string;
  notes?: string;
  status: "CONFIRMED" | "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}

export const DEMO_USER: DemoUser = {
  _id: "demo_athlete_001",
  name: "Alex Morgan",
  email: "demo@apexacademy.com",
  phone: "+1 (555) 019-2834",
  // bcrypt hash for "demo123"
  passwordHash: "$2b$10$dmxuaeCK2xIWD7FLiw.pZeF6i2AMEQYfkw/ud4BRJb6xOkaa/psWC",
  role: "USER",
  preferredSport: "Football",
  age: 19,
  membership: {
    plan: "PERFORMANCE",
    status: "ACTIVE",
    billingCycle: "MONTHLY",
    startDate: new Date("2025-01-15"),
  },
  metrics: {
    sessionsCompleted: 28,
    attendanceRate: 96,
    fitnessScore: 89,
    techniqueScore: 92,
    tacticalScore: 88,
    enduranceScore: 91,
  },
  createdAt: new Date("2025-01-15"),
};

export const DEMO_BOOKINGS: DemoBooking[] = [
  {
    _id: "book_demo_001",
    userId: "demo_athlete_001",
    userName: "Alex Morgan",
    userEmail: "demo@apexacademy.com",
    userPhone: "+1 (555) 019-2834",
    type: "PROGRAM",
    title: "Pro Striker & Finishing Masterclass",
    sport: "Football",
    date: "2026-10-15",
    timeSlot: "04:30 PM - 06:30 PM",
    experienceLevel: "Advanced / Academy Squad",
    notes: "Turf A Pitch reservation with Head Coach Marcus Bell.",
    status: "CONFIRMED",
    createdAt: new Date("2026-10-01"),
  },
  {
    _id: "book_demo_002",
    userId: "demo_athlete_001",
    userName: "Alex Morgan",
    userEmail: "demo@apexacademy.com",
    userPhone: "+1 (555) 019-2834",
    type: "FACILITY",
    title: "Cryotherapy & Hydro Recovery Session",
    sport: "Recovery Suite",
    date: "2026-10-18",
    timeSlot: "10:00 AM - 11:30 AM",
    experienceLevel: "All Levels",
    notes: "Post-match recovery protocol reserved in Hydro Lab.",
    status: "CONFIRMED",
    createdAt: new Date("2026-10-02"),
  },
  {
    _id: "book_demo_003",
    userId: "demo_athlete_001",
    userName: "Alex Morgan",
    userEmail: "demo@apexacademy.com",
    userPhone: "+1 (555) 019-2834",
    type: "TRIAL",
    title: "Elite Combine Assessment & Biometrics",
    sport: "Strength & Conditioning",
    date: "2026-09-28",
    timeSlot: "08:00 AM - 10:00 AM",
    experienceLevel: "Advanced",
    notes: "Combine benchmark: Top 5% sprint & agility test.",
    status: "COMPLETED",
    createdAt: new Date("2026-09-20"),
  },
];

export function isDemoEmail(email: string): boolean {
  const norm = (email || "").toLowerCase().trim();
  return (
    norm === "demo@apexacademy.com" ||
    norm === "demo@sportsacademy.com" ||
    norm === "demo@apex.com" ||
    norm === "alex@apexacademy.com"
  );
}
