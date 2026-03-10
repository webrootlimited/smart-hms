"use client";

import { Plus, Star, Pencil, Trash2, Wifi } from "lucide-react";

const cards = [
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

export default function PaymentCards() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#101828]">Payment Methods</h2>
          <p className="text-xs text-[#6A7282] mt-0.5">
            Manage your cards and payment options
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0284C7] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          Add Payment Method
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div key={card.id}>
            {/* Card visual */}
            <div
              className={`bg-linear-to-br ${card.gradient} rounded-xl p-5 text-white relative overflow-hidden h-[160px] flex flex-col justify-between`}
            >
              {/* Decorative circles */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute right-8 bottom-4 w-16 h-16 rounded-full bg-white/5" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">
                  {card.type}
                </span>
                <Wifi className="w-4 h-4 opacity-60 rotate-90" />
              </div>

              <div>
                <p className="text-sm font-mono tracking-[0.2em] mb-3">
                  •••• •••• •••• {card.last4}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[9px] opacity-60 uppercase">Cardholder</p>
                    <p className="text-xs font-semibold">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] opacity-60 uppercase">Expires</p>
                    <p className="text-xs font-semibold">{card.expiry}</p>
                  </div>
                </div>
              </div>

              {card.primary && (
                <div className="absolute top-4 right-4 bg-white/20 px-2 py-0.5 rounded text-[9px] font-bold">
                  Primary
                </div>
              )}
            </div>

            {/* Card actions */}
            <div className="flex items-center justify-between mt-2 px-1">
              {!card.primary ? (
                <button className="text-[11px] text-[#0284C7] font-medium hover:underline cursor-pointer">
                  Set as Primary
                </button>
              ) : (
                <span className="text-[11px] text-[#6A7282] flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                  Primary
                </span>
              )}
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition cursor-pointer">
                  <Pencil className="w-3 h-3 text-[#6A7282]" />
                </button>
                <button className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition cursor-pointer">
                  <Trash2 className="w-3 h-3 text-[#EF4444]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
