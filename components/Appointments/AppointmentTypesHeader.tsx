import Link from "next/link";
import {
  CalendarCheck,
  Activity,
  Video,
  Plus,
  FolderPlus,
} from "lucide-react";

export default function AppointmentTypesHeader({
  totalTypes,
  activeTypes,
  telehealthCount,
  createdCount,
}: {
  totalTypes: number;
  activeTypes: number;
  telehealthCount: number;
  createdCount: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <CalendarCheck className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">
              Appointment Types
            </h1>
            <p className="text-sm text-[#6A7282]">
              Manage all appointment types available for booking
            </p>
          </div>
        </div>
        <Link
          href="/admin/add-appointment-type"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Appointment Type
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {[
          { icon: CalendarCheck, label: "Types", value: totalTypes, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
          { icon: Activity, label: "Active", value: activeTypes, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
          { icon: Video, label: "Telehealth", value: telehealthCount, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
          { icon: FolderPlus, label: "Created", value: createdCount, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
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
