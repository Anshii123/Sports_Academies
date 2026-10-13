"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Flame,
  MessageCircle,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ContactTrialPage() {
  const { user, requireAuth, openAuthModal } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    age: user?.age ? user.age.toString() : "16",
    sport: user?.preferredSport || "Football",
    experienceLevel: "Intermediate (1-3 yrs)",
    preferredTime: "04:30 PM - 06:30 PM (Evening Squad)",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    requireAuth(async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "TRIAL",
            title: `Trial Session for ${formData.sport}`,
            sport: formData.sport,
            date: new Date().toISOString().split("T")[0],
            timeSlot: formData.preferredTime,
            experienceLevel: formData.experienceLevel,
            notes: formData.message,
            details: { age: formData.age },
          }),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
          setErrorMsg(data.error || "Failed to book trial.");
        } else {
          setSuccess(true);
        }
      } catch {
        setLoading(false);
        setErrorMsg("Network error. Could not submit trial booking.");
      }
    }, "Create your athlete account to confirm your trial session.");
  };

  return (
    <div className="bg-[#F8F7F2] text-[#171A18] overflow-hidden">
      {/* 1. EDITORIAL HEADER */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-20 border-b border-[#E2E5DC] bg-white">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="max-w-3xl space-y-4">
            <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
              DIRECT ADMISSIONS & CAMPUS VISITS
            </span>
            <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#171A18] tracking-tight">
              BOOK A TRIAL & <br />
              <span className="text-[#174A3B]">CAMPUS TOUR.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#4E544F] leading-relaxed">
              Every prospective athlete receives a 90-minute complimentary assessment including sprint laser timing, stroke/ball work with a licensed coach, and a tour of our Olympic facilities.
            </p>
          </div>
        </div>
      </section>

      {/* 2. FORM & CONTACT DETAILS SPLIT */}
      <section className="py-16 md:py-24 bg-[#F8F7F2]">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* CONVERSION FORM COLUMN */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-[#E2E5DC] shadow-lg">
              {success ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-[#174A3B]" />
                  </div>
                  <span className="editorial-tag bg-[#F4F9E4] text-[#174A3B]">
                    Trial Confirmed
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#171A18]">
                    Welcome To Apex Academy!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E544F] max-w-md mx-auto leading-relaxed">
                    Your trial for <strong>{formData.sport}</strong> has been logged. An academy coordinator will review your schedule and kit requirements.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => router.push("/dashboard")}
                      className="btn-forest text-xs py-3 px-6 uppercase font-bold"
                    >
                      View in Member Dashboard →
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#F4512C]">
                      Step 01 / Registration
                    </span>
                    <h3 className="font-display text-2xl font-extrabold uppercase text-[#171A18] mt-0.5">
                      Ready To Start?
                    </h3>
                    <p className="text-xs text-[#737A74] mt-1">
                      Complete the form below to secure your trial slot.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                        Athlete Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jordan Miller"
                        className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="athlete@domain.com"
                        className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                        Athlete Age *
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="65"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                        Primary Sport Discipline *
                      </label>
                      <select
                        value={formData.sport}
                        onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                      >
                        <option value="Football">Football Academy</option>
                        <option value="Cricket">Cricket High Performance</option>
                        <option value="Basketball">Elite Basketball Club</option>
                        <option value="Tennis">Championship Tennis</option>
                        <option value="Badminton">Badminton Excellence</option>
                        <option value="Athletics">Track & Field Sprint Hub</option>
                        <option value="Swimming">Aquatic Speed & Stamina</option>
                        <option value="Strength">Strength & Conditioning Lab</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                        Current Experience Level *
                      </label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                      >
                        <option value="Beginner (Under 1 Year)">Beginner (Under 1 Year)</option>
                        <option value="Intermediate (1-3 yrs)">Intermediate (1-3 yrs)</option>
                        <option value="Advanced / High School (3-5 yrs)">Advanced / High School (3-5 yrs)</option>
                        <option value="Elite / State Tournament Circuit">Elite / State Tournament Circuit</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                      Preferred Training Time Slot *
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                    >
                      <option value="06:30 AM - 08:30 AM (Morning Conditioning)">06:30 AM - 08:30 AM (Morning Conditioning)</option>
                      <option value="04:30 PM - 06:30 PM (Evening Squad)">04:30 PM - 06:30 PM (Evening Squad)</option>
                      <option value="06:30 PM - 08:30 PM (Floodlit Tactical)">06:30 PM - 08:30 PM (Floodlit Tactical)</option>
                      <option value="Saturday Morning Match Session (08:00 AM)">Saturday Morning Match Session (08:00 AM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1">
                      Athletic Goals or Special Inquiries (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about past team experience, specific technical goals, or campus tour requests..."
                      className="w-full px-3.5 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:border-[#F4512C] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-3.5 uppercase font-extrabold tracking-wider text-xs flex items-center justify-center disabled:opacity-50"
                    >
                      {loading ? "Confirming Trial Slot..." : "Book My Trial Session"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#737A74] pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#174A3B]" />
                    Complimentary 90-Min Assessment • Full Kit Provided • Coach Feedback
                  </div>
                </form>
              )}
            </div>

            {/* CAMPUS DETAILS & INTERACTIVE MAP COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#174A3B] text-white p-8 rounded-2xl shadow-xl space-y-6">
                <div>
                  <span className="editorial-tag bg-white/10 text-[#B8D94E] mb-2">
                    ACADEMY CAMPUS
                  </span>
                  <h3 className="font-display text-2xl font-extrabold uppercase text-white">
                    Direct Contact & Campus Desk
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#F4512C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Main Flagship Campus:</strong>
                      <span className="text-white/80">100 Olympic Way, Sports City Complex, Gate 4</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#B8D94E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Admissions & Trial Hotline:</strong>
                      <span className="text-white/80">+1 (800) 458-APEX • Direct Academy Line</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#B8D94E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Official Admissions Email:</strong>
                      <span className="text-white/80">admissions@apex-sports.academy</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#F4512C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white">Campus Operating Hours:</strong>
                      <span className="text-white/80">Mon to Sat: 06:00 AM - 09:30 PM<br />Sunday: 07:00 AM - 06:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp button */}
                <div className="pt-2 border-t border-white/15">
                  <a
                    href="https://wa.me/18004582739"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 p-3 bg-[#25D366] text-white rounded-xl font-bold uppercase text-xs hover:bg-[#1EBE5D] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat with Admissions Coordinator on WhatsApp
                  </a>
                </div>
              </div>

              {/* CAMPUS PHOTOGRAPHY / MAP VISUAL */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E2E5DC] shadow-sm">
                <Image
                  src="/images/campus_aerial.jpg"
                  alt="Aerial view of Apex Sports Academy Campus"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs">
                    <span className="font-bold block">18-Acre Enclosed Sports City Grounds</span>
                    <span className="text-white/70 text-[10px]">Secure athlete parking, spectator pavilions, and cafe</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
