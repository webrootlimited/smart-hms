"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import DetailHeader from "./DetailHeader";
import DoctorCard from "./DoctorCard";
import AppointmentInfo from "./AppointmentInfo";
import type { PatientAppointmentDetail } from "./types";

export default function AppointmentDetailMain() {
  const params = useParams();
  const appointmentId = params.appointmentId as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.patientAppointmentDetail(appointmentId),
    queryFn: () =>
      apiFetch<{ success: boolean; appointment: PatientAppointmentDetail }>(
        `/api/patient/appointments/${appointmentId}`
      ),
    enabled: !!appointmentId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-7 h-7 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  if (isError || !data?.appointment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-lg font-bold text-[#101828]">Appointment Not Found</p>
          <p className="text-sm text-[#6A7282] mt-1">
            No appointment found with ID: {appointmentId}
          </p>
        </div>
      </div>
    );
  }

  const appointment = data.appointment;

  return (
    <div className="space-y-5">
      <DetailHeader appointment={appointment} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-5xl">
        <div className="lg:col-span-2">
          <AppointmentInfo appointment={appointment} />
        </div>
        <div>
          <DoctorCard appointment={appointment} />
        </div>
      </div>
    </div>
  );
}
