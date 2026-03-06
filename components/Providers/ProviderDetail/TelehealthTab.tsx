"use client";

import { useState } from "react";
import { Video, Monitor, Star, Pencil, Phone } from "lucide-react";
import { EditTelehealthDialog } from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;

export default function TelehealthTab({ data }: { data: Data }) {
  const { telehealth: th } = data;
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Main content (2/3) */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-base font-bold text-[#101828]">Telehealth Status</h2>
            </div>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#16A34A]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              Enabled
            </span>
          </div>
          <p className="text-xs text-[#6A7282] mb-4">Virtual appointment settings</p>

          <div className="p-4 rounded-xl bg-linear-to-br from-[#EFF6FF] to-[#FAF5FF] border border-[#0284C7]/10">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center shrink-0">
                <Monitor className="w-5 h-5 text-[#7C3AED]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828] mb-1">Virtual Appointments Enabled</h3>
                <p className="text-xs text-[#6A7282] leading-relaxed">
                  {data.fullName} can conduct secure video consultations with patients through the integrated telehealth platform.
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  {th.features.map((f) => (
                    <span key={f} className="flex items-center gap-1 text-xs text-[#0284C7] font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#0284C7]" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-5">
            {[
              { label: "Platform", value: th.platform },
              { label: "Max Daily Virtual Visits", value: `${th.maxDailyVirtual} appointments` },
              { label: "Avg Session Duration", value: th.avgSessionDuration },
              { label: "Total Virtual Visits", value: `${th.totalVirtualVisits} completed` },
            ].map((s) => (
              <div key={s.label} className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-[#6A7282]">{s.label}</p>
                <p className="text-sm font-bold text-[#101828] mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="space-y-5">
        <div className="rounded-2xl p-5 text-white bg-linear-to-br from-[#0284C7] to-[#7C3AED]">
          <h3 className="text-sm font-bold mb-4">Virtual Stats</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-white/70">This Month</p>
              <p className="text-2xl font-bold">{th.thisMonth} visits</p>
            </div>
            <div>
              <p className="text-xs text-white/70">Patient Satisfaction</p>
              <p className="text-2xl font-bold flex items-center gap-1">
                {th.satisfaction}
                <Star className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
              </p>
            </div>
            <div>
              <p className="text-xs text-white/70">No-Show Rate</p>
              <p className="text-2xl font-bold">{th.noShowRate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#101828] mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold border border-[#0284C7] text-[#0284C7] rounded-xl hover:bg-[#EFF6FF] transition cursor-pointer">
              <Phone className="w-4 h-4" /> Start Test Call
            </button>
            <button
              onClick={() => setEditOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#6A7282] hover:bg-gray-50 rounded-xl transition cursor-pointer"
            >
              <Pencil className="w-4 h-4" /> Edit Settings
            </button>
          </div>
        </div>
      </div>

      <EditTelehealthDialog open={editOpen} onClose={() => setEditOpen(false)} data={th} />
    </div>
  );
}
