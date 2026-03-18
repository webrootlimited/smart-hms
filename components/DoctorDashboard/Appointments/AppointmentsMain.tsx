"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Search, SlidersHorizontal, CalendarDays, Video, MapPin, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import AppointmentsHeader from "./AppointmentsHeader";
import AppointmentCard from "./AppointmentCard";
import type { Appointment, AppointmentStats } from "./types";

const PER_PAGE = 6;

const STATUS_TABS = [
  { key: "ALL", label: "All" },
  { key: "CONFIRMED", label: "Scheduled" },
  { key: "CHECKED_IN", label: "In Progress" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
  { key: "NO_SHOW", label: "No Show" },
];

const MODE_FILTERS = [
  { key: "ALL", label: "All", icon: SlidersHorizontal },
  { key: "PHYSICAL", label: "In-Clinic", icon: MapPin },
  { key: "ONLINE", label: "Telehealth", icon: Video },
];

const DATE_FILTERS = [
  { key: "ALL", label: "All Dates" },
  { key: "TODAY", label: "Today" },
  { key: "TOMORROW", label: "Tomorrow" },
  { key: "THIS_WEEK", label: "This Week" },
];

export default function AppointmentsMain() {
  const params = useParams();
  const doctorSlug = params.doctorName as string;

  const [activeStatus, setActiveStatus] = useState("ALL");
  const [activeMode, setActiveMode] = useState("ALL");
  const [activeDate, setActiveDate] = useState("ALL");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [searchTimer, setSearchTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimer) clearTimeout(searchTimer);
    setSearchTimer(setTimeout(() => { setDebouncedSearch(val); setVisibleCount(PER_PAGE); }, 300));
  };

  const queryParams: Record<string, string> = {};
  if (activeStatus !== "ALL") queryParams.status = activeStatus;
  if (activeMode !== "ALL") queryParams.mode = activeMode;
  if (activeDate !== "ALL") queryParams.date_filter = activeDate;
  if (debouncedSearch) queryParams.search = debouncedSearch;

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.doctorAppointments(queryParams),
    queryFn: () =>
      apiFetch<{ success: boolean; appointments: Appointment[]; stats: AppointmentStats }>(
        "/api/doctor/appointments", queryParams
      ),
  });

  const appointments = data?.appointments || [];
  const stats = data?.stats || { total: 0, today: 0, upcoming: 0, completed: 0, cancelled: 0 };
  const visible = appointments.slice(0, visibleCount);

  const resetFilters = () => {
    setActiveStatus("ALL");
    setActiveMode("ALL");
    setActiveDate("ALL");
    setSearch("");
    setDebouncedSearch("");
    setVisibleCount(PER_PAGE);
  };

  const hasFilters = activeStatus !== "ALL" || activeMode !== "ALL" || activeDate !== "ALL" || debouncedSearch;

  return (
    <div className="space-y-5">
      <AppointmentsHeader stats={stats} />

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
        {/* Status tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveStatus(tab.key); setVisibleCount(PER_PAGE); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeStatus === tab.key ? "bg-[#0284C7] text-white" : "text-[#6A7282] hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Second row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search patient, reason..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
            {MODE_FILTERS.map((m) => (
              <button
                key={m.key}
                onClick={() => { setActiveMode(m.key); setVisibleCount(PER_PAGE); }}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  activeMode === m.key ? "bg-white shadow-sm text-[#101828]" : "text-[#6A7282] hover:text-[#101828]"
                }`}
              >
                <m.icon className="w-3 h-3" /> {m.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
            {DATE_FILTERS.map((d) => (
              <button
                key={d.key}
                onClick={() => { setActiveDate(d.key); setVisibleCount(PER_PAGE); }}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  activeDate === d.key ? "bg-white shadow-sm text-[#101828]" : "text-[#6A7282] hover:text-[#101828]"
                }`}
              >
                {d.key === "ALL" && <CalendarDays className="w-3 h-3" />}
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#6A7282]">
          Showing {visible.length} of {appointments.length} appointments
        </p>
        {hasFilters && (
          <button onClick={resetFilters} className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
            Clear Filters
          </button>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-7 h-7 text-[#0284C7] animate-spin" />
        </div>
      )}

      {/* Cards grid */}
      {!isLoading && visible.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} doctorSlug={doctorSlug} />
          ))}
        </div>
      )}

      {!isLoading && appointments.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
          <CalendarDays className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No appointments found</p>
          <p className="text-xs text-[#6A7282] mt-1">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Load More */}
      {!isLoading && visibleCount < appointments.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PER_PAGE)}
            className="px-6 py-2.5 text-sm font-semibold text-[#0284C7] border border-[#0284C7] rounded-xl hover:bg-[#F0F9FF] transition cursor-pointer"
          >
            Load More Appointments
          </button>
        </div>
      )}
    </div>
  );
}
