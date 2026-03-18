import Link from "next/link";
import { CalendarDays, Clock, Video, MapPin, Eye, ArrowRight } from "lucide-react";
import type { Appointment } from "./types";

const STATUS_LABELS: Record<string, string> = {
  REQUESTED: "Pending",
  CONFIRMED: "Scheduled",
  CHECKED_IN: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: "bg-[#F0F9FF]", color: "text-[#0284C7]" },
  REQUESTED: { bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
  CHECKED_IN: { bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
  COMPLETED: { bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
  CANCELLED: { bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
  NO_SHOW: { bg: "bg-[#FAF5FF]", color: "text-[#7C3AED]" },
};

const COLORS = ["#0284C7", "#7C3AED", "#059669", "#EA580C", "#0891B2", "#D946EF", "#CA8A04", "#DC2626"];
function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
}

export default function AppointmentCard({
  appointment,
  doctorSlug,
}: {
  appointment: Appointment;
  doctorSlug: string;
}) {
  const statusStyle = STATUS_STYLES[appointment.status] || STATUS_STYLES.CONFIRMED;
  const detailHref = `/doctor/${doctorSlug}/appointments/${appointment.id}`;
  const isOnline = appointment.appointment_type === "ONLINE";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition">
      {/* Top: Patient + Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
            style={{ backgroundColor: getColor(appointment.patientName) }}
          >
            {appointment.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-[#101828]">{appointment.patientName}</p>
            <p className="text-[11px] text-[#6A7282]">
              {appointment.age ? `${appointment.age} yrs` : "—"}
              {appointment.gender ? `, ${appointment.gender}` : ""}
            </p>
          </div>
        </div>
        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${statusStyle.bg} ${statusStyle.color}`}>
          {STATUS_LABELS[appointment.status] || appointment.status}
        </span>
      </div>

      {/* Reason */}
      <div className="mb-3">
        <p className="text-[11px] text-[#6A7282] mt-0.5 line-clamp-1">{appointment.reason || "No reason specified"}</p>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <CalendarDays className="w-3 h-3 text-[#6A7282]" />
          <span className="text-[11px] text-[#4A5565]">{formatDate(appointment.scheduled_at)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#6A7282]" />
          <span className="text-[11px] text-[#4A5565]">{formatTime(appointment.scheduled_at)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {isOnline ? (
            <Video className="w-3 h-3 text-[#0284C7]" />
          ) : (
            <MapPin className="w-3 h-3 text-[#16A34A]" />
          )}
          <span className={`text-[11px] font-medium ${isOnline ? "text-[#0284C7]" : "text-[#16A34A]"}`}>
            {isOnline ? "Telehealth" : "In-Clinic"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <Link
          href={detailHref}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition"
        >
          <Eye className="w-3.5 h-3.5" /> View Details
        </Link>
        {appointment.status === "CONFIRMED" && isOnline && (
          <Link
            href={detailHref}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition"
          >
            <Video className="w-3.5 h-3.5" /> Join Call
          </Link>
        )}
        {appointment.status === "CHECKED_IN" && (
          <Link
            href={detailHref}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition"
          >
            <ArrowRight className="w-3.5 h-3.5" /> Continue
          </Link>
        )}
      </div>
    </div>
  );
}
