"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

const PREFS = [
  { id: "email", label: "Email Notifications", desc: "Send system alerts via email", defaultOn: true },
  { id: "critical", label: "Critical Alerts", desc: "Notify admins of system issues", defaultOn: true },
];

export default function NotificationPreferences() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFS.map((p) => [p.id, p.defaultOn]))
  );

  const toggle = (id: string) =>
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] flex items-center justify-center">
          <Bell className="w-4 h-4 text-[#EA580C]" />
        </div>
        <div>
          <h2 className="text-base font-bold text-[#101828]">Notification Preferences</h2>
          <p className="text-xs text-[#6A7282]">System-wide notification settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PREFS.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-semibold text-[#101828]">{p.label}</p>
              <p className="text-xs text-[#6A7282]">{p.desc}</p>
            </div>
            <button
              onClick={() => toggle(p.id)}
              className={`w-11 h-6 rounded-full relative transition cursor-pointer shrink-0 ml-3 ${
                toggles[p.id] ? "bg-[#16A34A]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                  toggles[p.id] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
