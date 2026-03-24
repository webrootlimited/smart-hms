"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Loader2,
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Heart,
  AlertCircle,
  Stethoscope,
  Globe,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface AppointmentDetailData {
  id: string;
  doctor: {
    id: string;
    name: string;
    phone: string;
    department: string;
    specialization: string;
    consultation_fee: number;
    photo_url: string | null;
  } | null;
  patient: {
    id: string;
    name: string;
    age: number | null;
    gender: string;
    phone: string;
    email: string;
    dob: string | null;
    address: { line1?: string; line2?: string; city?: string; postcode?: string } | null;
    blood_group: string | null;
    nhs_number: string | null;
    photo_url: string | null;
    emergencyContact: { name: string; phone: string; relationship: string } | null;
  } | null;
  clinic: { name: string; address: { line1?: string; city?: string; postcode?: string }; phone: string } | null;
  scheduled_at: string;
  duration: number;
  appointment_type: string;
  status: string;
  reason: string;
  booking_for: { name: string; phone: string; relationship: string } | null;
  createdAt: string;
}

const STATUS_STYLES: Record<string, { dot: string; bg: string; text: string; label: string }> = {
  CONFIRMED:  { dot: "bg-[#16A34A]", bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", label: "Confirmed" },
  COMPLETED:  { dot: "bg-[#0284C7]", bg: "bg-[#EFF6FF]", text: "text-[#0284C7]", label: "Completed" },
  REQUESTED:  { dot: "bg-[#F59E0B]", bg: "bg-[#FFFBEB]", text: "text-[#D97706]", label: "Pending" },
  CANCELLED:  { dot: "bg-[#EF4444]", bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", label: "Cancelled" },
  NO_SHOW:    { dot: "bg-[#6B7280]", bg: "bg-[#F3F4F6]", text: "text-[#6B7280]", label: "No Show" },
  CHECKED_IN: { dot: "bg-[#7C3AED]", bg: "bg-[#FAF5FF]", text: "text-[#7C3AED]", label: "Checked In" },
};

const AVATAR_COLORS = [
  "bg-[#0284C7]", "bg-[#16A34A]", "bg-[#EA580C]", "bg-[#7C3AED]",
  "bg-[#EF4444]", "bg-[#0891B2]", "bg-[#D946EF]", "bg-[#CA8A04]",
];

function getColor(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function getInitials(name: string) {
  return name.replace(/^Dr\.\s*/i, "").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function AdminAppointmentDetail({ appointmentId }: { appointmentId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.adminAppointmentDetail(appointmentId),
    queryFn: () => apiFetch<{ success: boolean; appointment: AppointmentDetailData }>(`/api/admin/appointments/${appointmentId}`),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  const appt = data?.appointment;
  if (!appt) {
    return (
      <div className="text-center py-32">
        <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-sm font-semibold text-[#101828]">Appointment not found</p>
        <Link href="/admin/appointments" className="text-sm text-[#0284C7] hover:underline mt-2 inline-block">
          Back to Appointments
        </Link>
      </div>
    );
  }

  const st = STATUS_STYLES[appt.status] ?? STATUS_STYLES.CONFIRMED;
  const date = new Date(appt.scheduled_at);

  return (
    <div className="space-y-5">
      <Link
        href="/admin/appointments"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#6A7282] hover:text-[#101828] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Appointments
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-bold text-[#101828]">Appointment Details</h1>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${st.bg} ${st.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                {st.label}
              </span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                appt.appointment_type === "ONLINE" ? "bg-[#EFF6FF] text-[#0284C7]" : "bg-[#F0FDF4] text-[#16A34A]"
              }`}>
                {appt.appointment_type === "ONLINE" ? "Online" : "In-Person"}
              </span>
            </div>
            <p className="text-xs text-[#6A7282]">ID: {appt.id}</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-[#6A7282]">
              <CalendarDays className="w-4 h-4" />
              {date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </div>
            <div className="flex items-center gap-2 text-[#6A7282]">
              <Clock className="w-4 h-4" />
              {date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase()}
              {" · "}{appt.duration} min
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Doctor */}
        <PersonCard
          title="Doctor"
          icon={Stethoscope}
          name={appt.doctor?.name ?? "Unknown"}
          photoUrl={appt.doctor?.photo_url}
          id={appt.doctor?.id ?? ""}
          linkTo={appt.doctor ? `/admin/providers/${appt.doctor.id}` : undefined}
          rows={[
            { label: "Specialty", value: appt.doctor?.specialization ?? "—" },
            { label: "Department", value: appt.doctor?.department ?? "—" },
            { label: "Phone", value: appt.doctor?.phone ?? "—" },
            { label: "Fee", value: `£${appt.doctor?.consultation_fee ?? 0}` },
          ]}
        />

        {/* Patient */}
        <PersonCard
          title="Patient"
          icon={User}
          name={appt.patient?.name ?? "Unknown"}
          photoUrl={appt.patient?.photo_url}
          id={appt.patient?.id ?? ""}
          linkTo={appt.patient ? `/admin/patients/${appt.patient.id}` : undefined}
          rows={[
            { label: "Age / Gender", value: `${appt.patient?.age ?? "—"} yrs · ${appt.patient?.gender ?? "—"}` },
            { label: "Phone", value: appt.patient?.phone ?? "—" },
            { label: "Email", value: appt.patient?.email ?? "—" },
            { label: "Blood Group", value: appt.patient?.blood_group ?? "—" },
            { label: "NHS Number", value: appt.patient?.nhs_number ?? "—" },
          ]}
        />

        {/* Clinic / Location */}
        {appt.clinic && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-[#16A34A]" />
              <h2 className="text-base font-bold text-[#101828]">Clinic</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6A7282]">Name</span>
                <span className="text-sm font-semibold text-[#101828]">{appt.clinic.name}</span>
              </div>
              {appt.clinic.address && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6A7282]">Address</span>
                  <span className="text-sm font-semibold text-[#101828]">
                    {[appt.clinic.address.line1, appt.clinic.address.city, appt.clinic.address.postcode].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}
              {appt.clinic.phone && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6A7282]">Phone</span>
                  <span className="text-sm font-semibold text-[#101828]">{appt.clinic.phone}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reason & Booking Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="w-4 h-4 text-[#0284C7]" />
            <h2 className="text-base font-bold text-[#101828]">Booking Details</h2>
          </div>
          <div className="space-y-3">
            {appt.reason && (
              <div>
                <p className="text-xs text-[#6A7282] mb-1">Reason for Visit</p>
                <p className="text-sm font-medium text-[#101828]">{appt.reason}</p>
              </div>
            )}
            {appt.booking_for && (
              <div className="p-3 bg-[#FFFBEB] rounded-xl">
                <p className="text-xs font-semibold text-[#D97706] mb-1">Booked for Someone Else</p>
                <p className="text-sm text-[#101828]">{appt.booking_for.name} ({appt.booking_for.relationship})</p>
                <p className="text-xs text-[#6A7282]">{appt.booking_for.phone}</p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#6A7282]">Booked On</span>
              <span className="text-sm font-semibold text-[#101828]">
                {new Date(appt.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        {appt.patient?.emergencyContact && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-[#EF4444]" />
              <h2 className="text-base font-bold text-[#101828]">Emergency Contact</h2>
            </div>
            <div className="space-y-3">
              {[
                { label: "Name", value: appt.patient.emergencyContact.name },
                { label: "Phone", value: appt.patient.emergencyContact.phone },
                { label: "Relationship", value: appt.patient.emergencyContact.relationship },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#6A7282]">{r.label}</span>
                  <span className="text-sm font-semibold text-[#101828]">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Reusable person card ── */
function PersonCard({
  title,
  icon: Icon,
  name,
  photoUrl,
  id,
  linkTo,
  rows,
}: {
  title: string;
  icon: React.ElementType;
  name: string;
  photoUrl?: string | null;
  id: string;
  linkTo?: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">{title}</h2>
        </div>
        {linkTo && (
          <Link href={linkTo} className="text-xs text-[#0284C7] font-medium hover:underline">
            View Profile
          </Link>
        )}
      </div>
      <div className="flex items-center gap-3 mb-4">
        {photoUrl ? (
          <img src={photoUrl} alt={name} className="w-12 h-12 rounded-xl object-cover" />
        ) : (
          <div className={`w-12 h-12 rounded-xl ${getColor(id)} flex items-center justify-center text-white text-sm font-bold`}>
            {getInitials(name)}
          </div>
        )}
        <p className="text-sm font-bold text-[#101828]">{name}</p>
      </div>
      <div className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between">
            <span className="text-sm text-[#6A7282]">{r.label}</span>
            <span className="text-sm font-semibold text-[#101828]">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
