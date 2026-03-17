"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import type { PatientsResponse } from "./types";
import PatientsHeader from "./PatientsHeader";
import PatientsFilters, { type Filters, emptyFilters } from "./PatientsFilters";
import PatientsGrid from "./PatientsGrid";

const PER_PAGE = 8;

export default function PatientsMain() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"card" | "list">("list");

  const params: Record<string, string | number> = {
    page,
    limit: PER_PAGE,
  };
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;
  if (filters.gender) params.gender = filters.gender;
  if (filters.blood_group) params.blood_group = filters.blood_group;

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.adminPatients(params),
    queryFn: () =>
      apiFetch<PatientsResponse>("/api/admin/patients", params as Record<string, string>),
  });

  const patients = data?.patients ?? [];
  const pagination = data?.pagination ?? { page: 1, limit: PER_PAGE, total: 0, totalPages: 1 };

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <PatientsHeader
        totalPatients={pagination.total}
      />

      <PatientsFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => { setFilters(emptyFilters); setPage(1); }}
      />

      {isLoading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
        </div>
      ) : (
        <PatientsGrid
          patients={patients}
          page={pagination.page}
          totalPages={pagination.totalPages}
          totalResults={pagination.total}
          perPage={PER_PAGE}
          view={view}
          onViewChange={setView}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
