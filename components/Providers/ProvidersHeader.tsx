import Link from "next/link";
import {
  Stethoscope,
  Building2,
  UserCheck,
  Plus,
} from "lucide-react";

export default function ProvidersHeader({
  totalProviders,
  departments,
  nowAvailable,
}: {
  totalProviders: number;
  departments: number;
  nowAvailable: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Providers</h1>
            <p className="text-sm text-[#6A7282]">
              Manage all healthcare providers and their schedules
            </p>
          </div>
        </div>
        <Link
          href="/admin/add-provider"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Provider
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
        {[
          { icon: Stethoscope, label: "Providers", value: totalProviders, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
          { icon: Building2, label: "Departments", value: departments, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
          { icon: UserCheck, label: "Now Available", value: nowAvailable, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#101828]">{s.value}</p>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
