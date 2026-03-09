"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  User,
  Briefcase,
  Calendar,
  ShieldCheck,
  Upload,
  Building2,
  Clock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEPARTMENTS, SPECIALTIES } from "./mockData";
import RegistrationSummary from "./RegistrationSummary";

const STEPS = ["Personal Info", "Work Setup", "Credentials"];

const LOCATIONS = [
  { id: "main", label: "Main Hospital", desc: "123 Medical Center Dr" },
  { id: "north", label: "North Branch", desc: "456 North Ave" },
  { id: "south", label: "South Branch", desc: "" },
  { id: "telehealth", label: "Telehealth Only", desc: "" },
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AddNewProvider() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["main"]);
  const [lunchBreak, setLunchBreak] = useState(true);

  const toggleLocation = (id: string) => {
    setSelectedLocations((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/providers"
        className="inline-flex items-center gap-1.5 text-sm text-[#6A7282] hover:text-[#101828] transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Providers
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <User className="w-6 h-6 text-[#0284C7]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#101828]">
                Add New Provider
              </h1>
              <p className="text-sm text-[#6A7282]">
                Register a new healthcare provider to the system
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <img
              src="/admin/add-provider-illustration.png"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-base font-bold text-[#101828]">
                Personal Information
              </h2>
            </div>
            <p className="text-xs text-[#6A7282] mb-5">
              Basic details about the provider
            </p>

            {/* Profile Photo */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#334155] mb-2">
                Profile Photo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#6A7282]" />
                </div>
                <div>
                  <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-[#0284C7] text-[#0284C7] rounded-xl hover:bg-[#EFF6FF] transition cursor-pointer">
                    <Upload className="w-3.5 h-3.5" /> Upload Photo
                  </button>
                  <p className="text-xs text-[#6A7282] mt-1">
                    JPG, PNG or GIF. Max size 5MB
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  First Name *
                </label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Last Name *
                </label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john.doe@hospital.com"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Gender
                </label>
                <Select>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Work Setup */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-base font-bold text-[#101828]">Work Setup</h2>
            </div>
            <p className="text-xs text-[#6A7282] mb-5">
              Department, specialty, and location
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Department *
                </label>
                <Select>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Specialty *
                </label>
                <Select>
                  <SelectTrigger className="w-full rounded-xl">
                    <SelectValue placeholder="e.g. Cardiology" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Work Locations */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-[#334155] mb-2">
                Work Location *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => toggleLocation(loc.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition cursor-pointer text-left ${
                      selectedLocations.includes(loc.id)
                        ? "border-[#0284C7] bg-[#EFF6FF]"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <Building2 className={`w-4 h-4 shrink-0 ${
                      selectedLocations.includes(loc.id) ? "text-[#0284C7]" : "text-[#6A7282]"
                    }`} />
                    <div>
                      <p className="text-sm font-semibold text-[#101828]">
                        {loc.label}
                      </p>
                      {loc.desc && (
                        <p className="text-xs text-[#6A7282]">{loc.desc}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Employee ID
                </label>
                <input
                  type="text"
                  placeholder="EMP-12345"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                  Start Date *
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
            </div>
          </div>

          {/* Schedule Setup */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-base font-bold text-[#101828]">
                Schedule Setup
              </h2>
            </div>
            <p className="text-xs text-[#6A7282] mb-5">
              Weekly working hours and breaks
            </p>

            <div className="space-y-3">
              {DAYS.map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-24 text-sm font-medium text-[#101828]">
                    {day}
                  </span>
                  <input
                    type="time"
                    defaultValue={day === "Saturday" || day === "Sunday" ? "" : "09:00"}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                  />
                  <span className="text-xs text-[#6A7282]">to</span>
                  <input
                    type="time"
                    defaultValue={day === "Saturday" || day === "Sunday" ? "" : "17:00"}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                  />
                </div>
              ))}
            </div>

            {/* Lunch Break */}
            <div className="mt-5 flex items-center gap-3 p-3 bg-[#FFFBEB] border border-[#FEF3C7] rounded-xl">
              <button
                type="button"
                onClick={() => setLunchBreak(!lunchBreak)}
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                  lunchBreak ? "bg-[#0284C7]" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    lunchBreak ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <div>
                <p className="text-sm font-semibold text-[#101828]">
                  Lunch Break
                </p>
                <p className="text-xs text-[#6A7282]">1 hour break</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-5">
          <RegistrationSummary />
        </div>
      </div>
    </div>
  );
}
