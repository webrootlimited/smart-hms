"use client";

import { Clock, Video, Loader2 } from "lucide-react";

interface TimeSlot {
  time: string;
  duration: string;
  available?: boolean;
}

type GroupedSlots = Record<string, TimeSlot[]>;

export default function TimeSlotsPanel({
  slots,
  isLoading,
  selectedTime,
  onSelectTime,
  dateLabel,
}: {
  slots: GroupedSlots;
  isLoading: boolean;
  selectedTime: string;
  onSelectTime: (time: string) => void;
  dateLabel: string;
}) {
  const hasSlots = Object.keys(slots).length > 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-[#101828] flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-[#7C3AED]" /> Available Time Slots
      </h3>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-5 h-5 animate-spin text-[#7C3AED]" />
        </div>
      ) : !hasSlots ? (
        <div className="text-center py-12">
          <Clock className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#101828]">No slots available</p>
          <p className="text-xs text-[#6A7282] mt-1">
            The doctor has no online hours on {dateLabel}. Try a different date.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {Object.entries(slots).map(([period, periodSlots]) => (
            <div key={period}>
              <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide mb-2.5">{period}</p>
              <div className="grid grid-cols-2 gap-3">
                {periodSlots.map((slot) => {
                  const isBooked = slot.available === false;
                  const isSelected = selectedTime === slot.time && !isBooked;
                  return (
                    <button
                      key={slot.time}
                      onClick={() => !isBooked && onSelectTime(slot.time)}
                      disabled={isBooked}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-left transition ${
                        isBooked
                          ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                          : isSelected
                            ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-md cursor-pointer"
                            : "bg-white text-[#4A5565] border-gray-200 hover:border-[#7C3AED]/40 cursor-pointer"
                      }`}
                    >
                      <Video className={`w-4 h-4 shrink-0 ${isBooked ? "text-gray-300" : isSelected ? "text-white/70" : "text-[#7C3AED]"}`} />
                      <div>
                        <p className="text-sm font-semibold">{slot.time}</p>
                        <p className={`text-[10px] ${isBooked ? "text-red-400 font-semibold" : isSelected ? "text-white/70" : "text-[#6A7282]"}`}>
                          {isBooked ? "Booked" : slot.duration}
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
  );
}
