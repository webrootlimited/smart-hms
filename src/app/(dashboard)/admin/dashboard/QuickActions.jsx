'use client';

import React from 'react';
import { UserPlus, Users, CalendarPlus, HelpCircle } from 'lucide-react';

export default function QuickActionsAndPatientLoad() {
    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-3xl shadow-sm p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-8">Quick Actions</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        {/* Add New Provider */}
                        <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:from-blue-700 hover:to-blue-600 transition-all">
                            <UserPlus className="w-8 h-8" />
                            <span className="text-sm">Add New Provider</span>
                        </button>

                        {/* Manage Departments */}
                        <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:from-blue-700 hover:to-blue-600 transition-all">
                            <Users className="w-8 h-8" />
                            <span className="text-sm ">Manage Departments</span>
                        </button>

                        {/* Add Appointment Type */}
                        <button className="border-2 border-cyan-500 text-cyan-600 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:bg-cyan-50 transition-all">
                            <CalendarPlus className="w-8 h-8" />
                            <span className="text-sm">Add Appointment Type</span>
                        </button>

                        {/* Need Help? */}
                        <button className="border-2 border-cyan-500 text-cyan-600 rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 hover:bg-cyan-50 transition-all">
                            <HelpCircle className="w-8 h-8" />
                            <span className="text-sm">Need Help?</span>
                        </button>
                    </div>

                    {/* Help Card */}
                    <div className="bg-blue-50 rounded-2xl p-6 text-center">
                        <h3 className="text-sm font-semibold text-blue-900 mb-2">Need Help?</h3>
                        <p className="text-sm text-blue-700">
                            Visit the our support team to get immediate help with a quick response.
                        </p>
                    </div>
                </div>

                {/* Department-wise Patient Load */}
                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">
                        Department-wise Patient Load
                    </h2>

                    {/* Chart */}
                    <div className="space-y-6">
                        {[
                            { name: "Emergency", value: 152, percent: 95 },
                            { name: "Cardiology", value: 125, percent: 78 },
                            { name: "Neurology", value: 99, percent: 62 },
                            { name: "Orthopedics", value: 88, percent: 55 },
                            { name: "Pediatrics", value: 72, percent: 45 },
                        ].map((item) => (
                            <div key={item.name}>
                                {/* Desktop layout */}
                                <div className="hidden sm:grid grid-cols-[120px_1fr_40px] items-center gap-4">
                                    <span className="text-gray-700 font-medium text-right">
                                        {item.name}
                                    </span>

                                    <div className="relative w-full">
                                        <div className="h-4 sm:h-5 bg-gray-200 rounded"></div>
                                        <div
                                            className="absolute top-0 left-0 h-4 sm:h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded transition-all duration-500"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>

                                    <span className="text-gray-600 text-sm text-right">
                                        {item.value}
                                    </span>
                                </div>

                                {/* Mobile layout */}
                                <div className="sm:hidden space-y-2">
                                    <span className="text-gray-700 font-medium">{item.name}</span>

                                    <div className="relative w-full">
                                        <div className="h-3 bg-gray-200 rounded"></div>
                                        <div
                                            className="absolute top-0 left-0 h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>

                                    <span className="text-gray-600 text-sm">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Horizontal scale — DESKTOP ONLY */}
                    <div className="hidden sm:grid grid-cols-[120px_1fr_40px] mt-8 text-sm font-medium text-gray-600">
                        <span></span>

                        <div className="flex justify-between">
                            <span>0</span>
                            <span>40</span>
                            <span>80</span>
                            <span>120</span>
                            <span>160</span>
                        </div>

                        <span></span>
                    </div>
                </div>


            </div>
        </div>
    );
}