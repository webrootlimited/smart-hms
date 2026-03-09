import {
  Users,
  Calendar,
  DollarSign,
  Star,
  ArrowRight,
} from "lucide-react";

const reports = [
  {
    icon: Users,
    label: "Patient Demographics",
    value: "2,847",
    change: "+6% vs last month",
    color: "text-[#0284C7]",
    bg: "bg-[#EFF6FF]",
  },
  {
    icon: Calendar,
    label: "Appointment Volume",
    value: "1,234",
    change: "+8% vs last month",
    color: "text-[#16A34A]",
    bg: "bg-[#F0FDF4]",
  },
  {
    icon: DollarSign,
    label: "Revenue Summary",
    value: "£335K",
    change: "+18% vs last month",
    color: "text-[#EA580C]",
    bg: "bg-[#FFF7ED]",
  },
  {
    icon: Star,
    label: "Provider Performance",
    value: "4.8",
    change: "+0.3 vs last month",
    color: "text-[#F59E0B]",
    bg: "bg-[#FFFBEB]",
  },
];

export default function AnalyticsBottomCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {reports.map((r) => (
        <div key={r.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <div className={`w-9 h-9 rounded-lg ${r.bg} flex items-center justify-center mb-3`}>
            <r.icon className={`w-4 h-4 ${r.color}`} />
          </div>
          <p className="text-xs text-[#6A7282] mb-0.5">{r.label}</p>
          <p className="text-xl font-bold text-[#101828]">{r.value}</p>
          <p className="text-[10px] text-[#16A34A] mt-1">{r.change}</p>
          <button className="flex items-center gap-1 text-xs font-semibold text-[#0284C7] mt-3 hover:underline cursor-pointer">
            Generate Report <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
