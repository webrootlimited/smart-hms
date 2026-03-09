"use client";

import { useState, useMemo } from "react";
import { Search, LayoutGrid, List, Bell, Pencil, Eye } from "lucide-react";
import { templates, CATEGORIES } from "./mockData";
import NotificationsHeader from "./NotificationsHeader";
import NotificationCard from "./NotificationCard";
import type { NotificationTemplate, NotificationCategory } from "./types";

export default function NotificationsMain() {
  const [activeCategory, setActiveCategory] = useState<NotificationCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"card" | "list">("card");

  const filtered = useMemo(() => {
    let result = templates;
    if (activeCategory !== "All") {
      result = result.filter((t) => t.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search]);

  const smsCount = templates.filter((t) => t.channels.includes("SMS")).length;
  const emailCount = templates.filter((t) => t.channels.includes("Email")).length;

  return (
    <div className="space-y-5">
      <NotificationsHeader
        total={templates.length}
        active={templates.length}
        smsCount={smsCount}
        emailCount={emailCount}
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                activeCategory === cat.value
                  ? "bg-[#0284C7] text-white"
                  : "bg-gray-100 text-[#6A7282] hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7282]" />
            <input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl w-60 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7]"
            />
          </div>
          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setView("card")}
              className={`p-2 transition cursor-pointer ${view === "card" ? "bg-[#0284C7] text-white" : "text-[#6A7282] hover:bg-gray-50"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 transition cursor-pointer ${view === "list" ? "bg-[#0284C7] text-white" : "text-[#6A7282] hover:bg-gray-50"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Card view */}
      {view === "card" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((template) => (
            <NotificationCard key={template.id} template={template} />
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-semibold text-[#6A7282] px-5 py-3">Template</th>
                <th className="text-left text-xs font-semibold text-[#6A7282] px-5 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-[#6A7282] px-5 py-3">Channels</th>
                <th className="text-left text-xs font-semibold text-[#6A7282] px-5 py-3">Variables</th>
                <th className="text-right text-xs font-semibold text-[#6A7282] px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <NotificationRow key={t.id} template={t} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── List view row ─── */

const CHANNEL_STYLES: Record<string, { bg: string; text: string }> = {
  SMS: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]" },
  Email: { bg: "bg-[#EFF6FF]", text: "text-[#0284C7]" },
  Push: { bg: "bg-[#FAF5FF]", text: "text-[#7C3AED]" },
  WhatsApp: { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]" },
};

function NotificationRow({ template: t }: { template: NotificationTemplate }) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${t.bgColor} flex items-center justify-center shrink-0`}>
            <Bell className={`w-3.5 h-3.5 ${t.color}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#101828]">{t.name}</p>
            <p className="text-xs text-[#6A7282] truncate max-w-xs">{t.description}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${t.bgColor} ${t.color}`}>
          {t.category}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1">
          {t.channels.map((ch) => (
            <span key={ch} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${CHANNEL_STYLES[ch].bg} ${CHANNEL_STYLES[ch].text}`}>
              {ch}
            </span>
          ))}
        </div>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex flex-wrap gap-1">
          {t.variables.slice(0, 3).map((v) => (
            <span key={v} className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-[#4A5565] rounded">
              {v}
            </span>
          ))}
          {t.variables.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-gray-100 text-[#4A5565] rounded">
              +{t.variables.length - 3}
            </span>
          )}
        </div>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <Pencil className="w-3.5 h-3.5 text-[#6A7282]" />
          </button>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <Eye className="w-3.5 h-3.5 text-[#6A7282]" />
          </button>
        </div>
      </td>
    </tr>
  );
}
