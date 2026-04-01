"use client";

import { Loader2, UserCheck, InboxIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import PendingDoctorCard from "./PendingDoctorCard";

interface PendingDoctor {
  verificationId: string;
  doctorId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  specialization: string;
  experienceYears: number;
  consultationFee: number;
  phone: string;
  bio: string;
  licenseNumber: string;
  documentUrl: string;
  appliedAt: string;
}

interface PendingResponse {
  success: boolean;
  doctors: PendingDoctor[];
}

export default function PendingDoctorsMain() {
  const { data, isLoading } = useQuery({
    queryKey: ["pendingDoctors"],
    queryFn: () => apiFetch<PendingResponse>("/api/admin/pending-doctors"),
  });

  const doctors = data?.doctors ?? [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Pending Applications</h1>
          <p className="text-sm text-[#6A7282] mt-0.5">
            Review and approve doctor registration requests
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl">
          <UserCheck className="w-4 h-4 text-[#EA580C]" />
          <span className="text-sm font-semibold text-[#EA580C]">
            {doctors.length} Pending
          </span>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
        </div>
      ) : doctors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <InboxIcon className="w-7 h-7 text-[#6A7282]" />
          </div>
          <p className="text-sm font-medium text-[#101828]">No pending applications</p>
          <p className="text-xs text-[#6A7282] mt-1">All doctor applications have been reviewed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {doctors.map((doc) => (
            <PendingDoctorCard key={doc.doctorId} doctor={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
