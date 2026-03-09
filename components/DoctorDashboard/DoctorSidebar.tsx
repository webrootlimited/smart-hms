"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  UserRound,
  Video,
  MessageSquare,
  FileText,
  Bell,
  Settings,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, segment: "dashboard" },
  { label: "Appointments", icon: CalendarDays, segment: "appointments" },
  { label: "Patients", icon: UserRound, segment: "patients" },
  { label: "Telehealth", icon: Video, segment: "telehealth" },
  { label: "Messages", icon: MessageSquare, segment: "messages" },
  { label: "Documents", icon: FileText, segment: "documents" },
  { label: "Notifications", icon: Bell, segment: "notifications" },
  { label: "Settings", icon: Settings, segment: "settings" },
];

export default function DoctorSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const params = useParams();
  const doctorName = params.doctorName as string;
  const base = `/doctor/${doctorName}`;

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col h-full shrink-0 overflow-hidden transition-all ${
        collapsed ? "w-[68px]" : "w-52"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 bg-[#0284C7] rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">S</span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <span className="text-sm font-bold text-[#1E293B]">SmartHMS</span>
            </div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const href = `${base}/${item.segment}`;
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={item.segment}
              href={href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0284C7] text-white shadow-md"
                  : "text-[#4A5565] hover:bg-gray-50 hover:text-[#1E293B]"
              }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Premium plan card */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-3 bg-[#F0F9FF] rounded-xl border border-[#BAE6FD]">
          <p className="text-xs font-bold text-[#0284C7]">Premium Plan</p>
          <p className="text-[10px] text-[#6A7282] mt-0.5">Your plan will expire in 30 days.</p>
          <button className="mt-2 px-3 py-1.5 text-[11px] font-semibold bg-[#0284C7] text-white rounded-lg hover:opacity-90 transition cursor-pointer">
            Renew Now
          </button>
        </div>
      )}

      {/* Bottom Settings */}
      <div className="px-2 pb-4 border-t border-gray-100 pt-2">
        <Link
          href={`${base}/settings`}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
            pathname.includes("/settings")
              ? "bg-[#0284C7] text-white shadow-md"
              : "text-[#4A5565] hover:bg-gray-50 hover:text-[#1E293B]"
          }`}
        >
          <Settings className="w-[18px] h-[18px] shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>
    </aside>
  );
}
