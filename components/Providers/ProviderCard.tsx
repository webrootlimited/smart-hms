import Link from "next/link";
import { Briefcase, Stethoscope, Mail, Phone } from "lucide-react";
import type { Provider } from "./types";

const AVATAR_COLORS = [
  "bg-[#0284C7]",
  "bg-[#16A34A]",
  "bg-[#EA580C]",
  "bg-[#7C3AED]",
  "bg-[#EF4444]",
  "bg-[#0891B2]",
  "bg-[#D946EF]",
  "bg-[#CA8A04]",
];

const STATUS_STYLES: Record<string, { dot: string; text: string; label: string }> = {
  ACTIVE: { dot: "bg-[#16A34A]", text: "text-[#16A34A]", label: "Active" },
  ON_LEAVE: { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]", label: "On Leave" },
  INACTIVE: { dot: "bg-[#EF4444]", text: "text-[#EF4444]", label: "Inactive" },
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function getAvatarColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ProviderCard({ provider }: { provider: Provider }) {
  const status = STATUS_STYLES[provider.status] ?? STATUS_STYLES.INACTIVE;
  const initials = getInitials(provider.first_name, provider.last_name);
  const avatarColor = getAvatarColor(provider.id);

  return (
    <Link href={`/admin/providers/${provider.id}`} className="block bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
      {/* Top row: avatar + name */}
      <div className="flex items-start gap-3">
        {provider.photo_url ? (
          <img
            src={provider.photo_url}
            alt={`${provider.first_name} ${provider.last_name}`}
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className={`w-11 h-11 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}
          >
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[#101828] truncate">
            Dr. {provider.first_name} {provider.last_name}
          </h3>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#0284C7]">
            {provider.specialization}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        <span className={`text-xs font-medium ${status.text}`}>
          {status.label}
        </span>
      </div>

      {/* Details */}
      <div className="mt-3 space-y-2">
        {provider.department && (
          <div className="flex items-center gap-2 text-xs text-[#6A7282]">
            <Briefcase className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{provider.department}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-xs text-[#6A7282]">
          <Stethoscope className="w-3.5 h-3.5 shrink-0" />
          <span>
            <span className="font-medium text-[#101828]">
              {provider.experience_years}
            </span>{" "}
            years experience
          </span>
        </div>
        {provider.email && (
          <div className="flex items-center gap-2 text-xs text-[#6A7282]">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{provider.email}</span>
          </div>
        )}
        {provider.phone && (
          <div className="flex items-center gap-2 text-xs text-[#6A7282]">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>{provider.phone}</span>
          </div>
        )}
      </div>

      {/* Fee + Online badge */}
      <div className="flex items-center gap-2 mt-3">
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#F0FDF4] text-[#16A34A]">
          £{provider.consultation_fee}
        </span>
        {provider.online_consultation && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#FAF5FF] text-[#7C3AED]">
            Online
          </span>
        )}
      </div>
    </Link>
  );
}
