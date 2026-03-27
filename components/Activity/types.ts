export interface ActivityLog {
  id: string;
  user: string;
  role: string;
  avatar: string;
  action: string;
  description: string;
  timestamp: string;
  category: string;
  severity: string;
}

export interface ActivityStats {
  total: number;
  today: number;
  uniqueUsers: number;
}

export interface ActivityLogsResponse {
  success: boolean;
  logs: ActivityLog[];
  stats: ActivityStats;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
