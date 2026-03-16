export interface SavedCard {
  id: string;
  card_type: string;
  last4: string;
  holder_name: string;
  expiry: string;
  is_primary: boolean;
}

export const CARD_GRADIENTS: Record<string, string> = {
  VISA: "from-[#1E3A5F] to-[#0284C7]",
  MASTERCARD: "from-[#0891B2] to-[#06B6D4]",
  AMEX: "from-[#059669] to-[#34D399]",
};

export function detectCardType(num: string): { type: string; label: string } {
  const clean = num.replace(/\s/g, "");
  if (/^4/.test(clean)) return { type: "VISA", label: "Visa" };
  if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return { type: "MASTERCARD", label: "Mastercard" };
  if (/^3[47]/.test(clean)) return { type: "AMEX", label: "Amex" };
  return { type: "", label: "" };
}

export function formatCardNumber(value: string) {
  const clean = value.replace(/\D/g, "").slice(0, 16);
  return clean.replace(/(.{4})/g, "$1 ").trim();
}

export function formatExpiry(value: string) {
  const clean = value.replace(/\D/g, "").slice(0, 4);
  if (clean.length >= 3) return `${clean.slice(0, 2)}/${clean.slice(2)}`;
  return clean;
}
