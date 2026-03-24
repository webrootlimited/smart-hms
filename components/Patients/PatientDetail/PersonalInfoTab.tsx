"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Pencil } from "lucide-react";
import type { PatientDetail } from "./types";
import EditPersonalDialog from "./EditPersonalDialog";

export default function PersonalInfoTab({
  patient,
  onUpdate,
  saving,
}: {
  patient: PatientDetail;
  onUpdate: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [editOpen, setEditOpen] = useState(false);

  const genderLabel =
    patient.gender === "MALE" ? "Male" : patient.gender === "FEMALE" ? "Female" : patient.gender || "—";

  const dobFormatted = patient.dob
    ? new Date(patient.dob).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const age = patient.dob
    ? Math.floor((Date.now() - new Date(patient.dob).getTime()) / 31557600000)
    : null;

  const joinDate = patient.joined_at
    ? new Date(patient.joined_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const addressStr = [patient.address?.line1, patient.address?.line2, patient.address?.city, patient.address?.postcode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Basic Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Basic Information</h2>
          </div>
          <button onClick={() => setEditOpen(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: "Full Name", value: `${patient.first_name} ${patient.last_name}` },
            { label: "Date of Birth", value: dobFormatted },
            { label: "Gender", value: genderLabel },
            ...(age !== null ? [{ label: "Age", value: `${age} years` }] : []),
            { label: "Registered", value: joinDate },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">{row.label}</span>
              <span className="text-sm font-semibold text-[#101828]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Phone className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Contact Information</h2>
        </div>
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email Address", value: patient.email, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
            { icon: Phone, label: "Phone Number", value: patient.phone || "Not provided", bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
            { icon: MapPin, label: "Address", value: addressStr || "Not provided", bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
          ].map((item) => (
            <div key={item.label} className={`p-3.5 rounded-xl ${item.bg}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span className={`text-xs font-medium ${item.color}`}>{item.label}</span>
              </div>
              <p className="text-sm font-semibold text-[#101828]">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Overview</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Total Appointments", value: patient.stats.totalAppointments, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
            { label: "Completed", value: patient.stats.completedAppointments, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
            { label: "Upcoming", value: patient.stats.upcomingAppointments, bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
            { label: "Cancelled", value: patient.stats.cancelledAppointments, bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
            { label: "Doctors Seen", value: patient.stats.doctorsSeen, bg: "bg-[#FAF5FF]", color: "text-[#7C3AED]" },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl ${s.bg}`}>
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6A7282] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <EditPersonalDialog open={editOpen} onClose={() => setEditOpen(false)} patient={patient} onSave={onUpdate} saving={saving} />
    </div>
  );
}
