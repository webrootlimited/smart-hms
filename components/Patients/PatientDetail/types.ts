export interface PatientDetail {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: { line1?: string; line2?: string; city?: string; postcode?: string; country?: string };
  blood_group: string | null;
  nhs_number: string | null;
  photo_url: string | null;
  status: string;
  joined_at: string;
  emergency_contact: { name: string; phone: string; relationship: string } | null;
  saved_cards: number;
  stats: PatientStats;
  recentAppointments: RecentAppointment[];
}

export interface PatientStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  upcomingAppointments: number;
  doctorsSeen: number;
}

export interface RecentAppointment {
  id: string;
  doctor: { name: string; photo_url: string | null; department: string } | null;
  clinic: string | null;
  appointment_type: string;
  scheduled_at: string;
  status: string;
  reason: string;
}

export interface PatientDetailResponse {
  success: boolean;
  patient: PatientDetail;
}
