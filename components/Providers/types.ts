export type ProviderStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE";

export interface Provider {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  experience_years: number;
  consultation_fee: number;
  bio: string;
  gender: string | null;
  online_consultation: boolean;
  photo_url: string | null;
  status: ProviderStatus;
  createdAt: string;
}

export interface ProvidersResponse {
  success: boolean;
  doctors: Provider[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
