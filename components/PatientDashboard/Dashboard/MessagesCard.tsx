"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const messages = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    initials: "SS",
    color: "#7C3AED",
    time: "8:24 AM",
    text: "Your test results are ready for r...",
  },
  {
    id: 2,
    name: "Dr. Mark Chan",
    initials: "MC",
    color: "#0284C7",
    time: "Yesterday",
    text: "Please remember to fast for 8 ...",
  },
];

export default function MessagesCard() {
  const params = useParams();
  const base = `/patient/${params.patientName}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-[#101828]">Messages</h3>
        <Link
          href={`${base}/messages`}
          className="text-xs font-semibold text-[#0284C7] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: msg.color }}
            >
              {msg.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#101828]">{msg.name}</p>
                <p className="text-[10px] text-[#6A7282]">{msg.time}</p>
              </div>
              <p className="text-xs text-[#6A7282] truncate mt-0.5">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
