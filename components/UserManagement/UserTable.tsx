"use client";

import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import type { User } from "./types";

const ROLE_COLORS: Record<string, string> = {
  Doctor: "bg-[#EFF6FF] text-[#0284C7]",
  Nurse: "bg-[#FAF5FF] text-[#9333EA]",
  Admin: "bg-[#FFF7ED] text-[#EA580C]",
  Staff: "bg-[#F0FDF4] text-[#16A34A]",
};

const STATUS_COLORS: Record<string, { dot: string; text: string }> = {
  Active: { dot: "bg-[#16A34A]", text: "text-[#16A34A]" },
  Inactive: { dot: "bg-[#EF4444]", text: "text-[#EF4444]" },
  Pending: { dot: "bg-[#F59E0B]", text: "text-[#F59E0B]" },
};

const AVATAR_COLORS = [
  "bg-[#EFF6FF] text-[#0284C7]",
  "bg-[#FAF5FF] text-[#9333EA]",
  "bg-[#FFF7ED] text-[#EA580C]",
  "bg-[#F0FDF4] text-[#16A34A]",
  "bg-[#FEF2F2] text-[#EF4444]",
  "bg-[#FFFBEB] text-[#D97706]",
  "bg-[#FDF2F8] text-[#DB2777]",
  "bg-[#ECFDF5] text-[#059669]",
];

export default function UserTable({
  users,
  page,
  totalPages,
  totalResults,
  perPage,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: {
  users: User[];
  page: number;
  totalPages: number;
  totalResults: number;
  perPage: number;
  onPageChange: (p: number) => void;
  onView: (u: User) => void;
  onEdit: (u: User) => void;
  onDelete: (u: User) => void;
}) {
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalResults);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-base font-bold text-[#101828]">All Users</h3>
        <p className="text-xs text-[#6A7282] mt-0.5">
          {totalResults} total users found
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-gray-100 text-xs font-semibold text-[#6A7282] uppercase tracking-wider">
              <th className="text-left px-5 py-3">User</th>
              <th className="text-left px-5 py-3">Role</th>
              <th className="text-left px-5 py-3">Department</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="text-left px-5 py-3">Last Login</th>
              <th className="text-left px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => {
              const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const roleColor = ROLE_COLORS[user.role] || ROLE_COLORS.Staff;
              const statusColor = STATUS_COLORS[user.status] || STATUS_COLORS.Active;

              return (
                <tr
                  key={user.id}
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition"
                >
                  {/* User */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${avatarColor}`}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#101828]">
                          {user.name}
                        </p>
                        <p className="text-xs text-[#6A7282]">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg ${roleColor}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="px-5 py-3.5 text-sm text-[#4A5565]">
                    {user.department}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${statusColor.dot}`}
                      />
                      <span className={`text-xs font-medium ${statusColor.text}`}>
                        {user.status}
                      </span>
                    </span>
                  </td>

                  {/* Last login */}
                  <td className="px-5 py-3.5 text-xs text-[#6A7282]">
                    {user.lastLogin}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onView(user)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#EFF6FF] transition cursor-pointer"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-[#0284C7]" />
                      </button>
                      <button
                        onClick={() => onEdit(user)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#FFF7ED] transition cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4 text-[#EA580C]" />
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#FEF2F2] transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-[#EF4444]" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-[#6A7282]">
          Showing {start}-{end} of {totalResults} users
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-[#4A5565]" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 rounded-lg text-xs font-semibold transition cursor-pointer ${
                p === page
                  ? "bg-[#0284C7] text-white"
                  : "border border-gray-200 text-[#4A5565] hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-[#4A5565]" />
          </button>
        </div>
      </div>
    </div>
  );
}
