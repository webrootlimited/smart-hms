"use client";

import { useState } from "react";
import { MapPin, Pencil, Calendar, Plus, Navigation } from "lucide-react";
import { EditLocationDialog } from "./ProviderEditDialogs";

type Data = typeof import("./detailData").providerDetail;
type Location = Data["locations"][number];

export default function LocationsTab({ data }: { data: Data }) {
  const [editLoc, setEditLoc] = useState<Location | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {data.locations.map((loc) => (
          <div
            key={loc.id}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0284C7]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#101828]">{loc.name}</h3>
                    {loc.primary && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-[#F0FDF4] text-[#16A34A] rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6A7282]">{loc.room}</p>
                </div>
              </div>
              <button onClick={() => setEditLoc(loc)} className="p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                <Pencil className="w-4 h-4 text-[#6A7282]" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-xs text-[#6A7282]">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#4A5565] mb-0.5">Address</p>
                  <p>{loc.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-[#6A7282]">
                <Calendar className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-[#4A5565] mb-1">Working Days</p>
                  <div className="flex flex-wrap gap-1.5">
                    {loc.workingDays.map((d) => (
                      <span key={d} className="px-2 py-0.5 text-xs bg-gray-50 border border-gray-200 rounded-md text-[#101828] font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer text-[#4A5565]">
              <Navigation className="w-3.5 h-3.5" /> View on Map
            </button>
          </div>
        ))}
      </div>

      {/* Add New Location */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-3">
          <Plus className="w-5 h-5 text-[#0284C7]" />
        </div>
        <h3 className="text-sm font-bold text-[#101828]">Add New Location</h3>
        <p className="text-xs text-[#6A7282] mt-1">Assign provider to another facility</p>
      </div>

      <EditLocationDialog open={!!editLoc} onClose={() => setEditLoc(null)} data={editLoc} />
    </div>
  );
}
