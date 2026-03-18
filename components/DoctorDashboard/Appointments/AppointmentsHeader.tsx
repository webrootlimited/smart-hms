import { CalendarDays, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { AppointmentStats } from "./types";

export default function AppointmentsHeader({ stats }: { stats: AppointmentStats }) {
  const items = [
    { label: "Today", value: stats.today, icon: CalendarDays, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
    { label: "Upcoming", value: stats.upcoming, icon: Clock, color: "text-[#D97706]", bg: "bg-[#FFFBEB]" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
    { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Appointments</h1>
        <p className="text-sm text-[#6A7282]">Manage and view all your patient appointments</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#101828]">{s.value}</p>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
