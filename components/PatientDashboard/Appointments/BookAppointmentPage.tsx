"use client";

import { useState } from "react";
import {
  MapPin,
  Video,
  ClipboardList,
  Building2,
  MonitorPlay,
  Plane,
  CalendarCheck,
  Info,
} from "lucide-react";
import FindOnlineDoctor from "./FindOnlineDoctor";
import FindClinicDoctor from "./FindClinicDoctor";

const consultationTypes = [
  {
    id: "physical",
    emoji: "🏥",
    title: "Physical Clinic Visit",
    subtitle: "Visit doctor at clinic location",
    badge: "Recommended",
    badgeColor: "bg-[#ECFDF5] text-[#059669]",
    iconBg: "bg-[#EFF6FF]",
    iconColor: "#0284C7",
    Icon: Building2,
    features: [
      { icon: MapPin, text: "In-person consultation" },
      { icon: Building2, text: "Choose clinic location" },
      { icon: ClipboardList, text: "Token-based queue system" },
    ],
    button: "Book Clinic Visit",
    buttonStyle:
      "bg-linear-to-r from-[#1E3A5F] to-[#0284C7] hover:from-[#1E3A5F]/90 hover:to-[#0284C7]/90",
  },
  {
    id: "online",
    emoji: "💻",
    title: "Online Consultation",
    subtitle: "Consult from home via video call",
    badge: "Convenient",
    badgeColor: "bg-[#F5F3FF] text-[#7C3AED]",
    iconBg: "bg-[#F5F3FF]",
    iconColor: "#7C3AED",
    Icon: MonitorPlay,
    features: [
      { icon: Video, text: "Video consultation" },
      { icon: Plane, text: "No travel required" },
      { icon: CalendarCheck, text: "Instant confirmation" },
    ],
    button: "Book Online Consultation",
    buttonStyle:
      "bg-linear-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#7C3AED]/90 hover:to-[#A855F7]/90",
  },
];

export default function BookAppointmentPage() {
  const [view, setView] = useState<"select" | "online" | "physical">("select");

  if (view === "online") {
    return <FindOnlineDoctor onBack={() => setView("select")} />;
  }

  if (view === "physical") {
    return <FindClinicDoctor onBack={() => setView("select")} />;
  }

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative bg-linear-to-r from-[#EFF6FF] via-[#F0F9FF] to-[#EFF6FF] rounded-2xl border border-blue-100 px-8 py-8 overflow-hidden">
        <div className="max-w-lg">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#101828]">
            Book Your Appointment{" "}
            <span className="text-[#0284C7]">in Minutes</span>
          </h1>
          <p className="text-sm text-[#6A7282] mt-2 leading-relaxed">
            Choose a doctor, select a time slot, and confirm — hassle-free and
            fast access to premium healthcare.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-[#0284C7]/5" />
        <div className="absolute right-10 bottom-2 w-20 h-20 rounded-full bg-[#0284C7]/8" />
        <div className="absolute right-4 top-4 w-16 h-16 rounded-full bg-[#BAE6FD]/30" />
      </div>

      {/* Section heading */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#101828]">Book Appointment</h2>
        <p className="text-sm text-[#6A7282] mt-1">
          Choose your preferred consultation type
        </p>
      </div>

      {/* Consultation Type Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {consultationTypes.map((type) => (
          <div
            key={type.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-md hover:border-gray-200 transition"
          >
            {/* Icon + Badge row */}
            <div className="flex items-start justify-between mb-5">
              <div
                className={`w-14 h-14 rounded-2xl ${type.iconBg} flex items-center justify-center`}
              >
                <type.Icon
                  className="w-7 h-7"
                  style={{ color: type.iconColor }}
                />
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${type.badgeColor}`}
              >
                {type.badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#101828]">
              {type.emoji} {type.title}
            </h3>
            <p className="text-sm text-[#6A7282] mt-1">{type.subtitle}</p>

            {/* Features */}
            <div className="mt-4 space-y-2.5 flex-1">
              {type.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <f.icon
                    className="w-4 h-4 shrink-0"
                    style={{ color: type.iconColor }}
                  />
                  <span className="text-sm text-[#4A5565]">{f.text}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button
              onClick={() => {
                if (type.id === "online") setView("online");
                if (type.id === "physical") setView("physical");
              }}
              className={`mt-6 w-full py-3 rounded-full text-white text-sm font-semibold ${type.buttonStyle} transition cursor-pointer`}
            >
              {type.button}
            </button>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="max-w-3xl mx-auto bg-[#F8FAFC] border border-gray-100 rounded-xl px-5 py-3 flex items-start gap-2">
        <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
        <p className="text-xs text-[#6A7282]">
          <span className="font-semibold text-[#101828]">Note: </span>
          Physical appointments require clinic visit and follow token-based
          queuing. Online consultations are conducted via secure video call with
          advance payment.
        </p>
      </div>
    </div>
  );
}
