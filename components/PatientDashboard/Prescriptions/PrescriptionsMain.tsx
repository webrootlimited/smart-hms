"use client";

import { useState } from "react";
import {
  Pill,
  ListFilter,
  CheckCircle2,
  Clock,
  RefreshCw,
} from "lucide-react";
import PrescriptionStats from "./PrescriptionStats";
import PrescriptionCard from "./PrescriptionCard";
import {
  prescriptions,
  type PrescriptionStatus,
} from "./prescriptionsData";

const filters = [
  { key: "all", label: "All", icon: ListFilter },
  { key: "active", label: "Active", icon: Pill },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
  { key: "expired", label: "Expired", icon: Clock },
  { key: "refill-requested", label: "Refill Requested", icon: RefreshCw },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export default function PrescriptionsMain() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered =
    activeFilter === "all"
      ? prescriptions
      : prescriptions.filter((p) => p.status === activeFilter);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#101828] flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center">
              <Pill className="w-5 h-5 text-[#0284C7]" />
            </div>
            Your Prescriptions
          </h1>
          <p className="text-sm text-[#6A7282] mt-1 ml-[46px]">
            View and manage medications prescribed by your doctor
          </p>
        </div>
        <PrescriptionStats prescriptions={prescriptions} />
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeFilter === f.key
                ? "bg-[#0284C7] text-white"
                : "bg-white border border-gray-200 text-[#4A5565] hover:bg-gray-50"
            }`}
          >
            <f.icon className="w-3.5 h-3.5" />
            {f.label}
          </button>
        ))}
      </div>

      {/* Prescription cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <Pill className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#4A5565]">
              No prescriptions found
            </p>
            <p className="text-xs text-[#9CA3AF] mt-1">
              No prescriptions match the selected filter
            </p>
          </div>
        )}
        {filtered.map((rx) => (
          <PrescriptionCard key={rx.id} rx={rx} />
        ))}
      </div>
    </div>
  );
}
