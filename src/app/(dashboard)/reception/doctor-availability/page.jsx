'use client';

import React, { useState } from 'react';
import {
    Stethoscope,
    CheckCircle2,
    Clock,
    XCircle,
    UserPlus,
    Search,
    X,
    User
} from 'lucide-react';

const doctors = [
    {
        initial: 'S',
        name: 'Dr. Sarah Johnson',
        specialty: 'Internal Medicine',
        room: '201',
        patients: 3,
        status: 'available',
        nextAvailable: 'Now',
        button: true,
    },
    {
        initial: 'R',
        name: 'Dr. Robert Martinez',
        specialty: 'Cardiology',
        room: '202',
        patients: 5,
        status: 'busy',
        nextAvailable: '30 min',
        button: false,
    },
    {
        initial: 'E',
        name: 'Dr. Emily Chen',
        specialty: 'Pediatrics',
        room: '203',
        patients: 2,
        status: 'available',
        nextAvailable: 'Now',
        button: true,
    },
    {
        initial: 'M',
        name: 'Dr. Michael Brown',
        specialty: 'Orthopedics',
        room: '204',
        patients: 0,
        status: 'off-duty',
        nextAvailable: 'Tomorrow',
        button: false,
    },
    {
        initial: 'J',
        name: 'Dr. Jennifer Lee',
        specialty: 'Dermatology',
        room: '205',
        patients: 1,
        status: 'available',
        nextAvailable: 'Now',
        button: true,
    },
    {
        initial: 'D',
        name: 'Dr. David Wilson',
        specialty: 'Neurology',
        room: '206',
        patients: 4,
        status: 'busy',
        nextAvailable: '45 min',
        button: false,
    },
];

const waitingPatients = [
    {
        name: 'Sarah Mitchell',
        token: 'A-12',
        age: 34,
        gender: 'F',
        phone: '+92 300 1234567',
        department: 'Internal Medicine',
        reason: 'General Checkup',
    },
    {
        name: 'Robert Chen',
        token: 'A-13',
        age: 45,
        gender: 'M',
        phone: '+92 321 9876543',
        department: 'Cardiology',
        reason: 'Follow-up',
    },
    {
        name: 'Emily Parker',
        token: 'A-14',
        age: 28,
        gender: 'F',
        phone: '+92 333 5551234',
        department: 'Pediatrics',
        reason: 'Vaccination',
    },
];

export default function DoctorAvailability() {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleAssignClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowAssignModal(true);
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'available':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle2 className="w-3.5 h-3.5" /> };
            case 'busy':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-3.5 h-3.5" /> };
            case 'off-duty':
                return { bg: 'bg-gray-100', text: 'text-gray-700', icon: <XCircle className="w-3.5 h-3.5" /> };
            default:
                return {};
        }
    };

    const stats = {
        available: doctors.filter(d => d.status === 'available').length,
        busy: doctors.filter(d => d.status === 'busy').length,
        offDuty: doctors.filter(d => d.status === 'off-duty').length,
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-teal-50 px-4 py-6">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 rounded-2xl shadow-sm px-4 py-4 mb-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Doctor Availability</h1>
                            <p className="text-xs text-gray-600">Real-time provider status and room information</p>
                        </div>
                        <div className="bg-purple-600 rounded-2xl p-2.5 shadow">
                            <Stethoscope className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-green-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-xl font-bold text-green-900">{stats.available}</p>
                        <p className="text-xs text-green-700">Available</p>
                    </div>
                    <div className="bg-yellow-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-xl font-bold text-yellow-900">{stats.busy}</p>
                        <p className="text-xs text-yellow-700">Busy</p>
                    </div>
                    <div className="bg-gray-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-xl font-bold text-gray-900">{stats.offDuty}</p>
                        <p className="text-xs text-gray-700">Off Duty</p>
                    </div>
                </div>

                {/* Doctor Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => {
                        const statusConfig = getStatusConfig(doctor.status);
                        const cardBg = doctor.status === 'available' ? 'bg-green-50' :
                            doctor.status === 'busy' ? 'bg-yellow-50' :
                                'bg-gray-50';

                        return (
                            <div
                                key={doctor.initial}
                                className={`rounded-2xl shadow p-4 border ${statusConfig.border || 'border-gray-200'} ${cardBg}`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {doctor.initial}
                                    </div>
                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                        {statusConfig.icon}
                                        {doctor.status === 'available' && 'Available'}
                                        {doctor.status === 'busy' && 'Busy'}
                                        {doctor.status === 'off-duty' && 'Off Duty'}
                                    </span>
                                </div>

                                <h3 className="text-sm font-semibold text-gray-900">{doctor.name}</h3>
                                <p className="text-xs text-gray-600 mt-0.5">{doctor.specialty}</p>

                                <div className="mt-3 space-y-1.5 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Room:</span>
                                        <span className="font-medium">Room {doctor.room}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Patients:</span>
                                        <span className="font-medium">{doctor.patients}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Next Available:</span>
                                        <span className="font-medium">{doctor.nextAvailable}</span>
                                    </div>
                                </div>

                                {doctor.button && (
                                    <button
                                        onClick={() => handleAssignClick(doctor)}
                                        className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-green-700 transition"
                                    >
                                        Assign Patient
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Assign Patient Modal */}
            {showAssignModal && selectedDoctor && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <UserPlus className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-base font-bold text-gray-900">Assign Patient</h1>
                                    <p className="text-xs text-gray-600">Select patient for {selectedDoctor.name}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAssignModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Doctor Info Card */}
                        <div className="mx-4 mt-4 bg-purple-50 rounded-2xl p-4 border border-purple-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {selectedDoctor.initial}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">{selectedDoctor.name}</h3>
                                    <p className="text-xs text-gray-600">{selectedDoctor.specialty} • Room {selectedDoctor.room}</p>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Available
                                </span>
                                <span className="text-xs text-gray-700">Current patients: {selectedDoctor.patients}</span>
                            </div>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, token, or phone..."
                                    className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            {/* Waiting Patients Title */}
                            <p className="text-xs font-medium text-gray-700 mt-2">Waiting Patients ({waitingPatients.length})</p>

                            {/* Patient List */}
                            <div className="space-y-3">
                                {waitingPatients.map((patient, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900">{patient.name}</h4>
                                            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                                                #{patient.token}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600">
                                            {patient.age}Y / {patient.gender} • {patient.phone}
                                        </p>
                                        <p className="text-xs text-gray-700 mt-1">
                                            {patient.department} • {patient.reason}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer - inside scrollable area */}
                        <div className="bg-gray-50 px-5 py-4 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setShowAssignModal(false)}
                                    className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button className="px-8 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <UserPlus className="w-4 h-4" />
                                    Assign Patient
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}