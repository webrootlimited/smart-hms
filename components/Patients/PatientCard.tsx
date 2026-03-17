import {
  Phone,
  Mail,
  MapPin,
  Droplets,
  Clock,
  Eye,
  Pencil,
  CalendarPlus,
} from "lucide-react";
import type { Patient } from "./types";

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  ACTIVE: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", dot: "bg-[#16A34A]" },
  INACTIVE: { bg: "bg-gray-100", text: "text-[#6A7282]", dot: "bg-[#6A7282]" },
  SUSPENDED: { bg: "bg-[#FEF2F2]", text: "text-[#EF4444]", dot: "bg-[#EF4444]" },
};

const AVATAR_COLORS = [
  "bg-[#0284C7]",
  "bg-[#7C3AED]",
  "bg-[#16A34A]",
  "bg-[#EA580C]",
  "bg-[#EF4444]",
  "bg-[#F59E0B]",
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function getAge(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

function getInitials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function statusLabel(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}

function formatAddress(addr: Patient["address"]) {
  return [addr.line1, addr.city, addr.postcode].filter(Boolean).join(", ") || "—";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PatientCard({ patient }: { patient: Patient }) {
  const status = STATUS_STYLES[patient.status] ?? STATUS_STYLES.ACTIVE;
  const fullName = `${patient.first_name} ${patient.last_name}`;
  const age = getAge(patient.dob);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      {/* Top: Avatar + Name + Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full ${getColor(patient.id)} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
            {getInitials(patient.first_name, patient.last_name)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#101828]">{fullName}</h3>
              <span className={`flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full ${status.bg} ${status.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {statusLabel(patient.status)}
              </span>
              {patient.nhs_number && (
                <span className="px-2 py-0.5 text-[10px] font-medium bg-[#EFF6FF] text-[#0284C7] rounded-full">
                  NHS: {patient.nhs_number}
                </span>
              )}
            </div>
            <p className="text-xs text-[#6A7282] mt-0.5">
              {age} years - {statusLabel(patient.gender)}
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
          <span className="text-xs text-[#4A5565] truncate">{formatAddress(patient.address)}</span>
        </div>
        {patient.blood_group && (
          <div className="flex items-center gap-2">
            <Droplets className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
            <span className="text-xs text-[#4A5565] truncate">{patient.blood_group}</span>
          </div>
        )}
      </div>

      {/* Info pills row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 p-2 bg-[#EFF6FF] rounded-lg">
          <Clock className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Date of Birth</p>
            <p className="text-xs font-medium text-[#101828]">{formatDate(patient.dob)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#FAF5FF] rounded-lg">
          <MapPin className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">City</p>
            <p className="text-xs font-medium text-[#101828]">{patient.address.city || "—"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#F0FDF4] rounded-lg">
          <CalendarPlus className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
          <div>
            <p className="text-[10px] text-[#6A7282]">Registered</p>
            <p className="text-xs font-medium text-[#101828]">{formatDate(patient.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold bg-[#0284C7] text-white rounded-lg hover:opacity-90 transition cursor-pointer">
            <Eye className="w-3 h-3" /> View Details
          </button>
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer">
            <Pencil className="w-3 h-3" /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
