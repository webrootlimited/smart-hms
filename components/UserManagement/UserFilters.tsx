"use client";

import { Search, SlidersHorizontal, X, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES, STATUSES, DEPARTMENTS } from "./mockData";
import type { UserRole, UserStatus } from "./types";

export type Filters = {
  search: string;
  role: UserRole | "";
  status: UserStatus | "";
  department: string;
};

export default function UserFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  const activeFilters = [
    filters.role && { key: "role" as const, label: filters.role },
    filters.status && { key: "status" as const, label: filters.status },
    filters.department && { key: "department" as const, label: filters.department },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
      {/* Filter row */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Name, email, or ID..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        {/* Role */}
        <Select
          value={filters.role || undefined}
          onValueChange={(val) =>
            onChange({ ...filters, role: val === "all" ? "" : (val as UserRole) })
          }
        >
          <SelectTrigger className="w-full rounded-xl bg-gray-50 border-gray-200">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}
        <Select
          value={filters.status || undefined}
          onValueChange={(val) =>
            onChange({ ...filters, status: val === "all" ? "" : (val as UserStatus) })
          }
        >
          <SelectTrigger className="w-full rounded-xl bg-gray-50 border-gray-200">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Department */}
        <Select
          value={filters.department || undefined}
          onValueChange={(val) =>
            onChange({ ...filters, department: val === "all" ? "" : val })
          }
        >
          <SelectTrigger className="w-full rounded-xl bg-gray-50 border-gray-200">
            <SelectValue placeholder="All Departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Export */}
        <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer text-[#4A5565]">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Active filter tags */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#6A7282]">Active Filters:</span>
          {activeFilters.map((f) => (
            <span
              key={f.key}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-[#EFF6FF] text-[#0284C7] rounded-lg"
            >
              {f.label}
              <button
                onClick={() => onChange({ ...filters, [f.key]: "" })}
                className="hover:text-[#0284C7]/70 cursor-pointer"
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
