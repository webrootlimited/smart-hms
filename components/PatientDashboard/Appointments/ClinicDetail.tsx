"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Star,
  Navigation,
  CalendarDays,
  Stethoscope,
} from "lucide-react";
import SelectClinicDateSlot from "./SelectClinicDateSlot";

export interface ClinicInfo {
  id: number;
  name: string;
  address: string;
  distance: number;
  rating: number;
  reviews: number;
  doctors: number;
  specialties: string[];
  nextAvailable: string;
  image: string;
  color: string;
}

interface ClinicDoc {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  specialtyColor: string;
  specialtyBg: string;
  experience: number;
  rating: number;
  reviews: number;
  consultFee: number;
  availableDays: string[];
  timings: string;
}

const clinicDoctors: ClinicDoc[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "SJ",
    specialty: "Cardiology",
    specialtyColor: "#0284C7",
    specialtyBg: "bg-[#F0F9FF]",
    experience: 15,
    rating: 4.8,
    reviews: 156,
    consultFee: 50,
    availableDays: ["Monday", "Wednesday", "Friday"],
    timings: "02:00 PM - 06:00 PM",
  },
  {
    id: 2,
    name: "Dr. Emily Chen",
    avatar: "EC",
    specialty: "General Medicine",
    specialtyColor: "#7C3AED",
    specialtyBg: "bg-[#F5F3FF]",
    experience: 8,
    rating: 4.7,
    reviews: 128,
    consultFee: 35,
    availableDays: ["Tuesday", "Thursday", "Saturday"],
    timings: "10:00 AM - 02:00 PM",
  },
];

const operatingHours = [
  { day: "Monday", hours: "09:00 - 17:00" },
  { day: "Tuesday", hours: "09:00 - 17:00" },
  { day: "Wednesday", hours: "09:00 - 17:00" },
  { day: "Thursday", hours: "09:00 - 17:00" },
  { day: "Friday", hours: "09:00 - 17:00" },
  { day: "Saturday", hours: "09:00 - 13:00" },
  { day: "Sunday", hours: "Closed" },
];

function getCurrentDay() {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}

export default function ClinicDetail({
  clinic,
  onBack,
}: {
  clinic: ClinicInfo;
  onBack: () => void;
}) {
  const [selectedDoc, setSelectedDoc] = useState<ClinicDoc | null>(null);
  const today = getCurrentDay();

  if (selectedDoc) {
    return (
      <SelectClinicDateSlot
        doctor={{
          id: String(selectedDoc.id),
          name: selectedDoc.name,
          initials: selectedDoc.avatar,
          specialty: selectedDoc.specialty,
          consultFee: selectedDoc.consultFee,
          photo_url: "",
        }}
        clinic={{
          id: String(clinic.id),
          name: clinic.name,
          address: clinic.address,
        }}
        onBack={() => setSelectedDoc(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </button>

      {/* Clinic header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: clinic.color }}
            >
              {clinic.image}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#101828]">
                {clinic.name}
              </h1>
              <p className="text-sm text-[#6A7282] mt-0.5">
                Block C, Main Boulevard, {clinic.address}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-sm font-bold text-[#101828]">
                    {clinic.rating}
                  </span>
                  <span className="text-xs text-[#6A7282]">
                    ({clinic.reviews} reviews)
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#16A34A]">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  Open Now
                </span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#0284C7] text-[#0284C7] text-xs font-semibold rounded-full hover:bg-[#F0F9FF] transition cursor-pointer">
            <Navigation className="w-3.5 h-3.5" />
            Get Directions
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Left: Doctors */}
        <div>
          <h2 className="text-base font-bold text-[#101828] flex items-center gap-2 mb-4">
            <Stethoscope className="w-5 h-5 text-[#0284C7]" />
            Doctors at This Clinic
          </h2>

          <div className="space-y-4">
            {clinicDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                {/* Doctor info row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center text-sm font-bold text-[#F59E0B] shrink-0">
                      {doc.avatar}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#101828]">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${doc.specialtyBg}`}
                          style={{ color: doc.specialtyColor }}
                        >
                          {doc.specialty}
                        </span>
                        <span className="text-xs text-[#6A7282]">
                          {doc.experience} years
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#0284C7]">
                      £{doc.consultFee}
                    </p>
                    <p className="text-[10px] text-[#6A7282]">Consultation</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-3">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-sm font-bold text-[#101828]">
                    {doc.rating}
                  </span>
                  <span className="text-xs text-[#6A7282]">
                    ({doc.reviews} reviews)
                  </span>
                </div>

                {/* Available days & timings */}
                <div className="mt-4 bg-[#F8FAFC] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1.5">
                      Available Days
                    </p>
                    <div className="flex items-center gap-1.5">
                      {doc.availableDays.map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 text-[10px] font-semibold text-[#0284C7] bg-[#F0F9FF] border border-[#BAE6FD] rounded-md"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1.5">
                      Timings
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#101828]">
                      <Clock className="w-3 h-3 text-[#6A7282]" />
                      {doc.timings}
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="mt-4 w-full py-3 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <CalendarDays className="w-4 h-4" />
                  Select Doctor & Choose Slot
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Clinic info sidebar */}
        <div className="space-y-5">
          {/* Clinic Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-sm font-bold text-[#101828] mb-4">
              Clinic Information
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#101828]">
                    Address
                  </p>
                  <p className="text-xs text-[#6A7282] mt-0.5">
                    Block C, Main Boulevard, {clinic.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#101828]">Phone</p>
                  <p className="text-xs text-[#0284C7] mt-0.5">
                    +44 20 1234567
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#101828]">Email</p>
                  <p className="text-xs text-[#0284C7] mt-0.5">
                    info@citymedical.com
                  </p>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#0284C7]" />
                <p className="text-xs font-semibold text-[#101828]">
                  Operating Hours
                </p>
              </div>
              <div className="space-y-2">
                {operatingHours.map((h) => {
                  const isToday = h.day === today;
                  return (
                    <div
                      key={h.day}
                      className={`flex items-center justify-between text-xs px-2 py-1.5 rounded-lg ${
                        isToday ? "bg-[#F0F9FF] border border-[#BAE6FD]" : ""
                      }`}
                    >
                      <span
                        className={`${
                          isToday
                            ? "font-bold text-[#0284C7]"
                            : "text-[#4A5565]"
                        }`}
                      >
                        {h.day}
                      </span>
                      <span
                        className={`font-medium ${
                          h.hours === "Closed"
                            ? "text-[#EF4444]"
                            : isToday
                              ? "text-[#0284C7] font-bold"
                              : "text-[#101828]"
                        }`}
                      >
                        {h.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Clinic Location */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#F0F9FF] flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-6 h-6 text-[#0284C7]" />
            </div>
            <p className="text-sm font-bold text-[#101828]">Clinic Location</p>
            <p className="text-xs text-[#6A7282] mt-1">51.5204</p>
            <p className="text-xs text-[#6A7282]">-0.1587</p>

            <button className="mt-3 w-full py-2.5 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2">
              <Navigation className="w-3.5 h-3.5" />
              Open in Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
