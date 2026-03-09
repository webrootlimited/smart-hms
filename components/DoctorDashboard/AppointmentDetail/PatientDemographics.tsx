import { Phone, Mail, AlertTriangle, UserRound, Hash } from "lucide-react";
import { AppointmentDetail } from "./types";

const TAG_COLORS: Record<string, { bg: string; color: string }> = {
  "Allergic: Penicillin": { bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
  "Chronic Condition": { bg: "bg-[#FFF7ED]", color: "text-[#EA580C]" },
  "VIP Patient": { bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
  "First Visit": { bg: "bg-[#F0F9FF]", color: "text-[#0284C7]" },
  "Insurance Pending": { bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
  "Follow-up Required": { bg: "bg-[#FAF5FF]", color: "text-[#7C3AED]" },
};

export default function PatientDemographics({ appointment }: { appointment: AppointmentDetail }) {
  const { patient } = appointment;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Patient Demographics</h3>

      {/* Name + ID row */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center">
            <span className="text-sm font-bold text-[#4A5565]">{patient.avatar}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-[#101828]">{patient.name}</p>
            <p className="text-xs text-[#6A7282]">{patient.age} years old, {patient.gender}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <Hash className="w-3.5 h-3.5 text-[#6A7282]" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Patient ID</p>
            <p className="text-xs font-semibold text-[#101828]">{patient.patientId}</p>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
            <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
          </div>
          <div>
            <p className="text-[10px] text-[#6A7282]">Contact</p>
            <p className="text-xs font-medium text-[#101828]">{patient.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#F0F9FF] flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
          </div>
          <div>
            <p className="text-[10px] text-[#6A7282]">Email</p>
            <p className="text-xs font-medium text-[#101828]">{patient.email}</p>
          </div>
        </div>
      </div>

      {/* Emergency contact */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
        </div>
        <div>
          <p className="text-[10px] text-[#6A7282]">Emergency Contact</p>
          <p className="text-xs font-medium text-[#101828]">{patient.emergencyContact}</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {patient.tags.map((tag) => {
          const colors = TAG_COLORS[tag] || { bg: "bg-gray-100", color: "text-[#4A5565]" };
          return (
            <span key={tag} className={`px-2.5 py-1 text-[11px] font-medium rounded-full ${colors.bg} ${colors.color}`}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
