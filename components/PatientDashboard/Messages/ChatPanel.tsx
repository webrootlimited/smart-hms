"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Loader2, Check, CheckCheck } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiPost, apiPatch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSocket } from "@/components/utils/SocketProvider";
import type { ConversationData } from "./MessagesMain";

interface MessageData {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: string;
  read: boolean;
  createdAt: string;
}

const COLORS = ["#0284C7", "#7C3AED", "#059669", "#EA580C", "#0891B2", "#D946EF", "#CA8A04"];
function getColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).toUpperCase();
}

export default function ChatPanel({
  conversation,
  conversationId,
}: {
  conversation: ConversationData;
  conversationId: string;
}) {
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentUserId = conversation.lastMessage?.senderId === conversation.participant.userId
    ? conversation.lastMessage?.senderId
    : undefined;

  // Fetch messages
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.messages(conversationId),
    queryFn: () =>
      apiFetch<{ success: boolean; messages: MessageData[] }>(
        `/api/messages/conversations/${conversationId}`
      ),
    enabled: !!conversationId,
  });

  const messages = data?.messages || [];

  // Join conversation room
  useEffect(() => {
    if (!socket || !conversationId) return;
    socket.emit("join_conversation", conversationId);
    return () => { socket.emit("leave_conversation", conversationId); };
  }, [socket, conversationId]);

  // Mark as read
  useEffect(() => {
    if (conversationId && conversation.unreadCount > 0) {
      apiPatch(`/api/messages/conversations/${conversationId}/read`).then(() => {
        queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
      });
    }
  }, [conversationId, conversation.unreadCount, queryClient]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: MessageData & { conversationId: string }) => {
      if (msg.conversationId === conversationId) {
        queryClient.setQueryData(
          queryKeys.messages(conversationId),
          (old: { success: boolean; messages: MessageData[] } | undefined) => {
            if (!old) return old;
            const exists = old.messages.some((m) => m.id === msg.id);
            if (exists) return old;
            return { ...old, messages: [...old.messages, msg] };
          }
        );
        // Mark as read since we're viewing this conversation
        apiPatch(`/api/messages/conversations/${conversationId}/read`).then(() => {
          queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
        });
      }
    };

    const handleTyping = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === conversationId && data.userId === conversation.participant.userId) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === conversationId && data.userId === conversation.participant.userId) {
        setIsTyping(false);
      }
    };

    const handleRead = (data: { conversationId: string; readBy: string }) => {
      if (data.conversationId === conversationId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.messages(conversationId) });
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stop_typing", handleStopTyping);
    socket.on("messages_read", handleRead);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stop_typing", handleStopTyping);
      socket.off("messages_read", handleRead);
    };
  }, [socket, conversationId, conversation.participant.userId, queryClient]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Send message
  const sendMutation = useMutation({
    mutationFn: (content: string) =>
      apiPost<{ success: boolean; message: MessageData }>(
        `/api/messages/conversations/${conversationId}/messages`,
        { content }
      ),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData(
          queryKeys.messages(conversationId),
          (old: { success: boolean; messages: MessageData[] } | undefined) => {
            if (!old) return old;
            const exists = old.messages.some((m) => m.id === res.message.id);
            if (exists) return old;
            return { ...old, messages: [...old.messages, res.message] };
          }
        );
        queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
      }
    },
  });

  // Typing indicator
  const emitTyping = useCallback(() => {
    if (!socket || !conversationId) return;
    socket.emit("typing", { conversationId });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { conversationId });
    }, 2000);
  }, [socket, conversationId]);

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;
    setNewMessage("");
    if (socket) socket.emit("stop_typing", { conversationId });
    sendMutation.mutate(text);
  };

  // Determine which messages are "mine" (not from the other participant)
  const otherUserId = conversation.participant.userId;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ backgroundColor: getColor(conversation.participant.name) }}
          >
            {conversation.participant.initials}
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#101828]">{conversation.participant.name}</h3>
            {conversation.participant.specialty && (
              <span className="text-xs text-[#6A7282]">{conversation.participant.specialty}</span>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-[#9CA3AF]">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.senderId !== otherUserId;
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}>
                <div className="max-w-[380px]">
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isMine
                        ? "bg-[#0284C7] text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-[#101828] rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : ""}`}>
                    <span className="text-[10px] text-[#9CA3AF]">{formatTime(msg.createdAt)}</span>
                    {isMine && (
                      msg.read
                        ? <CheckCheck className="w-3 h-3 text-[#0284C7]" />
                        : <Check className="w-3 h-3 text-[#9CA3AF]" />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              emitTyping();
            }}
            placeholder="Type your message..."
            className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim() || sendMutation.isPending}
            className={`p-2.5 rounded-xl transition cursor-pointer ${
              newMessage.trim()
                ? "bg-[#0284C7] text-white hover:opacity-90"
                : "bg-gray-100 text-[#9CA3AF]"
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
