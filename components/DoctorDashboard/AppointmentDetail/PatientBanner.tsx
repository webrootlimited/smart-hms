import type { AppointmentDetail } from "./types";

const COLORS = ["#0284C7", "#7C3AED", "#059669", "#EA580C", "#0891B2", "#D946EF", "#CA8A04"];
function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function PatientBanner({ appointment }: { appointment: AppointmentDetail }) {
  const { patient } = appointment;

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-bold"
        style={{ backgroundColor: getColor(patient.name) }}
      >
        {patient.initials}
      </div>
      <div>
        <p className="text-sm font-bold text-[#101828]">
          {patient.name}{patient.age ? `, ${patient.age}` : ""}
        </p>
        <p className="text-xs text-[#6A7282]">
          {patient.gender || "—"} {patient.nhs_number ? `• NHS: ${patient.nhs_number}` : ""}
        </p>
      </div>
      {patient.blood_group && (
        <span className="ml-auto px-2.5 py-1 text-[11px] font-semibold text-[#EF4444] bg-[#FEF2F2] rounded-full">
          {patient.blood_group}
        </span>
      )}
    </div>
  );
}
