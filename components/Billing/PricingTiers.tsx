import { Pencil, Calculator, Check } from "lucide-react";

const tiers = [
  {
    name: "Basic Consultation",
    desc: "Standard office visit",
    price: "£15",
    change: "",
    items: ["Physical Examination", "Detailed History Review", "Basic Diagnostics"],
    color: "border-l-[#0284C7]",
  },
  {
    name: "Comprehensive Visit",
    desc: "Extended care visit",
    price: "£35",
    change: "5.7%",
    items: ["Full Physical Exam", "Lab Tests", "Follow-up Plan", "Treatment Plan"],
    color: "border-l-[#16A34A]",
  },
  {
    name: "Specialist Consultation",
    desc: "Expert specialist visit",
    price: "£45",
    change: "8.1%",
    items: ["Specialist Exam", "Advanced Diagnostics", "Treatment Plan"],
    color: "border-l-[#7C3AED]",
  },
];

export default function PricingTiers() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-[#101828]">Pricing Tiers</h2>
          <p className="text-xs text-[#6A7282]">Service pricing structure</p>
        </div>
      </div>

      <div className="space-y-4">
        {tiers.map((t) => (
          <div key={t.name} className={`border-l-4 ${t.color} bg-gray-50/50 rounded-xl p-4`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-[#101828]">{t.name}</h3>
                <p className="text-xs text-[#6A7282]">{t.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-[#101828]">{t.price}</p>
                {t.change && (
                  <span className="text-[10px] font-semibold text-[#16A34A]">+{t.change}</span>
                )}
              </div>
            </div>

            <div className="space-y-1.5 mb-3">
              {t.items.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-3 h-3 text-[#16A34A]" />
                  <span className="text-xs text-[#4A5565]">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-gray-200/50">
              <button className="flex items-center gap-1 text-xs font-medium text-[#0284C7] hover:underline cursor-pointer">
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <button className="flex items-center gap-1 text-xs font-medium text-[#6A7282] hover:underline cursor-pointer">
                <Calculator className="w-3 h-3" /> Calculate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
