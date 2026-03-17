import { Search, SlidersHorizontal, Download, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PatientStatus, Gender } from "./types";

export type Filters = {
  search: string;
  status: PatientStatus | "";
  gender: Gender | "";
  blood_group: string;
};

export const emptyFilters: Filters = {
  search: "",
  status: "",
  gender: "",
  blood_group: "",
};

const STATUSES: PatientStatus[] = ["ACTIVE", "INACTIVE", "SUSPENDED"];
const GENDERS: Gender[] = ["MALE", "FEMALE", "OTHER"];
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const statusLabel = (s: string) =>
  s.charAt(0) + s.slice(1).toLowerCase();

export default function PatientsFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  const activeFilters = [
    filters.status && { key: "status", label: `Status: ${statusLabel(filters.status)}` },
    filters.gender && { key: "gender", label: `Gender: ${statusLabel(filters.gender)}` },
    filters.blood_group && { key: "blood_group", label: `Blood: ${filters.blood_group}` },
  ].filter(Boolean) as { key: string; label: string }[];

  const removeFilter = (key: string) => {
    onChange({ ...filters, [key]: "" });
  };

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7282]" />
          <input
            type="text"
            placeholder="Search by name, phone, or NHS number..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        <Select
          value={filters.status || "all"}
          onValueChange={(v) => onChange({ ...filters, status: v === "all" ? "" : (v as PatientStatus) })}
        >
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{statusLabel(s)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.gender || "all"}
          onValueChange={(v) => onChange({ ...filters, gender: v === "all" ? "" : (v as Gender) })}
        >
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            {GENDERS.map((g) => (
              <SelectItem key={g} value={g}>{statusLabel(g)}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.blood_group || "all"}
          onValueChange={(v) => onChange({ ...filters, blood_group: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-full rounded-xl">
            <SelectValue placeholder="Blood Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Blood Groups</SelectItem>
            {BLOOD_GROUPS.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer text-[#4A5565]">
          <Download className="w-4 h-4" /> Export
        </button>
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
              <button onClick={() => removeFilter(f.key)} className="hover:text-[#101828] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
