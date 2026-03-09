"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Eye, Video } from "lucide-react";

const APPOINTMENTS = [
  {
    id: "APT-001",
    name: "Michael Brown",
    type: "Annual Checkup",
    age: 32,
    gender: "Male",
    time: "11:00 AM",
    mode: "In-Clinic" as const,
    avatar: "MB",
  },
  {
    id: "APT-002",
    name: "Emma Davis",
    type: "Online Consultation",
    age: 28,
    gender: "Female",
    time: "11:30 AM",
    mode: "Telehealth" as const,
    avatar: "ED",
  },
];

const TABS = ["All", "Upcoming"] as const;

export default function UpcomingAppointments() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("All");
  const params = useParams();
  const doctorName = params.doctorName as string;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[#101828]">Upcoming Appointments</h3>
        <div className="flex items-center gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition cursor-pointer ${
                activeTab === tab
                  ? "bg-[#0284C7] text-white"
                  : "text-[#6A7282] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-[#6A7282] mb-3">You have 7 more patients today.</p>

      <div className="space-y-3">
        {APPOINTMENTS.map((apt) => (
          <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                <span className="text-xs font-bold text-[#4A5565]">{apt.avatar}</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#101828]">{apt.name}</p>
                <p className="text-[11px] text-[#6A7282]">
                  {apt.type} • {apt.age} {apt.gender}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-semibold text-[#101828]">{apt.time}</p>
                <span
                  className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded-full ${
                    apt.mode === "In-Clinic"
                      ? "bg-[#F0FDF4] text-[#16A34A]"
                      : "bg-[#F0F9FF] text-[#0284C7]"
                  }`}
                >
                  {apt.mode}
                </span>
              </div>
              {apt.mode === "In-Clinic" ? (
                <Link
                  href={`/doctor/${doctorName}/appointments/${apt.id}`}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <Eye className="w-3 h-3" /> View Details
                </Link>
              ) : (
                <Link
                  href={`/doctor/${doctorName}/appointments/${apt.id}`}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold bg-[#0284C7] text-white rounded-lg hover:opacity-90 transition"
                >
                  <Video className="w-3 h-3" /> Join Call
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
