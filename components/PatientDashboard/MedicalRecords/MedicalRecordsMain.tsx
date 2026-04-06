"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  FileText,
  Stethoscope,
  FlaskConical,
  ScanLine,
  File,
  ListFilter,
  Search,
} from "lucide-react";
import RecordCard from "./RecordCard";

export interface MedicalRecord {
  id: string;
  record_type: "CONSULTATION" | "LAB_REPORT" | "XRAY" | "FILE";
  description: string | null;
  file_url: string | null;
  createdAt: string;
  doctor: {
    id: string;
    first_name: string;
    last_name: string;
    specialty: string;
  } | null;
}

interface Stats {
  all: number;
  consultations: number;
  labReports: number;
  xrays: number;
  files: number;
}

const filters = [
  { key: "ALL", label: "All Records", icon: ListFilter },
  { key: "CONSULTATION", label: "Consultations", icon: Stethoscope },
  { key: "LAB_REPORT", label: "Lab Reports", icon: FlaskConical },
  { key: "XRAY", label: "X-Rays", icon: ScanLine },
  { key: "FILE", label: "Files", icon: File },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export default function MedicalRecordsMain() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.patientMedicalRecords(activeFilter, debouncedSearch),
    queryFn: () => {
      const params: Record<string, string> = {};
      if (activeFilter !== "ALL") params.type = activeFilter;
      if (debouncedSearch) params.search = debouncedSearch;
      return apiFetch<{ success: boolean; records: MedicalRecord[]; stats: Stats }>(
        "/api/patient/medical-records",
        params
      );
    },
  });

  const records = data?.records ?? [];
  const stats = data?.stats ?? { all: 0, consultations: 0, labReports: 0, xrays: 0, files: 0 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#101828] flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#0284C7]" />
            </div>
            Medical Records
          </h1>
          <p className="text-sm text-[#6A7282] mt-1 ml-[46px]">
            View your consultation notes, lab reports, and medical files
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Consultations", count: stats.consultations, icon: Stethoscope, color: "#0284C7", bg: "#F0F9FF" },
          { label: "Lab Reports", count: stats.labReports, icon: FlaskConical, color: "#7C3AED", bg: "#FAF5FF" },
          { label: "X-Rays", count: stats.xrays, icon: ScanLine, color: "#EA580C", bg: "#FFF7ED" },
          { label: "Files", count: stats.files, icon: File, color: "#16A34A", bg: "#F0FDF4" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.bg }}>
                <s.icon className="w-4.5 h-4.5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-lg font-bold text-[#101828]">{s.count}</p>
                <p className="text-[11px] text-[#6A7282]">{s.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Records list */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : records.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <FileText className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#4A5565]">No medical records found</p>
          <p className="text-xs text-[#9CA3AF] mt-1">
            {debouncedSearch
              ? "No records match your search"
              : "Your medical records will appear here after consultations"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((record) => (
            <RecordCard key={record.id} record={record} />
          ))}
        </div>
      )}
    </div>
  );
}
