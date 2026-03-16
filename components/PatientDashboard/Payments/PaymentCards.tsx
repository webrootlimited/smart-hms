"use client";

import { useState } from "react";
import { Plus, Star, Trash2, Loader2, CreditCard } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiDelete, apiPatch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { SavedCard } from "./cardUtils";
import CardVisual from "./CardVisual";
import DeleteCardDialog from "./DeleteCardDialog";
import AddCardDialog from "./AddCardDialog";

export default function PaymentCards() {
  const queryClient = useQueryClient();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);

  const { data: cards = [], isLoading } = useQuery({
    queryKey: queryKeys.patientCards,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; cards: SavedCard[] }>("/api/patient/cards");
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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-bold text-[#101828]">Payment Methods</h2>
          <p className="text-xs text-[#6A7282] mt-0.5">Manage your cards and payment options</p>
        </div>
        <button onClick={() => setShowAddDialog(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0284C7] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
          <Plus className="w-3.5 h-3.5" /> Add Payment Method
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[#0284C7]" />
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
          <CreditCard className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No payment methods</p>
          <p className="text-xs text-[#6A7282] mt-1">Add a card to get started</p>
          <button onClick={() => setShowAddDialog(true)} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#0284C7] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Add Card
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card.id}>
              <CardVisual {...card} />
              <div className="flex items-center justify-between mt-2 px-1">
                {!card.is_primary ? (
                  <button onClick={() => primaryMutation.mutate(card.id)} className="text-[11px] text-[#0284C7] font-medium hover:underline cursor-pointer">Set as Primary</button>
                ) : (
                  <span className="text-[11px] text-[#6A7282] flex items-center gap-1">
                    <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" /> Primary
                  </span>
                )}
                <button onClick={() => setDeleteCardId(card.id)} className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition cursor-pointer">
                  <Trash2 className="w-3 h-3 text-[#EF4444]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteCardDialog
        open={!!deleteCardId}
        onClose={() => setDeleteCardId(null)}
        onConfirm={() => { if (deleteCardId) deleteMutation.mutate(deleteCardId); setDeleteCardId(null); }}
        isPending={deleteMutation.isPending}
      />

      <AddCardDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  );
}
