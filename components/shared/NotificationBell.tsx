"use client";

import { useEffect } from "react";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { getSocket } from "@/lib/socket";
import getToken from "@/auth/getToken";

interface UnreadCountResponse {
  success: boolean;
  count: number;
}

interface NotificationBellProps {
  notificationsPath: string;
  role?: "admin" | "doctor" | "patient";
}

export default function NotificationBell({
  notificationsPath,
  role = "patient",
}: NotificationBellProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: queryKeys.unreadNotificationCount(role),
    queryFn: async () => {
      const res = await apiFetch<UnreadCountResponse>("/api/notifications/unread-count");
      return res.count;
    },
    refetchInterval: 30000,
  });

  const unreadCount = data ?? 0;

  useEffect(() => {
    let mounted = true;

    async function connectSocket() {
      const token = await getToken();
      if (!token || !mounted) return;

      const socket = getSocket(token);

      const handler = () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.unreadNotificationCount(role),
        });
      };

      socket.on("new_notification", handler);

      return () => {
        socket.off("new_notification", handler);
      };
    }

    let cleanup: (() => void) | undefined;
    connectSocket().then((fn) => {
      if (fn) cleanup = fn;
    });

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, [queryClient, role]);

  return (
    <button
      onClick={() => router.push(notificationsPath)}
      className="relative p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
      title="Notifications"
    >
      <Bell className="w-5 h-5 text-[#4A5565]" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
}
