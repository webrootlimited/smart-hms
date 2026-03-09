export type PatientStatus = "Active" | "Inactive" | "Critical";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  color: string;
  status: PatientStatus;
  patientId: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  primaryDoctor: string;
  lastVisit: string;
  nextAppointment: string;
  balanceDue: string;
  conditions: string[];
}
