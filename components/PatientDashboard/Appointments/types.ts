export type AppointmentStatus = "Confirmed" | "Pending" | "Completed" | "Cancelled" | "No Show";
export type AppointmentMode = "In-Person" | "Video Call";

export interface PatientAppointment {
  id: string;
  doctor: {
    name: string;
    specialty: string;
    initials: string;
    color: string;
    hospital: string;
  };
  date: string;
  time: string;
  status: AppointmentStatus;
  mode: AppointmentMode;
  reason: string;
}
