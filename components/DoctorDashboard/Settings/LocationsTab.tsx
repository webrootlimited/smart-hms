"use client";

import { useState, useEffect, useCallback } from "react";
import { MapPin, Building2, Phone, Plus, Trash2, Star, Loader2, Check, X } from "lucide-react";
import { authHeaders } from "./DoctorSettingsMain";
import instance from "@/utils/instance";

interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

interface Location {
  id: string;
  clinic_id: string;
  name: string;
  address: Address;
  phone: string;
  is_primary: boolean;
  status: string;
}

const EMPTY_FORM = { name: "", line1: "", line2: "", city: "", postcode: "", phone: "" };

export default function LocationsTab() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    try {
      const headers = await authHeaders();
      const res = await instance.get("/api/doctor/locations", { headers });
      setLocations(res.data.locations);
    } catch {
      console.error("Failed to fetch locations");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (loc: Location) => {
    setForm({
      name: loc.name,
      line1: loc.address?.line1 || "",
      line2: loc.address?.line2 || "",
      city: loc.address?.city || "",
      postcode: loc.address?.postcode || "",
      phone: loc.phone,
    });
    setEditingId(loc.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const headers = await authHeaders();
      const payload = {
        name: form.name,
        address: { line1: form.line1, line2: form.line2, city: form.city, postcode: form.postcode },
        phone: form.phone,
      };

      if (editingId) {
        await instance.put(`/api/doctor/locations/${editingId}`, payload, { headers });
      } else {
        await instance.post("/api/doctor/locations", payload, { headers });
      }

      setSaved(true);
      resetForm();
      await fetchLocations();
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Failed to save location");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const headers = await authHeaders();
      await instance.delete(`/api/doctor/locations/${id}`, { headers });
      await fetchLocations();
    } catch {
      setError("Failed to delete location");
    }
  };

  const handleSetPrimary = async (id: string) => {
    try {
      const headers = await authHeaders();
      await instance.patch(`/api/doctor/locations/${id}/primary`, {}, { headers });
      await fetchLocations();
    } catch {
      setError("Failed to set primary location");
    }
  };

  const formatAddress = (addr: Address) => {
    return [addr?.line1, addr?.line2, addr?.city, addr?.postcode].filter(Boolean).join(", ");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-7 h-7 border-3 border-[#0284C7] border-t-transparent rounded-full animate-spin" />
      </div>
    );
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
            <button
              onClick={() => { setEditingId(null); setForm(EMPTY_FORM); setShowForm(true); }}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Location
            </button>
          )}
        </div>
      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="p-5 bg-gray-50 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#101828]">{editingId ? "Edit Location" : "New Location"}</p>
            <button onClick={resetForm} className="p-1 hover:bg-gray-200 rounded-lg transition cursor-pointer">
              <X className="w-4 h-4 text-[#6A7282]" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Location Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. City Hospital — Cardiology Wing"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+44 7700 900000"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Address Line 1</label>
              <input
                type="text"
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
                placeholder="Street address"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Address Line 2</label>
              <input
                type="text"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
                placeholder="Building, floor, suite (optional)"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="City"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">Postcode</label>
              <input
                type="text"
                value={form.postcode}
                onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                placeholder="Postcode"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving || !form.name}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingId ? "Update Location" : "Add Location"}
            </button>
          </div>
        </div>
      )}

      {/* Locations list */}
      {locations.length === 0 && !showForm ? (
        <div className="text-center py-10">
          <MapPin className="w-8 h-8 text-[#D1D5DB] mx-auto mb-2" />
          <p className="text-sm text-[#6A7282]">No practice locations added yet</p>
          <p className="text-xs text-[#9CA3AF] mt-1">Click &quot;Add Location&quot; to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((loc) => (
            <div key={loc.id} className="p-4 bg-gray-50 rounded-2xl">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0284C7]" />
                  <p className="text-sm font-bold text-[#101828]">{loc.name}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  {loc.is_primary && (
                    <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#F0F9FF] text-[#0284C7] rounded-full">Primary</span>
                  )}
                  {!loc.is_primary && (
                    <button
                      onClick={() => handleSetPrimary(loc.id)}
                      title="Set as primary"
                      className="p-1.5 hover:bg-gray-200 rounded-lg transition cursor-pointer"
                    >
                      <Star className="w-3.5 h-3.5 text-[#6A7282]" />
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(loc)}
                    className="px-2 py-1 text-[11px] font-semibold text-[#0284C7] hover:bg-[#F0F9FF] rounded-lg transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(loc.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[#DC2626]" />
                  </button>
                </div>
              </div>
              <div className="space-y-1.5 ml-6">
                {formatAddress(loc.address) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#6A7282]" />
                    <span className="text-xs text-[#4A5565]">{formatAddress(loc.address)}</span>
                  </div>
                )}
                {loc.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#6A7282]" />
                    <span className="text-xs text-[#4A5565]">{loc.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
