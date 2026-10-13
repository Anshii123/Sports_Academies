"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Target, 
  Eye, 
  ShieldCheck, 
  ArrowRight, 
  Flame, 
  CheckCircle, 
  Sparkles,
  Award,
  Users
} from "lucide-react";
import { MILESTONES_DATA, ACHIEVEMENTS_DATA } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function AboutPage() {
  const { requireAuth } = useAuth();
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const handleTrial = () => {
    requireAuth(() => {
      setIsTrialOpen(true);
    }, "Create your athlete account to book an academy evaluation.");
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER & HERO */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              FOUNDED 2012 • PRIVATE INSTITUTION
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              ARCHITECTS OF <br />
              <span className="text-[#174A3B]">ATHLETIC EXCELLENCE.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed pt-2">
              Apex Sports Academy was established with a singular vision: to dismantle generic drills and build a scientifically anchored, human-centered academy where youth athletes develop Olympic-grade athleticism, character, and mental fortitude.
            </p>
          </div>

          {/* LARGE EDITORIAL PHOTO COLLAGE */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border-2 border-[#E2E5DC]">
              <Image
                src="/images/campus_aerial.jpg"
                alt="Academy stadium field training"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold uppercase text-[#171A18] border border-[#E2E5DC]">
                Flagship Campus • 18-Acre Olympic Training Grounds
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-[#E2E5DC] flex-1">
                <Image
                  src="/images/facilities/strength_lab.jpg"
                  alt="Strength and conditioning biomechanics lab"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="bg-[#174A3B] text-white p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="font-display text-4xl font-extrabold text-[#B8D94E]">14+</div>
                  <div className="text-xs font-bold uppercase tracking-wider text-white mt-1">Years of Legacy</div>
                </div>
                <p className="text-xs text-white/80 mt-3 leading-relaxed">
                  Over 500 active athletes trained, 45+ state and national trophies won, and 32 professional roster contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION, VISION & CORE VALUES */}
      <section className="py-16 md:py-24 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="sports-card p-8 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#FFF1ED] text-[#F4512C] flex items-center justify-center font-bold mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                Our Mission
              </h3>
              <p className="text-xs sm:text-sm text-[#4E544F] mt-3 leading-relaxed">
                To engineer an elite athletic development ecosystem that combines accredited European sports science, individualized skill mechanics, and character mentorship for aspiring athletes across every socioeconomic background.
              </p>
            </div>

            {/* Vision */}
            <div className="sports-card p-8 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center font-bold mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                Our Vision
              </h3>
              <p className="text-xs sm:text-sm text-[#4E544F] mt-3 leading-relaxed">
                To be universally recognized as the gold standard in youth athletic preparation—graduating athletes who excel in professional leagues, international Olympic podiums, and as disciplined leaders in society.
              </p>
            </div>

            {/* Core Values */}
            <div className="sports-card p-8 bg-white border border-[#E2E5DC]">
              <div className="w-12 h-12 rounded-xl bg-[#F4F9E4] text-[#174A3B] flex items-center justify-center font-bold mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                Core Values
              </h3>
              <ul className="text-xs sm:text-sm text-[#4E544F] mt-3 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F4512C]" />
                  <strong>Scientific Rigor:</strong> Evidence-backed periodization
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F4512C]" />
                  <strong>Uncompromising Integrity:</strong> Fair play & character
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F4512C]" />
                  <strong>Human Care:</strong> Athletes before trophies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#F4512C]" />
                  <strong>Relentless Pursuit:</strong> Constant incremental gains
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUNDER & LEADERSHIP STORY */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#F8F7F2]">
                <Image
                  src="/images/coaches/elena_rostova.jpg"
                  alt="Academy Founder & Leadership"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 sm:mt-0 sm:absolute sm:-bottom-4 sm:right-4 bg-[#174A3B] text-white p-4 rounded-xl shadow-lg border border-white/20">
                <div className="text-xs font-bold uppercase tracking-wider text-[#B8D94E]">
                  Leadership
                </div>
                <div className="text-sm font-extrabold uppercase">
                  Claire Sterling & Marcus Vance
                </div>
                <div className="text-[10px] text-white/70">
                  Co-Founders & High Performance Directors
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                LEADERSHIP & PEDAGOGY
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight leading-tight">
                &quot;We Built the Academy We Wished We Had As Young Athletes.&quot;
              </h2>
              <div className="text-xs sm:text-sm text-[#4E544F] space-y-4 leading-relaxed">
                <p>
                  In 2012, former international sprinters and European football coaches noticed a glaring fracture in youth sports: young talent was either pushed into chronic overuse injuries or left without structured biomechanical coaching.
                </p>
                <p>
                  Apex was constructed from the ground up as a high-performance sanctuary. By integrating certified exercise physiologists with licensed tactical directors, we eliminated guesswork from athletic development.
                </p>
                <p className="italic border-l-4 border-[#F4512C] pl-4 text-[#171A18] font-medium">
                  &quot;Every child who steps onto our turf brings an untapped ceiling. Our role is not merely to train muscles, but to build minds that remain calm in the 90th minute or the 5th set tiebreak.&quot;
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleTrial}
                  className="btn-primary w-full sm:w-auto justify-center text-center"
                >
                  Schedule an Evaluation
                  <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
                </button>
                <Link href="/coaches" className="btn-outline text-center w-full sm:w-auto justify-center">
                  Meet the Entire Coaching Staff
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ACADEMY MILESTONES (EDITORIAL TIMELINE 2012 -> 2026) */}
      <section className="py-16 md:py-24 bg-[#F1F2ED] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
              JOURNEY OF PROGRESSION
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
              Fourteen Years of Milestones.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              From a single natural grass pitch in 2012 to a nationally accredited multi-sport sports science campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MILESTONES_DATA.map((milestone, idx) => (
              <div
                key={idx}
                className="sports-card p-6 bg-white relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-3xl font-extrabold text-[#F4512C]">
                      {milestone.year}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center text-xs font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase text-[#171A18]">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-[#4E544F] mt-2 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#ECEEE7] text-[11px] font-semibold text-[#174A3B]">
                  Verified Historical Milestone
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ATHLETE DEVELOPMENT JOURNEY PATHWAY */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
              THE DEVELOPMENT PYRAMID
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
              The Athlete Progression Pathway.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              A transparent, metric-driven pathway guiding young athletes from their first session to championship victory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                stage: "Foundation",
                age: "Ages 6 - 10",
                focus: "Motor Skills & Joy",
                desc: "Agility, coordination, balance, spatial awareness, and fostering uninhibited love for movement."
              },
              {
                step: "02",
                stage: "Development",
                age: "Ages 11 - 14",
                focus: "Technical Mechanics",
                desc: "Position-specific skills, ball mastery, stroke mechanics, speed development, and friendly match play."
              },
              {
                step: "03",
                stage: "Performance",
                age: "Ages 15 - 18",
                focus: "Tactical & Strength",
                desc: "High-intensity periodization, force plate monitoring, match IQ, video analysis, and state competitions."
              },
              {
                step: "04",
                stage: "Elite Pro Track",
                age: "Ages 18+",
                focus: "Podium & Scouting",
                desc: "National league showcases, agent representation, sports psychologist prep, and international tournaments."
              }
            ].map((pathway, i) => (
              <div
                key={i}
                className="sports-card p-6 bg-[#F8F7F2] border-t-4 border-t-[#F4512C]"
              >
                <div className="font-display text-3xl font-extrabold text-[#737A74]">
                  {pathway.step}
                </div>
                <div className="mt-2 text-xs font-bold text-[#F4512C] uppercase tracking-wider">
                  {pathway.age}
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-[#171A18] mt-1">
                  {pathway.stage}
                </h3>
                <div className="text-xs font-semibold text-[#174A3B] mt-1">
                  {pathway.focus}
                </div>
                <p className="text-xs text-[#4E544F] mt-3 leading-relaxed">
                  {pathway.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleTrial}
              className="btn-primary text-xs py-3.5 px-8 w-full sm:w-auto justify-center text-center"
            >
              Start At Step 01: Book Evaluation
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isTrialOpen}
        type="TRIAL"
        title="Introductory Academy Assessment"
        sport="Multi-Sport"
        price="Free Evaluation"
        onClose={() => setIsTrialOpen(false)}
      />
    </div>
  );
}
