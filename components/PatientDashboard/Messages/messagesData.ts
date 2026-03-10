export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  specialty?: string;
  specialtyColor?: string;
  type: "doctor" | "clinic";
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: "sent" | "delivered" | "read";
  online: boolean;
}

export interface ChatMessage {
  id: number;
  sender: "patient" | "other";
  type: "text" | "prescription" | "file" | "image";
  content: string;
  timestamp: string;
  // prescription
  prescriptionTitle?: string;
  prescriptionItems?: string[];
  // file
  fileName?: string;
  fileSize?: string;
  // image
  imageAlt?: string;
}

export const conversations: Conversation[] = [
  {
    id: 1,
    name: "Dr. John Smith",
    avatar: "JS",
    specialty: "Dermatology",
    specialtyColor: "#7C3AED",
    type: "doctor",
    lastMessage: "Please apply the ointment twice daily and...",
    timestamp: "10:24 AM",
    unread: 2,
    status: "delivered",
    online: true,
  },
  {
    id: 2,
    name: "Front Desk – Central Clinic",
    avatar: "FC",
    type: "clinic",
    lastMessage: "Your appointment has been confirmed for...",
    timestamp: "9:15 AM",
    unread: 0,
    status: "read",
    online: true,
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    avatar: "SC",
    specialty: "Cardiology",
    specialtyColor: "#0284C7",
    type: "doctor",
    lastMessage: "Your blood pressure readings look good...",
    timestamp: "Yesterday",
    unread: 0,
    status: "delivered",
    online: false,
  },
  {
    id: 4,
    name: "Riverside Health Centre",
    avatar: "RH",
    type: "clinic",
    lastMessage: "Reminder: Please bring your insurance card...",
    timestamp: "Yesterday",
    unread: 0,
    status: "read",
    online: false,
  },
  {
    id: 5,
    name: "Dr. Emily Brown",
    avatar: "EB",
    specialty: "Neurology",
    specialtyColor: "#16A34A",
    type: "doctor",
    lastMessage: "The MRI results are normal. Let's discuss...",
    timestamp: "Mon",
    unread: 0,
    status: "read",
    online: false,
  },
  {
    id: 6,
    name: "St. Mary's Hospital",
    avatar: "SM",
    type: "clinic",
    lastMessage: "Your lab results are ready for pickup.",
    timestamp: "Mon",
    unread: 1,
    status: "delivered",
    online: true,
  },
];

export const chatMessages: Record<number, ChatMessage[]> = {
  1: [
    {
      id: 1,
      sender: "other",
      type: "text",
      content:
        "Good morning Sarah! I've reviewed the photos you sent of the rash on your forearm.",
      timestamp: "10:02 AM",
    },
    {
      id: 2,
      sender: "other",
      type: "text",
      content:
        "It appears to be contact dermatitis. I'm updating your prescription with a topical corticosteroid.",
      timestamp: "10:03 AM",
    },
    {
      id: 3,
      sender: "other",
      type: "prescription",
      content: "Prescription Updated",
      prescriptionTitle: "Prescription Updated",
      prescriptionItems: [
        "Hydrocortisone Cream 1% — Apply twice daily",
        "Cetirizine 10mg — Once daily for itching",
      ],
      timestamp: "10:05 AM",
    },
    {
      id: 4,
      sender: "patient",
      type: "text",
      content:
        "Thank you Dr. Smith! Should I stop using the previous moisturiser?",
      timestamp: "10:10 AM",
    },
    {
      id: 5,
      sender: "other",
      type: "text",
      content:
        "Yes, please discontinue the fragranced moisturiser. Use only fragrance-free products on the affected area.",
      timestamp: "10:12 AM",
    },
    {
      id: 6,
      sender: "patient",
      type: "file",
      content: "Lab_Results_Oct24.pdf",
      fileName: "Lab_Results_Oct24.pdf",
      fileSize: "2.4 MB",
      timestamp: "10:15 AM",
    },
    {
      id: 7,
      sender: "patient",
      type: "image",
      content: "Photo of affected area",
      imageAlt: "Skin rash on forearm",
      timestamp: "10:18 AM",
    },
    {
      id: 8,
      sender: "other",
      type: "text",
      content:
        "Please apply the ointment twice daily and let me know if the rash doesn't improve within a week.",
      timestamp: "10:24 AM",
    },
  ],
  2: [
    {
      id: 1,
      sender: "other",
      type: "text",
      content:
        "Hello Sarah, this is Front Desk at Central Clinic. Your appointment with Dr. Wilson has been confirmed.",
      timestamp: "9:00 AM",
    },
    {
      id: 2,
      sender: "other",
      type: "text",
      content:
        "Date: Wednesday, 12 March 2026 at 10:30 AM. Please arrive 10 minutes early.",
      timestamp: "9:01 AM",
    },
    {
      id: 3,
      sender: "patient",
      type: "text",
      content: "Thank you! Do I need to bring any documents?",
      timestamp: "9:10 AM",
    },
    {
      id: 4,
      sender: "other",
      type: "text",
      content:
        "Please bring your NHS card and any recent test results. Your appointment has been confirmed for Wednesday.",
      timestamp: "9:15 AM",
    },
  ],
  3: [
    {
      id: 1,
      sender: "other",
      type: "text",
      content:
        "Hi Sarah, I've reviewed your latest blood pressure logs. The readings are within normal range now.",
      timestamp: "Yesterday, 3:20 PM",
    },
    {
      id: 2,
      sender: "patient",
      type: "text",
      content:
        "That's great news! Should I continue the current medication dosage?",
      timestamp: "Yesterday, 3:35 PM",
    },
    {
      id: 3,
      sender: "other",
      type: "text",
      content:
        "Your blood pressure readings look good. Continue with Lisinopril 10mg daily. We'll reassess at your next appointment.",
      timestamp: "Yesterday, 3:40 PM",
    },
  ],
  4: [
    {
      id: 1,
      sender: "other",
      type: "text",
      content:
        "Dear Sarah, this is a reminder for your upcoming visit on Thursday.",
      timestamp: "Yesterday, 11:00 AM",
    },
    {
      id: 2,
      sender: "other",
      type: "text",
      content:
        "Reminder: Please bring your insurance card and arrive 15 minutes before your scheduled time.",
      timestamp: "Yesterday, 11:01 AM",
    },
    {
      id: 3,
      sender: "patient",
      type: "text",
      content: "Noted, I'll be there. Thanks!",
      timestamp: "Yesterday, 11:30 AM",
    },
  ],
  5: [
    {
      id: 1,
      sender: "other",
      type: "text",
      content:
        "Good afternoon Sarah. I've received your MRI scan results from the imaging centre.",
      timestamp: "Mon, 2:00 PM",
    },
    {
      id: 2,
      sender: "other",
      type: "text",
      content:
        "The MRI results are normal. Let's discuss further at your follow-up appointment next week.",
      timestamp: "Mon, 2:05 PM",
    },
    {
      id: 3,
      sender: "patient",
      type: "text",
      content: "That's a relief! See you next week, Dr. Brown.",
      timestamp: "Mon, 2:20 PM",
    },
  ],
  6: [
    {
      id: 1,
      sender: "other",
      type: "text",
      content:
        "Hello Sarah, your lab results from last Friday are now ready.",
      timestamp: "Mon, 10:00 AM",
    },
    {
      id: 2,
      sender: "other",
      type: "text",
      content:
        "Your lab results are ready for pickup. You can collect them from the reception desk during business hours.",
      timestamp: "Mon, 10:01 AM",
    },
  ],
};
