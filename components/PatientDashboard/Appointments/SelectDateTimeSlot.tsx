"use client";

import { useState } from "react";
import { ArrowLeft, CalendarDays, Clock, Video } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import ConsultationDetails from "./ConsultationDetails";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  initials: string;
  color: string;
  price: number;
}

const timeSlots = {
  Morning: [
    { time: "09:00 AM", duration: "15 min call" },
    { time: "10:00 AM", duration: "15 min call" },
    { time: "11:00 AM", duration: "15 min call" },
    { time: "12:00 PM", duration: "15 min call" },
  ],
  Afternoon: [
    { time: "01:00 PM", duration: "15 min call" },
    { time: "02:00 PM", duration: "15 min call" },
    { time: "03:00 PM", duration: "15 min call" },
    { time: "04:00 PM", duration: "15 min call" },
  ],
  Evening: [
    { time: "05:00 PM", duration: "15 min call" },
    { time: "06:00 PM", duration: "15 min call" },
    { time: "07:00 PM", duration: "15 min call" },
    { time: "08:00 PM", duration: "15 min call" },
  ],
};

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function SelectDateTimeSlot({
  doctor,
  onBack,
}: {
  doctor: Doctor;
  onBack: () => void;
}) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return (
      <ConsultationDetails
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        onBack={() => setShowDetails(false)}
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
        Back to Search
      </button>

      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold text-[#101828]">
          Select Date & Time for Video Call
        </h1>
        <p className="text-sm text-[#6A7282] mt-0.5">
          Choose a slot for online consultation
        </p>
      </div>

      {/* Main 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_260px] gap-5">
        {/* Left: Calendar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-[#101828] flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-[#7C3AED]" />
            Select Date
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            disabled={{ before: today }}
            className="rounded-lg"
            classNames={{
              today: "rounded-md bg-[#F5F3FF] text-[#7C3AED] font-bold",
            }}
          />
        </div>

        {/* Middle: Time slots */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#101828] flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-[#7C3AED]" />
            Available Time Slots
          </h3>

          <div className="space-y-5">
            {Object.entries(timeSlots).map(([period, slots]) => (
              <div key={period}>
                <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide mb-2.5">
                  {period}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {slots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition cursor-pointer ${
                          isSelected
                            ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-md"
                            : "bg-white text-[#4A5565] border-gray-200 hover:border-[#7C3AED]/40"
                        }`}
                      >
                        <Video
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? "text-white/70" : "text-[#7C3AED]"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-semibold">{slot.time}</p>
                          <p
                            className={`text-[10px] ${
                              isSelected ? "text-white/70" : "text-[#6A7282]"
                            }`}
                          >
                            {slot.duration}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-6">
          <h3 className="text-base font-bold text-[#101828] mb-4">Summary</h3>

          {/* Doctor */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
              Doctor
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: doctor.color }}
              >
                {doctor.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  {doctor.name}
                </p>
                <p className="text-xs text-[#6A7282]">{doctor.specialty}</p>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-[#F5F3FF] rounded-lg px-3 py-2.5 mb-4">
            <p className="text-sm font-medium text-[#101828]">
              {formatDateLabel(selectedDate)}
            </p>
            <p className="text-sm font-bold text-[#7C3AED]">{selectedTime}</p>
          </div>

          {/* Fee */}
          <div className="mb-5">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">
              Consultation Fee
            </p>
            <p className="text-xl font-bold text-[#7C3AED]">£{doctor.price}</p>
          </div>

          {/* Continue */}
          <button
            onClick={() => setShowDetails(true)}
            className="w-full py-3 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
