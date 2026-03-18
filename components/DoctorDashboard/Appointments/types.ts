export type AppointmentStatus = "REQUESTED" | "CONFIRMED" | "CHECKED_IN" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
export type AppointmentMode = "ONLINE" | "PHYSICAL";

export interface Appointment {
  id: string;
  patientName: string;
  initials: string;
  age: number | null;
  gender: string | null;
  photo_url: string | null;
  clinic: string | null;
  scheduled_at: string;
  duration: number;
  appointment_type: AppointmentMode;
  status: AppointmentStatus;
  reason: string;
}

export interface AppointmentStats {
  total: number;
  today: number;
  upcoming: number;
  completed: number;
  cancelled: number;
}
