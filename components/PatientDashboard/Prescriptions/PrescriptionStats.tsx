"use client";

import { Pill, RefreshCw, ClipboardList } from "lucide-react";
import type { Prescription } from "./prescriptionsData";

export default function PrescriptionStats({
  prescriptions,
}: {
  prescriptions: Prescription[];
}) {
  const active = prescriptions.filter((p) => p.status === "active").length;
  const refillRequests = prescriptions.filter(
    (p) => p.status === "refill-requested"
  ).length;
  const total = prescriptions.length;

  const stats = [
    {
      label: "Active Prescriptions",
      value: active,
      icon: Pill,
      color: "#16A34A",
      bg: "#F0FDF4",
      border: "#BBF7D0",
    },
    {
      label: "Refill Requests",
      value: refillRequests,
      icon: RefreshCw,
      color: "#F59E0B",
      bg: "#FFFBEB",
      border: "#FDE68A",
    },
    {
      label: "Total Prescribed",
      value: total,
      icon: ClipboardList,
      color: "#0284C7",
      bg: "#F0F9FF",
      border: "#BAE6FD",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border"
          style={{ backgroundColor: s.bg, borderColor: s.border }}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${s.color}20` }}
          >
            <s.icon className="w-4 h-4" style={{ color: s.color }} />
          </div>
          <div>
            <p className="text-xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
            <p className="text-[10px] text-[#6A7282] font-medium">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
