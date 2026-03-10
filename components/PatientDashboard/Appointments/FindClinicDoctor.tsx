"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Search,
  MapPin,
  CalendarDays,
  Star,
  Clock,
  Navigation,
  Filter,
  Building2,
  Users,
  Stethoscope,
} from "lucide-react";
import ClinicDoctorDetail from "./ClinicDoctorDetail";
import ClinicDetail from "./ClinicDetail";
import type { ClinicInfo } from "./ClinicDetail";

export interface ClinicDoctor {
  id: number;
  name: string;
  avatar: string;
  specialty: string;
  specialtyColor: string;
  specialtyBg: string;
  experience: number;
  rating: number;
  reviews: number;
  clinic: string;
  clinicAddress: string;
  distance: number;
  nextAvailable: string;
  consultFee: number;
}

const doctors: ClinicDoctor[] = [
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
    clinic: "City Medical Center",
    clinicAddress: "Gulberg III, Lahore",
    distance: 2.5,
    nextAvailable: "Today, 02:00 PM",
    consultFee: 50,
  },
  {
    id: 2,
    name: "Dr. Robert Martinez",
    avatar: "RM",
    specialty: "Pediatrics",
    specialtyColor: "#16A34A",
    specialtyBg: "bg-[#F0FDF4]",
    experience: 10,
    rating: 4.9,
    reviews: 203,
    clinic: "Healthcare Diagnostic Center",
    clinicAddress: "DHA Phase 5, Karachi",
    distance: 3.8,
    nextAvailable: "Tomorrow, 10:00 AM",
    consultFee: 45,
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    avatar: "EC",
    specialty: "General Medicine",
    specialtyColor: "#7C3AED",
    specialtyBg: "bg-[#F5F3FF]",
    experience: 8,
    rating: 4.7,
    reviews: 128,
    clinic: "City Medical Center",
    clinicAddress: "Gulberg III, Lahore",
    distance: 2.5,
    nextAvailable: "Today, 04:00 PM",
    consultFee: 35,
  },
];

interface Clinic {
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

const clinics: Clinic[] = [
  {
    id: 1,
    name: "City Medical Center",
    address: "Gulberg III, London",
    distance: 2.5,
    rating: 4.8,
    reviews: 412,
    doctors: 24,
    specialties: ["Cardiology", "General Medicine", "Dermatology"],
    nextAvailable: "Today, 02:00 PM",
    image: "CMC",
    color: "#0284C7",
  },
  {
    id: 2,
    name: "Healthcare Diagnostic Center",
    address: "DHA Phase 5, London",
    distance: 3.8,
    rating: 4.9,
    reviews: 356,
    doctors: 18,
    specialties: ["Pediatrics", "Orthopedics", "ENT"],
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "HDC",
    color: "#16A34A",
  },
  {
    id: 3,
    name: "St. Mary's Hospital",
    address: "Westminster, London",
    distance: 5.2,
    rating: 4.7,
    reviews: 289,
    doctors: 32,
    specialties: ["Neurology", "Cardiology", "Oncology"],
    nextAvailable: "Today, 04:30 PM",
    image: "SMH",
    color: "#7C3AED",
  },
];

const filterSections = [
  "Specialty",
  "Clinic",
  "Doctor Gender",
  "Experience",
  "Fee Range",
  "Availability",
];

export default function FindClinicDoctor({
  onBack,
}: {
  onBack: () => void;
}) {
  const [showFilters, setShowFilters] = useState(true);
  const [activeTab, setActiveTab] = useState<"doctors" | "clinics">("doctors");
  const [selectedDoctor, setSelectedDoctor] = useState<ClinicDoctor | null>(
    null
  );
  const [selectedClinic, setSelectedClinic] = useState<ClinicInfo | null>(null);

  if (selectedClinic) {
    return (
      <ClinicDetail
        clinic={selectedClinic}
        onBack={() => setSelectedClinic(null)}
      />
    );
  }

  if (selectedDoctor) {
    return (
      <ClinicDoctorDetail
        doctor={selectedDoctor}
        onBack={() => setSelectedDoctor(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-white bg-linear-to-r from-[#1E3A5F] to-[#0284C7] px-4 py-2 rounded-full hover:opacity-90 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Booking Type
        </button>
        <span className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] text-[#0284C7] text-xs font-semibold rounded-full border border-[#BAE6FD]">
          <Building2 className="w-3.5 h-3.5" />
          Physical Clinic Visit
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#101828]">
        Find Doctor & Clinic
      </h1>

      {/* Search bar */}
      <div className="bg-linear-to-r from-[#1E3A5F] to-[#0284C7] rounded-2xl p-1 flex items-center gap-1">
        <div className="flex items-center gap-2 bg-white/20 rounded-xl px-4 py-3 w-44">
          <MapPin className="w-4 h-4 text-white" />
          <span className="text-sm text-white/80">London</span>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3">
          <Search className="w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Specialty or Doctor Name"
            className="flex-1 text-sm text-[#101828] placeholder:text-[#9CA3AF] outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center justify-center bg-white/20 rounded-xl px-4 py-3">
          <CalendarDays className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-5">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-52 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#101828]">Filters</h3>
              <Filter className="w-4 h-4 text-[#6A7282]" />
            </div>

            <div className="space-y-4">
              {filterSections.map((label) => (
                <div key={label}>
                  <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">
                    {label}
                  </label>
                  <div className="w-full h-9 border border-gray-200 rounded-lg" />
                </div>
              ))}
            </div>

            <button className="mt-4 text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
              Clear All Filters
            </button>
          </div>
        )}

        {/* Listing area */}
        <div className="flex-1 space-y-4">
          {/* Tabs + results header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab("doctors")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === "doctors"
                    ? "bg-white text-[#0284C7] shadow-sm"
                    : "text-[#6A7282] hover:text-[#101828]"
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                Doctors
              </button>
              <button
                onClick={() => setActiveTab("clinics")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  activeTab === "clinics"
                    ? "bg-white text-[#0284C7] shadow-sm"
                    : "text-[#6A7282] hover:text-[#101828]"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Clinics
              </button>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6A7282] hover:text-[#101828] transition cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Count */}
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold text-[#101828]">
              {activeTab === "doctors" ? doctors.length : clinics.length}{" "}
              {activeTab}
            </span>{" "}
            found in London
          </p>

          {/* Doctor cards */}
          {activeTab === "doctors" &&
            doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
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

                <div className="flex items-center gap-1.5 mt-3">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-sm font-bold text-[#101828]">
                    {doc.rating}
                  </span>
                  <span className="text-xs text-[#6A7282]">
                    ({doc.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
                    <div>
                      <p className="text-xs font-semibold text-[#101828]">
                        {doc.clinic}
                      </p>
                      <p className="text-[11px] text-[#6A7282]">
                        {doc.clinicAddress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6A7282]">
                    <Navigation className="w-3 h-3" />
                    {doc.distance} km
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span className="text-xs font-medium text-[#16A34A]">
                      Next available: {doc.nextAvailable}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="px-4 py-2 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-xs font-semibold rounded-full hover:opacity-90 transition cursor-pointer"
                  >
                    View Clinic & Slots
                  </button>
                </div>
              </div>
            ))}

          {/* Clinic cards */}
          {activeTab === "clinics" &&
            clinics.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: clinic.color }}
                    >
                      {clinic.image}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#101828]">
                        {clinic.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-3 h-3 text-[#6A7282]" />
                        <span className="text-xs text-[#6A7282]">
                          {clinic.address}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#6A7282]">
                    <Navigation className="w-3 h-3" />
                    {clinic.distance} km
                  </div>
                </div>

                {/* Rating + doctors count */}
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-sm font-bold text-[#101828]">
                      {clinic.rating}
                    </span>
                    <span className="text-xs text-[#6A7282]">
                      ({clinic.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0284C7]" />
                    <span className="text-xs font-medium text-[#101828]">
                      {clinic.doctors} Doctors
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {clinic.specialties.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 text-[11px] font-medium text-[#0284C7] bg-[#F0F9FF] rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Next available + CTA */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span className="text-xs font-medium text-[#16A34A]">
                      Next available: {clinic.nextAvailable}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedClinic(clinic)}
                    className="px-4 py-2 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-xs font-semibold rounded-full hover:opacity-90 transition cursor-pointer"
                  >
                    View Clinic & Doctors
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
