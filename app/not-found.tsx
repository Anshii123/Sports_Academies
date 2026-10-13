import Link from "next/link";
import { Flame, ArrowRight, Compass, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F7F2] px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-2xl p-8 sm:p-12 border border-[#E2E5DC] text-center shadow-xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FFF1ED] text-[#F4512C] flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="editorial-tag bg-[#FFF1ED] text-[#F4512C]">
            404 // Out of Bounds
          </span>
          <h1 className="editorial-title text-4xl sm:text-5xl font-black text-[#171A18] tracking-tight">
            Arena Not Found<span className="text-[#F4512C]">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4E544F] leading-relaxed max-w-md mx-auto pt-2">
            The training field, session, or resource you requested is unavailable or has been relocated to another pavilion of the Apex Sports Campus.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary text-xs py-3 px-6 uppercase font-bold flex items-center justify-center"
          >
            <span>Return to Home Pitch</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
          <Link
            href="/sports"
            className="btn-forest text-xs py-3 px-6 uppercase font-bold flex items-center justify-center"
          >
            <Compass className="w-4 h-4 mr-1.5 text-[#B8D94E]" />
            <span>View Sports Disciplines</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-[#ECEEE7] text-[11px] text-[#737A74]">
          Need immediate admissions assistance? Call our campus desk at{" "}
          <span className="font-bold text-[#171A18]">+1 (800) 458-APEX</span>
        </div>
      </div>
    </div>
  );
}
