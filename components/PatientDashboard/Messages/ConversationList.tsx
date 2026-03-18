"use client";

import { Search } from "lucide-react";
import type { ConversationData } from "./MessagesMain";

const COLORS = ["#0284C7", "#7C3AED", "#059669", "#EA580C", "#0891B2", "#D946EF", "#CA8A04"];
function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function formatTime(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000 && d.getDate() === now.getDate()) {
    return d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
  }
  if (diff < 172800000) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function ConversationList({
  conversations,
  activeConversationId,
  onSelect,
  search,
  onSearchChange,
}: {
  conversations: ConversationData[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
}) {
  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <div className="w-[340px] shrink-0 border-r border-gray-100 bg-white flex flex-col h-full">
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-bold text-[#101828]">Messages</h2>
        <p className="text-xs text-[#6A7282] mt-0.5">
          {totalUnread > 0 ? `${totalUnread} unread` : "No unread messages"}
        </p>
      </div>

      <div className="px-5 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-sm text-[#9CA3AF] text-center py-8">No conversations found</p>
        )}
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`w-full text-left px-5 py-3.5 flex items-start gap-3 transition cursor-pointer border-l-2 ${
              activeConversationId === c.id
                ? "bg-[#F0F9FF] border-l-[#0284C7]"
                : "border-l-transparent hover:bg-gray-50"
            }`}
          >
            <div className="relative shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: getColor(c.participant.name) }}
              >
                {c.participant.initials}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className={`text-sm truncate ${c.unreadCount > 0 ? "font-bold text-[#101828]" : "font-semibold text-[#101828]"}`}>
                  {c.participant.name}
                </p>
                {c.lastMessage && (
                  <span className="text-[10px] text-[#6A7282] shrink-0 ml-2">
                    {formatTime(c.lastMessage.createdAt)}
                  </span>
                )}
              </div>

              {c.participant.specialty && (
                <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold rounded mt-0.5 uppercase tracking-wide text-[#7C3AED] bg-[#7C3AED]/10">
                  {c.participant.specialty}
                </span>
              )}

              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-[#6A7282] truncate pr-2">
                  {c.lastMessage?.content || "No messages yet"}
                </p>
                {c.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {c.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
