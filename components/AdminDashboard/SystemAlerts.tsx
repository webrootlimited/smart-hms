import { AlertCircle, AlertTriangle, Info } from "lucide-react";

const alerts = [
  {
    icon: AlertCircle,
    iconBg: "bg-[#FB2C36]",
    title: "Critical: Telehealth Service",
    desc: "Service API Key expired, immediate attention required",
    bg: "bg-[#FEF2F2]",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#F0B100]",
    title: "Warning: API Key",
    desc: "Integration key expires in 5 days, renew to avoid service disruption",
    bg: "bg-[#FEFCE8]",
  },
  {
    icon: Info,
    iconBg: "bg-[#2B7FFF]",
    title: "Info: System Update",
    desc: "A new software update will be applied this weekend",
    bg: "bg-[#EFF6FF]",
  },
];

export default function SystemAlerts() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-base font-bold text-[#101828] mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 ${alert.bg}`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${alert.iconBg}`}
            >
              <alert.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">{alert.title}</p>
              <p className="text-xs text-[#4A5565]">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
