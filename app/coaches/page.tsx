"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Filter, 
  Quote, 
  X,
  Phone,
  Mail,
  ShieldCheck
} from "lucide-react";
import { COACHES_DATA, CoachItem } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function CoachesPage() {
  const { requireAuth } = useAuth();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [selectedCoach, setSelectedCoach] = useState<CoachItem | null>(null);

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
    title: string;
    sport: string;
  }>({
    isOpen: false,
    type: "COACH",
    title: "Coaching Consultation",
    sport: "General",
  });

  const filters = ["ALL", "FOOTBALL", "CRICKET", "TENNIS", "BASKETBALL", "FITNESS", "SWIMMING"];

  const filteredCoaches = activeFilter === "ALL"
    ? COACHES_DATA
    : COACHES_DATA.filter((c) => c.sport.toUpperCase() === activeFilter);

  const handleBookCoach = (coach: CoachItem) => {
    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type: "COACH",
        title: `1-on-1 Mentorship Session with ${coach.name}`,
        sport: coach.sport,
      });
    }, `Create your athlete account to book a private session with ${coach.name}`);
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              ACADEMY MENTORSHIP FACULTY
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              MASTER COACHES. <br />
              <span className="text-[#174A3B]">PROVEN CHAMPIONS.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
              Our coaching roster brings together UEFA Pro License holders, BCCI Level 3 coaches, former WTA players, and Ph.D. sports scientists dedicated to developing youth athletes with individual attention.
            </p>
          </div>

          {/* FILTER PILLS */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-4 border-t border-[#E2E5DC]">
            <span className="text-xs font-bold uppercase text-[#737A74] mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by Sport:
            </span>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeFilter === f
                    ? "bg-[#174A3B] text-white shadow-sm"
                    : "bg-[#F8F7F2] text-[#171A18] border border-[#E2E5DC] hover:border-[#174A3B]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. COACH DIRECTORY (EDITORIAL PROFILE CARDS) */}
      <section className="py-16 md:py-24 bg-[#F8F7F2]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCoaches.map((coach) => (
              <div
                key={coach.id}
                className="sports-card bg-white overflow-hidden flex flex-col justify-between border border-[#E2E5DC] group"
              >
                <div>
                  {/* Portrait with overlay badge */}
                  <div className="relative aspect-[4/4] overflow-hidden bg-black/5">
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#174A3B] text-[#B8D94E] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded">
                      {coach.sport}
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-2.5 rounded-lg border border-[#E2E5DC] text-[11px] font-bold text-[#171A18] flex items-center justify-between">
                      <span>{coach.experience}</span>
                      <span className="text-[#F4512C] uppercase">{coach.certifications[0]}</span>
                    </div>
                  </div>

                  {/* Profile info */}
                  <div className="p-6">
                    <h3 className="font-display text-xl font-extrabold uppercase text-[#171A18] group-hover:text-[#F4512C] transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#174A3B] mt-0.5">
                      {coach.role}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#ECEEE7] text-xs space-y-2">
                      <div>
                        <span className="font-bold uppercase text-[10px] text-[#737A74] block">
                          Specialization:
                        </span>
                        <p className="text-[#171A18] font-medium leading-relaxed">
                          {coach.specialization}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold uppercase text-[10px] text-[#737A74] block">
                          Key Achievements:
                        </span>
                        <p className="text-[#4E544F] text-[11px] leading-relaxed">
                          {coach.achievements}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-[#F8F7F2] rounded-lg border border-[#E2E5DC] text-[11px] italic text-[#4E544F]">
                      &quot;{coach.quote}&quot;
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-6 pt-0 border-t border-[#ECEEE7] mt-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCoach(coach)}
                    className="text-xs font-bold uppercase tracking-wider text-[#174A3B] hover:text-[#F4512C] py-2"
                  >
                    View Full Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBookCoach(coach)}
                    className="btn-primary text-xs py-2.5 px-4 min-h-[44px]"
                  >
                    Book 1-on-1
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DETAILED COACH PROFILE MODAL */}
      {selectedCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 md:p-8 shadow-2xl border border-[#E4E6DC] max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedCoach(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F1F2ED] text-[#171A18]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative w-32 h-44 sm:w-36 sm:h-48 rounded-xl overflow-hidden shrink-0 border border-[#E2E5DC] mx-auto sm:mx-0">
                <Image
                  src={selectedCoach.image}
                  alt={selectedCoach.name}
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              <div className="space-y-2 flex-1">
                <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B]">
                  {selectedCoach.sport} MASTER COACH
                </span>
                <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18]">
                  {selectedCoach.name}
                </h3>
                <p className="text-xs font-bold text-[#F4512C]">
                  {selectedCoach.role}
                </p>
                <p className="text-xs text-[#4E544F] leading-relaxed pt-1">
                  {selectedCoach.bio}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ECEEE7] space-y-4 text-xs">
              <div>
                <h4 className="font-bold uppercase text-[#171A18] mb-1.5">
                  Certifications & Diplomas:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCoach.certifications.map((c, i) => (
                    <span key={i} className="px-2.5 py-1 bg-[#F8F7F2] border border-[#E2E5DC] rounded text-[#171A18] font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold uppercase text-[#171A18] mb-1">
                  Tactical & Technical Specialization:
                </h4>
                <p className="text-[#4E544F] leading-relaxed">
                  {selectedCoach.specialization}
                </p>
              </div>

              <div>
                <h4 className="font-bold uppercase text-[#171A18] mb-1">
                  Career Coaching Achievements:
                </h4>
                <p className="text-[#4E544F] leading-relaxed">
                  {selectedCoach.achievements}
                </p>
              </div>

              <div className="p-4 bg-[#FFF1ED] rounded-xl border border-[#FADCD5] text-xs text-[#DC3E1B] italic">
                &quot;{selectedCoach.quote}&quot;
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ECEEE7] flex gap-3">
              <button
                type="button"
                onClick={() => {
                  const c = selectedCoach;
                  setSelectedCoach(null);
                  handleBookCoach(c);
                }}
                className="w-full btn-primary text-xs py-3 uppercase font-bold flex items-center justify-center"
              >
                Book 1-on-1 Consultation Session
                <ArrowRight className="w-4 h-4 ml-1" />
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
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
      />
    </div>
  );
}
