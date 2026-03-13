"use client";

import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  ShieldPlus,
  CheckCircle2,
  ShieldCheck,
  Lock,
  Wifi,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  initials: string;
  color: string;
  price: number;
}

const paymentMethods = [
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: CreditCard,
    iconColor: "#0284C7",
    iconBg: "bg-[#F0F9FF]",
  },
  {
    id: "insurance",
    label: "From Insurance",
    icon: ShieldPlus,
    iconColor: "#059669",
    iconBg: "bg-[#F0FDF4]",
  },
];

const savedCards = [
  {
    id: 1,
    type: "VISA",
    last4: "4242",
    holder: "John Doe",
    expiry: "12/25",
    gradient: "from-[#1E3A5F] to-[#0284C7]",
    primary: true,
  },
  {
    id: 2,
    type: "VISA",
    last4: "8901",
    holder: "John Doe",
    expiry: "09/28",
    gradient: "from-[#059669] to-[#34D399]",
    primary: false,
  },
  {
    id: 3,
    type: "MASTERCARD",
    last4: "5678",
    holder: "Jane Doe",
    expiry: "08/26",
    gradient: "from-[#0891B2] to-[#06B6D4]",
    primary: false,
  },
];

function formatShortDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
  });
}

export default function PaymentStep({
  doctor,
  selectedDate,
  selectedTime,
  onBack,
}: {
  doctor: Doctor;
  selectedDate: Date;
  selectedTime: string;
  onBack: () => void;
}) {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(1);
  const [useNewCard, setUseNewCard] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const serviceFee = 0;
  const total = doctor.price + serviceFee;

  return (
    <div className="space-y-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Heading */}
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Payment</h1>
        <p className="text-sm text-[#6A7282] mt-0.5">
          Complete payment to confirm your online consultation
        </p>
      </div>

      {/* Main 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 max-w-4xl mx-auto">
        {/* Left: Payment methods */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-[#101828] flex items-center gap-2 mb-5">
            <CreditCard className="w-5 h-5 text-[#7C3AED]" />
            Select Payment Method
          </h2>

          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const isSelected = selectedMethod === method.id;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl border-2 text-left transition cursor-pointer ${
                    isSelected
                      ? "border-[#7C3AED] bg-[#FAFAFE]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${method.iconBg} flex items-center justify-center`}
                  >
                    <method.icon
                      className="w-5 h-5"
                      style={{ color: method.iconColor }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#101828] flex-1">
                    {method.label}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Secure payment note */}
          <div className="mt-5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-3 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#101828]">
                Secure Payment
              </p>
              <p className="text-xs text-[#6A7282] mt-0.5">
                Your payment information is encrypted and secure. We do not
                store card details.
              </p>
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={() => setShowDialog(true)}
            className="mt-5 w-full py-3.5 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
          >
            Pay £{total} & Confirm
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-fit lg:sticky lg:top-6">
          <h3 className="text-base font-bold text-[#101828] mb-4">
            Order Summary
          </h3>

          {/* Doctor */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-2">
              Doctor
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: doctor.color }}
              >
                {doctor.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  {doctor.name}
                </p>
                <p className="text-xs text-[#6A7282]">{doctor.specialty}</p>
              </div>
            </div>
          </div>

          {/* Appointment */}
          <div className="mb-4">
            <p className="text-[10px] text-[#6A7282] uppercase tracking-wide mb-1">
              Appointment
            </p>
            <p className="text-sm font-medium text-[#101828]">
              {formatShortDate(selectedDate)} at {selectedTime}
            </p>
          </div>

          {/* Fee breakdown */}
          <div className="border-t border-gray-100 pt-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6A7282]">Consultation Fee</span>
              <span className="text-[#101828] font-medium">
                £{doctor.price}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6A7282]">Service Fee</span>
              <span className="text-[#101828] font-medium">£{serviceFee}</span>
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-100 mt-3 pt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-[#101828]">Total</span>
            <span className="text-xl font-bold text-[#16A34A]">£{total}</span>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden">
          {confirmed ? (
            /* Success State */
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
              </div>
              <h3 className="text-lg font-bold text-[#101828] mb-1">
                Payment Successful!
              </h3>
              <p className="text-sm text-[#6A7282] mb-1">
                Your appointment with {doctor.name} has been confirmed.
              </p>
              <p className="text-sm text-[#6A7282]">
                {formatShortDate(selectedDate)} at {selectedTime}
              </p>
              <p className="text-xl font-bold text-[#16A34A] mt-3">
                £{total}
              </p>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setConfirmed(false);
                }}
                className="mt-5 w-full py-3 bg-[#0284C7] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Card Selection / New Card Form */
            <>
              <DialogHeader className="px-6 pt-6 pb-0">
                <DialogTitle className="text-lg font-bold text-[#101828] flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#7C3AED]" />
                  Complete Payment — £{total}
                </DialogTitle>
              </DialogHeader>

              <div className="px-6 pb-6 pt-4 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Saved Cards */}
                {!useNewCard && (
                  <>
                    <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide">
                      Select a saved card
                    </p>
                    <div className="space-y-3">
                      {savedCards.map((card) => {
                        const isSelected = selectedCard === card.id;
                        return (
                          <button
                            key={card.id}
                            onClick={() => setSelectedCard(card.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition cursor-pointer ${
                              isSelected
                                ? "border-[#7C3AED] bg-[#FAF9FF]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            {/* Mini card visual */}
                            <div
                              className={`bg-linear-to-br ${card.gradient} rounded-lg w-16 h-10 flex items-center justify-center relative overflow-hidden shrink-0`}
                            >
                              <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white/10" />
                              <Wifi className="w-3 h-3 text-white/60 rotate-90" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#101828]">
                                {card.type} •••• {card.last4}
                              </p>
                              <p className="text-xs text-[#6A7282]">
                                {card.holder} &bull; Exp {card.expiry}
                              </p>
                            </div>
                            {card.primary && (
                              <span className="text-[9px] font-bold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded-full shrink-0">
                                Primary
                              </span>
                            )}
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Or use new card */}
                    <button
                      onClick={() => {
                        setUseNewCard(true);
                        setSelectedCard(null);
                      }}
                      className="w-full text-sm font-semibold text-[#0284C7] hover:underline cursor-pointer text-center py-2"
                    >
                      + Use a different card
                    </button>
                  </>
                )}

                {/* New Card Form */}
                {useNewCard && (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#6A7282] uppercase tracking-wide">
                        Enter card details
                      </p>
                      <button
                        onClick={() => {
                          setUseNewCard(false);
                          setSelectedCard(1);
                        }}
                        className="text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer"
                      >
                        Use saved card
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium text-[#4A5565] mb-1 block">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-[#4A5565] mb-1 block">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-[#4A5565] mb-1 block">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#4A5565] mb-1 block">
                            CVV
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            maxLength={4}
                            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Secure note */}
                <div className="flex items-center gap-2 text-[11px] text-[#6A7282]">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit encrypted &bull; PCI DSS Compliant</span>
                </div>

                {/* Confirm button */}
                <button
                  onClick={() => setConfirmed(true)}
                  className="w-full py-3.5 bg-linear-to-r from-[#16A34A] to-[#059669] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer"
                >
                  Confirm Payment — £{total}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
