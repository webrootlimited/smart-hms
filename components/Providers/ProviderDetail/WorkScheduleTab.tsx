"use client";

import { useState } from "react";
import { Clock, Pencil, Users, Coffee } from "lucide-react";
import { EditScheduleDialog } from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;

const DAY_COLORS = [
  "bg-[#16A34A]",
  "bg-[#0284C7]",
  "bg-[#7C3AED]",
  "bg-[#EA580C]",
  "bg-[#EF4444]",
  "bg-gray-300",
  "bg-gray-300",
];

export default function WorkScheduleTab({ data }: { data: Data }) {
  const { schedule } = data;
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Weekly Schedule (left 2/3) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-base font-bold text-[#101828]">Weekly Schedule</h2>
            </div>
            <p className="text-xs text-[#6A7282] mt-0.5">Regular working hours</p>
          </div>
          <button
            onClick={() => setEditOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-[#0284C7] text-[#0284C7] rounded-xl hover:bg-[#EFF6FF] transition cursor-pointer"
          >
            <Pencil className="w-3 h-3" /> Edit Schedule
          </button>
        </div>

        <div className="space-y-3">
          {schedule.days.map((day, i) => (
            <div key={day.day} className="flex items-center gap-3">
              <div className="flex items-center gap-2 w-28 shrink-0">
                <span className={`w-2 h-2 rounded-full ${DAY_COLORS[i]}`} />
                <span className="text-sm font-medium text-[#101828]">{day.day}</span>
              </div>
              {day.active ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-[#101828] font-medium">{day.from}</span>
                    <span className="text-xs text-[#6A7282]">—</span>
                    <span className="px-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg text-[#101828] font-medium">{day.to}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#16A34A] font-medium ml-auto">
                    <Users className="w-3 h-3" />
                    {day.patients} patients
                  </div>
                </>
              ) : (
                <span className="text-sm text-[#6A7282]">Day Off</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <div className="space-y-5">
        <div className="rounded-2xl p-5 text-white bg-linear-to-br from-[#0284C7] to-[#7C3AED]">
          <h3 className="text-sm font-bold mb-4">Schedule Summary</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-white/70">Total Hours/Week</p>
              <p className="text-2xl font-bold">{schedule.totalHoursWeek} hours</p>
            </div>
            <div>
              <p className="text-xs text-white/70">Working Days</p>
              <p className="text-2xl font-bold">{schedule.workingDays} days</p>
            </div>
            <div>
              <p className="text-xs text-white/70">Avg Patients/Day</p>
              <p className="text-2xl font-bold">{schedule.avgPatientsDay} patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-sm font-bold text-[#101828]">Break Times</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-[#FFF7ED] rounded-xl">
              <p className="text-xs font-medium text-[#EA580C] mb-0.5">Lunch Break</p>
              <p className="text-sm font-semibold text-[#101828]">{schedule.lunchBreak}</p>
            </div>
            <div className="p-3 bg-[#EFF6FF] rounded-xl">
              <p className="text-xs font-medium text-[#0284C7] mb-0.5">Buffer Time</p>
              <p className="text-sm font-semibold text-[#101828]">{schedule.bufferTime}</p>
            </div>
          </div>
        </div>
      </div>

      <EditScheduleDialog open={editOpen} onClose={() => setEditOpen(false)} data={schedule} />
    </div>
  );
}
