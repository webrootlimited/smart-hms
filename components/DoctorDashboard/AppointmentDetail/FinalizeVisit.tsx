"use client";

import { useState } from "react";
import { CheckCircle2, Clock } from "lucide-react";

export default function FinalizeVisit() {
  const [notes, setNotes] = useState("");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#F0F9FF] flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-[#0284C7]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#101828]">Finalize Visit</h3>
          <p className="text-[11px] text-[#6A7282]">Complete the visit to update patient records.</p>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Add optional notes..."
        className="w-full px-3 py-2.5 text-xs border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] resize-none h-20 mb-3"
      />

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
        <CheckCircle2 className="w-4 h-4" /> Mark Visit as Completed
      </button>

      <div className="flex items-center justify-center gap-1.5 mt-2">
        <Clock className="w-3 h-3 text-[#D97706]" />
        <span className="text-[10px] text-[#D97706] font-medium">Pending Documentation</span>
      </div>
    </div>
  );
}
