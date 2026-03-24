export type AppointmentMode = "In-Person" | "Telehealth" | "Both";
export type AppointmentStatus = "Active" | "Inactive";

export type AppointmentType = {
  id: string;
  name: string;
  description: string;
  duration: number;
  mode: AppointmentMode;
  status: AppointmentStatus;
  fee: number;
  icon: string;
  color: string;
  bg: string;
};

/* ── Admin Appointments (real data) ── */

export interface AdminAppointment {
  id: string;
  doctor: { id: string; name: string; photo_url: string | null; department: string } | null;
  patient: { id: string; name: string; photo_url: string | null; phone: string } | null;
  clinic: { id: string; name: string } | null;
  appointment_type: "ONLINE" | "PHYSICAL";
  scheduled_at: string;
  duration: number;
  status: string;
  reason: string;
  booking_for: { name: string; phone: string; relationship: string } | null;
  createdAt: string;
}

export interface AdminAppointmentsResponse {
  success: boolean;
  appointments: AdminAppointment[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}
