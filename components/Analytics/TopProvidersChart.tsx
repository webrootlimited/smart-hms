"use client";

import { Stethoscope } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Dr. Scott", patients: 85 },
  { name: "Dr. Johnson", patients: 72 },
  { name: "Dr. Martinez", patients: 68 },
  { name: "Dr. Williams", patients: 55 },
  { name: "Dr. Chen", patients: 48 },
];

const stats = [
  { label: "Avg", value: "4.8", sub: "Rating", color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
  { label: "< 5", value: "4.5", sub: "Min Score", color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
  { label: "> 4.7", value: "4.7", sub: "Median", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
  { label: "< 7.5", value: "7.5", sub: "Variance", color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
];

export default function TopProvidersChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101828]">Top Providers</h3>
            <p className="text-xs text-[#6A7282]">By patient volume this month</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#6A7282" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6A7282" }} axisLine={false} tickLine={false} width={90} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
            <Bar dataKey="patients" fill="#EA580C" radius={[0, 6, 6, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom mini stats */}
      <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-gray-100">
        {stats.map((s) => (
          <div key={s.sub} className="text-center">
            <p className="text-sm font-bold text-[#101828]">{s.value}</p>
            <p className="text-[10px] text-[#6A7282]">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
