"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DoctorDetail } from "./types";

/* ── Edit Basic Info ── */
export function EditBasicInfoDialog({
  open,
  onClose,
  doctor,
  onSave,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  doctor: DoctorDetail;
  onSave: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [firstName, setFirstName] = useState(doctor.first_name);
  const [lastName, setLastName] = useState(doctor.last_name);
  const [dob, setDob] = useState(doctor.dob ? doctor.dob.split("T")[0] : "");
  const [gender, setGender] = useState(doctor.gender || "");

  useEffect(() => {
    if (open) {
      setFirstName(doctor.first_name);
      setLastName(doctor.last_name);
      setDob(doctor.dob ? doctor.dob.split("T")[0] : "");
      setGender(doctor.gender || "");
    }
  }, [open, doctor]);

  const handleSave = () => {
    onSave({
      first_name: firstName,
      last_name: lastName,
      dob: dob || null,
      gender: gender || null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Basic Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" value={firstName} onChange={setFirstName} />
            <Field label="Last Name" value={lastName} onChange={setLastName} />
          </div>
          <Field label="Date of Birth" value={dob} onChange={setDob} type="date" />
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Gender</label>
            <Select value={gender || "none"} onValueChange={(v) => setGender(v === "none" ? "" : v)}>
              <SelectTrigger className="w-full rounded-xl">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not specified</SelectItem>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SaveButton onClick={handleSave} saving={saving} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Edit Contact ── */
export function EditContactDialog({
  open,
  onClose,
  doctor,
  onSave,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  doctor: DoctorDetail;
  onSave: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [phone, setPhone] = useState(doctor.phone);
  const [address, setAddress] = useState(doctor.address);

  useEffect(() => {
    if (open) {
      setPhone(doctor.phone);
      setAddress(doctor.address);
    }
  }, [open, doctor]);

  const handleSave = () => {
    onSave({ phone, address });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Field label="Phone Number" value={phone} onChange={setPhone} />
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] resize-none"
            />
          </div>
          <SaveButton onClick={handleSave} saving={saving} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Edit Professional Details ── */
export function EditProfessionalDialog({
  open,
  onClose,
  doctor,
  onSave,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  doctor: DoctorDetail;
  onSave: (body: Record<string, unknown>) => void;
  saving: boolean;
}) {
  const [department, setDepartment] = useState(doctor.department);
  const [experience, setExperience] = useState(String(doctor.experience_years));
  const [fee, setFee] = useState(String(doctor.consultation_fee));
  const [bio, setBio] = useState(doctor.bio);

  useEffect(() => {
    if (open) {
      setDepartment(doctor.department);
      setExperience(String(doctor.experience_years));
      setFee(String(doctor.consultation_fee));
      setBio(doctor.bio);
    }
  }, [open, doctor]);

  const handleSave = () => {
    onSave({
      department,
      experience_years: parseInt(experience) || 0,
      consultation_fee: parseInt(fee) || 0,
      bio,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Professional Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Field label="Department" value={department} onChange={setDepartment} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Experience (years)" value={experience} onChange={setExperience} type="number" />
            <Field label="Consultation Fee (£)" value={fee} onChange={setFee} type="number" />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] resize-none"
            />
          </div>
          <SaveButton onClick={handleSave} saving={saving} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ── Shared helpers ── */

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
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

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="w-full py-2.5 text-sm font-semibold text-white bg-[#0284C7] rounded-xl hover:bg-[#0369A1] transition disabled:opacity-50 cursor-pointer"
    >
      {saving ? "Saving..." : "Save Changes"}
    </button>
  );
}
