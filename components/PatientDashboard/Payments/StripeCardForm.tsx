"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Lock } from "lucide-react";

interface Props {
  clientSecret: string;
  onSuccess: (paymentMethodId: string) => void;
  onError?: (message: string) => void;
  submitLabel?: string;
  isPending?: boolean;
}

const CARD_STYLE = {
  style: {
    base: {
      fontSize: "14px",
      color: "#101828",
      "::placeholder": { color: "#9CA3AF" },
    },
    invalid: { color: "#DC2626" },
  },
};

export default function StripeCardForm({
  clientSecret,
  onSuccess,
  onError,
  submitLabel = "Save Card",
  isPending = false,
}: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [holderName, setHolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setError("");

    const { error: stripeError, setupIntent } = await stripe.confirmCardSetup(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: { name: holderName || undefined },
        },
      }
    );

    if (stripeError) {
      const msg = stripeError.message || "Card setup failed";
      setError(msg);
      onError?.(msg);
      setLoading(false);
      return;
    }

    if (setupIntent?.payment_method) {
      onSuccess(setupIntent.payment_method as string);
    }
    setLoading(false);
  };

  const busy = loading || isPending;

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-[#4A5565] mb-1 block">
          Cardholder Name
        </label>
        <input
          type="text"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
          placeholder="John Doe"
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-[#4A5565] mb-1 block">
          Card Details
        </label>
        <div className="px-4 py-3 border border-gray-200 rounded-xl focus-within:border-[#0284C7] focus-within:ring-1 focus-within:ring-[#0284C7] transition">
          <CardElement options={CARD_STYLE} />
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600">{error}</p>
      )}

      <div className="flex items-center gap-2 text-[11px] text-[#6A7282]">
        <Lock className="w-3.5 h-3.5" />
        <span>256-bit encrypted &bull; PCI DSS Compliant</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={busy || !stripe}
        className="w-full py-3 bg-[#0284C7] text-white text-sm font-bold rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50"
      >
        {busy ? "Processing..." : submitLabel}
      </button>
    </div>
  );
}
