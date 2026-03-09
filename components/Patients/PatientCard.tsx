import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Stethoscope,
  Clock,
  Calendar,
  CreditCard,
  Eye,
  Pencil,
  CalendarPlus,
} from "lucide-react";
import type { Patient } from "./types";

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Active: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", dot: "bg-[#16A34A]" },
  Inactive: { bg: "bg-gray-100", text: "text-[#6A7282]", dot: "bg-[#6A7282]" },
  Critical: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", dot: "bg-[#EF4444]" },
};

export default function PatientCard({ patient }: { patient: Patient }) {
  const status = STATUS_STYLES[patient.status] ?? STATUS_STYLES.Active;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      {/* Top: Avatar + Name + Status + ID */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full ${patient.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {patient.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#101828]">{patient.name}</h3>
              <span className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {patient.status}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-[#EFF6FF] text-[#0284C7] rounded-full">
                {patient.patientId}
              </span>
            </div>
            <p className="text-xs text-[#6A7282] mt-0.5">
              {patient.age} years - {patient.gender}
            </p>
          </div>
        </div>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
          <span className="text-xs text-[#4A5565] truncate">{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
          <span className="text-xs text-[#4A5565] truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
          <span className="text-xs text-[#4A5565] truncate">{patient.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
          <span className="text-xs text-[#4A5565] truncate">{patient.insurance}</span>
        </div>
      </div>

      {/* Info pills row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="flex items-center gap-2 p-2 bg-[#EFF6FF] rounded-lg">
          <Stethoscope className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Primary Doctor</p>
            <p className="text-xs font-medium text-[#101828] truncate">{patient.primaryDoctor}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#FAF5FF] rounded-lg">
          <Clock className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Last Visit</p>
            <p className="text-xs font-medium text-[#101828]">{patient.lastVisit}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#F0FDF4] rounded-lg">
          <Calendar className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Next Appointment</p>
            <p className="text-xs font-medium text-[#101828]">{patient.nextAppointment}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#FFF7ED] rounded-lg">
          <CreditCard className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Balance Due</p>
            <p className="text-xs font-medium text-[#101828]">{patient.balanceDue}</p>
          </div>
        </div>
      </div>

      {/* Conditions + Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#6A7282] mr-1">Conditions:</span>
          {patient.conditions.length > 0 ? (
            patient.conditions.map((c) => (
              <span key={c} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-[#4A5565] rounded-full">
                {c}
              </span>
            ))
          ) : (
            <span className="text-[10px] text-[#6A7282]">None</span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-[#0284C7] text-white rounded-lg hover:opacity-90 transition cursor-pointer">
            <Eye className="w-3 h-3" /> View Details
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-3 h-3" /> Edit Profile
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <CalendarPlus className="w-3 h-3" /> Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
