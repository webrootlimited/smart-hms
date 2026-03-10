"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Video,
  Globe,
  CalendarClock,
  Star,
  CheckCircle2,
  MonitorPlay,
} from "lucide-react";
import SelectDateTimeSlot from "./SelectDateTimeSlot";

const benefits = [
  "No travel required - consult from anywhere",
  "Secure video call with doctor",
  "Instant confirmation after payment",
  "Digital prescription provided",
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    experience: 15,
    rating: 4.8,
    reviews: 124,
    languages: ["English", "Urdu"],
    nextAvailable: "Today, 03:00 PM",
    price: 120,
    color: "#F59E0B",
    initials: "SJ",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Robert Martinez",
    specialty: "Pediatrics",
    experience: 10,
    rating: 4.9,
    reviews: 203,
    languages: ["English", "Spanish"],
    nextAvailable: "Tomorrow, 11:00 AM",
    price: 95,
    color: "#EF4444",
    initials: "RM",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Aisha Khan",
    specialty: "Dermatology",
    experience: 12,
    rating: 4.7,
    reviews: 89,
    languages: ["English", "Urdu", "Punjabi"],
    nextAvailable: "Today, 05:00 PM",
    price: 110,
    color: "#7C3AED",
    initials: "AK",
    available: true,
  },
];

type SelectedDoctor = (typeof doctors)[number] | null;

export default function FindOnlineDoctor({
  onBack,
}: {
  onBack: () => void;
}) {
  const [selectedDoctor, setSelectedDoctor] = useState<SelectedDoctor>(null);

  if (selectedDoctor) {
    return (
      <SelectDateTimeSlot
        doctor={selectedDoctor}
        onBack={() => setSelectedDoctor(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] rounded-2xl px-6 py-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Booking Type
          </button>
          <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full">
            <MonitorPlay className="w-3.5 h-3.5" />
            Online Consultation
          </span>
        </div>
        <h1 className="text-xl font-bold">Find Doctor for Online Consultation</h1>

        {/* Search */}
        <div className="flex gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Speciality or Doctor Name"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/20 focus:outline-none focus:bg-white/25"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Count */}
      <p className="text-sm text-[#6A7282]">
        <span className="font-semibold text-[#101828]">{doctors.length} doctors</span>{" "}
        available for online consultation
      </p>

      {/* Benefits */}
      <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
        <h3 className="text-sm font-bold text-[#101828] flex items-center gap-2 mb-2">
          <MonitorPlay className="w-4 h-4 text-[#7C3AED]" />
          Online Consultation Benefits
        </h3>
        <ul className="space-y-1.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#4A5565]">
              <span className="text-[#7C3AED] mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor Cards */}
      <div className="space-y-4">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between flex-wrap gap-3">
              {/* Doctor info */}
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: doc.color }}
                >
                  {doc.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#101828]">{doc.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-medium text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded">
                      {doc.specialty}
                    </span>
                    <span className="text-xs text-[#6A7282]">{doc.experience} years</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-xs font-semibold text-[#101828]">{doc.rating}</span>
                    <span className="text-xs text-[#6A7282]">({doc.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-xs text-[#6A7282]">GBP</p>
                <p className="text-lg font-bold text-[#7C3AED]">£{doc.price}</p>
              </div>
            </div>

            {/* Tags row */}
            <div className="flex items-center flex-wrap gap-3 mt-3 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1.5 text-xs text-[#4A5565]">
                <Video className="w-3.5 h-3.5 text-[#7C3AED]" />
                Video Call
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#4A5565]">
                <Globe className="w-3.5 h-3.5 text-[#7C3AED]" />
                {doc.languages.join(", ")}
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[#16A34A]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Online Available
              </span>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between mt-3">
              <span className="flex items-center gap-1.5 text-xs text-[#6A7282]">
                <CalendarClock className="w-3.5 h-3.5 text-[#7C3AED]" />
                Next available: {doc.nextAvailable}
              </span>
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="px-5 py-2 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
              >
                Book Online
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
