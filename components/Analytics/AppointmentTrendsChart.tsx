"use client";

import { Calendar, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { month: "Jan", total: 240, completed: 210, cancelled: 30 },
  { month: "Feb", total: 280, completed: 250, cancelled: 30 },
  { month: "Mar", total: 260, completed: 225, cancelled: 35 },
  { month: "Apr", total: 310, completed: 275, cancelled: 35 },
  { month: "May", total: 290, completed: 260, cancelled: 30 },
  { month: "Jun", total: 320, completed: 285, cancelled: 35 },
  { month: "Jul", total: 300, completed: 270, cancelled: 30 },
  { month: "Aug", total: 327, completed: 295, cancelled: 32 },
];

export default function AppointmentTrendsChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] flex items-center justify-center">
            <Calendar className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101828]">Appointment Trends</h3>
            <p className="text-xs text-[#6A7282]">Monthly appointment stats</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
          <TrendingUp className="w-3 h-3" /> 5.4%
        </span>
      </div>

      <p className="text-2xl font-bold text-[#101828] mt-3 mb-4">
        327 <span className="text-xs font-normal text-[#6A7282]">this month</span>
      </p>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6A7282" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#6A7282" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="total" name="Total" stroke="#0284C7" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="completed" name="Completed" stroke="#16A34A" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="cancelled" name="Cancelled" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
