"use client";

import { FileText, FileImage, Download, Eye, Trash2, Calendar, User } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDelete } from "@/lib/api";
import type { DocumentRecord } from "./types";

const FILE_STYLES: Record<string, { color: string; bg: string }> = {
  pdf: { color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
  dcm: { color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
  default: { color: "text-[#6A7282]", bg: "bg-gray-100" },
};

const TYPE_LABELS: Record<string, string> = {
  CONSULTATION: "Consultation",
  LAB_REPORT: "Lab Report",
  XRAY: "Imaging",
  FILE: "File",
};

function getExt(name: string | null) {
  if (!name) return "file";
  return name.split(".").pop()?.toLowerCase() || "file";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default function DocumentRow({ record }: { record: DocumentRecord }) {
  const queryClient = useQueryClient();
  const ext = getExt(record.file_name);
  const style = FILE_STYLES[ext] || FILE_STYLES.default;
  const patientName = `${record.patient.first_name} ${record.patient.last_name}`;

  const deleteMutation = useMutation({
    mutationFn: () => apiDelete(`/api/doctor/documents/${record.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor", "documents"] });
    },
  });

  return (
    <div className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
          {ext === "dcm" ? (
            <FileImage className={`w-4 h-4 ${style.color}`} />
          ) : (
            <FileText className={`w-4 h-4 ${style.color}`} />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#101828] truncate">
            {record.file_name || record.description || "Untitled"}
          </p>
          <p className="text-[10px] text-[#6A7282]">
            {patientName} &bull; {TYPE_LABELS[record.record_type] || record.record_type}
            {record.appointment && (
              <> &bull; {formatDate(record.appointment.scheduled_at)}</>
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <span className="text-[11px] text-[#6A7282] hidden sm:block">{formatDate(record.createdAt)}</span>
        {record.file_size && (
          <span className="text-[11px] text-[#6A7282] w-16 text-right hidden sm:block">{record.file_size}</span>
        )}
        <div className="flex items-center gap-1">
          {record.file_url && (
            <>
              <a
                href={record.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center"
              >
                <Eye className="w-3.5 h-3.5 text-[#6A7282]" />
              </a>
              <a
                href={record.file_url}
                download
                className="w-7 h-7 rounded-lg hover:bg-gray-200 flex items-center justify-center"
              >
                <Download className="w-3.5 h-3.5 text-[#6A7282]" />
              </a>
            </>
          )}
          <button
            onClick={() => {
              if (confirm("Delete this document?")) deleteMutation.mutate();
            }}
            disabled={deleteMutation.isPending}
            className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5 text-[#EF4444]" />
          </button>
        </div>
      </div>
    </div>
  );
}
