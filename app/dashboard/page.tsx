"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Trophy, 
  Calendar, 
  Clock, 
  User, 
  CheckCircle2, 
  Activity, 
  Flame, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  LogOut,
  MapPin,
  Lock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

interface BookingRecord {
  _id: string;
  type: string;
  title: string;
  sport: string;
  date?: string;
  timeSlot?: string;
  status: string;
  createdAt: string;
}

export default function MemberDashboardPage() {
  const { user, loading, login, logout, openAuthModal } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "sessions" | "metrics" | "membership">("overview");

  // Booking modal for quick slot booking from dashboard
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      openAuthModal("login", "Please sign in to access your athlete dashboard.");
    }
  }, [loading, user, openAuthModal]);

  useEffect(() => {
    if (user) {
      setLoadingBookings(true);
      fetch("/api/bookings")
        .then((res) => (res.ok ? res.json() : { bookings: [] }))
        .then((data) => {
          setBookings(data.bookings || []);
        })
        .catch(() => {
          setBookings([]);
        })
        .finally(() => setLoadingBookings(false));
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F7F2]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#174A3B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase font-bold tracking-wider text-[#4E544F]">
            Authenticating Athlete Profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F7F2] p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E2E5DC] text-center shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#FFF1ED] text-[#F4512C] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
            Protected Member Area
          </span>
          <h2 className="font-display text-2xl font-black uppercase text-[#171A18]">
            Athlete Login Required
          </h2>
          <p className="text-xs text-[#4E544F] leading-relaxed">
            The member dashboard contains confidential training analytics, coaching notes, and personal match schedules. Please sign in or use the demo athlete account.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={async () => {
                await login("demo@apexacademy.com", "demo123");
              }}
              className="w-full btn-primary text-xs py-3 uppercase font-bold flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#B8D94E]" />
              One-Click Demo Athlete Sign In
            </button>
            <button
              type="button"
              onClick={() => openAuthModal("login", "Sign in to access your athlete dashboard.")}
              className="w-full btn-outline text-xs py-2.5 uppercase font-bold"
            >
              Sign In With Other Account
            </button>
            <button
              type="button"
              onClick={() => openAuthModal("register", "Create your athlete profile to join Apex.")}
              className="w-full text-xs text-[#737A74] hover:text-[#171A18] py-2 uppercase font-bold transition-colors"
            >
              Register Athlete Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  const metrics = user.metrics || {
    sessionsCompleted: 14,
    attendanceRate: 94,
    fitnessScore: 86,
    techniqueScore: 88,
    tacticalScore: 82,
    enduranceScore: 90,
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] min-h-screen py-8 md:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-8">
        
        {/* 1. TOP WELCOME & ATHLETE IDENTITY BANNER */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E5DC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#174A3B] text-white flex items-center justify-center font-display text-2xl font-black shadow-md shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                  {user.preferredSport || "Football"} Roster
                </span>
                <span className="text-[10px] font-bold text-[#174A3B] bg-[#EBF3F0] px-2.5 py-0.5 rounded-full">
                  Tier: {user.membership?.plan || "Starter"}
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#171A18] mt-1">
                Welcome Back, {user.name}
              </h1>
              <p className="text-xs text-[#737A74]">
                Athlete ID: #APX-{user.userId ? user.userId.slice(-6).toUpperCase() : "784920"} • {user.email}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="btn-primary text-xs py-2.5 px-5 uppercase tracking-wider font-bold w-full sm:w-auto justify-center text-center"
            >
              Book Training Session
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </button>
            <button
              type="button"
              onClick={() => logout()}
              className="btn-outline text-xs py-2.5 px-4 text-red-600 hover:text-red-700 hover:border-red-300 w-full sm:w-auto justify-center text-center"
            >
              <LogOut className="w-4 h-4 mr-1 shrink-0" />
              Sign Out
            </button>
          </div>
        </div>

        {/* 2. DASHBOARD NAVIGATION TABS */}
        <div className="flex border-b border-[#E2E5DC] gap-6 overflow-x-auto pb-1 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-3 transition-colors relative whitespace-nowrap ${
              activeTab === "overview"
                ? "text-[#F4512C] border-b-2 border-[#F4512C]"
                : "text-[#4E544F] hover:text-[#171A18]"
            }`}
          >
            Overview & Schedule
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("sessions")}
            className={`pb-3 transition-colors relative whitespace-nowrap ${
              activeTab === "sessions"
                ? "text-[#F4512C] border-b-2 border-[#F4512C]"
                : "text-[#4E544F] hover:text-[#171A18]"
            }`}
          >
            Booked Classes & Trials ({bookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("metrics")}
            className={`pb-3 transition-colors relative whitespace-nowrap ${
              activeTab === "metrics"
                ? "text-[#F4512C] border-b-2 border-[#F4512C]"
                : "text-[#4E544F] hover:text-[#171A18]"
            }`}
          >
            Athlete Diagnostic Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("membership")}
            className={`pb-3 transition-colors relative whitespace-nowrap ${
              activeTab === "membership"
                ? "text-[#F4512C] border-b-2 border-[#F4512C]"
                : "text-[#4E544F] hover:text-[#171A18]"
            }`}
          >
            Membership & Billing
          </button>
        </div>

        {/* 3. TAB CONTENT */}

        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E2E5DC] shadow-sm">
                <div className="flex items-center justify-between text-[#737A74] text-xs font-bold uppercase">
                  <span>Sessions Completed</span>
                  <Trophy className="w-4 h-4 text-[#F4512C]" />
                </div>
                <div className="font-display text-3xl font-extrabold text-[#171A18] mt-2">
                  {metrics.sessionsCompleted}
                </div>
                <div className="text-[11px] text-[#174A3B] font-semibold mt-1">
                  On track for monthly goal
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E2E5DC] shadow-sm">
                <div className="flex items-center justify-between text-[#737A74] text-xs font-bold uppercase">
                  <span>Attendance Rate</span>
                  <Activity className="w-4 h-4 text-[#174A3B]" />
                </div>
                <div className="font-display text-3xl font-extrabold text-[#171A18] mt-2">
                  {metrics.attendanceRate}%
                </div>
                <div className="text-[11px] text-[#174A3B] font-semibold mt-1">
                  Top 10% in Academy Roster
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E2E5DC] shadow-sm">
                <div className="flex items-center justify-between text-[#737A74] text-xs font-bold uppercase">
                  <span>Overall Rating</span>
                  <TrendingUp className="w-4 h-4 text-[#B8D94E]" />
                </div>
                <div className="font-display text-3xl font-extrabold text-[#171A18] mt-2">
                  87.4
                </div>
                <div className="text-[11px] text-[#737A74] font-medium mt-1">
                  Benchmarked by Head Coach
                </div>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E2E5DC] shadow-sm">
                <div className="flex items-center justify-between text-[#737A74] text-xs font-bold uppercase">
                  <span>Next Training Slot</span>
                  <Clock className="w-4 h-4 text-[#174A3B]" />
                </div>
                <div className="font-display text-lg font-bold text-[#171A18] mt-2">
                  Today • 4:30 PM
                </div>
                <div className="text-[11px] text-[#F4512C] font-semibold mt-1">
                  FIFA-Pro Turf Arena
                </div>
              </div>
            </div>

            {/* Split layout: Today's Session + Coach Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Upcoming Today */}
              <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E2E5DC] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-extrabold uppercase text-[#171A18]">
                    This Week&apos;s Training Calendar
                  </h3>
                  <span className="text-[11px] font-bold text-[#174A3B] bg-[#EBF3F0] px-2.5 py-0.5 rounded">
                    Active Squad Roster
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { day: "Today", time: "04:30 PM - 06:30 PM", title: "High-Pressing Tactical Scrimmage", arena: "FIFA-Pro Multi-Sport Turf", coach: "Marcus Vance" },
                    { day: "Thursday", time: "05:00 PM - 06:30 PM", title: "Neuromuscular Power & Sled Sprints", arena: "Strength & Conditioning Lab", coach: "Dr. Alistair Ross" },
                    { day: "Saturday", time: "08:00 AM - 11:00 AM", title: "Inter-Academy Championship Match", arena: "Main Stadium Oval", coach: "Technical Staff" }
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-[#F4512C] border border-[#E2E5DC]">
                            {s.day}
                          </span>
                          <span className="text-xs font-bold text-[#171A18]">{s.title}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-[#737A74] mt-1.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#174A3B]" /> {s.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#174A3B]" /> {s.arena}
                          </span>
                        </div>
                      </div>
                      <div className="text-[11px] font-semibold text-[#174A3B] sm:text-right shrink-0">
                        Lead: {s.coach}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Feedback & Next Goal */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E2E5DC] shadow-sm space-y-4">
                <h3 className="font-display text-lg font-extrabold uppercase text-[#171A18]">
                  Coach Evaluation & Goals
                </h3>

                <div className="p-4 bg-[#EBF3F0] rounded-xl border border-[#C6DDD5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#174A3B] uppercase">Head Coach Note</span>
                    <span className="text-[10px] text-[#737A74]">Updated 2 days ago</span>
                  </div>
                  <p className="text-xs text-[#171A18] leading-relaxed italic">
                    &quot;{user.name} showed outstanding stamina during the transition drill on Tuesday. We want to work on first-touch orientation when receiving the ball with a defender on the back.&quot;
                  </p>
                  <div className="text-[11px] font-bold text-[#174A3B] pt-1">
                    — Marcus Vance, Technical Director
                  </div>
                </div>

                <div className="p-4 bg-[#FFF1ED] rounded-xl border border-[#FADCD5] space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-[#F4512C] block">
                    Next Metric Milestone:
                  </span>
                  <div className="text-xs font-bold text-[#171A18]">
                    Achieve 40-yard dash under 4.85 seconds
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-[#F4512C] rounded-full" style={{ width: "78%" }} />
                  </div>
                  <div className="text-[10px] text-[#737A74] flex justify-between">
                    <span>Baseline: 5.12s</span>
                    <span>Current: 4.91s</span>
                    <span>Target: 4.85s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SESSIONS & BOOKINGS */}
        {activeTab === "sessions" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E5DC] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-extrabold uppercase text-[#171A18]">
                  Your Logged Reservations & Trials
                </h3>
                <p className="text-xs text-[#737A74] mt-0.5">
                  Real-time record of all your academy program enrollments and facility slots.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingOpen(true)}
                className="btn-primary text-xs py-2 px-4"
              >
                + Book Another Service
              </button>
            </div>

            {loadingBookings ? (
              <div className="py-8 text-center text-xs text-[#737A74]">
                Loading booked records...
              </div>
            ) : bookings.length === 0 ? (
              <div className="py-12 text-center space-y-3 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
                <Calendar className="w-10 h-10 text-[#737A74] mx-auto opacity-50" />
                <h4 className="font-bold text-sm text-[#171A18] uppercase">
                  No Active Bookings Yet
                </h4>
                <p className="text-xs text-[#4E544F] max-w-sm mx-auto">
                  Book a trial session, register for upcoming camps, or reserve an arena slot to see your live calendar here.
                </p>
                <button
                  type="button"
                  onClick={() => setIsBookingOpen(true)}
                  className="btn-primary text-xs py-2.5 px-6 uppercase font-bold"
                >
                  Book Your First Trial
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b._id}
                    className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#FFF1ED] text-[#F4512C]">
                          {b.type}
                        </span>
                        <h4 className="text-sm font-bold text-[#171A18]">{b.title}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#737A74] mt-1.5">
                        <span><strong>Sport:</strong> {b.sport}</span>
                        {b.date && <span><strong>Date:</strong> {b.date}</span>}
                        {b.timeSlot && <span><strong>Slot:</strong> {b.timeSlot}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#174A3B] bg-[#EBF3F0] px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#174A3B]" />
                        {b.status || "CONFIRMED"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: ATHLETE DIAGNOSTIC METRICS */}
        {activeTab === "metrics" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E5DC] shadow-sm space-y-6">
            <div>
              <h3 className="font-display text-xl font-extrabold uppercase text-[#171A18]">
                Six-Axis Biomechanical Profile
              </h3>
              <p className="text-xs text-[#737A74] mt-0.5">
                Calibrated by ForceDecks jump sensors and Freelap electronic laser gates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: "Technique & Ball Mastery", score: metrics.techniqueScore, note: "Topspin/Delivery accuracy" },
                { label: "Sprint Speed (10m & 30m)", score: metrics.fitnessScore, note: "Max velocity projection" },
                { label: "Neuromuscular Strength", score: metrics.tacticalScore, note: "Peak Watts/kg on jump plates" },
                { label: "Aerobic Recovery Index", score: metrics.enduranceScore, note: "Yo-Yo Intermittent Test Level 2" },
                { label: "Attendance Consistency", score: metrics.attendanceRate, note: "Practice presence discipline" },
                { label: "Tactical Game IQ", score: 85, note: "Scanning speed in video classroom" }
              ].map((m, i) => (
                <div key={i} className="p-5 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold uppercase text-[#171A18]">
                    <span>{m.label}</span>
                    <span className="font-display text-xl font-black text-[#F4512C]">{m.score}</span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E5DC] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#174A3B] to-[#F4512C] rounded-full"
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-[#737A74]">
                    {m.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MEMBERSHIP & BILLING */}
        {activeTab === "membership" && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E5DC] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-1">
                  CURRENT ENROLLMENT STATUS
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18]">
                  {user.membership?.plan || "Starter"} Athlete Tier
                </h3>
                <p className="text-xs text-[#737A74] mt-0.5">
                  Billing Cycle: {user.membership?.billingCycle || "MONTHLY"} • Status: ACTIVE
                </p>
              </div>

              <Link
                href="/membership"
                className="btn-primary text-xs py-2.5 px-6 uppercase font-bold tracking-wider"
              >
                Upgrade to Elite Tier →
              </Link>
            </div>

            <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] text-xs space-y-2 text-[#171A18]">
              <div className="flex justify-between">
                <span><strong>Locker Room & Kit Access:</strong></span>
                <span className="text-[#174A3B] font-bold">Full Access Enabled</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Sports Science Lab:</strong></span>
                <span className="text-[#174A3B] font-bold">Included 2x / Week</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Hydro Plunge Suite:</strong></span>
                <span className="text-[#174A3B] font-bold">Twice Weekly Recovery Slot</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        type="PROGRAM"
        title="Training Session Slot Booking"
        sport={user.preferredSport || "Football"}
        onClose={() => {
          setIsBookingOpen(false);
          // Refresh bookings
          fetch("/api/bookings")
            .then((res) => (res.ok ? res.json() : { bookings: [] }))
            .then((data) => setBookings(data.bookings || []));
        }}
      />
    </div>
  );
}
