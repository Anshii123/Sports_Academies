import { connectDB } from "./db";
import { User } from "@/models/User";
import { Booking } from "@/models/Booking";

export interface StoredUser {
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

export interface StoredBooking {
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

import { DEMO_USER, DEMO_BOOKINGS, isDemoEmail, DemoUser, DemoBooking } from "./demoUser";

export { DEMO_USER, DEMO_BOOKINGS, isDemoEmail };
export type { DemoUser, DemoBooking };


// In-memory fallback database for fast test environments and instant response
interface InMemoryStore {
  users: StoredUser[];
  bookings: StoredBooking[];
}

declare global {
  // eslint-disable-next-line no-var
  var memoryStore: InMemoryStore | undefined;
}

const memoryStore: InMemoryStore = global.memoryStore || {
  users: [{ ...DEMO_USER }],
  bookings: [...DEMO_BOOKINGS],
};

if (!global.memoryStore) {
  global.memoryStore = memoryStore;
}

export async function findUserByEmail(email: string) {
  const normalizedEmail = email.toLowerCase().trim();

  // Instant check for demo user account (guaranteed to work offline / without Atlas)
  if (isDemoEmail(normalizedEmail)) {
    return DEMO_USER;
  }

  const db = await connectDB();
  if (db) {
    try {
      const user = await User.findOne({ email: normalizedEmail }).lean();
      if (user) return user;
    } catch (e) {
      console.warn("DB findUserByEmail error:", e);
    }
  }

  return memoryStore.users.find((u) => u.email.toLowerCase() === normalizedEmail) || null;
}

export async function findUserById(id: string) {
  if (id === DEMO_USER._id || id === "demo_athlete_001") {
    return DEMO_USER;
  }

  const db = await connectDB();
  if (db) {
    try {
      const user = await User.findById(id).lean();
      if (user) return user;
    } catch (e) {
      console.warn("DB findUserById error:", e);
    }
  }

  return memoryStore.users.find((u) => u._id.toString() === id.toString()) || null;
}

export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  role?: "USER" | "ADMIN";
  preferredSport?: string;
  age?: number;
}) {
  const normalizedEmail = data.email.toLowerCase().trim();
  const db = await connectDB();

  if (db) {
    try {
      const newUser = new User({
        ...data,
        email: normalizedEmail,
        role: data.role || "USER",
        preferredSport: data.preferredSport || "Football",
        age: data.age || 18,
        membership: {
          plan: "STARTER",
          status: "ACTIVE",
          billingCycle: "MONTHLY",
          startDate: new Date(),
        },
      });
      const saved = await newUser.save();
      return saved.toObject();
    } catch (e) {
      console.warn("DB createUser error, saving to memory store:", e);
    }
  }

  const memUser: StoredUser = {
    _id: "mem_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    name: data.name,
    email: normalizedEmail,
    phone: data.phone,
    passwordHash: data.passwordHash,
    role: data.role || "USER",
    preferredSport: data.preferredSport || "Football",
    age: data.age || 18,
    membership: {
      plan: "STARTER",
      status: "ACTIVE",
      billingCycle: "MONTHLY",
      startDate: new Date(),
    },
    metrics: {
      sessionsCompleted: 12,
      attendanceRate: 94,
      fitnessScore: 84,
      techniqueScore: 87,
      tacticalScore: 80,
      enduranceScore: 88,
    },
    createdAt: new Date(),
  };
  memoryStore.users.push(memUser);
  return memUser;
}

export async function createBooking(data: {
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
  details?: Record<string, unknown>;
}) {
  const db = await connectDB();
  if (db) {
    try {
      const newBooking = new Booking({
        ...data,
        status: "CONFIRMED",
      });
      const saved = await newBooking.save();
      return saved.toObject();
    } catch (e) {
      console.warn("DB createBooking error, using fallback memory store:", e);
    }
  }

  const memBooking: StoredBooking = {
    _id: "book_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    ...data,
    status: "CONFIRMED",
    createdAt: new Date(),
  };
  memoryStore.bookings.unshift(memBooking);
  return memBooking;
}

export async function getBookingsByUserId(userId: string) {
  const db = await connectDB();
  if (db) {
    try {
      const bookings = await Booking.find({ userId }).sort({ createdAt: -1 }).lean();
      if (bookings && bookings.length > 0) return bookings;
    } catch (e) {
      console.warn("DB getBookings error:", e);
    }
  }

  const userBookings = memoryStore.bookings.filter((b) => b.userId === userId);
  if (userId === DEMO_USER._id || userId === "demo_athlete_001") {
    const existingIds = new Set(userBookings.map((b) => b._id));
    const missingDefaults = DEMO_BOOKINGS.filter((b) => !existingIds.has(b._id));
    return [...userBookings, ...missingDefaults];
  }
  return userBookings;
}
