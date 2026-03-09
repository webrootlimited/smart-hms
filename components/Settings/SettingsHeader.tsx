import {
  Settings,
  Wifi,
  ShieldCheck,
  Activity,
  Clock,
} from "lucide-react";

const stats = [
  { icon: Wifi, label: "Server Status", value: "Online", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
  { icon: ShieldCheck, label: "Security Status", value: "Secure", color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
  { icon: Activity, label: "Uptime", value: "98.9%", color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
  { icon: Clock, label: "Last Restart", value: "2 days", color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
];

export default function SettingsHeader() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Settings className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">System Settings</h1>
            <p className="text-sm text-[#6A7282]">Configure global system preferences and integrations</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl">
          <div className="text-right">
            <p className="text-[10px] text-white/70">Version</p>
            <p className="text-sm font-bold">v2.4.1</p>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-semibold bg-white/20 rounded-full">Up to date</span>
        </div>
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
