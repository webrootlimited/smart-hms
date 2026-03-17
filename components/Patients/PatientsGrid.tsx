import {
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Eye,
} from "lucide-react";
import type { Patient } from "./types";
import PatientCard from "./PatientCard";

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "bg-[#16A34A]",
  INACTIVE: "bg-[#6A7282]",
  SUSPENDED: "bg-[#EF4444]",
};

const statusLabel = (s: string) =>
  s.charAt(0) + s.slice(1).toLowerCase();

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getAge(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

function getInitials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

const AVATAR_COLORS = [
  "bg-[#0284C7]",
  "bg-[#7C3AED]",
  "bg-[#16A34A]",
  "bg-[#EA580C]",
  "bg-[#EF4444]",
  "bg-[#F59E0B]",
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function PatientsGrid({
  patients,
  page,
  totalPages,
  totalResults,
  perPage,
  view,
  onViewChange,
  onPageChange,
}: {
  patients: Patient[];
  page: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
  view: "card" | "list";
  onViewChange: (v: "card" | "list") => void;
  onPageChange: (p: number) => void;
}) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalResults);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-[#101828]">All Patients</h2>
          <p className="text-xs text-[#6A7282]">
            {totalResults} patients registered
          </p>
        </div>
        <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-0.5">
          <button
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              view === "list"
                ? "bg-[#0284C7] text-white"
                : "text-[#6A7282] hover:bg-gray-50"
            }`}
          >
            <List className="w-3.5 h-3.5" /> List View
          </button>
          <button
            onClick={() => onViewChange("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition cursor-pointer ${
              view === "card"
                ? "bg-[#0284C7] text-white"
                : "text-[#6A7282] hover:bg-gray-50"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" /> Card View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        {patients.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-[#6A7282]">No patients found matching your criteria.</p>
          </div>
        ) : view === "card" ? (
          <div className="space-y-4">
            {patients.map((p) => (
              <PatientCard key={p.id} patient={p} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-[#6A7282] uppercase">
                  <th className="text-left font-semibold px-3 py-3">Patient</th>
                  <th className="text-left font-semibold px-3 py-3">Age / Gender</th>
                  <th className="text-left font-semibold px-3 py-3">Contact</th>
                  <th className="text-left font-semibold px-3 py-3">Blood Group</th>
                  <th className="text-left font-semibold px-3 py-3">Status</th>
                  <th className="text-left font-semibold px-3 py-3">Registered</th>
                  <th className="text-left font-semibold px-3 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-gray-50 hover:bg-gray-50/50 transition"
                  >
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${getColor(p.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                        >
                          {getInitials(p.first_name, p.last_name)}
                        </div>
                        <div>
                          <span className="font-semibold text-[#101828]">
                            {p.first_name} {p.last_name}
                          </span>
                          {p.nhs_number && (
                            <p className="text-[10px] text-[#6A7282]">NHS: {p.nhs_number}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#4A5565]">
                      {getAge(p.dob)} yrs / {statusLabel(p.gender)}
                    </td>
                    <td className="px-3 py-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-[#4A5565]">
                          <Phone className="w-3 h-3 shrink-0" /> {p.phone}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#4A5565]">
                          <Mail className="w-3 h-3 shrink-0" /> {p.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      {p.blood_group ? (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FEF2F2] text-[#EF4444]">
                          {p.blood_group}
                        </span>
                      ) : (
                        <span className="text-xs text-[#6A7282]">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status] ?? "bg-gray-400"}`} />
                        {statusLabel(p.status)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#4A5565]">
                      {formatDate(p.createdAt)}
                    </td>
                    <td className="px-3 py-3">
                      <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-[#0284C7] text-white rounded-lg hover:opacity-90 transition cursor-pointer">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalResults > 0 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-[#6A7282]">
            Showing {start}-{end} of {totalResults} patients
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
      )}
    </div>
  );
}
