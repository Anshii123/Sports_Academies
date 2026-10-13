"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Activity, 
  Brain, 
  Zap, 
  HeartPulse, 
  Apple, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function CoachingTrainingPage() {
  const { requireAuth } = useAuth();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Interactive Athlete Development Tracker simulation state
  const [metricTab, setMetricTab] = useState<"speed" | "strength" | "technique" | "endurance" | "mental">("technique");

  const metricData = {
    technique: {
      score: 88,
      benchmark: "National U-18 Average: 74",
      title: "First Touch & High-Pressure Execution",
      description: "Measured through automated SmartCourt ball return speeds, pass completion under 3-player overload press, and clean contact angles.",
      drills: ["3v1 High Velocity Rondo", "Open Stance Angular Forehand", "Speed Ladder Cone Delivery"]
    },
    speed: {
      score: 92,
      benchmark: "National U-18 Average: 79",
      title: "10m Burst & Flying 30m Acceleration",
      description: "Timed with Freelap electronic laser gates. Focuses on horizontal force projection, triple extension, and low heel recovery mechanics.",
      drills: ["Sled Resistance Sprints (12% Bodyweight)", "Incline Boundary Bounds", "Reaction Whistle Deceleration"]
    },
    strength: {
      score: 84,
      benchmark: "National U-18 Average: 70",
      title: "Relative Force Production (ForceDecks)",
      description: "Countermovement jump peak power (Watts/kg) and eccentric braking symmetry to eliminate asymmetric knee loading.",
      drills: ["Trap Bar Deadlift (1.8x BW)", "Keiser Explosive Rotational Chops", "Single Leg Nordic Hamstring Curls"]
    },
    endurance: {
      score: 89,
      benchmark: "National U-18 Average: 78",
      title: "Yo-Yo Intermittent Recovery Level 2",
      description: "Monitored via heart rate telemetry bands to ensure rapid parasympathetic recovery between high-intensity match bouts.",
      drills: ["4x4-minute Aerobic Intervals (90% Max HR)", "Cross-Court Shuttle Intervals", "Hydrotherapy Flush Protocols"]
    },
    mental: {
      score: 86,
      benchmark: "National U-18 Average: 72",
      title: "Pressure Composure & Focus Reset",
      description: "Tactical breathwork (4-7-8 breathing) between points, error-amnesia mental anchoring, and match simulation under physical fatigue.",
      drills: ["Sudden-Death Matchplay Under Noise", "Pre-Service Kinetic Reset Ritual", "Post-Match Video Self-Evaluation"]
    }
  };

  const handleBookAssessment = () => {
    requireAuth(() => {
      setIsAssessmentOpen(true);
    }, "Create your athlete account to book a High-Performance Coaching Assessment.");
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                COACHING PEDAGOGY & METHODOLOGY
              </span>
              <h1 className="editorial-title text-4xl sm:text-6xl font-extrabold text-[#171A18] tracking-tight">
                THE SCIENCE OF <br />
                <span className="text-[#174A3B]">PEAK PERFORMANCE.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
                Elite performance is not an accident. Our methodology synchronizes technical mastery, biomechanical power, cognitive game intelligence, and cellular recovery into a unified 4-pillar system.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleBookAssessment}
                  className="btn-primary w-full sm:w-auto justify-center text-center"
                >
                  Book Coaching Assessment
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>
                <Link href="/coaches" className="btn-outline w-full sm:w-auto justify-center text-center">
                  Meet Our Coaching Faculty
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/images/facilities/strength_lab.jpg"
                alt="Strength coach working with athlete in performance lab"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E2E5DC] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#171A18] uppercase">Human Performance Lab</div>
                  <div className="text-[10px] text-[#737A74]">ForceDecks Biomechanical Testing Protocol</div>
                </div>
                <span className="text-xs font-black text-[#F4512C] bg-[#FFF1ED] px-2.5 py-1 rounded">
                  CSCS Certified
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE FOUR PILLARS */}
      <section className="py-16 md:py-24 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
              METHODOLOGY BLUEPRINT
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
              The Four Pillars of Mastery.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              Every weekly schedule is balanced across all four disciplines to build complete, injury-proof athletes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="sports-card p-6 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1ED] text-[#F4512C] flex items-center justify-center font-bold mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                1. Technical Mastery
              </h3>
              <p className="text-xs text-[#4E544F] mt-2 leading-relaxed">
                Repetitions under progressive pressure. First touch, ball release angle, stroke trajectory, and kinetic chain sequencing until mechanics become second nature.
              </p>
            </div>

            <div className="sports-card p-6 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center font-bold mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                2. Tactical Intelligence
              </h3>
              <p className="text-xs text-[#4E544F] mt-2 leading-relaxed">
                Spatial scanning, anticipating opponent transitions, positional structure, and micro-second decision making analyzed in our video classroom.
              </p>
            </div>

            <div className="sports-card p-6 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#F4F9E4] text-[#174A3B] flex items-center justify-center font-bold mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                3. Physical Armor
              </h3>
              <p className="text-xs text-[#4E544F] mt-2 leading-relaxed">
                Neuromuscular power, decelerative braking ability, rotational torque, and aerobic capacity preventing ligament strains and fatigue-induced errors.
              </p>
            </div>

            <div className="sports-card p-6 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center font-bold mb-4">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                4. Mental Grit & Reset
              </h3>
              <p className="text-xs text-[#4E544F] mt-2 leading-relaxed">
                Breath regulation, cognitive refocusing after missed points, emotional composure in away stadiums, and fearless leadership in crunch moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE ATHLETE DEVELOPMENT TRACKER FEATURE */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                EXCLUSIVE FEATURE
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#171A18] tracking-tight">
                Athlete Development Tracker.
              </h2>
              <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                Every enrolled athlete has their diagnostic metrics measured every 4 weeks. Toggle the attributes to inspect the benchmark standards required for elite national podiums.
              </p>

              {/* Selector Tabs */}
              <div className="space-y-2 pt-2">
                {(["technique", "speed", "strength", "endurance", "mental"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setMetricTab(key)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-all ${
                      metricTab === key
                        ? "border-[#F4512C] bg-[#FFF1ED] text-[#F4512C]"
                        : "border-[#E2E5DC] bg-[#F8F7F2] text-[#171A18] hover:border-[#174A3B]"
                    }`}
                  >
                    <span>{key} Analysis</span>
                    <span className="text-xs font-black">{metricData[key].score} / 100</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Display Card for Selected Metric */}
            <div className="lg:col-span-7 bg-[#F8F7F2] p-6 sm:p-8 rounded-2xl border border-[#E2E5DC] space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E5DC] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#737A74]">
                    Current Benchmark Profile
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#171A18] mt-0.5">
                    {metricData[metricTab].title}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="font-display text-4xl font-black text-[#F4512C]">
                    {metricData[metricTab].score}
                  </div>
                  <div className="text-[10px] font-semibold text-[#174A3B]">
                    {metricData[metricTab].benchmark}
                  </div>
                </div>
              </div>

              {/* Visual meter bar */}
              <div>
                <div className="flex flex-wrap gap-1 sm:justify-between text-[10px] sm:text-xs font-bold text-[#737A74] mb-1.5 uppercase">
                  <span>Academy Baseline (60)</span>
                  <span>State Elite (85)</span>
                  <span>Pro Standard (95+)</span>
                </div>
                <div className="w-full h-3 bg-[#E2E5DC] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#174A3B] via-[#B8D94E] to-[#F4512C] rounded-full transition-all duration-500"
                    style={{ width: `${metricData[metricTab].score}%` }}
                  />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                {metricData[metricTab].description}
              </p>

              <div className="pt-2">
                <span className="text-xs font-bold uppercase text-[#171A18] block mb-2">
                  Sample High-Performance Protocols:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {metricData[metricTab].drills.map((drill, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-lg border border-[#E2E5DC] text-[11px] font-semibold text-[#171A18] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#174A3B] shrink-0" />
                      {drill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WEEKLY TRAINING STRUCTURE */}
      <section className="py-16 md:py-24 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
              PERIODIZATION SCHEDULE
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
              Weekly Microcycle Structure.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              How our competitive athletes balance intense loading days with active regeneration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { day: "MON", title: "Activation & Speed", load: "Moderate", focus: "Max velocity sprint mechanics, low volume power, tactical theory" },
              { day: "TUE", title: "Intense Tactical", load: "High Load", focus: "Full-intensity team scrimmages, small-sided games, press triggers" },
              { day: "WED", title: "Regeneration & Gym", load: "Recovery", focus: "Cryo plunge, contrast hydrotherapy, mobility, eccentric strength" },
              { day: "THU", title: "Technical Precision", load: "High Load", focus: "Set pieces, precision shooting, racket kinetic chain, ball speed" },
              { day: "FRI", title: "Pre-Match Primer", load: "Light Sharp", focus: "Reaction drills, explosive starts, mental match visualization" },
              { day: "SAT/SUN", title: "Match Day & Review", load: "Competition", focus: "Tournament fixtures followed by Sunday video review sessions" }
            ].map((d, i) => (
              <div key={i} className="sports-card p-5 bg-white flex flex-col justify-between">
                <div>
                  <div className="font-display text-xl font-extrabold text-[#F4512C]">
                    {d.day}
                  </div>
                  <h4 className="text-xs font-bold uppercase text-[#171A18] mt-1">
                    {d.title}
                  </h4>
                  <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#EBF3F0] text-[#174A3B]">
                    {d.load}
                  </span>
                  <p className="text-[11px] text-[#4E544F] mt-3 leading-relaxed">
                    {d.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NUTRITION & RECOVERY GUIDANCE */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            <div className="p-8 rounded-2xl bg-[#174A3B] text-white space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 text-[#B8D94E] flex items-center justify-center font-bold">
                <Apple className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                Sports Nutrition Periodization
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Athletes are fueled by individualized nutrition plans developed with certified sports dietitians. We calibrate pre-training carbohydrate intake, electrolyte replenishment, and protein timing to maximize muscle protein synthesis.
              </p>
              <div className="text-xs text-[#B8D94E] font-bold uppercase tracking-wider pt-2">
                Hydration Bar & Recovery Shakes On-Site
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#F8F7F2] border border-[#E2E5DC] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1ED] text-[#F4512C] flex items-center justify-center font-bold">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-[#171A18]">
                Advanced Recovery Modalities
              </h3>
              <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                Featuring twin 8°C cold plunges, full-spectrum infrared sauna, NormaTec pneumatic compression boots, and dedicated sports physios who monitor joint mobility before and after match fixtures.
              </p>
              <div className="text-xs text-[#174A3B] font-bold uppercase tracking-wider pt-2">
                Accelerated Lactic Acid Clearance
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isAssessmentOpen}
        type="COACH"
        title="High-Performance Coaching Assessment"
        sport="Multi-Sport"
        price="Free Evaluation"
        onClose={() => setIsAssessmentOpen(false)}
      />
    </div>
  );
}
