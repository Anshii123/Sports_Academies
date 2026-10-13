"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Flame,
  HelpCircle
} from "lucide-react";
import { MEMBERSHIP_PLANS, MembershipPlan } from "@/lib/data";
import { useAuth } from "@/context/AuthContext";
import BookingModal from "@/components/BookingModal";

export default function MembershipPlansPage() {
  const { requireAuth } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"MONTHLY" | "ANNUAL">("MONTHLY");

  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
    title: string;
    sport: string;
    price?: string;
  }>({
    isOpen: false,
    type: "MEMBERSHIP",
    title: "Performance Membership Plan",
    sport: "Multi-Sport",
  });

  const handleChooseMembership = (plan: MembershipPlan) => {
    const priceText = billingCycle === "ANNUAL"
      ? `$${plan.annualPriceMonthly}/mo (Billed Annually)`
      : `$${plan.monthlyPrice}/mo`;

    requireAuth(() => {
      setBookingModal({
        isOpen: true,
        type: "MEMBERSHIP",
        title: `Apex ${plan.name} Tier Membership`,
        sport: "All-Sport Academy Access",
        price: priceText,
      });
    }, `Create your athlete account to enroll in the ${plan.name} Membership.`);
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white text-center">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-4">
          <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
            ANNUAL & SEASONAL MEMBERSHIPS
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
            FIND THE RIGHT PROGRAM <br />
            <span className="text-[#174A3B]">FOR YOUR ATHLETE.</span>
          </h1>
          <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed max-w-2xl mx-auto">
            Transparent sports club dues covering certified coaching, Olympic training ground access, motion analysis sessions, and official federation kits.
          </p>

          {/* MONTHLY / ANNUAL TOGGLE */}
          <div className="pt-6 inline-flex items-center gap-3 bg-[#F8F7F2] p-1.5 rounded-full border border-[#E2E5DC]">
            <button
              type="button"
              onClick={() => setBillingCycle("MONTHLY")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                billingCycle === "MONTHLY"
                  ? "bg-[#174A3B] text-white shadow-sm"
                  : "text-[#4E544F] hover:text-[#171A18]"
              }`}
            >
              Monthly Dues
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("ANNUAL")}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                billingCycle === "ANNUAL"
                  ? "bg-[#174A3B] text-white shadow-sm"
                  : "text-[#4E544F] hover:text-[#171A18]"
              }`}
            >
              <span>Annual Commitment</span>
              <span className="bg-[#B8D94E] text-[#174A3B] text-[10px] font-black px-2 py-0.5 rounded-full">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MEMBERSHIP TIERS (SPORTS CLUB AESTHETIC) */}
      <section className="py-16 md:py-24 bg-[#F8F7F2]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MEMBERSHIP_PLANS.map((plan) => {
              const isRecommended = plan.recommended;
              const displayPrice = billingCycle === "ANNUAL" ? plan.annualPriceMonthly : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    isRecommended
                      ? "bg-white border-2 border-[#F4512C] shadow-2xl lg:scale-[1.02] z-10"
                      : "bg-white border border-[#E2E5DC] shadow-sm hover:shadow-md"
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F4512C] text-white text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                      Most Popular Competitive Track
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#174A3B] bg-[#EBF3F0] px-3 py-1 rounded-full">
                        {plan.level}
                      </span>
                      <span className="text-[11px] font-bold text-[#737A74]">
                        Club Tier {plan.id.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-black uppercase text-[#171A18] mt-4">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-[#4E544F] mt-1 leading-relaxed">
                      {plan.subtitle}
                    </p>

                    {/* Price display */}
                    <div className="mt-6 pt-6 border-t border-[#ECEEE7] flex items-baseline gap-1">
                      <span className="font-display text-4xl sm:text-5xl font-black text-[#171A18]">
                        ${displayPrice}
                      </span>
                      <span className="text-xs text-[#737A74] font-bold uppercase">
                        / month
                      </span>
                    </div>
                    {billingCycle === "ANNUAL" && (
                      <span className="text-[10px] font-bold text-[#174A3B] block mt-0.5">
                        Billed annually (${displayPrice * 12}/year)
                      </span>
                    )}

                    <div className="mt-4 p-3 bg-[#F8F7F2] rounded-xl text-xs font-semibold text-[#171A18] border border-[#E2E5DC]">
                      {plan.sessionsPerWeek}
                    </div>

                    {/* Inclusions */}
                    <div className="mt-6 space-y-3 text-xs">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#737A74] block">
                        Included Benefits:
                      </span>
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[#171A18]">
                          <Check className="w-4 h-4 text-[#174A3B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}

                      {plan.notIncluded.length > 0 && (
                        <div className="pt-2 border-t border-[#ECEEE7] space-y-2 text-[#737A74]">
                          {plan.notIncluded.map((notFeat, i) => (
                            <div key={i} className="flex items-start gap-2.5 opacity-60">
                              <X className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                              <span>{notFeat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA BUTTON */}
                  <div className="pt-8 mt-6 border-t border-[#ECEEE7]">
                    <button
                      type="button"
                      onClick={() => handleChooseMembership(plan)}
                      className={`w-full py-3.5 rounded-lg text-xs uppercase font-extrabold tracking-wider flex items-center justify-center transition-all ${
                        isRecommended
                          ? "btn-primary"
                          : "btn-forest"
                      }`}
                    >
                      Choose {plan.name}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                    <p className="text-[10px] text-center text-[#737A74] mt-2 font-medium">
                      No long-term lock-in • 14-day satisfaction guarantee
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MEMBERSHIP FAQ */}
      <section className="py-16 md:py-24 bg-white border-b border-[#E2E5DC]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="text-center mb-12">
            <span className="editorial-tag bg-[#EBF3F0] text-[#174A3B] mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-3xl font-extrabold uppercase text-[#171A18]">
              Membership Clarifications.
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {[
              {
                q: "Can athletes switch between sports after enrolling?",
                a: "Yes. Performance and Elite members are encouraged to cross-train across football, athletics, and tennis. Starter members can transfer their membership to another sport at the end of each monthly cycle."
              },
              {
                q: "What is included with the official Academy Kit bundle?",
                a: "Every member receives two match kits, one moisture-wicking training bib, shorts, socks, and a personalized water flask. Elite members also receive an academy track jacket and gym travel duffel."
              },
              {
                q: "What happens if an athlete is injured or travels for school?",
                a: "Memberships can be frozen for up to 60 days per calendar year with medical verification or academic travel notification without losing their academy squad placement."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC]">
                <h4 className="font-bold text-[#171A18] text-sm mb-1">
                  {faq.q}
                </h4>
                <p className="text-[#4E544F] leading-relaxed">
                  {faq.a}
                </p>
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
