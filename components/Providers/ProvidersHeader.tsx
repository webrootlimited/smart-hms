import Link from "next/link";
import {
  Stethoscope,
  Plus,
  UserCheck,
} from "lucide-react";

export default function ProvidersHeader({
  totalProviders,
}: {
  totalProviders: number;
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
        <div className="flex items-center gap-2">
          <Link
            href="/admin/pending-doctors"
            className="flex items-center gap-2 px-4 py-2.5 border border-[#EA580C] text-[#EA580C] text-sm font-semibold rounded-xl hover:bg-[#FFF7ED] transition"
          >
            <UserCheck className="w-4 h-4" /> Pending Applications
          </Link>
          <Link
            href="/admin/add-provider"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
          >
            <Plus className="w-4 h-4" /> Add Provider
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#EFF6FF]">
          <Stethoscope className="w-4 h-4 text-[#0284C7]" />
        </div>
        <div>
          <p className="text-lg font-bold text-[#101828]">{totalProviders}</p>
          <p className="text-xs text-[#6A7282]">Total Providers</p>
        </div>
      </div>
    </div>
  );
}
