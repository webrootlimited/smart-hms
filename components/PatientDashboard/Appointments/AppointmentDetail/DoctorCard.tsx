"use client";

import { Phone, Video, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { PatientAppointmentDetail } from "./types";

const COLORS = ["#0284C7", "#7C3AED", "#059669", "#EA580C", "#0891B2", "#D946EF", "#CA8A04"];
function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function DoctorCard({ appointment }: { appointment: PatientAppointmentDetail }) {
  const params = useParams();
  const router = useRouter();
  const { doctor, clinic } = appointment;
  const isOnline = appointment.appointment_type === "ONLINE";

  const { data: roomData } = useQuery({
    queryKey: ["videoRoom", appointment.id],
    queryFn: () => apiFetch<{ success: boolean; room: { roomUrl: string } | null }>(`/api/video/room/${appointment.id}`),
    enabled: isOnline && (appointment.status === "CONFIRMED" || appointment.status === "CHECKED_IN"),
    refetchInterval: 10000,
  });

  const hasActiveRoom = !!roomData?.room?.roomUrl;

  return (
    <div className="space-y-4">
      {/* Doctor info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#101828] mb-4">Your Doctor</h3>
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: getColor(doctor.name) }}
          >
            {doctor.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-[#101828]">{doctor.name}</p>
            <p className="text-xs text-[#6A7282]">{doctor.specialty}</p>
            {doctor.department && (
              <p className="text-[11px] text-[#6A7282]">{doctor.department}</p>
            )}
          </div>
        </div>

        {doctor.phone && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
            <p className="text-xs text-[#101828]">{doctor.phone}</p>
          </div>
        )}

        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-[#6A7282]">Consultation Fee</span>
          <span className="text-sm font-bold text-[#101828]">£{doctor.consultation_fee}</span>
        </div>
      </div>

      {/* Telehealth or Clinic card */}
      {isOnline ? (
        <div className="bg-linear-to-br from-[#7C3AED] to-[#6D28D9] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Video className="w-5 h-5" />
            <h3 className="text-sm font-bold">Online Consultation</h3>
          </div>
          <p className="text-xs text-white/80 mb-4">
            Your video consultation will take place online. Make sure you have a stable internet connection.
          </p>
          {(appointment.status === "CONFIRMED" || appointment.status === "CHECKED_IN") && hasActiveRoom && (
            <button
              onClick={() => router.push(`/patient/${params.patientName}/telehealth/${appointment.id}`)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#7C3AED] text-sm font-semibold rounded-xl hover:bg-white/90 transition cursor-pointer animate-pulse"
            >
              <Video className="w-4 h-4" /> Join Video Call
            </button>
          )}
          {(appointment.status === "CONFIRMED" || appointment.status === "CHECKED_IN") && !hasActiveRoom && (
            <p className="text-center text-xs text-white/70">Waiting for doctor to start call...</p>
          )}
        </div>
      ) : clinic ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[#101828] mb-3">Clinic Location</h3>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#16A34A]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#101828]">{clinic.name}</p>
              {clinic.address && (
                <p className="text-xs text-[#6A7282] mt-0.5">
                  {[clinic.address.line1, clinic.address.city, clinic.address.postcode].filter(Boolean).join(", ")}
                </p>
              )}
              {clinic.phone && (
                <p className="text-xs text-[#6A7282] mt-0.5">{clinic.phone}</p>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
