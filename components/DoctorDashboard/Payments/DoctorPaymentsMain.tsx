"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Wallet,
  TrendingUp,
  Receipt,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  MapPin,
  Video,
  CreditCard,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface PaymentItem {
  id: string;
  amount: number;
  status: string;
  paid_at: string;
  patient: { id: string; name: string; initials: string; photo_url: string } | null;
  invoice: { description: string; status: string } | null;
  card: { card_type: string; last4: string } | null;
  appointment: { id: string; type: string; scheduled_at: string; status: string; clinic: string | null } | null;
}

interface Response {
  success: boolean;
  payments: PaymentItem[];
  totalEarnings: number;
}

const STATUS_MAP: Record<string, { icon: typeof CheckCircle2; color: string; label: string }> = {
  COMPLETED: { icon: CheckCircle2, color: "#16A34A", label: "Completed" },
  PENDING: { icon: Clock, color: "#F59E0B", label: "Pending" },
  FAILED: { icon: XCircle, color: "#EF4444", label: "Failed" },
  REFUNDED: { icon: XCircle, color: "#6A7282", label: "Refunded" },
};

const AVATAR_COLORS = ["#F59E0B", "#EF4444", "#7C3AED", "#0284C7", "#16A34A", "#EA580C"];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function DoctorPaymentsMain() {
  const params = useParams();
  const base = `/doctor/${params.doctorName}`;

  const { data, isLoading } = useQuery<Response>({
    queryKey: queryKeys.doctorPayments,
    queryFn: () => apiFetch("/api/doctor/payments"),
  });

  const payments = data?.payments || [];
  const totalEarnings = data?.totalEarnings || 0;
  const completedCount = payments.filter((p) => p.status === "COMPLETED").length;
  const thisMonth = payments.filter((p) => {
    if (!p.paid_at) return false;
    const d = new Date(p.paid_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyEarnings = thisMonth.filter((p) => p.status === "COMPLETED").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Earnings & Payments</h1>
        <p className="text-sm text-[#6A7282]">Track your consultation earnings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
            <Wallet className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#101828]">£{totalEarnings.toFixed(2)}</p>
            <p className="text-xs text-[#6A7282]">Total Earnings</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#F0F9FF] flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#0284C7]" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#101828]">£{monthlyEarnings.toFixed(2)}</p>
            <p className="text-xs text-[#6A7282]">This Month</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#FAF5FF] flex items-center justify-center">
            <Receipt className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div>
            <p className="text-xl font-bold text-[#101828]">{completedCount}</p>
            <p className="text-xs text-[#6A7282]">Completed Payments</p>
          </div>
        </div>
      </div>

      {/* Payment list */}
      <div>
        <h2 className="text-base font-bold text-[#101828] mb-4">Payment History</h2>

        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
          </div>
        )}

        {!isLoading && payments.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <Receipt className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#101828]">No payments yet</p>
            <p className="text-xs text-[#6A7282] mt-1">Earnings from consultations will appear here</p>
          </div>
        )}

        {!isLoading && payments.length > 0 && (
          <div className="space-y-3">
            {payments.map((p) => {
              const st = STATUS_MAP[p.status] || STATUS_MAP.COMPLETED;
              const StatusIcon = st.icon;
              const color = p.patient ? getColor(p.patient.id) : "#6A7282";

              return (
                <Link
                  key={p.id}
                  href={`${base}/payments/${p.id}`}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between hover:border-[#BAE6FD] transition block"
                >
                  <div className="flex items-center gap-3">
                    {p.patient?.photo_url ? (
                      <img src={p.patient.photo_url} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: color }}
                      >
                        {p.patient?.initials || "??"}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-[#101828]">{p.patient?.name || "Patient"}</p>
                      <p className="text-xs text-[#6A7282]">
                        {p.invoice?.description || "Consultation"}
                        {p.appointment && (
                          <span className="ml-1.5">
                            {p.appointment.type === "PHYSICAL" ? (
                              <span className="inline-flex items-center gap-0.5"><MapPin className="w-3 h-3 inline" /> In-Person</span>
                            ) : (
                              <span className="inline-flex items-center gap-0.5"><Video className="w-3 h-3 inline" /> Online</span>
                            )}
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                        {p.paid_at ? formatDate(p.paid_at) : ""}
                        {p.card && ` · ${p.card.card_type} ••${p.card.last4}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#16A34A]">+£{p.amount}</p>
                    <p className="text-[10px] font-medium flex items-center gap-1 justify-end" style={{ color: st.color }}>
                      <StatusIcon className="w-3 h-3" />
                      {st.label}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
