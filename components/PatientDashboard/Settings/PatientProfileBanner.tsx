"use client";

import { Camera } from "lucide-react";
import { PatientProfile } from "./PatientSettingsMain";

function getInitials(first: string, last: string) {
  return ((first?.[0] || "") + (last?.[0] || "")).toUpperCase();
}

export default function PatientProfileBanner({ patient }: { patient: PatientProfile | null }) {
  const initials = getInitials(patient?.first_name || "", patient?.last_name || "");
  const fullName = patient ? `${patient.first_name} ${patient.last_name}` : "—";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#0284C7] to-[#0EA5E9] flex items-center justify-center text-white text-xl font-bold">
            {initials}
          </div>
          <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0284C7] border-2 border-white flex items-center justify-center cursor-pointer hover:opacity-90 transition">
            <Camera className="w-3 h-3 text-white" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-[#101828]">{fullName}</h2>
          <p className="text-sm text-[#6A7282]">{patient?.email || "—"}</p>
          <div className="flex items-center gap-4 mt-1.5">
            {patient?.blood_group && (
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#FEF2F2] text-[#EF4444] rounded-full">
                {patient.blood_group}
              </span>
            )}
            {patient?.nhs_number && (
              <span className="text-xs text-[#6A7282]">NHS: {patient.nhs_number}</span>
            )}
            {patient?.gender && (
              <span className="text-xs text-[#6A7282]">{patient.gender.charAt(0) + patient.gender.slice(1).toLowerCase()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
