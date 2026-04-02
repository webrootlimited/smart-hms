"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Loader2 } from "lucide-react";
import DailyVideoCall from "@/components/shared/VideoCall/DailyVideoCall";

export default function PatientVideoCallPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.sessionId as string;
  const patientSlug = params.patientName as string;

  const { data, isLoading } = useQuery({
    queryKey: ["videoRoom", appointmentId],
    queryFn: () =>
      apiFetch<{ success: boolean; room: { roomUrl: string } | null }>(
        `/api/video/room/${appointmentId}`
      ),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="w-8 h-8 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  if (!data?.room?.roomUrl) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="text-center">
          <p className="text-lg font-bold text-[#101828]">Waiting for doctor</p>
          <p className="text-sm text-[#6A7282] mt-1">The doctor hasn't started the video call yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-100px)]">
      <DailyVideoCall
        roomUrl={data.room.roomUrl}
        appointmentId={appointmentId}
        userName="Patient"
        onLeave={() => router.push(`/patient/${patientSlug}/appointments`)}
      />
    </div>
  );
}
