import {
  Users,
  Download,
} from "lucide-react";

export default function PatientsHeader({
  totalPatients,
}: {
  totalPatients: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Users className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Patient Management</h1>
            <p className="text-sm text-[#6A7282]">
              {totalPatients.toLocaleString()} patients registered
            </p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>
    </div>
  );
}
