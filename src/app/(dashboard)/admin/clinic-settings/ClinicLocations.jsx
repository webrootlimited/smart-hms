'use client';

import React, { useState, useTransition } from 'react';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Users,
    Stethoscope,
    Activity,
    Percent,
    Edit2,
    Trash2,
    Star,
    Building2,
    Loader2,
    AlertTriangle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { deleteClinic } from '@/actions/clinic.actions';
import Link from 'next/link';

export default function ClinicLocationsCards({ clinics: initialClinics }) {
    const [clinics, setClinics] = useState(initialClinics);
    const [isPending, startTransition] = useTransition();
    const [deletingId, setDeletingId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clinicToDelete, setClinicToDelete] = useState(null);

    // Open delete confirmation modal
    const handleDeleteClick = (clinic) => {
        setClinicToDelete(clinic);
        setShowDeleteModal(true);
    };

    // Confirm delete
    const confirmDelete = () => {
        if (!clinicToDelete) return;

        setDeletingId(clinicToDelete._id);
        startTransition(async () => {
            const res = await deleteClinic(clinicToDelete._id);

            if (res.success) {
                setClinics(prev => prev.filter(c => c._id !== clinicToDelete._id));
                toast.success('Clinic deleted successfully');
                setShowDeleteModal(false);
                setClinicToDelete(null);
            } else {
                toast.error(res.message || 'Failed to delete clinic');
            }
            setDeletingId(null);
        });
    };

    // Helper: Group operating hours smartly
    const formatOperatingHoursSmart = (operatingHours) => {
        if (!operatingHours) return ['Operating hours not specified'];

        const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const groups = [];
        let currentGroup = null;

        daysOrder.forEach((day) => {
            const data = operatingHours[day];
            if (!data || !data.open) return;

            const timeStr = data.from && data.to ? `${data.from} - ${data.to}` : 'Open';
            const breakStr = data.break?.from && data.break?.to ? ` (Break: ${data.break.from} - ${data.break.to})` : '';
            const fullStr = timeStr + breakStr;

            if (!currentGroup) {
                currentGroup = { days: [day], time: fullStr };
            } else if (currentGroup.time === fullStr) {
                currentGroup.days.push(day);
            } else {
                groups.push(currentGroup);
                currentGroup = { days: [day], time: fullStr };
            }
        });

        if (currentGroup) groups.push(currentGroup);

        const formatDayRange = (dayArray) => {
            if (dayArray.length === 1) return dayArray[0].slice(0, 3);
            if (dayArray.length === 7) return 'Daily';
            if (dayArray.length === 5 && dayArray[0] === 'Monday' && dayArray[4] === 'Friday') return 'Mon-Fri';
            if (dayArray.length === 6 && dayArray[0] === 'Monday' && dayArray[5] === 'Saturday') return 'Mon-Sat';
            return `${dayArray[0].slice(0, 3)}-${dayArray[dayArray.length - 1].slice(0, 3)}`;
        };

        return groups.map(group => `${formatDayRange(group.days)}: ${group.time}`);
    };

    const getGradient = (index) => {
        const gradients = [
            'from-blue-500 to-indigo-600',
            'from-teal-500 to-emerald-600',
            'from-purple-500 to-pink-600',
            'from-orange-500 to-red-600',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <>
            <div className="min-h-screen">
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {clinics.map((clinic, index) => {
                            const borderGradient = getGradient(index);

                            return (
                                <div
                                    key={clinic._id}
                                    className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative"
                                >
                                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${borderGradient} rounded-t-3xl`} />

                                    <div className="p-5 sm:p-6 pt-7 sm:pt-8">
                                        {/* Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <div className="p-2.5 sm:p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                                                    <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{clinic.clinicName}</h3>
                                                    <p className="text-xs text-gray-600 flex flex-wrap items-center gap-2 mt-1">
                                                        {clinic.clinicType}
                                                        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                            {clinic.status === 'active' ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-semibold text-gray-800">0</span>
                                            </div>
                                        </div>

                                        {/* Address */}
                                        <div className="flex items-start gap-3 mb-4">
                                            <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                                            <p className="text-xs text-gray-700">
                                                {clinic.fullAddress}
                                                {clinic.city && `, ${clinic.city}`}
                                                {clinic.postalCode && ` - ${clinic.postalCode}`}
                                                <br />
                                                {clinic.country}
                                            </p>
                                        </div>

                                        {/* Phone & Email */}
                                        <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                                            <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl">
                                                <Phone className="w-3.5 h-3.5 text-purple-600" />
                                                <span className="text-xs text-gray-700">{clinic.phoneNumber || clinic.emergencyContact}</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                                                <Mail className="w-3.5 h-3.5 text-green-600" />
                                                <span className="text-xs text-gray-700">{clinic.email}</span>
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="bg-amber-50/70 rounded-2xl p-4 mb-5">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-4 h-4 text-orange-500" />
                                                <span className="text-xs font-medium text-gray-800">Working Hours</span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {formatOperatingHoursSmart(clinic.operatingHours).map((hour, i) => (
                                                    <span key={i} className="text-[10px] text-gray-600 bg-amber-100/50 px-2 py-1 rounded-lg">
                                                        {hour}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5">
                                            <div className="bg-blue-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                                <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                                <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.assignedDoctors?.length || 0}</p>
                                                <p className="text-[10px] text-gray-600">Doctors</p>
                                            </div>
                                            <div className="bg-purple-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                                <Stethoscope className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                                <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.services?.length || 0}</p>
                                                <p className="text-[10px] text-gray-600">Services</p>
                                            </div>
                                            <div className="bg-green-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                                <Activity className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                                <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.facilities?.length || 0}</p>
                                                <p className="text-[10px] text-gray-600">Facilities</p>
                                            </div>
                                            <div className="bg-red-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                                <Percent className="w-5 h-5 text-red-600 mx-auto mb-1" />
                                                <p className="text-base sm:text-lg font-bold text-gray-800">—</p>
                                                <p className="text-[10px] text-gray-600">Capacity</p>
                                            </div>
                                        </div>

                                        {/* Services & Facilities */}
                                        <div className="mb-4">
                                            <p className="text-xs font-medium text-gray-700 mb-2">Services Available</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(clinic.services || []).map((service) => (
                                                    <span key={service} className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-full font-medium">
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {(clinic.facilities || []).map((feat) => (
                                                <span key={feat} className="text-[10px] bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium">
                                                    {feat}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                                            <Link href={`/admin/clinic-settings/${clinic._id}`}
                                                className={`bg-gradient-to-r ${borderGradient} text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                                            >
                                                View Details →
                                            </Link>
                                            <div className="flex items-center gap-3 justify-end sm:justify-start">
                                                <Link href={`/admin/clinic-settings/clinic?clinicId=${clinic._id}`} className="p-2.5 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                                                    <Edit2 className="w-4 h-4 text-blue-600" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(clinic)}
                                                    disabled={isPending}
                                                    className="p-2.5 bg-red-50 rounded-full hover:bg-red-100 transition disabled:opacity-50 cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                            <h3 className="text-xl font-bold text-gray-800">Delete Clinic?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{clinicToDelete?.clinicName}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setClinicToDelete(null);
                                }}
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
                                {deletingId === clinicToDelete?._id ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Clinic'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}