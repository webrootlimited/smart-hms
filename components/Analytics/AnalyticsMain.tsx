"use client";

import { useState } from "react";
import AnalyticsHeader from "./AnalyticsHeader";
import RevenueChart from "./RevenueChart";
import AppointmentTrendsChart from "./AppointmentTrendsChart";
import PatientAgeChart from "./PatientAgeChart";
import TopProvidersChart from "./TopProvidersChart";
import AnalyticsBottomCards from "./AnalyticsBottomCards";

export default function AnalyticsMain() {
  const [activeRange, setActiveRange] = useState("Last 30 Days");

  return (
    <div className="space-y-5">
      <AnalyticsHeader activeRange={activeRange} onRangeChange={setActiveRange} />

      {/* Row 1: Revenue + Appointment Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RevenueChart />
        <AppointmentTrendsChart />
      </div>

      {/* Row 2: Patient Age + Top Providers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PatientAgeChart />
        <TopProvidersChart />
      </div>

      {/* Row 3: Bottom report cards */}
      <AnalyticsBottomCards />
    </div>
  );
}
