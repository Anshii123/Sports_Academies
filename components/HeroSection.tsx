"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Flame,
  ShieldCheck,
  Compass,
  Play,
  Volume2,
  VolumeX,
  Activity,
  Zap,
  Gauge,
  Sparkles,
  Trophy,
  Users,
  Target,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  X,
  MapPin,
  Calendar,
  Layers
} from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: (type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH", title: string, sport: string, price?: string) => void;
  onOpenFinder: () => void;
}

interface SportShowcaseItem {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  headlineWord: string;
  image: string;
  accentColor: string;
  facility: string;
  coach: string;
  telemetry: {
    metric1: { label: string; value: string; unit: string };
    metric2: { label: string; value: string; unit: string };
    metric3: { label: string; value: string };
  };
}

const SHOWCASE_SPORTS: SportShowcaseItem[] = [
  {
    id: "track",
    name: "Track & Field",
    badge: "Olympic Sprint Hub",
    tagline: "Laser-timed acceleration and low-heel recovery mechanics",
    headlineWord: "SPEED",
    image: "/images/hero/hero_athlete_motion.jpg",
    accentColor: "#F4512C",
    facility: "Mondo 8-Lane Olympic Synthetic Track",
    coach: "Julian Becker (Former Olympic Sprint Coach)",
    telemetry: {
      metric1: { label: "Top Velocity", value: "34.8", unit: "km/h" },
      metric2: { label: "Ground Force", value: "3.9", unit: "x BW" },
      metric3: { label: "Stride Cadence", value: "4.8 Steps/Sec" }
    }
  },
  {
    id: "football",
    name: "Football / Soccer",
    badge: "FIFA-Pro Technical Arena",
    tagline: "High-press tactical rondo, dynamic ball velocity, and positional IQ",
    headlineWord: "PRECISION",
    image: "/images/sports/football.jpg",
    accentColor: "#174A3B",
    facility: "FIFA-Quality Pro Floodlit Arena",
    coach: "Marcus Vance (UEFA Pro License)",
    telemetry: {
      metric1: { label: "Shot Velocity", value: "118", unit: "km/h" },
      metric2: { label: "Sprint Distance", value: "9.8", unit: "km/match" },
      metric3: { label: "Passing Accuracy", value: "94.2% Under Press" }
    }
  },
  {
    id: "cricket",
    name: "Cricket Academy",
    badge: "BCCI Standard Turf Center",
    tagline: "3D bowling biomechanics, Keiser power chain, and match pressure nets",
    headlineWord: "POWER",
    image: "/images/sports/cricket.jpg",
    accentColor: "#D97706",
    facility: "Pavilion Turf & Indoor Kinetic Nets",
    coach: "Devendra Patil (Former Ranji & NCA Coach)",
    telemetry: {
      metric1: { label: "Release Speed", value: "142", unit: "km/h" },
      metric2: { label: "Bat Speed", value: "128", unit: "km/h" },
      metric3: { label: "Seam Rotation", value: "2,420 RPM" }
    }
  },
  {
    id: "basketball",
    name: "Basketball",
    badge: "FIBA Hardwood Pavilion",
    tagline: "Explosive vertical translation, floor spacing, and game clutch shooting",
    headlineWord: "AGILITY",
    image: "/images/sports/basketball.jpg",
    accentColor: "#2563EB",
    facility: "Climate-Controlled FIBA Hardwood Dome",
    coach: "Tariq Hamilton (Ex-EuroLeague Coach)",
    telemetry: {
      metric1: { label: "Vertical Jump", value: "38.5", unit: "inches" },
      metric2: { label: "Release Time", value: "0.38", unit: "sec" },
      metric3: { label: "Lateral Decel", value: "4.2 m/s²" }
    }
  },
  {
    id: "tennis",
    name: "Tennis Center",
    badge: "Grand Slam DecoTurf",
    tagline: "Split-step reaction time, heavy topspin RPM, and kinetic chain serve",
    headlineWord: "MASTERY",
    image: "/images/sports/tennis.jpg",
    accentColor: "#059669",
    facility: "Grand Slam Spec DecoTurf Courts",
    coach: "Elena Rostova (PTR Certified Elite)",
    telemetry: {
      metric1: { label: "First Serve", value: "196", unit: "km/h" },
      metric2: { label: "Forehand RPM", value: "3,150", unit: "RPM" },
      metric3: { label: "Reaction Latency", value: "0.19 sec" }
    }
  }
];

const HEADLINE_ROTATION = [
  { word: "CHAMPIONS", color: "text-[#F4512C]", bg: "bg-[#FFF1ED]", border: "border-[#FADCD5]" },
  { word: "VELOCITY", color: "text-[#174A3B]", bg: "bg-[#EBF3F0]", border: "border-[#C6DDD5]" },
  { word: "PRECISION", color: "text-[#2563EB]", bg: "bg-[#EFF6FF]", border: "border-[#BFDBFE]" },
  { word: "POWER", color: "text-[#D97706]", bg: "bg-[#FEF3C7]", border: "border-[#FDE68A]" },
  { word: "MASTERY", color: "text-[#059669]", bg: "bg-[#ECFDF5]", border: "border-[#A7F3D0]" }
];

export default function HeroSection({ onOpenBooking, onOpenFinder }: HeroSectionProps) {
  // Active sport index
  const [activeSportIdx, setActiveSportIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Headline word rotation
  const [headlineIdx, setHeadlineIdx] = useState(0);

  // Sound atmosphere state (synthesizes subtle stadium energy through Web Audio API)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Video Tour modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Interactive Mini Athletic Matcher State
  const [matcherAge, setMatcherAge] = useState<"junior" | "academy" | "pro" | "adult">("academy");
  const [matcherGoal, setMatcherGoal] = useState<"speed" | "technical" | "pro" | "fitness">("speed");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // 3D Parallax tilt state for showcase card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const activeSport = SHOWCASE_SPORTS[activeSportIdx];

  // Auto-cycle through sports showcase
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 60; // 60ms steps
    const totalDuration = 6000; // 6 seconds
    const increment = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSportIdx((curr) => (curr + 1) % SHOWCASE_SPORTS.length);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, activeSportIdx]);

  // Headline cycling
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setHeadlineIdx((prev) => (prev + 1) % HEADLINE_ROTATION.length);
    }, 2800);
    return () => clearInterval(wordTimer);
  }, []);

  // Web Audio synthetic stadium atmosphere (crowd hum & rhythm)
  const toggleStadiumSound = () => {
    if (isPlayingAudio) {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioContextRef.current = ctx;

        // Create pink noise buffer for realistic warm stadium ambient rush
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
          b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        // Bandpass filter to sculpt stadium roar frequencies (120Hz to 600Hz)
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 320;
        filter.Q.value = 1.8;

        const gain = ctx.createGain();
        gain.gain.value = 0.22;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        setIsPlayingAudio(true);
      } catch (err) {
        console.error("Audio ambience error:", err);
      }
    }
  };

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // 3D Parallax Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  // Matcher Recommendation Output
  const getRecommendation = () => {
    if (matcherAge === "junior") {
      return {
        path: "Young Olympians Foundation (Ages 6-12)",
        sport: "Multi-Sport Agility & Coordination",
        focus: "Fundamental Movement Skills & Multi-Discipline Play",
        coach: "Julian Becker & Youth Specialist Staff",
        gain: "+34% Motor Coordination & Reaction Speed in 12 Weeks"
      };
    }
    if (matcherGoal === "pro") {
      return {
        path: "Apex Pro Draft & College Pathway",
        sport: activeSport.name,
        focus: "Tactical Match Play, Biomechanical Filming & Scout Portfolios",
        coach: activeSport.coach,
        gain: "Direct NCAA & National League Scout Showcases"
      };
    }
    if (matcherGoal === "speed") {
      return {
        path: "High-Velocity Acceleration & Plyometrics",
        sport: "Sprint & Field Agility",
        focus: "Freelap Laser Gates & Force Plate Explosiveness",
        coach: "Dr. Alistair Ross & Sprint Faculty",
        gain: "+0.28s Faster 30m Flying Sprint • +18% Power"
      };
    }
    return {
      path: "Elite Sport Mastery Program",
      sport: activeSport.name,
      focus: "Intensive Skill Mastery & High-Performance Conditioning",
      coach: activeSport.coach,
      gain: "+22% Match Endurance & Core Rotational Torque"
    };
  };

  const recommendation = getRecommendation();

  return (
    <>
      <section className="relative pt-6 pb-12 lg:pt-10 lg:pb-18 bg-[#F8F7F2] border-b border-[#E2E5DC] overflow-hidden bg-arena-grid">
        {/* Soft Ambient Radial Glow Overlays */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-soft pointer-events-none -z-0" />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#F4512C]/6 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-[#174A3B]/8 blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10">

          {/* ========================================================================= */}
          {/* TOP INTERACTIVE TELEMETRY & STATUS BAR */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between pb-4 mb-6 sm:mb-8 border-b border-[#E2E5DC] gap-3">
            {/* Live Indicator & Academic Badge */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4512C] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F4512C]" />
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#171A18]">
                  APEX HIGH PERFORMANCE INSTITUTION
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#174A3B] text-white">
                  2026 ACADEMY SEASON
                </span>
              </div>
            </div>

            {/* Quick Live Interactive Features Bar */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Stadium Atmosphere Sound Synth Toggle */}
              <button
                type="button"
                onClick={toggleStadiumSound}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  isPlayingAudio
                    ? "bg-[#174A3B] text-white border-[#174A3B] shadow-md shadow-[#174A3B]/20"
                    : "bg-white/80 hover:bg-white text-[#4E544F] border-[#E2E5DC] hover:border-[#174A3B]"
                }`}
                title="Toggle ambient stadium audio atmosphere synthesized in real-time"
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#B8D94E]" />
                    <span className="hidden md:inline">Stadium Ambience</span>
                    {/* Animated Equalizer Bars */}
                    <div className="flex items-end gap-0.5 h-3 ml-0.5">
                      <span className="w-0.5 bg-[#B8D94E] rounded-full sound-bar-1" />
                      <span className="w-0.5 bg-[#B8D94E] rounded-full sound-bar-2" />
                      <span className="w-0.5 bg-[#B8D94E] rounded-full sound-bar-3" />
                      <span className="w-0.5 bg-[#B8D94E] rounded-full sound-bar-4" />
                    </div>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-[#737A74]" />
                    <span className="hidden sm:inline">Stadium Audio</span>
                    <span className="text-[9px] px-1 rounded bg-[#F1F2ED] text-[#737A74]">Off</span>
                  </>
                )}
              </button>

              {/* Watch Video Tour Button */}
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-[#FFF1ED] text-[#F4512C] text-[11px] font-extrabold uppercase tracking-wider border border-[#FADCD5] shadow-xs hover:shadow-md transition-all group"
              >
                <span className="w-4 h-4 rounded-full bg-[#F4512C] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </span>
                <span>Campus Reel</span>
                <span className="text-[9px] font-black opacity-75">2:15</span>
              </button>

              {/* Live Active Arenas Counter */}
              <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-bold text-[#737A74] pl-2 border-l border-[#E2E5DC]">
                <Activity className="w-3.5 h-3.5 text-[#174A3B]" />
                <span>14 Arenas Live</span>
                <span className="text-[#E2E5DC]">•</span>
                <span className="text-[#174A3B] font-extrabold">182 Athletes Active</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MAIN HERO SPLIT: DYNAMIC EDITORIAL COPY + INTERACTIVE SHOWCASE */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 2xl:gap-16 items-center w-full">

            {/* LEFT COLUMN: EDITORIAL COPY & CALLS TO ACTION */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-6">

              {/* Tag pill with dynamic word indicator */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3F0] text-[#174A3B] text-[11px] font-black uppercase tracking-wider border border-[#C6DDD5] shadow-xs">
                  <Flame className="w-3.5 h-3.5 text-[#F4512C] animate-bounce" />
                  <span>Where Athletes Turn Pro</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[#737A74] text-[11px] font-bold border border-[#E2E5DC]">
                  <Sparkles className="w-3 h-3 text-[#F4512C]" />
                  <span>Olympic Biomechanics Lab</span>
                </div>
              </div>

              {/* Massive Dynamic Headline with Animated Rotating Target Word */}
              <div className="space-y-2">
                <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-[#171A18] tracking-tight leading-[0.94]">
                  <span className="sr-only">APEX Sports Academy — Olympic Sports Training &amp; Youth Athletic Development. </span>
                  BUILT FOR <br />
                  <span className="inline-block relative overflow-hidden h-[1.15em] align-bottom">
                    <span
                      key={headlineIdx}
                      className={`inline-block animate-[float-slow_4s_ease-in-out_infinite] transition-all duration-500 underline decoration-[#F4512C]/40 underline-offset-8 ${HEADLINE_ROTATION[headlineIdx].color}`}
                    >
                      {HEADLINE_ROTATION[headlineIdx].word}
                    </span>
                  </span>
                  <br />
                  THE NEXT LEVEL<span className="text-[#174A3B]">.</span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-[#4E544F] font-normal max-w-2xl 2xl:max-w-3xl leading-relaxed pt-2">
                  Scientific high-performance training engineered with high-speed video biomechanics, 
                  ForceDecks jump kinetics, and world-class certified mentors across 8 flagship disciplines.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenBooking(
                        "TRIAL",
                        `Complimentary 90-Min Assessment & Trial: ${activeSport.name}`,
                        activeSport.name,
                        "Free Trial"
                      )
                    }
                    className="btn-primary min-h-[48px] px-6 text-sm shadow-lg shadow-[#F4512C]/25 hover:shadow-xl hover:shadow-[#F4512C]/35 group"
                  >
                    <span>Book Complimentary Trial</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                    className="btn-forest min-h-[48px] px-5 text-sm shadow-md shadow-[#174A3B]/20"
                  >
                    <Compass className="w-4 h-4 mr-1 text-[#B8D94E]" />
                    <span>Instant Matcher</span>
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-black ml-1">AI</span>
                  </button>

                  <Link href="/sports" className="btn-outline min-h-[48px] px-5 text-sm">
                    All Disciplines
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#737A74] font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#174A3B] shrink-0" />
                    <span>Zero obligation trial</span>
                  </div>
                  <span>•</span>
                  <span>Free equipment kit provided</span>
                  <span>•</span>
                  <span className="text-[#F4512C] font-bold">Only 4 slots left this weekend</span>
                </div>
              </div>

              {/* ATHLETIC POTENTIAL CALCULATOR EXPANDABLE CARD */}
              {isCalculatorOpen && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#174A3B] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-[#E2E5DC] pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center font-black">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-[#171A18] tracking-wider">
                          Athletic Pathway Matcher
                        </h4>
                        <p className="text-[11px] text-[#737A74]">Find your personalized development track</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsCalculatorOpen(false)}
                      className="text-[#737A74] hover:text-[#171A18] p-1 rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-[#737A74] mb-1.5">
                        Athlete Age Category:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: "junior", label: "Under 12" },
                          { id: "academy", label: "Ages 13-16" },
                          { id: "pro", label: "Ages 16-21" },
                          { id: "adult", label: "Adult / Master" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setMatcherAge(item.id as typeof matcherAge)}
                            className={`px-2 py-1.5 rounded-lg font-bold text-center border transition-all ${
                              matcherAge === item.id
                                ? "bg-[#174A3B] text-white border-[#174A3B]"
                                : "bg-[#F8F7F2] text-[#171A18] border-[#E2E5DC] hover:border-[#174A3B]"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-[#737A74] mb-1.5">
                        Primary Development Goal:
                      </label>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: "speed", label: "Speed & Power" },
                          { id: "technical", label: "Tactical IQ" },
                          { id: "pro", label: "Pro Draft" },
                          { id: "fitness", label: "Endurance" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setMatcherGoal(item.id as typeof matcherGoal)}
                            className={`px-2 py-1.5 rounded-lg font-bold text-center border transition-all ${
                              matcherGoal === item.id
                                ? "bg-[#F4512C] text-white border-[#F4512C]"
                                : "bg-[#F8F7F2] text-[#171A18] border-[#E2E5DC] hover:border-[#F4512C]"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Card */}
                  <div className="p-3 rounded-xl bg-[#F8F7F2] border border-[#E2E5DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#174A3B] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#174A3B]" />
                        <span>Recommended Track: {recommendation.path}</span>
                      </div>
                      <div className="text-xs font-bold text-[#171A18]">{recommendation.focus}</div>
                      <div className="text-[10px] text-[#737A74]">Projected Impact: <span className="text-[#F4512C] font-black">{recommendation.gain}</span></div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onOpenBooking("TRIAL", `Assessment for ${recommendation.path}`, recommendation.sport, "Free Trial");
                        setIsCalculatorOpen(false);
                      }}
                      className="btn-primary w-full sm:w-auto text-xs py-2 px-3 whitespace-nowrap"
                    >
                      Book This Track
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              )}

              {/* INTEGRATED CLEAN STATS STRIP WITH HOVER GLOW (4 COLS) */}
              <div className="pt-5 border-t border-[#E2E5DC] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="group p-2.5 rounded-xl transition-colors hover:bg-white hover:shadow-xs border border-transparent hover:border-[#E2E5DC]">
                  <div className="font-display text-2xl sm:text-3xl font-black text-[#171A18] group-hover:text-[#F4512C] transition-colors">
                    500<span className="text-[#F4512C]">+</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#737A74] mt-0.5">
                    Athletes Active
                  </div>
                </div>

                <div className="group p-2.5 rounded-xl transition-colors hover:bg-white hover:shadow-xs border border-transparent hover:border-[#E2E5DC]">
                  <div className="font-display text-2xl sm:text-3xl font-black text-[#171A18] group-hover:text-[#174A3B] transition-colors">
                    98.4<span className="text-[#174A3B]">%</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#737A74] mt-0.5">
                    Win / Placement
                  </div>
                </div>

                <div className="group p-2.5 rounded-xl transition-colors hover:bg-white hover:shadow-xs border border-transparent hover:border-[#E2E5DC]">
                  <div className="font-display text-2xl sm:text-3xl font-black text-[#171A18] group-hover:text-[#F4512C] transition-colors">
                    25<span className="text-[#F4512C]">+</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#737A74] mt-0.5">
                    Olympic Mentors
                  </div>
                </div>

                <div className="group p-2.5 rounded-xl transition-colors hover:bg-white hover:shadow-xs border border-transparent hover:border-[#E2E5DC]">
                  <div className="font-display text-2xl sm:text-3xl font-black text-[#171A18] group-hover:text-[#174A3B] transition-colors">
                    142
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#737A74] mt-0.5">
                    Medals & Drafts
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: HIGH-ENERGY DYNAMIC MULTI-SPORT SHOWCASE WITH 3D TILT & HUD */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 w-full">

              {/* SPORT SELECTOR CHIPS ROW WITH AUTO-PROGRESS BARS */}
              <div
                role="tablist"
                aria-label="High performance sport disciplines selector"
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar select-none w-full"
              >
                {SHOWCASE_SPORTS.map((sport, idx) => {
                  const isActive = idx === activeSportIdx;
                  return (
                    <button
                      key={sport.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Select ${sport.name} showcase`}
                      onClick={() => {
                        setActiveSportIdx(idx);
                        setProgress(0);
                      }}
                      className={`relative flex-shrink-0 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border flex flex-col items-start overflow-hidden ${
                        isActive
                          ? "bg-[#171A18] text-white border-[#171A18] shadow-lg shadow-[#171A18]/20 scale-102"
                          : "bg-white text-[#4E544F] border-[#E2E5DC] hover:border-[#171A18] hover:text-[#171A18]"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: sport.accentColor }}
                        />
                        <span>{sport.name.split("/")[0]}</span>
                      </div>

                      {/* Mini progress bar under the active sport tab */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div
                            className="h-full transition-all duration-75"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: sport.accentColor
                            }}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* MAIN INTERACTIVE ATHLETIC STAGE WITH 3D TILT EFFECT */}
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transition: tilt.x === 0 ? "transform 0.5s ease-out" : "transform 0.1s ease-out"
                }}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#171A18] group aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] xl:aspect-[16/9] w-full select-none"
              >
                {/* Background Image with Dynamic Crossfade */}
                <Image
                  key={activeSport.id}
                  src={activeSport.image}
                  alt={`${activeSport.name} training showcase at Apex Sports Academy`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                />

                {/* Subtle Cinematic Vignette & Bottom Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* High-Tech Biomechanical Laser Scan Sweep Line */}
                <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#B8D94E] to-transparent animate-laser-sweep pointer-events-none opacity-60" />

                {/* BOTTOM HERO CARD CONTENT: SPORT TITLE, COACH & DIRECT TRIAL CTA */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 z-20 pointer-events-auto">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-1 text-white">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/20 backdrop-blur-md">
                          {activeSport.facility.split(" ")[0]} Arena
                        </span>
                        <span className="text-[10px] text-white/80 font-bold hidden sm:inline">
                          • Lead Mentor: {activeSport.coach.split("(")[0]}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                        {activeSport.name}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-1 max-w-md hidden sm:block font-medium">
                        {activeSport.tagline}
                      </p>
                    </div>

                    {/* Quick Reserve Button right on the card */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBooking(
                          "TRIAL",
                          `Complimentary 90-Min Assessment: ${activeSport.name}`,
                          activeSport.name,
                          "Free Trial"
                        );
                      }}
                      className="btn-primary text-xs py-2.5 px-4 shadow-lg flex-shrink-0 self-start sm:self-auto"
                    >
                      <span>Reserve {activeSport.name.split("/")[0]}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>

              </div>

              {/* CARD FOOTER INFO: FACILITY SPEC & REAL-TIME BIO-BENCHMARK */}
              <div className="flex flex-wrap items-center justify-between text-xs px-2 pt-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeSport.accentColor }} />
                  <span className="font-extrabold uppercase tracking-wider text-[#171A18] text-[11px]">
                    {activeSport.facility}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#174A3B] bg-[#EBF3F0] px-2.5 py-1 rounded-md border border-[#C6DDD5]">
                  <Activity className="w-3 h-3 text-[#174A3B]" />
                  <span>Telemetry: {activeSport.telemetry.metric3.label}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* LIVE REAL-TIME MARQUEE SCHEDULE TICKER */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-12 pt-3 border-t border-[#E2E5DC] bg-white">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F4512C] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-widest text-[#171A18]">
                  TODAY AT APEX CAMPUS // LIVE SCHEDULE & ARENAS
                </span>
                <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#EBF3F0] text-[#174A3B] border border-[#C6DDD5] hidden sm:inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#174A3B] animate-ping" />
                  Live Arena Feed
                </span>
              </div>
              <span className="text-[11px] text-[#737A74] font-semibold hidden md:inline-flex items-center gap-1.5">
                <span>Hover card to pause</span>
                <span className="text-[#F4512C] font-bold">•</span>
                <span>Click slot to book trial</span>
              </span>
            </div>
          </div>

          {/* INFINITE MARQUEE WITH SMOOTH GRADIENT EDGES */}
          <div className="relative w-full overflow-hidden mt-1">
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-infinite flex items-center gap-4 py-2 select-none">
              {[
                { time: "06:30", title: "Track Sprint Mechanics", arena: "Mondo Track", coach: "Julian Becker", status: "Active", sport: "Track & Field" },
                { time: "09:30", title: "Cricket Bio-Mechanics & Pace", arena: "Pavilion Turf Nets", coach: "Devendra Patil", status: "Upcoming", sport: "Cricket" },
                { time: "16:30", title: "Football Tactical Rondo & Scrimmage", arena: "FIFA-Pro Arena", coach: "Marcus Vance", status: "Upcoming", sport: "Football" },
                { time: "18:00", title: "Basketball Floor Spacing & Shooting", arena: "Indoor Dome", coach: "Tariq Hamilton", status: "Upcoming", sport: "Basketball" },
                { time: "19:00", title: "Tennis Topspin Kinetics & Match Play", arena: "DecoTurf Courts", coach: "Elena Rostova", status: "Upcoming", sport: "Tennis" },
                { time: "19:30", title: "Olympic Strength & Power Phase", arena: "Strength Lab", coach: "Dr. Alistair Ross", status: "Upcoming", sport: "Multi-Sport" },
                { time: "20:30", title: "Hydro Contrast & Cryo Recovery", arena: "Recovery Suite", coach: "Physio Staff", status: "Upcoming", sport: "Multi-Sport" }
              ].concat([
                { time: "06:30", title: "Track Sprint Mechanics", arena: "Mondo Track", coach: "Julian Becker", status: "Active", sport: "Track & Field" },
                { time: "09:30", title: "Cricket Bio-Mechanics & Pace", arena: "Pavilion Turf Nets", coach: "Devendra Patil", status: "Upcoming", sport: "Cricket" },
                { time: "16:30", title: "Football Tactical Rondo & Scrimmage", arena: "FIFA-Pro Arena", coach: "Marcus Vance", status: "Upcoming", sport: "Football" },
                { time: "18:00", title: "Basketball Floor Spacing & Shooting", arena: "Indoor Dome", coach: "Tariq Hamilton", status: "Upcoming", sport: "Basketball" },
                { time: "19:00", title: "Tennis Topspin Kinetics & Match Play", arena: "DecoTurf Courts", coach: "Elena Rostova", status: "Upcoming", sport: "Tennis" },
                { time: "19:30", title: "Olympic Strength & Power Phase", arena: "Strength Lab", coach: "Dr. Alistair Ross", status: "Upcoming", sport: "Multi-Sport" },
                { time: "20:30", title: "Hydro Contrast & Cryo Recovery", arena: "Recovery Suite", coach: "Physio Staff", status: "Upcoming", sport: "Multi-Sport" }
              ]).map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenBooking("TRIAL", `Assessment for ${item.title}`, item.sport, "Free Trial")}
                  className="flex-shrink-0 bg-[#F8F7F2] hover:bg-[#FFF1ED] border border-[#E2E5DC] hover:border-[#F4512C] px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3.5 shadow-xs hover:shadow-md cursor-pointer group"
                >
                  <div className="text-center font-display font-black text-sm text-[#F4512C] bg-white group-hover:bg-[#F4512C] group-hover:text-white px-3 py-1.5 rounded-lg border border-[#E2E5DC] group-hover:border-[#F4512C] transition-colors shadow-xs">
                    {item.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-bold text-[#171A18] uppercase tracking-tight whitespace-nowrap">
                        {item.title}
                      </div>
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                        item.status === "Active"
                          ? "bg-[#EBF3F0] text-[#174A3B] border border-[#C6DDD5]"
                          : "bg-white text-[#737A74] border border-[#E2E5DC]"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#737A74] flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#174A3B]" />
                        {item.arena}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-[#171A18]">Mentor: {item.coach}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* VIRTUAL CAMPUS & HIGH-PERFORMANCE TRAINING REEL MODAL */}
      {/* ========================================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#171A18] rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#F4512C] animate-pulse" />
                <div>
                  <h3 className="text-sm font-black uppercase text-white tracking-wider">
                    Apex High Performance Campus Drone Tour & Training Reel
                  </h3>
                  <p className="text-[11px] text-white/60">Cinematic Biomechanical Montage • 18-Acre Complex</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video / Visual Montage Stage */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              <Image
                src="/images/campus_aerial.jpg"
                alt="Aerial view of Apex Sports Academy campus"
                fill
                className="object-cover opacity-75"
              />

              {/* Cinematic HUD Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

              {/* Play Simulation Button & Action Center */}
              <div className="relative z-10 text-center space-y-4 max-w-md px-4">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#F4512C] text-white mx-auto flex items-center justify-center shadow-2xl shadow-[#F4512C]/50 hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                    Inside The Apex Training Engine
                  </h4>
                  <p className="text-xs text-white/75 font-normal">
                    Experience day-to-day athlete life, high-speed camera motion capture, and coach-athlete dynamics.
                  </p>
                </div>
              </div>

              {/* Chapter markers bottom bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-2 text-[10px] text-white/80 font-bold bg-black/60 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15">
                <div className="flex items-center gap-3">
                  <span className="text-[#B8D94E]">00:00 Aerial Campus</span>
                  <span>•</span>
                  <span>00:45 Sprint Gates</span>
                  <span>•</span>
                  <span>01:20 Tactical Turf</span>
                  <span>•</span>
                  <span>01:50 Cryo Lab</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenBooking("TRIAL", "Complimentary 90-Min Campus Assessment", "Multi-Sport", "Free Trial");
                  }}
                  className="btn-primary text-[10px] py-1 px-3"
                >
                  Book In-Person Visit
                </button>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="p-4 bg-[#1F2420] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B8D94E]" />
                <span className="text-white/80">Guided parent & athlete tours conducted daily from 08:00 to 18:00</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(false);
                  onOpenBooking("TRIAL", "Complimentary Academy Assessment & Tour", "Multi-Sport", "Free Trial");
                }}
                className="btn-forest text-xs py-2 px-4 w-full sm:w-auto"
              >
                Schedule Guided Campus Tour
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
