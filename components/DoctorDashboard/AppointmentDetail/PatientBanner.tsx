import { AppointmentDetail } from "./types";

export default function PatientBanner({ appointment }: { appointment: AppointmentDetail }) {
  const { patient, type } = appointment;

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="w-11 h-11 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0">
        <span className="text-sm font-bold text-[#4A5565]">{patient.avatar}</span>
      </div>
      <div>
        <p className="text-sm font-bold text-[#101828]">
          {patient.name}, {patient.age}
        </p>
        <p className="text-xs text-[#0284C7] font-medium">{type}</p>
      </div>
    </div>
  );
}
