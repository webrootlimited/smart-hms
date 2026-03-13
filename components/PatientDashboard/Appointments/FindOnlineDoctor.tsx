"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Video,
  CheckCircle2,
  MonitorPlay,
  Loader2,
} from "lucide-react";
import SelectDateTimeSlot from "./SelectDateTimeSlot";
import instance from "@/utils/instance";
import getToken from "@/auth/getToken";

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
  id: string;
  name: string;
  specialty: string;
  experience: number;
  price: number;
  initials: string;
  color: string;
}

export default function FindOnlineDoctor({
  onBack,
}: {
  onBack: () => void;
}) {
  const [doctors, setDoctors] = useState<OnlineDoctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<OnlineDoctor | null>(null);

  const fetchDoctors = async (query = "") => {
    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await instance.get("/api/patient/doctors/online", {
        headers: { Authorization: `Bearer ${token}` },
        params: query ? { search: query } : {},
      });
      if (data.success) {
        setDoctors(
          data.doctors.map((d: Omit<OnlineDoctor, "color">) => ({
            ...d,
            color: getColor(d.id),
          }))
        );
      }
    } catch {
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => fetchDoctors(search), 400);
    return () => clearTimeout(timeout);
  }, [search]);

  if (selectedDoctor) {
    return (
      <SelectDateTimeSlot
        doctor={selectedDoctor}
        onBack={() => setSelectedDoctor(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-linear-to-r from-[#7C3AED] to-[#A855F7] rounded-2xl px-6 py-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Booking Type
          </button>
          <span className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-full">
            <MonitorPlay className="w-3.5 h-3.5" />
            Online Consultation
          </span>
        </div>
        <h1 className="text-xl font-bold">Find Doctor for Online Consultation</h1>

        {/* Search */}
        <div className="flex gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Speciality or Doctor Name"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white/20 text-white placeholder-white/60 rounded-xl border border-white/20 focus:outline-none focus:bg-white/25"
            />
          </div>
          <button className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Count */}
      {!loading && (
        <p className="text-sm text-[#6A7282]">
          <span className="font-semibold text-[#101828]">{doctors.length} doctor{doctors.length !== 1 ? "s" : ""}</span>{" "}
          available for online consultation
        </p>
      )}

      {/* Benefits */}
      <div className="bg-[#F5F3FF] border border-[#DDD6FE] rounded-xl p-4">
        <h3 className="text-sm font-bold text-[#101828] flex items-center gap-2 mb-2">
          <MonitorPlay className="w-4 h-4 text-[#7C3AED]" />
          Online Consultation Benefits
        </h3>
        <ul className="space-y-1.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[#4A5565]">
              <span className="text-[#7C3AED] mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[#7C3AED]" />
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-12">
          <MonitorPlay className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No doctors available</p>
          <p className="text-xs text-[#6A7282] mt-1">No doctors are currently offering online consultations</p>
        </div>
      ) : (
        <div className="space-y-4">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                {/* Doctor info */}
                <div className="flex items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: doc.color }}
                  >
                    {doc.initials}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#101828]">{doc.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-medium text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded">
                        {doc.specialty}
                      </span>
                      <span className="text-xs text-[#6A7282]">{doc.experience} years</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-xs text-[#6A7282]">GBP</p>
                  <p className="text-lg font-bold text-[#7C3AED]">£{doc.price}</p>
                </div>
              </div>

              {/* Tags row */}
              <div className="flex items-center flex-wrap gap-3 mt-3 pt-3 border-t border-gray-50">
                <span className="flex items-center gap-1.5 text-xs text-[#4A5565]">
                  <Video className="w-3.5 h-3.5 text-[#7C3AED]" />
                  Video Call
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-[#16A34A]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Online Available
                </span>
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-end mt-3">
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="px-5 py-2 bg-[#7C3AED] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer"
                >
                  Book Online
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
