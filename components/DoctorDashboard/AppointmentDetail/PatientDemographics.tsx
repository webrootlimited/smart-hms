import { Phone, Mail, AlertTriangle, MapPin, Droplets, CalendarDays } from "lucide-react";
import type { AppointmentDetail } from "./types";

export default function PatientDemographics({ appointment }: { appointment: AppointmentDetail }) {
  const { patient } = appointment;

  const rows = [
    patient.phone && { icon: Phone, label: "Phone", value: patient.phone, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
    patient.email && { icon: Mail, label: "Email", value: patient.email, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
    patient.dob && {
      icon: CalendarDays, label: "Date of Birth",
      value: new Date(patient.dob).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]",
    },
    patient.address?.line1 && {
      icon: MapPin, label: "Address",
      value: [patient.address.line1, patient.address.line2, patient.address.city, patient.address.postcode].filter(Boolean).join(", "),
      color: "text-[#EA580C]", bg: "bg-[#FFF7ED]",
    },
    patient.blood_group && { icon: Droplets, label: "Blood Group", value: patient.blood_group, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; color: string; bg: string }[];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Patient Information</h3>

      {rows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${row.bg} flex items-center justify-center shrink-0`}>
                <row.icon className={`w-4 h-4 ${row.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-[#6A7282]">{row.label}</p>
                <p className="text-xs font-medium text-[#101828]">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#6A7282]">No patient information available</p>
      )}

      {/* Emergency Contact */}
      {patient.emergencyContact && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#EF4444]" />
            </div>
            <div>
              <p className="text-[10px] text-[#6A7282]">Emergency Contact</p>
              <p className="text-xs font-medium text-[#101828]">
                {patient.emergencyContact.name} ({patient.emergencyContact.relationship}) — {patient.emergencyContact.phone}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
