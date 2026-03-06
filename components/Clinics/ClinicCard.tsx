import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Stethoscope,
  UserCheck,
  Activity,
  Star,
  Eye,
} from "lucide-react";
import type { Clinic } from "./types";

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${clinic.accentFrom} ${clinic.accentTo} flex items-center justify-center`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#101828]">{clinic.name}</h3>
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${clinic.statusBg} ${clinic.statusColor}`}>
                  {clinic.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-sm font-bold text-[#101828]">{clinic.rating}</span>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div className="px-5 space-y-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
          </div>
          <span className="text-xs text-[#4A5565]">{clinic.address}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] flex items-center justify-center shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#16A34A]" />
            </div>
            <span className="text-xs text-[#4A5565]">{clinic.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FAF5FF] flex items-center justify-center shrink-0">
              <Mail className="w-3.5 h-3.5 text-[#7C3AED]" />
            </div>
            <span className="text-xs text-[#4A5565]">{clinic.email}</span>
          </div>
        </div>
      </div>

      {/* Working hours */}
      <div className="mx-5 mt-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-1.5 mb-2">
          <Clock className="w-3.5 h-3.5 text-[#0284C7]" />
          <span className="text-xs font-semibold text-[#101828]">Working Hours</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-[#4A5565]">
          <span>{clinic.weekdayHours}</span>
          <span>{clinic.weekendHours}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2 px-5 mt-4">
        {[
          { icon: Users, label: "Staff", value: clinic.staff, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
          { icon: Stethoscope, label: "Providers", value: clinic.providers, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
          { icon: UserCheck, label: "Patients", value: clinic.patients, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
          { icon: Activity, label: "Occupancy", value: `${clinic.occupancy}%`, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center mx-auto mb-1`}>
              <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
            </div>
            <p className="text-sm font-bold text-[#101828]">{s.value}</p>
            <p className="text-[10px] text-[#6A7282]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="px-5 mt-4">
        <p className="text-xs text-[#6A7282] mb-2">Available Services</p>
        <div className="flex flex-wrap gap-1.5">
          {clinic.services.map((s) => (
            <span key={s.label} className={`px-2 py-0.5 text-xs font-medium rounded-full ${s.bg} ${s.color}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pt-4 pb-5 mt-4">
        <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r ${clinic.accentFrom} ${clinic.accentTo} hover:opacity-90 transition cursor-pointer`}>
          <Eye className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
}
