import React from 'react';
import { Bell, Activity, AlertTriangle, Thermometer, Heart, User } from 'lucide-react';

export default function AlertsNotifications() {
    return (
        <div className="min-h-screen bg-gray-50 px-4 space-y-10">
            {/* Header */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 py-4 shadow-md rounded-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Alerts & Notifications</h1>
                            <p className="text-sm sm:text-base text-gray-600">Critical vitals and system notifications</p>
                        </div>
                        <div className="relative">
                            <div className="sm:w-24 sm:h-24 w-15 h-15 bg-red-500 rounded-3xl flex items-center justify-center shadow-lg">
                                <Bell className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">3</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Critical Alerts */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Critical Alerts</h2>
                        </div>
                        <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            1 critical
                        </div>
                    </div>

                    <div className="bg-white border-2 border-red-200 rounded-2xl shadow-sm p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                                    <Activity className="w-8 h-8 text-white" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">David Wilson</h3>
                                    <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                        Token: A-11
                                    </span>
                                </div>

                                <div className="flex items-start gap-2 mb-2">
                                    <span className="inline-block w-2 h-2 bg-red-600 rounded-full mt-1.5 flex-shrink-0"></span>
                                    <p className="text-base sm:text-lg font-semibold text-red-700">
                                        High Blood Pressure: 180/110 mmHg
                                    </p>
                                </div>

                                <p className="text-xs sm:text-sm text-gray-500 mb-4">2 min ago</p>

                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4">
                                    <div className="flex items-start gap-2">
                                        <span className="text-red-600 text-base sm:text-lg flex-shrink-0">⚠</span>
                                        <div>
                                            <p className="text-sm font-semibold text-red-800 mb-1">Immediate Action Required</p>
                                            <p className="text-xs sm:text-sm text-red-700">
                                                This patient requires immediate medical attention. Alert the doctor and monitor closely.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base">
                                        Alert Doctor Now
                                    </button>
                                    <button className="w-full bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base">
                                        View Patient Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warnings */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Warnings</h2>
                        <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                            2 warnings
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Warning 1 - Temperature */}
                        <div className="bg-white border-2 border-yellow-200 rounded-2xl shadow-sm p-4 sm:p-5">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center">
                                        <Thermometer className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Lisa Anderson</h3>
                                        <span className="bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                            A-18
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 mb-2">
                                        <span className="text-orange-600 text-base flex-shrink-0">⚠</span>
                                        <p className="text-sm sm:text-base font-semibold text-orange-700">
                                            Elevated Temperature: 100.8°F
                                        </p>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-500 mb-4">15 min ago</p>

                                    <div className="flex flex-wrap gap-3">
                                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg transition-colors text-sm">
                                            Review & Monitor
                                        </button>
                                        <button className="bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-medium px-6 py-2 rounded-lg transition-colors text-sm">
                                            View History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Warning 2 - Heart Rate */}
                        <div className="bg-white border-2 border-yellow-200 rounded-2xl shadow-sm p-4 sm:p-5">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center">
                                        <Heart className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">James Taylor</h3>
                                        <span className="bg-yellow-100 text-yellow-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                            A-19
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 mb-2">
                                        <span className="text-orange-600 text-base flex-shrink-0">⚠</span>
                                        <p className="text-sm sm:text-base font-semibold text-orange-700">
                                            Elevated Heart Rate: 105 bpm
                                        </p>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-500 mb-4">22 min ago</p>

                                    <div className="flex flex-wrap gap-3">
                                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg transition-colors text-sm">
                                            Review & Monitor
                                        </button>
                                        <button className="bg-white border-2 border-orange-600 text-orange-600 hover:bg-orange-50 font-medium px-6 py-2 rounded-lg transition-colors text-sm">
                                            View History
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Notifications */}
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">Recent Notifications</h2>

                    <div className="space-y-3">
                        {/* Notification 1 */}
                        <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                                        New patient checked in
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Amanda Roberts • Token: A-20
                                    </p>
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                                    5 min ago
                                </div>
                            </div>
                        </div>

                        {/* Notification 2 */}
                        <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                                        Dr. Sarah Johnson is now available
                                    </h3>
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                                    10 min ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}