"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from "recharts";

const data = [
  { day: "Mon", activity: 65, trend: 55 },
  { day: "Tue", activity: 45, trend: 50 },
  { day: "Wed", activity: 80, trend: 60 },
  { day: "Thu", activity: 70, trend: 65 },
  { day: "Fri", activity: 90, trend: 72 },
  { day: "Sat", activity: 60, trend: 68 },
  { day: "Sun", activity: 75, trend: 70 },
];

export default function HealthActivityChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#101828]">Health Activity</h2>
        <span className="text-xs text-[#6A7282] bg-gray-50 border border-gray-200 px-3 py-1 rounded-lg">
          Last 7 Days
        </span>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6A7282" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6A7282" }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="activity" fill="#0284C7" radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ r: 3, fill: "#F59E0B" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
