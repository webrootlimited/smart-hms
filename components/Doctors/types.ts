export type DoctorStatus = "Active" | "On Leave" | "Inactive";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  department: string;
  qualification: string;
  experience: number;
  location: string;
  status: DoctorStatus;
  rating: number;
  patients: number;
  consultationFee: number;
  nextAvailable: string;
  avatar: string;
  color: string;
  email: string;
  phone: string;
};
