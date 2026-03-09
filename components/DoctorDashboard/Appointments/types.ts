export type AppointmentStatus = "Scheduled" | "In Progress" | "Completed" | "Cancelled" | "No Show";
export type AppointmentMode = "In-Clinic" | "Telehealth";

export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  avatar: string;
  age: number;
  gender: string;
  type: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  mode: AppointmentMode;
  reason: string;
  doctor: string;
}
