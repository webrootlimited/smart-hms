"use client";

import { CalendarDays, Clock, Video, RotateCcw } from "lucide-react";

export default function NextAppointmentCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#101828] flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#0284C7]" />
            Next Appointment
          </h2>
          <p className="text-sm text-[#6A7282] mt-0.5">
            Don&apos;t forget your upcoming checkup
          </p>
        </div>
        <span className="px-3 py-1 bg-[#F0FDF4] text-[#16A34A] text-xs font-semibold rounded-full">
          CONFIRMED
        </span>
      </div>

      {/* Doctor info + actions */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Doctor */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#0284C7] flex items-center justify-center text-white text-sm font-bold shrink-0">
            JW
          </div>
          <div>
            <p className="text-sm font-semibold text-[#101828]">Dr. James Wilson</p>
            <p className="text-xs text-[#0284C7] font-medium">Cardiologist</p>
            <p className="text-xs text-[#6A7282] flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
              St. Mary&apos;s Hospital
            </p>
          </div>
        </div>

        {/* Date & Time */}
        <div className="flex items-center gap-4 text-sm text-[#4A5565]">
          <div className="text-center">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide">Date</p>
            <p className="font-semibold text-[#101828]">Mon, 12</p>
            <p className="text-xs text-[#6A7282]">Oct</p>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="text-center">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide">Time</p>
            <p className="font-semibold text-[#101828]">09:30</p>
            <p className="text-xs text-[#6A7282]">AM</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
            <Video className="w-4 h-4" />
            Join Video Call
          </button>
          <button className="flex items-center justify-center gap-1 text-sm text-[#6A7282] hover:text-[#0284C7] transition cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" />
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );
}
