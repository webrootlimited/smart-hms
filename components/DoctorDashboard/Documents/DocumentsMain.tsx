"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  Search,
  Upload,
  FileText,
  Stethoscope,
  FlaskConical,
  ScanLine,
  File,
  ListFilter,
} from "lucide-react";
import DocumentRow from "./DocumentRow";
import UploadDocumentDialog from "./UploadDocumentDialog";
import type { DocumentRecord, DocStats } from "./types";

const filters = [
  { key: "ALL", label: "All Files", icon: ListFilter },
  { key: "CONSULTATION", label: "Consultations", icon: Stethoscope },
  { key: "LAB_REPORT", label: "Lab Reports", icon: FlaskConical },
  { key: "XRAY", label: "Imaging", icon: ScanLine },
  { key: "FILE", label: "Files", icon: File },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export default function DocumentsMain() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.doctorDocuments(activeFilter, debouncedSearch),
    queryFn: () => {
      const params: Record<string, string> = {};
      if (activeFilter !== "ALL") params.type = activeFilter;
      if (debouncedSearch) params.search = debouncedSearch;
      return apiFetch<{ success: boolean; records: DocumentRecord[]; stats: DocStats }>(
        "/api/doctor/documents",
        params
      );
    },
  });

  const records = data?.records ?? [];
  const stats = data?.stats ?? { all: 0, consultations: 0, labReports: 0, xrays: 0, files: 0 };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Documents</h1>
          <p className="text-sm text-[#6A7282]">Manage patient files, reports, and medical records</p>
        </div>
        <button
          onClick={() => setUploadOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Files", value: stats.all, color: "text-[#0284C7]" },
          { label: "Lab Reports", value: stats.labReports, color: "text-[#16A34A]" },
          { label: "Imaging", value: stats.xrays, color: "text-[#7C3AED]" },
          { label: "Consultations", value: stats.consultations, color: "text-[#EA580C]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#6A7282]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
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

      {/* Document table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-7 h-7 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : records.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#4A5565]">No documents found</p>
            <p className="text-xs text-[#9CA3AF] mt-1">
              {debouncedSearch ? "No results match your search" : "Upload documents to get started"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {records.map((record) => (
              <DocumentRow key={record.id} record={record} />
            ))}
          </div>
        )}
      </div>

      <UploadDocumentDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
}
