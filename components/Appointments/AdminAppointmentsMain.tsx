"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CalendarDays, Clock, CheckCircle2, XCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { AdminAppointmentsResponse } from "./types";
import AdminAppointmentsFilters, { type Filters, emptyFilters } from "./AdminAppointmentsFilters";
import AdminAppointmentsTable from "./AdminAppointmentsTable";

const PER_PAGE = 8;

export default function AdminAppointmentsMain() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);

  const params: Record<string, string | number> = { page, limit: PER_PAGE };
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;
  if (filters.type) params.type = filters.type;

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.adminAppointments(params),
    queryFn: () =>
      apiFetch<AdminAppointmentsResponse>("/api/admin/appointments", params as Record<string, string>),
  });

  const appointments = data?.appointments ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: PER_PAGE, total: 0, totalPages: 1 };

  const handleFilterChange = (f: Filters) => { setFilters(f); setPage(1); };

  // Quick stats from current page context
  const total = pagination.total;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Appointments</h1>
        <p className="text-sm text-[#6A7282]">Manage and monitor all appointments across the system</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Total" value={total} color="#0284C7" bg="#EFF6FF" />
        <StatCard icon={CheckCircle2} label="Confirmed" value="—" color="#16A34A" bg="#F0FDF4" />
        <StatCard icon={Clock} label="Pending" value="—" color="#F59E0B" bg="#FFFBEB" />
        <StatCard icon={XCircle} label="Cancelled" value="—" color="#EF4444" bg="#FEF2F2" />
      </div>

      {/* Filters */}
      <AdminAppointmentsFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => handleFilterChange(emptyFilters)}
      />

      {/* Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
        </div>
      ) : (
        <AdminAppointmentsTable
          appointments={appointments}
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          perPage={PER_PAGE}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bg }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <p className="text-xs text-[#6A7282]">{label}</p>
          <p className="text-lg font-bold text-[#101828]">{value}</p>
        </div>
      </div>
    </div>
  );
}
