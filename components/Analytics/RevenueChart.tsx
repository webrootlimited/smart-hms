"use client";

import { DollarSign, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", revenue: 180000, expenses: 120000 },
  { month: "Feb", revenue: 220000, expenses: 140000 },
  { month: "Mar", revenue: 260000, expenses: 150000 },
  { month: "Apr", revenue: 240000, expenses: 135000 },
  { month: "May", revenue: 300000, expenses: 160000 },
  { month: "Jun", revenue: 280000, expenses: 155000 },
  { month: "Jul", revenue: 310000, expenses: 170000 },
  { month: "Aug", revenue: 335000, expenses: 180000 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-[#EA580C]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101828]">Revenue Overview</h3>
            <p className="text-xs text-[#6A7282]">Monthly revenue vs expenses</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3" /> 18.2%
        </span>
      </div>

      <p className="text-2xl font-bold text-[#101828] mt-3 mb-4">
        £335,000 <span className="text-xs font-normal text-[#6A7282]">this month</span>
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6A7282" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6A7282" }} axisLine={false} tickLine={false} tickFormatter={(v) => `£${v / 1000}k`} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }}
              formatter={(value: number) => [`£${(value / 1000).toFixed(0)}k`, ""]}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#0284C7" strokeWidth={2} fill="url(#revenueGrad)" />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
