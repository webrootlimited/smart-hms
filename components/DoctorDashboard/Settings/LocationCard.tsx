"use client";

import { MapPin, Building2, Phone, Trash2, Star } from "lucide-react";

interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  postcode?: string;
}

interface Location {
  id: string;
  name: string;
  address: Address;
  phone: string;
  is_primary: boolean;
}

function formatAddress(addr: Address) {
  return [addr?.line1, addr?.line2, addr?.city, addr?.postcode].filter(Boolean).join(", ");
}

export default function LocationCard({
  location, onEdit, onDelete, onSetPrimary,
}: {
  location: Location;
  onEdit: () => void;
  onDelete: () => void;
  onSetPrimary: () => void;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-2xl">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#0284C7]" />
          <p className="text-sm font-bold text-[#101828]">{location.name}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {location.is_primary && (
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#F0F9FF] text-[#0284C7] rounded-full">Primary</span>
          )}
          {!location.is_primary && (
            <button onClick={onSetPrimary} title="Set as primary" className="p-1.5 hover:bg-gray-200 rounded-lg transition cursor-pointer">
              <Star className="w-3.5 h-3.5 text-[#6A7282]" />
            </button>
          )}
          <button onClick={onEdit} className="px-2 py-1 text-[11px] font-semibold text-[#0284C7] hover:bg-[#F0F9FF] rounded-lg transition cursor-pointer">Edit</button>
          <button onClick={onDelete} className="p-1.5 hover:bg-red-50 rounded-lg transition cursor-pointer">
            <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
          </button>
        </div>
      </div>
      <div className="space-y-1.5 ml-6">
        {formatAddress(location.address) && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#6A7282]" />
            <span className="text-xs text-[#4A5565]">{formatAddress(location.address)}</span>
          </div>
        )}
        {location.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#6A7282]" />
            <span className="text-xs text-[#4A5565]">{location.phone}</span>
          </div>
        )}
      </div>
    </div>
  );
}
