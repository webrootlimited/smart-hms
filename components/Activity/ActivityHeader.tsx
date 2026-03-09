import { ClipboardList, Activity, Users, AlertTriangle } from "lucide-react";

const STATS = [
  { label: "Total Events", value: "1,247", icon: ClipboardList, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
  { label: "Today", value: "342", icon: Activity, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
  { label: "Active Users", value: "156", icon: Users, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
  { label: "Alerts", value: "12", icon: AlertTriangle, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
];

export default function ActivityHeader() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Audit Logs</h1>
        <p className="text-sm text-[#6A7282]">Monitor all system activities and user actions</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
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
