"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search,
  CalendarDays,
  Clock,
  Video,
  MapPin,
  Plus,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

const STATUS_OPTIONS = ["ALL", "CONFIRMED", "REQUESTED", "COMPLETED", "CANCELLED", "NO_SHOW"] as const;

const STATUS_LABELS: Record<string, string> = {
  ALL: "All",
  CONFIRMED: "Confirmed",
  REQUESTED: "Pending",
  CHECKED_IN: "Checked In",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  CONFIRMED: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", dot: "bg-[#16A34A]" },
  REQUESTED: { bg: "bg-[#FFFBEB]", text: "text-[#CA8A04]", dot: "bg-[#CA8A04]" },
  CHECKED_IN: { bg: "bg-[#F0F9FF]", text: "text-[#0284C7]", dot: "bg-[#0284C7]" },
  COMPLETED: { bg: "bg-[#EFF6FF]", text: "text-[#0284C7]", dot: "bg-[#0284C7]" },
  CANCELLED: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", dot: "bg-[#EF4444]" },
  NO_SHOW: { bg: "bg-gray-100", text: "text-[#6A7282]", dot: "bg-[#6A7282]" },
};

interface Appointment {
  id: string;
  doctor: { name: string; specialty: string; initials: string; photo_url: string | null };
  clinic: string | null;
  date: string;
  appointment_type: "ONLINE" | "PHYSICAL";
  duration: number;
  status: string;
  reason: string;
}

interface StatsData {
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).toUpperCase();
}

// Color palette for doctor initials
const COLORS = ["#0284C7", "#7C3AED", "#059669", "#EA580C", "#0891B2", "#D946EF", "#CA8A04", "#DC2626"];
function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function AppointmentsMain() {
  const params = useParams();
  const base = `/patient/${params.patientName}`;
  const [activeStatus, setActiveStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  const searchTimer = useState<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimer[0]) clearTimeout(searchTimer[0]);
    searchTimer[1](setTimeout(() => setDebouncedSearch(val), 300));
  };

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.patientAppointments(activeStatus, debouncedSearch),
    queryFn: async () => {
      const params: Record<string, string> = {};
      if (activeStatus !== "ALL") params.status = activeStatus;
      if (debouncedSearch) params.search = debouncedSearch;
      return apiFetch<{ success: boolean; appointments: Appointment[]; stats: StatsData }>(
        "/api/patient/appointments", params
      );
    },
  });

  const appointments = data?.appointments || [];
  const stats = data?.stats || { total: 0, upcoming: 0, completed: 0, cancelled: 0 };

  const upcoming = appointments.filter((a) => a.status === "CONFIRMED" || a.status === "REQUESTED");
  const past = appointments.filter((a) => a.status === "COMPLETED" || a.status === "CANCELLED" || a.status === "NO_SHOW");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Appointments</h1>
          <p className="text-sm text-[#6A7282] mt-0.5">View and manage all your appointments</p>
        </div>
        <Link
          href={`${base}/book-appointment`}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Book Appointment
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: stats.total, icon: CalendarDays, bg: "bg-[#F0F9FF]", color: "#0284C7" },
          { label: "Upcoming", value: stats.upcoming, icon: Clock, bg: "bg-[#F0FDF4]", color: "#16A34A" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, bg: "bg-[#EFF6FF]", color: "#0284C7" },
          { label: "Cancelled", value: stats.cancelled, icon: XCircle, bg: "bg-[#FEF2F2]", color: "#EF4444" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
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
                activeStatus === st ? "bg-[#0284C7] text-white" : "bg-gray-50 text-[#4A5565] hover:bg-gray-100"
              }`}
            >
              {STATUS_LABELS[st] || st}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-white w-60 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-7 h-7 text-[#0284C7] animate-spin" />
        </div>
      )}

      {/* Upcoming */}
      {!isLoading && upcoming.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-[#6A7282] uppercase tracking-wide mb-3">Upcoming</h2>
          <div className="space-y-3">
            {upcoming.map((apt) => (
              <AppointmentRow key={apt.id} apt={apt} base={base} />
            ))}
          </div>
        </section>
      )}

      {/* Past */}
      {!isLoading && past.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-[#6A7282] uppercase tracking-wide mb-3">Past</h2>
          <div className="space-y-3">
            {past.map((apt) => (
              <AppointmentRow key={apt.id} apt={apt} base={base} />
            ))}
          </div>
        </section>
      )}

      {!isLoading && appointments.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-[#6A7282]">No appointments found</p>
        </div>
      )}
    </div>
  );
}

function AppointmentRow({ apt, base }: { apt: Appointment; base: string }) {
  const st = statusConfig[apt.status] || statusConfig.CONFIRMED;
  const color = getColor(apt.doctor.name);

  return (
    <Link href={`${base}/appointments/${apt.id}`} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between flex-wrap gap-4 hover:shadow-md transition cursor-pointer">
      {/* Doctor info */}
      <div className="flex items-center gap-3 min-w-[220px]">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: color }}
        >
          {apt.doctor.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#101828]">{apt.doctor.name}</p>
          <p className="text-xs text-[#6A7282]">{apt.doctor.specialty}</p>
        </div>
      </div>

      {/* Reason */}
      <div className="min-w-[140px]">
        <p className="text-xs text-[#6A7282]">Reason</p>
        <p className="text-sm font-medium text-[#101828]">{apt.reason || "—"}</p>
      </div>

      {/* Date & Time */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-[#4A5565]">
          <CalendarDays className="w-3.5 h-3.5 text-[#6A7282]" />
          {formatDate(apt.date)}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-[#4A5565]">
          <Clock className="w-3.5 h-3.5 text-[#6A7282]" />
          {formatTime(apt.date)}
        </div>
      </div>

      {/* Mode */}
      <div className="flex items-center gap-1.5">
        {apt.appointment_type === "ONLINE" ? (
          <Video className="w-3.5 h-3.5 text-[#7C3AED]" />
        ) : (
          <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
        )}
        <span className="text-xs text-[#4A5565]">
          {apt.appointment_type === "ONLINE" ? "Video Call" : "In-Person"}
        </span>
      </div>

      {/* Status */}
      <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 ${st.bg} ${st.text}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
        {STATUS_LABELS[apt.status] || apt.status}
      </span>
    </Link>
  );
}
