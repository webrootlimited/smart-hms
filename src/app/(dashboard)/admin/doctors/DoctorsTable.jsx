'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function AllDoctors({ doctors = [] }) {
    const [viewMode, setViewMode] = useState('card');

    // Optional: fallback message if no doctors
    if (doctors.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">No doctors found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Whole section white background */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 p-4 sm:p-6 lg:p-8">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">All Doctors</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">{doctors.length} doctors registered</p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`w-full sm:w-auto px-5 py-2 hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2 rounded-lg shadow-sm border border-gray-200 transition-all text-sm sm:text-base ${viewMode === 'list'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            List View
                        </button>

                        <button
                            onClick={() => setViewMode('card')}
                            className={`w-full sm:w-auto px-5 py-2 flex items-center justify-center gap-2 rounded-lg shadow-sm border border-gray-200 transition-all text-sm sm:text-base ${viewMode === 'card'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                />
                            </svg>
                            Card View
                        </button>
                    </div>
                </div>

                {/* Card View */}
                {viewMode === 'card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                        {doctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                            >
                                <div className="p-4 sm:p-6">
                                    {/* HEADER */}
                                    <div className="flex items-start justify-between mb-4 gap-2">
                                        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                            <div
                                                className={`${doctor.avatarColor || 'bg-blue-600'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-white text-lg sm:text-xl font-semibold flex-shrink-0`}
                                            >
                                                {doctor.initials || doctor.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-base sm:text-lg truncate">{doctor.fullName}</h3>
                                                <p className="text-sm sm:text-base text-gray-600 truncate">{doctor.specialty}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 flex-shrink-0">
                                            <svg
                                                className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                            </svg>
                                            <span className="font-medium text-sm sm:text-base">{doctor.rating || 'N/A'}</span>
                                        </div>
                                    </div>

                                    {/* DETAILS */}
                                    <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                            <div
                                                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${doctor.status === 'Active' ? 'bg-green-500' :
                                                    doctor.status === 'On Leave' ? 'bg-yellow-500' :
                                                        doctor.status === 'Inactive' ? 'bg-gray-500' :
                                                            'bg-gray-500'
                                                    } flex-shrink-0`}
                                            />
                                            <span className="font-medium">{doctor.status || 'Unknown'}</span>
                                            <span className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs">
                                                {doctor.specialty}
                                            </span>
                                        </div>

                                        <div className="flex items-start gap-2 text-gray-600">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="break-words">{doctor.location || 'Not specified'}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Next available: {doctor.nextAvailable || 'N/A'}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span>{doctor.patientsServed || 0} patients served</span>
                                        </div>
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                                        <Link
                                            href={`/admin/doctors/${doctor._id}`}
                                            className="flex-1 text-center border border-blue-400 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 hover:text-white transition"
                                        >
                                            View Profile
                                        </Link>

                                        <button className="p-2 sm:p-2.5 border border-gray-300 rounded-lg transition cursor-pointer hover:bg-blue-600 hover:text-white">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>

                                        <button className="p-2 sm:p-2.5 border border-gray-300 rounded-lg transition hover:bg-blue-600 hover:text-white cursor-pointer">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                        <div className="space-y-3 sm:space-y-4">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor.id}
                                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                        <div className="flex items-start sm:items-center gap-3 sm:gap-5 flex-1 min-w-0">
                                            <div
                                                className={`${doctor.avatarColor || 'bg-blue-600'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-white text-lg sm:text-xl font-semibold flex-shrink-0`}
                                            >
                                                {doctor.initials || doctor.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                                    <h3 className="font-semibold text-base sm:text-lg truncate">{doctor.fullName}</h3>
                                                    <div className="flex items-center gap-1 mt-1 sm:mt-0">
                                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                        </svg>
                                                        <span className="font-medium text-sm sm:text-base">{doctor.rating || 'N/A'}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 text-xs sm:text-sm mt-1 truncate">{doctor.specialty}</p>
                                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${doctor.status === 'Active' ? 'bg-green-500' :
                                                            doctor.status === 'On Leave' ? 'bg-yellow-500' :
                                                                'bg-gray-500'
                                                            }`} />
                                                        {doctor.status || 'Unknown'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <span className="truncate">{doctor.location || 'Not specified'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Next: {doctor.nextAvailable || 'N/A'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                        </svg>
                                                        {doctor.patientsServed || 0} served
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 sm:gap-3 lg:ml-6">
                                            <Link
                                                href={`/admin/doctors/${doctor._id}`}
                                                className="flex-1 lg:flex-none border border-blue-400 text-blue-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 hover:text-white transition whitespace-nowrap"
                                            >
                                                View Profile
                                            </Link>
                                            <button className="p-2 sm:p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="p-2 sm:p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pagination - adjust as needed for real pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 border-t border-gray-200 pt-4 sm:pt-6 lg:pt-8 gap-4">
                    <p className="text-xs sm:text-sm text-gray-600">Showing 1-{doctors.length} of {doctors.length} doctors</p>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-medium">1</button>
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}