"use client";

import { Video, Globe, Building2, CheckCircle2, XCircle } from "lucide-react";
import type { DoctorDetail } from "./types";

export default function TelehealthTab({ doctor }: { doctor: DoctorDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Online Consultation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Globe className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Online Consultation</h2>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
          {doctor.online_consultation ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
              <div>
                <p className="text-sm font-semibold text-[#101828]">Enabled</p>
                <p className="text-xs text-[#6A7282]">This doctor accepts online consultation bookings</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-[#EF4444]" />
              <div>
                <p className="text-sm font-semibold text-[#101828]">Disabled</p>
                <p className="text-xs text-[#6A7282]">Online consultations are not available</p>
              </div>
            </>
          )}
        </div>

        {/* Online schedule summary */}
        {doctor.online_consultation && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-[#6A7282] uppercase">Online Schedule</p>
            {doctor.onlineSchedule.filter((d) => d.active).length > 0 ? (
              doctor.onlineSchedule
                .filter((d) => d.active)
                .map((d) => (
                  <div key={d.day} className="flex items-center justify-between p-2.5 rounded-lg bg-[#EFF6FF]">
                    <span className="text-xs font-medium text-[#101828]">{d.day}</span>
                    <span className="text-xs font-semibold text-[#0284C7]">{d.start_time} — {d.end_time}</span>
                  </div>
                ))
            ) : (
              <p className="text-xs text-[#6A7282] italic">No online schedule set</p>
            )}
          </div>
        )}
      </div>

      {/* In-Person Consultation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Building2 className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-base font-bold text-[#101828]">In-Person Consultation</h2>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
          {doctor.offline_consultation ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
              <div>
                <p className="text-sm font-semibold text-[#101828]">Enabled</p>
                <p className="text-xs text-[#6A7282]">This doctor accepts in-person bookings at clinic</p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-[#EF4444]" />
              <div>
                <p className="text-sm font-semibold text-[#101828]">Disabled</p>
                <p className="text-xs text-[#6A7282]">In-person consultations are not available</p>
              </div>
            </>
          )}
        </div>

        {/* Offline schedule summary */}
        {doctor.offline_consultation && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-[#6A7282] uppercase">In-Person Schedule</p>
            {doctor.offlineSchedule.filter((d) => d.active).length > 0 ? (
              doctor.offlineSchedule
                .filter((d) => d.active)
                .map((d) => (
                  <div key={d.day} className="flex items-center justify-between p-2.5 rounded-lg bg-[#F0FDF4]">
                    <span className="text-xs font-medium text-[#101828]">{d.day}</span>
                    <span className="text-xs font-semibold text-[#16A34A]">{d.start_time} — {d.end_time}</span>
                  </div>
                ))
            ) : (
              <p className="text-xs text-[#6A7282] italic">No in-person schedule set</p>
            )}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Video className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Appointment Stats</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Appointments", value: doctor.stats.totalAppointments, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
            { label: "Completed", value: doctor.stats.completedAppointments, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
            { label: "Upcoming", value: doctor.stats.upcomingAppointments, bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
            { label: "Total Patients", value: doctor.stats.totalPatients, bg: "bg-[#FAF5FF]", color: "text-[#7C3AED]" },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl ${s.bg}`}>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6A7282] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
