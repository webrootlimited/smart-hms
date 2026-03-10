"use client";

import { Bell, CalendarDays, FileText, Pill } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CalendarDays,
    iconColor: "#0284C7",
    iconBg: "#F0F9FF",
    title: "Appointment Reminder",
    text: "Your appointment with Dr. Wilson is tomorrow at 9:30 AM",
    time: "3 hours ago",
  },
  {
    id: 2,
    icon: FileText,
    iconColor: "#16A34A",
    iconBg: "#F0FDF4",
    title: "Lab Results Ready",
    text: "Your blood test results are now available",
    time: "6 hours ago",
  },
  {
    id: 3,
    icon: Pill,
    iconColor: "#EA580C",
    iconBg: "#FFF7ED",
    title: "Prescription Expiring",
    text: "Amoxicillin prescription expires in 5 days",
    time: "1 day ago",
  },
];

export default function NotificationsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#101828] flex items-center gap-2">
          <Bell className="w-5 h-5 text-[#0284C7]" />
          Notifications
        </h2>
        <button className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
          Mark all read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 py-2">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: n.iconBg }}
            >
              <n.icon className="w-4 h-4" style={{ color: n.iconColor }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#101828]">{n.title}</p>
              <p className="text-xs text-[#6A7282] mt-0.5">{n.text}</p>
              <p className="text-[10px] text-[#94A3B8] mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
