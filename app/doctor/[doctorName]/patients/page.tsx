"use client";

import { useParams } from "next/navigation";
import { UserRound, Search } from "lucide-react";

const PATIENTS = [
  { id: "PT-001", name: "James Wilson", age: 34, condition: "Type 2 Diabetes", lastVisit: "2025-12-07", status: "Active" },
  { id: "PT-002", name: "Emma Davis", age: 28, condition: "Chronic Migraine", lastVisit: "2025-12-05", status: "Active" },
  { id: "PT-003", name: "Robert Chen", age: 52, condition: "Coronary Artery Disease", lastVisit: "2025-12-01", status: "Active" },
  { id: "PT-004", name: "Maria Lopez", age: 45, condition: "Hypertension", lastVisit: "2025-11-28", status: "Active" },
  { id: "PT-005", name: "David Kim", age: 61, condition: "COPD", lastVisit: "2025-11-20", status: "Inactive" },
  { id: "PT-006", name: "Sarah Thompson", age: 37, condition: "Post-Surgical Recovery", lastVisit: "2025-11-15", status: "Active" },
];

export default function DoctorPatientsPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Patients</h1>
          <p className="text-sm text-[#6A7282]">View and manage your assigned patients</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input type="text" placeholder="Search patients..." className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white w-56 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Patients", value: "847", color: "text-[#0284C7]", bg: "bg-[#F0F9FF]" },
          { label: "Active", value: "692", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
          { label: "New This Month", value: "28", color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
          { label: "Follow-ups Due", value: "15", color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-[#6A7282]">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-[11px] font-semibold text-[#6A7282] px-5 py-3">Patient</th>
              <th className="text-left text-[11px] font-semibold text-[#6A7282] px-5 py-3">ID</th>
              <th className="text-left text-[11px] font-semibold text-[#6A7282] px-5 py-3">Condition</th>
              <th className="text-left text-[11px] font-semibold text-[#6A7282] px-5 py-3">Last Visit</th>
              <th className="text-left text-[11px] font-semibold text-[#6A7282] px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {PATIENTS.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                      <span className="text-[10px] font-bold text-[#4A5565]">{p.name.split(" ").map(w => w[0]).join("")}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#101828]">{p.name}</p>
                      <p className="text-[10px] text-[#6A7282]">{p.age} years old</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs text-[#4A5565]">{p.id}</td>
                <td className="px-5 py-3 text-xs text-[#4A5565]">{p.condition}</td>
                <td className="px-5 py-3 text-xs text-[#4A5565]">{p.lastVisit}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                    p.status === "Active" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#6A7282]"
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
