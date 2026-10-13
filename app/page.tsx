"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Flame,
  Clock,
  MapPin,
  ShieldCheck,
  Compass,
  Calendar,
  ChevronRight,
  TrendingUp,
  Activity,
  Users,
  Zap,
  Award,
  Target,
  ArrowUpRight,
  Quote
} from "lucide-react";
import {
  SPORTS_DATA,
  COACHES_DATA,
  FACILITIES_DATA,
  EVENTS_DATA,
  TESTIMONIALS_DATA,
  ACHIEVEMENTS_DATA,
  ATHLETE_STORIES_DATA,
  MEMBERSHIP_PLANS
} from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";
import SportsFinderModal from "@/components/SportsFinderModal";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  const { requireAuth } = useAuth();

  // Booking Modal State
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
    title: string;
    sport: string;
    price?: string;
  }>({
    isOpen: false,
    type: "TRIAL",
    title: "Complimentary Athletic Assessment & Trial",
    sport: "Multi-Sport",
  });

  // Sports Finder Modal State
  const [isFinderOpen, setIsFinderOpen] = useState(false);

  // Active facility preview state for facilities gallery section
  const [activeFacilityIndex, setActiveFacilityIndex] = useState(0);

  // Active testimonial index
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Interactive Performance Lab state
  const [activeLabMetric, setActiveLabMetric] = useState<"speed" | "strength" | "agility" | "endurance" | "power">("speed");

  const handleAction = (
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH",
    title: string,
    sport: string,
    price?: string
  ) => {
    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type,
        title,
        sport,
        price,
      });
    }, `Create your athlete account to reserve: ${title}`);
  };

  const labMetrics = {
    speed: {
      score: 94,
      title: "Acceleration & Flying 30m Speed",
      description: "Timed via Freelap electronic laser gates. Evaluates horizontal force projection, low-heel recovery, and maximum stride cadence under fatigue.",
      benchmark: "State Elite Benchmark: 90%"
    },
    strength: {
      score: 88,
      title: "ForceDecks Jump Kinetics & Peak Power",
      description: "Bilateral force plate analysis measuring countermovement jump peak watts/kg and eccentric deceleration symmetry to bulletproof athlete knees.",
      benchmark: "State Elite Benchmark: 82%"
    },
    agility: {
      score: 96,
      title: "5-10-5 Pro Agility & Directional Deceleration",
      description: "High-speed multi-vector change of direction with electronic timing gates, tracking hip height and braking efficiency on synthetic turf.",
      benchmark: "State Elite Benchmark: 88%"
    },
    endurance: {
      score: 91,
      title: "Yo-Yo Intermittent Recovery Level 2",
      description: "Telemetry heart-rate monitoring during progressive aerobic capacity shuttles, charting parasympathetic recovery rate between bouts.",
      benchmark: "State Elite Benchmark: 85%"
    },
    power: {
      score: 93,
      title: "Rotational Torque & Kinetic Linkage",
      description: "Keiser pneumatic dynamometry testing power transfer through the core and kinetic chain during dynamic strokes, throws, and kicks.",
      benchmark: "State Elite Benchmark: 86%"
    }
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. DYNAMIC ANIMATED HERO SECTION */}
      <HeroSection
        onOpenBooking={handleAction}
        onOpenFinder={() => setIsFinderOpen(true)}
      />

      {/* ========================================================================= */}
      {/* 2. CHOOSE YOUR SPORT: "WHAT DO YOU PLAY?" (HORIZONTAL VISUAL TILES) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
                DISCIPLINE DIRECTORY
              </span>
              <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
                WHAT DO YOU PLAY?
              </h2>
              <p className="text-xs sm:text-sm text-[#4E544F] mt-2 max-w-xl">
                Explore our eight high-performance disciplines. Every sport is directed by accredited national coaches with dedicated Olympic infrastructure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsFinderOpen(true)}
                className="btn-forest text-xs py-3 sm:py-2.5 px-5 min-h-[44px] flex items-center justify-center text-center"
              >
                <Compass className="w-4 h-4 mr-1.5 text-[#B8D94E] shrink-0" />
                Help Me Find My Sport
              </button>
              <Link
                href="/sports"
                className="btn-outline text-xs py-3 sm:py-2.5 px-5 min-h-[44px] flex items-center justify-center text-center"
              >
                View All Directory →
              </Link>
            </div>
          </div>

          {/* HORIZONTAL TILES COMPOSITION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SPORTS_DATA.map((sport, idx) => (
              <div
                key={sport.id}
                className="group relative bg-[#F8F7F2] rounded-2xl overflow-hidden border border-[#E2E5DC] hover:border-[#F4512C] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Cover */}
                <div className="relative aspect-[16/11] overflow-hidden bg-black/10">
                  <Image
                    src={sport.image}
                    alt={`${sport.name} athletic coaching program at Apex Sports Academy`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#171A18]/80 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded">
                    {sport.category}
                  </div>

                  {/* Sport Headline over Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display text-xl font-black uppercase text-white group-hover:text-[#B8D94E] transition-colors leading-tight">
                      {sport.name}
                    </h3>
                    <p className="text-[11px] text-white/80 font-medium truncate mt-0.5">
                      {sport.tagline}
                    </p>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#737A74] text-[11px]">
                      <span className="font-bold uppercase">Age Groups:</span>
                      <span className="font-semibold text-[#171A18]">{sport.ageGroups.split(",")[0]}</span>
                    </div>
                    <div className="flex justify-between text-[#737A74] text-[11px]">
                      <span className="font-bold uppercase">Level:</span>
                      <span className="font-semibold text-[#174A3B]">{sport.trainingLevel.split(" to ")[0]}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E2E5DC] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        handleAction(
                          "PROGRAM",
                          `Enroll in ${sport.name}`,
                          sport.name
                        )
                      }
                      className="text-xs font-black uppercase tracking-wider text-[#F4512C] hover:text-[#DC3E1B] flex items-center gap-1"
                    >
                      Join Program
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAction(
                          "TRIAL",
                          `Trial Session for ${sport.name}`,
                          sport.name,
                          "Free Trial"
                        )
                      }
                      className="text-[11px] font-bold text-[#737A74] hover:text-[#171A18] underline uppercase"
                    >
                      Trial
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ACADEMY PHILOSOPHY: "WE DON'T JUST TRAIN ATHLETES. WE BUILD DISCIPLINE." */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F1F2ED] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6">
              <span className="editorial-tag bg-[#174A3B] text-[#B8D94E]">
                THE APEX PHILOSOPHY
              </span>

              <h2 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-black text-[#171A18] leading-[0.92]">
                WE DON&apos;T JUST <br />
                TRAIN ATHLETES. <br />
                <span className="text-[#F4512C]">WE BUILD</span> <br />
                DISCIPLINE.
              </h2>

              <p className="text-base sm:text-lg text-[#4E544F] font-medium leading-relaxed max-w-xl">
                Talent without tactical intelligence is fragile. We reject the chaotic, burnout-heavy youth sports culture in favor of structured European training science, emotional composure, and technical mastery.
              </p>

              {/* THREE PRINCIPLES */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="p-5 bg-white rounded-xl border border-[#E2E5DC] space-y-2 shadow-xs">
                  <div className="font-display text-2xl font-black text-[#F4512C]">
                    01
                  </div>
                  <h4 className="font-display text-base font-black uppercase text-[#171A18]">
                    TECHNIQUE
                  </h4>
                  <p className="text-[11px] text-[#4E544F] leading-relaxed">
                    Repetitions under fatigue until kinetic mechanics are second nature.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E2E5DC] space-y-2 shadow-xs">
                  <div className="font-display text-2xl font-black text-[#174A3B]">
                    02
                  </div>
                  <h4 className="font-display text-base font-black uppercase text-[#171A18]">
                    DISCIPLINE
                  </h4>
                  <p className="text-[11px] text-[#4E544F] leading-relaxed">
                    Uncompromising punctuality, nutrition habits, and locker-room respect.
                  </p>
                </div>

                <div className="p-5 bg-white rounded-xl border border-[#E2E5DC] space-y-2 shadow-xs">
                  <div className="font-display text-2xl font-black text-[#F4512C]">
                    03
                  </div>
                  <h4 className="font-display text-base font-black uppercase text-[#171A18]">
                    PERFORMANCE
                  </h4>
                  <p className="text-[11px] text-[#4E544F] leading-relaxed">
                    Converting training metrics directly into matchday titles and podiums.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/about" className="btn-forest text-xs py-3 px-6 w-full sm:w-auto justify-center text-center">
                  Read Our Full Founding Philosophy
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </Link>
              </div>
            </div>

            {/* Large Photography alongside statement */}
            <div className="lg:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#174A3B]">
              <Image
                src="/images/philosophy_discipline.jpg"
                alt="Athletes lined up in disciplined formation on the track"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white text-xs">
                  <span className="font-mono text-[#B8D94E] uppercase tracking-widest block text-[10px]">
                    CORE MOTTO
                  </span>
                  <p className="font-display font-extrabold text-lg uppercase leading-tight mt-0.5">
                    &quot;Train in the shadow so you can shine under the floodlights.&quot;
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PERFORMANCE LAB: SPORTS SCIENCE & BIOMECHANICS */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-4">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                SPORTS SCIENCE & METHODOLOGY
              </span>

              <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
                THE PERFORMANCE LAB.
              </h2>

              <p className="text-sm text-[#4E544F] leading-relaxed">
                We don&apos;t rely on subjective guesswork. Every academy athlete is profiled through automated telemetry, laser speed gates, and jump force plates.
              </p>

              {/* Selector Buttons */}
              <div className="space-y-2 pt-2">
                {(["speed", "strength", "agility", "endurance", "power"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveLabMetric(key)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs font-black uppercase tracking-wider transition-all ${activeLabMetric === key
                      ? "border-[#F4512C] bg-[#FFF1ED] text-[#F4512C]"
                      : "border-[#E2E5DC] bg-[#F8F7F2] text-[#171A18] hover:border-[#174A3B]"
                      }`}
                  >
                    <span>{key.toUpperCase()} PROFILE</span>
                    <span className="font-display text-sm font-black">{labMetrics[key].score}%</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Visualization Screen */}
            <div className="lg:col-span-7 bg-[#F8F7F2] p-6 sm:p-10 rounded-2xl border border-[#E2E5DC] shadow-sm space-y-6">

              <div className="flex items-center justify-between border-b border-[#E2E5DC] pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#737A74]">
                    ACTIVE DIAGNOSTIC ATTRIBUTE
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-[#171A18] mt-0.5">
                    {labMetrics[activeLabMetric].title}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="font-display text-4xl font-black text-[#F4512C]">
                    {labMetrics[activeLabMetric].score}%
                  </div>
                  <div className="text-[10px] font-bold text-[#174A3B]">
                    {labMetrics[activeLabMetric].benchmark}
                  </div>
                </div>
              </div>

              {/* Horizontal Progress Meter Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-extrabold text-[#737A74] mb-2 uppercase">
                  <span>Grassroots Baseline (65%)</span>
                  <span>State Competitor (85%)</span>
                  <span>Pro Standard (95%+)</span>
                </div>
                <div className="w-full h-3.5 bg-[#E2E5DC] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#174A3B] via-[#B8D94E] to-[#F4512C] rounded-full transition-all duration-700"
                    style={{ width: `${labMetrics[activeLabMetric].score}%` }}
                  />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                {labMetrics[activeLabMetric].description}
              </p>

              {/* Lab features strip */}
              <div className="pt-4 border-t border-[#E2E5DC] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E2E5DC]">
                  <span className="text-[10px] font-bold text-[#737A74] uppercase block">Hardware</span>
                  <span className="font-bold text-[#171A18]">ForceDecks Dual Plates</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E5DC]">
                  <span className="text-[10px] font-bold text-[#737A74] uppercase block">Timing</span>
                  <span className="font-bold text-[#171A18]">Freelap Laser Gates</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E2E5DC]">
                  <span className="text-[10px] font-bold text-[#737A74] uppercase block">Scouting</span>
                  <span className="font-bold text-[#171A18]">Video Classroom</span>
                </div>
              </div>

              <div>
                <Link href="/coaching" className="btn-primary text-xs py-3 sm:py-2.5 px-6 uppercase font-black w-full sm:w-auto justify-center text-center">
                  Explore Full Coaching Methodology →
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. ATHLETE DEVELOPMENT JOURNEY: START -> FOUNDATION -> DEVELOPMENT -> PRO */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
              THE DEVELOPMENT PATHWAY
            </span>
            <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
              ATHLETE PROGRESSION PYRAMID.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              A transparent, long-term athletic pipeline nurturing young athletes from their first clinic to the professional podium.
            </p>
          </div>

          {/* Desktop Horizontal Journey / Mobile Vertical Journey */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: "01",
                stage: "Foundation",
                age: "Ages 6 - 10",
                focus: "Motor Agility & Fundamental Joy",
                desc: "Coordination, multi-directional balance, spatial play, and building an unshakeable love for sport.",
                ratio: "1:8 Coach Ratio"
              },
              {
                step: "02",
                stage: "Development",
                age: "Ages 11 - 14",
                focus: "Mechanics & Positional Roles",
                desc: "Ball mastery, stroke mechanics, speed development, small-sided tactical scenarios, and friendly tournaments.",
                ratio: "1:6 Focused Ratio"
              },
              {
                step: "03",
                stage: "Performance",
                age: "Ages 15 - 18",
                focus: "Tactical Scrimmage & Power",
                desc: "High-intensity periodization, force plate monitoring, match IQ, video analysis, and state championships.",
                ratio: "1:4 Advanced Ratio"
              },
              {
                step: "04",
                stage: "Elite National",
                age: "Ages 18+",
                focus: "Pro Showcases & Scholarships",
                desc: "Scouting combines, collegiate athletic grants, national squad selections, and agent showcases.",
                ratio: "1:1 / 1:3 Elite Ratio"
              }
            ].map((p, i) => (
              <div
                key={i}
                className="sports-card p-6 bg-white border-t-4 border-t-[#F4512C] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-black text-[#F4512C]">
                      {p.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-[#174A3B] bg-[#EBF3F0] px-2 py-0.5 rounded">
                      {p.ratio}
                    </span>
                  </div>

                  <div className="text-xs font-black text-[#F4512C] uppercase tracking-wider mt-2">
                    {p.age}
                  </div>

                  <h3 className="font-display text-xl font-black uppercase text-[#171A18] mt-0.5">
                    {p.stage}
                  </h3>

                  <div className="text-xs font-bold text-[#174A3B] mt-1">
                    {p.focus}
                  </div>

                  <p className="text-xs text-[#4E544F] mt-3 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ECEEE7] text-[11px] font-extrabold text-[#737A74] uppercase">
                  Stage Verified by Academy Board
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MEET THE COACHING TEAM (EDITORIAL ASYMMETRICAL PROFILES) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
                MENTORSHIP ROSTER
              </span>
              <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
                MEET THE COACHING TEAM.
              </h2>
              <p className="text-xs sm:text-sm text-[#4E544F] mt-2 max-w-xl">
                UEFA Pro License directors, BCCI Level 3 master coaches, and former WTA tour athletes who teach with empathy and elite standards.
              </p>
            </div>

            <Link href="/coaches" className="btn-forest text-xs py-3 px-6 w-full sm:w-auto justify-center text-center">
              View All 25+ Licensed Coaches →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COACHES_DATA.slice(0, 3).map((coach) => (
              <div
                key={coach.id}
                className="sports-card bg-[#F8F7F2] overflow-hidden flex flex-col justify-between border border-[#E2E5DC] group"
              >
                <div>
                  <div className="relative aspect-[4/4] overflow-hidden bg-black/5">
                    <Image
                      src={coach.image}
                      alt={`${coach.name} — ${coach.role} at APEX Sports Academy`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#174A3B] text-[#B8D94E] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded">
                      {coach.sport}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="font-display text-xl font-black uppercase text-[#171A18] group-hover:text-[#F4512C] transition-colors">
                        {coach.name}
                      </h3>
                      <p className="text-xs font-extrabold text-[#F4512C] mt-0.5">
                        {coach.role}
                      </p>
                    </div>

                    <p className="text-xs text-[#4E544F] italic leading-relaxed pt-1">
                      &quot;{coach.quote}&quot;
                    </p>

                    <div className="pt-2 text-[11px] text-[#737A74]">
                      <strong>Certifications:</strong> {coach.certifications.join(" • ")}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#ECEEE7] mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#174A3B]">
                    {coach.experience}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "COACH",
                        `Consultation with ${coach.name}`,
                        coach.sport
                      )
                    }
                    className="text-xs font-black uppercase tracking-wider text-[#F4512C] hover:text-[#DC3E1B]"
                  >
                    Book 1-on-1 →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. TRAINING FACILITIES: IMMERSIVE ASYMMETRICAL GALLERY */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
                18-ACRE CAMPUS
              </span>
              <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
                TRAINING FACILITIES.
              </h2>
            </div>
            <Link href="/facilities" className="btn-outline text-xs py-2.5 px-6 w-full sm:w-auto justify-center text-center">
              Explore All Facilities →
            </Link>
          </div>

          {/* Large Primary Arena + Overlapping Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* Main Stage */}
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black/10">
              <Image
                src={FACILITIES_DATA[activeFacilityIndex].image}
                alt={`${FACILITIES_DATA[activeFacilityIndex].name} Olympic standard facility at Apex Sports Academy`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="bg-[#F4512C] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded w-max">
                  {FACILITIES_DATA[activeFacilityIndex].category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase mt-1">
                  {FACILITIES_DATA[activeFacilityIndex].name}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
                  {FACILITIES_DATA[activeFacilityIndex].description}
                </p>
                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "FACILITY",
                        `Reserve Slot: ${FACILITIES_DATA[activeFacilityIndex].name}`,
                        FACILITIES_DATA[activeFacilityIndex].category
                      )
                    }
                    className="btn-primary text-xs py-2 px-5"
                  >
                    Reserve Arena Slot
                  </button>
                  <span className="text-xs text-white/70">
                    Capacity: {FACILITIES_DATA[activeFacilityIndex].capacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Smaller thumbnails switcher */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
              {FACILITIES_DATA.slice(0, 4).map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFacilityIndex(i)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 ${activeFacilityIndex === i
                    ? "border-[#F4512C] bg-white shadow-md"
                    : "border-[#E2E5DC] bg-white/70 hover:bg-white"
                    }`}
                >
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 border border-[#E2E5DC]">
                    <Image
                      src={f.image}
                      alt={`${f.name} facility preview`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase text-[#171A18] line-clamp-1">
                      {f.name}
                    </div>
                    <div className="text-[10px] text-[#737A74] mt-0.5">
                      {f.category}
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. ACADEMY NUMBERS IN MOTION */}
      {/* ========================================================================= */}
      <section className="py-16 bg-[#174A3B] text-white border-b border-[#0E3127]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#B8D94E]">
                500+
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-white mt-1">
                Active Athletes
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">Grassroots to Pro</div>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#B8D94E]">
                14
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-white mt-1">
                Years of Legacy
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">Founded 2012</div>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#B8D94E]">
                25+
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-white mt-1">
                Licensed Staff
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">UEFA, BCCI, PTR</div>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#B8D94E]">
                120+
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-white mt-1">
                Tournament Cups
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">State & National</div>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl font-black text-[#B8D94E]">
                45+
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-white mt-1">
                Championships
              </div>
              <div className="text-[10px] text-white/60 mt-0.5">Trophy Titles</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. ATHLETE STORIES (MAGAZINE STYLE) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
                MAGAZINE CASE STUDY
              </span>
              <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
                FROM FIRST SESSION TO STATE CHAMPION.
              </h2>
            </div>
            <Link href="/stories" className="btn-outline text-xs py-2.5 px-6 w-full sm:w-auto justify-center text-center">
              Read All Stories →
            </Link>
          </div>

          {/* Large Featured Story */}
          <div className="sports-card p-6 sm:p-10 bg-[#F8F7F2] border border-[#E2E5DC] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-[#174A3B]">
              <Image
                src="/images/stories/rohan_cricket.jpg"
                alt="Rohan Verma bowling in cricket training nets"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E2E5DC] text-xs">
                <span className="font-bold text-[#171A18] block">Rohan Verma</span>
                <span className="text-[11px] text-[#F4512C] font-black">Ranji Trophy First-Class Call-Up</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#174A3B]">
                CRICKET PERFORMANCE // CLASS OF 2024
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#171A18] leading-tight">
                HOW BIOMECHANICAL RETRAINING ADDED 8 KM/H TO ROHAN&apos;S DELIVERY STRIDE.
              </h3>
              <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                Rohan arrived at age 15 with raw pace but chronic lumbar stress fractures. Over 24 months, Coach Devendra Patil utilized 3D motion capture and Keiser rotational cable training to rebuild his back-foot plant.
              </p>

              <div className="p-4 bg-white rounded-xl border border-[#E2E5DC] text-xs italic text-[#171A18]">
                &quot;The coaches here built the physical armor so my body could withstand 140 km/h delivery forces without breaking down.&quot;
              </div>

              <div className="pt-2">
                <Link href="/stories" className="btn-primary text-xs py-2.5 px-6 w-full sm:w-auto justify-center text-center">
                  Read Rohan&apos;s Full Article →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. UPCOMING EVENTS & MATCHDAY TIMELINE */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
                2026 CALENDAR & COMBINES
              </span>
              <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
                UPCOMING EVENTS & TRIALS.
              </h2>
            </div>
            <Link href="/events" className="btn-outline text-xs py-2.5 px-6 w-full sm:w-auto justify-center text-center">
              Full Season Schedule →
            </Link>
          </div>

          <div className="space-y-4">
            {EVENTS_DATA.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="sports-card p-6 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-[#E2E5DC] hover:border-[#F4512C]"
              >
                <div className="space-y-2 lg:w-8/12">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EBF3F0] text-[#174A3B]">
                      {evt.sport} • {evt.type}
                    </span>
                    <span className="text-[10px] font-black uppercase text-[#F4512C] bg-[#FFF1ED] px-2 py-0.5 rounded">
                      {evt.status}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-[#171A18]">
                    {evt.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#737A74]">
                    <span className="flex items-center gap-1.5 font-bold text-[#171A18]">
                      <Calendar className="w-3.5 h-3.5 text-[#F4512C]" /> {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#174A3B]" /> {evt.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#174A3B]" /> {evt.location}
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "CAMP",
                        `Registration: ${evt.title}`,
                        evt.sport
                      )
                    }
                    className="btn-primary text-xs py-3 px-6 uppercase font-black"
                  >
                    Register Athlete →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. MEMBERSHIP TIERS (SPORTS CLUB AESTHETIC) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
              ATHLETE MEMBERSHIPS
            </span>
            <h2 className="editorial-title text-3xl sm:text-5xl font-black text-[#171A18]">
              CLUB MEMBERSHIP TIERS.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              Transparent sports club dues covering licensed coaching, Olympic training ground access, and motion analysis sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 border flex flex-col justify-between transition-all ${plan.recommended
                  ? "border-2 border-[#F4512C] bg-white shadow-xl scale-[1.02]"
                  : "border-[#E2E5DC] bg-[#F8F7F2]"
                  }`}
              >
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#174A3B]">
                    {plan.level}
                  </span>
                  <h3 className="font-display text-2xl font-black uppercase text-[#171A18] mt-1">
                    {plan.name}
                  </h3>
                  <div className="font-display text-4xl font-black text-[#171A18] mt-4">
                    ${plan.monthlyPrice} <span className="text-xs text-[#737A74] font-bold uppercase">/ mo</span>
                  </div>

                  <p className="text-xs text-[#4E544F] mt-3 leading-relaxed">
                    {plan.subtitle}
                  </p>

                  <div className="mt-5 space-y-2.5 text-xs pt-4 border-t border-[#ECEEE7]">
                    {plan.features.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[#171A18]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#174A3B] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#ECEEE7]">
                  <button
                    type="button"
                    onClick={() =>
                      handleAction(
                        "MEMBERSHIP",
                        `Apex ${plan.name} Membership`,
                        "All-Sport Access",
                        `$${plan.monthlyPrice}/mo`
                      )
                    }
                    className={`w-full py-3 rounded-lg text-xs uppercase font-black tracking-wider flex items-center justify-center ${plan.recommended ? "btn-primary" : "btn-forest"
                      }`}
                  >
                    Choose {plan.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. HEROIC TESTIMONIAL (ONE LARGE IMPACTFUL STATEMENT) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#F1F2ED] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">

          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E2E5DC] shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-[#E2E5DC]">
              <Image
                src={TESTIMONIALS_DATA[activeTestimonialIdx].image}
                alt={`${TESTIMONIALS_DATA[activeTestimonialIdx].name} — ${TESTIMONIALS_DATA[activeTestimonialIdx].role}`}
                fill
                sizes="(max-width: 640px) 112px, 144px"
                className="object-cover"
              />
            </div>

            <div className="space-y-4 flex-1">
              <Quote className="w-8 h-8 text-[#F4512C] opacity-75" />
              <p className="font-display text-xl sm:text-2xl font-black uppercase text-[#171A18] leading-snug">
                &quot;{TESTIMONIALS_DATA[activeTestimonialIdx].quote}&quot;
              </p>
              <div>
                <div className="text-sm font-black uppercase text-[#171A18]">
                  {TESTIMONIALS_DATA[activeTestimonialIdx].name}
                </div>
                <div className="text-xs text-[#737A74]">
                  {TESTIMONIALS_DATA[activeTestimonialIdx].role} • {TESTIMONIALS_DATA[activeTestimonialIdx].sport}
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex items-center gap-2 pt-2">
                {TESTIMONIALS_DATA.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTestimonialIdx(i)}
                    className={`h-2 rounded-full transition-all ${activeTestimonialIdx === i ? "w-8 bg-[#F4512C]" : "w-2 bg-[#E2E5DC]"
                      }`}
                    aria-label={`Testimonial slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FINAL CLOSING CTA: "YOUR NEXT SESSION STARTS HERE" */}
      {/* ========================================================================= */}
      <section className="relative py-24 bg-[#174A3B] text-white text-center overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 space-y-6">
          <span className="editorial-tag bg-white/10 text-[#B8D94E] border border-white/20">
            ADMISSIONS OPEN FOR 2026 SEASON
          </span>
          <h2 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-black text-white leading-none">
            YOUR NEXT SESSION <br />
            <span className="text-[#F4512C]">STARTS HERE.</span>
          </h2>
          <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Reserve a 90-minute complimentary assessment with our head directors. Step onto our Olympic grounds and see the difference scientific coaching makes.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={() =>
                handleAction(
                  "TRIAL",
                  "Complimentary Athletic Assessment & Trial",
                  "Multi-Sport",
                  "Free Evaluation"
                )
              }
              className="btn-primary text-xs py-3.5 px-8"
            >
              Book a Trial →
            </button>
            <button
              type="button"
              onClick={() => setIsFinderOpen(true)}
              className="btn-outline bg-transparent border-white/30 text-white hover:bg-white hover:text-[#174A3B] text-xs py-3.5 px-8"
            >
              Find Your Program →
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        type={bookingModal.type}
        title={bookingModal.title}
        sport={bookingModal.sport}
        price={bookingModal.price}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
      />

      {/* Sports Finder Quiz Modal */}
      <SportsFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        onSelectSport={(sportSlug) => {
          handleAction(
            "TRIAL",
            `Trial Session for ${sportSlug.toUpperCase()}`,
            sportSlug
          );
        }}
      />
    </div>
  );
}
