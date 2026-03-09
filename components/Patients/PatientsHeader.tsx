import {
  Users,
  UserPlus,
  Calendar,
  TrendingUp,
  Download,
} from "lucide-react";

export default function PatientsHeader({
  totalPatients,
  newThisMonth,
  appointmentsToday,
  growthRate,
}: {
  totalPatients: number;
  newThisMonth: number;
  appointmentsToday: number;
  growthRate: string;
}) {
  const stats = [
    { icon: Users, label: "Total Patients", value: totalPatients.toLocaleString(), color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
    { icon: UserPlus, label: "New This Month", value: newThisMonth, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
    { icon: Calendar, label: "Appointments Today", value: appointmentsToday, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
    { icon: TrendingUp, label: "Growth Rate", value: growthRate, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Users className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Patient Management</h1>
            <p className="text-sm text-[#6A7282]">Manage all patient records and information</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
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
