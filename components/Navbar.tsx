"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  ChevronDown, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Flame, 
  Trophy, 
  Calendar,
  Sparkles,
  Compass,
  ArrowRight,
  Shield,
  Layers,
  Building,
  Target
} from "lucide-react";
import BookingModal from "./BookingModal";
import SportsFinderModal from "./SportsFinderModal";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, openAuthModal, requireAuth } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [academyDropdownOpen, setAcademyDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Modals for Book Trial & Sports Finder
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isFinderOpen, setIsFinderOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change and handle body scroll lock
  useEffect(() => {
    setMobileMenuOpen(false);
    setAcademyDropdownOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleBookTrialClick = () => {
    requireAuth(() => {
      setIsTrialModalOpen(true);
    }, "Create your athlete account to book an elite trial session.");
  };

  const academyMenu = [
    { label: "About the Academy", href: "/about", desc: "Founding story, vision & 2012-2026 milestones", icon: Shield },
    { label: "Training Facilities", href: "/facilities", desc: "18-acre campus, Olympic turf & recovery suites", icon: Building },
    { label: "Achievements & Wall of Fame", href: "/achievements", desc: "45+ state trophies & pro selections", icon: Trophy },
    { label: "Athlete Stories", href: "/stories", desc: "Magazine case studies of state champions", icon: Sparkles },
    { label: "Contact & Campus Visits", href: "/contact", desc: "Direct admissions hotline & coordinator desk", icon: Target },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E5DC] py-2.5"
            : "bg-[#F8F7F2]/95 backdrop-blur-sm border-b border-[#ECEEE7] py-3.5"
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between">
          
          {/* EDITORIAL BRAND LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-md bg-[#174A3B] flex items-center justify-center text-white shadow-sm group-hover:bg-[#F4512C] transition-colors">
              <Flame className="w-4 h-4 text-[#B8D94E] group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base tracking-tight text-[#171A18] leading-none uppercase">
                APEX<span className="text-[#F4512C]">.</span>
              </span>
              <span className="text-[9px] font-extrabold tracking-widest text-[#737A74] uppercase mt-0.5">
                PERFORMANCE ACADEMY
              </span>
            </div>
          </Link>

          {/* DESKTOP EDITORIAL NAVIGATION (xl:flex avoids collision on 1024-1200px tablets) */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            <Link
              href="/"
              className={`px-2.5 2xl:px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                pathname === "/"
                  ? "text-[#F4512C] bg-[#FFF1ED]"
                  : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/sports"
              className={`px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                pathname === "/sports"
                  ? "text-[#F4512C] bg-[#FFF1ED]"
                  : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
              }`}
            >
              Sports
            </Link>

            <Link
              href="/coaching"
              className={`px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                pathname === "/coaching"
                  ? "text-[#F4512C] bg-[#FFF1ED]"
                  : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
              }`}
            >
              Coaching
            </Link>

            <Link
              href="/coaches"
              className={`px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                pathname === "/coaches"
                  ? "text-[#F4512C] bg-[#FFF1ED]"
                  : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
              }`}
            >
              Coaches
            </Link>

            <Link
              href="/membership"
              className={`px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                pathname === "/membership"
                  ? "text-[#F4512C] bg-[#FFF1ED]"
                  : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
              }`}
            >
              Membership
            </Link>

            <Link
              href="/events"
              className={`px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                pathname === "/events"
                  ? "text-[#F4512C] bg-[#FFF1ED]"
                  : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
              }`}
            >
              Events
            </Link>

            {/* ACADEMY DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAcademyDropdownOpen(!academyDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  academyDropdownOpen || pathname === "/about" || pathname === "/facilities" || pathname === "/achievements" || pathname === "/stories" || pathname === "/contact"
                    ? "text-[#F4512C] bg-[#FFF1ED]"
                    : "text-[#171A18] hover:text-[#F4512C] hover:bg-[#F1F2ED]"
                }`}
              >
                Academy
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${academyDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {academyDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E2E5DC] p-2 z-50 animate-fadeIn"
                  onMouseLeave={() => setAcademyDropdownOpen(false)}
                >
                  {academyMenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setAcademyDropdownOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F8F7F2] transition-colors group/item"
                      >
                        <div className="w-7 h-7 rounded-md bg-[#EBF3F0] text-[#174A3B] flex items-center justify-center shrink-0 group-hover/item:bg-[#F4512C] group-hover/item:text-white transition-colors">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#171A18] uppercase tracking-wide group-hover/item:text-[#F4512C] transition-colors">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-[#737A74] leading-tight mt-0.5">
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
            {/* Quick Sport Finder trigger */}
            <button
              type="button"
              onClick={() => setIsFinderOpen(true)}
              className="text-[11px] font-bold text-[#174A3B] hover:text-[#F4512C] flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-[#EBF3F0] transition-colors uppercase tracking-wider whitespace-nowrap shrink-0"
              title="Find the right sport for you"
            >
              <Compass className="w-3.5 h-3.5 text-[#F4512C] shrink-0" />
              <span>Sport Finder</span>
            </button>

            {user ? (
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3F0] border border-[#C5DDD3] hover:border-[#174A3B] transition-all shrink-0"
                >
                  <div className="w-6 h-6 rounded-full bg-[#174A3B] text-white flex items-center justify-center text-[10px] font-black uppercase shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-xs font-bold text-[#174A3B] max-w-[85px] sm:max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-[#174A3B] shrink-0" />
                </button>

                {userMenuOpen && (
                  <div 
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E2E5DC] py-2 z-50 animate-fadeIn"
                    onMouseLeave={() => setUserMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-[#ECEEE7]">
                      <p className="text-xs font-bold text-[#171A18] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#737A74] truncate">{user.email}</p>
                      <span className="mt-1 inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-[#FFF1ED] text-[#F4512C]">
                        {user.membership?.plan || "Starter"} Athlete
                      </span>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#171A18] hover:bg-[#F8F7F2] hover:text-[#174A3B]"
                    >
                      <User className="w-3.5 h-3.5 text-[#174A3B]" />
                      Member Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setUserMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#171A18] hover:text-[#F4512C] transition-colors whitespace-nowrap shrink-0"
              >
                Sign In
              </button>
            )}

            {/* Main Action: Book a Trial (Protected Service) */}
            <button
              type="button"
              onClick={handleBookTrialClick}
              className="btn-primary text-xs py-2 px-4 uppercase tracking-wider shadow-sm font-extrabold whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Book a Trial</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={handleBookTrialClick}
              className="btn-primary text-[11px] py-2 px-3.5 uppercase tracking-wider font-bold min-h-[40px]"
            >
              Trial
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#171A18] hover:bg-[#F1F2ED] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#E2E5DC] px-4 pt-4 pb-8 space-y-3 animate-fadeIn max-h-[85vh] overflow-y-auto">
            {user ? (
              <div className="p-3 mb-2 bg-[#F8F7F2] rounded-xl flex items-center justify-between border border-[#E2E5DC]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#174A3B] text-white flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#171A18]">{user.name}</div>
                    <div className="text-[10px] text-[#737A74]">{user.membership?.plan || "Starter"} Athlete</div>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold text-[#F4512C] uppercase py-2 px-3 min-h-[44px] flex items-center"
                >
                  Dashboard →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("login");
                  }}
                  className="btn-outline text-xs py-2.5 text-center justify-center uppercase font-bold min-h-[44px]"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal("register");
                  }}
                  className="btn-primary text-xs py-2.5 text-center justify-center uppercase font-bold min-h-[44px]"
                >
                  Register
                </button>
              </div>
            )}

            {/* FULL 11-PAGE NAVIGATION LIST IN INTENTIONAL MOBILE ORDER */}
            <div className="grid grid-cols-2 gap-1.5 py-1">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Sports", href: "/sports" },
                { label: "Coaching", href: "/coaching" },
                { label: "Coaches", href: "/coaches" },
                { label: "Facilities", href: "/facilities" },
                { label: "Membership", href: "/membership" },
                { label: "Events", href: "/events" },
                { label: "Achievements", href: "/achievements" },
                { label: "Stories", href: "/stories" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider min-h-[44px] flex items-center ${
                    pathname === link.href
                      ? "bg-[#FFF1ED] text-[#F4512C]"
                      : "text-[#171A18] hover:bg-[#F8F7F2]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* PROMINENT BOOK A TRIAL CTA IN MOBILE DRAWER */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookTrialClick();
                }}
                className="w-full btn-primary py-3 rounded-lg flex items-center justify-center font-extrabold tracking-wide uppercase text-xs min-h-[44px]"
              >
                <span>Book a Complimentary Trial</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>

            <div className="pt-1 border-t border-[#ECEEE7] space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsFinderOpen(true);
                }}
                className="w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold text-[#174A3B] bg-[#EBF3F0] flex items-center justify-between min-h-[44px]"
              >
                <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <Compass className="w-3.5 h-3.5 text-[#F4512C]" />
                  Launch Sport Finder Quiz
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {user && (
              <div className="pt-2 border-t border-[#ECEEE7]">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold text-red-600 bg-red-50 rounded-lg uppercase tracking-wider min-h-[44px]"
                >
                  Sign Out of Athlete Account
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Trial Booking Modal (Protected service) */}
      <BookingModal
        isOpen={isTrialModalOpen}
        type="TRIAL"
        title="Complimentary Athletic Assessment & Trial"
        sport="Football / Multi-Sport"
        price="Free Evaluation"
        onClose={() => setIsTrialModalOpen(false)}
      />

      {/* Sports Finder Diagnostic Modal */}
      <SportsFinderModal
        isOpen={isFinderOpen}
        onClose={() => setIsFinderOpen(false)}
        onSelectSport={() => {
          requireAuth(() => {
            setIsTrialModalOpen(true);
          }, "Create an athlete account to book your trial.");
        }}
      />
    </>
  );
}
