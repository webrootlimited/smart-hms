import {
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";
import type { Provider } from "./types";
import ProviderCard from "./ProviderCard";

const AVATAR_COLORS = [
  "bg-[#0284C7]",
  "bg-[#16A34A]",
  "bg-[#EA580C]",
  "bg-[#7C3AED]",
  "bg-[#EF4444]",
  "bg-[#0891B2]",
  "bg-[#D946EF]",
  "bg-[#CA8A04]",
];

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active",
  ON_LEAVE: "On Leave",
  INACTIVE: "Inactive",
};

const STATUS_DOT: Record<string, string> = {
  ACTIVE: "bg-[#16A34A]",
  ON_LEAVE: "bg-[#F59E0B]",
  INACTIVE: "bg-[#EF4444]",
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function getAvatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ProvidersGrid({
  providers,
  page,
  totalPages,
  totalResults,
  perPage,
  view,
  onViewChange,
  onPageChange,
}: {
  providers: Provider[];
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
          <h2 className="text-base font-bold text-[#101828]">All Providers</h2>
          <p className="text-xs text-[#6A7282]">
            {totalResults} providers registered
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
        {providers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-3">
              <Stethoscope className="w-6 h-6 text-[#0284C7]" />
            </div>
            <p className="text-sm font-semibold text-[#101828]">No providers found</p>
            <p className="text-xs text-[#6A7282] mt-1">Try adjusting your filters</p>
          </div>
        ) : view === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-[#6A7282] uppercase">
                  <th className="text-left font-semibold px-3 py-3">Provider</th>
                  <th className="text-left font-semibold px-3 py-3">Specialty</th>
                  <th className="text-left font-semibold px-3 py-3">Department</th>
                  <th className="text-left font-semibold px-3 py-3">Status</th>
                  <th className="text-left font-semibold px-3 py-3">Experience</th>
                  <th className="text-left font-semibold px-3 py-3">Fee</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-gray-50 hover:bg-gray-50/50 transition cursor-pointer"
                  >
                    <td className="px-3 py-3">
                      <Link href={`/admin/providers/${p.id}`} className="flex items-center gap-3">
                        {p.photo_url ? (
                          <img
                            src={p.photo_url}
                            alt={`${p.first_name} ${p.last_name}`}
                            className="w-8 h-8 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div
                            className={`w-8 h-8 rounded-full ${getAvatarColor(p.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                          >
                            {getInitials(p.first_name, p.last_name)}
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-[#101828]">
                            Dr. {p.first_name} {p.last_name}
                          </span>
                          {p.email && (
                            <p className="text-xs text-[#6A7282]">{p.email}</p>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#0284C7]">
                        {p.specialization}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#6A7282]">
                      {p.department || "—"}
                    </td>
                    <td className="px-3 py-3">
                      <span className="flex items-center gap-1.5 text-xs font-medium">
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status] ?? "bg-gray-400"}`} />
                        {STATUS_LABEL[p.status] ?? p.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-xs text-[#4A5565] font-medium">
                      {p.experience_years} yrs
                    </td>
                    <td className="px-3 py-3 text-xs text-[#4A5565] font-medium">
                      £{p.consultation_fee}
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
            Showing {start}-{end} of {totalResults} providers
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
