"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { patients, STATUSES } from "./mockData";
import PatientsHeader from "./PatientsHeader";
import PatientCard from "./PatientCard";

const PER_PAGE = 4;

export default function PatientsMain() {
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState("All Patients");
  const [visible, setVisible] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    let result = patients;
    if (activeStatus !== "All Patients") {
      result = result.filter((p) => p.status === activeStatus);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.patientId.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeStatus]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const newThisMonth = 124;
  const appointmentsToday = 456;

  return (
    <div className="space-y-5">
      <PatientsHeader
        totalPatients={patients.length > 1000 ? patients.length : 2847}
        newThisMonth={newThisMonth}
        appointmentsToday={appointmentsToday}
        growthRate="+18%"
      />

      {/* Search + Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7282]" />
          <input
            type="text"
            placeholder="Search by name, ID, phone, or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setVisible(PER_PAGE); }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {["All Patients", ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => { setActiveStatus(s); setVisible(PER_PAGE); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                activeStatus === s
                  ? "bg-[#0284C7] text-white"
                  : "bg-gray-100 text-[#6A7282] hover:bg-gray-200"
              }`}
            >
              {s}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Filter className="w-3 h-3" /> More Filters
          </button>
        </div>
      </div>

      {/* Patient cards */}
      <div className="space-y-4">
        {shown.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PER_PAGE)}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            <Loader2 className="w-4 h-4" /> Load More Patients
          </button>
        </div>
      )}

      {shown.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm text-center">
          <p className="text-sm text-[#6A7282]">No patients found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
