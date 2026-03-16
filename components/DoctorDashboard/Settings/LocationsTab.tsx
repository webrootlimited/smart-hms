"use client";

import { useState } from "react";
import { MapPin, Plus, Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiPost, apiPut, apiDelete, apiPatch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import LocationForm from "./LocationForm";
import LocationCard from "./LocationCard";

interface Address { line1?: string; line2?: string; city?: string; postcode?: string; country?: string; }
interface Location { id: string; clinic_id: string; name: string; address: Address; phone: string; is_primary: boolean; status: string; }

const EMPTY_FORM = { name: "", line1: "", line2: "", city: "", postcode: "", phone: "" };

export default function LocationsTab() {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: locations = [], isLoading } = useQuery({
    queryKey: queryKeys.doctorLocations,
    queryFn: async () => {
      const res = await apiFetch<{ success: boolean; locations: Location[] }>("/api/doctor/locations");
      return res.locations;
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: queryKeys.doctorLocations });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = { name: form.name, address: { line1: form.line1, line2: form.line2, city: form.city, postcode: form.postcode }, phone: form.phone };
      return editingId ? apiPut(`/api/doctor/locations/${editingId}`, payload) : apiPost("/api/doctor/locations", payload);
    },
    onSuccess: () => { invalidate(); resetForm(); setSaved(true); setTimeout(() => setSaved(false), 3000); },
    onError: () => setError("Failed to save location"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/doctor/locations/${id}`),
    onSuccess: invalidate,
    onError: () => setError("Failed to delete location"),
  });

  const primaryMutation = useMutation({
    mutationFn: (id: string) => apiPatch(`/api/doctor/locations/${id}/primary`, {}),
    onSuccess: invalidate,
    onError: () => setError("Failed to set primary location"),
  });

  const resetForm = () => { setForm(EMPTY_FORM); setShowForm(false); setEditingId(null); };

  const handleEdit = (loc: Location) => {
    setForm({ name: loc.name, line1: loc.address?.line1 || "", line2: loc.address?.line2 || "", city: loc.address?.city || "", postcode: loc.address?.postcode || "", phone: loc.phone });
    setEditingId(loc.id);
    setShowForm(true);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-40"><div className="w-7 h-7 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#101828]">Practice Locations</h3>
          <p className="text-xs text-[#6A7282]">Manage the clinics and hospitals where you practise</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && <span className="flex items-center gap-1 text-xs text-[#16A34A]"><Check className="w-3.5 h-3.5" /> Saved</span>}
          {error && <span className="text-xs text-[#DC2626]">{error}</span>}
          {!showForm && (
            <button onClick={() => { setEditingId(null); setForm(EMPTY_FORM); setShowForm(true); }} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
              <Plus className="w-4 h-4" /> Add Location
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <LocationForm form={form} setForm={setForm} editingId={editingId} onSave={() => saveMutation.mutate()} onCancel={resetForm} isSaving={saveMutation.isPending} />
      )}

      {locations.length === 0 && !showForm ? (
        <div className="text-center py-10">
          <MapPin className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
          <p className="text-sm text-[#6A7282]">No practice locations added yet</p>
          <p className="text-xs text-[#9CA3AF] mt-1">Click &quot;Add Location&quot; to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((loc) => (
            <LocationCard key={loc.id} location={loc} onEdit={() => handleEdit(loc)} onDelete={() => deleteMutation.mutate(loc.id)} onSetPrimary={() => primaryMutation.mutate(loc.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
