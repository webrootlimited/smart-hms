import React from 'react';

export default function PatientQueue() {
    const patients = [
        {
            id: 1,
            name: 'Isabella Rossi',
            reason: 'Chest Pain',
            urgency: 'Urgent',
            urgencyColor: 'bg-red-100 text-red-600',
            room: 'Room 03 — Cardiology',
            waitTime: 'Waiting: 12 min',
            status: 'Waiting',
            statusColor: 'bg-blue-100 text-[#0284C7]',
            avatar: 'IR'
        },
        {
            id: 2,
            name: 'Liam Johnson',
            reason: 'Follow-up',
            urgency: 'Routine',
            urgencyColor: 'bg-green-100 text-green-600',
            room: 'Room 07 — General',
            waitTime: 'Waiting: 5 min',
            status: 'In-room',
            statusColor: 'bg-teal-100 text-teal-600',
            avatar: 'LJ'
        },
        {
            id: 3,
            name: 'Ava Chen',
            reason: 'Routine Check',
            urgency: 'Routine',
            urgencyColor: 'bg-green-100 text-green-600',
            room: 'Telehealth Queue',
            waitTime: 'Waiting: 22 min',
            status: 'Waiting',
            statusColor: 'bg-blue-100 text-[#0284C7]',
            avatar: 'AC'
        },
        {
            id: 4,
            name: 'Noah Patel',
            reason: 'Prescription Refill',
            urgency: 'Routine',
            urgencyColor: 'bg-green-100 text-green-600',
            room: 'Room 02 — Pharmacy',
            waitTime: 'Finished',
            status: 'Done',
            statusColor: 'bg-gray-100 text-gray-600',
            avatar: 'NP'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
            <div className="max-w-[1800px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4 mb-4 lg:mb-6">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Patient Queue</h1>
                        <p className="text-sm text-gray-600">Real-time overview of today's patient queue.</p>
                    </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Tabs and Actions */}
                        <div className="bg-white rounded-lg p-3 mb-4 shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3 mb-3">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-md border border-gray-200 hover:bg-gray-50 text-xs">
                                    <svg className="w-4 h-4 text-[#0284C7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="font-medium text-gray-700 hidden sm:inline">Refresh Queue</span>
                                </button>
                                <button className="p-1.5 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                                <button className="p-1.5 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                                <button className="ml-auto p-1.5 bg-white rounded-md border border-gray-200 hover:bg-gray-50">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Scrollable Tabs */}
                            <div className="overflow-x-auto -mx-3 px-3">
                                <div className="flex gap-2 min-w-max">
                                    <button className="px-4 py-1.5 bg-[#0284C7] text-white rounded-md text-xs font-medium whitespace-nowrap">
                                        All Patients
                                    </button>
                                    <button className="px-4 py-1.5 bg-white text-gray-700 rounded-md text-xs font-medium hover:bg-gray-50 whitespace-nowrap border border-gray-200">
                                        Urgent
                                    </button>
                                    <button className="px-4 py-1.5 bg-white text-gray-700 rounded-md text-xs font-medium hover:bg-gray-50 whitespace-nowrap border border-gray-200">
                                        Routine
                                    </button>
                                    <button className="px-4 py-1.5 bg-white text-gray-700 rounded-md text-xs font-medium hover:bg-gray-50 whitespace-nowrap border border-gray-200">
                                        Telehealth Waiting
                                    </button>
                                    <button className="px-4 py-1.5 bg-white text-gray-700 rounded-md text-xs font-medium hover:bg-gray-50 whitespace-nowrap border border-gray-200">
                                        In-Clinic Waiting
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Patient Cards Grid - Responsive */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-3 lg:gap-4">
                            {patients.map((patient) => (
                                <div key={patient.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                                    {/* Patient Header */}
                                    <div className="flex items-start gap-2.5 mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                            {patient.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 text-sm truncate">{patient.name}</h3>
                                            <p className="text-xs text-gray-600 truncate">Reason: {patient.reason}</p>
                                        </div>
                                    </div>

                                    {/* Urgency Badge */}
                                    <div className="mb-3">
                                        <span className="text-xs text-gray-600 block mb-1">Urgency:</span>
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.urgencyColor}`}>
                                            {patient.urgency}
                                        </span>
                                    </div>

                                    {/* Room Assignment */}
                                    <div className="mb-3">
                                        <span className="text-xs text-gray-600 block mb-1">Assigned Room:</span>
                                        <p className="font-medium text-gray-900 text-sm">{patient.room}</p>
                                    </div>

                                    {/* Wait Time */}
                                    <div className="mb-3">
                                        <span className="text-xs text-gray-600 block mb-1">Wait Time:</span>
                                        <p className="font-medium text-gray-900 text-sm">{patient.waitTime}</p>
                                    </div>

                                    {/* Status */}
                                    <div className="mb-4">
                                        <span className="text-xs text-gray-600 block mb-1">Status:</span>
                                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.statusColor}`}>
                                            {patient.status}
                                        </span>
                                    </div>

                                    {/* View Record Button */}
                                    <button className="w-full py-2 bg-[#0284C7] text-white rounded-md text-sm font-medium hover:bg-[#0369a1] transition-colors">
                                        View Record
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-full xl:w-80 flex-shrink-0">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
                            <h2 className="text-base font-bold text-gray-900 mb-3">Quick Actions</h2>
                            <button className="w-full py-2.5 bg-[#0284C7] text-white rounded-md text-sm font-medium hover:bg-[#0369a1] transition-colors flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                                Call Next Patient
                            </button>
                        </div>

                        {/* Currently in Room */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
                            <h2 className="text-base font-bold text-gray-900 mb-3">Currently in Room 07</h2>
                            <div className="flex items-center gap-2.5 mb-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                    LJ
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm">Liam Johnson</h3>
                                    <p className="text-xs text-gray-600">Time in room: 8 min</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 text-[#0284C7] hover:bg-blue-50 rounded-md text-xs font-medium transition-colors">
                                    Open Chart
                                </button>
                                <button className="flex-1 py-1.5 text-red-600 hover:bg-red-50 rounded-md text-xs font-medium transition-colors">
                                    End Session
                                </button>
                            </div>
                        </div>

                        {/* Telehealth Queue */}
                        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                            <h2 className="text-base font-bold text-gray-900 mb-3">Telehealth Queue (1)</h2>
                            <div className="flex items-center gap-2.5">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                                    AC
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm truncate">Ava Chen</h3>
                                    <p className="text-xs text-gray-600">Waiting: 22 min</p>
                                </div>
                                <button className="p-2 bg-[#0284C7] text-white rounded-md hover:bg-[#0369a1] flex-shrink-0">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}