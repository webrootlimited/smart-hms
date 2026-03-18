"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Video, MapPin, MessageSquare } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import type { PatientAppointmentDetail } from "./types";

const STATUS_LABELS: Record<string, string> = {
  REQUESTED: "Pending",
  CONFIRMED: "Confirmed",
  CHECKED_IN: "Checked In",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
  REQUESTED: { bg: "bg-[#FFFBEB]", color: "text-[#CA8A04]" },
  CHECKED_IN: { bg: "bg-[#F0F9FF]", color: "text-[#0284C7]" },
  COMPLETED: { bg: "bg-[#EFF6FF]", color: "text-[#0284C7]" },
  CANCELLED: { bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
  NO_SHOW: { bg: "bg-gray-100", color: "text-[#6A7282]" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).toUpperCase();
}

export default function DetailHeader({ appointment }: { appointment: PatientAppointmentDetail }) {
  const params = useParams();
  const router = useRouter();
  const base = `/patient/${params.patientName}/appointments`;
  const st = STATUS_STYLES[appointment.status] || STATUS_STYLES.CONFIRMED;
  const isOnline = appointment.appointment_type === "ONLINE";

  const messageMutation = useMutation({
    mutationFn: () =>
      apiPost<{ success: boolean; conversation: { id: string } }>(
        "/api/messages/conversations",
        { participantId: appointment.doctor.userId }
      ),
    onSuccess: (res) => {
      if (res.success) {
        router.push(`/patient/${params.patientName}/messages?conversation=${res.conversation.id}`);
      }
    },
  });

  return (
    <div className="space-y-4">
      <Link
        href={base}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Appointments
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#101828]">Appointment Details</h1>
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${st.bg} ${st.color}`}>
              {STATUS_LABELS[appointment.status] || appointment.status}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-[#6A7282]">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(appointment.scheduled_at)}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#6A7282]">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(appointment.scheduled_at)} ({appointment.duration} min)
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#6A7282]">
              {isOnline ? <Video className="w-3.5 h-3.5 text-[#7C3AED]" /> : <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />}
              {isOnline ? "Online Consultation" : "In-Person Visit"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {appointment.doctor.userId && (
            <button
              onClick={() => messageMutation.mutate()}
              disabled={messageMutation.isPending}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border border-gray-200 text-[#101828] rounded-xl hover:bg-gray-50 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Message Doctor
            </button>
          )}
          {isOnline && (appointment.status === "CONFIRMED" || appointment.status === "CHECKED_IN") && (
            <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
              <Video className="w-4 h-4" /> Join Video Call
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
