"use client";

import { Video, CheckCircle2 } from "lucide-react";

interface OnlineDoctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  price: number;
  initials: string;
  color: string;
}

export default function OnlineDoctorCard({
  doctor,
  onBook,
}: {
  doctor: OnlineDoctor;
  onBook: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div className="flex items-start gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: doctor.color }}
          >
            {doctor.initials}
          </div>
          <div>
            <h3 className="text-base font-bold text-[#101828]">{doctor.name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-medium text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded">{doctor.specialty}</span>
              <span className="text-xs text-[#6A7282]">{doctor.experience} years</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#6A7282]">GBP</p>
          <p className="text-lg font-bold text-[#7C3AED]">£{doctor.price}</p>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-3 mt-3 pt-3 border-t border-gray-50">
        <span className="flex items-center gap-1.5 text-xs text-[#4A5565]">
          <Video className="w-3.5 h-3.5 text-[#7C3AED]" /> Video Call
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[#16A34A]">
          <CheckCircle2 className="w-3.5 h-3.5" /> Online Available
        </span>
      </div>

      <div className="flex items-center justify-end mt-3">
        <button
          onClick={onBook}
          className="px-5 py-2 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          Book Online
        </button>
      </div>
    </div>
  );
}
