"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Utilized", value: 78 },
  { name: "Available", value: 22 },
];

export default function ProviderUtilizationChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-base font-bold text-[#101828] mb-2">
        Provider Utilization
      </h3>
      <div className="flex items-center justify-center">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <defs>
              <linearGradient id="utilizationGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4D8BE9" />
                <stop offset="100%" stopColor="#2F548B" />
              </linearGradient>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill="url(#utilizationGradient)" />
              <Cell fill="#E2E8F0" />
            </Pie>
            <text
              x="50%"
              y="46%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-2xl font-bold"
              fill="#1E293B"
            >
              78%
            </text>
            <text
              x="50%"
              y="58%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs"
              fill="#64748B"
            >
              Utilized
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
