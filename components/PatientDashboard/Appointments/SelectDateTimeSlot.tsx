"use client";

import { useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import ConsultationDetails from "./ConsultationDetails";
import TimeSlotsPanel from "./TimeSlotsPanel";
import BookingSummary from "./BookingSummary";

interface Doctor {
  id: string; name: string; specialty: string;
  initials: string; color: string; price: number;
}

interface TimeSlot { time: string; duration: string; available?: boolean; }
type GroupedSlots = Record<string, TimeSlot[]>;

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" });
}

function toDateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function SelectDateTimeSlot({ doctor, onBack }: { doctor: Doctor; onBack: () => void }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const dateStr = toDateString(selectedDate);

  const { data: slots = {}, isLoading } = useQuery({
    queryKey: queryKeys.onlineSlots(doctor.id, dateStr),
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; slots: GroupedSlots }>(
        `/api/patient/doctors/${doctor.id}/online-slots`, { date: dateStr }
      );
      const allSlots = Object.values(res.slots).flat();
      const firstAvailable = allSlots.find((s) => s.available !== false);
      if (firstAvailable) setSelectedTime(firstAvailable.time);
      else setSelectedTime("");
      return res.slots;
    },
  });

  if (showDetails) {
    return <ConsultationDetails doctor={doctor} selectedDate={selectedDate} selectedTime={selectedTime} onBack={() => setShowDetails(false)} />;
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
        <ArrowLeft className="w-4 h-4" /> Back to Search
      </button>

      <div>
        <h1 className="text-xl font-bold text-[#101828]">Select Date & Time for Video Call</h1>
        <p className="text-sm text-[#6A7282] mt-0.5">Choose a slot for online consultation</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_260px] gap-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="text-sm font-semibold text-[#101828] flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-[#7C3AED]" /> Select Date
          </h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => { if (date) { setSelectedDate(date); setSelectedTime(""); } }}
            disabled={{ before: today }}
            className="rounded-lg"
            classNames={{ today: "rounded-md bg-[#F5F3FF] text-[#7C3AED] font-bold" }}
          />
        </div>

        <TimeSlotsPanel slots={slots} isLoading={isLoading} selectedTime={selectedTime} onSelectTime={setSelectedTime} dateLabel={formatDateLabel(selectedDate)} />

        <BookingSummary doctor={doctor} selectedDate={selectedDate} selectedTime={selectedTime} onContinue={() => setShowDetails(true)} />
      </div>
    </div>
  );
}
