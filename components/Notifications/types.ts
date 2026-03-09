export type NotificationCategory = "Appointment" | "Patient" | "Billing" | "System";
export type NotificationChannel = "SMS" | "Email" | "Push" | "WhatsApp";

export interface NotificationTemplate {
  id: string;
  name: string;
  description: string;
  category: NotificationCategory;
  channels: NotificationChannel[];
  variables: string[];
  color: string;
  bgColor: string;
}
