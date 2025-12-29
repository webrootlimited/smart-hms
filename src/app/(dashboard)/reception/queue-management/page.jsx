'use client';

import React, { useState } from 'react';
import {
    Activity,
    Clock,
    AlertTriangle,
    ArrowUp,
    ArrowDown,
    MoreVertical,
    CheckCircle2,
    X,
} from 'lucide-react';

const queuePatients = [
    {
        token: 'A-12',
        patient: 'Sarah Mitchell',
        department: 'General Medicine',
        priority: 'normal',
        nurse: 'Maria Johnson',
        status: 'waiting',
        waitTime: '15 min',
    },
    {
        token: 'A-13',
        patient: 'Robert Chen',
        department: 'Cardiology',
        priority: 'normal',
        nurse: 'Maria Johnson',
        status: 'in-progress',
        waitTime: '8 min',
    },
    {
        token: 'A-14',
        patient: 'Emily Parker',
        department: 'Pediatrics',
        priority: 'urgent',
        nurse: 'John Smith',
        status: 'ready',
        waitTime: '22 min',
    },
    {
        token: 'E-01',
        patient: 'David Wilson',
        department: 'Emergency',
        priority: 'emergency',
        nurse: 'Maria Johnson',
        status: 'waiting',
        waitTime: '2 min',
    },
    {
        token: 'A-15',
        patient: 'Jennifer Lee',
        department: 'General Medicine',
        priority: 'normal',
        nurse: 'John Smith',
        status: 'waiting',
        waitTime: '18 min',
    },
];

export default function QueueManagement() {
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const handleEmergencyClick = (patient) => {
        setSelectedPatient(patient);
        setShowEmergencyModal(true);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'normal':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'urgent':
                return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'emergency':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityIcon = (priority) => {
        if (priority === 'urgent') return <AlertTriangle className="w-3 h-3" />;
        if (priority === 'emergency') return <Activity className="w-3 h-3" />;
        return null;
    };

    const getTokenColor = (priority) => {
        switch (priority) {
            case 'normal':
                return 'bg-blue-100 text-blue-700';
            case 'urgent':
                return 'bg-orange-100 text-orange-700';
            case 'emergency':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'waiting':
                return 'bg-gray-100 text-gray-700';
            case 'in-progress':
                return 'bg-blue-100 text-blue-700';
            case 'ready':
                return 'bg-green-100 text-green-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 rounded-2xl shadow-sm px-4 py-4 mb-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-lg font-bold text-gray-900">Queue Management</h1>
                            <p className="text-xs text-gray-600">Control patient flow and priorities</p>
                        </div>
                        <div className="bg-teal-600 rounded-2xl p-2.5 shadow">
                            <Activity className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-blue-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-xl font-bold text-blue-900">5</p>
                        <p className="text-xs text-blue-700">Total in Queue</p>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 text-center shadow-sm">
                        <p className="text-xl font-bold text-gray-900">2</p>
                        <p className="text-xs text-gray-700">Waiting</p>
                    </div>
                    <div className="bg-orange-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-xl font-bold text-orange-900">1</p>
                        <p className="text-xs text-orange-700">Urgent</p>
                    </div>
                    <div className="bg-red-100 rounded-xl px-4 py-3 text-center">
                        <p className="text-xl font-bold text-red-900">1</p>
                        <p className="text-xs text-red-700">Emergency</p>
                    </div>
                </div>

                {/* Live Queue Table */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <h2 className="text-base font-semibold text-gray-900">
                            Live Queue (5 patients)
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Token #</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Patient Name</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Department</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Priority</th>
                                    <th className="text-left px-4 py-3 text-xs font-medium text-gray-700 uppercase">Assigned Nurse</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Wait Time</th>
                                    <th className="text-center px-4 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {queuePatients.map((patient, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full font-bold text-sm ${getTokenColor(patient.priority)}`}>
                                                #{patient.token}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm font-medium text-gray-900">{patient.patient}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-gray-700">{patient.department}</p>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border ${getPriorityColor(patient.priority)}`}>
                                                {getPriorityIcon(patient.priority)}
                                                {patient.priority.charAt(0).toUpperCase() + patient.priority.slice(1)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <p className="text-sm text-gray-700">{patient.nurse}</p>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                                {patient.status === 'in-progress' && <Clock className="w-3.5 h-3.5" />}
                                                {patient.status === 'ready' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                                {patient.status === 'waiting' && <Clock className="w-3.5 h-3.5" />}
                                                {patient.status === 'waiting' && 'Waiting'}
                                                {patient.status === 'in-progress' && 'In Progress'}
                                                {patient.status === 'ready' && 'Ready'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Clock className="w-4 h-4 text-gray-500" />
                                                <span className="text-sm font-medium text-gray-900">{patient.waitTime}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                                                    <ArrowUp className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                                                    <ArrowDown className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEmergencyClick(patient)}
                                                    className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                                                >
                                                    <AlertTriangle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Emergency Override Modal */}
            {showEmergencyModal && selectedPatient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Emergency Override</h2>
                                    <p className="text-xs text-gray-600">Mark patient as emergency priority</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowEmergencyModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Critical Action Warning */}
                        <div className="mx-4 mt-4 bg-red-50 rounded-2xl p-4 border border-red-200">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="text-xs text-red-900">
                                    <p className="font-medium">Critical Action</p>
                                    <p>
                                        This will move <strong>{selectedPatient.patient}</strong> to the top of the queue with emergency priority. All medical staff will be immediately notified.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reason Input */}
                        <div className="px-5 py-5">
                            <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                Emergency Reason <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                rows={3}
                                placeholder="Enter reason for emergency override..."
                                className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="bg-gray-50 px-5 py-4 border-t border-gray-200">
                            <div className="flex flex-col sm:flex-row gap-3 justify-end">
                                <button
                                    onClick={() => setShowEmergencyModal(false)}
                                    className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                >
                                    Cancel
                                </button>
                                <button className="px-8 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <AlertTriangle className="w-4 h-4" />
                                    Confirm Emergency
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}