"use client";

import { useState } from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { DoctorDetail, ScheduleDay } from "./types";

export default function WorkScheduleTab({ doctor }: { doctor: DoctorDetail }) {
  const [mode, setMode] = useState<"offline" | "online">("offline");
  const schedule = mode === "offline" ? doctor.offlineSchedule : doctor.onlineSchedule;

  const activeDays = schedule.filter((d) => d.active);
  const totalHours = activeDays.reduce((sum, d) => {
    if (!d.start_time || !d.end_time) return sum;
    const [sh, sm] = d.start_time.split(":").map(Number);
    const [eh, em] = d.end_time.split(":").map(Number);
    return sum + (eh + em / 60) - (sh + sm / 60);
  }, 0);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        {(["offline", "online"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition cursor-pointer ${
              mode === m ? "bg-[#0284C7] text-white" : "bg-white border border-gray-200 text-[#6A7282] hover:bg-gray-50"
            }`}
          >
            {m === "offline" ? "In-Person" : "Online"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">
              {mode === "offline" ? "In-Person" : "Online"} Schedule
            </h2>
          </div>
          <div className="space-y-2">
            {schedule.map((day) => (
              <DayRow key={day.day} day={day} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm h-fit">
          <h3 className="text-sm font-bold text-[#101828] mb-4">Schedule Summary</h3>
          <div className="space-y-4">
            {[
              { label: "Working Days", value: `${activeDays.length} days/week` },
              { label: "Total Hours", value: `${totalHours.toFixed(1)} hrs/week` },
              { label: "Slot Duration", value: `${activeDays[0]?.slot_duration || 30} min` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm text-[#6A7282]">{row.label}</span>
                <span className="text-sm font-semibold text-[#101828]">{row.value}</span>
              </div>
            ))}
          </div>
          {activeDays.length === 0 && (
            <div className="mt-4 p-3 bg-[#FFFBEB] rounded-xl">
              <p className="text-xs text-[#D97706]">
                No {mode === "offline" ? "in-person" : "online"} schedule set up yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DayRow({ day }: { day: ScheduleDay }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl ${day.active ? "bg-[#F0FDF4]" : "bg-gray-50"}`}>
      <div className="flex items-center gap-3">
        {day.active ? (
          <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
        ) : (
          <XCircle className="w-4 h-4 text-gray-300" />
        )}
        <span className={`text-sm font-medium ${day.active ? "text-[#101828]" : "text-[#6A7282]"}`}>
          {day.day}
        </span>
      </div>
      {day.active ? (
        <span className="text-sm font-semibold text-[#101828]">
          {day.start_time} — {day.end_time}
        </span>
      ) : (
        <span className="text-xs text-[#6A7282]">Day Off</span>
      )}
    </div>
  );
}
