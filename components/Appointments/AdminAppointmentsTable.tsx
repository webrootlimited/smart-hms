"use client";

import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { AdminAppointment } from "./types";

const AVATAR_COLORS = [
  "bg-[#0284C7]", "bg-[#16A34A]", "bg-[#EA580C]", "bg-[#7C3AED]",
  "bg-[#EF4444]", "bg-[#0891B2]", "bg-[#D946EF]", "bg-[#CA8A04]",
];

const STATUS_STYLES: Record<string, { dot: string; bg: string; text: string }> = {
  CONFIRMED:  { dot: "bg-[#16A34A]", bg: "bg-[#F0FDF4]", text: "text-[#16A34A]" },
  COMPLETED:  { dot: "bg-[#0284C7]", bg: "bg-[#EFF6FF]", text: "text-[#0284C7]" },
  REQUESTED:  { dot: "bg-[#F59E0B]", bg: "bg-[#FFFBEB]", text: "text-[#D97706]" },
  CANCELLED:  { dot: "bg-[#EF4444]", bg: "bg-[#FEF2F2]", text: "text-[#EF4444]" },
  NO_SHOW:    { dot: "bg-[#6B7280]", bg: "bg-[#F3F4F6]", text: "text-[#6B7280]" },
  CHECKED_IN: { dot: "bg-[#7C3AED]", bg: "bg-[#FAF5FF]", text: "text-[#7C3AED]" },
};

const STATUS_LABEL: Record<string, string> = {
  CONFIRMED: "Confirmed", COMPLETED: "Completed", REQUESTED: "Pending",
  CANCELLED: "Cancelled", NO_SHOW: "No Show", CHECKED_IN: "Checked In",
};

function getColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  return name.replace(/^Dr\.\s*/i, "").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
}

export default function AdminAppointmentsTable({
  appointments,
  page,
  totalPages,
  total,
  perPage,
  onPageChange,
}: {
  appointments: AdminAppointment[];
  page: number;
  totalPages: number;
  total: number;
  perPage: number;
  onPageChange: (p: number) => void;
}) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-base font-bold text-[#101828]">All Appointments</h2>
        <p className="text-xs text-[#6A7282]">{total} appointments found</p>
      </div>

      <div className="px-5 pb-3">
        {appointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-3">
              <CalendarDays className="w-6 h-6 text-[#0284C7]" />
            </div>
            <p className="text-sm font-semibold text-[#101828]">No appointments found</p>
            <p className="text-xs text-[#6A7282] mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-[#6A7282] uppercase">
                  <th className="text-left font-semibold px-3 py-3">Patient</th>
                  <th className="text-left font-semibold px-3 py-3">Doctor</th>
                  <th className="text-left font-semibold px-3 py-3">Date & Time</th>
                  <th className="text-left font-semibold px-3 py-3">Type</th>
                  <th className="text-left font-semibold px-3 py-3">Clinic</th>
                  <th className="text-left font-semibold px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => {
                  const st = STATUS_STYLES[a.status] ?? STATUS_STYLES.CONFIRMED;
                  return (
                    <tr key={a.id} className="border-t border-gray-50 hover:bg-gray-50/50 transition cursor-pointer" onClick={() => window.location.href = `/admin/appointments/${a.id}`}>
                      <td className="px-3 py-3">
                        <PersonCell
                          name={a.patient?.name ?? "Unknown"}
                          sub={a.patient?.phone ?? ""}
                          photoUrl={a.patient?.photo_url}
                          id={a.patient?.id ?? a.id}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <PersonCell
                          name={a.doctor?.name ?? "Unknown"}
                          sub={a.doctor?.department ?? ""}
                          photoUrl={a.doctor?.photo_url}
                          id={a.doctor?.id ?? a.id}
                        />
                      </td>
                      <td className="px-3 py-3">
                        <p className="text-xs font-medium text-[#101828]">{formatDate(a.scheduled_at)}</p>
                        <p className="text-xs text-[#6A7282]">{formatTime(a.scheduled_at)} · {a.duration}min</p>
                      </td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          a.appointment_type === "ONLINE"
                            ? "bg-[#EFF6FF] text-[#0284C7]"
                            : "bg-[#F0FDF4] text-[#16A34A]"
                        }`}>
                          {a.appointment_type === "ONLINE" ? "Online" : "In-Person"}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-[#6A7282]">
                        {a.clinic?.name ?? (a.appointment_type === "ONLINE" ? "Virtual" : "—")}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${st.bg} ${st.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                          {STATUS_LABEL[a.status] ?? a.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
          <p className="text-xs text-[#6A7282]">
            Showing {start}-{end} of {total} appointments
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
                  p === page ? "bg-[#0284C7] text-white" : "hover:bg-gray-50 text-[#4A5565]"
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

/* ── Avatar + name cell ── */
function PersonCell({ name, sub, photoUrl, id }: { name: string; sub: string; photoUrl?: string | null; id: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="w-8 h-8 rounded-full object-cover shrink-0" />
      ) : (
        <div className={`w-8 h-8 rounded-full ${getColor(id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
          {getInitials(name)}
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-[#101828] leading-tight">{name}</p>
        {sub && <p className="text-[11px] text-[#6A7282]">{sub}</p>}
      </div>
    </div>
  );
}
