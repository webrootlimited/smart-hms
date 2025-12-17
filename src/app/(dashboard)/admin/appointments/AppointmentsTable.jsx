'use client';

import React, { useState } from 'react';
import {
    Clock, Calendar, Laptop, CheckCircle, XCircle, Eye, Edit, Trash2,
    Download, Filter, ChevronLeft, ChevronRight, Building2
} from 'lucide-react';

const appointmentTypesData = [
    {
        id: 1,
        icon: <Calendar className="w-6 h-6" />,
        iconColor: 'bg-blue-100 text-blue-600',
        name: 'General Check',
        description: 'Routine health examination',
        duration: '30 min',
        mode: 'Both',
        modeColor: 'bg-cyan-100 text-cyan-700',
        status: 'Active',
        fee: '$75',
    },
    {
        id: 2,
        icon: <Calendar className="w-6 h-6" />,
        iconColor: 'bg-red-100 text-red-600',
        name: 'Cardiology Consultation',
        description: 'Heart health evaluation',
        duration: '45 min',
        mode: 'In-Clinic',
        modeColor: 'bg-blue-100 text-blue-700',
        status: 'Active',
        fee: '$150',
    },
    {
        id: 3,
        icon: <Laptop className="w-6 h-6" />,
        iconColor: 'bg-purple-100 text-purple-600',
        name: 'Telehealth Quick Consult',
        description: 'Virtual medical consultation',
        duration: '15 min',
        mode: 'Telehealth',
        modeColor: 'bg-purple-100 text-purple-700',
        status: 'Active',
        fee: '$45',
    },
    {
        id: 4,
        icon: <Calendar className="w-6 h-6" />,
        iconColor: 'bg-green-100 text-green-600',
        name: 'Follow-up Visit',
        description: 'Post-treatment follow-up',
        duration: '20 min',
        mode: 'Both',
        modeColor: 'bg-cyan-100 text-cyan-700',
        status: 'Active',
        fee: '$50',
    },
    {
        id: 5,
        icon: <Calendar className="w-6 h-6" />,
        iconColor: 'bg-pink-100 text-pink-600',
        name: 'Pediatric Checkup',
        description: 'Child health examination',
        duration: '30 min',
        mode: 'In-Clinic',
        modeColor: 'bg-blue-100 text-blue-700',
        status: 'Active',
        fee: '$85',
    },
    {
        id: 6,
        icon: <Calendar className="w-6 h-6" />,
        iconColor: 'bg-indigo-100 text-indigo-600',
        name: 'Mental Health Counsel',
        description: 'Psychology consultation',
        duration: '60 min',
        mode: 'Both',
        modeColor: 'bg-cyan-100 text-cyan-700',
        status: 'Active',
        fee: '$120',
    },
    {
        id: 7,
        icon: <Calendar className="w-6 h-6" />,
        iconColor: 'bg-blue-100 text-blue-600',
        name: 'Vaccination',
        description: 'Immunization service',
        duration: '10 min',
        mode: 'In-Clinic',
        modeColor: 'bg-blue-100 text-blue-700',
        status: 'Active',
        fee: '$30',
    },
    {
        id: 8,
        icon: <Laptop className="w-6 h-6" />,
        iconColor: 'bg-orange-100 text-orange-600',
        name: 'Lab Results Review',
        description: 'Test results review',
        duration: '15 min',
        mode: 'Telehealth',
        modeColor: 'bg-purple-100 text-purple-700',
        status: 'Inactive',
        fee: '$40',
    },
];

const ITEMS_PER_PAGE = 10;

export default function AppointmentTypesTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(appointmentTypesData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTypes = appointmentTypesData.slice(startIndex, endIndex);

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl space-y-6">
                {/* Filters Card */}
                <div className="bg-white rounded-3xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <span className="text-base font-medium text-gray-800">Filters</span>
                        </div>
                        <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                            Clear All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Appointment Mode"
                                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Duration"
                                className="w-full pl-11 pr-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Status"
                                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 text-sm font-medium rounded-2xl hover:bg-gray-200">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                        <span className="text-sm text-gray-600">Active Filters:</span>
                        <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-full">
                                All Modes
                                <button className="ml-1 hover:text-cyan-900">×</button>
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Active Types
                                <button className="ml-1 hover:text-green-900">×</button>
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                All Durations
                                <button className="ml-1 hover:text-purple-900">×</button>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Table Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">All Appointment Types</h2>
                                <p className="text-sm text-gray-500 mt-1">8 types configured</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-200">
                                Toggle Empty State
                            </button>
                        </div>
                    </div>

                    {/* Table */}
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
                                {currentTypes.map((type) => (
                                    <tr key={type.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl ${type.iconColor} flex items-center justify-center`}>
                                                    {type.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{type.name}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
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
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${type.modeColor}`}>
                                                {type.mode === 'In-Clinic' && <Building2 className="w-3 h-3" />}
                                                {type.mode === 'Telehealth' && <Laptop className="w-3 h-3" />}
                                                {type.mode}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full ${type.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {type.status === 'Active' ? (
                                                    <CheckCircle className="w-3.5 h-3.5" />
                                                ) : (
                                                    <XCircle className="w-3.5 h-3.5" />
                                                )}
                                                {type.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 text-sm font-medium rounded-full">
                                                {type.fee}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <button className="text-blue-600 hover:text-blue-800">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="text-green-600 hover:text-green-800">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing 1–8 of 8 types
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>

                            <div className="flex items-center gap-2">
                                <button className="w-9 h-9 rounded-xl bg-blue-600 text-white text-sm font-medium">
                                    1
                                </button>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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