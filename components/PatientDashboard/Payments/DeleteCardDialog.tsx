"use client";

import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export default function DeleteCardDialog({ open, onClose, onConfirm, isPending }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-96 p-0 overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
          </div>
          <h3 className="text-base font-bold text-[#101828] mb-1">Remove Card</h3>
          <p className="text-sm text-[#6A7282]">
            Are you sure you want to remove this card? This action cannot be undone.
          </p>
          <div className="flex gap-3 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-semibold text-[#4A5565] bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isPending}
              className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#EF4444] rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
