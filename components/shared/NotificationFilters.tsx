"use client";

import { cn } from "@/lib/utils";

export type NotificationFilter = "ALL" | "APPOINTMENT" | "BILLING" | "MESSAGE" | "SYSTEM";

const filters: { label: string; value: NotificationFilter }[] = [
  { label: "All", value: "ALL" },
  { label: "Appointments", value: "APPOINTMENT" },
  { label: "Billing", value: "BILLING" },
  { label: "Messages", value: "MESSAGE" },
  { label: "System", value: "SYSTEM" },
];

interface NotificationFiltersProps {
  active: NotificationFilter;
  onChange: (value: NotificationFilter) => void;
}

export default function NotificationFilters({ active, onChange }: NotificationFiltersProps) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer",
            active === f.value
              ? "bg-[#0284C7] text-white"
              : "bg-gray-100 text-[#4A5565] hover:bg-gray-200"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
