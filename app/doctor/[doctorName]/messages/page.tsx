"use client";

import { Search, Send, Paperclip } from "lucide-react";
import { useState } from "react";

const CONVERSATIONS = [
  { id: "1", name: "James Wilson", lastMsg: "Thank you, Doctor. I'll follow the prescription.", time: "10:30 AM", unread: 2, avatar: "JW" },
  { id: "2", name: "Emma Davis", lastMsg: "When should I schedule my next MRI?", time: "9:15 AM", unread: 1, avatar: "ED" },
  { id: "3", name: "Robert Chen", lastMsg: "Blood pressure has been stable this week.", time: "Yesterday", unread: 0, avatar: "RC" },
  { id: "4", name: "Nurse Emily", lastMsg: "Patient in Room 312 needs attention.", time: "Yesterday", unread: 0, avatar: "NE" },
  { id: "5", name: "Dr. Mitchell", lastMsg: "Can you consult on the ECG results?", time: "Dec 8", unread: 0, avatar: "DM" },
];

export default function DoctorMessagesPage() {
  const [selected, setSelected] = useState("1");
  const activeConvo = CONVERSATIONS.find((c) => c.id === selected);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[#101828]">Messages</h1>
        <p className="text-sm text-[#6A7282]">Communicate with patients and staff</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" style={{ height: "calc(100vh - 220px)" }}>
        {/* Conversations list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input type="text" placeholder="Search messages..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {CONVERSATIONS.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                className={`w-full flex items-center gap-3 p-3 text-left transition cursor-pointer ${
                  selected === c.id ? "bg-[#F0F9FF]" : "hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-[#4A5565]">{c.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#101828]">{c.name}</p>
                    <span className="text-[10px] text-[#6A7282]">{c.time}</span>
                  </div>
                  <p className="text-[11px] text-[#6A7282] truncate">{c.lastMsg}</p>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#0284C7] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#E5E7EB] flex items-center justify-center">
              <span className="text-xs font-bold text-[#4A5565]">{activeConvo?.avatar}</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#101828]">{activeConvo?.name}</p>
              <p className="text-[11px] text-[#16A34A]">Online</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-[#9CA3AF]">Select a conversation to start messaging</p>
          </div>
          <div className="p-3 border-t border-gray-100 flex items-center gap-2">
            <button className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center cursor-pointer">
              <Paperclip className="w-4 h-4 text-[#6A7282]" />
            </button>
            <input type="text" placeholder="Type a message..." className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]" />
            <button className="w-9 h-9 rounded-xl bg-[#0284C7] flex items-center justify-center hover:opacity-90 transition cursor-pointer">
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
