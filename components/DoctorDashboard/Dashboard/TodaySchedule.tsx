import { Plus } from "lucide-react";

const SCHEDULE = [
  {
    time: "09:00 AM",
    title: "Team Meeting",
    subtitle: "Weekly case review",
    color: "bg-[#0284C7]",
    bg: "bg-[#F0F9FF]",
  },
  {
    time: "10:30 AM",
    title: "Surgery Prep",
    subtitle: "OR Room 3",
    color: "bg-[#EF4444]",
    bg: "bg-[#FEF2F2]",
  },
  {
    time: "02:00 PM",
    title: "Lunch Break",
    subtitle: "Cafeteria",
    color: "bg-[#16A34A]",
    bg: "bg-[#F0FDF4]",
  },
];

export default function TodaySchedule() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#101828]">Today&apos;s Schedule</h3>
        <button className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
          <Plus className="w-3.5 h-3.5 text-[#6A7282]" />
        </button>
      </div>

      <div className="space-y-3">
        {SCHEDULE.map((item) => (
          <div key={item.time} className="flex items-start gap-3">
            <div className={`px-2 py-1 rounded-lg ${item.bg} text-[10px] font-semibold text-[#101828] whitespace-nowrap mt-0.5`}>
              {item.time}
            </div>
            <div className="flex items-start gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color} mt-1.5 shrink-0`} />
              <div>
                <p className="text-xs font-semibold text-[#101828]">{item.title}</p>
                <p className="text-[11px] text-[#6A7282]">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
