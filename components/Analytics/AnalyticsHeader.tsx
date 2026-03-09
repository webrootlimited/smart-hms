"use client";

import {
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  Activity,
  Filter,
  Download,
} from "lucide-react";

const stats = [
  { icon: Users, label: "Total Patients", value: "2,847", change: "+12%", up: true, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
  { icon: Calendar, label: "Appointments", value: "1,234", change: "+8%", up: true, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
  { icon: DollarSign, label: "Revenue", value: "£284K", change: "+15%", up: true, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
  { icon: Activity, label: "Attendance Rate", value: "94.2%", change: "+5%", up: true, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
];

export default function AnalyticsHeader({
  activeRange,
  onRangeChange,
}: {
  activeRange: string;
  onRangeChange: (r: string) => void;
}) {
  const ranges = ["Last 30 Days", "Last 3 Months", "Last 6 Months", "This Year", "Custom Range"];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Reports & Analytics</h1>
            <p className="text-sm text-[#6A7282]">Comprehensive insights and data visualizations</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <Filter className="w-3.5 h-3.5" /> Filters
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-lg font-bold text-[#101828]">{s.value}</p>
                <span className="text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded">
                  {s.change}
                </span>
              </div>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Time range tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => onRangeChange(r)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
              activeRange === r
                ? "bg-[#0284C7] text-white"
                : "bg-gray-100 text-[#6A7282] hover:bg-gray-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}
