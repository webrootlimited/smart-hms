"use client";

import { useState } from "react";
import { Video, CheckCircle2, Clock, Wifi } from "lucide-react";

export default function TelehealthSidebar() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="space-y-5">
      {/* Today's Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#101828]">Today&apos;s Summary</h3>
          <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] flex items-center justify-center">
            <Video className="w-5 h-5 text-[#EF4444]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-[#101828]">15</p>
            <p className="text-[11px] text-[#6A7282]">Appointments</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-[#0284C7]">3</p>
            <p className="text-[11px] text-[#6A7282]">Waiting</p>
          </div>
        </div>
      </div>

      {/* Availability Toggle */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-[#101828]">Your Availability</h3>
          <button
            onClick={() => setAvailable(!available)}
            className={`w-11 h-6 rounded-full relative transition cursor-pointer ${
              available ? "bg-[#0284C7]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                available ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${available ? "bg-[#16A34A]" : "bg-[#EF4444]"}`} />
          <p className="text-xs text-[#6A7282]">
            {available
              ? "You are online and available for new calls."
              : "You are offline. Patients cannot join."}
          </p>
        </div>
      </div>

      {/* Quick Instructions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#101828] mb-3">Quick Instructions</h3>

        <div className="space-y-3">
          {[
            "Review patient documents before starting the call.",
            "Ensure your audio and video are working correctly.",
            "End the call formally and complete post-visit notes.",
          ].map((text) => (
            <div key={text} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
              <p className="text-xs text-[#4A5565]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
