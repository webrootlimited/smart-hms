"use client";

import { useState } from "react";
import { Send, Paperclip, Smile, FileText, MoreHorizontal } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "doctor" | "patient";
  text: string;
  time: string;
  attachment?: { name: string; size: string };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    sender: "doctor",
    text: "Hello Mark! How are you feeling today after the medication?",
    time: "10:23 AM",
  },
  {
    id: "2",
    sender: "patient",
    text: "Much better, thank you Doctor. The headache has subsided significantly.",
    time: "10:23 AM",
  },
  {
    id: "3",
    sender: "doctor",
    text: "That's great to hear. I've uploaded your updated prescription. Please take a look.",
    time: "10:24 AM",
    attachment: { name: "Prescription_Rx.pdf", size: "145 KB" },
  },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "doctor",
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">
          <span className="text-xs font-bold text-[#4A5565]">MC</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-[#101828]">Michael</p>
          <p className="text-[11px] text-[#16A34A] font-medium">Online</p>
        </div>
        <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center cursor-pointer">
          <MoreHorizontal className="w-4 h-4 text-[#6A7282]" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        <p className="text-[10px] text-[#6A7282] text-center">Today, 10:23 AM</p>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] ${msg.sender === "patient" ? "order-1" : ""}`}>
              <div className="flex items-end gap-2">
                {msg.sender === "doctor" && (
                  <div className="w-7 h-7 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-[#4A5565]">MC</span>
                  </div>
                )}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl ${
                    msg.sender === "patient"
                      ? "bg-[#0284C7] text-white rounded-br-md"
                      : "bg-gray-100 text-[#101828] rounded-bl-md"
                  }`}
                >
                  <p className="text-xs leading-relaxed">{msg.text}</p>

                  {msg.attachment && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                      <div className="w-7 h-7 rounded-lg bg-[#EF4444]/20 flex items-center justify-center shrink-0">
                        <FileText className="w-3.5 h-3.5 text-[#EF4444]" />
                      </div>
                      <div>
                        <p className={`text-[11px] font-semibold ${msg.sender === "patient" ? "text-white" : "text-[#101828]"}`}>
                          {msg.attachment.name}
                        </p>
                        <p className={`text-[10px] ${msg.sender === "patient" ? "text-white/70" : "text-[#6A7282]"}`}>
                          {msg.attachment.size}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {msg.sender === "patient" && (
                  <div className="w-7 h-7 rounded-full bg-[#0284C7] flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-white">Dr</span>
                  </div>
                )}
              </div>
              <p className={`text-[10px] text-[#9CA3AF] mt-1 ${msg.sender === "patient" ? "text-right" : "ml-9"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Typing indicator placeholder */}
      <div className="px-4 pb-1">
        <div className="flex items-center gap-1">
          <MoreHorizontal className="w-4 h-4 text-[#9CA3AF] animate-pulse" />
        </div>
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center cursor-pointer shrink-0">
            <Paperclip className="w-4 h-4 text-[#6A7282]" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
          />
          <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center cursor-pointer shrink-0">
            <Smile className="w-4 h-4 text-[#6A7282]" />
          </button>
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-xl bg-[#0284C7] flex items-center justify-center hover:opacity-90 transition cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
