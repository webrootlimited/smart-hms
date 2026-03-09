export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  avatar: string;
  action: string;
  description: string;
  timestamp: string;
  category: "login" | "admin" | "system" | "patient" | "appointment";
  severity: "info" | "warning" | "success" | "error";
}
