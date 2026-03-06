export type ProviderStatus = "Active" | "On Leave" | "Inactive";

export type Provider = {
  id: string;
  name: string;
  specialty: string;
  department: string;
  location: string;
  status: ProviderStatus;
  rating: number;
  patients: number;
  nextAvailable: string;
  avatar: string;
  color: string;
};
