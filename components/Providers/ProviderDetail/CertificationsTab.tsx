import { Award, ShieldCheck, FileText } from "lucide-react";
import type { DoctorDetail } from "./types";

const VERIFICATION_STATUS: Record<string, { bg: string; text: string; label: string }> = {
  VERIFIED: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", label: "Verified" },
  PENDING: { bg: "bg-[#FFFBEB]", text: "text-[#D97706]", label: "Pending" },
  REJECTED: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", label: "Rejected" },
};

export default function CertificationsTab({ doctor }: { doctor: DoctorDetail }) {
  const v = doctor.verification;
  const st = v ? (VERIFICATION_STATUS[v.status] ?? VERIFICATION_STATUS.PENDING) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Verification Status */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Verification Status</h2>
        </div>
        {v ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">Status</span>
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${st!.bg} ${st!.text}`}>
                {st!.label}
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">License Number</span>
              <span className="text-sm font-semibold text-[#101828]">{v.license_number || "—"}</span>
            </div>
            {v.verified_at && (
              <div className="flex items-center justify-between py-1">
                <span className="text-sm text-[#6A7282]">Verified On</span>
                <span className="text-sm font-semibold text-[#101828]">
                  {new Date(v.verified_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </span>
              </div>
            )}
            {v.document_url && (
              <a
                href={v.document_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#EFF6FF] text-[#0284C7] rounded-xl hover:bg-[#DBEAFE] transition"
              >
                <FileText className="w-4 h-4" /> View Document
              </a>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-[#6A7282]">No verification record found</p>
          </div>
        )}
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Award className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Account Information</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Account Status</span>
            <span className={`flex items-center gap-1.5 text-sm font-semibold ${
              doctor.account_status === "ACTIVE" ? "text-[#16A34A]" : "text-[#EF4444]"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                doctor.account_status === "ACTIVE" ? "bg-[#16A34A]" : "bg-[#EF4444]"
              }`} />
              {doctor.account_status || "—"}
            </span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Doctor Status</span>
            <span className="text-sm font-semibold text-[#101828]">{doctor.status}</span>
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Registered On</span>
            <span className="text-sm font-semibold text-[#101828]">
              {new Date(doctor.joined_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
