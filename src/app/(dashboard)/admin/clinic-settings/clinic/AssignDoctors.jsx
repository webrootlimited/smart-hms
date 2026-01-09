'use client';

import React, { useState, useEffect } from 'react';
import {
    Users,
    Stethoscope,
    ArrowLeft,
    Check
} from 'lucide-react';
import { getDoctors } from '@/actions/user.actions';
import Loader from '@/components/layout/Loader';
import toast from 'react-hot-toast';
import { saveClinicDoctors } from '@/actions/clinic.actions';

export default function AssignDoctorsToClinic({ onBack, onNext, clinicData }) {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [roomNumbers, setRoomNumbers] = useState({});
    const [feeOverrides, setFeeOverrides] = useState({});

    // Fetch doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const res = await getDoctors();
                if (res.success) {
                    setDoctors(res.doctors);

                    // Pre-select if editing existing clinic
                    if (clinicData?.assignedDoctors && Array.isArray(clinicData.assignedDoctors)) {
                        const preSelectedIds = clinicData.assignedDoctors.map(doc => doc.doctorId || doc._id || doc.id || doc);
                        setSelectedDoctors(preSelectedIds);

                        // Pre-fill room and fee if available
                        const preRoom = {};
                        const preFee = {};
                        clinicData.assignedDoctors.forEach(doc => {
                            const id = doc.doctorId || doc._id || doc.id;
                            if (doc.roomNumber) preRoom[id] = doc.roomNumber;
                            if (doc.feeOverride) preFee[id] = doc.feeOverride;
                        });
                        setRoomNumbers(preRoom);
                        setFeeOverrides(preFee);
                    }
                } else {
                    toast.error("Failed to load doctors");
                    setDoctors([]);
                }
            } catch (err) {
                toast.error("Error loading doctors");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const toggleDoctor = (doctorId) => {
        setSelectedDoctors(prev =>
            prev.includes(doctorId)
                ? prev.filter(id => id !== doctorId)
                : [...prev, doctorId]
        );
    };

    const updateRoom = (doctorId, value) => {
        setRoomNumbers(prev => ({ ...prev, [doctorId]: value }));
    };

    const updateFee = (doctorId, value) => {
        setFeeOverrides(prev => ({ ...prev, [doctorId]: value }));
    };

    const handleSave = async () => {
        // Validation: At least one doctor must be selected
        if (selectedDoctors.length === 0) {
            toast.error("Please select at least one doctor to assign to the clinic.");
            return;
        }

        // Build assignedDoctors array with doctorId field
        const assignedDoctors = selectedDoctors.map(doctorId => {
            const doc = {
                doctorId: doctorId,  // ← Changed from 'id' to 'doctorId'
            };

            const room = roomNumbers[doctorId]?.trim();
            const fee = feeOverrides[doctorId]?.trim();

            if (room) doc.roomNumber = room;
            if (fee) {
                // Optional: convert to number if your backend expects a number
                const parsedFee = parseFloat(fee);
                doc.feeOverride = isNaN(parsedFee) ? fee : parsedFee;
            }

            return doc;
        });

        // Get clinic ID
        const clinicId = clinicData?._id;

        if (!clinicId) {
            toast.error("Clinic ID is missing. Cannot save.");
            return;
        }

        try {
            const result = await saveClinicDoctors(
                clinicId,
                assignedDoctors,
            );

            if (result.success) {
                toast.success("Doctors assigned successfully!");
                onNext();
            } else {
                toast.error(result.message || "Failed to assign doctors.");
            }
        } catch (error) {
            console.error("Error saving clinic doctors:", error);
            toast.error("An error occurred while saving.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto space-y-8">

                {/* Header Card */}
                <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="bg-purple-600 rounded-xl p-3 flex-shrink-0">
                            <Users className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Assign Doctors to Clinic</h1>
                            <p className="text-sm text-gray-600 mt-1">Link doctors to physical location</p>
                        </div>
                    </div>
                </div>

                {/* Available Doctors Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-yellow-100 rounded-lg p-2 flex-shrink-0">
                            <Stethoscope className="w-5 h-5 text-yellow-600" />
                        </div>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">
                            Available Doctors ({doctors.length})
                        </h2>
                    </div>

                    {doctors.length === 0 ? (
                        <p className="text-center text-gray-500 py-10">No doctors found.</p>
                    ) : (
                        <div className="space-y-6">
                            {doctors.map((doctor) => {
                                const isSelected = selectedDoctors.includes(doctor._id);

                                return (
                                    <div
                                        key={doctor._id}
                                        onClick={() => toggleDoctor(doctor._id)}
                                        className={`p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer ${isSelected
                                            ? 'bg-purple-50 border-purple-300 shadow-md'
                                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-3xl flex-shrink-0">
                                                {doctor.fullName?.charAt(0).toUpperCase() || 'D'}
                                            </div>

                                            <div className="flex-1 w-full">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div>
                                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                            {doctor.fullName || 'Dr. Unknown'}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 mt-1">
                                                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                                                                {doctor.specialty || 'General'}
                                                            </span>{' '}
                                                            <span className="text-gray-500">
                                                                • {doctor.department || 'General Medicine'}
                                                            </span>
                                                        </p>
                                                    </div>

                                                    {isSelected && (
                                                        <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                                                            <Check className="w-5 h-5 text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {isSelected && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                Room Number (Optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g., Room 201"
                                                                value={roomNumbers[doctor._id] || ''}
                                                                onChange={(e) => updateRoom(doctor._id, e.target.value)}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                                                Consultation Fee Override (Optional)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                placeholder="e.g., PKR 3000"
                                                                value={feeOverrides[doctor._id] || ''}
                                                                onChange={(e) => updateFee(doctor._id, e.target.value)}
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Selection Summary */}
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 rounded-lg p-2 flex-shrink-0">
                                <Users className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-blue-900">Doctors Assigned</p>
                                <p className="text-sm text-blue-700">
                                    {selectedDoctors.length} of {doctors.length} doctors selected
                                </p>
                            </div>
                        </div>

                        <div className="px-5 py-2.5 text-sm font-medium text-purple-700 bg-purple-100 rounded-full">
                            {selectedDoctors.length} Assigned
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                    <button
                        onClick={onBack}
                        className="cursor-pointer inline-flex items-center justify-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={selectedDoctors.length === 0}
                        className={`cursor-pointer inline-flex items-center justify-center gap-3 px-8 py-3 text-sm font-medium text-white rounded-lg shadow-md transition ${selectedDoctors.length === 0
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-teal-600 hover:bg-teal-700 cursor-pointer'
                            }`}
                    >
                        <Check className="w-5 h-5" />
                        Save & Activate Clinic
                    </button>
                </div>
            </div>
        </div>
    );
}