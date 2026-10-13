"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { X, Calendar, Clock, Trophy, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";

export interface BookingModalData {
  isOpen: boolean;
  type: "TRIAL" | "CAMP" | "PROGRAM" | "MEMBERSHIP" | "FACILITY" | "COACH";
  title: string;
  sport: string;
  defaultDate?: string;
  price?: string;
  onClose: () => void;
}

export default function BookingModal({
  isOpen,
  type,
  title,
  sport,
  defaultDate,
  price,
  onClose,
}: BookingModalData) {
  const { user } = useAuth();
  const router = useRouter();

  const [date, setDate] = useState(defaultDate || "2026-10-20");
  const [timeSlot, setTimeSlot] = useState("04:30 PM - 06:30 PM (Evening Squad)");
  const [experienceLevel, setExperienceLevel] = useState("Intermediate / Club Level");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          title,
          sport,
          date,
          timeSlot,
          experienceLevel,
          notes,
          details: { price },
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to confirm reservation.");
      } else {
        setConfirmed(true);
      }
    } catch {
      setLoading(false);
      setErrorMsg("Network error. Could not submit reservation.");
    }
  };

  const handleDone = () => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto border border-[#E4E6DC] p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F1F2ED] text-[#171A18] transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-[#EBF3F0] text-[#174A3B] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-[#174A3B]" />
            </div>
            <span className="editorial-tag bg-[#F4F9E4] text-[#174A3B] mb-2 inline-block">
              Confirmed & Logged
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-[#171A18] mt-1">
              Booking Confirmed!
            </h3>
            <p className="text-sm text-[#4E544F] mt-2 max-w-sm mx-auto">
              You are officially registered for <strong>{title}</strong>. An academy coordinator will review your schedule and kit requirements.
            </p>

            <div className="mt-6 p-4 bg-[#F8F7F2] rounded-xl text-left border border-[#E2E5DC] text-xs space-y-1.5 text-[#171A18]">
              <div><strong>Athlete:</strong> {user?.name}</div>
              <div><strong>Service:</strong> {title} ({type})</div>
              <div><strong>Sport:</strong> {sport}</div>
              <div><strong>Date & Time:</strong> {date} • {timeSlot}</div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleDone}
                className="w-full btn-forest py-3 rounded-lg text-sm uppercase font-bold flex items-center justify-center"
              >
                Go to Member Dashboard
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
                {type} REGISTRATION
              </span>
              {price && (
                <span className="text-xs font-bold text-[#174A3B] bg-[#EBF3F0] px-2.5 py-0.5 rounded-full">
                  {price}
                </span>
              )}
            </div>

            <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18] tracking-tight">
              {title}
            </h3>
            <p className="text-xs text-[#4E544F] mt-1">
              Logged in as <span className="font-semibold text-[#171A18]">{user?.name}</span> ({user?.email})
            </p>

            {errorMsg && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Scheduled Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737A74]" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Sport Discipline
                  </label>
                  <div className="relative">
                    <Trophy className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737A74]" />
                    <input
                      type="text"
                      readOnly
                      value={sport}
                      className="w-full pl-9 pr-3 py-2 bg-[#F1F2ED] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737A74]" />
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:outline-none"
                  >
                    <option value="06:30 AM - 08:30 AM (Morning Conditioning)">06:30 AM - 08:30 AM (Morning Conditioning)</option>
                    <option value="04:30 PM - 06:30 PM (Evening Squad)">04:30 PM - 06:30 PM (Evening Squad)</option>
                    <option value="06:30 PM - 08:30 PM (Floodlit Tactical)">06:30 PM - 08:30 PM (Floodlit Tactical)</option>
                    <option value="Weekend Match Session (08:00 AM)">Weekend Match Session (08:00 AM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                  Athlete Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:outline-none"
                >
                  <option value="Beginner / Grassroots (Under 1 Year)">Beginner / Grassroots (Under 1 Year)</option>
                  <option value="Intermediate / Club Level (1 - 3 Years)">Intermediate / Club Level (1 - 3 Years)</option>
                  <option value="Advanced / High School Team (3 - 5 Years)">Advanced / High School Team (3 - 5 Years)</option>
                  <option value="Elite / State Tournament Circuit">Elite / State Tournament Circuit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                  Special Athletic Goals or Injury History
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Left-footed winger looking for explosive acceleration. No past knee injuries."
                  className="w-full px-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 rounded-lg text-sm uppercase font-bold tracking-wide flex items-center justify-center disabled:opacity-50"
                >
                  {loading ? "Confirming Slot..." : "Confirm Athlete Reservation"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737A74]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#174A3B]" />
                100% Protected Guarantee • Coach Evaluated • Official Kit Provided
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
