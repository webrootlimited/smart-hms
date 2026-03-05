import { Clock, CalendarDays, AlertTriangle } from "lucide-react";

const items = [
  {
    icon: Clock,
    iconBg: "bg-[#0284C7]",
    title: "Working Hours Today",
    desc: "8:00 AM - 6:00 PM (UTC+0)",
    bg: "bg-[#EFF6FF]",
  },
  {
    icon: CalendarDays,
    iconBg: "bg-[#FF6900]",
    title: "Next Holiday",
    desc: "Christmas - Dec 25",
    bg: "bg-[#FFF7ED]",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-[#F6339A]",
    title: "License Expiry Alert",
    desc: "Dr. Smith - 15 Days",
    bg: "bg-[#FDF2F8]",
  },
];

export default function ClinicOverview() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-base font-bold text-[#101828] mb-4">Clinic Overview</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className={`flex items-center gap-3 rounded-xl px-4 py-3.5 ${item.bg}`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
            >
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">{item.title}</p>
              <p className="text-xs text-[#4A5565]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
