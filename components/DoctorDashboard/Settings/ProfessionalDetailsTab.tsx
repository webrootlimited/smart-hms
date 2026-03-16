"use client";

import { useState } from "react";
import { Stethoscope, Award, Hash, Building2, PoundSterling, Loader2, Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { DoctorProfile } from "./DoctorSettingsMain";

interface Props {
  doctor: DoctorProfile | null;
}

export default function ProfessionalDetailsTab({ doctor }: Props) {
  const queryClient = useQueryClient();
  const [experienceYears, setExperienceYears] = useState(doctor?.experience_years || 0);
  const [consultationFee, setConsultationFee] = useState(doctor?.consultation_fee || 0);
  const [licenseNumber, setLicenseNumber] = useState(doctor?.license_number || "");
  const [department, setDepartment] = useState(doctor?.department || "");
  const [saved, setSaved] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      apiPut("/api/doctor/profile", {
        experience_years: experienceYears, consultation_fee: consultationFee,
        license_number: licenseNumber, department,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.doctorProfile });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Professional Details</h3>
          <p className="text-xs text-[#6A7282]">Manage your medical credentials and specialisations</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {error && <span className="text-xs text-[#DC2626]">Failed to save changes</span>}
          <button
            onClick={() => mutate()}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Specialisation</label>
          <div className="relative">
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={doctor?.specialization || ""}
              readOnly
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-[#6A7282] cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Medical License No.</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Department</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter your department..."
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Years of Experience</label>
          <div className="relative">
            <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="number"
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Consultation Fee (£)</label>
          <div className="relative">
            <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="number"
              value={consultationFee}
              onChange={(e) => setConsultationFee(Number(e.target.value))}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
      </div>

      {/* Verification Status */}
      {doctor?.verification_status && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <Award className="w-4 h-4 text-[#D97706] shrink-0" />
          <span className="text-xs text-[#4A5565]">
            Verification Status: <span className="font-semibold">{doctor.verification_status}</span>
          </span>
        </div>
      )}
    </div>
  );
}
