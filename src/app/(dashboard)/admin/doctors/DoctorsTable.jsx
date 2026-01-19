'use client';

import Link from 'next/link';
import React, { useState, useTransition } from 'react';
import { AlertTriangle, Loader2, Ban, CheckCircle, Trash2 } from 'lucide-react';
import { deactivateUser, activateUser, deleteUser } from '@/actions/user.actions';
import toast from 'react-hot-toast';

export default function AllDoctors({ doctors = [], setDoctors }) {
    const [viewMode, setViewMode] = useState('card');
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [doctorToSuspend, setDoctorToSuspend] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);
    const [isPending, startTransition] = useTransition();

    if (doctors.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">No doctors found.</p>
            </div>
        );
    }

    const getStatusStyle = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'active') return 'text-green-600 font-medium';
        if (s === 'suspended') return 'text-red-600 font-medium';
        if (s === 'pending') return 'text-yellow-600 font-medium';
        return 'text-gray-600';
    };

    const getStatusDotColor = (status) => {
        const s = (status || '').toLowerCase();
        if (s === 'active') return 'bg-green-500';
        if (s === 'suspended') return 'bg-red-500';
        if (s === 'pending') return 'bg-yellow-500';
        return 'bg-gray-500';
    };

    const handleSuspendClick = (doctor) => {
        setDoctorToSuspend(doctor);
        setShowSuspendModal(true);
    };

    const handleDeleteClick = (doctor) => {
        setDoctorToDelete(doctor);
        setShowDeleteModal(true);
    };

    const confirmSuspend = () => {
        if (!doctorToSuspend) return;

        const isActivating = doctorToSuspend.status?.toLowerCase() === 'suspended';
        const newStatus = isActivating ? 'Active' : 'Suspended';

        startTransition(async () => {
            try {
                const result = isActivating
                    ? await activateUser(doctorToSuspend._id)
                    : await deactivateUser(doctorToSuspend._id);

                if (result?.success) {
                    toast.success(
                        isActivating
                            ? "Doctor account activated successfully"
                            : "Doctor account suspended successfully"
                    );

                    setDoctors((prevDoctors) =>
                        prevDoctors.map((doc) =>
                            doc._id === doctorToSuspend._id
                                ? { ...doc, status: newStatus }
                                : doc
                        )
                    );
                } else {
                    console.error('Action failed:', result?.error);
                    toast.error(result?.error || "Action failed");
                }
            } catch (err) {
                console.error('Error:', err);
                toast.error("Something went wrong");
            } finally {
                setShowSuspendModal(false);
                setDoctorToSuspend(null);
            }
        });
    };

    const confirmDelete = () => {
        if (!doctorToDelete) return;

        startTransition(async () => {
            try {
                const result = await deleteUser(doctorToDelete._id);
                if (result?.success) {
                    toast.success("Doctor account deleted successfully");

                    // Remove from local state
                    setDoctors((prevDoctors) =>
                        prevDoctors.filter((doc) => doc._id !== doctorToDelete._id)
                    );
                } else {
                    console.error('Delete failed:', result?.error);
                    toast.error(result?.error || "Failed to delete doctor");
                }
            } catch (err) {
                console.error('Error deleting doctor:', err);
                toast.error("Something went wrong");
            } finally {
                setShowDeleteModal(false);
                setDoctorToDelete(null);
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Header - unchanged */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6 p-4 sm:p-6 lg:p-8">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">All Doctors</h1>
                        <p className="text-sm sm:text-base text-gray-600 mt-1">{doctors.length} doctors registered</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`w-full sm:w-auto cursor-pointer px-5 py-2 flex items-center justify-center gap-2 rounded-lg shadow-sm border transition-all text-sm sm:text-base ${viewMode === 'list'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            List View
                        </button>

                        <button
                            onClick={() => setViewMode('card')}
                            className={`w-full sm:w-auto px-5 py-2 cursor-pointer flex items-center justify-center gap-2 rounded-lg shadow-sm border transition-all text-sm sm:text-base ${viewMode === 'card'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
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
                        {doctors.map((doctor) => {
                            const isSuspended = doctor.status?.toLowerCase() === 'suspended';
                            const hasProfilePic = doctor.profilePic && typeof doctor.profilePic === 'string' && doctor.profilePic.trim() !== '';
                            const initials = doctor.fullName
                                ?.split(' ')
                                .map(n => n[0])
                                .join('')
                                .toUpperCase() || '?';

                            // Location / Department handling
                            let locationsDisplay = 'Not specified';
                            if (doctor.doctorProfile?.workLocations) {
                                const workLocs = doctor.doctorProfile.workLocations;
                                if (Array.isArray(workLocs) && workLocs.length > 0) {
                                    locationsDisplay = workLocs
                                        .map(loc => loc.clinic?.fullAddress || loc.address || 'Unknown location')
                                        .filter(Boolean)
                                        .join(' • ');
                                } else if (workLocs?.clinic?.fullAddress) {
                                    locationsDisplay = workLocs.clinic.fullAddress;
                                }
                            }

                            return (
                                <div
                                    key={doctor._id}
                                    className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
                                >
                                    <div className="p-4 sm:p-6">
                                        {/* HEADER - Avatar update */}
                                        <div className="flex items-start justify-between mb-4 gap-2">
                                            <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                                                {hasProfilePic ? (
                                                    <img
                                                        src={doctor.profilePic}
                                                        alt={doctor.fullName}
                                                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover flex-shrink-0 border border-gray-200"
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                    />
                                                ) : null}
                                                <div
                                                    className={`${doctor.avatarColor || 'bg-blue-600'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-white text-lg sm:text-xl font-semibold flex-shrink-0 ${hasProfilePic ? 'hidden' : 'flex'}`}
                                                >
                                                    {initials}
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="font-semibold text-base sm:text-lg truncate">{doctor.fullName}</h3>
                                                    <p className="text-sm sm:text-base text-gray-600 truncate">{doctor.specialty}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 flex-shrink-0">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                                <span className="font-medium text-sm sm:text-base">{doctor.rating || 'N/A'}</span>
                                            </div>
                                        </div>

                                        {/* DETAILS - updated location display */}
                                        <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                                <div
                                                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${getStatusDotColor(doctor.status)} flex-shrink-0`}
                                                />
                                                <span className={`font-medium ${getStatusStyle(doctor.status)}`}>{doctor.status || 'Unknown'}</span>
                                                <span className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs">
                                                    {doctor.specialty}
                                                </span>
                                            </div>

                                            <div className="flex items-start gap-2 text-gray-600">
                                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="break-words">{locationsDisplay}</span>
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

                                        {/* ACTIONS - added delete button */}
                                        <div className="flex gap-2 sm:gap-3 mt-5 sm:mt-6">
                                            <Link
                                                href={`/admin/doctors/${doctor._id}`}
                                                className="flex-1 text-center border border-blue-400 text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 hover:text-white transition"
                                            >
                                                View Profile
                                            </Link>

                                            <button
                                                onClick={() => handleSuspendClick(doctor)}
                                                className={`p-2 sm:p-2.5 border rounded-lg transition cursor-pointer ${isSuspended
                                                    ? 'border-green-400 text-green-600 hover:bg-green-600 hover:text-white bg-green-50'
                                                    : 'border-red-400 text-red-600 hover:bg-red-600 hover:text-white bg-red-50'
                                                    }`}
                                                title={isSuspended ? "Activate Account" : "Suspend Account"}
                                            >
                                                {isSuspended ? (
                                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                                ) : (
                                                    <Ban className="w-4 h-4 sm:w-5 sm:h-5" />
                                                )}
                                            </button>

                                            <button
                                                onClick={() => handleDeleteClick(doctor)}
                                                className="p-2 sm:p-2.5 border border-red-400 text-red-600 hover:bg-red-600 hover:text-white bg-red-50 rounded-lg transition cursor-pointer"
                                                title="Delete Account"
                                            >
                                                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* List View - added delete button */}
                {viewMode === 'list' && (
                    <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                        <div className="space-y-3 sm:space-y-4">
                            {doctors.map((doctor) => {
                                const isSuspended = doctor.status?.toLowerCase() === 'suspended';
                                const hasProfilePic = doctor.profilePic && typeof doctor.profilePic === 'string' && doctor.profilePic.trim() !== '';
                                const initials = doctor.fullName
                                    ?.split(' ')
                                    .map(n => n[0])
                                    .join('')
                                    .toUpperCase() || '?';

                                let locationsDisplay = 'Not specified';
                                if (doctor.doctorProfile?.workLocations) {
                                    const workLocs = doctor.doctorProfile.workLocations;
                                    if (Array.isArray(workLocs) && workLocs.length > 0) {
                                        locationsDisplay = workLocs
                                            .map(loc => loc.clinic?.fullAddress || loc.address || 'Unknown')
                                            .filter(Boolean)
                                            .join(' • ');
                                    } else if (workLocs?.clinic?.fullAddress) {
                                        locationsDisplay = workLocs.clinic.fullAddress;
                                    }
                                }

                                return (
                                    <div
                                        key={doctor._id}
                                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                            <div className="flex items-start sm:items-center gap-3 sm:gap-5 flex-1 min-w-0">
                                                {hasProfilePic ? (
                                                    <img
                                                        src={doctor.profilePic}
                                                        alt={doctor.fullName}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl object-cover flex-shrink-0 border border-gray-200"
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                                    />
                                                ) : null}
                                                <div
                                                    className={`${doctor.avatarColor || 'bg-blue-600'} px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-white text-base sm:text-lg font-semibold flex-shrink-0 ${hasProfilePic ? 'hidden' : 'flex'}`}
                                                >
                                                    {initials}
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
                                                            <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${getStatusDotColor(doctor.status)}`} />
                                                            <span className={getStatusStyle(doctor.status)}>
                                                                {doctor.status || 'Unknown'}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <span className="truncate">{locationsDisplay}</span>
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

                                                <button
                                                    onClick={() => handleSuspendClick(doctor)}
                                                    className={`p-2 sm:p-2.5 border rounded-lg transition cursor-pointer ${isSuspended
                                                        ? 'border-green-400 text-green-600 hover:bg-green-600 hover:text-white bg-green-50'
                                                        : 'border-red-400 text-red-600 hover:bg-red-600 hover:text-white bg-red-50'
                                                        }`}
                                                    title={isSuspended ? "Activate Account" : "Suspend Account"}
                                                >
                                                    {isSuspended ? (
                                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    ) : (
                                                        <Ban className="w-4 h-4 sm:w-5 sm:h-5" />
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteClick(doctor)}
                                                    className="p-2 sm:p-2.5 border border-red-400 text-red-600 hover:bg-red-600 hover:text-white bg-red-50 rounded-lg transition cursor-pointer"
                                                    title="Delete Account"
                                                >
                                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Pagination - unchanged */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 sm:mt-12 px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 border-t border-gray-200 pt-4 sm:pt-6 lg:pt-8 gap-4">
                    <p className="text-xs sm:text-sm text-gray-600">
                        Showing 1-{doctors.length} of {doctors.length} doctors
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base font-medium">
                            1
                        </button>
                        <button className="p-1.5 sm:p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Suspend Modal - unchanged */}
            {showSuspendModal && doctorToSuspend && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-full ${doctorToSuspend.status?.toLowerCase() === 'suspended'
                                ? 'bg-green-100'
                                : 'bg-red-100'
                                }`}>
                                {doctorToSuspend.status?.toLowerCase() === 'suspended' ? (
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                ) : (
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {doctorToSuspend.status?.toLowerCase() === 'suspended'
                                    ? 'Activate Doctor Account?'
                                    : 'Suspend Doctor Account?'
                                }
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to{' '}
                            <strong>
                                {doctorToSuspend.status?.toLowerCase() === 'suspended' ? 'activate' : 'suspend'}
                            </strong>{' '}
                            <strong>{doctorToSuspend.fullName}</strong>?
                            <br />
                            {doctorToSuspend.status?.toLowerCase() === 'suspended'
                                ? 'They will be able to log in and accept appointments again.'
                                : 'This will prevent them from logging in or accepting appointments.'
                            }
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowSuspendModal(false);
                                    setDoctorToSuspend(null);
                                }}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmSuspend}
                                disabled={isPending}
                                className={`px-5 py-2.5 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer ${doctorToSuspend.status?.toLowerCase() === 'suspended'
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                                    }`}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {doctorToSuspend.status?.toLowerCase() === 'suspended' ? 'Activating...' : 'Suspending...'}
                                    </>
                                ) : (
                                    doctorToSuspend.status?.toLowerCase() === 'suspended' ? 'Activate Account' : 'Suspend Account'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && doctorToDelete && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-full bg-red-100">
                                <Trash2 className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                                Delete Doctor Account?
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to <strong>permanently delete</strong>{' '}
                            <strong>{doctorToDelete.fullName}</strong>?<br />
                            This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDoctorToDelete(null);
                                }}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Account'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}