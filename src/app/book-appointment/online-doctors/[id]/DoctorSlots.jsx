// components/booking/DoctorSlots.jsx
"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Video } from "lucide-react";

export default function DoctorSlots({ doctorData, onContinue }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        if (!doctorData?.workLocations?.[0]) return;

        const loc = doctorData.workLocations[0];
        const dates = Object.keys(loc.availableSlots || {});

        if (dates.length > 0) {
            const firstDate = dates[0];
            const firstSlot = loc.availableSlots[firstDate]?.[0];
            if (firstSlot) {
                setSelectedDate(firstDate);
                setSelectedTime(firstSlot.start);
            }
        }
    }, [doctorData]);

    useEffect(() => {
        if (!doctorData || !selectedDate) return;
        const loc = doctorData.workLocations[0];
        const slots = loc?.availableSlots?.[selectedDate] || [];
        if (!slots.some((s) => s.start === selectedTime)) {
            setSelectedTime("");
        }
    }, [selectedDate, selectedTime, doctorData]);

    useEffect(() => {
        if (!doctorData || !selectedDate || selectedTime) return;
        const loc = doctorData.workLocations[0];
        const slots = loc?.availableSlots?.[selectedDate] || [];
        if (slots.length > 0) {
            setSelectedTime(slots[0].start);
        }
    }, [selectedDate, doctorData, selectedTime]);

    const handleContinue = () => {
        if (selectedDate && selectedTime) {
            onContinue(selectedDate, selectedTime);
        }
    };

    if (!doctorData?.workLocations?.[0]) {
        return (
            <p className="text-center mt-12 text-gray-500 text-sm">
                No schedule available
            </p>
        );
    }

    const location = doctorData.workLocations[0];
    const dates = Object.keys(location.availableSlots || {});
    const slotsForDate = location.availableSlots[selectedDate] || [];

    const grouped = {
        morning: slotsForDate.filter((s) => new Date(s.start).getHours() < 12),
        afternoon: slotsForDate.filter(
            (s) => new Date(s.start).getHours() >= 12 && new Date(s.start).getHours() < 17
        ),
        evening: slotsForDate.filter((s) => new Date(s.start).getHours() >= 17),
    };

    const isValid = selectedDate && selectedTime && slotsForDate.length > 0;

    return (
        <div className="min-h-screen bg-gray-50/60 pb-10 sm:pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                <div className="mb-5 sm:mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex cursor-pointer items-center gap-1.5 text-gray-600 hover:text-gray-800 text-sm font-medium mb-2.5"
                    >
                        <ArrowLeft size={15} />
                        Back
                    </button>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Select Slot
                    </h1>
                    <p className="text-sm text-gray-600 mt-0.5">
                        Choose date and time for your consultation
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
                    {/* Dates column */}
                    <div className="lg:col-span-3 xl:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-3.5">
                                <Calendar size={15} className="text-purple-600" />
                                <h2 className="text-sm font-medium text-gray-800">Dates</h2>
                            </div>

                            <div className="grid grid-flow-row grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 max-h-[380px] sm:max-h-[480px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                {dates.length === 0 ? (
                                    <p className="col-span-full text-xs text-gray-500 text-center py-8">
                                        No dates
                                    </p>
                                ) : (
                                    dates.map((date) => (
                                        <button
                                            key={date}
                                            onClick={() => setSelectedDate(date)}
                                            className={`py-2.5 cursor-pointer px-2.5 rounded-lg text-xs font-medium border transition-colors ${selectedDate === date
                                                ? "bg-purple-600 text-white border-purple-700 shadow-sm"
                                                : "border-gray-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300"
                                                }`}
                                        >
                                            <div className="opacity-80 text-[11px]">
                                                {new Date(date).toLocaleDateString("en-US", {
                                                    weekday: "short",
                                                })}
                                            </div>
                                            <div className="font-semibold">
                                                {new Date(date).getDate()}{" "}
                                                {new Date(date).toLocaleString("en-US", { month: "short" })}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Time slots column */}
                    <div className="lg:col-span-6 xl:col-span-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5">
                            <div className="flex items-center gap-2 mb-3.5">
                                <Clock size={15} className="text-purple-600" />
                                <h2 className="text-sm font-medium text-gray-800">Available Times</h2>
                            </div>

                            {slotsForDate.length === 0 ? (
                                <div className="text-center py-14 sm:py-20 text-gray-500">
                                    <Clock size={28} className="mx-auto mb-3 opacity-50" />
                                    <p className="text-sm font-medium">No slots this day</p>
                                    <p className="text-xs mt-1.5">Try another date</p>
                                </div>
                            ) : (
                                <div className="max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                    {["morning", "afternoon", "evening"].map(
                                        (period) =>
                                            grouped[period]?.length > 0 && (
                                                <div key={period} className="mb-6">
                                                    <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3 pb-1 border-b border-gray-100">
                                                        {period}
                                                    </h3>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                                        {grouped[period].map((slot) => {
                                                            const timeStr = new Date(slot.start).toLocaleTimeString(
                                                                "en-US",
                                                                {
                                                                    hour: "numeric",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                }
                                                            );
                                                            return (
                                                                <button
                                                                    key={slot.start}
                                                                    onClick={() => setSelectedTime(slot.start)}
                                                                    className={`
                                    relative group flex flex-col items-center justify-center py-3 px-4 
                                    rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 border
                                    ${selectedTime === slot.start
                                                                            ? "bg-purple-600 text-white border-purple-700 shadow-md scale-[1.02]"
                                                                            : "bg-white border-gray-200 text-gray-800 hover:border-purple-400 hover:shadow-sm hover:bg-purple-50/40"
                                                                        }
                                  `}
                                                                >
                                                                    <div className="flex items-center gap-2 mb-0.5">
                                                                        <Video
                                                                            size={14}
                                                                            className={
                                                                                selectedTime === slot.start
                                                                                    ? "text-white"
                                                                                    : "text-purple-600 opacity-80"
                                                                            }
                                                                        />
                                                                        <span className="font-semibold">{timeStr}</span>
                                                                    </div>
                                                                    <span className="text-[10px] opacity-70">
                                                                        15 min video
                                                                    </span>
                                                                    <span className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-10 bg-white transition-opacity duration-200" />
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Summary column */}
                    <div className="lg:col-span-3 xl:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:sticky lg:top-6">
                            <h2 className="text-sm font-medium text-gray-800 mb-4">Summary</h2>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-base">
                                    {doctorData.fullName?.[0] || "?"}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {doctorData.fullName || "Doctor"}
                                    </p>
                                    <p className="text-xs text-gray-600 truncate">
                                        {doctorData.specialty || "Specialist"}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-lg p-3 mb-4 text-xs">
                                <div className="text-gray-600 mb-0.5">Selected Slot</div>
                                {isValid ? (
                                    <div className="font-medium text-purple-900">
                                        {new Date(selectedDate).toLocaleDateString("en-US", {
                                            weekday: "short",
                                            day: "numeric",
                                            month: "short",
                                        })}{" "}
                                        •{" "}
                                        {new Date(selectedTime).toLocaleTimeString("en-US", {
                                            hour: "numeric",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-gray-500 italic">Select date & time</div>
                                )}
                            </div>

                            <div className="mb-5">
                                <div className="text-xs text-gray-600">Fee</div>
                                <div className="text-lg font-semibold text-purple-700">Rs. 2,500</div>
                            </div>

                            <button
                                onClick={handleContinue}
                                disabled={!isValid}
                                className={`w-full py-2.5 rounded-lg text-sm cursor-pointer font-medium transition-colors ${isValid
                                    ? "bg-purple-600 text-white hover:bg-purple-700"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 5px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
        </div>
    );
}