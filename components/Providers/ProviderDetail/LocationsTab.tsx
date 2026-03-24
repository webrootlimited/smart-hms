"use client";

import { MapPin, Phone, Star } from "lucide-react";
import type { DoctorDetail } from "./types";

export default function LocationsTab({ doctor }: { doctor: DoctorDetail }) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="w-4 h-4 text-[#0284C7]" />
          <h2 className="text-base font-bold text-[#101828]">Practice Locations</h2>
          <span className="ml-auto text-xs text-[#6A7282]">
            {doctor.locations.length} location{doctor.locations.length !== 1 ? "s" : ""}
          </span>
        </div>

        {doctor.locations.length === 0 ? (
          <div className="text-center py-8">
            <MapPin className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-[#6A7282]">No practice locations assigned</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {doctor.locations.map((loc) => {
              const addr = loc.address;
              const addressStr = [addr?.line1, addr?.line2, addr?.city, addr?.postcode]
                .filter(Boolean)
                .join(", ");

              return (
                <div
                  key={loc.id}
                  className={`p-4 rounded-xl border ${
                    loc.is_primary ? "border-[#0284C7] bg-[#EFF6FF]/30" : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-[#101828]">{loc.name}</h3>
                    {loc.is_primary && (
                      <span className="flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-[#EFF6FF] text-[#0284C7] rounded-full">
                        <Star className="w-3 h-3" /> Primary
                      </span>
                    )}
                  </div>
                  {addressStr && (
                    <div className="flex items-start gap-1.5 mb-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6A7282] mt-0.5 shrink-0" />
                      <p className="text-xs text-[#6A7282]">{addressStr}</p>
                    </div>
                  )}
                  {loc.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#6A7282]" />
                      <p className="text-xs text-[#6A7282]">{loc.phone}</p>
                    </div>
                  )}
                  <div className="mt-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      loc.status === "ACTIVE" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#6A7282]"
                    }`}>
                      {loc.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
