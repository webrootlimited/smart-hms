"use client";

import { useState } from "react";
import {
  Stethoscope,
  Mail,
  Phone,
  FileText,
  Clock,
  PoundSterling,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "@/lib/api";
import { toast } from "sonner";
import ApprovalDialog from "./ApprovalDialog";

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

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function PendingDoctorCard({ doctor }: { doctor: PendingDoctor }) {
  const [expanded, setExpanded] = useState(false);
  const [dialog, setDialog] = useState<"approve" | "reject" | null>(null);
  const queryClient = useQueryClient();
  const initials = `${doctor.firstName[0]}${doctor.lastName[0]}`.toUpperCase();

  const approveMutation = useMutation({
    mutationFn: () => apiPut(`/api/admin/doctors/${doctor.doctorId}/approve`),
    onSuccess: () => {
      toast.success(`Dr. ${doctor.firstName} ${doctor.lastName} approved`);
      queryClient.invalidateQueries({ queryKey: ["pendingDoctors"] });
      setDialog(null);
    },
    onError: () => toast.error("Failed to approve doctor"),
  });

  const rejectMutation = useMutation({
    mutationFn: () => apiPut(`/api/admin/doctors/${doctor.doctorId}/reject`),
    onSuccess: () => {
      toast.success(`Dr. ${doctor.firstName} ${doctor.lastName} rejected`);
      queryClient.invalidateQueries({ queryKey: ["pendingDoctors"] });
      setDialog(null);
    },
    onError: () => toast.error("Failed to reject doctor"),
  });

  const docUrls = doctor.documentUrl ? doctor.documentUrl.split(",").filter(Boolean) : [];

  function isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(url);
  }

  function getFileName(url: string) {
    const name = url.split("/").pop()?.split("?")[0] || "file";
    // Remove timestamp prefix if present
    return name.replace(/^\d+\./, "");
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Main row */}
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[#0284C7] to-[#0EA5E9] flex items-center justify-center text-white font-bold text-sm shrink-0">
                {initials}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101828]">
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  {doctor.specialization && (
                    <span className="flex items-center gap-1 text-xs font-medium text-[#0284C7]">
                      <Stethoscope className="w-3 h-3" />
                      {doctor.specialization}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-[#6A7282]">
                    <Clock className="w-3 h-3" />
                    {doctor.experienceYears} years
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#6A7282]">
                    <PoundSterling className="w-3 h-3" />
                    £{doctor.consultationFee}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-[#6A7282]">
                    <Mail className="w-3 h-3" />
                    {doctor.email}
                  </span>
                  {doctor.phone && (
                    <span className="flex items-center gap-1 text-xs text-[#6A7282]">
                      <Phone className="w-3 h-3" />
                      {doctor.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-[#6A7282]">Applied {timeAgo(doctor.appliedAt)}</span>
              <button
                onClick={() => setDialog("approve")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16A34A] text-white text-xs font-semibold rounded-lg hover:opacity-90 transition cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve
              </button>
              <button
                onClick={() => setDialog("reject")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EF4444] text-[#EF4444] text-xs font-semibold rounded-lg hover:bg-[#FEF2F2] transition cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </button>
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                {expanded ? (
                  <ChevronUp className="w-4 h-4 text-[#6A7282]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#6A7282]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Documents preview — always visible */}
        {docUrls.length > 0 && (
          <div className="px-5 pb-4">
            <p className="text-xs text-[#6A7282] mb-2">Submitted Documents ({docUrls.length})</p>
            <div className="flex flex-wrap gap-3">
              {docUrls.map((url, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-xl border border-gray-200 overflow-hidden hover:border-[#0284C7] hover:shadow-md transition"
                >
                  {isImage(url) ? (
                    <div className="w-24 h-24 bg-gray-50">
                      <img
                        src={url}
                        alt={`Document ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition flex items-center justify-center">
                        <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition drop-shadow" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-[#FEF2F2] flex flex-col items-center justify-center gap-1.5">
                      <FileText className="w-8 h-8 text-[#EF4444]" />
                      <span className="text-[10px] font-bold text-[#EF4444] uppercase">
                        {getFileName(url).split(".").pop() || "PDF"}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1.5 py-0.5">
                    <p className="text-[9px] text-white truncate">
                      {i === 0 ? "License" : `Certificate ${i}`}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Expanded details */}
        {expanded && (
          <div className="border-t border-gray-100 p-5 bg-[#F8FAFC] space-y-4">
            {/* License */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F0F9FF] flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#0284C7]" />
              </div>
              <div>
                <p className="text-xs text-[#6A7282]">License Number</p>
                <p className="text-sm font-semibold text-[#101828]">{doctor.licenseNumber}</p>
              </div>
            </div>

            {/* Bio */}
            {doctor.bio && (
              <div>
                <p className="text-xs text-[#6A7282] mb-1">Bio</p>
                <p className="text-sm text-[#334155]">{doctor.bio}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Approval/Rejection Dialog */}
      {dialog && (
        <ApprovalDialog
          type={dialog}
          doctorName={`Dr. ${doctor.firstName} ${doctor.lastName}`}
          loading={dialog === "approve" ? approveMutation.isPending : rejectMutation.isPending}
          onConfirm={() => {
            if (dialog === "approve") approveMutation.mutate();
            else rejectMutation.mutate();
          }}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  );
}
