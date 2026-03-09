"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Search, SlidersHorizontal, CalendarDays, Video, MapPin } from "lucide-react";
import AppointmentsHeader from "./AppointmentsHeader";
import AppointmentCard from "./AppointmentCard";
import { APPOINTMENTS, STATUS_TABS } from "./mockData";
import type { AppointmentMode } from "./types";

const PER_PAGE = 6;
const MODE_FILTERS: ("All" | AppointmentMode)[] = ["All", "In-Clinic", "Telehealth"];
const DATE_FILTERS = ["All Dates", "Today", "Tomorrow", "This Week"] as const;

export default function AppointmentsMain() {
  const params = useParams();
  const doctorSlug = params.doctorName as string;

  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [activeMode, setActiveMode] = useState<string>("All");
  const [activeDate, setActiveDate] = useState<string>("All Dates");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    let list = APPOINTMENTS;

    // Status filter
    if (activeStatus !== "All") {
      list = list.filter((a) => a.status === activeStatus);
    }

    // Mode filter
    if (activeMode !== "All") {
      list = list.filter((a) => a.mode === activeMode);
    }

    // Date filter
    if (activeDate === "Today") {
      list = list.filter((a) => a.date === "2025-12-10");
    } else if (activeDate === "Tomorrow") {
      list = list.filter((a) => a.date === "2025-12-11");
    } else if (activeDate === "This Week") {
      list = list.filter((a) => a.date >= "2025-12-08" && a.date <= "2025-12-14");
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.patientId.toLowerCase().includes(q) ||
          a.type.toLowerCase().includes(q) ||
          a.reason.toLowerCase().includes(q) ||
          a.id.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeStatus, activeMode, activeDate, search]);

  const visible = filtered.slice(0, visibleCount);

  const resetFilters = () => {
    setActiveStatus("All");
    setActiveMode("All");
    setActiveDate("All Dates");
    setSearch("");
    setVisibleCount(PER_PAGE);
  };

  return (
    <div className="space-y-5">
      <AppointmentsHeader />

      {/* Filter bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm space-y-3">
        {/* Status tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveStatus(tab); setVisibleCount(PER_PAGE); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeStatus === tab
                  ? "bg-[#0284C7] text-white"
                  : "text-[#6A7282] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Second row: search + mode + date */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search patient, ID, type..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PER_PAGE); }}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>

          {/* Mode filter */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
            {MODE_FILTERS.map((mode) => (
              <button
                key={mode}
                onClick={() => { setActiveMode(mode); setVisibleCount(PER_PAGE); }}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  activeMode === mode
                    ? "bg-white shadow-sm text-[#101828]"
                    : "text-[#6A7282] hover:text-[#101828]"
                }`}
              >
                {mode === "Telehealth" && <Video className="w-3 h-3" />}
                {mode === "In-Clinic" && <MapPin className="w-3 h-3" />}
                {mode === "All" && <SlidersHorizontal className="w-3 h-3" />}
                {mode}
              </button>
            ))}
          </div>

          {/* Date filter */}
          <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
            {DATE_FILTERS.map((d) => (
              <button
                key={d}
                onClick={() => { setActiveDate(d); setVisibleCount(PER_PAGE); }}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                  activeDate === d
                    ? "bg-white shadow-sm text-[#101828]"
                    : "text-[#6A7282] hover:text-[#101828]"
                }`}
              >
                {d === "All Dates" && <CalendarDays className="w-3 h-3" />}
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#6A7282]">
          Showing {visible.length} of {filtered.length} appointments
        </p>
        {(activeStatus !== "All" || activeMode !== "All" || activeDate !== "All Dates" || search) && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Cards grid */}
      {visible.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visible.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} doctorSlug={doctorSlug} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
          <CalendarDays className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No appointments found</p>
          <p className="text-xs text-[#6A7282] mt-1">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Load More */}
      {visibleCount < filtered.length && (
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
