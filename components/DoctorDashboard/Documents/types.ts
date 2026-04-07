export interface DocumentRecord {
  id: string;
  record_type: "CONSULTATION" | "LAB_REPORT" | "XRAY" | "FILE";
  description: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: string | null;
  createdAt: string;
  patient: {
    id: string;
    first_name: string;
    last_name: string;
  };
  appointment: {
    id: string;
    scheduled_at: string;
    reason: string | null;
  } | null;
}

export interface DocStats {
  all: number;
  consultations: number;
  labReports: number;
  xrays: number;
  files: number;
}

export interface PatientOption {
  id: string;
  name: string;
  initials: string;
}

export interface AppointmentOption {
  id: string;
  scheduled_at: string;
  reason: string | null;
  appointment_type: string;
  status: string;
}
