export const queryKeys = {
  doctorProfile: ["doctor", "profile"] as const,
  doctorAvailability: (type: string) => ["doctor", "availability", type] as const,
  doctorLocations: ["doctor", "locations"] as const,
  patientProfile: ["patient", "profile"] as const,
  patientCards: ["patient", "cards"] as const,
  onlineDoctors: (search: string) => ["online-doctors", search] as const,
  offlineDoctors: (params: Record<string, string | number>) => ["offline-doctors", params] as const,
  onlineSlots: (doctorId: string, date: string) => ["online-slots", doctorId, date] as const,
  patientPayments: ["patient", "payments"] as const,
  doctorPayments: ["doctor", "payments"] as const,
  adminPatients: (params: Record<string, string | number>) =>
    ["admin", "patients", params] as const,
  adminDoctors: (params: Record<string, string | number>) =>
    ["admin", "doctors", params] as const,
  adminAppointments: (params: Record<string, string | number>) =>
    ["admin", "appointments", params] as const,
  adminDoctorDetail: (id: string) =>
    ["admin", "doctor", id] as const,
  adminPatientDetail: (id: string) =>
    ["admin", "patient", id] as const,
  adminAppointmentDetail: (id: string) =>
    ["admin", "appointment", id] as const,
  patientAppointments: (status: string, search: string) =>
    ["patient", "appointments", status, search] as const,
  doctorAppointments: (params: Record<string, string>) =>
    ["doctor", "appointments", params] as const,
  doctorAppointmentDetail: (id: string) =>
    ["doctor", "appointment", id] as const,
  doctorPatients: (params: Record<string, string | number>) =>
    ["doctor", "patients", params] as const,
  patientAppointmentDetail: (id: string) =>
    ["patient", "appointment", id] as const,
  conversations: ["conversations"] as const,
  messages: (conversationId: string) =>
    ["messages", conversationId] as const,
};
