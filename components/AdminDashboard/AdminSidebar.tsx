"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserRound,
  UserCog,
  FileBarChart,
  Stethoscope,
  Bell,

  Activity,
  ClipboardList,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Appointments", icon: CalendarDays, href: "/admin/appointments" },
  { label: "Providers", icon: Stethoscope, href: "/admin/providers" },
  { label: "Pending Doctors", icon: UserCog, href: "/admin/pending-doctors" },
  { label: "Patients", icon: UserRound, href: "/admin/patients" },
  { label: "User Management", icon: UserCog, href: "/admin/user-management" },
  { label: "Clinic Settings", icon: Settings, href: "/admin/clinic-settings" },
  { label: "Notifications", icon: Bell, href: "/admin/notifications" },

  { label: "Analytics", icon: Activity, href: "/admin/analytics" },
  { label: "Activity Logs", icon: ClipboardList, href: "/admin/activity" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function AdminSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col h-full shrink-0 overflow-hidden ${
        collapsed ? "w-[68px]" : "w-52"
      }`}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 bg-[#0284C7] rounded-lg flex items-center justify-center shrink-0">
            {/* <Users className="w-4 h-4 text-white" /> */}
            <img src="/admin/logo.png" alt="" />
          </div>
          {!collapsed && (
            <div className="  overflow-hidden whitespace-nowrap">
              <span className="text-xs text-gray-400 font-medium leading-none">ADMIN</span>
              <span className="text-sm font-bold text-[#1E293B]">SmartHMS</span>
            </div>
          )}
        </div>
       
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#0284C7] text-white shadow-md"
                  : "text-[#4A5565] text-sm hover:bg-gray-50 hover:text-[#1E293B]"
              }`}
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
