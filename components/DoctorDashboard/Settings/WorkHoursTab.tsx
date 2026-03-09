"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

const DAYS = [
  { day: "Monday", from: "09:00", to: "17:00", active: true },
  { day: "Tuesday", from: "09:00", to: "17:00", active: true },
  { day: "Wednesday", from: "09:00", to: "13:00", active: true },
  { day: "Thursday", from: "09:00", to: "17:00", active: true },
  { day: "Friday", from: "09:00", to: "15:00", active: true },
  { day: "Saturday", from: "10:00", to: "14:00", active: false },
  { day: "Sunday", from: "", to: "", active: false },
];

export default function WorkHoursTab() {
  const [schedule, setSchedule] = useState(DAYS);

  const toggleDay = (idx: number) => {
    setSchedule((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, active: !d.active } : d))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Work Hours</h3>
          <p className="text-xs text-[#6A7282]">Configure your weekly availability schedule</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          Save Changes
        </button>
      </div>

      <div className="space-y-3">
        {schedule.map((s, idx) => (
          <div key={s.day} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
            {/* Toggle */}
            <button
              onClick={() => toggleDay(idx)}
              className={`w-11 h-6 rounded-full relative transition cursor-pointer shrink-0 ${
                s.active ? "bg-[#0284C7]" : "bg-gray-300"
              }`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                s.active ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>

            {/* Day name */}
            <span className={`text-sm font-semibold w-24 ${s.active ? "text-[#101828]" : "text-[#9CA3AF]"}`}>
              {s.day}
            </span>

            {s.active ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                  <input
                    type="time"
                    defaultValue={s.from}
                    className="pl-8 pr-2 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] w-32"
                  />
                </div>
                <span className="text-xs text-[#6A7282]">to</span>
                <div className="relative">
                  <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                  <input
                    type="time"
                    defaultValue={s.to}
                    className="pl-8 pr-2 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] w-32"
                  />
                </div>
              </div>
            ) : (
              <span className="text-xs text-[#9CA3AF]">Day off</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
