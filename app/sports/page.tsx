"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  User, 
  Calendar, 
  Filter, 
  ShieldCheck,
  Flame,
  ChevronRight
} from "lucide-react";
import { SPORTS_DATA, SportItem } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function SportsProgramsPage() {
  const { requireAuth } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSport, setSelectedSport] = useState<SportItem | null>(null);
  
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
    title: string;
    sport: string;
    price?: string;
  }>({
    isOpen: false,
    type: "PROGRAM",
    title: "Academy Program Enrollment",
    sport: "Football",
  });

  const categories = ["All", "Field", "Court", "Racquet", "Water", "Performance"];

  const filteredSports = activeCategory === "All"
    ? SPORTS_DATA
    : SPORTS_DATA.filter((s) => s.category === activeCategory);

  const handleJoinProgram = (sport: SportItem) => {
    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type: "PROGRAM",
        title: `Join ${sport.name} High Performance Roster`,
        sport: sport.name,
      });
    }, `Create your athlete account to enroll in: ${sport.name}`);
  };

  const handleBookTrial = (sport: SportItem) => {
    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type: "TRIAL",
        title: `Complimentary Trial for ${sport.name}`,
        sport: sport.name,
        price: "Free Evaluation",
      });
    }, `Create your athlete account to book a trial for ${sport.name}`);
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              OFFICIAL TRAINING DISCIPLINES
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              SPORTS & <br />
              <span className="text-[#174A3B]">PROGRAMS.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
              Eight accredited Olympic and professional sport disciplines. Every curriculum follows international federation standards with individual biomechanical analysis, video classrooms, and certified mentorship.
            </p>
          </div>

          {/* FILTER PILLS */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-4 border-t border-[#E2E5DC]">
            <span className="text-xs font-bold uppercase text-[#737A74] mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by Arena:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? "bg-[#174A3B] text-white shadow-sm"
                    : "bg-[#F8F7F2] text-[#171A18] border border-[#E2E5DC] hover:border-[#174A3B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SPORTS DIRECTORY GRID */}
      <section className="py-16 md:py-24 bg-[#F8F7F2]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="space-y-12">
            {filteredSports.map((sport, index) => (
              <div
                key={sport.id}
                id={sport.slug}
                className="sports-card bg-white overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#E2E5DC] shadow-sm hover:shadow-lg transition-all"
              >
                {/* PHOTO COLUMN */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-black/5">
                  <Image
                    src={sport.image}
                    alt={`${sport.name} — ${sport.tagline} at APEX Sports Academy`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-[#171A18]/80 backdrop-blur-md text-white text-[11px] font-bold uppercase px-3 py-1 rounded">
                    {sport.category}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E2E5DC] text-xs">
                    <span className="text-[10px] font-bold text-[#F4512C] uppercase block">
                      Lead Coach
                    </span>
                    <span className="font-bold text-[#171A18]">
                      {sport.leadCoach}
                    </span>
                  </div>
                </div>

                {/* DETAILS COLUMN */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded bg-[#FFF1ED] text-[#F4512C]">
                        {sport.trainingLevel}
                      </span>
                      <span className="text-xs font-bold text-[#737A74]">
                        • {sport.ageGroups}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#171A18] tracking-tight">
                      {sport.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-[#174A3B] mt-1">
                      {sport.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-[#4E544F] mt-3 leading-relaxed">
                      {sport.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {sport.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[#171A18] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#174A3B] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Schedule block */}
                    <div className="mt-5 p-3.5 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] text-xs space-y-1">
                      <span className="font-bold text-[#171A18] uppercase tracking-wider block text-[10px] text-[#737A74]">
                        Weekly Schedule & Frequency:
                      </span>
                      <div className="text-[#171A18] font-semibold">{sport.frequency}</div>
                      {sport.schedule.map((sc, i) => (
                        <div key={i} className="text-[#4E544F] text-[11px]">• {sc}</div>
                      ))}
                    </div>
                  </div>

                  {/* CTAS */}
                  <div className="pt-4 border-t border-[#ECEEE7] flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleJoinProgram(sport)}
                      className="btn-primary text-xs py-2.5 px-6 min-h-[44px] uppercase tracking-wider"
                    >
                      Join Program
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleBookTrial(sport)}
                      className="btn-outline text-xs py-2.5 px-5 min-h-[44px] uppercase tracking-wider"
                    >
                      Book a Trial
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedSport(sport)}
                      className="text-xs font-bold text-[#174A3B] hover:text-[#F4512C] underline uppercase tracking-wider py-2 sm:ml-auto"
                    >
                      View Kit & Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAIL MODAL / DRAWER FOR KIT & SPECS */}
      {selectedSport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-[#E4E6DC]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-1">
                  Required Gear & Schedule
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18]">
                  {selectedSport.name} Specs
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSport(null)}
                className="text-xs font-bold text-[#737A74] hover:text-[#171A18]"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-bold uppercase text-[#171A18] mb-1.5">
                  Official Academy Equipment Required:
                </h4>
                <ul className="space-y-1 text-[#4E544F]">
                  {selectedSport.equipment.map((eq, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F4512C]" />
                      {eq}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold uppercase text-[#171A18] mb-1.5">
                  Weekly Training Timetable:
                </h4>
                <ul className="space-y-1 text-[#4E544F]">
                  {selectedSport.schedule.map((sc, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#174A3B]" />
                      {sc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ECEEE7] flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  const s = selectedSport;
                  setSelectedSport(null);
                  handleJoinProgram(s);
                }}
                className="w-full btn-primary text-xs py-2.5 uppercase font-bold justify-center text-center"
              >
                Join Program
              </button>
              <button
                type="button"
                onClick={() => setSelectedSport(null)}
                className="w-full sm:w-auto btn-outline text-xs py-2.5 px-5 uppercase font-bold justify-center text-center"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        type={bookingModal.type}
        title={bookingModal.title}
        sport={bookingModal.sport}
        price={bookingModal.price}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
      />
    </div>
  );
}
