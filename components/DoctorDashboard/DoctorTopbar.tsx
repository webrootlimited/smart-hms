"use client";

import { Search, Bell, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import ProfileDropdown from "@/components/utils/ProfileDropdown";
import { useParams } from "next/navigation";

function formatDoctorName(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function DoctorTopbar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const params = useParams();
  const doctorName = formatDoctorName(params.doctorName as string);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      {/* Left */}
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
          <h1 className="text-lg font-bold text-[#101828]">
            Welcome back, {doctorName} 👋
          </h1>
          <p className="text-sm text-[#6A7282]">Here&apos;s what&apos;s happening today</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patients, records..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 w-56 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">
          <Bell className="w-4 h-4 text-[#64748B]" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-semibold">
            5
          </span>
        </button>

        {/* Profile */}
        <ProfileDropdown
          name={doctorName}
          subtitle="Cardiologist"
          initials={doctorName.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        />
      </div>
    </header>
  );
}
