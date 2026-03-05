"use client";

import { useState, useMemo } from "react";
import { users as allUsers } from "./mockData";
import type { User } from "./types";
import type { Filters } from "./UserFilters";
import UserManagementHeader from "./UserManagementHeader";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import {
  ViewUserDialog,
  EditUserDialog,
  DeleteUserDialog,
} from "./UserDialogs";

const PER_PAGE = 8;

const emptyFilters: Filters = {
  search: "",
  role: "",
  status: "",
  department: "",
};

export default function UserManagementMain() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [page, setPage] = useState(1);

  // Dialog state
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);


  // Filtered users
  const filtered = useMemo(() => {
    return allUsers.filter((u) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !u.name.toLowerCase().includes(q) &&
          !u.email.toLowerCase().includes(q) &&
          !u.id.includes(q)
        )
          return false;
      }
      if (filters.role && u.role !== filters.role) return false;
      if (filters.status && u.status !== filters.status) return false;
      if (filters.department && u.department !== filters.department) return false;
      return true;
    });
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // Stats
  const activeUsers = allUsers.filter((u) => u.status === "Active").length;
  const inactiveUsers = allUsers.filter((u) => u.status === "Inactive").length;

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <UserManagementHeader
        totalUsers={allUsers.length}
        activeUsers={activeUsers}
        inactiveUsers={inactiveUsers}
        newThisWeek={3}
      />

      <UserFilters
        filters={filters}
        onChange={handleFilterChange}
        onClear={() => handleFilterChange(emptyFilters)}
      />

      <UserTable
        users={paged}
        page={currentPage}
        totalPages={totalPages}
        totalResults={filtered.length}
        perPage={PER_PAGE}
        onPageChange={setPage}
        onView={setViewUser}
        onEdit={setEditUser}
        onDelete={setDeleteUser}
      />

      {/* Dialogs */}
      <ViewUserDialog
        user={viewUser}
        open={!!viewUser}
        onClose={() => setViewUser(null)}
      />
      <EditUserDialog
        user={editUser}
        open={!!editUser}
        onClose={() => setEditUser(null)}
      />
      <DeleteUserDialog
        user={deleteUser}
        open={!!deleteUser}
        onClose={() => setDeleteUser(null)}
      />
    </div>
  );
}
