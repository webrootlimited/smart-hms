"use client";

import { useState } from "react";
import { Heart, Pencil, CreditCard } from "lucide-react";
import type { PatientDetail } from "./types";
import EditMedicalDialog from "./EditMedicalDialog";

export default function MedicalInfoTab({
  patient,
  onUpdate,
  saving,
}: {
  patient: PatientDetail;
  onUpdate: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Medical Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#EF4444]" />
            <h2 className="text-base font-bold text-[#101828]">Medical Information</h2>
          </div>
          <button onClick={() => setEditOpen(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Blood Group</span>
            {patient.blood_group ? (
              <span className="px-2.5 py-0.5 text-sm font-semibold bg-[#FEF2F2] text-[#EF4444] rounded-lg">
                {patient.blood_group}
              </span>
            ) : (
              <span className="text-sm text-[#6A7282]">Not set</span>
            )}
          </div>
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">NHS Number</span>
            {patient.nhs_number ? (
              <span className="px-2.5 py-0.5 text-sm font-semibold bg-[#EFF6FF] text-[#0284C7] rounded-lg">
                {patient.nhs_number}
              </span>
            ) : (
              <span className="text-sm text-[#6A7282]">Not set</span>
            )}
          </div>
        </div>
      </div>

      {/* Payment Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <CreditCard className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Payment Information</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Saved Cards</span>
            <span className="text-sm font-semibold text-[#101828]">{patient.saved_cards}</span>
          </div>
        </div>
      </div>

      <EditMedicalDialog open={editOpen} onClose={() => setEditOpen(false)} patient={patient} onSave={onUpdate} saving={saving} />
    </div>
  );
}
