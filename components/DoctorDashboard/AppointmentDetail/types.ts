export interface AppointmentDetail {
  id: string;
  patient: {
    userId: string | null;
    name: string;
    initials: string;
    age: number | null;
    gender: string | null;
    phone: string | null;
    email: string | null;
    dob: string | null;
    address: {
      line1?: string;
      line2?: string;
      city?: string;
      postcode?: string;
    } | null;
    blood_group: string | null;
    nhs_number: string | null;
    photo_url: string | null;
    emergencyContact: {
      name: string;
      phone: string;
      relationship: string;
    } | null;
  };
  clinic: {
    name: string;
    address: {
      line1?: string;
      city?: string;
      postcode?: string;
    };
    phone: string;
  } | null;
  scheduled_at: string;
  duration: number;
  appointment_type: "ONLINE" | "PHYSICAL";
  status: string;
  reason: string;
}
