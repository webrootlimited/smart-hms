"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search,
  CalendarDays,
  Clock,
  MapPin,
  Video,
  Plus,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { appointments, STATUS_OPTIONS } from "./mockData";
import type { AppointmentStatus } from "./types";

const statusConfig: Record<
  AppointmentStatus,
  { bg: string; text: string; dot: string }
> = {
  Confirmed: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", dot: "bg-[#16A34A]" },
  Pending: { bg: "bg-[#FFFBEB]", text: "text-[#CA8A04]", dot: "bg-[#CA8A04]" },
  Completed: { bg: "bg-[#EFF6FF]", text: "text-[#0284C7]", dot: "bg-[#0284C7]" },
  Cancelled: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", dot: "bg-[#EF4444]" },
  "No Show": { bg: "bg-gray-100", text: "text-[#6A7282]", dot: "bg-[#6A7282]" },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AppointmentsMain() {
  const params = useParams();
  const base = `/patient/${params.patientName}`;
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      const matchStatus =
        activeStatus === "All" || apt.status === activeStatus;
      const matchSearch =
        !search ||
        apt.doctor.name.toLowerCase().includes(search.toLowerCase()) ||
        apt.reason.toLowerCase().includes(search.toLowerCase()) ||
        apt.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [activeStatus, search]);

  const upcoming = filtered.filter(
    (a) => a.status === "Confirmed" || a.status === "Pending"
  );
  const past = filtered.filter(
    (a) =>
      a.status === "Completed" ||
      a.status === "Cancelled" ||
      a.status === "No Show"
  );

  const stats = {
    total: appointments.length,
    upcoming: appointments.filter(
      (a) => a.status === "Confirmed" || a.status === "Pending"
    ).length,
    completed: appointments.filter((a) => a.status === "Completed").length,
    cancelled: appointments.filter(
      (a) => a.status === "Cancelled" || a.status === "No Show"
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Appointments</h1>
          <p className="text-sm text-[#6A7282] mt-0.5">
            View and manage all your appointments
          </p>
        </div>
        <Link
          href={`${base}/book-appointment`}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          Book Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: CalendarDays,
            bg: "bg-[#F0F9FF]",
            color: "#0284C7",
          },
          {
            label: "Upcoming",
            value: stats.upcoming,
            icon: Clock,
            bg: "bg-[#F0FDF4]",
            color: "#16A34A",
          },
          {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            bg: "bg-[#EFF6FF]",
            color: "#0284C7",
          },
          {
            label: "Cancelled",
            value: stats.cancelled,
            icon: XCircle,
            bg: "bg-[#FEF2F2]",
            color: "#EF4444",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#101828]">{s.value}</p>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeStatus === st
                  ? "bg-[#0284C7] text-white"
                  : "bg-gray-50 text-[#4A5565] hover:bg-gray-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white w-60 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-[#6A7282] uppercase tracking-wide mb-3">
            Upcoming
          </h2>
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <AppointmentRow key={apt.id} apt={apt} />
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      {past.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-[#6A7282] uppercase tracking-wide mb-3">
            Past
          </h2>
          <div className="space-y-3">
            {past.map((apt) => (
              <AppointmentRow key={apt.id} apt={apt} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-[#6A7282]">No appointments found</p>
        </div>
      )}
    </div>
  );
}

function AppointmentRow({
  apt,
}: {
  apt: (typeof appointments)[number];
}) {
  const st = statusConfig[apt.status];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between flex-wrap gap-4 hover:shadow-md transition">
      {/* Doctor info */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: apt.doctor.color }}
        >
          {apt.doctor.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#101828]">
            {apt.doctor.name}
          </p>
          <p className="text-xs text-[#6A7282]">{apt.doctor.specialty}</p>
        </div>
      </div>

      {/* Reason */}
      <div className="min-w-[140px]">
        <p className="text-xs text-[#6A7282]">Reason</p>
        <p className="text-sm font-medium text-[#101828]">{apt.reason}</p>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-[#4A5565]">
          <CalendarDays className="w-3.5 h-3.5 text-[#6A7282]" />
          {formatDate(apt.date)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[#4A5565]">
          <Clock className="w-3.5 h-3.5 text-[#6A7282]" />
          {apt.time}
        </div>
      </div>

      {/* Mode */}
      <div className="flex items-center gap-1.5">
        {apt.mode === "Video Call" ? (
          <Video className="w-3.5 h-3.5 text-[#7C3AED]" />
        ) : (
          <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
        )}
        <span className="text-xs text-[#4A5565]">{apt.mode}</span>
      </div>

      {/* Status */}
      <span
        className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${st.bg} ${st.text}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
        {apt.status}
      </span>

      {/* Actions */}
      <button className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
        <MoreVertical className="w-4 h-4 text-[#6A7282]" />
      </button>
    </div>
  );
}
