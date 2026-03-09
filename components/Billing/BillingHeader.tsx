import {
  DollarSign,
  CreditCard,
  Users,
  Activity,
  Plus,
  Settings,
} from "lucide-react";

const stats = [
  { icon: DollarSign, label: "Total Revenue", value: "£428K", change: "+15%", color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
  { icon: CreditCard, label: "Pending Payments", value: "£124K", change: "+8%", color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
  { icon: Users, label: "Total Invoiced", value: "2,847", change: "+12%", color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
  { icon: Activity, label: "Collection Rate", value: "96.4%", change: "+3%", color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
];

export default function BillingHeader() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-[#16A34A]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Billing Rules & Configuration</h1>
            <p className="text-sm text-[#6A7282]">Manage payment methods, pricing, and billing settings</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#16A34A] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-lg font-bold text-[#101828]">{s.value}</p>
                <span className="text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-1.5 py-0.5 rounded">
                  {s.change}
                </span>
              </div>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
