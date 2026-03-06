"use client";

import { useState, useMemo } from "react";
import { providers } from "./mockData";
import ProvidersHeader from "./ProvidersHeader";
import ProvidersFilters, {
  type Filters,
  emptyFilters,
} from "./ProvidersFilters";
import ProvidersGrid from "./ProvidersGrid";

const PER_PAGE = 8;

export default function ProvidersMain() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [view, setView] = useState<"card" | "list">("card");

  const filtered = useMemo(() => {
    let result = providers;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.specialty.toLowerCase().includes(q)
      );
    }
    if (filters.department) {
      result = result.filter((p) => p.department === filters.department);
    }
    if (filters.specialty) {
      result = result.filter((p) => p.specialty === filters.specialty);
    }
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.location) {
      result = result.filter((p) => p.location === filters.location);
    }
    return result;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const departments = new Set(providers.map((p) => p.department)).size;
  const nowAvailable = providers.filter(
    (p) => p.status === "Active" && p.nextAvailable.startsWith("Today")
  ).length;

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <ProvidersHeader
        totalProviders={providers.length}
        departments={departments}
        nowAvailable={nowAvailable}
      />

      <ProvidersFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => { setFilters(emptyFilters); setPage(1); }}
      />

      <ProvidersGrid
        providers={paged}
        page={safePage}
        totalPages={totalPages}
        totalResults={filtered.length}
        perPage={PER_PAGE}
        view={view}
        onViewChange={setView}
        onPageChange={setPage}
      />
    </div>
  );
}
