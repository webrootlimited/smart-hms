export interface AppointmentDetail {
  id: string;
  patient: {
    name: string;
    age: number;
    gender: string;
    patientId: string;
    phone: string;
    email: string;
    emergencyContact: string;
    tags: string[];
    avatar: string;
  };
  type: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  medicalHistory: {
    pastDiagnoses: string;
    allergies: string;
    chronicConditions: string;
    currentMedications: string;
    primaryPhysician: string;
    lastVisit: {
      date: string;
      type: string;
      notes: string;
    };
  };
  preVisitForm: {
    filedOn: string;
    items: { label: string; checked: boolean }[];
  };
  documents: {
    name: string;
    uploadedOn: string;
    type: "pdf" | "dcm" | "img";
  }[];
  telehealth: {
    enabled: boolean;
    status: string;
    patientWaiting: boolean;
  };
}
