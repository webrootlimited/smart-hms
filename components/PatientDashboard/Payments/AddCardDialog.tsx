"use client";

import { useState } from "react";
import { CreditCard, Wifi } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { CARD_GRADIENTS, detectCardType, formatCardNumber, formatExpiry } from "./cardUtils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddCardDialog({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const detected = detectCardType(cardNumber);

  const resetForm = () => { setCardNumber(""); setHolderName(""); setExpiry(""); setCvv(""); };

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const clean = cardNumber.replace(/\s/g, "");
      return apiPost("/api/patient/cards", {
        card_type: detected.type, last4: clean.slice(-4), holder_name: holderName, expiry,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patientCards });
      resetForm();
      onClose();
    },
  });

  const canSubmit = cardNumber.replace(/\s/g, "").length >= 13 && holderName && expiry.length === 5 && cvv.length >= 3 && detected.type;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) { resetForm(); onClose(); } }}>
      <DialogContent className="sm:max-w-110 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg font-bold text-[#101828] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#0284C7]" /> Add New Card
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4 space-y-4">
          {/* Card Preview */}
          <div className={`bg-linear-to-br ${detected.type ? (CARD_GRADIENTS[detected.type] || CARD_GRADIENTS.VISA) : "from-[#6B7280] to-[#9CA3AF]"} rounded-xl p-4 text-white relative overflow-hidden h-32.5 flex flex-col justify-between`}>
            <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">{detected.label || "Card"}</span>
              <Wifi className="w-4 h-4 opacity-60 rotate-90" />
            </div>
            <div>
              <p className="text-sm font-mono tracking-[0.2em] mb-2">{cardNumber || "•••• •••• •••• ••••"}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[9px] opacity-60 uppercase">Cardholder</p>
                  <p className="text-xs font-semibold">{holderName || "Your Name"}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] opacity-60 uppercase">Expires</p>
                  <p className="text-xs font-semibold">{expiry || "MM/YY"}</p>
                </div>
              </div>
            </div>
          </div>

          {detected.type && (
            <span className="text-xs font-semibold text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded-lg inline-block">{detected.label} Detected</span>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-[#4A5565] mb-1 block">Card Number</label>
              <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition" />
            </div>
            <div>
              <label className="text-xs font-medium text-[#4A5565] mb-1 block">Cardholder Name</label>
              <input type="text" value={holderName} onChange={(e) => setHolderName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1 block">Expiry Date</label>
                <input type="text" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition" />
              </div>
              <div>
                <label className="text-xs font-medium text-[#4A5565] mb-1 block">CVV</label>
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" maxLength={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition" />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={() => { resetForm(); onClose(); }} className="flex-1 py-2.5 text-sm font-semibold text-[#4A5565] bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer">Cancel</button>
            <button onClick={() => mutate()} disabled={!canSubmit || isPending} className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#0284C7] rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50">{isPending ? "Adding..." : "Add Card"}</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
