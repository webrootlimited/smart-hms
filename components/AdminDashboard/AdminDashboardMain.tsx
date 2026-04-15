"use client";

import {
  CalendarDays,
  Users,
  Clock,
  Building2,
  Video,
  UserCheck,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import StatCard from "./StatCard";
import DailyAppointmentChart from "./DailyAppointmentChart";
import ProviderUtilizationChart from "./ProviderUtilizationChart";
import PeakHoursChart from "./PeakHoursChart";
import QuickActions from "./QuickActions";
import DepartmentPatientLoad from "./DepartmentPatientLoad";
import ClinicOverview from "./ClinicOverview";
import SystemAlerts from "./SystemAlerts";

interface DashboardData {
  success: boolean;
  stats: {
    appointmentsToday: number;
    activeProviders: number;
    waitingList: number;
    departmentsLive: number;
    telehealthToday: number;
    totalPatients: number;
    pendingApprovals: number;
    noShowsToday: number;
  };
  dailyAppointments: { time: string; value: number }[];
  providerUtilization: { name: string; value: number }[];
  utilizationPct: number;
  peakHours: { day: string; value: number }[];
  departmentLoad: { name: string; value: number }[];
}

export default function AdminDashboardMain() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.adminDashboardStats,
    queryFn: () => apiFetch<DashboardData>("/api/admin/dashboard-stats"),
  });

  const s = data?.stats;

  const stats = [
    { icon: CalendarDays, iconColor: "text-[#0284C7]", iconBg: "bg-[#EFF6FF]", value: String(s?.appointmentsToday ?? 0), label: "Appointments Today" },
    { icon: Users, iconColor: "text-[#16A34A]", iconBg: "bg-[#F0FDF4]", value: String(s?.activeProviders ?? 0), label: "Active Providers" },
    { icon: Clock, iconColor: "text-[#64748B]", iconBg: "bg-[#F8FAFC]", value: String(s?.waitingList ?? 0), label: "Waiting List" },
    { icon: Building2, iconColor: "text-[#E11D48]", iconBg: "bg-[#FFF1F2]", value: String(s?.departmentsLive ?? 0), label: "Departments Live" },
    { icon: Video, iconColor: "text-[#0284C7]", iconBg: "bg-[#EFF6FF]", value: String(s?.telehealthToday ?? 0), label: "Telehealth Today" },
    { icon: UserCheck, iconColor: "text-[#9333EA]", iconBg: "bg-[#FAF5FF]", value: String(s?.totalPatients ?? 0), label: "Total Patients" },
    { icon: AlertCircle, iconColor: "text-[#EF4444]", iconBg: "bg-[#FEF2F2]", value: String(s?.pendingApprovals ?? 0), label: "Pending Approvals" },
    { icon: TrendingDown, iconColor: "text-[#0284C7]", iconBg: "bg-[#EFF6FF]", value: String(s?.noShowsToday ?? 0), label: "No-shows Today" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <DailyAppointmentChart data={data?.dailyAppointments ?? []} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProviderUtilizationChart
          data={data?.providerUtilization ?? []}
          utilizationPct={data?.utilizationPct ?? 0}
        />
        <PeakHoursChart data={data?.peakHours ?? []} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <QuickActions />
        <DepartmentPatientLoad data={data?.departmentLoad ?? []} />
      </div>

      <div className="grid grid-cols-1  gap-4">
        <ClinicOverview />
        <SystemAlerts />
      </div>
    </div>
  );
}
