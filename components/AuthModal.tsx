"use client";

import React, { useState } from "react";
import SafeImage from "./SafeImage";
import { useAuth } from "@/context/AuthContext";
import { X, Lock, Mail, User, Phone, Trophy, ArrowRight, AlertCircle, CheckCircle2, Zap } from "lucide-react";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authModalTab, authIntentText, login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register">(authModalTab);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAge, setRegAge] = useState("16");
  const [regSport, setRegSport] = useState("Football");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  // Synchronize initial tab with context state when opening
  React.useEffect(() => {
    setTab(authModalTab);
    setErrorMsg("");
    setSuccessMsg("");
  }, [authModalTab, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleOneClickDemoLogin = async () => {
    setErrorMsg("");
    setLoading(true);
    setLoginEmail("demo@apexacademy.com");
    setLoginPassword("demo123");
    const res = await login("demo@apexacademy.com", "demo123");
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Demo login failed.");
    } else {
      setSuccessMsg("Welcome Alex Morgan! Signed into Athlete Portal.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await login(loginEmail, loginPassword);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(res.error || "Login failed. Please check your credentials.");
    } else {
      setSuccessMsg("Welcome back! Resuming your action...");
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match. Please verify.");
      return;
    }

    setLoading(true);
    const res = await register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      age: parseInt(regAge, 10) || 18,
      preferredSport: regSport,
      password: regPassword,
    });
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Registration failed. Please check form details.");
    } else {
      setSuccessMsg("Account created! Welcome to Apex Academy.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[#E4E6DC] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-[#F1F2ED] text-[#171A18] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: Split Editorial Sports Visual */}
        <div className="relative md:w-5/12 bg-[#174A3B] text-white p-8 flex flex-col justify-between overflow-hidden min-h-[220px] md:min-h-full">
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <SafeImage
              src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=1000&auto=format&fit=crop"
              fallbackSrc="/images/hero/hero_athlete_motion.jpg"
              alt="Athletes training at Apex Academy"
              fill
              sizes="(max-width: 768px) 100vw, 384px"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-[#B8D94E] mb-4">
              <Trophy className="w-3.5 h-3.5 text-[#B8D94E]" />
              Official Athlete Portal
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-tight">
              Your Next Level Starts Here.
            </h3>
            <p className="text-white/80 text-xs md:text-sm mt-2 font-normal leading-relaxed">
              Log in or create your athlete membership to access certified coaching, trial bookings, and high-performance programs.
            </p>
          </div>

          <div className="relative z-10 pt-6 mt-auto border-t border-white/15">
            <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/15">
              <span className="text-[11px] font-semibold text-[#B8D94E] block uppercase tracking-wider">
                Action Required:
              </span>
              <p className="text-xs text-white/90 font-medium mt-0.5">
                {authIntentText}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Clean Light Form Area */}
        <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto bg-white">
          {/* Tabs */}
          <div className="flex border-b border-[#E2E5DC] mb-6">
            <button
              type="button"
              onClick={() => { setTab("login"); setErrorMsg(""); }}
              className={`pb-3 text-sm font-bold tracking-wide uppercase transition-all relative ${
                tab === "login"
                  ? "text-[#F4512C] border-b-2 border-[#F4512C]"
                  : "text-[#4E544F] hover:text-[#171A18]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setTab("register"); setErrorMsg(""); }}
              className={`ml-8 pb-3 text-sm font-bold tracking-wide uppercase transition-all relative ${
                tab === "register"
                  ? "text-[#F4512C] border-b-2 border-[#F4512C]"
                  : "text-[#4E544F] hover:text-[#171A18]"
              }`}
            >
              Create Athlete Profile
            </button>
          </div>

          {/* Feedback messages */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {tab === "login" ? (
            <div className="space-y-4">
              {/* INSTANT DEMO ATHLETE SHORTCUT */}
              <div className="p-3.5 bg-[#F4F9E4] border border-[#CDE594] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-black uppercase text-[#174A3B]">
                    <Zap className="w-3.5 h-3.5 text-[#F4512C] fill-[#F4512C]" />
                    <span>Demo Athlete Profile</span>
                  </div>
                  <p className="text-[11px] text-[#4E544F] font-mono mt-0.5">
                    demo@apexacademy.com • demo123
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail("demo@apexacademy.com");
                      setLoginPassword("demo123");
                    }}
                    className="px-2.5 py-1.5 text-[11px] font-bold text-[#174A3B] hover:text-[#F4512C] uppercase transition-colors"
                  >
                    Auto-Fill
                  </button>
                  <button
                    type="button"
                    onClick={handleOneClickDemoLogin}
                    disabled={loading}
                    className="px-3.5 py-1.5 bg-[#174A3B] hover:bg-[#12382c] text-white text-xs font-extrabold uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 shrink-0"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#B8D94E] fill-[#B8D94E]" />
                    <span>Instant Login</span>
                  </button>
                </div>
              </div>

              <div className="relative flex items-center justify-center my-2">
                <div className="border-t border-[#E2E5DC] w-full" />
                <span className="bg-white px-3 text-[10px] font-bold text-[#737A74] uppercase tracking-wider absolute">
                  Or Sign In Manually
                </span>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737A74]" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="demo@apexacademy.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-sm text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#171A18]">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737A74]" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-sm text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 btn-primary py-3 rounded-lg flex items-center justify-center font-bold tracking-wide uppercase text-sm disabled:opacity-50"
                >
                  {loading ? "Authenticating..." : "Sign In & Continue"}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="pt-2 text-center text-xs text-[#4E544F]">
                  New athlete?{" "}
                  <button
                    type="button"
                    onClick={() => { setTab("register"); setErrorMsg(""); }}
                    className="font-bold text-[#F4512C] hover:underline"
                  >
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Athlete Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737A74]" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Phone / Contact *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737A74]" />
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-9 pr-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737A74]" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="athlete@domain.com"
                    className="w-full pl-9 pr-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Athlete Age *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="65"
                    required
                    value={regAge}
                    onChange={(e) => setRegAge(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Primary Sport *
                  </label>
                  <select
                    value={regSport}
                    onChange={(e) => setRegSport(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                  >
                    <option value="Football">Football</option>
                    <option value="Cricket">Cricket</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Athletics">Athletics</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Strength">Strength & Conditioning</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#171A18] mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F7F2] border border-[#E2E5DC] rounded-lg text-xs text-[#171A18] focus:outline-none focus:border-[#F4512C] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 btn-primary py-2.5 rounded-lg flex items-center justify-center font-bold tracking-wide uppercase text-xs disabled:opacity-50"
              >
                {loading ? "Creating Profile..." : "Register & Complete Action"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="pt-1 text-center text-xs text-[#4E544F]">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => { setTab("login"); setErrorMsg(""); }}
                  className="font-bold text-[#F4512C] hover:underline"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
