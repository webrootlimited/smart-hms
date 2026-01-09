"use client";
import React, { useState, useTransition } from 'react';
import {
    Eye, Edit, Trash2, AlertTriangle, Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/actions/user.actions';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

export default function AllUsersTable({ users, setUsers }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendingUserId, setPendingUserId] = useState(null); // For loading state per user
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = users.slice(startIndex, endIndex);

    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, users.length);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const openDeleteModal = (userId) => {
        setPendingUserId(userId);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setPendingUserId(null);
    };

    const confirmDelete = () => {
        if (!pendingUserId) return;

        startTransition(async () => {
            try {
                const res = await deleteUser(pendingUserId);
                if (res.success) {
                    toast.success('User deleted successfully');
                    closeDeleteModal();
                    // Update state locally
                    return setUsers(prev => prev.filter(u => u._id !== pendingUserId));
                } else {
                    toast.error(res.message);
                }

            } catch (error) {
                console.log(error);

                toast.error('Failed to delete user');
            }
        });
    };

    const userToDelete = users.find(u => u._id === pendingUserId);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="">
                {/* Users Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {users.length} total users found
                        </p>
                    </div>

                    {/* Table */}
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
                                                    {user.fullName?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4">
                                            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                                                {user.role}
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
                                                • {user.status}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <span className="text-sm text-gray-600">
                                                {user.lastLogin || 'Never'}
                                            </span>
                                        </td>

                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <Eye
                                                    className="w-4 h-4 text-sky-600 cursor-pointer"
                                                    onClick={() => router.push(`/admin/user-management/${user._id}/edit`)}
                                                />
                                                <Edit onClick={() => router.push(`/admin/user-management/${user._id}/edit`)} className="w-4 h-4 text-green-600 cursor-pointer" />
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

                    {/* Pagination */}
                    <div className="flex sm:flex-row flex-col gap-5 items-center justify-between mt-6">
                        <p className="text-sm text-gray-600">
                            Showing {startItem}-{endItem} of {users.length} users
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm rounded-lg disabled:opacity-50"
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPage === page
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm rounded-lg disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Styled Delete Confirmation Modal */}
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
                            Are you sure you want to delete <strong>{userToDelete?.fullName}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={closeDeleteModal}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
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