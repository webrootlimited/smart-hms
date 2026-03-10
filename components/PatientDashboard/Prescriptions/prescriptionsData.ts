export type PrescriptionStatus =
  | "active"
  | "completed"
  | "expired"
  | "refill-requested";

export interface Prescription {
  id: string;
  name: string;
  generic: string;
  status: PrescriptionStatus;
  statusLabel: string;
  statusColor: string;
  statusBg: string;
  iconColor: string;
  iconBg: string;
  dosage: string;
  frequency: string;
  form: string;
  duration: string;
  prescribedBy: {
    name: string;
    specialty: string;
    clinic: string;
    avatar: string;
  };
  instructions: string;
  issueDate: string;
  lastFill: string;
  refillsRemaining: number;
  quantity: number;
}

export const prescriptions: Prescription[] = [
  {
    id: "RX-2024-0847",
    name: "Lisinopril",
    generic: "Prinvil (Lisinopril 5)",
    status: "active",
    statusLabel: "Active",
    statusColor: "#16A34A",
    statusBg: "#F0FDF4",
    iconColor: "#EF4444",
    iconBg: "#FEF2F2",
    dosage: "10mg",
    frequency: "Once daily",
    form: "Tablet",
    duration: "30 Days",
    prescribedBy: {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      clinic: "City Medical Center",
      avatar: "SJ",
    },
    instructions: "Take with food in the morning",
    issueDate: "Sept 15, 2024",
    lastFill: "Jan 10, 2025",
    refillsRemaining: 3,
    quantity: 30,
  },
  {
    id: "RX-2024-0932",
    name: "Metformin",
    generic: "500mg (Metformin HCL)",
    status: "refill-requested",
    statusLabel: "Refill Requested",
    statusColor: "#F59E0B",
    statusBg: "#FFFBEB",
    iconColor: "#7C3AED",
    iconBg: "#F5F3FF",
    dosage: "500mg",
    frequency: "Twice daily",
    form: "Tablet",
    duration: "90 Days",
    prescribedBy: {
      name: "Dr. Sarah Johnson",
      specialty: "Endocrinology",
      clinic: "City Medical Center",
      avatar: "SJ",
    },
    instructions: "Take with meals",
    issueDate: "Aug 20, 2024",
    lastFill: "Jan 10, 2025",
    refillsRemaining: 1,
    quantity: 180,
  },
  {
    id: "RX-2024-1105",
    name: "Atorvastatin",
    generic: "Lipitor (Atorvastatin Calcium)",
    status: "active",
    statusLabel: "Active",
    statusColor: "#16A34A",
    statusBg: "#F0FDF4",
    iconColor: "#0284C7",
    iconBg: "#F0F9FF",
    dosage: "20mg",
    frequency: "Once daily at bedtime",
    form: "Tablet",
    duration: "90 Days",
    prescribedBy: {
      name: "Dr. Robert Markus",
      specialty: "Cardiology",
      clinic: "Riverside Health Centre",
      avatar: "RM",
    },
    instructions: "Take in the evening before bedtime",
    issueDate: "Sept 5, 2024",
    lastFill: "Dec 1, 2024",
    refillsRemaining: 2,
    quantity: 90,
  },
  {
    id: "RX-2024-0612",
    name: "Amoxicillin",
    generic: "Amoxil (Amoxicillin Trihydrate)",
    status: "completed",
    statusLabel: "Completed",
    statusColor: "#6A7282",
    statusBg: "#F3F4F6",
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
    dosage: "500mg",
    frequency: "Three times daily",
    form: "Capsule",
    duration: "7 Days",
    prescribedBy: {
      name: "Dr. Emily Chen",
      specialty: "General Medicine",
      clinic: "Central Clinic",
      avatar: "EC",
    },
    instructions: "Complete full course even if feeling better",
    issueDate: "Jul 5, 2024",
    lastFill: "Jul 5, 2024",
    refillsRemaining: 0,
    quantity: 21,
  },
  {
    id: "RX-2023-0998",
    name: "Omeprazole",
    generic: "Prilosec (Omeprazole Magnesium)",
    status: "expired",
    statusLabel: "Expired",
    statusColor: "#EF4444",
    statusBg: "#FEF2F2",
    iconColor: "#EC4899",
    iconBg: "#FDF2F8",
    dosage: "20mg",
    frequency: "Once daily",
    form: "Capsule",
    duration: "30 Days",
    prescribedBy: {
      name: "Dr. Emily Chen",
      specialty: "Gastroenterology",
      clinic: "Central Clinic",
      avatar: "EC",
    },
    instructions: "Take 30 minutes before breakfast",
    issueDate: "Mar 10, 2023",
    lastFill: "Mar 10, 2023",
    refillsRemaining: 0,
    quantity: 30,
  },
];
