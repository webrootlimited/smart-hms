'use client';

import React, { useState } from 'react';
import {
    Users,
    Stethoscope,
    ArrowLeft,
    ArrowRight,
    Check
} from 'lucide-react';

const doctors = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        experience: '15 years',
        avatar: '👩‍⚕️',
        color: 'bg-pink-100',
    },
    {
        id: 2,
        name: 'Dr. Robert Martinez',
        specialty: 'Pediatrics',
        experience: '10 years',
        avatar: '🧑‍⚕️',
        color: 'bg-purple-100',
    },
    {
        id: 3,
        name: 'Dr. Emily Chen',
        specialty: 'General Medicine',
        experience: '8 years',
        avatar: '👩‍⚕️',
        color: 'bg-blue-100',
    },
    {
        id: 4,
        name: 'Dr. Michael Brown',
        specialty: 'Orthopedics',
        experience: '12 years',
        avatar: '🧑‍⚕️',
        color: 'bg-orange-100',
    },
];

export default function AssignDoctorsToClinic() {
    const [selectedDoctors, setSelectedDoctors] = useState([1, 4]);
    const [roomNumbers, setRoomNumbers] = useState({
        1: 'Room 201',
        4: 'Room 301',
    });
    const [feeOverrides, setFeeOverrides] = useState({
        1: 'PKR 3000',
        4: 'PKR 3500',
    });

    const toggleDoctor = (id) => {
        setSelectedDoctors(prev =>
            prev.includes(id)
                ? prev.filter(d => d !== id)
                : [...prev, id]
        );
    };

    const updateRoom = (id, value) => {
        setRoomNumbers(prev => ({ ...prev, [id]: value }));
    };

    const updateFee = (id, value) => {
        setFeeOverrides(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="space-y-8">

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
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">Available Doctors</h2>
                    </div>

                    <div className="space-y-6">
                        {doctors.map((doctor) => {
                            const isSelected = selectedDoctors.includes(doctor.id);

                            return (
                                <div
                                    key={doctor.id}
                                    onClick={() => toggleDoctor(doctor.id)}
                                    className={`p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer ${isSelected
                                        ? 'bg-purple-50 border-purple-300 shadow-md'
                                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                        {/* Avatar */}
                                        <div className={`w-14 h-14 rounded-full ${doctor.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                                            {doctor.avatar}
                                        </div>

                                        {/* Doctor Info + Inputs */}
                                        <div className="flex-1 w-full">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{doctor.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                                                            {doctor.specialty}
                                                        </span>{' '}
                                                        <span className="text-gray-500">• {doctor.experience}</span>
                                                    </p>
                                                </div>

                                                {/* Selection Indicator */}
                                                {isSelected && (
                                                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-5 h-5 text-white" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Inputs - shown when selected */}
                                            {isSelected && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Room Number
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g., Room 201"
                                                            value={roomNumbers[doctor.id] || ''}
                                                            onChange={(e) => updateRoom(doctor.id, e.target.value)}
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
                                                            placeholder="PKR 3000"
                                                            value={feeOverrides[doctor.id] || ''}
                                                            onChange={(e) => updateFee(doctor.id, e.target.value)}
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
                    <button className="inline-flex items-center justify-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button className="inline-flex items-center justify-center gap-3 px-8 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition shadow-md">
                        <Check className="w-5 h-5" />
                        Save & Activate Clinic
                    </button>
                </div>
            </div>
        </div>
    );
}