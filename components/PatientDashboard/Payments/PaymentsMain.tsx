"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Wallet,
  CreditCard,
  AlertCircle,
  ShieldCheck,
  Lock,
  Info,
} from "lucide-react";
import PaymentCards from "./PaymentCards";
import InsuranceInfo from "./InsuranceInfo";
import RecentPayments from "./RecentPayments";

const stats = [
  {
    label: "Current Balance",
    value: "£0.00",
    icon: Wallet,
    color: "#16A34A",
    bg: "bg-[#F0FDF4]",
  },
  {
    label: "Payment Methods",
    value: "3",
    icon: CreditCard,
    color: "#0284C7",
    bg: "bg-[#F0F9FF]",
  },
  {
    label: "Past Due",
    value: "£145.00",
    icon: AlertCircle,
    color: "#EF4444",
    bg: "bg-[#FEF2F2]",
  },
];

export default function PaymentsMain({ onBack }: { onBack?: () => void }) {
  const params = useParams();
  const base = `/patient/${params.patientName}`;

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

      {/* HSA & FSA Banner */}
      <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl px-5 py-3 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[#101828]">
            HSA & FSA Accepted
          </p>
          <p className="text-xs text-[#6A7282] mt-0.5">
            We accept Health Savings Account (HSA) and Flexible Spending Account
            (FSA) cards for eligible medical expenses. Make sure to use these
            cards for qualified healthcare services.
          </p>
        </div>
      </div>

      {/* Insurance Info */}
      <InsuranceInfo />

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
