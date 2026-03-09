import Link from "next/link";
import {
  Building2,
  Users,
  UserCheck,
  LayoutGrid,
  Plus,
} from "lucide-react";

export default function ClinicsHeader({
  totalLocations,
  totalStaff,
  totalPatients,
  activeDepartments,
}: {
  totalLocations: number;
  totalStaff: number;
  totalPatients: number;
  activeDepartments: number;
}) {
  const stats = [
    { icon: Building2, label: "Locations", value: totalLocations, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
    { icon: Users, label: "Total Staff", value: totalStaff, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
    { icon: UserCheck, label: "Patients", value: totalPatients.toLocaleString(), color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
    { icon: LayoutGrid, label: "Active Depts", value: activeDepartments, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Building2 className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Clinic Locations</h1>
            <p className="text-sm text-[#6A7282]">
              Manage all hospital facilities and branches
            </p>
          </div>
        </div>
        <Link
          href="/admin/add-clinic"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add Location
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {stats.map((s) => (
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
