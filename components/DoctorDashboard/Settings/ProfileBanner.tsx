import { Camera, MapPin, Award, Users } from "lucide-react";

const STATS = [
  { label: "Patients", value: "847", color: "text-[#0284C7]" },
  { label: "Rating", value: "4.9", color: "text-[#D97706]" },
  { label: "Success", value: "98%", color: "text-[#16A34A]" },
];

export default function ProfileBanner() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Cover */}
      <div className="h-28 bg-linear-to-r from-[#0284C7] to-[#06B6D4] relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-12 w-16 h-16 border-2 border-white/30 rounded-xl rotate-12" />
          <div className="absolute top-8 right-32 w-10 h-10 border-2 border-white/20 rounded-full" />
        </div>
      </div>

      {/* Profile row */}
      <div className="px-6 pb-5 -mt-10">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[#E5E7EB] border-4 border-white shadow-md flex items-center justify-center">
                <span className="text-2xl font-bold text-[#4A5565]">SJ</span>
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0284C7] border-2 border-white flex items-center justify-center cursor-pointer">
                <Camera className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* Name + info */}
            <div className="mb-1">
              <h2 className="text-lg font-bold text-[#101828]">Dr. Sarah Johnson</h2>
              <p className="text-sm font-medium text-[#0284C7]">Cardiologist</p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#6A7282]" />
                  <span className="text-[11px] text-[#6A7282]">15 Years Experience</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#6A7282]" />
                  <span className="text-[11px] text-[#6A7282]">Main Campus</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#6A7282]" />
                  <span className="text-[11px] text-[#6A7282]">Board Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats + Status */}
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#F0FDF4] text-[#16A34A]">Active</span>
            {STATS.map((s) => (
              <div key={s.label} className="text-center px-3">
                <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-[#6A7282]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
