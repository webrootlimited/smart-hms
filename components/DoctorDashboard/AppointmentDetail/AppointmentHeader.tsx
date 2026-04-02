"use client";

import { Video, CheckCircle2, ArrowLeft, CalendarDays, Clock, MapPin, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import type { AppointmentDetail } from "./types";

const STATUS_LABELS: Record<string, string> = {
  REQUESTED: "Pending",
  CONFIRMED: "Scheduled",
  CHECKED_IN: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
};

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: "bg-[#F0F9FF]", color: "text-[#0284C7]" },
  REQUESTED: { bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
  CHECKED_IN: { bg: "bg-[#FFFBEB]", color: "text-[#D97706]" },
  COMPLETED: { bg: "bg-[#F0FDF4]", color: "text-[#16A34A]" },
  CANCELLED: { bg: "bg-[#FEF2F2]", color: "text-[#EF4444]" },
  NO_SHOW: { bg: "bg-[#FAF5FF]", color: "text-[#7C3AED]" },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).toUpperCase();
}

export default function AppointmentHeader({ appointment }: { appointment: AppointmentDetail }) {
  const params = useParams();
  const router = useRouter();
  const doctorSlug = params.doctorName as string;
  const st = STATUS_STYLES[appointment.status] || STATUS_STYLES.CONFIRMED;
  const isOnline = appointment.appointment_type === "ONLINE";

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

  const messageMutation = useMutation({
    mutationFn: () =>
      apiPost<{ success: boolean; conversation: { id: string } }>(
        "/api/messages/conversations",
        { participantId: appointment.patient.userId }
      ),
    onSuccess: (res) => {
      if (res.success) {
        router.push(`/doctor/${doctorSlug}/messages?conversation=${res.conversation.id}`);
      }
    },
  });

  return (
    <div className="space-y-4">
      <Link
        href={`/doctor/${doctorSlug}/appointments`}
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
          <div className="flex items-center gap-4 mt-1.5">
            <div className="flex items-center gap-1.5 text-sm text-[#6A7282]">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(appointment.scheduled_at)}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#6A7282]">
              <Clock className="w-3.5 h-3.5" />
              {formatTime(appointment.scheduled_at)} ({appointment.duration} min)
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#6A7282]">
              {isOnline ? <Video className="w-3.5 h-3.5 text-[#0284C7]" /> : <MapPin className="w-3.5 h-3.5 text-[#16A34A]" />}
              {isOnline ? "Telehealth" : "In-Clinic"}
            </div>
          </div>
          {appointment.reason && (
            <p className="text-sm text-[#4A5565] mt-1">Reason: {appointment.reason}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {appointment.patient.userId && (
            <button
              onClick={() => messageMutation.mutate()}
              disabled={messageMutation.isPending}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border border-gray-200 text-[#101828] rounded-xl hover:bg-gray-50 transition cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Message Patient
            </button>
          )}
          {isOnline && (appointment.status === "CONFIRMED" || appointment.status === "CHECKED_IN") && (
            <button
              onClick={() => startCallMutation.mutate()}
              disabled={startCallMutation.isPending}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50"
            >
              <Video className="w-4 h-4" /> {startCallMutation.isPending ? "Starting..." : "Start Call"}
            </button>
          )}
          {appointment.status !== "COMPLETED" && appointment.status !== "CANCELLED" && (
            <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
              <CheckCircle2 className="w-4 h-4" /> Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
