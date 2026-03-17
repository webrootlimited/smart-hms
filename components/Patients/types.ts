export type PatientStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface PatientAddress {
  line1?: string;
  line2?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  gender: Gender;
  blood_group: string | null;
  address: PatientAddress;
  nhs_number: string | null;
  photo_url: string | null;
  status: PatientStatus;
  createdAt: string;
}

export interface PatientsResponse {
  success: boolean;
  patients: Patient[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
