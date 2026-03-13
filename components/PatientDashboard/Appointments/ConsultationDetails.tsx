"use client";

import { useState } from "react";
import { ArrowLeft, FileText, Upload, Languages } from "lucide-react";
import PaymentStep from "./PaymentStep";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  color: string;
  price: number;
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
}

export default function ConsultationDetails({
  doctor,
  selectedDate,
  selectedTime,
  onBack,
}: {
  doctor: Doctor;
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
}) {
  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return (
      <PaymentStep
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBack={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold text-[#101828]">
          Consultation Details
        </h1>
        <p className="text-sm text-[#6A7282] mt-0.5">
          Provide information for the doctor
        </p>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl mx-auto">
        <h2 className="text-base font-bold text-[#101828] flex items-center gap-2 mb-5">
          <FileText className="w-5 h-5 text-[#7C3AED]" />
          Enter Details
        </h2>

        <div className="space-y-5">
          {/* Reason */}
          <div>
            <label className="text-sm font-medium text-[#101828] block mb-1.5">
              Reason for Consultation<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-[#6A7282] absolute left-3 top-3" />
              <textarea
                placeholder="Describe your health concern..."
                rows={4}
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] resize-none"
              />
            </div>
          </div>

          {/* Preferred Language */}
          <div>
            <label className="text-sm font-medium text-[#101828] block mb-1.5">
              Preferred Language
            </label>
            <div className="relative">
              <Languages className="w-4 h-4 text-[#6A7282] absolute left-3 top-1/2 -translate-y-1/2" />
              <select className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] appearance-none cursor-pointer">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Urdu</option>
                <option>Arabic</option>
                <option>Punjabi</option>
              </select>
            </div>
          </div>

          {/* Upload Reports */}
          <div>
            <label className="text-sm font-medium text-[#101828] block mb-1.5">
              Upload Medical Reports (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[#7C3AED]/40 transition cursor-pointer">
              <Upload className="w-5 h-5 text-[#6A7282] mx-auto mb-1" />
              <p className="text-sm text-[#6A7282]">
                Upload reports or prescriptions
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
            <h3 className="text-sm font-bold text-[#101828] mb-3">Summary</h3>
            <div className="flex items-center gap-8">
              <div>
                <p className="text-[10px] text-[#6A7282] uppercase tracking-wide">
                  Doctor
                </p>
                <p className="text-sm font-semibold text-[#101828]">
                  {doctor.name}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#6A7282] uppercase tracking-wide">
                  Date & Time
                </p>
                <p className="text-sm font-semibold text-[#101828]">
                  {formatShortDate(selectedDate)} at {selectedTime}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onBack}
              className="flex-1 py-3 border border-gray-200 text-sm font-semibold text-[#4A5565] rounded-xl hover:bg-gray-50 transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setShowPayment(true)}
              className="flex-1 py-3 bg-linear-to-r from-[#7C3AED] to-[#A855F7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
