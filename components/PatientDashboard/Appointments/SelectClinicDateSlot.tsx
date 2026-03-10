"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  MapPin,
  AlertCircle,
  ClipboardList,
  CheckCircle2,
  CalendarDays,
  User,
  Phone,
  Navigation2,
  Printer,
  Download,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import ClinicPatientDetails from "./ClinicPatientDetails";

interface SlotDoctor {
  name: string;
  avatar: string;
  specialty: string;
  specialtyColor: string;
  consultFee: number;
}

interface SlotClinic {
  name: string;
  address: string;
}

const timeSlots = {
  morning: {
    label: "Morning (9:00 AM - 12:00 PM)",
    color: "#0284C7",
    slots: [
      { time: "09:00 AM", full: true },
      { time: "09:30 AM", full: false },
      { time: "10:00 AM", full: false },
      { time: "10:30 AM", full: false },
      { time: "11:00 AM", full: false },
      { time: "11:30 AM", full: false },
    ],
  },
  afternoon: {
    label: "Afternoon (12:00 PM - 3:00 PM)",
    color: "#F59E0B",
    slots: [
      { time: "12:00 PM", full: true },
      { time: "12:30 PM", full: false },
      { time: "01:00 PM", full: false },
      { time: "01:30 PM", full: false },
      { time: "02:00 PM", full: false },
      { time: "02:30 PM", full: false },
    ],
  },
  evening: {
    label: "Evening (3:00 PM - 6:00 PM)",
    color: "#7C3AED",
    slots: [
      { time: "03:00 PM", full: true },
      { time: "03:30 PM", full: false },
      { time: "04:00 PM", full: false },
      { time: "04:30 PM", full: false },
      { time: "05:00 PM", full: false },
      { time: "05:30 PM", full: false },
    ],
  },
};

function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function SelectClinicDateSlot({
  doctor,
  clinic,
  onBack,
}: {
  doctor: SlotDoctor;
  clinic: SlotClinic;
  onBack: () => void;
}) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"slots" | "details" | "confirmed">("slots");

  if (step === "details") {
    return (
      <ClinicPatientDetails
        doctor={doctor}
        clinic={clinic}
        selectedDate={selectedDate}
        selectedTime={selectedTime!}
        onBack={() => setStep("slots")}
        onConfirm={() => setStep("confirmed")}
      />
    );
  }

  if (step === "confirmed") {
    return (
      <ClinicBookingConfirmed
        doctor={doctor}
        clinic={clinic}
        date={selectedDate}
        time={selectedTime!}
        onBack={onBack}
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
        Back to Clinic
      </button>

      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold text-[#101828]">
          Select Date & Time
        </h1>
        <p className="text-sm text-[#6A7282] mt-0.5">
          Choose a convenient appointment slot
        </p>
      </div>

      {/* 3-column layout: Calendar | Time Slots | Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_280px] gap-5">
        {/* Left: Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setSelectedTime(null);
              }
            }}
            disabled={{ before: today }}
            classNames={{
              day_selected:
                "bg-[#0284C7] text-white hover:bg-[#0284C7] focus:bg-[#0284C7]",
              day_today: "bg-[#F0F9FF] text-[#0284C7] font-bold",
            }}
          />
        </div>

        {/* Center: Time slots */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-xs font-bold text-[#101828] flex items-center gap-2 mb-5">
            <Clock className="w-4 h-4 text-[#0284C7]" />
            Available Time Slots
          </h3>

          <div className="space-y-6">
            {Object.entries(timeSlots).map(([key, section]) => (
              <div key={key}>
                <p className="text-xs font-semibold text-[#101828] flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: section.color }}
                  />
                  {section.label}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {section.slots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        disabled={slot.full}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`relative px-3 py-2.5 rounded-xl text-xs font-medium border transition cursor-pointer ${
                          slot.full
                            ? "border-gray-200 text-[#9CA3AF] bg-gray-50 cursor-not-allowed"
                            : isSelected
                              ? "border-[#0284C7] bg-[#0284C7] text-white"
                              : "border-gray-200 text-[#101828] hover:border-[#0284C7]"
                        }`}
                      >
                        {slot.time}
                        {slot.full && (
                          <span className="absolute -top-1 -right-1 text-[8px] bg-gray-200 text-[#6A7282] px-1 rounded font-bold">
                            Full
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-6">
          <h3 className="text-xs font-bold text-[#101828] flex items-center gap-2 mb-4">
            <ClipboardList className="w-4 h-4 text-[#0284C7]" />
            Appointment Summary
          </h3>

          {/* Doctor */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
              Doctor
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FFF7ED] flex items-center justify-center text-xs font-bold text-[#F59E0B] shrink-0">
                {doctor.avatar}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  {doctor.name}
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: doctor.specialtyColor }}
                >
                  {doctor.specialty}
                </p>
              </div>
            </div>
          </div>

          {/* Clinic */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
              Clinic
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-[#101828]">
                  {clinic.name}
                </p>
                <p className="text-[11px] text-[#6A7282]">{clinic.address}</p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
              Date & Time
            </p>
            {selectedTime ? (
              <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-lg px-3 py-2">
                <p className="text-xs font-bold text-[#0284C7]">
                  {formatLongDate(selectedDate)}
                </p>
                <p className="text-xs font-bold text-[#0284C7]">
                  {selectedTime}
                </p>
              </div>
            ) : (
              <p className="text-xs text-[#9CA3AF] italic">
                Select a time slot
              </p>
            )}
          </div>

          {/* Fee */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">
              Consultation Fee
            </p>
            <p className="text-lg font-bold text-[#0284C7]">
              £{doctor.consultFee}
            </p>
          </div>

          {/* Note */}
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-lg px-3 py-2 flex items-start gap-2 mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#92400E]">
              Please arrive 10 minutes early for token collection and
              registration.
            </p>
          </div>

          {/* Continue button */}
          <button
            disabled={!selectedTime}
            onClick={() => setStep("details")}
            className={`w-full py-3 text-sm font-bold rounded-xl transition cursor-pointer ${
              selectedTime
                ? "bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white hover:opacity-90"
                : "bg-gray-200 text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Booking Confirmed (inline) ── */
function ClinicBookingConfirmed({
  doctor,
  clinic,
  date,
  time,
  onBack,
}: {
  doctor: SlotDoctor;
  clinic: SlotClinic;
  date: Date;
  time: string;
  onBack: () => void;
}) {
  return (
    <div className="max-w-xl mx-auto text-center space-y-5 py-8">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#101828]">
          Appointment Confirmed!
        </h1>
        <p className="text-sm text-[#6A7282] mt-1">
          Your clinic visit has been scheduled
        </p>
        <p className="text-xs text-[#6A7282] mt-0.5">
          Please arrive 10 minutes early for registration
        </p>
      </div>

      {/* Appointment Details card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left space-y-5">
        <h3 className="text-sm font-bold text-[#101828] flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-[#0284C7]" />
          Appointment Details
        </h3>

        {/* Doctor */}
        <div className="bg-[#F8FAFC] rounded-xl p-4">
          <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
            Doctor
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center text-sm font-bold text-[#F59E0B] shrink-0">
              {doctor.avatar}
            </div>
            <div>
              <p className="text-sm font-bold text-[#101828]">{doctor.name}</p>
              <p className="text-xs" style={{ color: doctor.specialtyColor }}>
                {doctor.specialty}
              </p>
            </div>
          </div>
        </div>

        {/* Clinic Location */}
        <div className="bg-[#F8FAFC] rounded-xl p-4">
          <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
            Clinic Location
          </p>
          <p className="text-sm font-bold text-[#101828]">{clinic.name}</p>
          <p className="text-xs text-[#6A7282] mt-0.5">{clinic.address}</p>
          <button className="mt-3 w-full py-2.5 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2">
            <Navigation2 className="w-3.5 h-3.5" />
            Get Directions
          </button>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAFC] rounded-xl p-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <CalendarDays className="w-3 h-3" />
              Date
            </p>
            <p className="text-sm font-bold text-[#101828]">
              {formatLongDate(date)}
            </p>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl p-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Clock className="w-3 h-3" />
              Time
            </p>
            <p className="text-sm font-bold text-[#101828]">{time}</p>
          </div>
        </div>

        {/* Patient & Phone */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#F8FAFC] rounded-xl p-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <User className="w-3 h-3" />
              Patient Name
            </p>
            <p className="text-sm font-bold text-[#101828]">Sarah Johnson</p>
          </div>
          <div className="bg-[#F8FAFC] rounded-xl p-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide flex items-center gap-1.5 mb-1.5">
              <Phone className="w-3 h-3" />
              Phone Number
            </p>
            <p className="text-sm font-bold text-[#101828]">+44 20 7946 0958</p>
          </div>
        </div>
      </div>

      {/* Important Instructions */}
      <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-4 text-left">
        <p className="text-xs font-bold text-[#92400E] flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
          Important Instructions
        </p>
        <ul className="space-y-1.5 text-xs text-[#92400E] ml-6">
          <li className="list-disc">
            Please arrive 10 minutes early to collect your token
          </li>
          <li className="list-disc">
            Bring your ID and any relevant medical documents
          </li>
          <li className="list-disc">
            Token-based queue system is in operation
          </li>
          <li className="list-disc">
            Consultation fee: <span className="font-bold">£{doctor.consultFee}</span>{" "}
            (payable at clinic)
          </li>
        </ul>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-3">
        <button className="py-3 border border-gray-200 text-sm font-semibold text-[#4A5565] rounded-xl hover:bg-gray-50 transition cursor-pointer flex items-center justify-center gap-2">
          <Printer className="w-4 h-4" />
          Print
        </button>
        <button className="py-3 border border-gray-200 text-sm font-semibold text-[#0284C7] rounded-xl hover:bg-[#F0F9FF] transition cursor-pointer flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button
          onClick={onBack}
          className="py-3 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Done
        </button>
      </div>

      {/* SMS note */}
      <p className="text-xs text-[#9CA3AF]">
        A confirmation SMS has been sent to your phone number
      </p>
    </div>
  );
}
