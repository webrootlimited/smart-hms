import { MapPin, Building2, Phone } from "lucide-react";

const LOCATIONS = [
  {
    id: "1",
    name: "Main Campus — Cardiology Wing",
    address: "123 Medical Center Drive, Building A, Floor 3",
    phone: "+1 (555) 123-4567",
    room: "Room 312",
    primary: true,
  },
  {
    id: "2",
    name: "North Branch Clinic",
    address: "456 North Avenue, Suite 201",
    phone: "+1 (555) 234-5678",
    room: "Room 105",
    primary: false,
  },
];

export default function LocationsTab() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Practice Locations</h3>
          <p className="text-xs text-[#6A7282]">Manage the clinics and hospitals where you practise</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          Add Location
        </button>
      </div>

      <div className="space-y-3">
        {LOCATIONS.map((loc) => (
          <div key={loc.id} className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#0284C7]" />
                <p className="text-sm font-bold text-[#101828]">{loc.name}</p>
              </div>
              {loc.primary && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#F0F9FF] text-[#0284C7] rounded-full">Primary</span>
              )}
            </div>
            <div className="space-y-1.5 ml-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#6A7282]" />
                <span className="text-xs text-[#4A5565]">{loc.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#6A7282]" />
                <span className="text-xs text-[#4A5565]">{loc.phone} — {loc.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
