import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Stethoscope,
  UserCheck,
  BedDouble,
  Star,
  Eye,
  Timer,
  Building2,
  UserRound,
} from "lucide-react";
import type { Clinic } from "./types";

export default function ClinicCard({ clinic }: { clinic: Clinic }) {
  const occupancyColor =
    clinic.occupancy >= 90
      ? "bg-[#EF4444]"
      : clinic.occupancy >= 75
        ? "bg-[#F59E0B]"
        : "bg-[#16A34A]";

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
              <p className="text-[11px] text-[#6A7282] mt-0.5">Est. {clinic.established}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-sm font-bold text-[#101828]">{clinic.rating}</span>
          </div>
        </div>
      </div>

      {/* Head Doctor */}
      <div className="mx-5 flex items-center gap-2 p-2.5 bg-[#F0F9FF] rounded-xl">
        <div className="w-7 h-7 rounded-full bg-[#0284C7] flex items-center justify-center shrink-0">
          <UserRound className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] text-[#6A7282]">Head Doctor</p>
          <p className="text-xs font-semibold text-[#101828]">{clinic.headDoctor}</p>
        </div>
      </div>

      {/* Contact info */}
      <div className="px-5 mt-3 space-y-2.5">
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
      <div className="grid grid-cols-5 gap-2 px-5 mt-4">
        {[
          { icon: Users, label: "Staff", value: clinic.staff, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
          { icon: Stethoscope, label: "Providers", value: clinic.providers, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
          { icon: UserCheck, label: "Patients", value: clinic.patients, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
          { icon: BedDouble, label: "Beds", value: clinic.beds, color: "text-[#0891B2]", bg: "bg-[#ECFEFF]" },
          { icon: Timer, label: "Wait", value: clinic.avgWaitTime, color: "text-[#EA580C]", bg: "bg-[#FFF7ED]" },
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

      {/* Occupancy bar */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-semibold text-[#101828]">Occupancy Rate</span>
          <span className="text-xs font-bold text-[#101828]">{clinic.occupancy}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${occupancyColor}`}
            style={{ width: `${clinic.occupancy}%` }}
          />
        </div>
      </div>

      {/* Departments */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Building2 className="w-3.5 h-3.5 text-[#6A7282]" />
          <span className="text-xs font-semibold text-[#101828]">Departments ({clinic.departments.length})</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {clinic.departments.map((d) => (
            <span key={d} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-gray-100 text-[#4A5565]">
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="px-5 mt-3">
        <p className="text-xs font-semibold text-[#101828] mb-2">Available Services</p>
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
