"use client";

import { CalendarDays, CreditCard, MessageSquare, Bell, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Notification {
  _id: string;
  type: "APPOINTMENT" | "BILLING" | "MESSAGE" | "SYSTEM" | "REMINDER";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const typeIcons: Record<Notification["type"], React.ElementType> = {
  APPOINTMENT: CalendarDays,
  BILLING: CreditCard,
  MESSAGE: MessageSquare,
  SYSTEM: Bell,
  REMINDER: Clock,
};

const typeBg: Record<Notification["type"], string> = {
  APPOINTMENT: "bg-[#F0F9FF] text-[#0284C7]",
  BILLING: "bg-[#F0FDF4] text-[#16A34A]",
  MESSAGE: "bg-[#F5F3FF] text-[#7C3AED]",
  SYSTEM: "bg-[#FFF7ED] text-[#EA580C]",
  REMINDER: "bg-[#FFFBEB] text-[#D97706]",
};

export function formatTimeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
}: NotificationItemProps) {
  const Icon = typeIcons[notification.type] || Bell;
  const iconClass = typeBg[notification.type] || typeBg.SYSTEM;

  return (
    <div
      onClick={() => {
        if (!notification.read) onMarkRead(notification._id);
      }}
      className={cn(
        "group flex items-start gap-3 p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50",
        !notification.read && "border-l-[3px] border-l-[#0284C7] bg-[#F0F9FF]/40"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          iconClass
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-snug",
              !notification.read ? "font-semibold text-[#101828]" : "font-medium text-[#101828]"
            )}
          >
            {notification.title}
          </p>
          <span className="text-[11px] text-[#6A7282] whitespace-nowrap shrink-0">
            {formatTimeAgo(notification.createdAt)}
          </span>
        </div>
        <p className="text-xs text-[#6A7282] mt-0.5 line-clamp-2">
          {notification.message}
        </p>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notification._id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-red-50 text-[#6A7282] hover:text-red-500 transition shrink-0 cursor-pointer"
        title="Delete notification"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
