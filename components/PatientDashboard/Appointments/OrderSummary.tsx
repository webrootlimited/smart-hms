"use client";

interface Doctor {
  name: string;
  specialty: string;
  initials: string;
  color: string;
  price: number;
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

export default function OrderSummary({
  doctor,
  selectedDate,
  selectedTime,
}: {
  doctor: Doctor;
  selectedDate: Date;
  selectedTime: string;
}) {
  const serviceFee = 0;
  const total = doctor.price + serviceFee;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-6">
      <h3 className="text-base font-bold text-[#101828] mb-4">Order Summary</h3>
      <div className="mb-4">
        <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">Doctor</p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: doctor.color }}>{doctor.initials}</div>
          <div>
            <p className="text-sm font-semibold text-[#101828]">{doctor.name}</p>
            <p className="text-xs text-[#6A7282]">{doctor.specialty}</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Appointment</p>
        <p className="text-sm font-medium text-[#101828]">{formatShortDate(selectedDate)} at {selectedTime}</p>
      </div>
      <div className="border-t border-gray-100 pt-3 space-y-2">
        <div className="flex items-center justify-between text-sm"><span className="text-[#6A7282]">Consultation Fee</span><span className="text-[#101828] font-medium">£{doctor.price}</span></div>
        <div className="flex items-center justify-between text-sm"><span className="text-[#6A7282]">Service Fee</span><span className="text-[#101828] font-medium">£{serviceFee}</span></div>
      </div>
      <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-[#101828]">Total</span>
        <span className="text-xl font-bold text-[#16A34A]">£{total}</span>
      </div>
    </div>
  );
}
