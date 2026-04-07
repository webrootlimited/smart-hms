"use client";

import { useState, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  FileText,
  X,
  Search,
  Calendar,
  ChevronDown,
} from "lucide-react";
import instance from "@/utils/instance";
import getToken from "@/auth/getToken";
import type { PatientOption, AppointmentOption } from "./types";

const RECORD_TYPES = [
  { value: "CONSULTATION", label: "Consultation Note" },
  { value: "LAB_REPORT", label: "Lab Report" },
  { value: "XRAY", label: "Imaging / X-Ray" },
  { value: "FILE", label: "Other File" },
] as const;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function UploadDocumentDialog({ open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  const [selectedPatient, setSelectedPatient] = useState<PatientOption | null>(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentOption | null>(null);
  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [recordType, setRecordType] = useState<string>("LAB_REPORT");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Fetch patients for dropdown
  const { data: patientsData } = useQuery({
    queryKey: queryKeys.doctorPatients({ search: patientSearch, page: 1 }),
    queryFn: () =>
      apiFetch<{ success: boolean; patients: PatientOption[] }>("/api/doctor/patients", {
        search: patientSearch,
        page: "1",
      }),
    enabled: open,
  });

  // Fetch appointments for selected patient
  const { data: appointmentsData } = useQuery({
    queryKey: queryKeys.doctorPatientAppointments(selectedPatient?.id || ""),
    queryFn: () =>
      apiFetch<{ success: boolean; appointments: AppointmentOption[] }>(
        `/api/doctor/patients/${selectedPatient!.id}/appointments`
      ),
    enabled: !!selectedPatient,
  });

  const patients = patientsData?.patients ?? [];
  const appointments = appointmentsData?.appointments ?? [];

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file || !selectedPatient) throw new Error("Missing fields");
      const token = await getToken();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("patientId", selectedPatient.id);
      formData.append("record_type", recordType);
      if (selectedAppointment) formData.append("appointmentId", selectedAppointment.id);
      if (description) formData.append("description", description);

      const { data } = await instance.post("/api/doctor/documents", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor", "documents"] });
      resetForm();
      onOpenChange(false);
    },
  });

  function resetForm() {
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setPatientSearch("");
    setRecordType("LAB_REPORT");
    setDescription("");
    setFile(null);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold text-[#101828]">Upload Document</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Patient select */}
          <div>
            <label className="text-xs font-semibold text-[#101828] mb-1.5 block">Patient *</label>
            <div className="relative">
              <div
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white cursor-pointer"
                onClick={() => setShowPatientDropdown(!showPatientDropdown)}
              >
                {selectedPatient ? (
                  <span className="text-[#101828] font-medium">{selectedPatient.name}</span>
                ) : (
                  <span className="text-[#9CA3AF]">Select a patient</span>
                )}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF] ml-auto" />
              </div>

              {showPatientDropdown && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
                  <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9CA3AF]" />
                      <input
                        type="text"
                        placeholder="Search patients..."
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0284C7]"
                        autoFocus
                      />
                    </div>
                  </div>
                  {patients.length === 0 ? (
                    <p className="px-3 py-4 text-xs text-[#9CA3AF] text-center">No patients found</p>
                  ) : (
                    patients.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedPatient(p);
                          setSelectedAppointment(null);
                          setShowPatientDropdown(false);
                          setPatientSearch("");
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                      >
                        <div className="w-7 h-7 rounded-full bg-[#F0F9FF] flex items-center justify-center text-[10px] font-bold text-[#0284C7] shrink-0">
                          {p.initials}
                        </div>
                        <span className="text-[#101828] font-medium text-xs">{p.name}</span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Appointment select */}
          {selectedPatient && (
            <div>
              <label className="text-xs font-semibold text-[#101828] mb-1.5 block">
                Appointment <span className="text-[#9CA3AF] font-normal">(optional)</span>
              </label>
              <div className="relative">
                <div
                  className="flex items-center gap-2 w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white cursor-pointer"
                  onClick={() => setShowAppointmentDropdown(!showAppointmentDropdown)}
                >
                  {selectedAppointment ? (
                    <span className="text-[#101828] font-medium text-xs">
                      {formatDate(selectedAppointment.scheduled_at)} — {selectedAppointment.reason || selectedAppointment.appointment_type}
                    </span>
                  ) : (
                    <span className="text-[#9CA3AF] text-xs">Link to an appointment</span>
                  )}
                  <ChevronDown className="w-4 h-4 text-[#9CA3AF] ml-auto" />
                </div>

                {showAppointmentDropdown && (
                  <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    <button
                      onClick={() => {
                        setSelectedAppointment(null);
                        setShowAppointmentDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-[#9CA3AF] hover:bg-gray-50 cursor-pointer border-b border-gray-50"
                    >
                      None
                    </button>
                    {appointments.length === 0 ? (
                      <p className="px-3 py-4 text-xs text-[#9CA3AF] text-center">No appointments found</p>
                    ) : (
                      appointments.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => {
                            setSelectedAppointment(a);
                            setShowAppointmentDropdown(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3 h-3 text-[#0284C7] shrink-0" />
                            <span className="text-xs font-medium text-[#101828]">
                              {formatDate(a.scheduled_at)}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                              a.status === "COMPLETED" ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-[#F0F9FF] text-[#0284C7]"
                            }`}>
                              {a.status}
                            </span>
                          </div>
                          {a.reason && (
                            <p className="text-[10px] text-[#6A7282] mt-0.5 ml-5">{a.reason}</p>
                          )}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Document type */}
          <div>
            <label className="text-xs font-semibold text-[#101828] mb-1.5 block">Document Type *</label>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] cursor-pointer"
            >
              {RECORD_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold text-[#101828] mb-1.5 block">
              Description <span className="text-[#9CA3AF] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Complete blood count results"
              className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>

          {/* File upload */}
          <div>
            <label className="text-xs font-semibold text-[#101828] mb-1.5 block">File *</label>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            {file ? (
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-gray-50">
                <FileText className="w-5 h-5 text-[#0284C7] shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-[#101828] truncate">{file.name}</p>
                  <p className="text-[10px] text-[#6A7282]">
                    {(file.size / 1048576).toFixed(1)} MB
                  </p>
                </div>
                <button
                  onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                  className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-[#6A7282]" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileRef.current?.click()}
                className="w-full flex flex-col items-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#0284C7] hover:bg-[#F0F9FF]/50 transition cursor-pointer"
              >
                <Upload className="w-6 h-6 text-[#9CA3AF]" />
                <span className="text-xs text-[#6A7282]">Click to select a file</span>
                <span className="text-[10px] text-[#9CA3AF]">PDF, JPG, PNG, DOC up to 10MB</span>
              </button>
            )}
          </div>

          {uploadMutation.isError && (
            <p className="text-xs text-[#EF4444]">Upload failed. Please try again.</p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            onClick={() => { resetForm(); onOpenChange(false); }}
            className="px-4 py-2.5 text-sm font-semibold text-[#4A5565] bg-gray-100 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => uploadMutation.mutate()}
            disabled={!selectedPatient || !file || uploadMutation.isPending}
            className="px-4 py-2.5 text-sm font-semibold text-white bg-[#0284C7] rounded-xl hover:opacity-90 transition cursor-pointer disabled:opacity-50"
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
