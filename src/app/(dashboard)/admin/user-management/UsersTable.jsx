"use client";
import React, { useState } from 'react';
import {
    Eye, Edit, MoreVertical, ChevronLeft, ChevronRight,
    Search, Filter, Users, UserCheck, Building2, MapPin, Download
} from 'lucide-react';

const usersData = [
    { id: 1, initials: 'SJ', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', role: 'Doctor', roleColor: 'bg-blue-100 text-blue-700', department: 'Cardiology', status: 'Active', lastLogin: '2 hours ago', bgColor: 'bg-purple-600' },
    { id: 2, initials: 'MC', name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', role: 'Doctor', roleColor: 'bg-blue-100 text-blue-700', department: 'Neurology', status: 'Active', lastLogin: '5 hours ago', bgColor: 'bg-purple-600' },
    { id: 3, initials: 'EM', name: 'Emily Martinez', email: 'emily.martinez@hospital.com', role: 'Nurse', roleColor: 'bg-green-100 text-green-700', department: 'Emergency', status: 'Active', lastLogin: '1 hour ago', bgColor: 'bg-orange-500' },
    { id: 4, initials: 'JW', name: 'James Wilson', email: 'james.wilson@hospital.com', role: 'Admin', roleColor: 'bg-pink-100 text-pink-700', department: 'Administration', status: 'Active', lastLogin: '30 mins ago', bgColor: 'bg-purple-600' },
    { id: 5, initials: 'LA', name: 'Dr. Lisa Anderson', email: 'lisa.anderson@hospital.com', role: 'Doctor', roleColor: 'bg-blue-100 text-blue-700', department: 'Pediatrics', status: 'Inactive', lastLogin: '3 days ago', bgColor: 'bg-purple-600' },
    { id: 6, initials: 'RT', name: 'Robert Taylor', email: 'robert.taylor@hospital.com', role: 'Staff', roleColor: 'bg-gray-100 text-gray-700', department: 'Laboratory', status: 'Active', lastLogin: '4 hours ago', bgColor: 'bg-red-600' },
    { id: 7, initials: 'AW', name: 'Dr. Amanda White', email: 'amanda.white@hospital.com', role: 'Doctor', roleColor: 'bg-blue-100 text-blue-700', department: 'Orthopedics', status: 'Active', lastLogin: '1 day ago', bgColor: 'bg-purple-600' },
    { id: 8, initials: 'DB', name: 'Daniel Brown', email: 'daniel.brown@hospital.com', role: 'Nurse', roleColor: 'bg-green-100 text-green-700', department: 'ICU', status: 'Pending', lastLogin: 'Never', bgColor: 'bg-purple-600' },
];

const ITEMS_PER_PAGE = 5;

export default function AllUsersTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(usersData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = usersData.slice(startIndex, endIndex);

    const startItem = startIndex + 1;
    const endItem = Math.min(endIndex, usersData.length);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="">
                {/* Filter Bar */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Filter className="w-5 h-5" />
                            <span className="font-medium">Filters</span>
                        </div>
                        <button className="text-sky-500 text-sm font-medium hover:text-sky-600">
                            Clear All
                        </button>
                    </div>

                    {/* Filter Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Name, email, or ID..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            />
                        </div>

                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Role"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Status"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Department"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>

                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        </div>
                    </div>

                    {/* Active Filters + Export */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        {/* Left: Active Filters */}
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                            <span className="text-sm text-gray-600 whitespace-nowrap">
                                Active Filters:
                            </span>

                            <div className="flex flex-wrap items-center gap-2">
                                <span className="bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                                    All Roles
                                    <button className="ml-1 hover:text-sky-900">×</button>
                                </span>

                                <span className="bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                                    Active Users
                                    <button className="ml-1 hover:text-sky-900">×</button>
                                </span>
                            </div>
                        </div>

                        {/* Right: Export Button */}
                        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium self-start sm:self-auto">
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>

                </div>

                {/* Users Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">All Users</h2>
                        <p className="text-sm text-gray-500 mt-1">{usersData.length} total users found</p>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left pb-4">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">User</span>
                                    </th>
                                    <th className="text-left pb-4">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Role</span>
                                    </th>
                                    <th className="text-left pb-4">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Department</span>
                                    </th>
                                    <th className="text-left pb-4">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                                    </th>
                                    <th className="text-left pb-4">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</span>
                                    </th>
                                    <th className="text-left pb-4">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full ${user.bgColor} text-white flex items-center justify-center text-sm font-medium`}>
                                                    {user.initials}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${user.roleColor}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className="text-sm text-gray-700">{user.department}</span>
                                        </td>
                                        <td className="py-4">
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                user.status === 'Inactive' ? 'bg-gray-100 text-gray-600' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                • {user.status}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <span className="text-sm text-gray-600">{user.lastLogin}</span>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <button className="text-[#0284C7] hover:text-blue-800">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-[#009966] hover:text-green-800">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-[#9810FA] hover:text-purple-800">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
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
                            Showing {startItem}-{endItem} of {usersData.length} users
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-1">
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
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}