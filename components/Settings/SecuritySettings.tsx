"use client";

import { useState } from "react";
import { Shield, Check } from "lucide-react";

export default function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] flex items-center justify-center">
          <Shield className="w-4 h-4 text-[#7C3AED]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#101828]">Security Settings</h2>
          <p className="text-xs text-[#6A7282]">Access control and authentication</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Two-Factor Authentication */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm font-semibold text-[#101828]">Two-Factor Authentication</p>
              <p className="text-xs text-[#6A7282]">Require 2FA for all admin users</p>
            </div>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-11 h-6 rounded-full relative transition cursor-pointer ${
                twoFactor ? "bg-[#16A34A]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                  twoFactor ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <p className="text-[10px] text-[#16A34A] font-medium">2FA is enabled for 24 users</p>
        </div>

        {/* Session Timeout */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-[#101828]">Session Timeout</p>
            <span className="text-[10px] text-[#6A7282]">Current: 30 min</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              defaultValue={30}
              className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
            <span className="text-sm text-[#6A7282]">minutes</span>
          </div>
          <p className="text-[10px] text-[#6A7282] mt-1">Auto logout users after inactivity</p>
        </div>

        {/* Max Login Attempts */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-[#101828]">Maximum Login Attempts</p>
            <span className="text-[10px] text-[#6A7282]">Current: 5 attempts</span>
          </div>
          <input
            type="number"
            defaultValue={5}
            className="w-20 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
          <p className="text-[10px] text-[#6A7282] mt-1">Lock account after failed attempts</p>
        </div>

        {/* Password Requirements */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm font-semibold text-[#101828] mb-2">Password Requirements</p>
          <div className="space-y-1.5">
            {[
              "Minimum 8 characters",
              "Require uppercase letters",
              "Require numbers",
              "Require special characters",
            ].map((req) => (
              <div key={req} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-[#16A34A]" />
                </div>
                <span className="text-xs text-[#4A5565]">{req}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
