"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flame, ArrowRight, MapPin, Phone, Mail, Clock, Shield, CheckCircle } from "lucide-react";
import { SPORTS_DATA } from "@/lib/data";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-[#171A18] text-[#F8F7F2] pt-16 pb-12 border-t border-[#2A2F2C]">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* TOP ACCREDITATION & NEWSLETTER BANNER */}
        <div className="bg-[#242A27] rounded-2xl p-8 mb-16 border border-[#333C37] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="editorial-tag bg-[#174A3B] text-[#B8D94E] mb-3">
              Official Youth Sports Federation Partner
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              Stay Ahead of Academy Trials & Fixtures.
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-2 max-w-xl leading-relaxed">
              Get weekly training insight digests from our UEFA and BCCI certified coaching directors, upcoming open combine dates, and athlete tournament rosters.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="p-4 bg-[#174A3B] text-[#B8D94E] rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="w-5 h-5 text-[#B8D94E]" />
                Subscribed to the Apex Athletic Digest!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter athlete or parent email..."
                  className="bg-[#171A18] border border-[#3E4741] px-4 py-3 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F4512C] flex-1"
                />
                <button
                  type="submit"
                  className="btn-primary text-xs py-3 px-6 rounded-lg uppercase tracking-wider font-bold shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* MAIN COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-[#2A2F2C]">
          {/* Col 1: Brand & Contact Info */}
          <div className="sm:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-lg bg-[#174A3B] flex items-center justify-center text-white font-black tracking-tighter group-hover:bg-[#F4512C] transition-colors">
                <Flame className="w-5 h-5 text-[#B8D94E]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg tracking-tight text-white leading-none uppercase">
                  APEX<span className="text-[#F4512C]">.</span> ACADEMY
                </span>
                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase">
                  Performance & Sports Club
                </span>
              </div>
            </Link>

            <p className="text-white/60 text-xs leading-relaxed max-w-sm mb-6">
              A private, high-performance athletic development institution established in 2012. Providing youth and aspiring professional athletes with world-class biomechanics, Olympic training facilities, and accredited mentorship.
            </p>

            <div className="space-y-2.5 text-xs text-white/70">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F4512C] shrink-0 mt-0.5" />
                <span>Apex Sports Campus, 100 Olympic Way, Sports City Complex</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B8D94E] shrink-0" />
                <span>+1 (800) 458-APEX • Direct Academy Line</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B8D94E] shrink-0" />
                <span>admissions@apex-sports.academy</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#F4512C] shrink-0" />
                <span>Mon - Sat: 06:00 AM - 09:30 PM • Sun: 07:00 AM - 06:00 PM</span>
              </div>
            </div>
          </div>

          {/* Col 2: Sports Disciplines */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#B8D94E] mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              {SPORTS_DATA.map((sport) => (
                <li key={sport.id}>
                  <Link
                    href={`/sports#${sport.slug}`}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {sport.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academy & Pathways */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#B8D94E] mb-4">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Our Story & Milestones</Link>
              </li>
              <li>
                <Link href="/coaching" className="hover:text-white transition-colors">Training Methodology</Link>
              </li>
              <li>
                <Link href="/coaches" className="hover:text-white transition-colors">Director & Coach Directory</Link>
              </li>
              <li>
                <Link href="/facilities" className="hover:text-white transition-colors">Campus & Facilities</Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-white transition-colors">Athlete Membership Plans</Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-white transition-colors">Wall of Fame & Titles</Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-white transition-colors">Athlete Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Member Services & Legal */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-[#B8D94E] mb-4">
              Services & Portal
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors font-semibold text-white">Member Dashboard</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition-colors">Upcoming Camps & Trials</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Campus Tour Booking</Link>
              </li>
              <li>
                <Link href="/about#safety" className="hover:text-white transition-colors">Safeguarding & Concussion Protocol</Link>
              </li>
              <li>
                <Link href="/about#terms" className="hover:text-white transition-colors">Athlete Code of Conduct</Link>
              </li>
              <li>
                <Link href="/about#privacy" className="hover:text-white transition-colors">Privacy & Data Governance</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM ACCREDITATION STRIP */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white/70">
              <Shield className="w-3.5 h-3.5 text-[#174A3B]" />
              Accredited by National Sports Development Council
            </span>
            <span>•</span>
            <span>ISO 9001:2015 Sports Facility Standard</span>
            <span>•</span>
            <span>BCCI / UEFA / ITF Certified Staff</span>
          </div>

          <div className="flex items-center gap-6">
            <span>© 2026 Apex Sports Academy. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
