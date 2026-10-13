"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Award, 
  Medal, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Star 
} from "lucide-react";
import { ACHIEVEMENTS_DATA } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function AchievementsPage() {
  const { requireAuth } = useAuth();
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const handleStartJourney = () => {
    requireAuth(() => {
      setIsTrialOpen(true);
    }, "Create your athlete account to begin your championship journey.");
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              FOURTEEN YEARS OF PODIUM HONORS
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              MEDALS, TITLES & <br />
              <span className="text-[#174A3B]">WALL OF FAME.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
              Every trophy in our cabinet was earned through cold 6:00 AM track sessions, biomechanical precision, and unrelenting teamwork. Celebrate the athletes who rewrote regional and national records.
            </p>
          </div>

          {/* LARGE STATISTICS SECTION */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pt-8 border-t border-[#E2E5DC]">
            {ACHIEVEMENTS_DATA.stats.map((stat, i) => (
              <div key={i} className="p-3.5 sm:p-5 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] text-center">
                <div className="font-display text-2xl sm:text-4xl font-black text-[#F4512C]">
                  {stat.number}
                </div>
                <div className="text-[11px] sm:text-xs font-extrabold uppercase text-[#171A18] mt-1">
                  {stat.label}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#737A74] mt-0.5">
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ATHLETE WALL OF FAME (PROMINENT EDITORIAL PROFILES) */}
      <section className="py-16 md:py-24 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
                ACADEMY LEGENDS
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
                Athlete Wall of Fame.
              </h2>
            </div>
            <p className="text-xs text-[#737A74] max-w-sm">
              Alumni who advanced from grassroots foundation drills to professional franchise contracts and national teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACHIEVEMENTS_DATA.wallOfFame.map((athlete, idx) => (
              <div
                key={idx}
                className="sports-card bg-white overflow-hidden border border-[#E2E5DC] flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/4] overflow-hidden bg-black/5">
                    <Image
                      src={athlete.image}
                      alt={athlete.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#174A3B] text-[#B8D94E] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {athlete.sport.split(" ")[0]}
                    </div>
                  </div>

                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F4512C] block">
                      {athlete.sport}
                    </span>
                    <h3 className="font-display text-xl font-bold uppercase text-[#171A18] mt-0.5">
                      {athlete.name}
                    </h3>
                    <div className="mt-1 inline-block text-[11px] font-bold text-[#174A3B] bg-[#EBF3F0] px-2.5 py-0.5 rounded-full">
                      {athlete.badge}
                    </div>

                    <p className="text-xs text-[#4E544F] mt-3 italic leading-relaxed">
                      &quot;{athlete.quote}&quot;
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#ECEEE7] text-[10px] uppercase font-bold text-[#737A74]">
                  Official Academy Hall of Fame Inductee
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TROPHY CABINET (RECENT CHAMPIONSHIPS) */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
              RECENT CHAMPIONSHIP VICTORIES
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
              Trophies & Tournament Honors.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS_DATA.trophies.map((trophy, idx) => (
              <div
                key={idx}
                className="sports-card p-5 sm:p-8 bg-[#F8F7F2] border border-[#E2E5DC] flex flex-col sm:flex-row items-start gap-4 sm:gap-5"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF1ED] text-[#F4512C] flex items-center justify-center shrink-0">
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="text-xs font-bold uppercase text-[#174A3B]">
                      {trophy.category} • {trophy.year}
                    </span>
                    <span className="text-[10px] text-[#737A74] font-semibold">
                      {trophy.venue}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-[#171A18]">
                    {trophy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed pt-1">
                    {trophy.story}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button
              type="button"
              onClick={handleStartJourney}
              className="btn-primary text-xs py-3.5 px-6 sm:px-8 min-h-[44px] uppercase font-bold w-full sm:w-auto justify-center text-center"
            >
              Begin Your Championship Journey: Book Trial
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isTrialOpen}
        type="TRIAL"
        title="Championship Pathway Trial Evaluation"
        sport="Multi-Sport"
        price="Free Evaluation"
        onClose={() => setIsTrialOpen(false)}
      />
    </div>
  );
}
