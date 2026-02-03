'use client';

import React, { useState, useEffect } from 'react';
import {
    Clock, Calendar, Laptop, CheckCircle, XCircle, Eye, Edit, Trash2,
    Download, Filter, ChevronLeft, ChevronRight, Building2, Search, AlertTriangle, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getAppointmentTypes, deleteAppointmentType } from '@/actions/appointmentType.actions';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

export default function AppointmentTypesTable() {
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [filteredTypes, setFilteredTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [modeFilter, setModeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [durationFilter, setDurationFilter] = useState('all');
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getAppointmentTypes();
            if (res.success) {
                setAppointmentTypes(res.data);
                setFilteredTypes(res.data);
            } else {
                toast.error('Failed to load appointment types');
            }
        } catch {
            toast.error('Error loading data');
        } finally {
            setLoading(false);
        }
    };

    // Apply filters
    useEffect(() => {
        let result = [...appointmentTypes];

        // Search
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase().trim();
            result = result.filter(t =>
                t.typeName?.toLowerCase().includes(term) ||
                t.description?.toLowerCase().includes(term)
            );
        }

        // Mode filter
        if (modeFilter !== 'all') {
            result = result.filter(t => t.visitType === modeFilter);
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(t => t.status?.toLowerCase() === statusFilter.toLowerCase());
        }

        // Duration filter
        if (durationFilter !== 'all') {
            const minutes = parseInt(durationFilter);
            result = result.filter(t => {
                const dur = t.duration?.toLowerCase();
                return dur?.includes(minutes + ' min') || dur?.includes(minutes + 'min');
            });
        }

        setFilteredTypes(result);
        setCurrentPage(1);
    }, [searchTerm, modeFilter, statusFilter, durationFilter, appointmentTypes]);

    const totalPages = Math.ceil(filteredTypes.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageItems = filteredTypes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const clearAllFilters = () => {
        setSearchTerm('');
        setModeFilter('all');
        setStatusFilter('all');
        setDurationFilter('all');
    };

    const handleDeleteClick = (id) => {
        setDeletingId(id);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setDeletingId(null);
    };

    const confirmDelete = async () => {
        if (!deletingId) return;
        setIsDeleting(true);

        try {
            const res = await deleteAppointmentType(deletingId);
            if (res.success) {
                toast.success('Appointment type deleted successfully');
                fetchData();
            } else {
                toast.error(res.message || 'Failed to delete');
            }
        } catch {
            toast.error('Something went wrong');
        } finally {
            setIsDeleting(false);
            closeDeleteModal();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-6xl space-y-6 p-4 md:p-0">

                {/* Filters Card */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <span className="text-base font-medium text-gray-800">Filters</span>
                        </div>
                        <button
                            onClick={clearAllFilters}
                            className="text-blue-500 text-sm font-medium hover:text-blue-600 cursor-pointer"
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or description..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={modeFilter}
                                onChange={e => setModeFilter(e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                            >
                                <option value="all">All Modes</option>
                                <option value="In-Clinic">In-Clinic</option>
                                <option value="Telehealth">Telehealth</option>
                                <option value="Both">Both</option>
                            </select>
                        </div>

                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={durationFilter}
                                onChange={e => setDurationFilter(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                            >
                                <option value="all">All Durations</option>
                                <option value="10">10 min</option>
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="45">45 min</option>
                                <option value="60">60 min</option>
                            </select>
                        </div>

                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-medium rounded-2xl hover:bg-gray-200 whitespace-nowrap md:col-start-4">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>

                    <div className="mt-5 flex items-center gap-3 flex-wrap">
                        <span className="text-sm text-gray-600">Active Filters:</span>
                        {searchTerm && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                                Search: {searchTerm}
                                <button className="ml-1 hover:text-cyan-900 cursor-pointer" onClick={() => setSearchTerm('')}>×</button>
                            </span>
                        )}
                        {modeFilter !== 'all' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                {modeFilter}
                                <button className="ml-1 hover:text-blue-900 cursor-pointer" onClick={() => setModeFilter('all')}>×</button>
                            </span>
                        )}
                        {durationFilter !== 'all' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                {durationFilter} min
                                <button className="ml-1 hover:text-purple-900 cursor-pointer" onClick={() => setDurationFilter('all')}>×</button>
                            </span>
                        )}
                        {statusFilter !== 'all' && (
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
                                <button className="ml-1 hover:text-green-900 cursor-pointer" onClick={() => setStatusFilter('all')}>×</button>
                            </span>
                        )}
                    </div>
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">All Appointment Types</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {filteredTypes.length} type{filteredTypes.length !== 1 ? 's' : ''} found
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Type Name</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</span>
                                    </th>
                                    <th className="px-6 py-4 text-left">
                                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPageItems.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-12 text-center text-sm text-gray-500">
                                            No appointment types found
                                        </td>
                                    </tr>
                                ) : (
                                    currentPageItems.map((type) => (
                                        <tr key={type._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600`}>
                                                        <Calendar className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{type.typeName}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">{type.description || '—'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-orange-500" />
                                                    <span className="text-sm text-gray-700">{type.duration}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${type.visitType === 'In-Clinic' ? 'bg-blue-100 text-blue-700' :
                                                    type.visitType === 'Telehealth' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-cyan-100 text-cyan-700'
                                                    }`}>
                                                    {type.visitType === 'In-Clinic' && <Building2 className="w-3 h-3" />}
                                                    {type.visitType === 'Telehealth' && <Laptop className="w-3 h-3" />}
                                                    {type.visitType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${type.status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                    {type.status?.toLowerCase() === 'active' ? (
                                                        <CheckCircle className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <XCircle className="w-3.5 h-3.5" />
                                                    )}
                                                    {type.status ? type.status.charAt(0).toUpperCase() + type.status.slice(1) : '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                                                    {type.fee?.amount > 0 ? `${type.fee.amount} ${type.fee.currency || 'USD'}` : '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <Link href={`/admin/appointments/${type._id}`} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                                        <Eye className="w-5 h-5" />
                                                    </Link>
                                                    <Link href={`/admin/appointments/${type._id}?edit-mode=true`} className="text-green-600 hover:text-green-800 cursor-pointer">
                                                        <Edit className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(type._id)}
                                                        className="text-red-600 hover:text-red-800 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing {filteredTypes.length === 0 ? 0 : startIndex + 1}–
                            {Math.min(startIndex + ITEMS_PER_PAGE, filteredTypes.length)} of {filteredTypes.length} types
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    const page = currentPage <= 3 ? i + 1 : currentPage + i - 2;
                                    if (page > totalPages) return null;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-9 h-9 rounded-xl text-sm font-medium cursor-pointer ${currentPage === page
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Delete Appointment Type?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this appointment type? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={closeDeleteModal}
                                disabled={isDeleting}
                                className={`px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer ${isDeleting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className={`px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 ${isDeleting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}