"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  ArrowRight, 
  Flame, 
  Filter, 
  Users, 
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { EVENTS_DATA, AcademyEvent } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function EventsCampsPage() {
  const { requireAuth } = useAuth();
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
    title: string;
    sport: string;
    date?: string;
  }>({
    isOpen: false,
    type: "CAMP",
    title: "Event Registration",
    sport: "General",
  });

  const filters = ["ALL", "Tournament", "Camp", "Trial"];

  const filteredEvents = activeFilter === "ALL"
    ? EVENTS_DATA
    : EVENTS_DATA.filter((e) => e.type === activeFilter);

  const handleRegisterEvent = (event: AcademyEvent) => {
    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type: "CAMP",
        title: `Registration: ${event.title}`,
        sport: event.sport,
        date: event.date,
      });
    }, `Create your athlete account to register for ${event.title}`);
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER & EVENT COUNTDOWN */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                2026 CALENDAR & COMBINES
              </span>
              <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
                EVENTS, CAMPS & <br />
                <span className="text-[#174A3B]">TOURNAMENTS.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
                Test yourself in championship match conditions. Join international invitational cups, intensive multi-day clinics with pro mentors, and scout-attended combine days.
              </p>
            </div>

            {/* EVENT COUNTDOWN BANNER */}
            <div className="lg:col-span-5 bg-[#174A3B] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-[#0E3127]">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B8D94E] mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Next Major Academy Event
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                National Youth Invitational Cup
              </h3>
              <p className="text-xs text-white/80 mt-1">
                November 14-16, 2026 • FIFA-Pro Arena
              </p>

              {/* Countdown numbers */}
              <div className="mt-5 grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-lg">
                  <div className="font-display text-xl sm:text-2xl font-black text-[#B8D94E]">37</div>
                  <div className="text-[9px] uppercase font-bold text-white/70">Days</div>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-lg">
                  <div className="font-display text-xl sm:text-2xl font-black text-[#B8D94E]">14</div>
                  <div className="text-[9px] uppercase font-bold text-white/70">Hours</div>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-lg">
                  <div className="font-display text-xl sm:text-2xl font-black text-[#B8D94E]">28</div>
                  <div className="text-[9px] uppercase font-bold text-white/70">Mins</div>
                </div>
                <div className="p-2 sm:p-2.5 bg-white/10 rounded-lg">
                  <div className="font-display text-xl sm:text-2xl font-black text-[#B8D94E]">45</div>
                  <div className="text-[9px] uppercase font-bold text-white/70">Secs</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRegisterEvent(EVENTS_DATA[0])}
                className="mt-6 w-full btn-primary text-xs py-3 min-h-[44px] uppercase tracking-wider font-extrabold flex items-center justify-center"
              >
                Register Tournament Squad
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>

          </div>

          {/* FILTER TABS */}
          <div className="mt-10 flex flex-wrap items-center gap-2 pt-4 border-t border-[#E2E5DC]">
            <span className="text-xs font-bold uppercase text-[#737A74] mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Event Type:
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

      {/* 2. DYNAMIC EVENT CALENDAR DIRECTORY */}
      <section className="py-16 md:py-24 bg-[#F8F7F2]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="space-y-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="sports-card bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-[#E2E5DC] hover:border-[#174A3B] transition-all"
              >
                {/* Date & details */}
                <div className="space-y-3 lg:w-8/12">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B]">
                      {evt.sport} • {evt.type}
                    </span>
                    <span className="text-[10px] font-bold text-[#F4512C] bg-[#FFF1ED] px-2.5 py-0.5 rounded-full">
                      {evt.status}
                    </span>
                    <span className="text-[10px] font-bold text-[#737A74] bg-[#F8F7F2] border border-[#E2E5DC] px-2 py-0.5 rounded">
                      Age: {evt.ageGroup}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18] tracking-tight">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#737A74] pt-1">
                    <span className="flex items-center gap-1.5 font-semibold text-[#171A18]">
                      <Calendar className="w-3.5 h-3.5 text-[#F4512C]" />
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#174A3B]" />
                      {evt.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#174A3B]" />
                      {evt.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#171A18]">
                      <strong>Director:</strong> {evt.coach}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleRegisterEvent(evt)}
                    className="btn-primary text-xs py-3 px-6 min-h-[44px] uppercase tracking-wider font-extrabold flex items-center justify-center"
                  >
                    Register Athlete
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <p className="text-[10px] text-center text-[#737A74] font-medium">
                    Spaces allocated on confirmation
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModal.isOpen}
        type={bookingModal.type}
        title={bookingModal.title}
        sport={bookingModal.sport}
        defaultDate={bookingModal.date}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
      />
    </div>
  );
}
