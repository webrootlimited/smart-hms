export type UserRole = "Doctor" | "Nurse" | "Admin" | "Staff";
export type UserStatus = "Active" | "Inactive" | "Pending";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  lastLogin: string;
  avatar: string;
};
