export interface DoctorDetail {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string | null;
  gender: string;
  address: string;
  specialization: string;
  department: string;
  experience_years: number;
  consultation_fee: number;
  bio: string;
  photo_url: string | null;
  status: string;
  online_consultation: boolean;
  offline_consultation: boolean;
  account_status: string;
  joined_at: string;
  verification: {
    license_number: string;
    document_url: string;
    status: string;
    verified_at: string | null;
  } | null;
  locations: DoctorLocation[];
  offlineSchedule: ScheduleDay[];
  onlineSchedule: ScheduleDay[];
  stats: DoctorStats;
  recentAppointments: RecentAppointment[];
}

export interface DoctorLocation {
  id: string;
  clinic_id: string;
  name: string;
  address: { line1?: string; line2?: string; city?: string; postcode?: string; country?: string };
  phone: string;
  is_primary: boolean;
  status: string;
}

export interface ScheduleDay {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
  slot_duration: number;
}

export interface DoctorStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  upcomingAppointments: number;
  totalPatients: number;
}

export interface RecentAppointment {
  id: string;
  patient: { name: string; photo_url: string | null } | null;
  clinic: string | null;
  appointment_type: string;
  scheduled_at: string;
  status: string;
  reason: string;
}

export interface DoctorDetailResponse {
  success: boolean;
  doctor: DoctorDetail;
}
