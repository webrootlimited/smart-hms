"use client";

import { useState } from "react";
import { User, Mail, Phone, AlertCircle, MapPin, Pencil } from "lucide-react";
import {
  EditBasicInfoDialog,
  EditContactDialog,
  EditBioDialog,
} from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;

export default function PersonalInfoTab({ data }: { data: Data }) {
  const [editBasic, setEditBasic] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [editBio, setEditBio] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Basic Information */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">
              Basic Information
            </h2>
          </div>
          <button onClick={() => setEditBasic(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <div className="space-y-4">
          {[
            { label: "Full Name", value: data.fullName },
            { label: "Date of Birth", value: data.dateOfBirth },
            { label: "Gender", value: data.gender },
            { label: "Age", value: `${data.age} years` },
            { label: "Employee ID", value: data.employeeId, badge: true },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">{row.label}</span>
              {row.badge ? (
                <span className="px-2.5 py-0.5 text-sm font-semibold bg-[#EFF6FF] text-[#0284C7] rounded-lg">
                  {row.value}
                </span>
              ) : (
                <span className="text-sm font-semibold text-[#101828]">{row.value}</span>
              )}
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
            { icon: Mail, label: "Email Address", value: data.email, bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
            { icon: Phone, label: "Phone Number", value: data.phone, bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
            { icon: AlertCircle, label: "Emergency Contact", value: data.emergencyContact, bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
            { icon: MapPin, label: "Home Address", value: data.address, bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
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
        <div className="flex items-center gap-2 mb-5">
          <User className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Professional Details</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Specialty</span>
            <span className="px-2.5 py-0.5 text-sm font-semibold bg-[#EFF6FF] text-[#0284C7] rounded-lg">
              {data.specialty}
            </span>
          </div>
          {[
            { label: "Department", value: data.department },
            { label: "Years of Experience", value: `${data.yearsOfExperience} years` },
            { label: "Join Date", value: data.joinDate },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between py-1">
              <span className="text-sm text-[#6A7282]">{row.label}</span>
              <span className="text-sm font-semibold text-[#101828]">{row.value}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-1">
            <span className="text-sm text-[#6A7282]">Employment Status</span>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-[#16A34A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              {data.employmentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Professional Bio */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Professional Bio</h2>
          </div>
          <button onClick={() => setEditBio(true)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-4 h-4 text-[#6A7282]" />
          </button>
        </div>
        <p className="text-sm text-[#4A5565] leading-relaxed mb-4">{data.bio}</p>
        <div className="p-3 bg-[#FAF5FF] rounded-xl">
          <p className="text-xs font-semibold text-[#7C3AED] mb-2">Specializations</p>
          <div className="flex flex-wrap gap-2">
            {data.specializations.map((s) => (
              <span key={s} className="px-2.5 py-1 text-xs font-medium bg-white text-[#7C3AED] rounded-lg border border-[#7C3AED]/20">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <EditBasicInfoDialog open={editBasic} onClose={() => setEditBasic(false)} data={data} />
      <EditContactDialog open={editContact} onClose={() => setEditContact(false)} data={data} />
      <EditBioDialog open={editBio} onClose={() => setEditBio(false)} data={data} />
    </div>
  );
}
