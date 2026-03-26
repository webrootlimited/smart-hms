"use client";

import { Search, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import ProfileDropdown from "@/components/utils/ProfileDropdown";
import NotificationBell from "@/components/shared/NotificationBell";

export default function AdminTopbar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      {/* Left — Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 items-center justify-center hover:bg-gray-100 transition cursor-pointer hidden max-lg:flex"
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-[#64748B]" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-[#64748B]" />
          )}
        </button>
        <div>
          <h1 className="text-[24px] font-bold text-[#101828]">Admin Overview</h1>
          <p className="text-sm text-[#6A7282]">Welcome back, Dr. Evelyn Reed</p>
        </div>
      </div>

      {/* Right — Search, Notification, Profile */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 w-48 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        {/* Notification bell */}
        <NotificationBell notificationsPath="/admin/notifications" />

        {/* Profile */}
        <ProfileDropdown
          name="Dr. Evelyn Reed"
          subtitle="Administrator"
          initials="ER"
        />
      </div>
    </header>
  );
}
