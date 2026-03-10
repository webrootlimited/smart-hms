"use client";

import { Search, Stethoscope, Building2 } from "lucide-react";
import type { Conversation } from "./messagesData";

const filters = [
  { key: "all", label: "All" },
  { key: "doctor", label: "Doctors", icon: Stethoscope },
  { key: "clinic", label: "Clinic", icon: Building2 },
] as const;

type FilterKey = (typeof filters)[number]["key"];

export default function ConversationList({
  conversations,
  activeFilter,
  onFilterChange,
  activeConversationId,
  onSelect,
  search,
  onSearchChange,
}: {
  conversations: Conversation[];
  activeFilter: FilterKey;
  onFilterChange: (f: FilterKey) => void;
  activeConversationId: number;
  onSelect: (id: number) => void;
  search: string;
  onSearchChange: (s: string) => void;
}) {
  const filtered = conversations.filter((c) => {
    const matchesFilter =
      activeFilter === "all" || c.type === activeFilter;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-[340px] shrink-0 border-r border-gray-100 bg-white flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-lg font-bold text-[#101828]">Messages</h2>
        <p className="text-xs text-[#6A7282] mt-0.5">
          {conversations.filter((c) => c.unread > 0).length} unread
          conversations
        </p>
      </div>

      {/* Search */}
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

      {/* Filter tabs */}
      <div className="px-5 pb-3 flex items-center gap-1.5">
        {filters.map((f) => {
          const Icon = "icon" in f ? f.icon : null;
          return (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFilter === f.key
                  ? "bg-[#0284C7] text-white"
                  : "bg-gray-100 text-[#4A5565] hover:bg-gray-200"
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="text-sm text-[#9CA3AF] text-center py-8">
            No conversations found
          </p>
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
            {/* Avatar */}
            <div className="relative shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                  c.type === "doctor"
                    ? "bg-[#FFF7ED] text-[#F59E0B]"
                    : "bg-[#F0F9FF] text-[#0284C7]"
                }`}
              >
                {c.avatar}
              </div>
              {c.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#16A34A] border-2 border-white rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p
                  className={`text-sm truncate ${
                    c.unread > 0
                      ? "font-bold text-[#101828]"
                      : "font-semibold text-[#101828]"
                  }`}
                >
                  {c.name}
                </p>
                <span className="text-[10px] text-[#6A7282] shrink-0 ml-2">
                  {c.timestamp}
                </span>
              </div>

              {c.specialty && (
                <span
                  className="inline-block px-1.5 py-0.5 text-[9px] font-bold rounded mt-0.5 uppercase tracking-wide"
                  style={{
                    color: c.specialtyColor,
                    backgroundColor: `${c.specialtyColor}15`,
                  }}
                >
                  {c.specialty}
                </span>
              )}

              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-[#6A7282] truncate pr-2">
                  {c.lastMessage}
                </p>
                {c.unread > 0 ? (
                  <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {c.unread}
                  </span>
                ) : (
                  <span className="text-[10px] text-[#9CA3AF] shrink-0 capitalize">
                    {c.status}
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
