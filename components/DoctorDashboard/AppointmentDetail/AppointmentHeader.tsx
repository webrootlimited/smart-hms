import { Video, CheckCircle2, MoreVertical } from "lucide-react";
import { AppointmentDetail } from "./types";

export default function AppointmentHeader({ appointment }: { appointment: AppointmentDetail }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Appointment Details</h1>
        <p className="text-sm text-[#6A7282]">Review patient information, medical history, and visit forms.</p>
      </div>
      <div className="flex items-center gap-2">
        {appointment.telehealth.enabled && (
          <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
            <Video className="w-4 h-4" /> Join Telehealth
          </button>
        )}
        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <CheckCircle2 className="w-4 h-4" /> Mark Completed
        </button>
        <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer">
          <MoreVertical className="w-4 h-4 text-[#6A7282]" />
        </button>
      </div>
    </div>
  );
}
