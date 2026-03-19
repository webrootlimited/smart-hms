"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Receipt, CheckCircle2, XCircle, Clock, Loader2, CreditCard, MapPin, Video } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

interface PaymentItem {
  id: string;
  amount: number;
  status: string;
  paid_at: string;
  transaction_id: string;
  doctor: { id: string; name: string; initials: string; specialty: string; photo_url: string } | null;
  invoice: { description: string; status: string } | null;
  card: { card_type: string; last4: string } | null;
  appointment: { id: string; type: string; scheduled_at: string; status: string; clinic: string | null } | null;
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

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function RecentPayments() {
  const params = useParams();
  const base = `/patient/${params.patientName}`;

  const { data: payments = [], isLoading } = useQuery<PaymentItem[]>({
    queryKey: queryKeys.patientPayments,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; payments: PaymentItem[] }>("/api/patient/payments/history");
      return res.payments;
    },
  });

  return (
    <div>
      <h2 className="text-base font-bold text-[#101828] mb-4">Recent Payments</h2>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-[#0284C7] animate-spin" />
        </div>
      )}

      {!isLoading && payments.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <Receipt className="w-8 h-8 text-gray-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-[#101828]">No payments yet</p>
          <p className="text-xs text-[#6A7282] mt-1">Your payment history will appear here</p>
        </div>
      )}

      {!isLoading && payments.length > 0 && (
        <div className="space-y-3">
          {payments.map((p) => {
            const st = STATUS_MAP[p.status] || STATUS_MAP.COMPLETED;
            const StatusIcon = st.icon;
            const color = p.doctor ? getColor(p.doctor.id) : "#6A7282";

            return (
              <Link
                key={p.id}
                href={`${base}/payments/${p.id}`}
                className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between hover:border-[#BAE6FD] transition block"
              >
                <div className="flex items-center gap-3">
                  {p.doctor?.photo_url ? (
                    <img src={p.doctor.photo_url} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {p.doctor?.initials || "??"}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-[#101828]">
                      {p.doctor?.name || "Payment"}
                    </p>
                    <p className="text-xs text-[#6A7282]">
                      {p.doctor?.specialty}
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
                  <p className="text-sm font-bold text-[#101828]">£{p.amount}</p>
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
  );
}
