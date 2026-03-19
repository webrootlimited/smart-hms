"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  Receipt,
  CalendarDays,
  MapPin,
  Video,
  User,
  FileText,
  Loader2,
  Phone,
  Droplets,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

interface PaymentDetail {
  id: string;
  amount: number;
  status: string;
  paid_at: string;
  payment_method: string;
  patient: {
    id: string;
    name: string;
    initials: string;
    photo_url: string;
    phone: string;
    age: number | null;
    gender: string;
    blood_group: string;
  } | null;
  invoice: { description: string; status: string; issued_at: string } | null;
  card: { card_type: string; last4: string } | null;
  appointment: {
    id: string;
    type: string;
    scheduled_at: string;
    status: string;
    reason: string;
    duration: number;
    clinic: { name: string; address: string; phone: string } | null;
  } | null;
}

const STATUS_MAP: Record<string, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  COMPLETED: { icon: CheckCircle2, color: "#16A34A", bg: "bg-[#F0FDF4]", label: "Completed" },
  PENDING: { icon: Clock, color: "#F59E0B", bg: "bg-[#FFFBEB]", label: "Pending" },
  FAILED: { icon: XCircle, color: "#EF4444", bg: "bg-[#FEF2F2]", label: "Failed" },
  REFUNDED: { icon: XCircle, color: "#6A7282", bg: "bg-gray-100", label: "Refunded" },
};

const AVATAR_COLORS = ["#F59E0B", "#EF4444", "#7C3AED", "#0284C7", "#16A34A"];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function DoctorPaymentDetailMain() {
  const params = useParams();
  const paymentId = params.paymentId as string;
  const base = `/doctor/${params.doctorName}`;

  const { data, isLoading } = useQuery<{ success: boolean; payment: PaymentDetail }>({
    queryKey: ["doctor", "payment", paymentId],
    queryFn: () => apiFetch(`/api/doctor/payments/${paymentId}`),
    enabled: !!paymentId,
  });

  const payment = data?.payment;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="text-center py-20">
        <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <p className="text-lg font-bold text-[#101828]">Payment Not Found</p>
        <Link href={`${base}/payments`} className="text-sm text-[#0284C7] mt-2 inline-block hover:underline">
          Back to Payments
        </Link>
      </div>
    );
  }

  const st = STATUS_MAP[payment.status] || STATUS_MAP.COMPLETED;
  const StatusIcon = st.icon;
  const color = payment.patient ? getColor(payment.patient.id) : "#6A7282";
  const appt = payment.appointment;

  return (
    <div className="space-y-5 max-w-3xl">
      <Link
        href={`${base}/payments`}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Payments
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#101828]">Payment Details</h1>
        <div className={`flex items-center gap-2 px-4 py-2 ${st.bg} rounded-full`}>
          <StatusIcon className="w-4 h-4" style={{ color: st.color }} />
          <span className="text-sm font-semibold" style={{ color: st.color }}>{st.label}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <p className="text-xs text-[#6A7282] uppercase tracking-wide">Amount Earned</p>
        <p className="text-3xl font-bold text-[#16A34A] mt-1">+£{payment.amount}</p>
        {payment.paid_at && (
          <p className="text-xs text-[#6A7282] mt-2">Received on {formatDate(payment.paid_at)}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Patient info */}
        {payment.patient && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-[#6A7282] uppercase tracking-wide mb-3 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Patient
            </h3>
            <div className="flex items-center gap-3">
              {payment.patient.photo_url ? (
                <img src={payment.patient.photo_url} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
              ) : (
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {payment.patient.initials}
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-[#101828]">{payment.patient.name}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-[#6A7282]">
                  {payment.patient.age !== null && <span>{payment.patient.age} yrs</span>}
                  {payment.patient.gender && <span>{payment.patient.gender}</span>}
                  {payment.patient.blood_group && (
                    <span className="text-[10px] font-semibold text-[#EF4444] bg-[#FEF2F2] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <Droplets className="w-2.5 h-2.5" /> {payment.patient.blood_group}
                    </span>
                  )}
                </div>
                {payment.patient.phone && (
                  <p className="text-xs text-[#6A7282] mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {payment.patient.phone}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Appointment info */}
        {appt && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-[#6A7282] uppercase tracking-wide mb-3 flex items-center gap-2">
              <CalendarDays className="w-3.5 h-3.5" /> Appointment
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-3.5 h-3.5 text-[#6A7282]" />
                <span className="text-sm text-[#101828]">
                  {formatShortDate(appt.scheduled_at)} at {formatTime(appt.scheduled_at)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {appt.type === "PHYSICAL" ? (
                  <><MapPin className="w-3.5 h-3.5 text-[#6A7282]" /><span className="text-sm text-[#101828]">In-Person</span></>
                ) : (
                  <><Video className="w-3.5 h-3.5 text-[#6A7282]" /><span className="text-sm text-[#101828]">Online Consultation</span></>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#6A7282]" />
                <span className="text-sm text-[#101828]">{appt.duration} minutes</span>
              </div>
              {appt.reason && (
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#6A7282] mt-0.5" />
                  <span className="text-sm text-[#101828]">{appt.reason}</span>
                </div>
              )}
              <span className={`inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded-full ${
                appt.status === "CONFIRMED" ? "bg-[#F0FDF4] text-[#16A34A]" :
                appt.status === "COMPLETED" ? "bg-[#F0F9FF] text-[#0284C7]" :
                appt.status === "CANCELLED" ? "bg-[#FEF2F2] text-[#EF4444]" :
                "bg-gray-100 text-[#6A7282]"
              }`}>
                {appt.status}
              </span>
            </div>
          </div>
        )}

        {/* Clinic info */}
        {appt?.clinic && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-xs font-bold text-[#6A7282] uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Clinic
            </h3>
            <p className="text-sm font-bold text-[#101828]">{appt.clinic.name}</p>
            {appt.clinic.address && <p className="text-xs text-[#6A7282] mt-1">{appt.clinic.address}</p>}
            {appt.clinic.phone && (
              <p className="text-xs text-[#6A7282] mt-1 flex items-center gap-1">
                <Phone className="w-3 h-3" /> {appt.clinic.phone}
              </p>
            )}
          </div>
        )}

        {/* Payment method */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-xs font-bold text-[#6A7282] uppercase tracking-wide mb-3 flex items-center gap-2">
            <CreditCard className="w-3.5 h-3.5" /> Payment Method
          </h3>
          {payment.card ? (
            <p className="text-sm font-semibold text-[#101828]">
              {payment.card.card_type} •••• {payment.card.last4}
            </p>
          ) : (
            <p className="text-sm text-[#6A7282]">{payment.payment_method}</p>
          )}
        </div>
      </div>

      {/* Invoice */}
      {payment.invoice && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-xs font-bold text-[#6A7282] uppercase tracking-wide mb-3 flex items-center gap-2">
            <Receipt className="w-3.5 h-3.5" /> Invoice
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#101828]">{payment.invoice.description}</p>
              {payment.invoice.issued_at && (
                <p className="text-xs text-[#6A7282] mt-0.5">Issued: {formatShortDate(payment.invoice.issued_at)}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#16A34A]">+£{payment.amount}</p>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                payment.invoice.status === "PAID" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#6A7282]"
              }`}>
                {payment.invoice.status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
