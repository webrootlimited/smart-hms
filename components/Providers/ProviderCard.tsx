import Link from "next/link";
import { MapPin, Clock, Users, Star } from "lucide-react";
import type { Provider } from "./types";

const SLOT_COLORS = [
  "bg-[#EFF6FF]",
  "bg-[#F0FDF4]",
  "bg-[#FFF7ED]",
  "bg-[#FAF5FF]",
  "bg-gray-100",
];

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  Active: { dot: "bg-[#16A34A]", text: "text-[#16A34A]" },
  "On Leave": { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]" },
  Inactive: { dot: "bg-[#EF4444]", text: "text-[#EF4444]" },
};

export default function ProviderCard({ provider }: { provider: Provider }) {
  const status = STATUS_STYLES[provider.status] ?? STATUS_STYLES.Inactive;

  return (
    <Link href={`/providers/${provider.id}`} className="block bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
      {/* Top row: avatar + name + rating */}
      <div className="flex items-start gap-3">
        <div
          className={`w-11 h-11 rounded-full ${provider.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
        >
          {provider.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#101828] truncate">
              {provider.name}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0">
              <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-xs font-semibold text-[#101828]">
                {provider.rating}
              </span>
            </div>
          </div>
          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#0284C7]">
            {provider.specialty}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5 mt-3">
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        <span className={`text-xs font-medium ${status.text}`}>
          {provider.status}
        </span>
      </div>

      {/* Details */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#6A7282]">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{provider.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6A7282]">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>
            Next available:{" "}
            <span className="font-medium text-[#101828]">
              {provider.nextAvailable}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6A7282]">
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span>
            <span className="font-medium text-[#101828]">
              {provider.patients}
            </span>{" "}
            patients
          </span>
        </div>
      </div>

      {/* Availability blocks */}
      <div className="flex items-center gap-1.5 mt-3">
        {SLOT_COLORS.map((cls, i) => (
          <div key={i} className={`w-6 h-6 rounded-md ${cls}`} />
        ))}
      </div>
    </Link>
  );
}
