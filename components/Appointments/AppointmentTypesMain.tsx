"use client";

import { useState, useMemo } from "react";
import { appointmentTypes } from "./mockData";
import type { AppointmentType } from "./types";
import AppointmentTypesHeader from "./AppointmentTypesHeader";
import AppointmentTypesFilters, {
  type Filters,
  emptyFilters,
} from "./AppointmentTypesFilters";
import AppointmentTypesTable from "./AppointmentTypesTable";
import {
  EditAppointmentTypeDialog,
  CopyAppointmentTypeDialog,
  DeleteAppointmentTypeDialog,
} from "./AppointmentTypesDialogs";

const PER_PAGE = 8;

export default function AppointmentTypesMain() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);
  const [showEmptySlots, setShowEmptySlots] = useState(false);
  const [editType, setEditType] = useState<AppointmentType | null>(null);
  const [copyType, setCopyType] = useState<AppointmentType | null>(null);
  const [deleteType, setDeleteType] = useState<AppointmentType | null>(null);

  const filtered = useMemo(() => {
    let result = appointmentTypes;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    if (filters.mode) {
      result = result.filter(
        (t) => t.mode === filters.mode || (filters.mode !== "Both" && t.mode === "Both")
      );
    }
    if (filters.duration) {
      result = result.filter((t) => t.duration === Number(filters.duration));
    }
    if (filters.status) {
      result = result.filter((t) => t.status === filters.status);
    }
    return result;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const activeCount = appointmentTypes.filter((t) => t.status === "Active").length;
  const telehealthCount = appointmentTypes.filter(
    (t) => t.mode === "Telehealth" || t.mode === "Both"
  ).length;

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <AppointmentTypesHeader
        totalTypes={appointmentTypes.length}
        activeTypes={activeCount}
        telehealthCount={telehealthCount}
        createdCount={appointmentTypes.length}
      />

      <AppointmentTypesFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => { setFilters(emptyFilters); setPage(1); }}
      />

      <AppointmentTypesTable
        types={paged}
        page={safePage}
        totalPages={totalPages}
        totalResults={filtered.length}
        perPage={PER_PAGE}
        showEmptySlots={showEmptySlots}
        onToggleEmptySlots={() => setShowEmptySlots(!showEmptySlots)}
        onPageChange={setPage}
        onEdit={setEditType}
        onCopy={setCopyType}
        onDelete={setDeleteType}
      />

      <EditAppointmentTypeDialog
        type={editType}
        open={!!editType}
        onClose={() => setEditType(null)}
      />
      <CopyAppointmentTypeDialog
        type={copyType}
        open={!!copyType}
        onClose={() => setCopyType(null)}
      />
      <DeleteAppointmentTypeDialog
        type={deleteType}
        open={!!deleteType}
        onClose={() => setDeleteType(null)}
      />
    </div>
  );
}
