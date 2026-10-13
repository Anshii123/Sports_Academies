"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  MapPin, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Building
} from "lucide-react";
import { FACILITIES_DATA, FacilityItem } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function FacilitiesPage() {
  const { requireAuth } = useAuth();
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem>(FACILITIES_DATA[0]);

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
    title: string;
    sport: string;
    price?: string;
  }>({
    isOpen: false,
    type: "FACILITY",
    title: "Facility Slot Reservation",
    sport: "Multi-Sport",
  });

  const handleReserveFacility = (facility: FacilityItem) => {
    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type: "FACILITY",
        title: `Reserve Slot: ${facility.name}`,
        sport: facility.category,
        price: "Included with Membership or Day Pass",
      });
    }, `Create your athlete account to reserve: ${facility.name}`);
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              18-ACRE OLYMPIC INFRASTRUCTURE
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              BUILT FOR BETTER <br />
              <span className="text-[#174A3B]">PERFORMANCE.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
              International tournament surfaces, precision laser tracking, and medical-grade recovery suites engineered to let athletes push limits without fear of joint wear or bad-weather cancellation.
            </p>
          </div>

          {/* FACILITY STATS BANNER */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#E2E5DC]">
            <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
              <div className="font-display text-3xl font-extrabold text-[#174A3B]">18 Acres</div>
              <div className="text-[11px] font-bold uppercase text-[#737A74] mt-0.5">Enclosed Campus</div>
            </div>
            <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
              <div className="font-display text-3xl font-extrabold text-[#F4512C]">100%</div>
              <div className="text-[11px] font-bold uppercase text-[#737A74] mt-0.5">Climate & Rain Proof</div>
            </div>
            <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
              <div className="font-display text-3xl font-extrabold text-[#174A3B]">1200 Lux</div>
              <div className="text-[11px] font-bold uppercase text-[#737A74] mt-0.5">LED Stadium Lights</div>
            </div>
            <div className="p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
              <div className="font-display text-3xl font-extrabold text-[#F4512C]">8°C & 40°C</div>
              <div className="text-[11px] font-bold uppercase text-[#737A74] mt-0.5">Hydro Plunge Suite</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE FEATURED ARENA SPOTLIGHT */}
      <section className="py-16 md:py-24 bg-[#F8F7F2] border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Visual Screen with Spec Callouts */}
            <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black/5">
              <Image
                src={selectedFacility.image}
                alt={selectedFacility.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-all duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#171A18]/85 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase">
                {selectedFacility.category}
              </div>
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-[#E2E5DC] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#F4512C] block">Capacity</span>
                  <span className="text-xs font-bold text-[#171A18]">{selectedFacility.capacity}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleReserveFacility(selectedFacility)}
                  className="btn-primary text-xs py-2 px-3.5 sm:px-4 min-h-[40px]"
                >
                  Reserve Facility Slot
                </button>
              </div>
            </div>

            {/* Selector column */}
            <div className="lg:col-span-5 space-y-4">
              <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B]">
                CAMPUS SPOTLIGHT
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#171A18] tracking-tight">
                {selectedFacility.name}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#F4512C]">
                {selectedFacility.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed">
                {selectedFacility.description}
              </p>

              {/* Technical Specifications */}
              <div className="p-4 bg-white rounded-xl border border-[#E2E5DC] text-xs space-y-1.5">
                <span className="font-bold uppercase tracking-wider text-[#171A18] block text-[10px]">
                  Technical Specs:
                </span>
                {selectedFacility.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-[#4E544F]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#174A3B] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Quick switch tabs */}
              <div className="pt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#737A74] block mb-2">
                  Select Arena to Inspect:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {FACILITIES_DATA.slice(0, 4).map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFacility(f)}
                      className={`p-2.5 rounded-lg border text-left text-[11px] font-bold uppercase tracking-wider transition-all ${
                        selectedFacility.id === f.id
                          ? "border-[#F4512C] bg-[#FFF1ED] text-[#F4512C]"
                          : "border-[#E2E5DC] bg-white text-[#171A18] hover:border-[#174A3B]"
                      }`}
                    >
                      {f.name.split(" ")[0]} Arena
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FULL CAMPUS GALLERY DIRECTORY */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C] mb-2">
              ALL SEVEN ARENAS
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#171A18] tracking-tight">
              Tour Every Training Ground.
            </h2>
            <p className="text-xs sm:text-sm text-[#4E544F] mt-2">
              Clean, bright, hygienic locker rooms, video analysis classrooms, and tournament-approved turf.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES_DATA.map((facility) => (
              <div
                key={facility.id}
                className="sports-card bg-[#F8F7F2] overflow-hidden flex flex-col justify-between border border-[#E2E5DC] group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                    <Image
                      src={facility.image}
                      alt={facility.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#174A3B] text-[#B8D94E] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                      {facility.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display text-lg font-extrabold uppercase text-[#171A18]">
                      {facility.name}
                    </h3>
                    <p className="text-xs text-[#F4512C] font-semibold mt-0.5">
                      {facility.tagline}
                    </p>
                    <p className="text-xs text-[#4E544F] mt-3 leading-relaxed line-clamp-3">
                      {facility.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-[#E2E5DC] space-y-1">
                      <span className="text-[10px] font-bold text-[#737A74] uppercase block">
                        Features:
                      </span>
                      {facility.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="text-[11px] text-[#171A18] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#174A3B]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#ECEEE7] mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#737A74]">
                    {facility.capacity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleReserveFacility(facility)}
                    className="btn-forest text-xs py-2 px-4"
                  >
                    Reserve Slot
                  </button>
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
        price={bookingModal.price}
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })}
      />
    </div>
  );
}
