"use client";

import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import StripeProvider from "@/components/utils/StripeProvider";
import StripeCardForm from "./StripeCardForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddCardDialog({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch setup intent when dialog opens
  const fetchSetupIntent = async () => {
    if (clientSecret) return;
    setLoading(true);
    try {
      const res = await apiPost<{ success: boolean; client_secret: string }>(
        "/api/patient/payments/setup-intent"
      );
      if (res.success) setClientSecret(res.client_secret);
    } catch (err) {
      console.error("Setup intent error:", err);
    }
    setLoading(false);
  };

  const saveCardMutation = useMutation({
    mutationFn: (paymentMethodId: string) =>
      apiPost("/api/patient/payments/save-card", { payment_method_id: paymentMethodId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patientCards });
      handleClose();
    },
  });

  const handleClose = () => {
    setClientSecret(null);
    onClose();
  };

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      fetchSetupIntent();
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-110 p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-lg font-bold text-[#101828] flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#0284C7]" /> Add New Card
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-4">
          {loading || !clientSecret ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
            </div>
          ) : (
            <StripeProvider clientSecret={clientSecret}>
              <StripeCardForm
                clientSecret={clientSecret}
                onSuccess={(pmId) => saveCardMutation.mutate(pmId)}
                isPending={saveCardMutation.isPending}
                submitLabel="Add Card"
              />
            </StripeProvider>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
