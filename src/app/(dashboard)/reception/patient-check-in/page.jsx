'use client';

import React, { useState } from 'react';
import { Clock, UserCheck, CheckCircle2, X } from 'lucide-react';

const appointments = [
    {
        time: '09:00 AM',
        patient: 'Sarah Mitchell',
        phone: '+92 300 1234 567',
        doctor: 'Dr. Sarah Johnson',
        department: 'Internal Medicine',
        status: 'scheduled',
    },
    {
        time: '10:00 AM',
        patient: 'Robert Chen',
        phone: '+92 321 9876 543',
        doctor: 'Dr. Robert Martinez',
        department: 'Cardiology',
        status: 'scheduled',
    },
    {
        time: '11:30 AM',
        patient: 'Emily Parker',
        phone: '+92 333 5551 234',
        doctor: 'Dr. Emily Chen',
        department: 'Pediatrics',
        status: 'scheduled',
    },
    {
        time: '09:30 AM',
        patient: 'Michael Brown',
        phone: '+92 321 7778 888',
        doctor: 'Dr. Sarah Johnson',
        department: 'General Medicine',
        status: 'checked-in',
        token: 'A-15',
    },
    {
        time: '10:30 AM',
        patient: 'Jennifer Lee',
        phone: '+92 300 9991111',
        doctor: 'Dr. Robert Martinez',
        department: 'Cardiology',
        status: 'checked-in',
        token: 'A-16',
    },
];

export default function PatientCheckIn() {
    const [showCheckInModal, setShowCheckInModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleCheckInClick = (appt) => {
        setSelectedAppointment(appt);
        setShowCheckInModal(true);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 px-4">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 rounded-2xl shadow-sm px-4 py-4 mb-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Patient Check-In</h1>
                            <p className="text-xs text-gray-600">Confirm arrivals and initiate queue</p>
                        </div>
                        <div className="bg-teal-500 rounded-2xl p-2.5 shadow">
                            <UserCheck className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <h2 className="text-base font-semibold text-gray-900">
                            Today's Appointments ({appointments.length})
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Time</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Patient</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Doctor</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Department</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {appointments.map((appt, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-sm font-medium">{appt.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{appt.patient}</p>
                                                <p className="text-xs text-gray-500">{appt.phone}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-teal-700 font-semibold text-xs">
                                                        {appt.doctor.split(' ').slice(-1)[0].charAt(0)}
                                                    </span>
                                                </div>
                                                <span className="text-sm font-medium">{appt.doctor}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm text-gray-700">{appt.department}</span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            {appt.status === 'scheduled' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Scheduled
                                                </span>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                        Checked In
                                                    </span>
                                                    <span className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-base font-bold">
                                                        {appt.token}
                                                    </span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            {appt.status === 'scheduled' ? (
                                                <button
                                                    onClick={() => handleCheckInClick(appt)}
                                                    className="px-5 py-2 text-xs font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                                                >
                                                    Check In →
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-500 font-medium">Already checked in</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Check-In Confirmation Modal */}
            {showCheckInModal && selectedAppointment && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Patient Check-In</h2>
                                    <p className="text-xs text-gray-600">Confirm patient arrival</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCheckInModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Patient Info Card */}
                        <div className="mx-4 mt-4 bg-blue-50 rounded-2xl p-5 border border-blue-100">
                            <div className="space-y-3 text-sm">
                                <div>
                                    <p className="text-xs text-gray-600">Patient Name</p>
                                    <p className="font-semibold text-gray-900">{selectedAppointment.patient}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600">Appointment Time</p>
                                        <p className="font-medium">{selectedAppointment.time}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Doctor</p>
                                        <p className="font-medium">{selectedAppointment.doctor}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Token Card */}
                        <div className="mx-4 mt-5 bg-green-50 rounded-2xl p-5 text-center border border-green-100">
                            <p className="text-xs text-green-700 mb-2">Generated Token Number</p>
                            <p className="text-4xl font-bold text-green-800"># A-32</p>
                            <p className="text-xs text-green-700 mt-2">This token will be used in the queue</p>
                        </div>

                        {/* Buttons */}
                        <div className="px-5 py-5 bg-gray-50 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setShowCheckInModal(false)}
                                    className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button className="px-8 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <CheckCircle2 className="w-4 h-4" />
                                    Confirm Check-In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}