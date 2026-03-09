import { Bell, Pencil, Eye } from "lucide-react";
import type { NotificationTemplate, NotificationChannel } from "./types";

const CHANNEL_STYLES: Record<NotificationChannel, { bg: string; text: string }> = {
  SMS: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]" },
  Email: { bg: "bg-[#EFF6FF]", text: "text-[#0284C7]" },
  Push: { bg: "bg-[#FAF5FF]", text: "text-[#7C3AED]" },
  WhatsApp: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]" },
};

export default function NotificationCard({ template }: { template: NotificationTemplate }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg ${template.bgColor} flex items-center justify-center`}>
          <Bell className={`w-4 h-4 ${template.color}`} />
        </div>
        <div className="flex items-center gap-1.5">
          {template.channels.map((ch) => (
            <span
              key={ch}
              className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${CHANNEL_STYLES[ch].bg} ${CHANNEL_STYLES[ch].text}`}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Name & description */}
      <h3 className="text-sm font-bold text-[#101828] mb-1">{template.name}</h3>
      <p className="text-xs text-[#6A7282] leading-relaxed mb-3 flex-1">{template.description}</p>

      {/* Variables */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {template.variables.map((v) => (
          <span key={v} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-[#4A5565] rounded">
            {v}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <Pencil className="w-3 h-3" /> Edit Template
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold bg-[#0284C7] text-white rounded-xl hover:opacity-90 transition cursor-pointer">
          <Eye className="w-3 h-3" /> Preview
        </button>
      </div>
    </div>
  );
}
