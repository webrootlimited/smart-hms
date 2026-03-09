"use client";

import { useState, useMemo } from "react";
import { Search, Download } from "lucide-react";
import ActivityHeader from "./ActivityHeader";
import ActivityTimeline from "./ActivityTimeline";
import { CATEGORIES, ACTIVITY_LOGS } from "./mockData";

const PER_PAGE = 6;

export default function ActivityMain() {
  const [activeCategory, setActiveCategory] = useState("All Activity");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);

  const filtered = useMemo(() => {
    let logs = ACTIVITY_LOGS;
    if (activeCategory !== "All Activity") {
      const key = activeCategory.toLowerCase();
      logs = logs.filter((l) => l.category === key);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.action.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.user.toLowerCase().includes(q)
      );
    }
    return logs;
  }, [activeCategory, search]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-5">
      <ActivityHeader />

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Category tabs */}
        <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 p-1 shadow-sm overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(PER_PAGE); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#0284C7] text-white"
                  : "text-[#6A7282] hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + Export */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PER_PAGE); }}
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] w-56"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Timeline */}
      {visible.length > 0 ? (
        <ActivityTimeline logs={visible} />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
          <p className="text-sm text-[#6A7282]">No activity logs found</p>
        </div>
      )}

      {/* Load More */}
      {visibleCount < filtered.length && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((c) => c + PER_PAGE)}
            className="px-6 py-2.5 text-sm font-semibold text-[#0284C7] border border-[#0284C7] rounded-xl hover:bg-[#F0F9FF] transition cursor-pointer"
          >
            Load More Events
          </button>
        </div>
      )}
    </div>
  );
}
