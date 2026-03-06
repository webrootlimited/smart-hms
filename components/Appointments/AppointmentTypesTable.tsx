import {
  Pencil,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Heart,
  Video,
  ClipboardCheck,
  Baby,
  Brain,
  Syringe,
  FlaskConical,
  Bone,
  Eye,
  Microscope,
  Pill,
  Thermometer,
} from "lucide-react";
import type { AppointmentType } from "./types";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Stethoscope, Heart, Video, ClipboardCheck, Baby, Brain,
  Syringe, FlaskConical, Bone, Eye, Microscope, Pill, Thermometer,
};

const modeBadge = (mode: string) => {
  const map: Record<string, string> = {
    "In-Person": "bg-[#EFF6FF] text-[#0284C7]",
    Telehealth: "bg-[#F0FDF4] text-[#16A34A]",
  };
  return map[mode] ?? "bg-gray-100 text-[#6A7282]";
};

export default function AppointmentTypesTable({
  types,
  page,
  totalPages,
  totalResults,
  perPage,
  showEmptySlots,
  onToggleEmptySlots,
  onPageChange,
  onEdit,
  onCopy,
  onDelete,
}: {
  types: AppointmentType[];
  page: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
  showEmptySlots: boolean;
  onToggleEmptySlots: () => void;
  onPageChange: (p: number) => void;
  onEdit: (t: AppointmentType) => void;
  onCopy: (t: AppointmentType) => void;
  onDelete: (t: AppointmentType) => void;
}) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalResults);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#101828]">
            All Appointment Types
          </h2>
          <p className="text-xs text-[#6A7282]">
            {totalResults} types configured
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6A7282]">Toggle Empty Slots</span>
          <button
            type="button"
            onClick={onToggleEmptySlots}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
              showEmptySlots ? "bg-[#0284C7]" : "bg-gray-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                showEmptySlots ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-gray-100 text-xs text-[#6A7282] uppercase">
              <th className="text-left font-semibold px-5 py-3">Type Name</th>
              <th className="text-left font-semibold px-3 py-3">Duration</th>
              <th className="text-left font-semibold px-3 py-3">Mode</th>
              <th className="text-left font-semibold px-3 py-3">Status</th>
              <th className="text-left font-semibold px-3 py-3">Fee</th>
              <th className="text-left font-semibold px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((t) => {
              const Icon = ICON_MAP[t.icon];
              return (
                <tr
                  key={t.id}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${t.bg}`}>
                        {Icon && <Icon className={`w-4 h-4 ${t.color}`} />}
                      </div>
                      <div>
                        <p className="font-semibold text-[#101828]">{t.name}</p>
                        <p className="text-xs text-[#6A7282]">{t.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-[#4A5565]">{t.duration} mins</td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-1">
                      {t.mode === "Both" ? (
                        <>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeBadge("In-Person")}`}>
                            In-Person
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeBadge("Telehealth")}`}>
                            Telehealth
                          </span>
                        </>
                      ) : (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${modeBadge(t.mode)}`}>
                          {t.mode}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-1.5 text-xs font-medium">
                      <span className={`w-1.5 h-1.5 rounded-full ${t.status === "Active" ? "bg-[#16A34A]" : "bg-[#EF4444]"}`} />
                      {t.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-semibold text-[#101828]">
                    £{t.fee}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onEdit(t)} className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <Pencil className="w-3.5 h-3.5 text-[#6A7282]" />
                      </button>
                      <button onClick={() => onCopy(t)} className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <Copy className="w-3.5 h-3.5 text-[#6A7282]" />
                      </button>
                      <button onClick={() => onDelete(t)} className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5 text-[#6A7282]" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-[#6A7282]">
          Showing {start}-{end} of {totalResults} types
        </p>
        <div className="flex items-center gap-1">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft className="w-3.5 h-3.5 inline" /> Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 text-xs font-medium rounded-lg transition cursor-pointer ${
                p === page
                  ? "bg-[#0284C7] text-white"
                  : "hover:bg-gray-50 text-[#4A5565]"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 transition cursor-pointer disabled:cursor-default"
          >
            Next <ChevronRight className="w-3.5 h-3.5 inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
