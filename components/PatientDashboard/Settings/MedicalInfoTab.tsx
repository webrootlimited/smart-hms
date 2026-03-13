"use client";

import { useState } from "react";
import { Droplets, Hash, Loader2, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientProfile, authHeaders } from "./PatientSettingsMain";
import instance from "@/utils/instance";

interface Props {
  patient: PatientProfile | null;
  onSaved: () => void;
}

export default function MedicalInfoTab({ patient, onSaved }: Props) {
  const [bloodGroup, setBloodGroup] = useState(patient?.blood_group || "");
  const [nhsNumber, setNhsNumber] = useState(patient?.nhs_number || "");
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
        { blood_group: bloodGroup || undefined, nhs_number: nhsNumber },
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
          <h3 className="text-base font-bold text-[#101828]">Medical Information</h3>
          <p className="text-xs text-[#6A7282]">Keep your medical details up to date for accurate care</p>
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
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Blood Group</label>
          <div className="relative">
            <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] z-10 pointer-events-none" />
            <Select value={bloodGroup} onValueChange={setBloodGroup}>
              <SelectTrigger className="w-full h-10 pl-9 rounded-xl border-gray-200 text-sm">
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">NHS Number</label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={nhsNumber}
              onChange={(e) => setNhsNumber(e.target.value)}
              placeholder="e.g. 123 456 7890"
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="p-4 bg-[#F0F9FF] rounded-2xl border border-[#BAE6FD]">
        <p className="text-xs font-semibold text-[#0284C7] mb-1">Why is this important?</p>
        <p className="text-[11px] text-[#4A5565] leading-relaxed">
          Your blood group and NHS number help medical staff provide faster, more accurate treatment in emergencies. This information is kept strictly confidential in line with NHS and GDPR guidelines.
        </p>
      </div>
    </div>
  );
}
