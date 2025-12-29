'use client';

import React, { useState } from 'react';
import {
    Calendar,
    Plus,
    Search,
    Clock,
    Edit2,
    Trash2,
    CheckCircle,
    AlertCircle,
    XCircle,
    X,
    User,
    Phone,
    FileText,
    Check
} from 'lucide-react';

const appointments = [
    {
        date: 'Dec 29',
        time: '09:00 AM',
        patient: 'Sarah Mitchell',
        phone: '+92 300 1234 567',
        doctor: 'Dr. Sarah Johnson',
        department: 'Internal Medicine',
        room: '201',
        status: 'confirmed',
    },
    {
        date: 'Dec 29',
        time: '10:00 AM',
        patient: 'Robert Chen',
        phone: '+92 321 9876 543',
        doctor: 'Dr. Robert Martinez',
        department: 'Cardiology',
        room: '202',
        status: 'confirmed',
    },
    {
        date: 'Dec 29',
        time: '09:30 AM',
        patient: 'Emily Parker',
        phone: '+92 333 5551 234',
        doctor: 'Dr. Emily Chen',
        department: 'Pediatrics',
        room: '203',
        status: 'confirmed',
    },
    {
        date: 'Dec 30',
        time: '02:00 PM',
        patient: 'Michael Brown',
        phone: '+92 321 7778 888',
        doctor: 'Dr. Michael Brown',
        department: 'Orthopedics',
        room: '204',
        status: 'pending',
    },
    {
        date: 'Dec 30',
        time: '09:30 AM',
        patient: 'Jennifer Lee',
        phone: '+92 300 9991111',
        doctor: 'Dr. Sarah Johnson',
        department: 'Internal Medicine',
        room: '201',
        status: 'confirmed',
    },
    {
        date: 'Dec 27',
        time: '09:00 AM',
        patient: 'David Wilson',
        phone: '+92 333 4445 555',
        doctor: 'Dr. Jennifer Lee',
        department: 'Dermatology',
        room: '205',
        status: 'cancelled',
    },
];

export default function Appointments() {
    const [showModal, setShowModal] = useState(false);

    const stats = {
        total: 6,
        today: 4,
        upcoming: 2,
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'confirmed':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
            case 'pending':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <AlertCircle className="w-4 h-4" /> };
            case 'cancelled':
                return { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-4 h-4" /> };
            default:
                return {};
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 space-y-10">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-5 rounded shadow-md">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Appointments</h1>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Schedule and manage patient appointments</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-600 rounded-2xl p-3 shadow-lg md:inline hidden">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-2xl font-medium hover:from-purple-700 hover:to-purple-800 transition flex items-center gap-2 shadow-lg"
                            >
                                <Plus className="w-5 h-5" />
                                New Appointment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <div className="bg-purple-100 rounded-2xl px-5 py-4 text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-purple-900">{stats.total}</p>
                            <p className="text-sm text-purple-700">Total Appointments</p>
                        </div>
                        <div className="bg-green-100 rounded-2xl px-5 py-4 text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-green-900">{stats.today}</p>
                            <p className="text-sm text-green-700">Today</p>
                        </div>
                        <div className="bg-blue-100 rounded-2xl px-5 py-4 text-center">
                            <p className="text-2xl sm:text-3xl font-bold text-blue-900">{stats.upcoming}</p>
                            <p className="text-sm text-blue-700">Upcoming</p>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div className="flex gap-2">
                            <button className="px-5 py-2 bg-purple-600 text-white rounded-xl font-medium">All</button>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50">Confirmed</button>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50">Pending</button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4">
                        <div className="relative">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by patient name, phone, or doctor..."
                                className="w-full pl-12 pr-4 py-3.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-200">
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                                All Appointments ({appointments.length})
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Date & Time</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Patient</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Doctor</th>
                                        <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Department</th>
                                        <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Room</th>
                                        <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                        <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {appointments.map((appt, index) => {
                                        const statusConfig = getStatusConfig(appt.status);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-purple-600" />
                                                        <div>
                                                            <p className="text-sm font-medium">{appt.date}</p>
                                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                                <Clock className="w-3 h-3" />
                                                                {appt.time}
                                                            </p>
                                                        </div>
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
                                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                            <span className="text-purple-700 font-semibold text-xs">
                                                                {appt.doctor.split(' ').slice(-1)[0].charAt(0)}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-medium">{appt.doctor}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <p className="text-sm text-gray-700">{appt.department}</p>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                        Room {appt.room}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                        {statusConfig.icon}
                                                        {appt.status === 'confirmed' && 'Confirmed'}
                                                        {appt.status === 'pending' && 'Pending'}
                                                        {appt.status === 'cancelled' && 'Cancelled'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* New Appointment Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Modal Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold text-gray-900">Schedule New Appointment</h1>
                                    <p className="text-xs text-gray-600">Book an appointment for a patient</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 sm:p-6 space-y-6">
                                {/* Patient Information */}
                                <div className="bg-blue-50/60 rounded-2xl p-4 sm:p-6 border border-blue-100">
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-900">Patient Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                Patient Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter patient name"
                                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                Phone Number <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    defaultValue="+92 300 1234567"
                                                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment Details */}
                                <div className="bg-purple-50/60 rounded-2xl p-4 sm:p-6 border border-purple-100">
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-base font-semibold text-gray-900">Appointment Details</h2>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                Appointment Type <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Consultation, Follow-up"
                                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                Select Doctor <span className="text-red-500">*</span>
                                            </label>
                                            <select className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                                <option>Select Doctor...</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                    Date <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="date"
                                                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                                    Time Slot <span className="text-red-500">*</span>
                                                </label>
                                                <select className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                                                    <option>Select Time Slot...</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Room</label>
                                            <input
                                                type="text"
                                                readOnly
                                                placeholder="Auto-filled based on doctor selection"
                                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-700 mb-1.5">Additional Notes</label>
                                            <textarea
                                                rows={3}
                                                placeholder="Any special instructions or notes..."
                                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Confirmation Notice */}
                                <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="text-xs text-blue-900">
                                        <p className="font-medium">Appointment Confirmation</p>
                                        <p>The patient will be notified via SMS. A confirmation will be sent to the provided phone number.</p>
                                    </div>
                                </div>

                                {/* Action Buttons - inside scrollable area */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-8 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Calendar className="w-4 h-4" />
                                        Schedule Appointment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}