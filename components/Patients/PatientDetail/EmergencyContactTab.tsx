"use client";

import { useState } from "react";
import { AlertCircle, Phone, User, Pencil } from "lucide-react";
import type { PatientDetail } from "./types";
import EditEmergencyDialog from "./EditEmergencyDialog";

export default function EmergencyContactTab({
  patient,
  onUpdate,
  saving,
}: {
  patient: PatientDetail;
  onUpdate: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const ec = patient.emergency_contact;

  return (
    <div className="max-w-lg">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <h2 className="text-base font-bold text-[#101828]">Emergency Contact</h2>
          </div>
          <button onClick={() => setEditOpen(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>

        {ec ? (
          <div className="space-y-3">
            {[
              { icon: User, label: "Contact Name", value: ec.name, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
              { icon: Phone, label: "Phone Number", value: ec.phone, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
              { icon: AlertCircle, label: "Relationship", value: ec.relationship, bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
            ].map((item) => (
              <div key={item.label} className={`p-3.5 rounded-xl ${item.bg}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span className={`text-xs font-medium ${item.color}`}>{item.label}</span>
                </div>
                <p className="text-sm font-semibold text-[#101828]">{item.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-[#6A7282]">No emergency contact set</p>
            <button
              onClick={() => setEditOpen(true)}
              className="mt-3 text-sm text-[#0284C7] font-medium hover:underline cursor-pointer"
            >
              Add Emergency Contact
            </button>
          </div>
        )}
      </div>

      <EditEmergencyDialog open={editOpen} onClose={() => setEditOpen(false)} patient={patient} onSave={onUpdate} saving={saving} />
    </div>
  );
}
