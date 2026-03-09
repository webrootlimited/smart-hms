import { Video, Wifi, UserCheck } from "lucide-react";
import { AppointmentDetail } from "./types";

export default function TelehealthCard({ appointment }: { appointment: AppointmentDetail }) {
  const { telehealth } = appointment;

  if (!telehealth.enabled) return null;

  return (
    <div className="bg-linear-to-br from-[#0284C7] to-[#0369A1] rounded-2xl p-5 text-white overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold">Telehealth Session</h3>
        <span className="text-[11px] text-white/80">{telehealth.status}</span>
      </div>

      {/* Illustration placeholder */}
      <div className="w-full h-28 bg-white/10 rounded-xl flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
          <Video className="w-8 h-8 text-white/60" />
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#0284C7] text-sm font-semibold rounded-xl hover:bg-white/90 transition cursor-pointer">
        <Video className="w-4 h-4" /> Join Video Call
      </button>

      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3 h-3 text-[#16A34A]" />
          <span className="text-[10px] text-white/80">Strong Connection</span>
        </div>
        {telehealth.patientWaiting && (
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3 h-3 text-[#F59E0B]" />
            <span className="text-[10px] text-white/80">Patient is Waiting</span>
          </div>
        )}
      </div>
    </div>
  );
}
