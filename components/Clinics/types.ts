export type ClinicStatus = "Active" | "Urgent Care" | "Specialty";

export interface Clinic {
  id: string;
  name: string;
  status: ClinicStatus;
  statusColor: string;
  statusBg: string;
  rating: number;
  address: string;
  phone: string;
  email: string;
  weekdayHours: string;
  weekendHours: string;
  staff: number;
  providers: number;
  patients: number;
  occupancy: number;
  services: { label: string; color: string; bg: string }[];
  accentFrom: string;
  accentTo: string;
}
