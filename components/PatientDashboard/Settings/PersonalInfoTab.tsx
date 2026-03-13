"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, Loader2, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientProfile, authHeaders } from "./PatientSettingsMain";
import instance from "@/utils/instance";

interface Props {
  patient: PatientProfile | null;
  onSaved: () => void;
}

export default function PersonalInfoTab({ patient, onSaved }: Props) {
  const [firstName, setFirstName] = useState(patient?.first_name || "");
  const [lastName, setLastName] = useState(patient?.last_name || "");
  const [phone, setPhone] = useState(patient?.phone || "");
  const [dob, setDob] = useState(patient?.dob ? patient.dob.split("T")[0] : "");
  const [gender, setGender] = useState(patient?.gender || "");
  const [line1, setLine1] = useState(patient?.address?.line1 || "");
  const [line2, setLine2] = useState(patient?.address?.line2 || "");
  const [city, setCity] = useState(patient?.address?.city || "");
  const [postcode, setPostcode] = useState(patient?.address?.postcode || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const headers = await authHeaders();
      await instance.put(
        "/api/patient/profile",
        {
          first_name: firstName,
          last_name: lastName,
          phone,
          dob: dob || undefined,
          gender: gender || undefined,
          address: { line1, line2, city, postcode },
        },
        { headers }
      );
      setSaved(true);
      onSaved();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Personal Information</h3>
          <p className="text-xs text-[#6A7282]">Update your personal details and contact information</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {error && <span className="text-xs text-[#DC2626]">{error}</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>

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
              value={patient?.email || ""}
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

      {/* Address */}
      <div className="space-y-4">
        <label className="block text-xs font-semibold text-[#334155]">Home Address</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input
                type="text"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                placeholder="Address line 1"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              value={line2}
              onChange={(e) => setLine2(e.target.value)}
              placeholder="Address line 2 (optional)"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div>
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Postcode"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
