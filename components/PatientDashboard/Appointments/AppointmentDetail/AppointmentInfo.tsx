import { CalendarDays, Clock, Video, MapPin, FileText, CreditCard } from "lucide-react";
import type { PatientAppointmentDetail } from "./types";

const STATUS_LABELS: Record<string, string> = {
  REQUESTED: "Pending",
  CONFIRMED: "Confirmed",
  CHECKED_IN: "Checked In",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  NO_SHOW: "No Show",
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

export default function AppointmentInfo({ appointment }: { appointment: PatientAppointmentDetail }) {
  const isOnline = appointment.appointment_type === "ONLINE";

  const details = [
    {
      icon: CalendarDays, label: "Date",
      value: formatDate(appointment.scheduled_at),
      color: "text-[#0284C7]", bg: "bg-[#F0F9FF]",
    },
    {
      icon: Clock, label: "Time",
      value: `${formatTime(appointment.scheduled_at)} (${appointment.duration} min)`,
      color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]",
    },
    {
      icon: isOnline ? Video : MapPin,
      label: "Type",
      value: isOnline ? "Online Consultation" : "In-Person Visit",
      color: isOnline ? "text-[#7C3AED]" : "text-[#16A34A]",
      bg: isOnline ? "bg-[#FAF5FF]" : "bg-[#F0FDF4]",
    },
    {
      icon: FileText, label: "Status",
      value: STATUS_LABELS[appointment.status] || appointment.status,
      color: "text-[#EA580C]", bg: "bg-[#FFF7ED]",
    },
    {
      icon: CreditCard, label: "Fee",
      value: `£${appointment.doctor.consultation_fee}`,
      color: "text-[#16A34A]", bg: "bg-[#F0FDF4]",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-[#101828] mb-4">Appointment Information</h3>

      <div className="space-y-4">
        {details.map((d) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${d.bg} flex items-center justify-center shrink-0`}>
              <d.icon className={`w-4 h-4 ${d.color}`} />
            </div>
            <div>
              <p className="text-[10px] text-[#6A7282] uppercase tracking-wide">{d.label}</p>
              <p className="text-sm font-medium text-[#101828]">{d.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reason */}
      {appointment.reason && (
        <div className="mt-5 pt-4 border-t border-gray-100">
          <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Reason for Visit</p>
          <p className="text-sm text-[#101828]">{appointment.reason}</p>
        </div>
      )}

      {/* Booked on */}
      {appointment.createdAt && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[11px] text-[#6A7282]">
            Booked on {formatDate(appointment.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
}
