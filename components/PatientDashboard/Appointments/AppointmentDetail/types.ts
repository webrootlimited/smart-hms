export interface PatientAppointmentDetail {
  id: string;
  doctor: {
    userId: string | null;
    name: string;
    initials: string;
    specialty: string;
    phone: string | null;
    consultation_fee: number;
    photo_url: string | null;
    department: string | null;
  };
  clinic: {
    name: string;
    address: { line1?: string; city?: string; postcode?: string };
    phone: string;
  } | null;
  scheduled_at: string;
  duration: number;
  appointment_type: "ONLINE" | "PHYSICAL";
  status: string;
  reason: string;
  createdAt: string;
}
