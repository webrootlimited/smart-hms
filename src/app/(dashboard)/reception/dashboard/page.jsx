'use client';

import React from 'react';
import {
    Users,
    Calendar,
    Clock,
    UserPlus,
    Stethoscope,
    Activity,
    CheckCircle2,
    AlertCircle,
    XCircle,
    ChevronRight,
    Eye
} from 'lucide-react';

export default function ReceptionDashboard() {
    return (
        <div className="min-h-screen space-y-8 px-4">
            {/* Header */}
            <div className="px-4 py-5 rounded-b-3xl shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Reception Dashboard</h1>
                            <p className="text-sm text-gray-600">Manage patient flow & appointments</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        {[
                            { label: "Walk-Ins Today", value: 13, color: "blue", icon: UserPlus },
                            { label: "Scheduled Today", value: 18, color: "purple", icon: Calendar },
                            { label: "In Queue", value: 8, color: "teal", icon: Activity }
                        ].map((item, i) => (
                            <div key={i} className={`bg-${item.color}-100 rounded-xl p-4 flex items-center gap-3`}>
                                <div className={`w-10 h-10 bg-${item.color}-600 rounded-lg flex items-center justify-center text-white`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className={`text-xl font-semibold text-${item.color}-900`}>{item.value}</p>
                                    <p className={`text-xs text-${item.color}-700`}>{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Walk-ins */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h3 className="text-base font-semibold mb-4">Walk-Ins</h3>

                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                            <span>Waiting</span>
                            <span className="bg-gray-100 px-2 py-0.5 rounded">3</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Checked In</span>
                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">2</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Completed</span>
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">8</span>
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1">
                        Register Walk-In <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Appointments */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h3 className="text-base font-semibold mb-4">Appointments</h3>

                    {[
                        { time: "09:00 AM", name: "Sarah Mitchell", doctor: "Dr. Johnson", status: "Checked In" },
                        { time: "10:00 AM", name: "Robert Chen", doctor: "Dr. Martinez", status: "Waiting" },
                        { time: "11:30 AM", name: "Emily Parker", doctor: "Dr. Chen", status: "Waiting" }
                    ].map((a, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-2">
                            <div>
                                <p className="text-sm font-medium">{a.time}</p>
                                <p className="text-xs text-gray-600">{a.name}</p>
                                <p className="text-xs text-gray-500">{a.doctor}</p>
                            </div>
                            <span className="text-xs px-2 py-1 rounded bg-gray-200">{a.status}</span>
                        </div>
                    ))}

                    <button className="w-full mt-3 border border-purple-300 text-purple-700 text-sm py-2 rounded-lg">
                        View All Appointments
                    </button>
                </div>

                {/* Queue */}
                <div className="bg-white rounded-2xl shadow p-5">
                    <h3 className="text-base font-semibold mb-4">Queue</h3>

                    <div className="bg-teal-50 p-4 rounded-xl text-center mb-4">
                        <p className="text-xs text-teal-700">Current Token</p>
                        <p className="text-3xl font-bold text-teal-900">#A-15</p>
                        <p className="text-xs text-teal-700">Being served</p>
                    </div>

                    <div className="bg-orange-50 p-3 rounded-lg flex gap-2 items-center mb-4">
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                        <p className="text-xs text-orange-700">1 Emergency Priority</p>
                    </div>

                    <button className="w-full bg-teal-600 text-white py-2 text-sm rounded-lg">
                        Manage Queue
                    </button>
                </div>
            </div>

            {/* Doctors */}
            <div className="max-w-7xl mx-auto mt-10">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Doctor Availability</h2>
                    <button className="text-sm text-purple-600 flex items-center gap-1">
                        View All <Eye className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { name: 'Dr. Sarah Johnson', spec: 'Internal Medicine', room: '201', status: 'available' },
                        { name: 'Dr. Robert Martinez', spec: 'Cardiology', room: '202', status: 'busy' },
                        { name: 'Dr. Emily Chen', spec: 'Pediatrics', room: '203', status: 'available' },
                        { name: 'Dr. Michael Brown', spec: 'Orthopedics', room: '204', status: 'off' },
                    ].map((doc, i) => (
                        <div key={i} className="bg-white rounded-xl shadow p-4">
                            <div className="flex justify-between mb-2">
                                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                                    {doc.name.charAt(3)}
                                </div>
                                <span className={`text-xs px-2 py-1 rounded ${doc.status === 'available' ? 'bg-green-100 text-green-700' :
                                        doc.status === 'busy' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-200 text-gray-600'
                                    }`}>
                                    {doc.status}
                                </span>
                            </div>
                            <p className="text-sm font-semibold">{doc.name}</p>
                            <p className="text-xs text-gray-600">{doc.spec}</p>
                            <p className="text-xs text-gray-500 mt-1">Room {doc.room}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
