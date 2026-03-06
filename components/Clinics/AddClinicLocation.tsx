"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Building2,
  Clock,
  LayoutGrid,
  Users,
  MapPin,
  Phone,
  Mail,
  AlertCircle,
  Globe,
  MousePointerClick,
  CheckCircle2,
  ChevronLeft,
  Copy,
  Eye,
} from "lucide-react";

const STEPS = ["Basic Details", "Operating Hours", "Facilities & Services", "Assign Doctors"];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const FACILITIES = [
  "Parking",
  "Wheelchair Access",
  "Pharmacy",
  "Laboratory",
  "Waiting Area",
  "Emergency Services",
];

const SERVICES = [
  "General Consultation",
  "Pediatrics",
  "Cardiology",
  "Diagnostics",
  "Surgery",
  "Physiotherapy",
];

const DOCTORS = [
  { name: "Dr. Sarah Johnson", specialty: "Cardiology", years: 15, color: "bg-[#0284C7]", avatar: "SJ" },
  { name: "Dr. Robert Martinez", specialty: "Pediatrics", years: 10, color: "bg-[#16A34A]", avatar: "RM" },
  { name: "Dr. Emily Chen", specialty: "General Medicine", years: 8, color: "bg-[#7C3AED]", avatar: "EC" },
  { name: "Dr. Michael Brown", specialty: "Orthopedics", years: 12, color: "bg-[#EA580C]", avatar: "MB" },
];

export default function AddClinicLocation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Step 1 state
  const [clinicStatus, setClinicStatus] = useState<"Active" | "Inactive">("Active");

  // Step 2 state
  const [dayToggles, setDayToggles] = useState<Record<string, boolean>>({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: false,
  });

  // Step 3 state
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(["Waiting Area"]);
  const [selectedServices, setSelectedServices] = useState<string[]>(["Pediatrics"]);

  // Step 4 state
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);

  const toggleDay = (day: string) =>
    setDayToggles((prev) => ({ ...prev, [day]: !prev[day] }));

  const toggleFacility = (f: string) =>
    setSelectedFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const toggleDoctor = (name: string) =>
    setSelectedDoctors((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );

  const next = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
    else setCompleted(true);
  };
  const back = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  if (completed) {
    return <SuccessPage onBack={() => { setCompleted(false); setCurrentStep(0); }} />;
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/clinic-settings" className="p-2 hover:bg-gray-50 rounded-lg transition">
            <ArrowLeft className="w-4 h-4 text-[#6A7282]" />
          </Link>
          <h1 className="text-base font-bold text-[#101828]">Add New Clinic Location</h1>
        </div>
        <Link href="/clinic-settings" className="p-2 hover:bg-gray-50 rounded-lg transition">
          <X className="w-4 h-4 text-[#6A7282]" />
        </Link>
      </div>

      {/* Stepper */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
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
                  className={`text-xs font-medium whitespace-nowrap ${
                    i <= currentStep ? "text-[#101828]" : "text-[#6A7282]"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${i < currentStep ? "bg-[#16A34A]" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      {currentStep === 0 && (
        <StepBasicDetails clinicStatus={clinicStatus} setClinicStatus={setClinicStatus} />
      )}
      {currentStep === 1 && (
        <StepOperatingHours dayToggles={dayToggles} toggleDay={toggleDay} />
      )}
      {currentStep === 2 && (
        <StepFacilitiesServices
          selectedFacilities={selectedFacilities}
          toggleFacility={toggleFacility}
          selectedServices={selectedServices}
          toggleService={toggleService}
        />
      )}
      {currentStep === 3 && (
        <StepAssignDoctors selectedDoctors={selectedDoctors} toggleDoctor={toggleDoctor} />
      )}

      {/* Footer */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <button
          onClick={back}
          disabled={currentStep === 0}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={next}
          className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition cursor-pointer ${
            currentStep === STEPS.length - 1
              ? "bg-linear-to-r from-[#16A34A] to-[#0284C7]"
              : "bg-[#0284C7]"
          }`}
        >
          {currentStep === STEPS.length - 1 ? (
            <>
              <CheckCircle2 className="w-4 h-4" /> Save & Activate Clinic
            </>
          ) : (
            <>
              Save & Continue <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─── Step 1: Basic Details ─── */

const inputCls =
  "w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]";
const labelCls = "block text-xs font-semibold text-[#334155] mb-1";

function StepBasicDetails({
  clinicStatus,
  setClinicStatus,
}: {
  clinicStatus: "Active" | "Inactive";
  setClinicStatus: (s: "Active" | "Inactive") => void;
}) {
  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#0284C7]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#101828]">Basic Clinic Information</h2>
            <p className="text-xs text-[#6A7282]">Enter clinic details and location</p>
          </div>
        </div>
      </div>

      {/* Clinic Information */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Clinic Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Clinic Name *</label>
            <input type="text" placeholder="e.g., City Medical Center" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Clinic Code (Auto-generated)</label>
            <input type="text" defaultValue="CLN-98307" readOnly className={inputCls + " bg-gray-50"} />
          </div>
          <div>
            <label className={labelCls}>Clinic Type *</label>
            <input type="text" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <div className="flex gap-2 mt-0.5">
              {(["Active", "Inactive"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setClinicStatus(s)}
                  className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-xl transition cursor-pointer ${
                    clinicStatus === s
                      ? s === "Active"
                        ? "bg-[#16A34A] text-white"
                        : "bg-[#EF4444] text-white"
                      : "bg-gray-100 text-[#6A7282] hover:bg-gray-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Phone className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Contact Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelCls}>Phone Number *</label>
            <input type="tel" placeholder="+44 000 0000000" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email *</label>
            <input type="email" placeholder="info@clinic.com" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Emergency Contact</label>
            <input type="tel" placeholder="+44 000 0000000" className={inputCls} />
          </div>
        </div>
      </div>

      {/* Address Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Address Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Country</label>
            <input type="text" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>City *</label>
            <input type="text" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Area *</label>
            <input type="text" placeholder="e.g., Gulberg III, DHA Phase 5" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Postal Code</label>
            <input type="text" placeholder="54000" className={inputCls} />
          </div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>Full Address *</label>
          <textarea
            rows={2}
            placeholder="Enter complete address with street, building, landmarks..."
            className={inputCls + " resize-none"}
          />
        </div>
      </div>

      {/* Map Location */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#0284C7]" />
            <h3 className="text-sm font-bold text-[#101828]">Map Location (Optional)</h3>
          </div>
          <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
            <Globe className="w-3.5 h-3.5" /> Use Current Location
          </button>
        </div>

        <div className="bg-[#EFF6FF] rounded-xl p-10 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#0284C7]/20">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
            <MapPin className="w-6 h-6 text-[#0284C7]" />
          </div>
          <p className="text-sm font-semibold text-[#101828]">Interactive Map</p>
          <p className="text-xs text-[#6A7282] mt-1">Drag pin to set exact location</p>
          <button className="mt-3 flex items-center gap-1 text-xs font-medium text-[#0284C7] cursor-pointer">
            <MousePointerClick className="w-3.5 h-3.5" /> Click to place location
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className={labelCls}>Latitude (Auto-filled)</label>
            <input type="text" defaultValue="33.5094" className={inputCls + " bg-gray-50"} readOnly />
          </div>
          <div>
            <label className={labelCls}>Longitude (Auto-filled)</label>
            <input type="text" defaultValue="74.3587" className={inputCls + " bg-gray-50"} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Operating Hours ─── */

function StepOperatingHours({
  dayToggles,
  toggleDay,
}: {
  dayToggles: Record<string, boolean>;
  toggleDay: (day: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] flex items-center justify-center">
            <Clock className="w-5 h-5 text-[#16A34A]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#101828]">Clinic Operating Hours</h2>
            <p className="text-xs text-[#6A7282]">Define day-wise availability for patients</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Weekly Schedule</h3>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[140px_60px_1fr_1fr_80px] gap-3 mb-3 px-1">
          <span className="text-xs font-semibold text-[#6A7282]">Day</span>
          <span className="text-xs font-semibold text-[#6A7282]">Open</span>
          <span className="text-xs font-semibold text-[#6A7282]">From</span>
          <span className="text-xs font-semibold text-[#6A7282]">To</span>
          <span className="text-xs font-semibold text-[#6A7282]">Actions</span>
        </div>

        <div className="space-y-3">
          {DAYS.map((day) => (
            <div key={day} className="grid grid-cols-[140px_60px_1fr_1fr_80px] gap-3 items-center">
              <span className="text-sm font-medium text-[#101828]">{day}</span>

              {/* Toggle */}
              <button
                onClick={() => toggleDay(day)}
                className={`w-11 h-6 rounded-full relative transition cursor-pointer ${
                  dayToggles[day] ? "bg-[#16A34A]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                    dayToggles[day] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>

              <input
                type="text"
                defaultValue="9:00 am"
                disabled={!dayToggles[day]}
                className={`px-3 py-2 text-sm border border-gray-200 rounded-xl ${!dayToggles[day] ? "bg-gray-100 text-gray-400" : ""}`}
              />
              <input
                type="text"
                defaultValue="1:00 pm"
                disabled={!dayToggles[day]}
                className={`px-3 py-2 text-sm border border-gray-200 rounded-xl ${!dayToggles[day] ? "bg-gray-100 text-gray-400" : ""}`}
              />

              <button className="text-xs font-medium text-[#0284C7] hover:underline cursor-pointer whitespace-nowrap">
                Copy to All
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 bg-[#EFF6FF] rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
          <p className="text-xs text-[#4A5565]">
            Use &quot;Copy to All&quot; to quickly apply the same hours across all days. You can customize individual days afterwards.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 3: Facilities & Services ─── */

function StepFacilitiesServices({
  selectedFacilities,
  toggleFacility,
  selectedServices,
  toggleService,
}: {
  selectedFacilities: string[];
  toggleFacility: (f: string) => void;
  selectedServices: string[];
  toggleService: (s: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#FAF5FF] flex items-center justify-center">
            <LayoutGrid className="w-5 h-5 text-[#7C3AED]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#101828]">Facilities & Services</h2>
            <p className="text-xs text-[#6A7282]">Select patient-facing information</p>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Facilities Available</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {FACILITIES.map((f) => {
            const selected = selectedFacilities.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleFacility(f)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  selected
                    ? "border-[#16A34A] bg-[#F0FDF4]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm font-medium text-[#101828]">{f}</span>
                {selected && (
                  <span className="flex items-center gap-1 text-xs text-[#16A34A] font-medium mt-1">
                    <Check className="w-3 h-3" /> Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-4 h-4 text-[#7C3AED]" />
          <h3 className="text-sm font-bold text-[#101828]">Medical Services Offered</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {SERVICES.map((s) => {
            const selected = selectedServices.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleService(s)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                  selected
                    ? "border-[#16A34A] bg-[#F0FDF4]"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-sm font-medium text-[#101828]">{s}</span>
                {selected && (
                  <span className="flex items-center gap-1 text-xs text-[#16A34A] font-medium mt-1">
                    <Check className="w-3 h-3" /> Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selection summary */}
      <div className="bg-linear-to-r from-[#EFF6FF] to-[#FAF5FF] rounded-2xl border border-[#0284C7]/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#101828]">Selection Summary</p>
          <p className="text-xs text-[#6A7282]">
            {selectedFacilities.length} facilities, {selectedServices.length} services selected
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-semibold bg-[#EFF6FF] text-[#0284C7] rounded-full">
            {selectedFacilities.length} Facilities
          </span>
          <span className="px-3 py-1 text-xs font-semibold bg-[#FAF5FF] text-[#7C3AED] rounded-full">
            {selectedServices.length} Services
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 4: Assign Doctors ─── */

function StepAssignDoctors({
  selectedDoctors,
  toggleDoctor,
}: {
  selectedDoctors: string[];
  toggleDoctor: (name: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <Users className="w-5 h-5 text-[#0284C7]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#101828]">Assign Doctors to Clinic</h2>
            <p className="text-xs text-[#6A7282]">Link doctors to physical location</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Available Doctors</h3>
        </div>

        <div className="space-y-3">
          {DOCTORS.map((doc) => {
            const selected = selectedDoctors.includes(doc.name);
            return (
              <button
                key={doc.name}
                onClick={() => toggleDoctor(doc.name)}
                className={`w-full text-left p-4 rounded-xl border-2 transition cursor-pointer ${
                  selected
                    ? "border-[#16A34A] bg-[#F0FDF4]/50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full ${doc.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {doc.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#101828]">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="px-2 py-0.5 text-xs font-medium bg-[#EFF6FF] text-[#0284C7] rounded-full">
                        {doc.specialty}
                      </span>
                      <span className="text-xs text-[#6A7282]">{doc.years} years</span>
                    </div>
                  </div>
                  {selected && <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />}
                </div>
                {selected && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#6A7282]">Room Number</label>
                      <input
                        type="text"
                        placeholder="e.g., Room 201"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#6A7282]">Consultation Fee Override (Optional)</label>
                      <input
                        type="text"
                        placeholder="PKR 3000"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                      />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Doctors assigned summary */}
      <div className="bg-linear-to-r from-[#F0FDF4] to-[#EFF6FF] rounded-2xl border border-[#16A34A]/10 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#101828]">Doctors Assigned</p>
          <p className="text-xs text-[#6A7282]">
            {selectedDoctors.length} of {DOCTORS.length} doctors selected
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-semibold bg-[#F0FDF4] text-[#16A34A] rounded-full">
          {selectedDoctors.length} Assigned
        </span>
      </div>
    </div>
  );
}

/* ─── Success Page ─── */

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="space-y-6">
      {/* Success banner */}
      <div className="bg-white rounded-2xl border border-gray-100 p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-[#16A34A]" />
        </div>
        <h2 className="text-lg font-bold text-[#101828]">Clinic Added Successfully!</h2>
        <p className="text-sm text-[#6A7282] mt-1">
          is now live and available for appointments
        </p>
        <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-[#EFF6FF] text-[#0284C7] rounded-lg">
          Clinic Code: CLN-98307
        </span>
      </div>

      {/* Clinic Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h3 className="text-base font-bold text-[#101828] mb-4">Clinic Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#EFF6FF]/50 border border-[#0284C7]/10">
            <p className="text-xs font-semibold text-[#0284C7] mb-2">Basic Information</p>
            <div className="space-y-1.5 text-xs text-[#4A5565]">
              <p>Clinic Name: <span className="font-medium text-[#101828]">Not specified</span></p>
              <p>Type: <span className="font-medium text-[#101828]">Hospital</span></p>
              <p>Status: <span className="font-medium text-[#16A34A]">Active</span></p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#F0FDF4]/50 border border-[#16A34A]/10">
            <p className="text-xs font-semibold text-[#16A34A] mb-2">Location</p>
            <div className="space-y-1.5 text-xs text-[#4A5565]">
              <p>City: <span className="font-medium text-[#101828]">Lahore</span></p>
              <p>Area: <span className="font-medium text-[#101828]">Not specified</span></p>
              <p>Coordinates: <span className="font-medium text-[#101828]">33.5094, 74.3587</span></p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FFF7ED]/50 border border-[#EA580C]/10">
            <p className="text-xs font-semibold text-[#EA580C] mb-2">Contact Details</p>
            <div className="space-y-1.5 text-xs text-[#4A5565]">
              <p>Phone: <span className="font-medium text-[#101828]">Not provided</span></p>
              <p>Email: <span className="font-medium text-[#101828]">Not provided</span></p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF5FF]/50 border border-[#7C3AED]/10">
            <p className="text-xs font-semibold text-[#7C3AED] mb-2">Configuration</p>
            <div className="space-y-1.5 text-xs text-[#4A5565]">
              <p>Facilities: <span className="font-medium text-[#101828]">1 facility</span></p>
              <p>Services: <span className="font-medium text-[#101828]">1 service</span></p>
              <p>Doctors: <span className="font-medium text-[#101828]">0 assigned</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#101828]">Operating Hours</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day, i) => (
            <span
              key={day}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                i < 5
                  ? "bg-[#F0FDF4] text-[#16A34A]"
                  : i === 5
                    ? "bg-[#EFF6FF] text-[#0284C7]"
                    : "bg-[#FEF2F2] text-[#EF4444]"
              }`}
            >
              {day}: {i < 6 ? "09:00 - 13:00" : "Closed"}
            </span>
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-center gap-3">
        <Link
          href="/clinic-settings"
          className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Clinic List
        </Link>
        <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#16A34A] rounded-xl hover:opacity-90 transition cursor-pointer">
          <Eye className="w-4 h-4" /> View Clinic
        </button>
      </div>
    </div>
  );
}
