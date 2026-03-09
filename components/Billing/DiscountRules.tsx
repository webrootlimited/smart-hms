import { Tag, Plus, Pencil } from "lucide-react";

const discounts = [
  {
    name: "Senior Citizens",
    desc: "Age 65 and above",
    discount: "15%",
    color: "text-[#7C3AED]",
    bg: "bg-[#FAF5FF]",
    border: "border-[#7C3AED]/20",
    active: true,
  },
  {
    name: "Family Plan",
    desc: "3+ family members",
    discount: "20%",
    color: "text-[#EA580C]",
    bg: "bg-[#FFF7ED]",
    border: "border-[#EA580C]/20",
    active: true,
  },
  {
    name: "Early Payment",
    desc: "Pay within 7 days",
    discount: "5%",
    color: "text-[#0284C7]",
    bg: "bg-[#EFF6FF]",
    border: "border-[#0284C7]/20",
    active: true,
  },
];

export default function DiscountRules() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-[#7C3AED]" />
          <div>
            <h2 className="text-base font-bold text-[#101828]">Discount Rules</h2>
            <p className="text-xs text-[#6A7282]">Manage promotional offers and discounts</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#7C3AED] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Discount
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {discounts.map((d) => (
          <div key={d.name} className={`${d.bg} border ${d.border} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#101828]">{d.name}</h3>
              <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                d.active ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#6A7282]"
              }`}>
                {d.active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="text-xs text-[#6A7282] mb-3">{d.desc}</p>
            <p className={`text-2xl font-bold ${d.color} mb-3`}>{d.discount}</p>
            <p className="text-[10px] text-[#6A7282] mb-3">discount</p>
            <div className="flex items-center gap-2 pt-3 border-t border-gray-200/50">
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
