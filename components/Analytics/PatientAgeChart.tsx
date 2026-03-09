"use client";

import { Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "0-18 years", value: 320, color: "#0284C7" },
  { name: "18-35 years", value: 680, color: "#16A34A" },
  { name: "36-50 years", value: 950, color: "#EA580C" },
  { name: "51-65 years", value: 600, color: "#7C3AED" },
  { name: "65+ years", value: 297, color: "#EF4444" },
];

export default function PatientAgeChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
          <Users className="w-4 h-4 text-[#EA580C]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#101828]">Patient Age Groups</h3>
          <p className="text-xs text-[#6A7282]">Demographics breakdown</p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB", fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2 mt-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-[#4A5565]">{d.name}</span>
            </div>
            <span className="text-xs font-semibold text-[#101828]">{d.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
