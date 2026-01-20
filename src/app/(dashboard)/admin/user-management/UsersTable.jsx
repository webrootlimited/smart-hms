'use client';
import React, { useState, useTransition, useEffect } from 'react';
import {
    Eye, Edit, Trash2, AlertTriangle, Loader2,
    Search, X, Filter, Download
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/user.actions';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;
const ROLES = ['patient', 'admin', 'doctor', 'receptionist', 'nurse', 'billing_officer'];
const STATUS = ['pending', 'active', 'suspended'];

function UsersFilters({ users, setFilteredUsers }) {
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        let filtered = [...users];

        // Filter by search
        if (search.trim()) {
            const q = search.toLowerCase();
            filtered = filtered.filter(
                u =>
                    (u.fullName?.toLowerCase().includes(q)) ||
                    (u.email?.toLowerCase().includes(q)) ||
                    (u._id?.toLowerCase().includes(q))
            );
        }

        // Filter by role
        if (role) {
            filtered = filtered.filter(u => u.role === role);
        }

        // Filter by status
        if (status) {
            filtered = filtered.filter(u => u.status === status);
        }

        setFilteredUsers(filtered);
    }, [search, role, status, users, setFilteredUsers]);

    const clearFilters = () => {
        setSearch('');
        setRole('');
        setStatus('');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <h3 className="text-sm font-medium text-gray-900">Filters</h3>
                </div>
                <button
                    onClick={clearFilters}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                    Clear All
                </button>
            </div>

            {/* Filter Inputs */}
            <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Search Users
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Name, email, or ID..."
                                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Role
                        </label>
                        <select
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Any</option>
                            {ROLES.map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Any</option>
                            {STATUS.map(s => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Active Filters & Export */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-gray-700">Active Filters:</span>
                        {search && (
                            <button className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors">
                                {search} <X className="w-3 h-3" />
                            </button>
                        )}
                        {role && (
                            <button className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors">
                                {role} <X className="w-3 h-3" />
                            </button>
                        )}
                        {status && (
                            <button className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors">
                                {status} <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>

                    <button className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        <Download className="w-3.5 h-3.5" />
                        Export CSV
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AllUsersTable({ users, setUsers }) {
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendingUserId, setPendingUserId] = useState(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, filteredUsers.length);

    const handlePrevious = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
    const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
    const goToPage = (page) => { setCurrentPage(page); };

    const openDeleteModal = (userId) => { setPendingUserId(userId); setShowDeleteModal(true); };
    const closeDeleteModal = () => { setShowDeleteModal(false); setPendingUserId(null); };

    const confirmDelete = () => {
        if (!pendingUserId) return;
        startTransition(async () => {
            try {
                const res = await deleteUser(pendingUserId);
                if (res.success) {
                    toast.success('User deleted successfully');
                    closeDeleteModal();
                    setUsers(prev => prev.filter(u => u._id !== pendingUserId));
                } else {
                    toast.error(res.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete user');
            }
        });
    };

    const userToDelete = users.find(u => u._id === pendingUserId);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Filters Panel */}
                <UsersFilters users={users} setFilteredUsers={setFilteredUsers} />

                {/* Users Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {filteredUsers.length} total users found
                        </p>
                    </div>

                    {/* Table */}
                    {filteredUsers.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 rounded-2xl bg-white shadow-sm">
                            No users found.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 font-medium">
                                        <th className="text-left pb-4 font-medium text-sm">User</th>
                                        <th className="text-left pb-4 font-medium text-sm">Role</th>
                                        <th className="text-left pb-4 font-medium text-sm">Department</th>
                                        <th className="text-left pb-4 font-medium text-sm">Status</th>
                                        <th className="text-left pb-4 font-medium text-sm">Last Login</th>
                                        <th className="text-left pb-4 font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                                                        {user.fullName?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{user.fullName || '—'}</p>
                                                        <p className="text-xs text-gray-500">{user.email || '—'}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="py-4">
                                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                                    {user.role || '—'}
                                                </span>
                                            </td>

                                            <td className="py-4">
                                                <span className="text-sm text-gray-700">
                                                    {(() => {
                                                        if (user.role === 'Doctor' && user.doctorProfile?.workLocations?.length) {
                                                            return user.doctorProfile.workLocations
                                                                .flatMap(loc => loc.departments || [])
                                                                .join(', ') || '—';
                                                        }
                                                        if (user.staffProfile?.workLocation?.departments?.length) {
                                                            return user.staffProfile.workLocation.departments.join(', ');
                                                        }
                                                        return '—';
                                                    })()}
                                                </span>
                                            </td>

                                            <td className="py-4">
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : user.status === 'Inactive'
                                                        ? 'bg-gray-100 text-gray-600'
                                                        : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    • {user.status || 'Unknown'}
                                                </span>
                                            </td>

                                            <td className="py-4">
                                                <span className="text-sm text-gray-600">
                                                    {user.lastLoginAt
                                                        ? new Date(user.lastLoginAt).toISOString().slice(0, 10)
                                                        : 'Never'}
                                                </span>
                                            </td>

                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <Eye
                                                        className="w-4 h-4 text-sky-600 cursor-pointer hover:text-sky-700"
                                                        onClick={() => router.push(`/admin/user-management/${user._id}/edit`)}
                                                    />
                                                    <Edit
                                                        className="w-4 h-4 text-green-600 cursor-pointer hover:text-green-700"
                                                        onClick={() => router.push(`/admin/user-management/${user._id}/edit`)}
                                                    />
                                                    <Trash2
                                                        className="w-4 h-4 text-red-600 cursor-pointer hover:text-red-700"
                                                        onClick={() => openDeleteModal(user._id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredUsers.length > 0 && (
                        <div className="flex sm:flex-row flex-col gap-5 items-center justify-between mt-6">
                            <p className="text-sm text-gray-600">
                                Showing {startItem}-{endItem} of {filteredUsers.length} users
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrevious}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                                >
                                    Previous
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100 border border-gray-300'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Delete User?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{userToDelete?.fullName || 'this user'}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={closeDeleteModal}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete User'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
