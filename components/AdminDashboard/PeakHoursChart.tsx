"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Point { day: string; value: number }

export default function PeakHoursChart({ data = [] }: { data?: Point[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-base font-bold text-[#1E293B] mb-4">
        Upcoming Peak Hours
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#94A3B8" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#94A3B8" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E2E8F0",
              fontSize: 13,
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0284C7"
            strokeWidth={2.5}
            dot={{ fill: "#0284C7", r: 5, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#0284C7" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
