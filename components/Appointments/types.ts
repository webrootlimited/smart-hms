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
