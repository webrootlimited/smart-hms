import { Stethoscope, Pill, Heart, Syringe, UserRound, CalendarDays } from "lucide-react";
import { AppointmentDetail } from "./types";

export default function MedicalHistory({ appointment }: { appointment: AppointmentDetail }) {
  const { medicalHistory } = appointment;

  const rows = [
    { icon: Stethoscope, label: "Past Diagnoses", value: medicalHistory.pastDiagnoses, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
    { icon: Syringe, label: "Allergies", value: medicalHistory.allergies, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
    { icon: Heart, label: "Chronic Conditions", value: medicalHistory.chronicConditions, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
    { icon: Pill, label: "Current Medications", value: medicalHistory.currentMedications, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Medical History Summary</h3>

      <div className="space-y-3.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <div className={`w-7 h-7 rounded-lg ${row.bg} flex items-center justify-center shrink-0 mt-0.5`}>
              <row.icon className={`w-3.5 h-3.5 ${row.color}`} />
            </div>
            <div>
              <p className="text-[11px] text-[#6A7282]">{row.label}</p>
              <p className="text-xs font-medium text-[#101828]">{row.value}</p>
            </div>
          </div>
        ))}

        {/* Primary Physician */}
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0 mt-0.5">
            <UserRound className="w-3.5 h-3.5 text-[#16A34A]" />
          </div>
          <div>
            <p className="text-[11px] text-[#6A7282]">Primary Physician</p>
            <p className="text-xs font-semibold text-[#101828]">{medicalHistory.primaryPhysician}</p>
          </div>
        </div>

        {/* Last Visit */}
        <div className="flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#ECFEFF] flex items-center justify-center shrink-0 mt-0.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#0891B2]" />
          </div>
          <div>
            <p className="text-[11px] text-[#6A7282]">Last Visit</p>
            <p className="text-xs font-semibold text-[#101828]">
              {medicalHistory.lastVisit.date}: {medicalHistory.lastVisit.type}
            </p>
            <p className="text-[11px] text-[#6A7282] mt-0.5">{medicalHistory.lastVisit.notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
