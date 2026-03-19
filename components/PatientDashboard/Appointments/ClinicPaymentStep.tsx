"use client";

import { ArrowLeft, CreditCard, CheckCircle2, ShieldCheck, Wifi, Trash2, Star, MapPin } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiDelete, apiPatch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { SavedCard, CARD_GRADIENTS } from "@/components/PatientDashboard/Payments/cardUtils";
import DeleteCardDialog from "@/components/PatientDashboard/Payments/DeleteCardDialog";
import PaymentDialog from "./PaymentDialog";
import type { SlotDoctor, SlotClinic } from "./SelectClinicDateSlot";

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-GB", { month: "short", day: "numeric" });
}

const AVATAR_COLORS = [
  "#F59E0B", "#EF4444", "#7C3AED", "#0284C7", "#16A34A",
];

function getColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ClinicPaymentStep({
  doctor, clinic, selectedDate, selectedTime, reason, onBack, onSuccess,
}: {
  doctor: SlotDoctor;
  clinic: SlotClinic | null;
  selectedDate: Date;
  selectedTime: string;
  reason: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const params = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const total = doctor.consultFee;
  const color = getColor(doctor.id);

  const { data: savedCards = [] } = useQuery({
    queryKey: queryKeys.patientCards,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; cards: SavedCard[] }>("/api/patient/cards");
      const primary = res.cards.find((c) => c.is_primary);
      if (primary) setSelectedCard(primary.id);
      else if (res.cards.length > 0) setSelectedCard(res.cards[0].id);
      return res.cards;
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.patientCards });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/patient/cards/${id}`),
    onSuccess: invalidate,
  });

  const primaryMutation = useMutation({
    mutationFn: (id: string) => apiPatch(`/api/patient/cards/${id}/primary`, {}),
    onSuccess: invalidate,
  });

  if (paymentDone) {
    return (
      <div className="max-w-lg mx-auto mt-12 text-center">
        <div className="w-20 h-20 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-10 h-10 text-[#16A34A]" />
        </div>
        <h2 className="text-2xl font-bold text-[#101828] mb-2">Payment Successful!</h2>
        <p className="text-sm text-[#6A7282] mb-1">
          Your clinic appointment with {doctor.name} has been confirmed.
        </p>
        <p className="text-sm text-[#6A7282]">
          {formatShortDate(selectedDate)} at {selectedTime}
        </p>
        {clinic && (
          <p className="text-sm text-[#6A7282] mt-1 flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {clinic.name}
          </p>
        )}
        <p className="text-2xl font-bold text-[#16A34A] mt-4">£{total}</p>
        <button
          onClick={() => router.push(`/patient/${params.patientName}/appointments`)}
          className="mt-6 px-8 py-3 bg-[#0284C7] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
        >
          Back to Appointments
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div>
        <h1 className="text-xl font-bold text-[#101828]">Payment</h1>
        <p className="text-sm text-[#6A7282] mt-0.5">Complete payment to confirm your clinic appointment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-[#101828] flex items-center gap-2 mb-5">
            <CreditCard className="w-5 h-5 text-[#7C3AED]" /> Select Payment Method
          </h2>

          <button className="w-full flex items-center gap-3 px-4 py-4 rounded-xl border-2 border-[#7C3AED] bg-[#FAFAFE] text-left cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#F0F9FF] flex items-center justify-center">
              <CreditCard className="w-5 h-5" style={{ color: "#0284C7" }} />
            </div>
            <span className="text-sm font-semibold text-[#101828] flex-1">Credit / Debit Card</span>
            <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
          </button>

          {savedCards.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide">Your saved cards</p>
              {savedCards.map((card) => (
                <div key={card.id} className={`flex items-center gap-3 p-3 rounded-xl border transition ${selectedCard === card.id ? "border-[#7C3AED] bg-[#FAF9FF]" : "border-gray-200"}`}>
                  <button onClick={() => setSelectedCard(card.id)} className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
                    <div className={`bg-linear-to-br ${CARD_GRADIENTS[card.card_type] || CARD_GRADIENTS.VISA} rounded-lg w-14 h-9 flex items-center justify-center relative overflow-hidden shrink-0`}>
                      <Wifi className="w-3 h-3 text-white/60 rotate-90" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#101828]">{card.card_type} •••• {card.last4}</p>
                      <p className="text-xs text-[#6A7282] truncate">{card.holder_name} &bull; Exp {card.expiry}</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    {card.is_primary ? (
                      <span className="text-[9px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded-full">Primary</span>
                    ) : (
                      <button onClick={() => primaryMutation.mutate(card.id)} className="p-1.5 rounded-lg hover:bg-[#F0F9FF] transition cursor-pointer"><Star className="w-3.5 h-3.5 text-[#9CA3AF]" /></button>
                    )}
                    <button onClick={() => setDeleteCardId(card.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer"><Trash2 className="w-3.5 h-3.5 text-[#9CA3AF] hover:text-red-500" /></button>
                  </div>
                  {selectedCard === card.id && <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0" />}
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#101828]">Secure Payment</p>
              <p className="text-xs text-[#6A7282] mt-0.5">Your payment information is encrypted and secure.</p>
            </div>
          </div>

          <button onClick={() => setShowDialog(true)} className="mt-5 w-full py-3.5 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer">
            Pay £{total} & Confirm
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-6">
          <h3 className="text-base font-bold text-[#101828] mb-4">Order Summary</h3>
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">Doctor</p>
            <div className="flex items-center gap-3">
              {doctor.photo_url ? (
                <img src={doctor.photo_url} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: color }}>
                  {doctor.initials}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-[#101828]">{doctor.name}</p>
                <p className="text-xs text-[#6A7282]">{doctor.specialty}</p>
              </div>
            </div>
          </div>
          {clinic && (
            <div className="mb-4">
              <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Clinic</p>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#6A7282]" />
                <p className="text-sm font-medium text-[#101828]">{clinic.name}</p>
              </div>
              <p className="text-xs text-[#6A7282] ml-4.5">{clinic.address}</p>
            </div>
          )}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">Appointment</p>
            <p className="text-sm font-medium text-[#101828]">{formatShortDate(selectedDate)} at {selectedTime}</p>
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6A7282]">Consultation Fee</span>
              <span className="text-[#101828] font-medium">£{total}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6A7282]">Service Fee</span>
              <span className="text-[#101828] font-medium">£0</span>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-[#101828]">Total</span>
            <span className="text-xl font-bold text-[#16A34A]">£{total}</span>
          </div>
        </div>
      </div>

      <DeleteCardDialog
        open={!!deleteCardId}
        onClose={() => setDeleteCardId(null)}
        onConfirm={() => { if (deleteCardId) deleteMutation.mutate(deleteCardId); setDeleteCardId(null); }}
        isPending={deleteMutation.isPending}
      />

      <PaymentDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        savedCards={savedCards}
        selectedCard={selectedCard}
        setSelectedCard={setSelectedCard}
        total={total}
        doctorId={doctor.id}
        doctorName={doctor.name}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        reason={reason}
        appointmentType="PHYSICAL"
        clinicId={clinic?.id}
        onInvalidate={invalidate}
        onSuccess={() => { setShowDialog(false); setPaymentDone(true); }}
      />
    </div>
  );
}
