"use client";

import { useState } from "react";
import {
  Phone,
  Video,
  Send,
  Paperclip,
  Image as ImageIcon,
  FileText,
  Download,
  Pill,
  ShieldCheck,
} from "lucide-react";
import type { Conversation, ChatMessage } from "./messagesData";

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isPatient = msg.sender === "patient";

  if (msg.type === "prescription") {
    return (
      <div className="flex justify-start mb-4">
        <div className="max-w-[380px]">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Pill className="w-4 h-4 text-[#16A34A]" />
              <p className="text-sm font-bold text-[#16A34A]">
                {msg.prescriptionTitle}
              </p>
            </div>
            <ul className="space-y-1.5">
              {msg.prescriptionItems?.map((item, i) => (
                <li key={i} className="text-xs text-[#4A5565] flex gap-2">
                  <span className="text-[#16A34A] shrink-0">&#8226;</span>
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-3 text-xs font-semibold text-[#0284C7] hover:underline cursor-pointer">
              View Details
            </button>
          </div>
          <p className="text-[10px] text-[#9CA3AF] mt-1">{msg.timestamp}</p>
        </div>
      </div>
    );
  }

  if (msg.type === "file") {
    return (
      <div className={`flex ${isPatient ? "justify-end" : "justify-start"} mb-4`}>
        <div className="max-w-[320px]">
          <div
            className={`rounded-2xl p-3 flex items-center gap-3 ${
              isPatient
                ? "bg-[#0284C7] text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                isPatient ? "bg-white/20" : "bg-[#F0F9FF]"
              }`}
            >
              <FileText
                className={`w-5 h-5 ${
                  isPatient ? "text-white" : "text-[#0284C7]"
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs font-semibold truncate ${
                  isPatient ? "text-white" : "text-[#101828]"
                }`}
              >
                {msg.fileName}
              </p>
              <p
                className={`text-[10px] ${
                  isPatient ? "text-white/70" : "text-[#6A7282]"
                }`}
              >
                {msg.fileSize}
              </p>
            </div>
            <Download
              className={`w-4 h-4 shrink-0 cursor-pointer ${
                isPatient ? "text-white/80" : "text-[#6A7282]"
              }`}
            />
          </div>
          <p
            className={`text-[10px] text-[#9CA3AF] mt-1 ${
              isPatient ? "text-right" : ""
            }`}
          >
            {msg.timestamp}
          </p>
        </div>
      </div>
    );
  }

  if (msg.type === "image") {
    return (
      <div className={`flex ${isPatient ? "justify-end" : "justify-start"} mb-4`}>
        <div className="max-w-[260px]">
          <div
            className={`rounded-2xl overflow-hidden ${
              isPatient ? "bg-[#0284C7]" : "bg-white border border-gray-200"
            }`}
          >
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <p
              className={`text-xs px-3 py-2 ${
                isPatient ? "text-white/90" : "text-[#4A5565]"
              }`}
            >
              {msg.imageAlt}
            </p>
          </div>
          <p
            className={`text-[10px] text-[#9CA3AF] mt-1 ${
              isPatient ? "text-right" : ""
            }`}
          >
            {msg.timestamp}
          </p>
        </div>
      </div>
    );
  }

  // Text message
  return (
    <div className={`flex ${isPatient ? "justify-end" : "justify-start"} mb-4`}>
      <div className="max-w-[380px]">
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isPatient
              ? "bg-[#0284C7] text-white rounded-br-md"
              : "bg-white border border-gray-200 text-[#101828] rounded-bl-md"
          }`}
        >
          {msg.content}
        </div>
        <p
          className={`text-[10px] text-[#9CA3AF] mt-1 ${
            isPatient ? "text-right" : ""
          }`}
        >
          {msg.timestamp}
        </p>
      </div>
    </div>
  );
}

export default function ChatPanel({
  conversation,
  messages,
}: {
  conversation: Conversation;
  messages: ChatMessage[];
}) {
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                conversation.type === "doctor"
                  ? "bg-[#FFF7ED] text-[#F59E0B]"
                  : "bg-[#F0F9FF] text-[#0284C7]"
              }`}
            >
              {conversation.avatar}
            </div>
            {conversation.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#16A34A] border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#101828]">
                {conversation.name}
              </h3>
              {conversation.type === "doctor" && (
                <ShieldCheck className="w-4 h-4 text-[#0284C7]" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {conversation.specialty && (
                <span className="text-xs text-[#6A7282]">
                  {conversation.specialty}
                </span>
              )}
              {conversation.online && conversation.type === "doctor" && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  Available for Telehealth
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-xs font-semibold text-[#4A5565] rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <Phone className="w-3.5 h-3.5" />
            Callback
          </button>
          {conversation.type === "doctor" && (
            <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-[#1E3A5F] to-[#0284C7] text-white text-xs font-semibold rounded-xl hover:opacity-90 transition cursor-pointer">
              <Video className="w-3.5 h-3.5" />
              Start Telehealth
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-100 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#6A7282] hover:bg-gray-100 rounded-lg transition cursor-pointer">
              <Paperclip className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#6A7282] hover:bg-gray-100 rounded-lg transition cursor-pointer">
              <ImageIcon className="w-4 h-4" />
            </button>
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-2.5 px-4 border border-gray-200 rounded-xl text-sm text-[#101828] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition"
            onKeyDown={(e) => {
              if (e.key === "Enter" && newMessage.trim()) {
                setNewMessage("");
              }
            }}
          />
          <button
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
