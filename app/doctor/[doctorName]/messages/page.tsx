"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Send, Loader2, MessageSquare, Check, CheckCheck } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, apiPost, apiPatch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";
import { useSocket } from "@/components/utils/SocketProvider";

interface ConversationData {
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
  const d = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  if (diff < 86400000 && d.getDate() === now.getDate()) {
    return d.toLocaleTimeString("en-GB", { hour: "numeric", minute: "2-digit", hour12: true }).toUpperCase();
  }
  if (diff < 172800000) return "Yesterday";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatMsgTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-GB", {
    hour: "numeric", minute: "2-digit", hour12: true,
  }).toUpperCase();
}

export default function DoctorMessagesPage() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { socket } = useSocket();
  const [activeId, setActiveId] = useState<string | null>(searchParams.get("conversation"));
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch conversations
  const { data: convData, isLoading: convLoading } = useQuery({
    queryKey: queryKeys.conversations,
    queryFn: () => apiFetch<{ success: boolean; conversations: ConversationData[] }>("/api/messages/conversations"),
  });
  const conversations = convData?.conversations || [];

  // Auto-select first
  useEffect(() => {
    if (!activeId && conversations.length > 0) setActiveId(conversations[0].id);
  }, [conversations, activeId]);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  // Fetch messages
  const { data: msgData, isLoading: msgLoading } = useQuery({
    queryKey: queryKeys.messages(activeId || ""),
    queryFn: () => apiFetch<{ success: boolean; messages: MessageData[] }>(`/api/messages/conversations/${activeId}`),
    enabled: !!activeId,
  });
  const messages = msgData?.messages || [];

  // Join/leave conversation room
  useEffect(() => {
    if (!socket || !activeId) return;
    socket.emit("join_conversation", activeId);
    return () => { socket.emit("leave_conversation", activeId); };
  }, [socket, activeId]);

  // Mark as read
  useEffect(() => {
    if (activeId && activeConversation && activeConversation.unreadCount > 0) {
      apiPatch(`/api/messages/conversations/${activeId}/read`).then(() => {
        queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
      });
    }
  }, [activeId, activeConversation?.unreadCount, queryClient]);

  // Socket listeners
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: MessageData & { conversationId: string }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
      if (msg.conversationId === activeId) {
        queryClient.setQueryData(
          queryKeys.messages(activeId!),
          (old: { success: boolean; messages: MessageData[] } | undefined) => {
            if (!old) return old;
            const exists = old.messages.some((m) => m.id === msg.id);
            if (exists) return old;
            return { ...old, messages: [...old.messages, msg] };
          }
        );
        apiPatch(`/api/messages/conversations/${activeId}/read`).then(() => {
          queryClient.invalidateQueries({ queryKey: queryKeys.conversations });
        });
      }
    };

    const handleTyping = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === activeId && data.userId === activeConversation?.participant.userId) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (data: { conversationId: string; userId: string }) => {
      if (data.conversationId === activeId && data.userId === activeConversation?.participant.userId) {
        setIsTyping(false);
      }
    };

    const handleRead = (data: { conversationId: string }) => {
      if (data.conversationId === activeId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.messages(activeId!) });
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
  }, [socket, activeId, activeConversation?.participant.userId, queryClient]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Send message
  const sendMutation = useMutation({
    mutationFn: (content: string) =>
      apiPost<{ success: boolean; message: MessageData }>(`/api/messages/conversations/${activeId}/messages`, { content }),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData(
          queryKeys.messages(activeId!),
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

  const emitTyping = useCallback(() => {
    if (!socket || !activeId) return;
    socket.emit("typing", { conversationId: activeId });
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { conversationId: activeId });
    }, 2000);
  }, [socket, activeId]);

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text || !activeId) return;
    setNewMessage("");
    if (socket) socket.emit("stop_typing", { conversationId: activeId });
    sendMutation.mutate(text);
  };

  const filtered = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(search.toLowerCase())
  );

  if (convLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-7 h-7 text-[#0284C7] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Messages</h1>
        <p className="text-sm text-[#6A7282]">Communicate with patients</p>
      </div>

      {conversations.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-center">
            <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-[#101828]">No messages yet</p>
            <p className="text-xs text-[#6A7282] mt-1">Start a conversation from an appointment</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ height: "calc(100vh - 220px)" }}>
          {/* Conversations list */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full flex items-center gap-3 p-3 text-left transition cursor-pointer ${
                    activeId === c.id ? "bg-[#F0F9FF]" : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
                    style={{ backgroundColor: getColor(c.participant.name) }}
                  >
                    {c.participant.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#101828]">{c.participant.name}</p>
                      {c.lastMessage && (
                        <span className="text-[10px] text-[#6A7282]">{formatTime(c.lastMessage.createdAt)}</span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#6A7282] truncate">
                      {c.lastMessage?.content || "No messages yet"}
                    </p>
                  </div>
                  {c.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                      {c.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            {activeConversation ? (
              <>
                <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: getColor(activeConversation.participant.name) }}
                  >
                    {activeConversation.participant.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#101828]">{activeConversation.participant.name}</p>
                    {isTyping && <p className="text-[11px] text-[#16A34A]">typing...</p>}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4">
                  {msgLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-sm text-[#9CA3AF]">No messages yet. Say hello!</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMine = msg.senderId !== activeConversation.participant.userId;
                      return (
                        <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"} mb-4`}>
                          <div className="max-w-[380px]">
                            <div
                              className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                                isMine
                                  ? "bg-[#0284C7] text-white rounded-br-md"
                                  : "bg-gray-50 border border-gray-200 text-[#101828] rounded-bl-md"
                              }`}
                            >
                              {msg.content}
                            </div>
                            <div className={`flex items-center gap-1 mt-1 ${isMine ? "justify-end" : ""}`}>
                              <span className="text-[10px] text-[#9CA3AF]">{formatMsgTime(msg.createdAt)}</span>
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

                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3">
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

                <div className="p-3 border-t border-gray-100 flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      emitTyping();
                    }}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
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
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition cursor-pointer ${
                      newMessage.trim() ? "bg-[#0284C7] hover:opacity-90" : "bg-gray-100"
                    }`}
                  >
                    <Send className={`w-4 h-4 ${newMessage.trim() ? "text-white" : "text-[#9CA3AF]"}`} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-sm text-[#9CA3AF]">Select a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
