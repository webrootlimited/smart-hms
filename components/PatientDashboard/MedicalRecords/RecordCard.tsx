"use client";

import {
  Stethoscope,
  FlaskConical,
  ScanLine,
  File,
  Download,
  Calendar,
  User,
} from "lucide-react";
import type { MedicalRecord } from "./MedicalRecordsMain";

const TYPE_CONFIG: Record<
  MedicalRecord["record_type"],
  { label: string; icon: typeof Stethoscope; color: string; bg: string }
> = {
  CONSULTATION: { label: "Consultation", icon: Stethoscope, color: "#0284C7", bg: "#F0F9FF" },
  LAB_REPORT: { label: "Lab Report", icon: FlaskConical, color: "#7C3AED", bg: "#FAF5FF" },
  XRAY: { label: "X-Ray", icon: ScanLine, color: "#EA580C", bg: "#FFF7ED" },
  FILE: { label: "File", icon: File, color: "#16A34A", bg: "#F0FDF4" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RecordCard({ record }: { record: MedicalRecord }) {
  const cfg = TYPE_CONFIG[record.record_type];
  const Icon = cfg.icon;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: cfg.bg }}
      >
        <Icon className="w-5 h-5" style={{ color: cfg.color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="px-2 py-0.5 text-[10px] font-semibold rounded-full"
            style={{ backgroundColor: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>

        <p className="text-sm font-semibold text-[#101828] truncate">
          {record.description || `${cfg.label} record`}
        </p>

        <div className="flex items-center gap-4 mt-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#6A7282]">
            <Calendar className="w-3 h-3" />
            {formatDate(record.createdAt)}
          </div>
          {record.doctor && (
            <div className="flex items-center gap-1.5 text-xs text-[#6A7282]">
              <User className="w-3 h-3" />
              Dr. {record.doctor.first_name} {record.doctor.last_name}
            </div>
          )}
        </div>
      </div>

      {record.file_url && (
        <a
          href={record.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] rounded-xl hover:bg-[#E0F2FE] transition shrink-0"
        >
          <Download className="w-3.5 h-3.5" /> Download
        </a>
      )}
    </div>
  );
}
