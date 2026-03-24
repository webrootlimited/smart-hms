"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Filters = {
  search: string;
  status: string;
  type: string;
};

export const emptyFilters: Filters = { search: "", status: "", type: "" };

const STATUSES = [
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Requested", value: "REQUESTED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "No Show", value: "NO_SHOW" },
  { label: "Checked In", value: "CHECKED_IN" },
];

const TYPES = [
  { label: "Online", value: "ONLINE" },
  { label: "In-Person", value: "PHYSICAL" },
];

export default function AdminAppointmentsFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  const activeFilters = [
    filters.status && {
      key: "status",
      label: STATUSES.find((s) => s.value === filters.status)?.label ?? filters.status,
    },
    filters.type && {
      key: "type",
      label: TYPES.find((t) => t.value === filters.type)?.label ?? filters.type,
    },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#101828]">
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </div>
        {activeFilters.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-[#0284C7] font-semibold hover:underline cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7282]" />
          <input
            type="text"
            placeholder="Search by patient or doctor name..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        <Select
          value={filters.status || "all"}
          onValueChange={(v) => onChange({ ...filters, status: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.type || "all"}
          onValueChange={(v) => onChange({ ...filters, type: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {TYPES.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#6A7282]">Active Filters:</span>
          {activeFilters.map((f) => (
            <span
              key={f.key}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[#EFF6FF] text-[#0284C7] rounded-full"
            >
              {f.label}
              <button
                onClick={() => onChange({ ...filters, [f.key]: "" })}
                className="hover:text-[#101828] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
