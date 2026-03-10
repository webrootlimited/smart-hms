"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  MessageSquare,
  Pill,
  FileText,
  Video,
  CreditCard,
  Headphones,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, segment: "dashboard" },
  { label: "Appointments", icon: CalendarDays, segment: "appointments" },
  { label: "Messages", icon: MessageSquare, segment: "messages", badge: 3 },
  { label: "Prescriptions", icon: Pill, segment: "prescriptions" },
  { label: "Medical Records", icon: FileText, segment: "medical-records" },
  { label: "Telehealth", icon: Video, segment: "telehealth" },
  { label: "Payments", icon: CreditCard, segment: "payments" },
];

export default function PatientSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const params = useParams();
  const patientName = params.patientName as string;
  const base = `/patient/${patientName}`;

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
              {!collapsed && (
                <span className="flex-1 flex items-center justify-between">
                  {item.label}
                  {item.badge && (
                    <span
                      className={`ml-2 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                        isActive
                          ? "bg-white text-[#0284C7]"
                          : "bg-[#0284C7] text-white"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Need Help Card */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-3 bg-[#F0F9FF] rounded-xl border border-[#BAE6FD] text-center">
          <Headphones className="w-5 h-5 text-[#0284C7] mx-auto mb-1" />
          <p className="text-xs font-bold text-[#101828]">Need Help?</p>
          <p className="text-[10px] text-[#6A7282] mt-0.5">Contact support 24/7</p>
          <button className="mt-2 px-4 py-1.5 text-[11px] font-semibold bg-[#0284C7] text-white rounded-lg hover:opacity-90 transition cursor-pointer w-full">
            Contact Support
          </button>
        </div>
      )}
    </aside>
  );
}
