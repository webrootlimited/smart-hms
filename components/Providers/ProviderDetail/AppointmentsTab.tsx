"use client";

import { CalendarDays, Clock } from "lucide-react";
import type { DoctorDetail, RecentAppointment } from "./types";

const STATUS_STYLES: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  CONFIRMED:  { dot: "bg-[#16A34A]", bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", label: "Confirmed" },
  COMPLETED:  { dot: "bg-[#0284C7]", bg: "bg-[#EFF6FF]", text: "text-[#0284C7]", label: "Completed" },
  REQUESTED:  { dot: "bg-[#F59E0B]", bg: "bg-[#FFFBEB]", text: "text-[#D97706]", label: "Pending" },
  CANCELLED:  { dot: "bg-[#EF4444]", bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", label: "Cancelled" },
  NO_SHOW:    { dot: "bg-[#6B7280]", bg: "bg-[#F3F4F6]", text: "text-[#6B7280]", label: "No Show" },
  CHECKED_IN: { dot: "bg-[#7C3AED]", bg: "bg-[#FAF5FF]", text: "text-[#7C3AED]", label: "Checked In" },
};

export default function AppointmentsTab({ doctor }: { doctor: DoctorDetail }) {
  const { stats, recentAppointments } = doctor;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total", value: stats.totalAppointments, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
          { label: "Completed", value: stats.completedAppointments, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
          { label: "Upcoming", value: stats.upcomingAppointments, bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
          { label: "Cancelled", value: stats.cancelledAppointments, bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
          { label: "Patients", value: stats.totalPatients, bg: "bg-[#FAF5FF]", color: "text-[#7C3AED]" },
        ].map((s) => (
          <div key={s.label} className={`p-4 rounded-2xl ${s.bg}`}>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#6A7282] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <CalendarDays className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Recent Appointments</h2>
        </div>

        {recentAppointments.length === 0 ? (
          <div className="text-center py-8">
            <CalendarDays className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-[#6A7282]">No appointments yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentAppointments.map((appt) => (
              <AppointmentRow key={appt.id} appt={appt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AppointmentRow({ appt }: { appt: RecentAppointment }) {
  const st = STATUS_STYLES[appt.status] ?? STATUS_STYLES.CONFIRMED;
  const date = new Date(appt.scheduled_at);

  return (
    <div
      className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100/60 transition cursor-pointer"
      onClick={() => window.location.href = `/admin/appointments/${appt.id}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
          <CalendarDays className="w-4 h-4 text-[#0284C7]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#101828]">
            {appt.patient?.name ?? "Unknown Patient"}
          </p>
          <div className="flex items-center gap-2 text-xs text-[#6A7282]">
            <span>
              {date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
            </span>
            <Clock className="w-3 h-3" />
            <span>
              {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase()}
            </span>
            {appt.reason && (
              <>
                <span>·</span>
                <span className="truncate max-w-[150px]">{appt.reason}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          appt.appointment_type === "ONLINE" ? "bg-[#EFF6FF] text-[#0284C7]" : "bg-[#F0FDF4] text-[#16A34A]"
        }`}>
          {appt.appointment_type === "ONLINE" ? "Online" : "In-Person"}
        </span>
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${st.bg} ${st.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
          {st.label}
        </span>
      </div>
    </div>
  );
}
