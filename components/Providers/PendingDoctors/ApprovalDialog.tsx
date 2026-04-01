"use client";

import { CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";

interface Props {
  type: "approve" | "reject";
  doctorName: string;
  loading: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ApprovalDialog({ type, doctorName, loading, onConfirm, onClose }: Props) {
  const isApprove = type === "approve";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
              isApprove ? "bg-[#F0FDF4]" : "bg-[#FEF2F2]"
            }`}
          >
            {isApprove ? (
              <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
            )}
          </div>

          <h3 className="text-lg font-bold text-[#101828]">
            {isApprove ? "Approve Doctor" : "Reject Application"}
          </h3>
          <p className="text-sm text-[#6A7282] mt-1">
            {isApprove
              ? `Are you sure you want to approve ${doctorName}? They will be able to accept appointments.`
              : `Are you sure you want to reject ${doctorName}'s application?`}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 text-sm font-semibold text-[#4A5565] bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-2.5 text-sm font-semibold text-white rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
              isApprove
                ? "bg-[#16A34A] hover:opacity-90"
                : "bg-[#EF4444] hover:opacity-90"
            }`}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isApprove ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Approve
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Reject
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
