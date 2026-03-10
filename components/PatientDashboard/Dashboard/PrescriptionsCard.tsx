"use client";

import { Pill, Download } from "lucide-react";

const prescriptions = [
  {
    id: 1,
    name: "Amoxicillin",
    dosage: "500mg",
    frequency: "2x Daily",
    duration: "5 Days left",
    color: "#EF4444",
    bgColor: "#FEF2F2",
  },
  {
    id: 2,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "1x Daily",
    duration: "Refill in 12 days",
    color: "#0284C7",
    bgColor: "#F0F9FF",
  },
  {
    id: 3,
    name: "Vitamin D3",
    dosage: "1000 IU",
    frequency: "1x Daily",
    duration: "Ongoing",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
  },
];

export default function PrescriptionsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#101828] flex items-center gap-2">
          <Pill className="w-5 h-5 text-[#0284C7]" />
          Prescriptions
        </h2>
        <button className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
          Refill Request
        </button>
      </div>

      <div className="space-y-3">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: rx.bgColor }}
              >
                <Pill className="w-4 h-4" style={{ color: rx.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">{rx.name}</p>
                <p className="text-xs text-[#6A7282]">
                  {rx.dosage} &bull; {rx.frequency} &bull; {rx.duration}
                </p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
              <Download className="w-3.5 h-3.5 text-[#6A7282]" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
