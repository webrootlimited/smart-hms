'use client';

import React from 'react';
import { Clock, Calendar, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function DashboardAlerts() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 mt-10">
                <div className="space-y-8">
                    {/* Clinic Overview Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Clinic Overview</h2>
                        <div className="space-y-3">
                            {/* Working Hours Today */}
                            <div className="flex items-center bg-cyan-50 rounded-xl p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Working Hours Today</p>
                                    <p className="text-sm text-gray-600">8:00 AM - 6:00 PM (UTC+0)</p>
                                </div>
                            </div>

                            {/* Next Holiday */}
                            <div className="flex items-center bg-orange-50 rounded-xl p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        <Calendar className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Next Holiday</p>
                                    <p className="text-sm text-gray-600">Christmas - Dec 25</p>
                                </div>
                            </div>

                            {/* License Expiry Alert */}
                            <div className="flex items-center bg-pink-50 rounded-xl p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">License Expiry Alert</p>
                                    <p className="text-sm text-gray-600">Dr. Smith - 15 Days</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Alerts Section */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">System Alerts</h2>
                        <div className="space-y-3">
                            {/* Critical: Telehealth Service */}
                            <div className="flex items-center bg-red-50 rounded-xl p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Critical: Telehealth Service</p>
                                    <p className="text-sm text-gray-600">Service API Key expired, immediate attention required</p>
                                </div>
                            </div>

                            {/* Warning: API Key */}
                            <div className="flex items-center bg-yellow-50 rounded-xl p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Warning: API Key</p>
                                    <p className="text-sm text-gray-600">Integration key expires in 5 days, renew to avoid service disruption</p>
                                </div>
                            </div>

                            {/* Info: System Update */}
                            <div className="flex items-center bg-blue-50 rounded-xl p-4">
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Info className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Info: System Update</p>
                                    <p className="text-sm text-gray-600">A new software update will be applied this weekend</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}