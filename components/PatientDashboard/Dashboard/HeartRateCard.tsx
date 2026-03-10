"use client";

import { TrendingUp } from "lucide-react";

export default function HeartRateCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between h-full">
      <p className="text-[10px] font-semibold text-[#6A7282] uppercase tracking-wider">
        Heart Rate
      </p>

      <div className="flex items-end justify-between mt-2">
        <div>
          <p className="text-3xl font-bold text-[#101828]">72</p>
          <p className="text-sm text-[#6A7282]">bpm</p>
        </div>

        {/* Mini sparkline SVG */}
        <svg
          viewBox="0 0 80 30"
          className="w-20 h-8 text-[#0284C7]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="0,20 10,18 20,22 30,12 40,15 50,8 60,14 70,10 80,12" />
        </svg>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <TrendingUp className="w-3.5 h-3.5 text-[#16A34A]" />
        <span className="text-xs font-medium text-[#16A34A]">Normal</span>
      </div>
    </div>
  );
}
