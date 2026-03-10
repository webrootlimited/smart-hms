"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";

export default function BookAppointmentCard() {
  const params = useParams();
  const base = `/patient/${params.patientName}`;

  return (
    <Link
      href={`${base}/book-appointment`}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#0284C7]/30 hover:shadow-md transition"
    >
      <div className="w-12 h-12 rounded-full bg-[#F0F9FF] border-2 border-dashed border-[#0284C7]/40 flex items-center justify-center mb-3">
        <Plus className="w-5 h-5 text-[#0284C7]" />
      </div>
      <h3 className="text-sm font-bold text-[#101828]">Book Appointment</h3>
      <p className="text-xs text-[#6A7282] mt-1">
        Schedule a visit with a specialist near you.
      </p>
    </Link>
  );
}
