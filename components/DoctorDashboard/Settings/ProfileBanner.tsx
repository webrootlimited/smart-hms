"use client";

import { useRef } from "react";
import { Camera, MapPin, Award, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpload } from "@/lib/api";
import { DoctorProfile } from "./DoctorSettingsMain";

interface Props {
  doctor: DoctorProfile | null;
}

export default function ProfileBanner({ doctor }: Props) {
  const initials = doctor
    ? `${doctor.first_name[0]}${doctor.last_name[0]}`.toUpperCase()
    : "--";

  const fullName = doctor
    ? `Dr. ${doctor.first_name} ${doctor.last_name}`
    : "Loading...";

  const fileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: (file: File) => apiUpload("/api/upload/avatar", file, "avatar"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctorProfile"] });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
    e.target.value = "";
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Cover */}
      <div className="h-28 bg-linear-to-r from-[#0284C7] to-[#06B6D4] relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-12 w-16 h-16 border-2 border-white/30 rounded-xl rotate-12" />
          <div className="absolute top-8 right-32 w-10 h-10 border-2 border-white/20 rounded-full" />
        </div>
      </div>

      {/* Profile row */}
      <div className="px-6 pb-5 -mt-10">
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className="relative">
              {doctor?.photo_url ? (
                <img
                  src={doctor.photo_url}
                  alt={fullName}
                  className="w-20 h-20 rounded-2xl border-4 border-white shadow-md object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-[#E5E7EB] border-4 border-white shadow-md flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#4A5565]">{initials}</span>
                </div>
              )}
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploadMutation.isPending}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0284C7] border-2 border-white flex items-center justify-center cursor-pointer hover:opacity-90 transition"
              >
                {uploadMutation.isPending ? (
                  <Loader2 className="w-3 h-3 text-white animate-spin" />
                ) : (
                  <Camera className="w-3 h-3 text-white" />
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Name + info */}
            <div className="mb-1">
              <h2 className="text-lg font-bold text-[#101828]">{fullName}</h2>
              <p className="text-sm font-medium text-[#0284C7]">
                {doctor?.specialization || "—"}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#6A7282]" />
                  <span className="text-[11px] text-[#6A7282]">
                    {doctor?.experience_years || 0} Years Experience
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#6A7282]" />
                  <span className="text-[11px] text-[#6A7282]">Main Campus</span>
                </div>
                {doctor?.verification_status === "VERIFIED" && (
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 text-[#6A7282]" />
                    <span className="text-[11px] text-[#6A7282]">Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 mb-1">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full ${
                doctor?.status === "ACTIVE"
                  ? "bg-[#F0FDF4] text-[#16A34A]"
                  : "bg-[#FEF2F2] text-[#DC2626]"
              }`}
            >
              {doctor?.status || "—"}
            </span>
            <div className="text-center px-3">
              <p className="text-lg font-bold text-[#0284C7]">
                £{doctor?.consultation_fee || 0}
              </p>
              <p className="text-[10px] text-[#6A7282]">Consultation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
