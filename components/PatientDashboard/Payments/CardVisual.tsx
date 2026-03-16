"use client";

import { Wifi } from "lucide-react";
import { CARD_GRADIENTS } from "./cardUtils";

interface Props {
  card_type: string;
  last4: string;
  holder_name: string;
  expiry: string;
  is_primary: boolean;
}

export default function CardVisual({ card_type, last4, holder_name, expiry, is_primary }: Props) {
  return (
    <div
      className={`bg-linear-to-br ${CARD_GRADIENTS[card_type] || CARD_GRADIENTS.VISA} rounded-xl p-5 text-white relative overflow-hidden h-40 flex flex-col justify-between`}
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute right-8 bottom-4 w-16 h-16 rounded-full bg-white/5" />
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">{card_type}</span>
        <Wifi className="w-4 h-4 opacity-60 rotate-90" />
      </div>
      <div>
        <p className="text-sm font-mono tracking-[0.2em] mb-3">•••• •••• •••• {last4}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] opacity-60 uppercase">Cardholder</p>
            <p className="text-xs font-semibold">{holder_name}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] opacity-60 uppercase">Expires</p>
            <p className="text-xs font-semibold">{expiry}</p>
          </div>
        </div>
      </div>
      {is_primary && (
        <div className="absolute top-4 right-4 bg-white/20 px-2 py-0.5 rounded text-[9px] font-bold">Primary</div>
      )}
    </div>
  );
}
