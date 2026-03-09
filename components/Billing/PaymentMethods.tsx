"use client";

import { CreditCard, Shield, Banknote, Landmark, Wallet, Plus, Pencil } from "lucide-react";

const methods = [
  {
    icon: CreditCard,
    name: "Credit/Debit Card",
    desc: "Card Payment",
    fee: "2.9% + £0.30",
    processingTime: "Instant",
    active: true,
    color: "text-[#7C3AED]",
    bg: "bg-[#FAF5FF]",
  },
  {
    icon: Shield,
    name: "Insurance Claims",
    desc: "Insurance",
    fee: "0%",
    processingTime: "1-10 days",
    active: true,
    color: "text-[#0284C7]",
    bg: "bg-[#EFF6FF]",
  },
  {
    icon: Banknote,
    name: "Cash Payment",
    desc: "Cash",
    fee: "0%",
    processingTime: "Instant",
    active: true,
    color: "text-[#16A34A]",
    bg: "bg-[#F0FDF4]",
  },
  {
    icon: Landmark,
    name: "Bank Transfer",
    desc: "BACS Transfer",
    fee: "0.5%",
    processingTime: "2-3 days",
    active: true,
    color: "text-[#EA580C]",
    bg: "bg-[#FFF7ED]",
  },
  {
    icon: Wallet,
    name: "Digital Wallet",
    desc: "Mobile Payments",
    fee: "1.5%",
    processingTime: "Instant",
    active: false,
    color: "text-[#0284C7]",
    bg: "bg-[#EFF6FF]",
  },
];

export default function PaymentMethods() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-[#101828]">Accepted Payment Methods</h2>
          <p className="text-xs text-[#6A7282]">Configure how patients can pay</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Method
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {methods.map((m) => (
          <div key={m.name} className="border border-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center`}>
                  <m.icon className={`w-4 h-4 ${m.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#101828]">{m.name}</p>
                  <p className="text-[10px] text-[#6A7282]">{m.desc}</p>
                </div>
              </div>
              <span className={`w-2 h-2 rounded-full ${m.active ? "bg-[#16A34A]" : "bg-gray-300"}`} />
            </div>

            <div className="space-y-1.5 text-xs text-[#4A5565] mb-3">
              <div className="flex justify-between">
                <span className="text-[#6A7282]">Transaction Fee:</span>
                <span className="font-medium text-[#101828]">{m.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A7282]">Processing Time:</span>
                <span className="font-medium text-[#101828]">{m.processingTime}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                m.active ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#6A7282]"
              }`}>
                {m.active ? "Active" : "Disabled"}
              </span>
              <button className="flex items-center gap-1 text-xs font-medium text-[#0284C7] hover:underline cursor-pointer">
                <Pencil className="w-3 h-3" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
