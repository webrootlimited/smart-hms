"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Clipboard,
  FileText,
  ShieldCheck,
  CreditCard,
  Plus,
  X,
  GripVertical,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STEPS = ["Quick Setup", "Auto-Validation", "Instant Booking"];

const VISIT_TYPES = [
  { id: "in-clinic", label: "In-Clinic", desc: "Physical visit at hospital", color: "border-[#0284C7] bg-[#EFF6FF]", dot: "bg-[#0284C7]" },
  { id: "telehealth", label: "Telehealth", desc: "Virtual video consultation", color: "border-[#16A34A] bg-[#F0FDF4]", dot: "bg-[#16A34A]" },
  { id: "both", label: "Both Options", desc: "Patient can choose either", color: "border-[#7C3AED] bg-[#FAF5FF]", dot: "bg-[#7C3AED]" },
];

const PROVIDERS = [
  { name: "Dr. Sarah Johnson", dept: "Cardiology", color: "bg-[#0284C7]" },
  { name: "Dr. Michael Chen", dept: "Neurology", color: "bg-[#EF4444]" },
  { name: "Dr. Emily Roberts", dept: "Pediatrics", color: "bg-[#16A34A]" },
  { name: "Dr. James Williams", dept: "Orthopedics", color: "bg-[#EA580C]" },
  { name: "Dr. Lisa Anderson", dept: "Dermatology", color: "bg-[#7C3AED]" },
];

const DOCUMENT_TABS = [
  { id: "insurance", label: "Insurance Card", icon: ShieldCheck },
  { id: "id", label: "ID Verification", icon: CreditCard },
];

const PRE_VISIT_FORMS = [
  "Medical History",
  "Consent Form",
  "Privacy Agreement",
  "Allergy Information",
  "Current Medications",
  "Emergency Contact",
];

export default function AddAppointmentType() {
  const [currentStep, setCurrentStep] = useState(0);
  const [visitType, setVisitType] = useState("in-clinic");
  const [selectedForms, setSelectedForms] = useState<string[]>(["Medical History"]);
  const [selectedProvider, setSelectedProvider] = useState("Dr. Sarah Johnson");
  const [docRequirement, setDocRequirement] = useState("");

  const toggleForm = (form: string) => {
    setSelectedForms((prev) =>
      prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form]
    );
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/appointments"
        className="inline-flex items-center gap-1.5 text-sm text-[#6A7282] hover:text-[#101828] transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Appointment Types
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <Clipboard className="w-6 h-6 text-[#0284C7]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#101828]">
                Add Appointment Type
              </h1>
              <p className="text-sm text-[#6A7282]">
                Configure a new visit type patients can book
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <img
              src="/admin/add-appointment-illustration.png"
              alt=""
              className="w-24 h-24 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-2 mt-6">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < currentStep
                      ? "bg-[#16A34A] text-white"
                      : i === currentStep
                      ? "bg-[#0284C7] text-white"
                      : "bg-gray-100 text-[#6A7282]"
                  }`}
                >
                  {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span
                  className={`text-sm font-medium ${
                    i === currentStep ? "text-[#101828]" : "text-[#6A7282]"
                  }`}
                >
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-12 h-px bg-gray-200 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-base font-bold text-[#101828]">
                Basic Information
              </h2>
            </div>
            <p className="text-xs text-[#6A7282] mb-4">
              Define the appointment type details
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Type Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. General Checkup"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Description
                </label>
                <textarea
                  placeholder="Brief description of this appointment type"
                  rows={3}
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Duration
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-24 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                  />
                  <span className="text-sm text-[#6A7282]">minutes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Type */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded bg-[#EFF6FF] flex items-center justify-center">
                <Clipboard className="w-3 h-3 text-[#0284C7]" />
              </div>
              <h2 className="text-base font-bold text-[#101828]">Visit Type</h2>
            </div>
            <p className="text-xs text-[#6A7282] mb-4">
              How will the appointment be conducted?
            </p>
            <div className="space-y-2.5">
              {VISIT_TYPES.map((vt) => (
                <button
                  key={vt.id}
                  onClick={() => setVisitType(vt.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition cursor-pointer text-left ${
                    visitType === vt.id
                      ? vt.color
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      visitType === vt.id
                        ? `border-current`
                        : "border-gray-300"
                    }`}
                  >
                    {visitType === vt.id && (
                      <div className={`w-2 h-2 rounded-full ${vt.dot}`} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#101828]">
                      {vt.label}
                    </p>
                    <p className="text-xs text-[#6A7282]">{vt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Provider Eligibility */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#101828] mb-1">
              Provider Eligibility
            </h2>
            <p className="text-xs text-[#6A7282] mb-4">
              Select a provider who can perform this appointment
            </p>
            <div className="space-y-2">
              {PROVIDERS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedProvider(p.name)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition cursor-pointer text-left ${
                    selectedProvider === p.name
                      ? "bg-[#EFF6FF] border border-[#0284C7]"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101828]">
                      {p.name}
                    </p>
                    <p className="text-xs text-[#6A7282]">{p.dept}</p>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedProvider === p.name
                        ? "border-[#0284C7]"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedProvider === p.name && (
                      <div className="w-2 h-2 rounded-full bg-[#0284C7]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-xs text-[#0284C7] mt-3 font-medium">
              1 provider selected
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Required Documents */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#101828] mb-1">
              Required Documents
            </h2>
            <p className="text-xs text-[#6A7282] mb-4">
              Pre-visit documents patients must upload
            </p>
            <div className="flex gap-2 mb-4">
              {DOCUMENT_TABS.map((tab) => (
                <div
                  key={tab.id}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#EFF6FF] text-[#0284C7] rounded-xl text-xs font-medium"
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Add document requirement..."
                value={docRequirement}
                onChange={(e) => setDocRequirement(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
              <button className="px-3 py-2 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition cursor-pointer flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>

          {/* Pre-Visit Forms */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#101828] mb-1">
              Pre-Visit Forms
            </h2>
            <p className="text-xs text-[#6A7282] mb-4">
              Forms patients must complete before appointment
            </p>
            <div className="space-y-2">
              {PRE_VISIT_FORMS.map((form) => {
                const isSelected = selectedForms.includes(form);
                return (
                  <button
                    key={form}
                    onClick={() => toggleForm(form)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition cursor-pointer text-left ${
                      isSelected
                        ? "border-[#0284C7] bg-[#EFF6FF]"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <GripVertical className="w-3.5 h-3.5 text-[#6A7282] shrink-0" />
                    <span
                      className={`text-sm font-medium ${
                        isSelected ? "text-[#0284C7]" : "text-[#4A5565]"
                      }`}
                    >
                      {form}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#0284C7] ml-auto" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[#EF4444] mt-3 font-medium">
              * 1 form required
            </p>
          </div>

          {/* Fee */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-base font-bold text-[#101828] mb-1">
              Fee (Optional)
            </h2>
            <p className="text-xs text-[#6A7282] mb-4">
              Set consultation fee for this appointment type
            </p>
            <div className="flex items-center gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Currency
                </label>
                <Select defaultValue="GBP">
                  <SelectTrigger className="w-32 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">£ GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Amount
                </label>
                <div className="flex items-center gap-0 border border-gray-200 rounded-xl overflow-hidden">
                  <span className="px-3 py-2 bg-gray-50 text-sm text-[#6A7282] border-r border-gray-200">
                    £
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-24 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pb-4">
        <Link
          href="/appointments"
          className="px-5 py-2.5 text-sm font-semibold text-[#4A5565] hover:text-[#101828] transition flex items-center gap-1.5"
        >
          <X className="w-4 h-4" /> Cancel
        </Link>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2.5 text-sm font-semibold border border-[#0284C7] text-[#0284C7] rounded-xl hover:bg-[#EFF6FF] transition cursor-pointer">
            Save as Draft
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer flex items-center gap-1.5">
            Create Appointment Type <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
