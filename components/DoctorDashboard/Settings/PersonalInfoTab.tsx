"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Upload, Loader2, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { DoctorProfile } from "./DoctorSettingsMain";

interface Props {
  doctor: DoctorProfile | null;
}

export default function PersonalInfoTab({ doctor }: Props) {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState(doctor?.first_name || "");
  const [lastName, setLastName] = useState(doctor?.last_name || "");
  const [phone, setPhone] = useState(doctor?.phone || "");
  const [bio, setBio] = useState(doctor?.bio || "");
  const [dob, setDob] = useState(doctor?.dob ? doctor.dob.split("T")[0] : "");
  const [gender, setGender] = useState(doctor?.gender || "");
  const [address, setAddress] = useState(doctor?.address || "");
  const [saved, setSaved] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      apiPut("/api/doctor/profile", {
        first_name: firstName, last_name: lastName, phone, bio,
        dob: dob || undefined, gender: gender || undefined, address,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.doctorProfile });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Personal Information</h3>
          <p className="text-xs text-[#6A7282]">Update your personal details and contact information</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {error && <span className="text-xs text-[#DC2626]">Failed to save changes</span>}
          <button
            onClick={() => mutate()}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Last Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="email"
              value={doctor?.email || ""}
              readOnly
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-[#6A7282] cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
      </div>

      {/* Home Address */}
      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1.5">Home Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-[#9CA3AF]" />
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your home address..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] resize-none h-20"
          />
        </div>
      </div>

      {/* Date of Birth + Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Gender</label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="w-full h-10 rounded-xl border-gray-200 text-sm">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-xs font-semibold text-[#334155] mb-1.5">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write a short bio..."
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] resize-none h-20"
        />
      </div>

      {/* Update Photo */}
      <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] flex items-center justify-center shrink-0">
          <Upload className="w-5 h-5 text-[#EA580C]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#101828]">Update Profile Photo</p>
          <p className="text-[11px] text-[#6A7282]">JPG, PNG or GIF. Max size 6MB. Recommended: 500x500px</p>
        </div>
        <button className="px-4 py-2 text-xs font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          Choose File
        </button>
      </div>
    </div>
  );
}
