"use client";

import Link from "next/link";
import { Home, ArrowLeft, HeartPulse } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Illustration */}
        <div className="relative mx-auto w-56 h-56 mb-8">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-[#F0F9FF] border border-[#BAE6FD]" />
          {/* Inner decorative ring */}
          <div className="absolute inset-6 rounded-full bg-white border-2 border-dashed border-[#BAE6FD]" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <HeartPulse className="w-16 h-16 text-[#0284C7]" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FEF2F2] border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-[#EF4444] text-xs font-bold">?</span>
              </div>
            </div>
          </div>
          {/* Floating dots */}
          <div className="absolute top-4 left-8 w-3 h-3 rounded-full bg-[#BAE6FD] animate-pulse" />
          <div className="absolute bottom-8 right-6 w-2 h-2 rounded-full bg-[#7DD3FC] animate-pulse delay-300" />
          <div className="absolute top-12 right-4 w-2.5 h-2.5 rounded-full bg-[#E0F2FE] animate-pulse delay-150" />
        </div>

        {/* 404 text */}
        <h1 className="text-7xl font-black text-[#0284C7] tracking-tight mb-3">
          404
        </h1>
        <h2 className="text-2xl font-bold text-[#101828] mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-[#6A7282] leading-relaxed max-w-sm mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 bg-white text-sm font-semibold text-[#4A5565] rounded-xl hover:bg-gray-50 transition cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}
