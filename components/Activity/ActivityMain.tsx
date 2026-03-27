"use client";

import { useState } from "react";
import { Search, Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import ActivityHeader from "./ActivityHeader";
import ActivityTimeline from "./ActivityTimeline";
import { ActivityLogsResponse } from "./types";

const CATEGORIES = ["All Activity", "Login", "Admin", "System", "Patient", "Appointment"];
const PER_PAGE = 10;

export default function ActivityMain() {
  const [activeCategory, setActiveCategory] = useState("All Activity");
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [page, setPage] = useState(1);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(
      setTimeout(() => {
        setSearchDebounce(value);
        setPage(1);
      }, 300)
    );
  };

  const categoryParam = activeCategory === "All Activity" ? "" : activeCategory.toLowerCase();

  const { data, isLoading } = useQuery({
    queryKey: ["activityLogs", categoryParam, searchDebounce, page],
    queryFn: async () => {
      const params = new URLSearchParams({ page: String(page), limit: String(PER_PAGE) });
      if (categoryParam) params.set("category", categoryParam);
      if (searchDebounce.trim()) params.set("search", searchDebounce.trim());
      return apiFetch<ActivityLogsResponse>(`/api/admin/activity-logs?${params}`);
    },
  });

  const logs = data?.logs ?? [];
  const stats = data?.stats;
  const pagination = data?.pagination;

  return (
    <div className="space-y-5">
      <ActivityHeader stats={stats} />

      {/* Filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-100 p-1 shadow-sm overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
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

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search logs..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] w-56"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="min-h-50">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 text-[#0284C7] animate-spin" />
          </div>
        ) : logs.length > 0 ? (
          <ActivityTimeline logs={logs} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center">
            <p className="text-sm text-[#6A7282]">No activity logs found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1.5 text-xs font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 rounded-lg transition disabled:opacity-40 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-xs text-[#6A7282]">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
            disabled={page >= pagination.totalPages}
            className="px-3 py-1.5 text-xs font-medium text-[#4A5565] bg-gray-50 hover:bg-gray-100 rounded-lg transition disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
