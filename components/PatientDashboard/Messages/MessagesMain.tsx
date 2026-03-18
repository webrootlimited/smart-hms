"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, MessageSquare } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSocket } from "@/components/utils/SocketProvider";
import ConversationList from "./ConversationList";
import ChatPanel from "./ChatPanel";

export interface ConversationData {
  id: string;
  participant: {
    userId: string;
    name: string;
    initials: string;
    specialty: string | null;
    photo_url: string | null;
    role: string | null;
  };
  lastMessage: {
    content: string;
    type: string;
    senderId: string;
    createdAt: string;
    read: boolean;
  } | null;
  unreadCount: number;
  updatedAt: string;
}

export default function MessagesMain() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    searchParams.get("conversation")
  );
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.conversations,
    queryFn: () =>
      apiFetch<{ success: boolean; conversations: ConversationData[] }>(
        "/api/messages/conversations"
      ),
  });

  const conversations = data?.conversations || [];

  // Auto-select first conversation if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  // Listen for new messages to update conversation list
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
    };

    socket.on("new_message", handleNewMessage);
    return () => { socket.off("new_message", handleNewMessage); };
  }, [socket, queryClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-white rounded-2xl border border-gray-100 shadow-sm">
        <Loader2 className="w-7 h-7 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="text-center">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#101828]">No messages yet</p>
          <p className="text-xs text-[#6A7282] mt-1">Start a conversation from an appointment</p>
        </div>
      </div>
    );
  }

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelect={setActiveConversationId}
        search={search}
        onSearchChange={setSearch}
      />
      {activeConversation ? (
        <ChatPanel
          conversation={activeConversation}
          conversationId={activeConversation.id}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#F8FAFC]">
          <p className="text-sm text-[#6A7282]">Select a conversation</p>
        </div>
      )}
    </div>
  );
}
