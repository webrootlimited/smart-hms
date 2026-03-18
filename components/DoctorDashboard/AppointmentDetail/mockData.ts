// import { AppointmentDetail } from "./types";

// export const APPOINTMENTS_DATA: Record<string, AppointmentDetail> = {
//   "APT-001": {
//     id: "APT-001",
//     patient: {
//       name: "James T. Wilson",
//       age: 34,
//       gender: "Male",
//       patientId: "PT-B439201",
//       phone: "(555) 123-4567",
//       email: "james.wilson@email.com",
//       emergencyContact: "Sarah Wilson (Spouse) - (555) 987-6543",
//       tags: ["Allergic: Penicillin", "Chronic Condition", "VIP Patient"],
//       avatar: "JW",
//     },
//     type: "Follow-up Consultation",
//     status: "In Progress",
//     medicalHistory: {
//       pastDiagnoses: "Hypertension, Asthma (Childhood)",
//       allergies: "Penicillin, Shellfish",
//       chronicConditions: "Type 2 Diabetes (Controlled)",
//       currentMedications: "Metformin 500mg, Lisinopril 10mg",
//       primaryPhysician: "Dr. Emily Carter",
//       lastVisit: {
//         date: "2025-09-15",
//         type: "Annual Check-up",
//         notes: "Blood pressure stable. A1C levels at 6.8%. Advised on diet adjustments.",
//       },
//     },
//     preVisitForm: {
//       filedOn: "2025-12-07",
//       items: [
//         { label: "Reason for visit", checked: true },
//         { label: "Symptoms checklist", checked: true },
//         { label: "Pain level: 3/10", checked: true },
//         { label: "Insurance confirmed", checked: true },
//       ],
//     },
//     documents: [
//       { name: "Lab_Report_CBC_Oct2025.pdf", uploadedOn: "2025-10-28", type: "pdf" },
//       { name: "Chest_XRay_Series.dcm", uploadedOn: "2025-10-25", type: "dcm" },
//       { name: "Past_Prescriptions_2024.pdf", uploadedOn: "2025-09-18", type: "pdf" },
//     ],
//     telehealth: {
//       enabled: true,
//       status: "Ready to join",
//       patientWaiting: true,
//     },
//   },
//   "APT-002": {
//     id: "APT-002",
//     patient: {
//       name: "Emma R. Davis",
//       age: 28,
//       gender: "Female",
//       patientId: "PT-C782105",
//       phone: "(555) 234-5678",
//       email: "emma.davis@email.com",
//       emergencyContact: "Mark Davis (Brother) - (555) 876-5432",
//       tags: ["First Visit", "Insurance Pending"],
//       avatar: "ED",
//     },
//     type: "Initial Consultation",
//     status: "Scheduled",
//     medicalHistory: {
//       pastDiagnoses: "Migraine (Chronic)",
//       allergies: "None known",
//       chronicConditions: "Migraine with aura",
//       currentMedications: "Sumatriptan 50mg (as needed)",
//       primaryPhysician: "Dr. Sarah Mitchell",
//       lastVisit: {
//         date: "2025-11-20",
//         type: "Neurology Referral",
//         notes: "Referred for specialist evaluation. MRI scheduled.",
//       },
//     },
//     preVisitForm: {
//       filedOn: "2025-12-05",
//       items: [
//         { label: "Reason for visit", checked: true },
//         { label: "Symptoms checklist", checked: true },
//         { label: "Pain level: 6/10", checked: false },
//         { label: "Insurance confirmed", checked: false },
//       ],
//     },
//     documents: [
//       { name: "MRI_Brain_Nov2025.dcm", uploadedOn: "2025-11-22", type: "dcm" },
//       { name: "Referral_Letter.pdf", uploadedOn: "2025-11-20", type: "pdf" },
//     ],
//     telehealth: {
//       enabled: false,
//       status: "In-Clinic Visit",
//       patientWaiting: false,
//     },
//   },
//   "APT-003": {
//     id: "APT-003",
//     patient: {
//       name: "Robert A. Chen",
//       age: 52,
//       gender: "Male",
//       patientId: "PT-A195840",
//       phone: "(555) 345-6789",
//       email: "robert.chen@email.com",
//       emergencyContact: "Linda Chen (Wife) - (555) 765-4321",
//       tags: ["Chronic Condition", "Follow-up Required"],
//       avatar: "RC",
//     },
//     type: "Cardiology Follow-up",
//     status: "Completed",
//     medicalHistory: {
//       pastDiagnoses: "Myocardial Infarction (2023), Hyperlipidemia",
//       allergies: "Aspirin (mild rash)",
//       chronicConditions: "Coronary Artery Disease, Hypertension",
//       currentMedications: "Atorvastatin 40mg, Clopidogrel 75mg, Metoprolol 50mg",
//       primaryPhysician: "Dr. James Harrison",
//       lastVisit: {
//         date: "2025-10-01",
//         type: "Cardiac Stress Test",
//         notes: "Stress test within normal limits. Continue current medications. Next echo in 6 months.",
//       },
//     },
//     preVisitForm: {
//       filedOn: "2025-12-01",
//       items: [
//         { label: "Reason for visit", checked: true },
//         { label: "Symptoms checklist", checked: true },
//         { label: "Pain level: 1/10", checked: true },
//         { label: "Insurance confirmed", checked: true },
//       ],
//     },
//     documents: [
//       { name: "ECG_Report_Oct2025.pdf", uploadedOn: "2025-10-01", type: "pdf" },
//       { name: "Echocardiogram_2025.dcm", uploadedOn: "2025-09-15", type: "dcm" },
//       { name: "Blood_Panel_Results.pdf", uploadedOn: "2025-10-01", type: "pdf" },
//     ],
//     telehealth: {
//       enabled: false,
//       status: "Completed",
//       patientWaiting: false,
//     },
//   },
// };
