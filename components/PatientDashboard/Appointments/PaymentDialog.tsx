"use client";

import { useState } from "react";
import { CreditCard, CheckCircle2, Lock, Wifi } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import { SavedCard, CARD_GRADIENTS, formatCardNumber, formatExpiry, detectCardType } from "@/components/PatientDashboard/Payments/cardUtils";

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  savedCards: SavedCard[];
  selectedCard: string | null;
  setSelectedCard: (id: string | null) => void;
  total: number;
  doctorName: string;
  selectedDate: Date;
  selectedTime: string;
  onInvalidate: () => void;
}

export default function PaymentDialog({
  open, onOpenChange, savedCards, selectedCard, setSelectedCard,
  total, doctorName, selectedDate, selectedTime, onInvalidate,
}: Props) {
  const [useNewCard, setUseNewCard] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardHolder, setNewCardHolder] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newCardCvv, setNewCardCvv] = useState("");
  const [saveNewCard, setSaveNewCard] = useState(true);

  const addCardMutation = useMutation({
    mutationFn: async () => {
      const clean = newCardNumber.replace(/\s/g, "");
      if (saveNewCard) {
        const detected = detectCardType(clean);
        const res = await apiPost<{ success: boolean; card: { id: string } }>("/api/patient/cards", {
          card_type: detected.type, last4: clean.slice(-4), holder_name: newCardHolder, expiry: newCardExpiry,
        });
        if (res.success) { setSelectedCard(res.card.id); onInvalidate(); }
      }
    },
    onSuccess: () => setConfirmed(true),
  });

  if (confirmed) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-130 p-0 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-[#16A34A]" /></div>
            <h3 className="text-lg font-bold text-[#101828] mb-1">Payment Successful!</h3>
            <p className="text-sm text-[#6A7282] mb-1">Your appointment with {doctorName} has been confirmed.</p>
            <p className="text-sm text-[#6A7282]">{formatShortDate(selectedDate)} at {selectedTime}</p>
            <p className="text-xl font-bold text-[#16A34A] mt-3">£{total}</p>
            <button onClick={() => { onOpenChange(false); setConfirmed(false); }} className="mt-5 w-full py-3 bg-[#0284C7] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer">Done</button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-130 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg font-bold text-[#101828] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#7C3AED]" /> Complete Payment — £{total}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 pt-4 space-y-5 max-h-[70vh] overflow-y-auto">
          {!useNewCard && savedCards.length > 0 && (
            <>
              <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide">Select a saved card</p>
              <div className="space-y-3">
                {savedCards.map((card) => {
                  const isSelected = selectedCard === card.id;
                  return (
                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition cursor-pointer ${isSelected ? "border-[#7C3AED] bg-[#FAF9FF]" : "border-gray-200 hover:border-gray-300"}`}>
                      <div className={`bg-linear-to-br ${CARD_GRADIENTS[card.card_type] || CARD_GRADIENTS.VISA} rounded-lg w-16 h-10 flex items-center justify-center relative overflow-hidden shrink-0`}>
                        <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white/10" />
                        <Wifi className="w-3 h-3 text-white/60 rotate-90" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#101828]">{card.card_type} •••• {card.last4}</p>
                        <p className="text-xs text-[#6A7282]">{card.holder_name} &bull; Exp {card.expiry}</p>
                      </div>
                      {card.is_primary && <span className="text-[9px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded-full shrink-0">Primary</span>}
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { setUseNewCard(true); setSelectedCard(null); }} className="w-full text-sm font-semibold text-[#0284C7] hover:underline cursor-pointer text-center py-2">+ Use a different card</button>
            </>
          )}
          {(useNewCard || savedCards.length === 0) && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide">Enter card details</p>
                {savedCards.length > 0 && (
                  <button onClick={() => { setUseNewCard(false); const p = savedCards.find((c) => c.is_primary); setSelectedCard(p ? p.id : savedCards[0].id); }} className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">Use saved card</button>
                )}
              </div>
              <div className="space-y-3">
                <div><label className="text-xs font-medium text-[#4A5565] mb-1 block">Card Number</label><input type="text" value={newCardNumber} onChange={(e) => setNewCardNumber(formatCardNumber(e.target.value))} placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition" /></div>
                <div><label className="text-xs font-medium text-[#4A5565] mb-1 block">Cardholder Name</label><input type="text" value={newCardHolder} onChange={(e) => setNewCardHolder(e.target.value)} placeholder="John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="text-xs font-medium text-[#4A5565] mb-1 block">Expiry Date</label><input type="text" value={newCardExpiry} onChange={(e) => setNewCardExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition" /></div>
                  <div><label className="text-xs font-medium text-[#4A5565] mb-1 block">CVV</label><input type="text" value={newCardCvv} onChange={(e) => setNewCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" maxLength={4} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition" /></div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={saveNewCard} onChange={(e) => setSaveNewCard(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED]" /><span className="text-xs text-[#4A5565]">Save this card for future payments</span></label>
              </div>
            </>
          )}
          <div className="flex items-center gap-2 text-[11px] text-[#6A7282]"><Lock className="w-3.5 h-3.5" /><span>256-bit encrypted &bull; PCI DSS Compliant</span></div>
          {useNewCard || savedCards.length === 0 ? (
            <button onClick={() => addCardMutation.mutate()} disabled={addCardMutation.isPending || !newCardNumber || !newCardHolder || !newCardExpiry || !newCardCvv} className="w-full py-3.5 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50">
              {addCardMutation.isPending ? "Processing..." : `Confirm Payment — £${total}`}
            </button>
          ) : (
            <button onClick={() => setConfirmed(true)} disabled={!selectedCard} className="w-full py-3.5 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50">
              Confirm Payment — £{total}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
