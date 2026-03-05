import {
  CalendarDays,
  Users,
  Clock,
  Building2,
  Video,
  Activity,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import StatCard from "./StatCard";
import DailyAppointmentChart from "./DailyAppointmentChart";
import ProviderUtilizationChart from "./ProviderUtilizationChart";
import PeakHoursChart from "./PeakHoursChart";
import QuickActions from "./QuickActions";
import DepartmentPatientLoad from "./DepartmentPatientLoad";
import ClinicOverview from "./ClinicOverview";
import SystemAlerts from "./SystemAlerts";

const stats = [
  {
    icon: CalendarDays,
    iconColor: "text-[#0284C7]",
    iconBg: "bg-[#EFF6FF]",
    value: "182",
    label: "Appointments Today",
  },
  {
    icon: Users,
    iconColor: "text-[#16A34A]",
    iconBg: "bg-[#F0FDF4]",
    value: "27",
    label: "Active Providers",
  },
  {
    icon: Clock,
    iconColor: "text-[#64748B]",
    iconBg: "bg-[#F8FAFC]",
    value: "16",
    label: "Waiting List",
  },
  {
    icon: Building2,
    iconColor: "text-[#E11D48]",
    iconBg: "bg-[#FFF1F2]",
    value: "8",
    label: "Departments Live",
  },
  {
    icon: Video,
    iconColor: "text-[#0284C7]",
    iconBg: "bg-[#EFF6FF]",
    value: "24",
    label: "Telehealth Sessions",
  },
  {
    icon: Activity,
    iconColor: "text-[#9333EA]",
    iconBg: "bg-[#FAF5FF]",
    value: "92%",
    label: "Bed Occupancy",
  },
  {
    icon: AlertCircle,
    iconColor: "text-[#EF4444]",
    iconBg: "bg-[#FEF2F2]",
    value: "3",
    label: "Critical Alerts Today",
  },
  {
    icon: TrendingDown,
    iconColor: "text-[#0284C7]",
    iconBg: "bg-[#EFF6FF]",
    value: "5",
    label: "No-shows Today",
  },
];

export default function AdminDashboardMain() {
  return (
    <div className="space-y-6">
      {/* Stat cards — 4 columns */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Daily Appointment Volume */}
      <DailyAppointmentChart />

      {/* Bottom row — Provider Utilization + Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProviderUtilizationChart />
        <PeakHoursChart />
      </div>

      {/* Quick Actions + Department Patient Load */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <QuickActions />
        <DepartmentPatientLoad />
      </div>

      {/* Clinic Overview + System Alerts */}
      <div className="grid grid-cols-1  gap-4">
        <ClinicOverview />
        <SystemAlerts />
      </div>
    </div>
  );
}
