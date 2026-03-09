import Link from "next/link";
import { Users, UserX, UserPlus, Plus } from "lucide-react";

export default function UserManagementHeader({
  totalUsers,
  activeUsers,
  inactiveUsers,
  newThisWeek,
}: {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newThisWeek: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center">
            <Users className="w-6 h-6 text-[#0284C7]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#101828]">User Management</h1>
            <p className="text-sm text-[#6A7282]">
              Manage all staff, providers, and patient accounts
            </p>
          </div>
        </div>
        <Link
          href="/admin/add-user"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284C7] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" /> Add New User
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        {[
          { icon: Users, label: "Active Users", value: activeUsers, color: "text-[#0284C7]", bg: "bg-[#EFF6FF]" },
          { icon: UserX, label: "Inactive", value: inactiveUsers, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]" },
          { icon: UserPlus, label: "New This Week", value: newThisWeek, color: "text-[#16A34A]", bg: "bg-[#F0FDF4]" },
          { icon: Users, label: "Total Users", value: totalUsers, color: "text-[#7C3AED]", bg: "bg-[#FAF5FF]" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
              <s.icon className={`w-4 h-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#101828]">{s.value}</p>
              <p className="text-xs text-[#6A7282]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
