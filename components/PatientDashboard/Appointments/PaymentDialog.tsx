"use client";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, Lock, Wifi, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { SavedCard, CARD_GRADIENTS } from "@/components/PatientDashboard/Payments/cardUtils";
import StripeProvider from "@/components/utils/StripeProvider";
import StripeCardForm from "@/components/PatientDashboard/Payments/StripeCardForm";

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
  doctorId: string;
  doctorName: string;
  selectedDate: Date;
  selectedTime: string;
  reason: string;
  appointmentType?: "ONLINE" | "PHYSICAL";
  clinicId?: string;
  onInvalidate: () => void;
  onSuccess?: () => void;
}

export default function PaymentDialog({
  open, onOpenChange, savedCards, selectedCard, setSelectedCard,
  total, doctorId, doctorName, selectedDate, selectedTime, reason,
  appointmentType = "ONLINE", clinicId, onInvalidate, onSuccess,
}: Props) {
  const queryClient = useQueryClient();
  const [useNewCard, setUseNewCard] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [setupSecret, setSetupSecret] = useState<string | null>(null);
  const [loadingSetup, setLoadingSetup] = useState(false);

  // Build scheduled_at from date + time
  function buildScheduledAt() {
    const d = new Date(selectedDate);
    const match = selectedTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (match) {
      let h = parseInt(match[1]);
      const m = parseInt(match[2]);
      const ampm = match[3].toUpperCase();
      if (ampm === "PM" && h !== 12) h += 12;
      if (ampm === "AM" && h === 12) h = 0;
      d.setHours(h, m, 0, 0);
    }
    return d.toISOString();
  }

  // Prevent double submission
  const [paymentInFlight, setPaymentInFlight] = useState(false);

  // Pay with saved card
  const payMutation = useMutation({
    mutationFn: () => {
      if (paymentInFlight) throw new Error("Payment already in progress");
      setPaymentInFlight(true);
      return apiPost<{ success: boolean; requires_action?: boolean; client_secret?: string }>(
        "/api/patient/payments/create-intent",
        {
          doctor_id: doctorId,
          card_id: selectedCard,
          scheduled_at: buildScheduledAt(),
          reason,
          appointment_type: appointmentType,
          ...(clinicId ? { clinic_id: clinicId } : {}),
        }
      );
    },
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.patientPayments });
        if (onSuccess) onSuccess();
        else setConfirmed(true);
      }
    },
    onSettled: () => setPaymentInFlight(false),
  });

  // Fetch setup intent for new card flow
  const fetchSetupIntent = async () => {
    if (setupSecret) return;
    setLoadingSetup(true);
    try {
      const res = await apiPost<{ success: boolean; client_secret: string }>(
        "/api/patient/payments/setup-intent"
      );
      if (res.success) setSetupSecret(res.client_secret);
    } catch (err) {
      console.error("Setup intent error:", err);
    }
    setLoadingSetup(false);
  };

  // Save new card then pay
  const saveAndPayMutation = useMutation({
    mutationFn: async (paymentMethodId: string) => {
      // Save card first
      const saveRes = await apiPost<{ success: boolean; card: { id: string } }>(
        "/api/patient/payments/save-card",
        { payment_method_id: paymentMethodId }
      );
      if (!saveRes.success) throw new Error("Failed to save card");

      onInvalidate();

      // Then charge
      return apiPost<{ success: boolean }>(
        "/api/patient/payments/create-intent",
        {
          doctor_id: doctorId,
          card_id: saveRes.card.id,
          scheduled_at: buildScheduledAt(),
          reason,
          appointment_type: appointmentType,
          ...(clinicId ? { clinic_id: clinicId } : {}),
        }
      );
    },
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.patientPayments });
        if (onSuccess) onSuccess();
        else setConfirmed(true);
      }
    },
  });

  // Auto-fetch setup intent when no saved cards
  useEffect(() => {
    if (open && savedCards.length === 0 && !setupSecret && !loadingSetup) {
      fetchSetupIntent();
    }
  }, [open, savedCards.length]);

  const handleSwitchToNewCard = () => {
    setUseNewCard(true);
    setSelectedCard(null);
    fetchSetupIntent();
  };

  if (confirmed) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-130 p-0 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
            </div>
            <h3 className="text-lg font-bold text-[#101828] mb-1">Payment Successful!</h3>
            <p className="text-sm text-[#6A7282] mb-1">
              Your appointment with {doctorName} has been confirmed.
            </p>
            <p className="text-sm text-[#6A7282]">
              {formatShortDate(selectedDate)} at {selectedTime}
            </p>
            <p className="text-xl font-bold text-[#16A34A] mt-3">£{total}</p>
            <button
              onClick={() => { onOpenChange(false); setConfirmed(false); }}
              className="mt-5 w-full py-3 bg-[#0284C7] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              Done
            </button>
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
          {/* Saved cards */}
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
              <button onClick={handleSwitchToNewCard} className="w-full text-sm font-semibold text-[#0284C7] hover:underline cursor-pointer text-center py-2">
                + Use a different card
              </button>
            </>
          )}

          {/* New card via Stripe Elements */}
          {(useNewCard || savedCards.length === 0) && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide">Enter card details</p>
                {savedCards.length > 0 && (
                  <button onClick={() => { setUseNewCard(false); const p = savedCards.find((c) => c.is_primary); setSelectedCard(p ? p.id : savedCards[0].id); }} className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
                    Use saved card
                  </button>
                )}
              </div>
              {loadingSetup || !setupSecret ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
                </div>
              ) : (
                <StripeProvider clientSecret={setupSecret}>
                  <StripeCardForm
                    clientSecret={setupSecret}
                    onSuccess={(pmId) => saveAndPayMutation.mutate(pmId)}
                    isPending={saveAndPayMutation.isPending}
                    submitLabel={`Pay £${total} & Confirm`}
                  />
                </StripeProvider>
              )}
            </>
          )}

          {/* Pay with saved card button */}
          {!useNewCard && savedCards.length > 0 && (
            <>
              <div className="flex items-center gap-2 text-[11px] text-[#6A7282]">
                <Lock className="w-3.5 h-3.5" />
                <span>256-bit encrypted &bull; PCI DSS Compliant</span>
              </div>
              <button
                onClick={() => payMutation.mutate()}
                disabled={!selectedCard || payMutation.isPending || paymentInFlight}
                className="w-full py-3.5 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50"
              >
                {payMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                  </span>
                ) : (
                  `Confirm Payment — £${total}`
                )}
              </button>
              {payMutation.isError && (
                <p className="text-xs text-red-600 text-center">
                  Payment failed. Please try again or use a different card.
                </p>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
