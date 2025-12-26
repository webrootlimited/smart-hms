import React from 'react';
import { Users, Stethoscope, AlertTriangle, Activity, FileText, Clock } from 'lucide-react';

export default function MedicalDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Left Column - Patients Waiting */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 rounded-xl p-2.5">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xl font-semibold">8</div>
                            <div className="text-xs text-gray-500">Patients Waiting</div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-700">Waiting</span>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full">3</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-blue-600">Vitals Taken</span>
                            <span className="bg-blue-100 text-blue-600 text-xs px-2.5 py-0.5 rounded-full">2</span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-green-600">Ready for Doctor</span>
                            <span className="bg-green-100 text-green-600 text-xs px-2.5 py-0.5 rounded-full">3</span>
                        </div>
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">
                        View Patient Queue →
                    </button>
                </div>

                {/* Middle Column - Assigned Doctors */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-500 rounded-xl p-2.5">
                            <Stethoscope className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xl font-semibold">3</div>
                            <div className="text-xs text-gray-500">Assigned Doctors</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-800">Dr. Sarah Johnson</span>
                                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full">Available</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Room 201</span>
                                <span>3 patients</span>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-800">Dr. Robert Martinez</span>
                                <span className="bg-yellow-100 text-yellow-700 text-xs px-2.5 py-0.5 rounded-full">Busy</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Room 202</span>
                                <span>5 patients</span>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-800">Dr. Emily Chen</span>
                                <span className="bg-green-100 text-green-700 text-xs px-2.5 py-0.5 rounded-full">Available</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>Room 203</span>
                                <span>2 patients</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Critical Alert */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 rounded-xl p-2.5">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <div className="text-xl font-semibold">1</div>
                            <div className="text-xs text-gray-500">Critical Alert</div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
                        <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800 mb-1">David Wilson (A-11)</div>
                                <div className="text-sm font-semibold text-red-600 mb-1">High BP: 180/110 mmHg</div>
                                <div className="text-xs text-gray-500">2 min ago</div>
                            </div>
                        </div>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-3">
                            Review Now
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 text-center">
                        All critical vitals require immediate attention
                    </div>
                </div>

                {/* Bottom Left - Pending Vitals Entry */}
                <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 lg:col-span-2">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500 rounded-xl p-2.5">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-base sm:text-lg font-semibold">Pending Vitals Entry</div>
                            <div className="text-xs text-gray-500">3 patients waiting</div>
                        </div>
                    </div>

                    {/* List */}
                    <div className="space-y-3">

                        {/* Card */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3">

                            {/* Token */}
                            <div className="bg-yellow-200 text-yellow-800 rounded-lg px-3 py-1 text-sm font-medium w-fit">
                                A-12
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-800">Sarah Mitchell</div>
                                <div className="text-xs text-gray-500">General Checkup</div>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-1 text-orange-600 text-xs">
                                <Clock className="w-3.5 h-3.5" />
                                <span>15 min</span>
                            </div>

                            {/* Action */}
                            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition">
                                Enter Vitals →
                            </button>
                        </div>

                        {/* Duplicate block for others */}
                        {[
                            { id: "A-13", name: "Robert Chen", wait: "8 min", reason: "Follow-up" },
                            { id: "A-14", name: "Emily Parker", wait: "5 min", reason: "Consultation" },
                        ].map((item) => (
                            <div
                                key={item.id}
                                className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3"
                            >
                                <div className="bg-yellow-200 text-yellow-800 rounded-lg px-3 py-1 text-sm font-medium">
                                    {item.id}
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-800">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.reason}</div>
                                </div>

                                <div className="flex items-center gap-1 text-orange-600 text-xs">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Waiting {item.wait}</span>
                                </div>

                                <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-lg transition">
                                    Enter Vitals →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Bottom Right - Pending Notes */}
                <div className="bg-white rounded-2xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-teal-500 rounded-xl p-2.5">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="text-xl font-semibold">2</div>
                            <div className="text-xs text-gray-500">Pending Notes</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="text-sm font-medium text-gray-800">Michael Brown</div>
                                    <div className="text-xs text-gray-500">Chest pain</div>
                                </div>
                                <span className="bg-teal-100 text-teal-700 text-xs px-2.5 py-0.5 rounded-full">A-15</span>
                            </div>
                            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm py-2 rounded-lg transition-colors">
                                Add Notes
                            </button>
                        </div>

                        <div className="border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <div className="text-sm font-medium text-gray-800">Jennifer Lee</div>
                                    <div className="text-xs text-gray-500">Diabetes follow-up</div>
                                </div>
                                <span className="bg-teal-100 text-teal-700 text-xs px-2.5 py-0.5 rounded-full">A-16</span>
                            </div>
                            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm py-2 rounded-lg transition-colors">
                                Add Notes
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}