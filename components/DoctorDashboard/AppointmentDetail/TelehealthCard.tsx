"use client";

import { Video, MapPin } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import type { AppointmentDetail } from "./types";

export default function TelehealthCard({ appointment }: { appointment: AppointmentDetail }) {
  const params = useParams();
  const router = useRouter();
  const doctorSlug = params.doctorName as string;
  const isOnline = appointment.appointment_type === "ONLINE";
  const isActive = appointment.status === "CONFIRMED" || appointment.status === "CHECKED_IN";

  const startCallMutation = useMutation({
    mutationFn: () =>
      apiPost<{ success: boolean; roomUrl: string }>("/api/video/room", {
        appointmentId: appointment.id,
      }),
    onSuccess: (res) => {
      if (res.success) {
        router.push(`/doctor/${doctorSlug}/telehealth/${appointment.id}`);
      }
    },
  });

  if (isOnline) {
    return (
      <div className="bg-linear-to-br from-[#0284C7] to-[#0369A1] rounded-2xl p-5 text-white overflow-hidden">
        <h3 className="text-sm font-bold mb-2">Telehealth Session</h3>

        <div className="w-full h-28 bg-white/10 rounded-xl flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Video className="w-8 h-8 text-white/60" />
          </div>
        </div>

        {isActive ? (
          <button
            onClick={() => startCallMutation.mutate()}
            disabled={startCallMutation.isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#0284C7] text-sm font-semibold rounded-xl hover:bg-white/90 transition cursor-pointer disabled:opacity-50"
          >
            <Video className="w-4 h-4" /> {startCallMutation.isPending ? "Starting..." : "Join Video Call"}
          </button>
        ) : (
          <p className="text-center text-sm text-white/70">
            {appointment.status === "COMPLETED" ? "Session completed" : "Session not active"}
          </p>
        )}
      </div>
    );
  }

  // In-clinic appointment — show clinic info
  if (appointment.clinic) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#101828] mb-3">Clinic Location</h3>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-4 h-4 text-[#16A34A]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#101828]">{appointment.clinic.name}</p>
            {appointment.clinic.address && (
              <p className="text-xs text-[#6A7282] mt-0.5">
                {[appointment.clinic.address.line1, appointment.clinic.address.city, appointment.clinic.address.postcode].filter(Boolean).join(", ")}
              </p>
            )}
            {appointment.clinic.phone && (
              <p className="text-xs text-[#6A7282] mt-0.5">{appointment.clinic.phone}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
