"use client";

import { Receipt, CheckCircle2 } from "lucide-react";

const payments = [
  {
    id: 1,
    title: "Annual Physical",
    date: "December 15, 2025",
    method: "Visa ***4242",
    amount: 75,
    status: "Completed",
    color: "#16A34A",
    iconBg: "bg-[#F0FDF4]",
  },
  {
    id: 2,
    title: "Cardiology Follow-up",
    date: "November 21, 2025",
    method: "HSA ***8901",
    amount: 45,
    status: "Completed",
    color: "#0284C7",
    iconBg: "bg-[#F0F9FF]",
  },
  {
    id: 3,
    title: "Lab Tests",
    date: "November 8, 2025",
    method: "Visa ***4242",
    amount: 30,
    status: "Completed",
    color: "#7C3AED",
    iconBg: "bg-[#F5F3FF]",
  },
];

export default function RecentPayments() {
  return (
    <div>
      <h2 className="text-base font-bold text-[#101828] mb-4">
        Recent Payments
      </h2>

      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${p.iconBg} flex items-center justify-center`}
              >
                <Receipt className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  {p.title}
                </p>
                <p className="text-xs text-[#6A7282]">
                  {p.date} &bull; {p.method}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-[#101828]">£{p.amount}</p>
              <p className="text-[10px] text-[#16A34A] font-medium flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3 h-3" />
                {p.status}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full py-2.5 text-sm font-semibold text-[#0284C7] bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition cursor-pointer">
        View All Payments
      </button>
    </div>
  );
}
