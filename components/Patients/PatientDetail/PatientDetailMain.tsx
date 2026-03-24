"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  User,
  Heart,
  AlertCircle,
  CalendarDays,
  ArrowLeft,
  Loader2,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { apiFetch, apiPut } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PatientDetail, PatientDetailResponse } from "./types";
import PersonalInfoTab from "./PersonalInfoTab";
import MedicalInfoTab from "./MedicalInfoTab";
import EmergencyContactTab from "./EmergencyContactTab";
import AppointmentsTab from "./AppointmentsTab";

const TABS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "medical", label: "Medical Info", icon: Heart },
  { id: "emergency", label: "Emergency Contact", icon: AlertCircle },
  { id: "appointments", label: "Appointments", icon: CalendarDays },
];

export default function PatientDetailMain({ patientId }: { patientId: string }) {
  const [activeTab, setActiveTab] = useState("personal");
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.adminPatientDetail(patientId),
    queryFn: () => apiFetch<PatientDetailResponse>(`/api/admin/patients/${patientId}`),
  });

  const updateMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      apiPut(`/api/admin/patients/${patientId}`, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.adminPatientDetail(patientId) }),
  });

  const patient = data?.patient;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="text-center py-32">
        <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-[#101828]">Patient not found</p>
        <Link href="/admin/patients" className="text-sm text-[#0284C7] hover:underline mt-2 inline-block">
          Back to Patients
        </Link>
      </div>
    );
  }

  const onUpdate = (body: Record<string, unknown>) => updateMutation.mutate(body);
  const saving = updateMutation.isPending;

  const renderTab = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoTab patient={patient} onUpdate={onUpdate} saving={saving} />;
      case "medical":
        return <MedicalInfoTab patient={patient} onUpdate={onUpdate} saving={saving} />;
      case "emergency":
        return <EmergencyContactTab patient={patient} onUpdate={onUpdate} saving={saving} />;
      case "appointments":
        return <AppointmentsTab patient={patient} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      <Link
        href="/admin/patients"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6A7282] hover:text-[#101828] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </Link>

      <PatientHeader
        patient={patient}
        onStatusChange={(status) => updateMutation.mutate({ account_status: status })}
        saving={saving}
      />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-1 p-1.5 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl whitespace-nowrap transition cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? "bg-[#0284C7] text-white"
                  : "text-[#6A7282] hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderTab()}
    </div>
  );
}

/* ── Header ── */

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Active", dot: "bg-[#16A34A]" },
  { value: "INACTIVE", label: "Inactive", dot: "bg-[#EF4444]" },
  { value: "SUSPENDED", label: "Suspended", dot: "bg-[#F59E0B]" },
];

const AVATAR_COLORS = [
  "bg-[#0284C7]", "bg-[#16A34A]", "bg-[#EA580C]", "bg-[#7C3AED]",
  "bg-[#EF4444]", "bg-[#0891B2]", "bg-[#D946EF]", "bg-[#CA8A04]",
];

function getColor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function PatientHeader({
  patient,
  onStatusChange,
  saving,
}: {
  patient: PatientDetail;
  onStatusChange: (status: string) => void;
  saving: boolean;
}) {
  const initials = `${patient.first_name[0]}${patient.last_name[0]}`.toUpperCase();
  const currentStatus = STATUS_OPTIONS.find((s) => s.value === patient.status) ?? STATUS_OPTIONS[0];

  const addressStr = [patient.address?.line1, patient.address?.city, patient.address?.postcode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-start gap-5">
        {patient.photo_url ? (
          <img src={patient.photo_url} alt="avatar" className="w-16 h-16 rounded-2xl object-cover" />
        ) : (
          <div className={`w-16 h-16 rounded-2xl ${getColor(patient.id)} flex items-center justify-center text-white text-xl font-bold`}>
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-lg font-bold text-[#101828]">
              {patient.first_name} {patient.last_name}
            </h1>
            <Select
              value={patient.status}
              onValueChange={(v) => onStatusChange(v)}
              disabled={saving}
            >
              <SelectTrigger className="w-35 h-8 rounded-full text-xs font-medium border-gray-200">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-[#6A7282] mt-0.5">
            {patient.blood_group && <span className="font-medium text-[#EF4444]">{patient.blood_group}</span>}
            {patient.blood_group && patient.nhs_number && " · "}
            {patient.nhs_number && <span>NHS: {patient.nhs_number}</span>}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-[#6A7282]">
            <span>{patient.email}</span>
            {patient.phone && <span>{patient.phone}</span>}
            {addressStr && <span>{addressStr}</span>}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {[
            { label: "Appointments", value: patient.stats.totalAppointments },
            { label: "Doctors", value: patient.stats.doctorsSeen },
            { label: "Upcoming", value: patient.stats.upcomingAppointments },
          ].map((s) => (
            <div key={s.label} className="text-center px-4">
              <p className="text-lg font-bold text-[#101828]">{s.value}</p>
              <p className="text-[11px] text-[#6A7282]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
