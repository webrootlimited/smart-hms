"use client";

function formatDateLabel(date: Date) {
  return date.toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" });
}

interface Doctor {
  name: string;
  specialty: string;
  initials: string;
  color: string;
  price: number;
}

export default function BookingSummary({
  doctor, selectedDate, selectedTime, onContinue,
}: {
  doctor: Doctor;
  selectedDate: Date;
  selectedTime: string;
  onContinue: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-6">
      <h3 className="text-base font-bold text-[#101828] mb-4">Summary</h3>

      <div className="mb-4">
        <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">Doctor</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: doctor.color }}>
            {doctor.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#101828]">{doctor.name}</p>
            <p className="text-xs text-[#6A7282]">{doctor.specialty}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#F5F3FF] rounded-lg px-3 py-2.5 mb-4">
        <p className="text-sm font-medium text-[#101828]">{formatDateLabel(selectedDate)}</p>
        <p className="text-sm font-bold text-[#7C3AED]">{selectedTime || "No slot selected"}</p>
      </div>

      <div className="mb-5">
        <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Consultation Fee</p>
        <p className="text-xl font-bold text-[#7C3AED]">£{doctor.price}</p>
      </div>

      <button
        onClick={onContinue}
        disabled={!selectedTime}
        className="w-full py-3 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
