"use client";

import { useState } from "react";
import {
  Stethoscope,
  FileText,
  Clock,
  PoundSterling,
  ArrowRight,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import FormField from "./FormField";

const SPECIALIZATIONS = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Practice",
  "Neurology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Radiology",
  "Surgery",
  "Urology",
];

export default function SignUpDoctorStep({
  onSubmit,
  loading,
}: {
  onSubmit: (data: {
    specialization: string;
    licenseNumber: string;
    experienceYears: number;
    consultationFee: number;
    bio: string;
  }) => void;
  loading?: boolean;
}) {
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [bio, setBio] = useState("");
  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);

  const canSubmit =
    specialization && licenseNumber && consultationFee && !loading;

  return (
    <div className="space-y-4">
      {/* Specialization */}
      <div>
        <label className="block text-sm font-semibold text-[#334155] mb-1.5">
          Specialization *
        </label>
        <div className="relative">
          <Stethoscope className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#0A4B85] focus:ring-2 focus:ring-[#0A4B85]/10 transition-all appearance-none cursor-pointer"
          >
            <option value="">Select Specialization</option>
            {SPECIALIZATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* License Number */}
      <FormField
        label="Medical License Number *"
        icon={FileText}
        placeholder="e.g. GMC 1234567"
        value={licenseNumber}
        onChange={setLicenseNumber}
      />

      {/* Experience & Fee row */}
      <div className="grid grid-cols-2 gap-3">
        <FormField
          label="Experience (years)"
          icon={Clock}
          placeholder="e.g. 5"
          type="number"
          value={experienceYears}
          onChange={setExperienceYears}
        />
        <FormField
          label="Consultation Fee (£) *"
          icon={PoundSterling}
          placeholder="e.g. 50"
          type="number"
          value={consultationFee}
          onChange={setConsultationFee}
        />
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-semibold text-[#334155] mb-1.5">
          Short Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell us about your experience and expertise..."
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#0A4B85] focus:ring-2 focus:ring-[#0A4B85]/10 transition-all resize-none"
        />
      </div>

      {/* Supporting Documents */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-[#334155]">
          Supporting Documents
        </label>

        {/* Medical License */}
        <div>
          <p className="text-xs text-[#6A7282] mb-1.5">
            Medical License (PDF, JPG, PNG)
          </p>
          {licenseFile ? (
            <div className="flex items-center justify-between px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm">
              <span className="text-[#334155] truncate">{licenseFile.name}</span>
              <button
                type="button"
                onClick={() => setLicenseFile(null)}
                className="text-gray-400 hover:text-red-500 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-sm text-[#6A7282] hover:border-[#0A4B85] hover:text-[#0A4B85] transition cursor-pointer">
              <Upload className="w-4 h-4" />
              Upload medical license
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) setLicenseFile(e.target.files[0]);
                }}
              />
            </label>
          )}
        </div>

        {/* Certificates */}
        <div>
          <p className="text-xs text-[#6A7282] mb-1.5">
            Certificates / Qualifications (multiple files)
          </p>
          {certificates.length > 0 && (
            <div className="space-y-1.5 mb-2">
              {certificates.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm"
                >
                  <span className="text-[#334155] truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setCertificates((prev) => prev.filter((_, idx) => idx !== i))
                    }
                    className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-sm text-[#6A7282] hover:border-[#0A4B85] hover:text-[#0A4B85] transition cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload certificates
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files) {
                  setCertificates((prev) => [...prev, ...Array.from(e.target.files!)]);
                }
              }}
            />
          </label>
        </div>
      </div>

      <button
        onClick={() =>
          onSubmit({
            specialization,
            licenseNumber,
            experienceYears: Number(experienceYears) || 0,
            consultationFee: Number(consultationFee),
            bio,
          })
        }
        disabled={!canSubmit}
        className="w-full py-2.5 bg-[#0284C7] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer text-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          <>
            Submit Application <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
