import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Copy } from "lucide-react";
import { MODES, STATUSES } from "./mockData";
import type { AppointmentType } from "./types";

export function EditAppointmentTypeDialog({
  type,
  open,
  onClose,
}: {
  type: AppointmentType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!type) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Appointment Type</DialogTitle>
          <DialogDescription>Update the details for {type.name}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Name</label>
            <input
              type="text"
              defaultValue={type.name}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">Description</label>
            <input
              type="text"
              defaultValue={type.description}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Duration (mins)</label>
              <input
                type="number"
                defaultValue={type.duration}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Fee ($)</label>
              <input
                type="number"
                defaultValue={type.fee}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Mode</label>
              <Select defaultValue={type.mode}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODES.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">Status</label>
              <Select defaultValue={type.status}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Save Changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function CopyAppointmentTypeDialog({
  type,
  open,
  onClose,
}: {
  type: AppointmentType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!type) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="w-5 h-5 text-[#0284C7]" /> Duplicate Type
          </DialogTitle>
          <DialogDescription>
            Create a copy of <span className="font-semibold text-[#101828]">{type.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-[#6A7282] space-y-1">
          <p>A new appointment type will be created with the same settings:</p>
          <ul className="list-disc pl-5 space-y-0.5 text-xs">
            <li>Duration: {type.duration} mins</li>
            <li>Mode: {type.mode}</li>
            <li>Fee: ${type.fee}</li>
          </ul>
        </div>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Create Copy
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteAppointmentTypeDialog({
  type,
  open,
  onClose,
}: {
  type: AppointmentType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!type) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-[#FEF2F2] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
            Delete Appointment Type
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#101828]">{type.name}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-[#EF4444] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
