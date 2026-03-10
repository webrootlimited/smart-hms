"use client";

import { useEffect } from "react";
import { RefreshCw, Home, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Illustration */}
        <div className="relative mx-auto w-56 h-56 mb-8">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full bg-[#FEF2F2] border border-[#FECACA]" />
          {/* Inner ring */}
          <div className="absolute inset-6 rounded-full bg-white border-2 border-dashed border-[#FECACA]" />
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <ShieldAlert className="w-16 h-16 text-[#EF4444]" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#FFFBEB] border-2 border-white rounded-full flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-[#F59E0B]" />
              </div>
            </div>
          </div>
          {/* Floating dots */}
          <div className="absolute top-4 left-8 w-3 h-3 rounded-full bg-[#FECACA] animate-pulse" />
          <div className="absolute bottom-8 right-6 w-2 h-2 rounded-full bg-[#FCA5A5] animate-pulse delay-300" />
          <div className="absolute top-12 right-4 w-2.5 h-2.5 rounded-full bg-[#FEE2E2] animate-pulse delay-150" />
        </div>

        {/* Error text */}
        <h1 className="text-7xl font-black text-[#EF4444] tracking-tight mb-3">
          Oops!
        </h1>
        <h2 className="text-2xl font-bold text-[#101828] mb-2">
          Something Went Wrong
        </h2>
        <p className="text-sm text-[#6A7282] leading-relaxed max-w-sm mx-auto mb-3">
          An unexpected error occurred. Our team has been notified and is working
          on a fix. Please try again.
        </p>

        {/* Error digest */}
        {error.digest && (
          <p className="text-[11px] text-[#9CA3AF] font-mono bg-gray-50 border border-gray-100 rounded-lg inline-block px-3 py-1.5 mb-8">
            Error ID: {error.digest}
          </p>
        )}
        {!error.digest && <div className="mb-8" />}

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-3 bg-linear-to-r from-[#DC2626] to-[#EF4444] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-3 border border-gray-200 bg-white text-sm font-semibold text-[#4A5565] rounded-xl hover:bg-gray-50 transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Help section */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-sm mx-auto">
          <p className="text-xs font-semibold text-[#101828] mb-1">
            Need Help?
          </p>
          <p className="text-xs text-[#6A7282] mb-3">
            If this problem persists, please contact our support team.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] rounded-lg hover:bg-[#E0F2FE] transition cursor-pointer">
              Contact Support
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#4A5565] bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
