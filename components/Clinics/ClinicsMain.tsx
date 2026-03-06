"use client";

import { useMemo } from "react";
import { clinics } from "./mockData";
import ClinicsHeader from "./ClinicsHeader";
import ClinicCard from "./ClinicCard";

export default function ClinicsMain() {
  const stats = useMemo(() => {
    const totalStaff = clinics.reduce((sum, c) => sum + c.staff, 0);
    const totalPatients = clinics.reduce((sum, c) => sum + c.patients, 0);
    const services = new Set(clinics.flatMap((c) => c.services.map((s) => s.label)));
    return {
      totalStaff,
      totalPatients,
      activeDepartments: services.size,
    };
  }, []);

  return (
    <div className="space-y-5">
      <ClinicsHeader
        totalLocations={clinics.length}
        totalStaff={stats.totalStaff}
        totalPatients={stats.totalPatients}
        activeDepartments={stats.activeDepartments}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}
