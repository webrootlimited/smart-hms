"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Upload,
  Info,
  Mail,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES, DEPARTMENTS } from "./mockData";

const STEPS = ["Quick Setup", "Auto Permissions", "Email Invitation"];

const HOSPITALS = [
  "Main Hospital",
  "Downtown Clinic",
  "West Wing Medical Center",
  "East Side Clinic",
  "North Campus Hospital",
];

export default function AddNewUser() {
  const [currentStep, setCurrentStep] = useState(0);
  const [sendInvite, setSendInvite] = useState(true);

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/user-management"
        className="inline-flex items-center gap-1.5 text-sm text-[#6A7282] hover:text-[#101828] transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to User List
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#101828]">Add New User</h1>
            <p className="text-sm text-[#6A7282] mt-1">
              Create a new user account and set up their access permissions
            </p>
          </div>
          <div className="hidden sm:block w-24 h-24 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
            <img
              src="/admin/add-user-illustration.png"
              alt=""
              className="w-24 h-24 object-contain rounded-2xl"
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
                  {i < currentStep ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    i + 1
                  )}
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

      {/* Form sections */}
      <div className="space-y-5">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#101828] mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                placeholder="email@hospital.com"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                User Role
              </label>
              <Select>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Password
              </label>
              <input
                type="password"
                placeholder="Create password"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Profile Picture
              </label>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-[#6A7282]" />
                </div>
                <button
                  type="button"
                  className="px-3 py-2 text-sm border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer text-[#4A5565] font-medium"
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Department & Location */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#101828] mb-4">
            Department & Location
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Department
              </label>
              <Select>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#334155] mb-1.5">
                Hospital / Location
              </label>
              <Select>
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {HOSPITALS.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2.5 p-3 bg-[#EFF6FF] rounded-xl">
            <Info className="w-4 h-4 text-[#0284C7] mt-0.5 shrink-0" />
            <p className="text-xs text-[#0284C7]">
              Permissions will be auto-assigned based on the selected role and
              department. You can customize them in the next step.
            </p>
          </div>
        </div>

        {/* Permissions & Access */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#101828] mb-4">
            Permissions & Access
          </h2>
          <div className="flex items-center justify-center py-8 text-sm text-[#6A7282] bg-gray-50 rounded-xl">
            Select a role above to view and customize permissions
          </div>
        </div>

        {/* Send Email Invitation */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                <Mail className="w-4 h-4 text-[#0284C7]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101828]">
                  Send Email Invitation
                </h3>
                <p className="text-xs text-[#6A7282]">
                  Send a welcome email with login credentials to the new user
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSendInvite(!sendInvite)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                sendInvite ? "bg-[#0284C7]" : "bg-gray-200"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  sendInvite ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3 pb-4">
        <Link
          href="/admin/user-management"
          className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition text-[#4A5565]"
        >
          Cancel
        </Link>
        <button className="px-5 py-2.5 text-sm font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer text-[#4A5565]">
          Save as Draft
        </button>
        <button className="px-5 py-2.5 text-sm font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          Create User Account
        </button>
      </div>
    </div>
  );
}
