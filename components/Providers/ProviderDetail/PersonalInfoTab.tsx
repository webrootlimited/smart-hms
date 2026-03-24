"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Pencil } from "lucide-react";
import type { DoctorDetail } from "./types";
import { EditBasicInfoDialog, EditContactDialog, EditProfessionalDialog } from "./EditDoctorDialogs";

export default function PersonalInfoTab({
  doctor,
  onUpdate,
  saving,
}: {
  doctor: DoctorDetail;
  onUpdate: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [editBasic, setEditBasic] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editProfessional, setEditProfessional] = useState(false);

  const age = doctor.dob
    ? Math.floor((Date.now() - new Date(doctor.dob).getTime()) / 31557600000)
    : null;

  const genderLabel =
    doctor.gender === "MALE" ? "Male" : doctor.gender === "FEMALE" ? "Female" : doctor.gender || "—";

  const joinDate = doctor.joined_at
    ? new Date(doctor.joined_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const dobFormatted = doctor.dob
    ? new Date(doctor.dob).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Basic Information */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Basic Information</h2>
          </div>
          <button onClick={() => setEditBasic(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: "Full Name", value: `Dr. ${doctor.first_name} ${doctor.last_name}` },
            { label: "Date of Birth", value: dobFormatted },
            { label: "Gender", value: genderLabel },
            ...(age !== null ? [{ label: "Age", value: `${age} years` }] : []),
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">{row.label}</span>
              <span className="text-sm font-semibold text-[#101828]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Contact Information</h2>
          </div>
          <button onClick={() => setEditContact(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email Address", value: doctor.email, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
            { icon: Phone, label: "Phone Number", value: doctor.phone || "Not provided", bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
            { icon: MapPin, label: "Address", value: doctor.address || "Not provided", bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
          ].map((item) => (
            <div key={item.label} className={`p-3.5 rounded-xl ${item.bg}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                <span className={`text-xs font-medium ${item.color}`}>{item.label}</span>
              </div>
              <p className="text-sm font-semibold text-[#101828] whitespace-pre-line">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Professional Details</h2>
          </div>
          <button onClick={() => setEditProfessional(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Specialty</span>
            <span className="px-2.5 py-0.5 text-sm font-semibold bg-[#EFF6FF] text-[#0284C7] rounded-lg">
              {doctor.specialization || "—"}
            </span>
          </div>
          {[
            { label: "Department", value: doctor.department || "—" },
            { label: "Experience", value: `${doctor.experience_years} years` },
            { label: "Consultation Fee", value: `£${doctor.consultation_fee}` },
            { label: "Joined", value: joinDate },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">{row.label}</span>
              <span className="text-sm font-semibold text-[#101828]">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bio + Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Professional Bio</h2>
        </div>
        {doctor.bio ? (
          <p className="text-sm text-[#4A5565] leading-relaxed">{doctor.bio}</p>
        ) : (
          <p className="text-sm text-[#6A7282] italic">No bio provided</p>
        )}
        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { label: "Total Patients", value: doctor.stats.totalPatients, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
            { label: "Completed", value: doctor.stats.completedAppointments, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
            { label: "Upcoming", value: doctor.stats.upcomingAppointments, bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
            { label: "Cancelled", value: doctor.stats.cancelledAppointments, bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
          ].map((s) => (
            <div key={s.label} className={`p-3 rounded-xl ${s.bg}`}>
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Dialogs */}
      <EditBasicInfoDialog open={editBasic} onClose={() => setEditBasic(false)} doctor={doctor} onSave={onUpdate} saving={saving} />
      <EditContactDialog open={editContact} onClose={() => setEditContact(false)} doctor={doctor} onSave={onUpdate} saving={saving} />
      <EditProfessionalDialog open={editProfessional} onClose={() => setEditProfessional(false)} doctor={doctor} onSave={onUpdate} saving={saving} />
    </div>
  );
}
