"use client";

import { useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, CalendarDays, FileText, UserRound } from "lucide-react";

const NOTIFICATIONS = [
  { id: "1", title: "Appointment Reminder", desc: "James Wilson — Follow-up at 2:00 PM today", time: "10 min ago", icon: CalendarDays, color: "text-[#0284C7]", bg: "bg-[#F0F9FF]", read: false },
  { id: "2", title: "Lab Results Ready", desc: "CBC results for Emma Davis are now available", time: "1 hour ago", icon: FileText, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]", read: false },
  { id: "3", title: "Critical Alert", desc: "Robert Chen's blood pressure reading exceeds threshold", time: "2 hours ago", icon: AlertTriangle, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]", read: false },
  { id: "4", title: "New Patient Assigned", desc: "Nina Brooks has been added to your patient list", time: "3 hours ago", icon: UserRound, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]", read: true },
  { id: "5", title: "Prescription Approved", desc: "Pharmacy confirmed prescription for Maria Lopez", time: "5 hours ago", icon: CheckCircle2, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]", read: true },
  { id: "6", title: "Schedule Change", desc: "Thursday 10:00 AM slot cancelled by patient David Kim", time: "Yesterday", icon: CalendarDays, color: "text-[#D97706]", bg: "bg-[#FFFBEB]", read: true },
];

export default function DoctorNotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Notifications</h1>
          <p className="text-sm text-[#6A7282]">Stay updated with alerts and reminders</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
            Mark all as read ({unread})
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className={`bg-white rounded-2xl border p-4 shadow-sm flex items-start gap-3 transition ${
              n.read ? "border-gray-100" : "border-[#0284C7]/20 bg-[#FAFCFF]"
            }`}>
              <div className={`w-10 h-10 rounded-xl ${n.bg} flex items-center justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${n.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#101828]">{n.title}</p>
                  {!n.read && <div className="w-2 h-2 rounded-full bg-[#0284C7]" />}
                </div>
                <p className="text-xs text-[#6A7282] mt-0.5">{n.desc}</p>
              </div>
              <span className="text-[11px] text-[#9CA3AF] whitespace-nowrap shrink-0">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
