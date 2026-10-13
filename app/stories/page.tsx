"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Quote, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  User, 
  ShieldCheck 
} from "lucide-react";
import { ATHLETE_STORIES_DATA, AthleteStory } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function AthleteStoriesPage() {
  const { requireAuth } = useAuth();
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  const handleStartStory = () => {
    requireAuth(() => {
      setIsTrialOpen(true);
    }, "Create your athlete account to start your own story.");
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              MAGAZINE EDITORIAL
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              ATHLETE <br />
              <span className="text-[#174A3B]">STORIES.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
              In-depth long-form journalism documenting the relentless pursuit, early morning discipline, and biomechanical breakthroughs behind our top athletes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAGAZINE STORIES (EDITORIAL ASYMMETRICAL LAYOUTS) */}
      <section className="py-16 md:py-24 bg-[#F8F7F2]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-16">
          {ATHLETE_STORIES_DATA.map((story, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                key={story.id}
                className="sports-card bg-white p-5 sm:p-10 md:p-12 border border-[#E2E5DC] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center"
              >
                {/* PHOTO COLUMN */}
                <div
                  className={`lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-[#E2E5DC] ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#171A18]/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 rounded">
                    {story.sport} • {story.ageGroup}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-xl border border-[#E2E5DC] text-xs">
                    <span className="font-bold text-[#171A18] block">{story.name}</span>
                    <span className="text-[10px] sm:text-[11px] text-[#F4512C] font-semibold">Joined Academy: {story.yearJoined}</span>
                  </div>
                </div>

                {/* STORY CONTENT COLUMN */}
                <div
                  className={`lg:col-span-6 space-y-4 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B]">
                    FEATURED ATHLETE STORY
                  </span>

                  <h2 className="font-display text-2xl sm:text-4xl font-extrabold uppercase text-[#171A18] tracking-tight leading-tight">
                    {story.headline}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold text-[#F4512C]">
                    {story.subheading}
                  </p>

                  {/* Starting Point & Journey */}
                  <div className="space-y-3 pt-2 text-xs sm:text-sm">
                    <div className="p-3.5 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
                      <span className="font-bold uppercase text-[10px] text-[#737A74] block">
                        The Starting Point:
                      </span>
                      <p className="text-[#171A18] mt-0.5 leading-relaxed">
                        {story.startingPoint}
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
                      <span className="font-bold uppercase text-[10px] text-[#737A74] block">
                        The Biomechanical Journey:
                      </span>
                      <p className="text-[#171A18] mt-0.5 leading-relaxed">
                        {story.journey}
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#EBF3F0] rounded-xl border border-[#C6DDD5]">
                      <span className="font-bold uppercase text-[10px] text-[#174A3B] block">
                        Breakthrough Achievement:
                      </span>
                      <p className="text-[#174A3B] font-bold mt-0.5 leading-relaxed">
                        {story.achievement}
                      </p>
                    </div>
                  </div>

                  {/* Quotes */}
                  <div className="pt-2 border-t border-[#ECEEE7] space-y-2 text-xs">
                    <div className="italic text-[#4E544F]">
                      <Quote className="w-3.5 h-3.5 text-[#F4512C] inline mr-1" />
                      &quot;{story.athleteQuote}&quot; — <strong>{story.name}</strong>
                    </div>
                    <div className="text-[11px] text-[#737A74]">
                      Coach Note: &quot;{story.coachQuote}&quot; — <em>{story.coachName}</em>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. YOUR STORY BEGINS CALLOUT */}
      <section className="py-20 bg-[#174A3B] text-white text-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-4">
          <span className="editorial-tag bg-white/10 text-[#B8D94E]">
            NEXT CHAPTER
          </span>
          <h2 className="editorial-title text-4xl sm:text-5xl font-black text-white">
            WRITE YOUR OWN <br />
            CHAMPIONSHIP CHAPTER.
          </h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto leading-relaxed">
            Every athlete on this page started with a simple trial evaluation. Take the first step today.
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={handleStartStory}
              className="btn-primary text-xs py-3 px-8 uppercase font-bold w-full sm:w-auto justify-center text-center"
            >
              Book Your Free Athlete Trial
              <ArrowRight className="w-4 h-4 ml-1 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isTrialOpen}
        type="TRIAL"
        title="Complimentary Trial & Assessment"
        sport="Multi-Sport"
        price="Free Evaluation"
        onClose={() => setIsTrialOpen(false)}
      />
    </div>
  );
}
