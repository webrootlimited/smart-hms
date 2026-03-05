import { UserPlus, Users, CalendarDays, HelpCircle } from "lucide-react";

const actions = [
  {
    label: "Add New Provider",
    icon: UserPlus,
    gradient: "bg-linear-to-br from-[#4D8BE9] to-[#2F548B]",
    textColor: "text-white",
  },
  {
    label: "Manage Departments",
    icon: Users,
    gradient: "bg-linear-to-br from-[#5A9CF0] to-[#4D8BE9]",
    textColor: "text-white",
  },
  {
    label: "Add Appointment Type",
    icon: CalendarDays,
    border: true,
  },
  {
    label: "Need Help?",
    icon: HelpCircle,
    border: true,
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-base font-bold text-[#101828] mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {actions.map((a) => (
          <button
            key={a.label}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer transition-all hover:scale-[1.02] ${
              a.gradient
                ? `${a.gradient} ${a.textColor}`
                : "border-2 border-[#0284C7]/30 text-[#0284C7]"
            }`}
          >
            <a.icon className="w-5 h-5" />
            <span className="text-xs font-semibold text-center leading-tight">
              {a.label}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-[#EFF6FF] rounded-xl p-4">
        <p className="text-sm font-semibold text-[#0284C7]">Need Help?</p>
        <p className="text-xs text-[#4A5565] mt-0.5">
          Visit the our support team to get immediate help with a quick response.
        </p>
      </div>
    </div>
  );
}
