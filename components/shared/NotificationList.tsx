"use client";

import { useState } from "react";
import { InboxIcon, CheckCheck, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiPatch, apiDelete } from "@/lib/api";
import NotificationItem, { type Notification } from "./NotificationItem";
import NotificationFilters, { type NotificationFilter } from "./NotificationFilters";

interface NotificationListProps {
  role: "admin" | "doctor" | "patient";
  basePath: string;
}

interface NotificationsResponse {
  success: boolean;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    type: string;
    read_status: boolean;
    createdAt: string;
  }>;
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export default function NotificationList({ role }: NotificationListProps) {
  const [filter, setFilter] = useState<NotificationFilter>("ALL");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const typeParam = filter === "ALL" ? "" : filter;
  const queryKey = ["notifications", role, filter, page];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (typeParam) params.set("type", typeParam);
      return apiFetch<NotificationsResponse>(`/api/notifications?${params}`);
    },
  });

  const notifications: Notification[] = (data?.notifications ?? []).map((n) => ({
    _id: n.id,
    title: n.title,
    message: n.message,
    type: n.type,
    read: n.read_status,
    createdAt: n.createdAt,
  }));

  const pagination = data?.pagination;
  const unread = notifications.filter((n) => !n.read).length;

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["unreadNotificationCount"] });
  };

  const markReadMutation = useMutation({
    mutationFn: (id: string) => apiPatch(`/api/notifications/${id}/read`),
    onSuccess: invalidate,
  });

  const markAllMutation = useMutation({
    mutationFn: () => apiPatch("/api/notifications/read-all"),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiDelete(`/api/notifications/${id}`),
    onSuccess: invalidate,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Notifications</h1>
          <p className="text-sm text-[#6A7282] mt-0.5">Stay updated with your latest alerts</p>
        </div>
        {unread > 0 && (
          <button
            onClick={() => markAllMutation.mutate()}
            disabled={markAllMutation.isPending}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0284C7] bg-[#F0F9FF] hover:bg-[#E0F2FE] rounded-lg transition cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all as read ({unread})
          </button>
        )}
      </div>

      <NotificationFilters active={filter} onChange={(v) => { setFilter(v); setPage(1); }} />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden min-h-[200px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <InboxIcon className="w-6 h-6 text-[#6A7282]" />
            </div>
            <p className="text-sm font-medium text-[#101828]">No notifications</p>
            <p className="text-xs text-[#6A7282] mt-1">
              {filter !== "ALL" ? "No notifications match this filter." : "You\u2019re all caught up!"}
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n._id}
              notification={n}
              onMarkRead={(id) => markReadMutation.mutate(id)}
              onDelete={(id) => deleteMutation.mutate(id)}
            />
          ))
        )}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 text-xs font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 rounded-lg transition disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-xs text-[#6A7282]">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="px-3 py-1.5 text-xs font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 rounded-lg transition disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
