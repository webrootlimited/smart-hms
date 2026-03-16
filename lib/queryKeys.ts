export const queryKeys = {
  doctorProfile: ["doctor", "profile"] as const,
  doctorAvailability: (type: string) => ["doctor", "availability", type] as const,
  doctorLocations: ["doctor", "locations"] as const,
  patientProfile: ["patient", "profile"] as const,
  patientCards: ["patient", "cards"] as const,
  onlineDoctors: (search: string) => ["online-doctors", search] as const,
  onlineSlots: (doctorId: string, date: string) => ["online-slots", doctorId, date] as const,
};
