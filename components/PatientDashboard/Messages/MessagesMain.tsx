"use client";

import { useState } from "react";
import ConversationList from "./ConversationList";
import ChatPanel from "./ChatPanel";
import { conversations, chatMessages } from "./messagesData";

export default function MessagesMain() {
  const [activeFilter, setActiveFilter] = useState<"all" | "doctor" | "clinic">(
    "all"
  );
  const [activeConversationId, setActiveConversationId] = useState(
    conversations[0].id
  );
  const [search, setSearch] = useState("");

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  )!;
  const messages = chatMessages[activeConversationId] ?? [];

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <ConversationList
        conversations={conversations}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        activeConversationId={activeConversationId}
        onSelect={setActiveConversationId}
        search={search}
        onSearchChange={setSearch}
      />
      <ChatPanel conversation={activeConversation} messages={messages} />
    </div>
  );
}
