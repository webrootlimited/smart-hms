"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PatientDetail } from "./types";

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function EditMedicalDialog({
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
  const [bloodGroup, setBloodGroup] = useState(patient.blood_group || "");
  const [nhsNumber, setNhsNumber] = useState(patient.nhs_number || "");

  useEffect(() => {
    if (open) {
      setBloodGroup(patient.blood_group || "");
      setNhsNumber(patient.nhs_number || "");
    }
  }, [open, patient]);

  const handleSave = () => {
    onSave({
      blood_group: bloodGroup || null,
      nhs_number: nhsNumber || null,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Medical Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Blood Group</label>
            <Select value={bloodGroup || "none"} onValueChange={(v) => setBloodGroup(v === "none" ? "" : v)}>
              <SelectTrigger className="w-full rounded-xl"><SelectValue placeholder="Select blood group" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not set</SelectItem>
                {BLOOD_GROUPS.map((bg) => (
                  <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">NHS Number</label>
            <input
              type="text"
              value={nhsNumber}
              onChange={(e) => setNhsNumber(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
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
