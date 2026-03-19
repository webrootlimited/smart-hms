"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  FileText,
  Upload,
  AlertTriangle,
  ClipboardList,
  MapPin,
  CalendarDays,
  Clock,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface DetailsDoctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  consultFee: number;
  photo_url: string;
}

type DetailsClinic = {
  id: string;
  name: string;
  address: string;
} | null;

interface PatientProfile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function ClinicPatientDetails({
  doctor,
  clinic,
  selectedDate,
  selectedTime,
  onBack,
  onConfirm,
}: {
  doctor: DetailsDoctor;
  clinic: DetailsClinic;
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [bookingFor, setBookingFor] = useState<"self" | "other">("self");

  const { data: profileData, isLoading: profileLoading } = useQuery<{ success: boolean; patient: PatientProfile }>({
    queryKey: queryKeys.patientProfile,
    queryFn: () => apiFetch("/api/patient/profile"),
  });

  // Auto-fill with patient's own info on mount and when switching to "self"
  useEffect(() => {
    if (profileData?.patient && bookingFor === "self") {
      const p = profileData.patient;
      setPatientName(`${p.first_name} ${p.last_name}`.trim());
      setPhone(p.phone || "");
      setEmail(p.email || "");
    }
  }, [profileData, bookingFor]);

  const handleBookingToggle = (type: "self" | "other") => {
    setBookingFor(type);
    if (type === "other") {
      setPatientName("");
      setPhone("");
      setEmail("");
    }
  };

  const isSelf = bookingFor === "self";

  return (
    <div className="space-y-5">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Slot Selection
      </button>

      <div>
        <h1 className="text-xl font-bold text-[#101828]">Patient Details</h1>
        <p className="text-sm text-[#6A7282] mt-0.5">
          Confirm your information for the appointment
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-[#101828] flex items-center gap-2 mb-5">
            <ClipboardList className="w-5 h-5 text-[#0284C7]" />
            Enter Patient Information
          </h2>

          {/* Booking for toggle */}
          <div className="mb-5">
            <p className="text-xs font-medium text-[#4A5565] mb-2">Booking for</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleBookingToggle("self")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  isSelf
                    ? "bg-[#0284C7] text-white"
                    : "bg-gray-100 text-[#4A5565] hover:bg-gray-200"
                }`}
              >
                Myself
              </button>
              <button
                onClick={() => handleBookingToggle("other")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  !isSelf
                    ? "bg-[#0284C7] text-white"
                    : "bg-gray-100 text-[#4A5565] hover:bg-gray-200"
                }`}
              >
                Someone Else
              </button>
            </div>
          </div>

          {profileLoading && isSelf ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-[#0284C7] animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Patient Name */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">
                  Patient Name <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">
                  Phone Number <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+44 20 1234 5678"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
                  />
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">
                  Reason for Visit <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-[#9CA3AF]" />
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason for consultation..."
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition resize-none"
                  />
                </div>
              </div>

              {/* Upload Medical Reports */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">
                  Upload Medical Reports (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-4 text-center hover:border-[#0284C7] transition cursor-pointer">
                  <Upload className="w-5 h-5 text-[#9CA3AF] mx-auto mb-1" />
                  <p className="text-xs font-medium text-[#4A5565]">
                    Click to upload reports (PDF, Images)
                  </p>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1">
                  Upload any relevant medical reports, prescriptions, or test results
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Appointment Summary */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-[#101828] flex items-center gap-2 mb-4">
            <ClipboardList className="w-4 h-4 text-[#0284C7]" />
            Appointment Summary
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Doctor</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[10px] font-bold text-[#0284C7] shrink-0">
                  {doctor.initials}
                </div>
                <p className="text-xs font-semibold text-[#101828]">{doctor.name}</p>
              </div>
            </div>
            {clinic && (
              <div>
                <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Clinic</p>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#6A7282] shrink-0" />
                  <p className="text-xs font-semibold text-[#101828]">{clinic.name}</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Date</p>
              <div className="flex items-center gap-1.5">
                <CalendarDays className="w-3 h-3 text-[#6A7282] shrink-0" />
                <p className="text-xs font-semibold text-[#101828]">{formatLongDate(selectedDate)}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Time</p>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#6A7282] shrink-0" />
                <p className="text-xs font-semibold text-[#101828]">{selectedTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important note */}
        <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl px-4 py-3 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
          <p className="text-xs text-[#92400E]">
            <span className="font-bold">Important:</span> Please arrive 10 minutes early to collect your token. Late arrivals may result in rescheduling.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 border border-gray-200 text-sm font-semibold text-[#4A5565] rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={!patientName || !phone || !reason}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition cursor-pointer ${
              patientName && phone && reason
                ? "bg-linear-to-r from-[#16A34A] to-[#059669] text-white hover:opacity-90"
                : "bg-gray-200 text-[#9CA3AF] cursor-not-allowed"
            }`}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
