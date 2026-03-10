"use client";

import { ShieldCheck, CheckCircle2, ExternalLink } from "lucide-react";

const copayAmounts = [
  { label: "Primary Care Visit", amount: 25 },
  { label: "Specialist Visit", amount: 50 },
  { label: "Urgent Care", amount: 75 },
  { label: "Emergency Room", amount: 150 },
];

export default function InsuranceInfo() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#101828]">
              Insurance Information
            </h2>
            <p className="text-xs text-[#6A7282]">Your active coverage details</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] text-[#16A34A] text-xs font-semibold rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Verified
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Provider details */}
        <div>
          <p className="text-xs text-[#6A7282] mb-1">Insurance Provider</p>
          <p className="text-sm font-bold text-[#101828] mb-4">
            Blue Cross Blue Shield
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6A7282]">Member ID</span>
              <span className="text-xs font-semibold text-[#101828]">
                ABC123456789
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6A7282]">Group Number</span>
              <span className="text-xs font-semibold text-[#101828]">
                GRP987654
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6A7282]">Plan Type</span>
              <span className="text-xs font-semibold text-[#101828]">PPO</span>
            </div>
          </div>
        </div>

        {/* Right: Copay amounts */}
        <div>
          <p className="text-xs text-[#6A7282] mb-3">Your Copay Amounts</p>
          <div className="space-y-2.5">
            {copayAmounts.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-xs text-[#4A5565]">{item.label}</span>
                <span className="text-xs font-bold text-[#0284C7]">
                  £{item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-5 pt-4 border-t border-gray-100">
        <button className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer flex items-center gap-1">
          <ExternalLink className="w-3 h-3" />
          View Insurance Card
        </button>
        <button className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
          Update Insurance
        </button>
      </div>
    </div>
  );
}
