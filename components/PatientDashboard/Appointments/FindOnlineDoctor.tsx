"use client";

import { useState } from "react";
import { ArrowLeft, Search, SlidersHorizontal, MonitorPlay, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import SelectDateTimeSlot from "./SelectDateTimeSlot";
import OnlineDoctorCard from "./OnlineDoctorCard";

const benefits = [
  "No travel required - consult from anywhere",
  "Secure video call with doctor",
  "Instant confirmation after payment",
  "Digital prescription provided",
];

const AVATAR_COLORS = [
  "#F59E0B", "#EF4444", "#7C3AED", "#0284C7", "#16A34A",
  "#EA580C", "#8B5CF6", "#EC4899", "#14B8A6", "#6366F1",
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface OnlineDoctor {
  id: string; name: string; specialty: string; experience: number;
  price: number; initials: string; color: string;
}

interface ApiDoctor {
  id: string; name: string; specialty: string; experience: number;
  price: number; initials: string;
}

export default function FindOnlineDoctor({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<OnlineDoctor | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(setTimeout(() => setDebouncedSearch(value), 400));
  };

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: queryKeys.onlineDoctors(debouncedSearch),
    queryFn: async () => {
      const params = debouncedSearch ? { search: debouncedSearch } : undefined;
      const res = await apiFetch<{ success: boolean; doctors: ApiDoctor[] }>("/api/patient/doctors/online", params);
      return res.doctors.map((d) => ({ ...d, color: getColor(d.id) }));
    },
  });

  if (selectedDoctor) {
    return <SelectDateTimeSlot doctor={selectedDoctor} onBack={() => setSelectedDoctor(null)} />;
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] rounded-2xl px-6 py-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Change Booking Type
          </button>
          <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full">
            <MonitorPlay className="w-3.5 h-3.5" /> Online Consultation
          </span>
        </div>
        <h1 className="text-xl font-bold">Find Doctor for Online Consultation</h1>
        <div className="flex gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} placeholder="Speciality or Doctor Name" className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/20 focus:outline-none focus:bg-white/25" />
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isLoading && (
        <p className="text-sm text-[#6A7282]">
          <span className="font-semibold text-[#101828]">{doctors.length} doctor{doctors.length !== 1 ? "s" : ""}</span> available for online consultation
        </p>
      )}

      {/* Benefits */}
      <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
        <h3 className="text-sm font-bold text-[#101828] flex items-center gap-2 mb-2">
          <MonitorPlay className="w-4 h-4 text-[#7C3AED]" /> Online Consultation Benefits
        </h3>
        <ul className="space-y-1.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#4A5565]">
              <span className="text-[#7C3AED] mt-0.5">•</span> {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-[#7C3AED]" /></div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12">
          <MonitorPlay className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No doctors available</p>
          <p className="text-xs text-[#6A7282] mt-1">No doctors are currently offering online consultations</p>
        </div>
      ) : (
        <div className="space-y-4">
          {doctors.map((doc) => (
            <OnlineDoctorCard key={doc.id} doctor={doc} onBook={() => setSelectedDoctor(doc)} />
          ))}
        </div>
      )}
    </div>
  );
}
