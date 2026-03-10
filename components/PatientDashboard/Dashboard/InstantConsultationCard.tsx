"use client";

import { Stethoscope } from "lucide-react";

export default function InstantConsultationCard() {
  return (
    <div className="bg-linear-to-br from-[#0F766E] to-[#0E7490] rounded-2xl p-5 text-white flex flex-col justify-between h-full">
      <div>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <Stethoscope className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-base font-bold">Instant Consultation</h3>
        <p className="text-sm text-white/80 mt-1">
          Connect with a general physician within 5 minutes.
        </p>
      </div>
      <button className="mt-4 px-5 py-2 bg-white text-[#0F766E] text-sm font-semibold rounded-xl hover:bg-white/90 transition cursor-pointer w-fit">
        Start Now
      </button>
    </div>
  );
}
