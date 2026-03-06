"use client";

import { useState } from "react";
import { Clock, Shield, Pencil } from "lucide-react";
import { EditAppointmentSettingsDialog, EditPoliciesDialog } from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;

export default function AppointmentRulesTab({ data }: { data: Data }) {
  const { appointmentRules: rules } = data;
  const [editSettings, setEditSettings] = useState(false);
  const [editPolicies, setEditPolicies] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Appointment Settings */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">
              Appointment Settings
            </h2>
          </div>
          <button onClick={() => setEditSettings(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: "Appointment Duration", value: rules.duration },
            { label: "Buffer Between Appointments", value: rules.buffer },
            { label: "Max Daily Appointments", value: rules.maxDaily },
            { label: "Advance Booking Window", value: rules.advanceWindow },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between py-1"
            >
              <span className="text-sm text-[#6A7282]">{row.label}</span>
              <span className="text-sm font-semibold text-[#101828]">
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Same-Day Booking</span>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] rounded-full">
              Enabled
            </span>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Policies</h2>
          </div>
          <button onClick={() => setEditPolicies(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 bg-[#F0FDF4] rounded-xl">
            <div>
              <p className="text-sm font-semibold text-[#101828]">
                Online Booking
              </p>
              <p className="text-xs text-[#6A7282]">
                Patients can book appointments online
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-[#16A34A] text-white rounded-full">
              ON
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#F0FDF4] rounded-xl">
            <div>
              <p className="text-sm font-semibold text-[#101828]">
                Auto-Confirmation
              </p>
              <p className="text-xs text-[#6A7282]">
                Appointments confirmed automatically
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-[#16A34A] text-white rounded-full">
              ON
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FFFBEB] rounded-xl">
            <div>
              <p className="text-sm font-semibold text-[#101828]">
                Cancellation Window
              </p>
              <p className="text-xs text-[#6A7282]">
                Minimum notice for cancellations
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-[#D97706] text-white rounded-full">
              {rules.cancellationWindow}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FEF2F2] rounded-xl">
            <div>
              <p className="text-sm font-semibold text-[#101828]">
                No-Show Fee
              </p>
              <p className="text-xs text-[#6A7282]">
                Charged for missed appointments
              </p>
            </div>
            <span className="px-2.5 py-1 text-xs font-bold bg-[#EF4444] text-white rounded-full">
              {rules.noShowFee}
            </span>
          </div>
        </div>
      </div>
      <EditAppointmentSettingsDialog open={editSettings} onClose={() => setEditSettings(false)} data={rules} />
      <EditPoliciesDialog open={editPolicies} onClose={() => setEditPolicies(false)} data={rules} />
    </div>
  );
}
