"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PatientDetail } from "./types";

export default function EditPersonalDialog({
  open,
  onClose,
  patient,
  onSave,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  patient: PatientDetail;
  onSave: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [firstName, setFirstName] = useState(patient.first_name);
  const [lastName, setLastName] = useState(patient.last_name);
  const [phone, setPhone] = useState(patient.phone);
  const [dob, setDob] = useState(patient.dob ? patient.dob.split("T")[0] : "");
  const [gender, setGender] = useState(patient.gender);
  const [line1, setLine1] = useState(patient.address?.line1 || "");
  const [line2, setLine2] = useState(patient.address?.line2 || "");
  const [city, setCity] = useState(patient.address?.city || "");
  const [postcode, setPostcode] = useState(patient.address?.postcode || "");

  useEffect(() => {
    if (open) {
      setFirstName(patient.first_name);
      setLastName(patient.last_name);
      setPhone(patient.phone);
      setDob(patient.dob ? patient.dob.split("T")[0] : "");
      setGender(patient.gender);
      setLine1(patient.address?.line1 || "");
      setLine2(patient.address?.line2 || "");
      setCity(patient.address?.city || "");
      setPostcode(patient.address?.postcode || "");
    }
  }, [open, patient]);

  const handleSave = () => {
    onSave({
      first_name: firstName,
      last_name: lastName,
      phone,
      dob: dob || null,
      gender,
      address: { line1, line2, city, postcode },
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Personal Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" value={firstName} onChange={setFirstName} />
            <Field label="Last Name" value={lastName} onChange={setLastName} />
          </div>
          <Field label="Phone" value={phone} onChange={setPhone} />
          <Field label="Date of Birth" value={dob} onChange={setDob} type="date" />
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Gender</label>
            <Select value={gender || "none"} onValueChange={(v) => setGender(v === "none" ? "" : v)}>
              <SelectTrigger className="w-full rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Field label="Address Line 1" value={line1} onChange={setLine1} />
          <Field label="Address Line 2" value={line2} onChange={setLine2} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" value={city} onChange={setCity} />
            <Field label="Postcode" value={postcode} onChange={setPostcode} />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-2.5 text-sm font-semibold text-white bg-[#0284C7] rounded-xl hover:bg-[#0369A1] transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-[#6A7282] mb-1 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
      />
    </div>
  );
}
