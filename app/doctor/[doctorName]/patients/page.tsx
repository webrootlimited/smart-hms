"use client";

import { useState } from "react";
import {
  Search,
  Users,
  CalendarDays,
  MapPin,
  Video,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface DoctorPatient {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  gender: string;
  age: number | null;
  blood_group: string;
  photo_url: string;
  totalAppointments: number;
  lastAppointment: {
    date: string;
    type: string;
    status: string;
  } | null;
}

interface Response {
  success: boolean;
  patients: DoctorPatient[];
  total: number;
  page: number;
  totalPages: number;
}

const AVATAR_COLORS = [
  "#F59E0B", "#EF4444", "#7C3AED", "#0284C7", "#16A34A", "#EA580C",
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function DoctorPatientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const params: Record<string, string | number> = { page };
  if (search) params.search = search;

  const { data, isLoading } = useQuery<Response>({
    queryKey: queryKeys.doctorPatients(params),
    queryFn: () => apiFetch("/api/doctor/patients", params as Record<string, string>),
  });

  const patients = data?.patients || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Patients</h1>
          <p className="text-sm text-[#6A7282]">Patients you&apos;ve had appointments with</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white w-56 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-lg font-bold text-[#0284C7]">{total}</p>
          <p className="text-xs text-[#6A7282]">Total Patients</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-lg font-bold text-[#16A34A]">
            {patients.filter((p) => p.lastAppointment?.status === "CONFIRMED").length}
          </p>
          <p className="text-xs text-[#6A7282]">Active (Confirmed)</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-lg font-bold text-[#7C3AED]">
            {patients.filter((p) => p.lastAppointment?.status === "COMPLETED").length}
          </p>
          <p className="text-xs text-[#6A7282]">Completed</p>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
        </div>
      )}

      {/* Empty */}
      {!isLoading && patients.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <Users className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No patients found</p>
          <p className="text-xs text-[#6A7282] mt-1">
            {search ? "Try a different search term" : "Patients will appear here after appointments"}
          </p>
        </div>
      )}

      {/* Patient cards */}
      {!isLoading && patients.length > 0 && (
        <div className="space-y-3">
          {patients.map((p) => {
            const color = getColor(p.id);
            return (
              <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {p.photo_url ? (
                      <img src={p.photo_url} alt="" className="w-11 h-11 rounded-full object-cover shrink-0" />
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {p.initials}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#101828]">{p.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        {p.age !== null && (
                          <span className="text-xs text-[#6A7282]">{p.age} yrs</span>
                        )}
                        {p.gender && (
                          <span className="text-xs text-[#6A7282]">{p.gender}</span>
                        )}
                        {p.blood_group && (
                          <span className="text-[10px] font-semibold text-[#EF4444] bg-[#FEF2F2] px-1.5 py-0.5 rounded">
                            {p.blood_group}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0284C7]">
                      {p.totalAppointments} visit{p.totalAppointments !== 1 ? "s" : ""}
                    </p>
                    {p.lastAppointment && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        p.lastAppointment.status === "CONFIRMED" ? "bg-[#F0FDF4] text-[#16A34A]" :
                        p.lastAppointment.status === "COMPLETED" ? "bg-[#F0F9FF] text-[#0284C7]" :
                        p.lastAppointment.status === "CANCELLED" ? "bg-[#FEF2F2] text-[#EF4444]" :
                        "bg-gray-100 text-[#6A7282]"
                      }`}>
                        {p.lastAppointment.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Details row */}
                <div className="flex items-center gap-5 mt-3 pt-3 border-t border-gray-100 text-xs text-[#6A7282]">
                  {p.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {p.phone}
                    </span>
                  )}
                  {p.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {p.email}
                    </span>
                  )}
                  {p.lastAppointment && (
                    <span className="flex items-center gap-1 ml-auto">
                      <CalendarDays className="w-3 h-3" />
                      Last: {formatDate(p.lastAppointment.date)}
                      <span className="ml-1">
                        {p.lastAppointment.type === "PHYSICAL" ? (
                          <span className="inline-flex items-center gap-0.5"><MapPin className="w-3 h-3" /> In-Person</span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5"><Video className="w-3 h-3" /> Online</span>
                        )}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer ${
                p === page ? "bg-[#0284C7] text-white" : "text-[#6A7282] hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
