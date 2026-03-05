"use client";

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
import { User, Mail, Building2, Shield, Clock, AlertTriangle } from "lucide-react";
import type { User as UserType } from "./types";

// ── View Dialog ──
export function ViewUserDialog({
  user,
  open,
  onClose,
}: {
  user: UserType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!user) return null;

  const fields = [
    { icon: User, label: "Full Name", value: user.name },
    { icon: Mail, label: "Email", value: user.email },
    { icon: Shield, label: "Role", value: user.role },
    { icon: Building2, label: "Department", value: user.department },
    { icon: Clock, label: "Last Login", value: user.lastLogin },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>Viewing profile for {user.name}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#0284C7] flex items-center justify-center text-base font-bold">
            {user.avatar}
          </div>
          <div>
            <p className="font-semibold text-[#101828]">{user.name}</p>
            <span
              className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-md mt-0.5 ${
                user.status === "Active"
                  ? "bg-[#F0FDF4] text-[#16A34A]"
                  : user.status === "Inactive"
                  ? "bg-[#FEF2F2] text-[#EF4444]"
                  : "bg-[#FFFBEB] text-[#D97706]"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                <f.icon className="w-4 h-4 text-[#6A7282]" />
              </div>
              <div>
                <p className="text-xs text-[#6A7282]">{f.label}</p>
                <p className="text-sm font-medium text-[#101828]">{f.value}</p>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Edit Dialog ──
export function EditUserDialog({
  user,
  open,
  onClose,
}: {
  user: UserType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Update details for {user.name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Email
            </label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">
                Role
              </label>
              <Select defaultValue={user.role}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Doctor", "Nurse", "Admin", "Staff"].map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1">
                Status
              </label>
              <Select defaultValue={user.status}>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Active", "Inactive", "Pending"].map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#334155] mb-1">
              Department
            </label>
            <input
              type="text"
              defaultValue={user.department}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
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

// ── Delete Dialog ──
export function DeleteUserDialog({
  user,
  open,
  onClose,
}: {
  user: UserType | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <div>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>This action cannot be undone</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <p className="text-sm text-[#4A5565]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#101828]">{user.name}</span>?
          All associated data will be permanently removed.
        </p>

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
            Delete User
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

