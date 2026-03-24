"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PatientDetail } from "./types";

const RELATIONSHIPS = ["Parent", "Spouse", "Sibling", "Child", "Friend", "Other"];

export default function EditEmergencyDialog({
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
  const ec = patient.emergency_contact;
  const [name, setName] = useState(ec?.name || "");
  const [phone, setPhone] = useState(ec?.phone || "");
  const [relationship, setRelationship] = useState(ec?.relationship || "");

  useEffect(() => {
    if (open) {
      setName(ec?.name || "");
      setPhone(ec?.phone || "");
      setRelationship(ec?.relationship || "");
    }
  }, [open, ec]);

  const handleSave = () => {
    onSave({
      emergency_contact: { name, phone, relationship },
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Emergency Contact</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Contact Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-[#6A7282] mb-1 block">Relationship</label>
            <Select value={relationship || "none"} onValueChange={(v) => setRelationship(v === "none" ? "" : v)}>
              <SelectTrigger className="w-full rounded-xl"><SelectValue placeholder="Select relationship" /></SelectTrigger>
              <SelectContent>
                {RELATIONSHIPS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !name || !phone || !relationship}
            className="w-full py-2.5 text-sm font-semibold text-white bg-[#0284C7] rounded-xl hover:bg-[#0369A1] transition disabled:opacity-50 cursor-pointer"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
