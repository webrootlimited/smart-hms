"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  AlertCircle,
  Lock,
  Info,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import PaymentCards from "./PaymentCards";
import RecentPayments from "./RecentPayments";

interface SavedCard { id: string; }
interface PaymentItem { amount: number; status: string; }

export default function PaymentsMain({ onBack }: { onBack?: () => void }) {
  const params = useParams();
  const base = `/patient/${params.patientName}`;

  const { data: cards = [] } = useQuery({
    queryKey: queryKeys.patientCards,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; cards: SavedCard[] }>("/api/patient/cards");
      return res.cards;
    },
  });

  const { data: payments = [] } = useQuery<PaymentItem[]>({
    queryKey: queryKeys.patientPayments,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; payments: PaymentItem[] }>("/api/patient/payments/history");
      return res.payments;
    },
  });

  const totalSpent = payments.filter((p) => p.status === "COMPLETED").reduce((sum, p) => sum + p.amount, 0);

  const stats = [
    {
      label: "Total Spent",
      value: `£${totalSpent.toFixed(2)}`,
      icon: Wallet,
      color: "#16A34A",
      bg: "bg-[#F0FDF4]",
    },
    {
      label: "Payment Methods",
      value: String(cards.length),
      icon: CreditCard,
      color: "#0284C7",
      bg: "bg-[#F0F9FF]",
    },
    {
      label: "Total Payments",
      value: String(payments.length),
      icon: AlertCircle,
      color: "#7C3AED",
      bg: "bg-[#F5F3FF]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back link */}
      {onBack ? (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      ) : (
        <Link
          href={`${base}/dashboard`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      )}

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Payments & Cards</h1>
        <p className="text-sm text-[#6A7282] mt-0.5">
          Manage your payment methods and copays
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3"
          >
            <div
              className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}
            >
              <s.icon className="w-5 h-5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#101828]">{s.value}</p>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Cards */}
      <PaymentCards />


      {/* Recent Payments */}
      <RecentPayments />

      {/* Secure Footer */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
        <Lock className="w-6 h-6 text-[#0284C7] mx-auto mb-2" />
        <h3 className="text-sm font-bold text-[#101828]">
          Secure & Easy Payments
        </h3>
        <p className="text-xs text-[#6A7282] mt-1 max-w-md mx-auto">
          All payment information is encrypted and protected securely. We never
          store your full card details. You can set up autopay for copays or pay
          invoices at anytime through this portal.
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-[#6A7282]">
          <Info className="w-3 h-3" />
          <span>PCI DSS Compliant</span>
          <span>•</span>
          <span>256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
}
