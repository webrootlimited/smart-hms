"use client";

import { Building2, Phone, Loader2, X } from "lucide-react";

interface FormData {
  name: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  phone: string;
}

interface Props {
  form: FormData;
  setForm: (form: FormData) => void;
  editingId: string | null;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

export default function LocationForm({ form, setForm, editingId, onSave, onCancel, isSaving }: Props) {
  return (
    <div className="p-5 bg-gray-50 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-[#101828]">{editingId ? "Edit Location" : "New Location"}</p>
        <button onClick={onCancel} className="p-1 hover:bg-gray-200 rounded-lg transition cursor-pointer">
          <X className="w-4 h-4 text-[#6A7282]" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Location Name</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. City Hospital — Cardiology Wing" className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+44 7700 900000" className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Address Line 1</label>
          <input type="text" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} placeholder="Street address" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Address Line 2</label>
          <input type="text" value={form.line2} onChange={(e) => setForm({ ...form, line2: e.target.value })} placeholder="Building, floor, suite (optional)" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">City</label>
          <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="City" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#334155] mb-1.5">Postcode</label>
          <input type="text" value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} placeholder="Postcode" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
        </div>
      </div>
      <div className="flex justify-end">
        <button onClick={onSave} disabled={isSaving || !form.name} className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-60">
          {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
          {editingId ? "Update Location" : "Add Location"}
        </button>
      </div>
    </div>
  );
}
