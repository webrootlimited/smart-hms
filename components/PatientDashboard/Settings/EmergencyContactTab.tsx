"use client";

import { useState } from "react";
import { User, Phone, Heart, Loader2, Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPut } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { PatientProfile } from "./PatientSettingsMain";

interface Props {
  patient: PatientProfile | null;
}

export default function EmergencyContactTab({ patient }: Props) {
  const queryClient = useQueryClient();
  const ec = patient?.emergency_contact;
  const [name, setName] = useState(ec?.name || "");
  const [phone, setPhone] = useState(ec?.phone || "");
  const [relationship, setRelationship] = useState(ec?.relationship || "");
  const [saved, setSaved] = useState(false);

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => apiPut("/api/patient/emergency-contact", { name, phone, relationship }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patientProfile });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Emergency Contact</h3>
          <p className="text-xs text-[#6A7282]">Someone we can reach in case of an emergency</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {error && <span className="text-xs text-[#DC2626]">Failed to save changes</span>}
          <button
            onClick={() => mutate()}
            disabled={isPending || !name || !phone || !relationship}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Contact Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7700 900000" className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Relationship</label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] z-10 pointer-events-none" />
            <Select value={relationship} onValueChange={setRelationship}>
              <SelectTrigger className="w-full h-10 pl-9 rounded-xl border-gray-200 text-sm">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Child">Child</SelectItem>
                <SelectItem value="Friend">Friend</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="p-4 bg-[#FFF7ED] rounded-2xl border border-[#FED7AA]">
        <p className="text-xs font-semibold text-[#EA580C] mb-1">Important</p>
        <p className="text-[11px] text-[#4A5565] leading-relaxed">
          This person will be contacted if there is an emergency during your visit or treatment. Please ensure the phone number is correct and the contact is aware they have been listed.
        </p>
      </div>
    </div>
  );
}
