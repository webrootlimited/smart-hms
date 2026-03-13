"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CalendarDays, Clock, Video, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import ConsultationDetails from "./ConsultationDetails";
import instance from "@/utils/instance";
import getToken from "@/auth/getToken";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  color: string;
  price: number;
}

interface TimeSlot {
  time: string;
  duration: string;
}

type GroupedSlots = Record<string, TimeSlot[]>;

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function toDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
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
  const [selectedTime, setSelectedTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [slots, setSlots] = useState<GroupedSlots>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setLoading(true);
        setSelectedTime("");
        const token = await getToken();
        const { data } = await instance.get(
          `/api/patient/doctors/${doctor.id}/online-slots`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { date: toDateString(selectedDate) },
          }
        );
        if (data.success) {
          setSlots(data.slots);
          // Auto-select first available slot
          const allSlots = Object.values(data.slots).flat() as TimeSlot[];
          if (allSlots.length > 0) setSelectedTime(allSlots[0].time);
        }
      } catch {
        setSlots({});
      } finally {
        setLoading(false);
      }
    };
    fetchSlots();
  }, [selectedDate, doctor.id]);

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

  const hasSlots = Object.keys(slots).length > 0;

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

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-[#7C3AED]" />
            </div>
          ) : !hasSlots ? (
            <div className="text-center py-12">
              <Clock className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#101828]">No slots available</p>
              <p className="text-xs text-[#6A7282] mt-1">
                The doctor has no online hours on {formatDateLabel(selectedDate)}. Try a different date.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {Object.entries(slots).map(([period, periodSlots]) => (
                <div key={period}>
                  <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide mb-2.5">
                    {period}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {periodSlots.map((slot) => {
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
          )}
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
            <p className="text-sm font-bold text-[#7C3AED]">
              {selectedTime || "No slot selected"}
            </p>
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
            disabled={!selectedTime}
            className="w-full py-3 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
