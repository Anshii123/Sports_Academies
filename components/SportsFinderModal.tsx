"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { SPORTS_DATA } from "@/lib/data";

interface SportsFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSport: (sportSlug: string) => void;
}

export default function SportsFinderModal({
  isOpen,
  onClose,
  onSelectSport,
}: SportsFinderModalProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: "13-17",
    environment: "outdoor",
    style: "team",
    focus: "speed",
    intensity: "competitive",
  });
  const [result, setResult] = useState<typeof SPORTS_DATA[0] | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate sport recommendation
      let match = SPORTS_DATA[0]; // Football default
      if (answers.environment === "outdoor" && answers.style === "team") {
        match = answers.focus === "speed" ? SPORTS_DATA[0] : SPORTS_DATA[1]; // Football or Cricket
      } else if (answers.environment === "indoor" && answers.style === "team") {
        match = SPORTS_DATA[2]; // Basketball
      } else if (answers.style === "individual" && answers.environment === "outdoor") {
        match = answers.focus === "endurance" ? SPORTS_DATA[5] : SPORTS_DATA[3]; // Athletics or Tennis
      } else if (answers.style === "individual" && answers.environment === "indoor") {
        match = answers.focus === "reflexes" ? SPORTS_DATA[4] : SPORTS_DATA[6]; // Badminton or Swimming
      } else {
        match = SPORTS_DATA[7]; // Strength & Conditioning
      }
      setResult(match);
      setStep(5);
    }
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl md:max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E4E6DC] p-6 md:p-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F1F2ED] text-[#171A18] transition-colors"
          aria-label="Close sport finder modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 5 ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                Interactive Athlete Diagnostic
              </span>
              <span className="text-xs font-bold text-[#737A74]">
                Step {step} of 4
              </span>
            </div>

            <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18] tracking-tight">
              What Sport Is Right For You?
            </h3>
            <p className="text-xs text-[#4E544F] mt-1 mb-6">
              Answer 4 rapid athletic questions to identify your optimal academy pathway.
            </p>

            {/* Step 1: Age & Activity Preference */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18]">
                  1. What is your age group?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    { val: "6-12", label: "Grassroots (6 - 12 yrs)" },
                    { val: "13-17", label: "Junior Athlete (13 - 17 yrs)" },
                    { val: "18-23", label: "Collegiate / Pre-Pro (18 - 23 yrs)" },
                    { val: "24+", label: "Adult Competitive (24+ yrs)" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, age: item.val })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all min-h-[44px] flex items-center ${
                        answers.age === item.val
                          ? "border-[#F4512C] bg-[#FFF1ED] text-[#F4512C]"
                          : "border-[#E2E5DC] bg-[#F8F7F2] text-[#171A18] hover:border-[#174A3B]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Environment */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18]">
                  2. Preferred Training Environment
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    { val: "outdoor", label: "Outdoor Grass / Turf Arena", desc: "Open sky, grass pitches & sprint tracks" },
                    { val: "indoor", label: "Climate-Controlled Indoor Arena", desc: "Hardwood dome, racquet courts, pool" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, environment: item.val })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        answers.environment === item.val
                          ? "border-[#F4512C] bg-[#FFF1ED]"
                          : "border-[#E2E5DC] bg-[#F8F7F2] hover:border-[#174A3B]"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#171A18]">{item.label}</div>
                      <div className="text-[11px] text-[#737A74] mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Team vs Individual */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18]">
                  3. Team Dynamics or Solitary Focus?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    { val: "team", label: "Team Synergy", desc: "High communication, squad tactics, collective goals" },
                    { val: "individual", label: "Individual Duel / Precision", desc: "1-on-1 mastery, individual accountability" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, style: item.val })}
                      className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all min-h-[44px] ${
                        answers.style === item.val
                          ? "border-[#F4512C] bg-[#FFF1ED]"
                          : "border-[#E2E5DC] bg-[#F8F7F2] hover:border-[#174A3B]"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#171A18]">{item.label}</div>
                      <div className="text-[11px] text-[#737A74] mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Primary Athletic Attribute */}
            {step === 4 && (
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18]">
                  4. Your Primary Athletic Calling
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {[
                    { val: "speed", label: "Explosive Sprint Speed & Agility" },
                    { val: "tactics", label: "Tactical Geometry & Ball Delivery" },
                    { val: "endurance", label: "Relentless Aerobic Engine" },
                    { val: "reflexes", label: "Split-Second Kinetic Reflexes" },
                  ].map((item) => (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => setAnswers({ ...answers, focus: item.val })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all min-h-[44px] flex items-center ${
                        answers.focus === item.val
                          ? "border-[#F4512C] bg-[#FFF1ED] text-[#F4512C]"
                          : "border-[#E2E5DC] bg-[#F8F7F2] text-[#171A18] hover:border-[#174A3B]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E2E5DC]">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-xs font-bold text-[#4E544F] hover:text-[#171A18]"
                >
                  ← Back
                </button>
              ) : <div />}
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary py-2.5 px-6 rounded-lg text-xs uppercase font-bold tracking-wider"
              >
                {step === 4 ? "Calculate Match" : "Next Question"} →
              </button>
            </div>
          </div>
        ) : (
          result && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3F0] text-[#174A3B] text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#174A3B]" />
                Top Diagnostic Recommendation
              </div>

              <h3 className="font-display text-3xl font-extrabold uppercase text-[#171A18]">
                {result.name}
              </h3>
              <p className="text-sm font-semibold text-[#F4512C] mt-1">
                {result.tagline}
              </p>

              <p className="text-xs text-[#4E544F] mt-3 max-w-md mx-auto leading-relaxed">
                Based on your preference for {answers.environment} {answers.style} training and emphasis on {answers.focus}, our {result.name} will cultivate your highest ceiling.
              </p>

              <div className="mt-6 p-4 bg-[#F8F7F2] rounded-xl border border-[#E2E5DC] text-left text-xs grid grid-cols-2 gap-2 text-[#171A18]">
                <div><strong>Lead Coach:</strong> {result.leadCoach}</div>
                <div><strong>Frequency:</strong> {result.frequency}</div>
                <div><strong>Age Groups:</strong> {result.ageGroups}</div>
                <div><strong>Training Level:</strong> {result.trainingLevel}</div>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E8EAE2] space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectSport(result.slug);
                    }}
                    className="btn-primary flex-1 !py-3 !px-5 rounded-xl text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all !whitespace-normal sm:!whitespace-nowrap"
                  >
                    <span>Book Trial for {result.name}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <Link
                    href="/sports"
                    onClick={onClose}
                    className="btn-outline !py-3 !px-5 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center text-center hover:bg-[#F8F7F2] transition-colors shrink-0"
                  >
                    View All Programs
                  </Link>
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-[#737A74] hover:text-[#F4512C] rounded-lg transition-colors hover:bg-[#F8F7F2]"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#F4512C]" />
                    <span>Retake Diagnostic Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
