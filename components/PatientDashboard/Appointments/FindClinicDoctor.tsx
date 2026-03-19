"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  Building2,
  Stethoscope,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClinicDoctorDetail from "./ClinicDoctorDetail";

export interface ClinicDoctor {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  experience: number;
  consultFee: number;
  gender: string;
  photo_url: string;
  clinic: { id: string; name: string; address: string } | null;
}

interface OfflineDoctorsResponse {
  success: boolean;
  doctors: ClinicDoctor[];
  total: number;
  page: number;
  totalPages: number;
  specialties: string[];
}

const AVATAR_COLORS = [
  "#F59E0B", "#EF4444", "#7C3AED", "#0284C7", "#16A34A",
  "#EA580C", "#8B5CF6", "#EC4899", "#14B8A6", "#6366F1",
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const EXPERIENCE_OPTIONS = [
  { value: "all", label: "All Experience" },
  { value: "0-5", label: "0–5 years" },
  { value: "5-10", label: "5–10 years" },
  { value: "10+", label: "10+ years" },
];

const GENDER_OPTIONS = [
  { value: "all", label: "All Genders" },
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
];

export default function FindClinicDoctor({ onBack }: { onBack: () => void }) {
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [gender, setGender] = useState("all");
  const [experience, setExperience] = useState("all");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<ClinicDoctor | null>(null);

  const params: Record<string, string | number> = { page };
  if (search) params.search = search;
  if (specialty !== "all") params.specialty = specialty;
  if (gender !== "all") params.gender = gender;
  if (experience !== "all") params.experience = experience;

  const { data, isLoading } = useQuery<OfflineDoctorsResponse>({
    queryKey: queryKeys.offlineDoctors(params),
    queryFn: () => apiFetch("/api/patient/doctors/offline", params as Record<string, string>),
  });

  const doctors = data?.doctors || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;
  const specialties = data?.specialties || [];

  if (selectedDoctor) {
    return (
      <ClinicDoctorDetail
        doctor={selectedDoctor}
        onBack={() => setSelectedDoctor(null)}
      />
    );
  }

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-white bg-linear-to-r from-[#1E3A5F] to-[#0284C7] px-4 py-2 rounded-full hover:opacity-90 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Change Booking Type
        </button>
        <span className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] text-[#0284C7] text-xs font-semibold rounded-full border border-[#BAE6FD]">
          <Building2 className="w-3.5 h-3.5" />
          Physical Clinic Visit
        </span>
      </div>

      <h1 className="text-2xl font-bold text-[#101828]">Find a Doctor</h1>

      {/* Search bar */}
      <div className="bg-linear-to-r from-[#1E3A5F] to-[#0284C7] rounded-2xl p-1 flex items-center gap-1">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3">
          <Search className="w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 text-sm text-[#101828] placeholder:text-[#9CA3AF] outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex gap-5">
        {/* Filters sidebar */}
        {showFilters && (
          <div className="w-56 shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#101828]">Filters</h3>
              <Filter className="w-4 h-4 text-[#6A7282]" />
            </div>

            <div className="space-y-4">
              {/* Specialty */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">Specialty</label>
                <Select value={specialty} onValueChange={(v) => { setSpecialty(v); setPage(1); }}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {specialties.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Gender */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">Doctor Gender</label>
                <Select value={gender} onValueChange={(v) => { setGender(v); setPage(1); }}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience */}
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1.5 block">Experience</label>
                <Select value={experience} onValueChange={(v) => { setExperience(v); setPage(1); }}>
                  <SelectTrigger className="h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={() => { setSpecialty("all"); setGender("all"); setExperience("all"); setSearch(""); setPage(1); }}
              className="mt-4 text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Listing area */}
        <div className="flex-1 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#0284C7]" />
              <span className="text-sm font-semibold text-[#101828]">Doctors</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#6A7282] hover:text-[#101828] transition cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Count */}
          <p className="text-sm text-[#4A5565]">
            <span className="font-bold text-[#101828]">{total} doctor{total !== 1 ? "s" : ""}</span> available for in-person visits
          </p>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
            </div>
          )}

          {/* Empty */}
          {!isLoading && doctors.length === 0 && (
            <div className="text-center py-16">
              <Stethoscope className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#101828]">No doctors found</p>
              <p className="text-xs text-[#6A7282] mt-1">Try adjusting your filters or search term</p>
            </div>
          )}

          {/* Doctor cards */}
          {!isLoading && doctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onSelect={() => setSelectedDoctor(doc)} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer ${
                    p === page ? "bg-[#0284C7] text-white" : "text-[#6A7282] hover:bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DoctorCard({ doctor, onSelect }: { doctor: ClinicDoctor; onSelect: () => void }) {
  const color = getColor(doctor.id);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          {doctor.photo_url ? (
            <img src={doctor.photo_url} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
          ) : (
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: color }}
            >
              {doctor.initials}
            </div>
          )}
          <div>
            <h3 className="text-base font-bold text-[#101828]">{doctor.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#F0F9FF] text-[#0284C7]">
                {doctor.specialty}
              </span>
              <span className="text-xs text-[#6A7282]">{doctor.experience} years exp.</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-[#0284C7]">£{doctor.consultFee}</p>
          <p className="text-[10px] text-[#6A7282]">Consultation</p>
        </div>
      </div>

      {doctor.clinic && (
        <div className="flex items-center gap-2 mt-3">
          <MapPin className="w-3.5 h-3.5 text-[#EF4444]" />
          <div>
            <p className="text-xs font-semibold text-[#101828]">{doctor.clinic.name}</p>
            <p className="text-[11px] text-[#6A7282]">{doctor.clinic.address}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#16A34A]" />
          <span className="text-xs font-medium text-[#16A34A]">Available for booking</span>
        </div>
        <button
          onClick={onSelect}
          className="px-4 py-2 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-xs font-semibold rounded-full hover:opacity-90 transition cursor-pointer"
        >
          View & Book
        </button>
      </div>
    </div>
  );
}
