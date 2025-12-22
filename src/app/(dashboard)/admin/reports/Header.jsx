'use client';

import { BarChart3, Users, Calendar, DollarSign, TrendingUp, TrendingDown, Filter, Download } from 'lucide-react';

export default function Header() {
    return (
        <div className="bg-gray-50 ">
            <div >
                <div className="bg-white rounded-2xl shadow-sm p-3">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-500 rounded-xl text-white">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
                            <p className="text-sm text-gray-600">Comprehensive insights and data visualization</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* Total Patients */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-blue-200 rounded-lg">
                                    <Users className="w-5 h-5 text-blue-700" />
                                </div>
                                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>+12%</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">2,847</p>
                            <p className="text-xs text-gray-600 mt-1">Total Patients</p>
                        </div>

                        {/* Appointments */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-green-200 rounded-lg">
                                    <Calendar className="w-5 h-5 text-green-700" />
                                </div>
                                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>+8%</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">1,234</p>
                            <p className="text-xs text-gray-600 mt-1">Appointments</p>
                        </div>

                        {/* Revenue */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-purple-200 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-purple-700" />
                                </div>
                                <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>+18%</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">$284K</p>
                            <p className="text-xs text-gray-600 mt-1">Revenue</p>
                        </div>

                        {/* Attendance Rate */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-orange-200 rounded-lg">
                                    <BarChart3 className="w-5 h-5 text-orange-700" />
                                </div>
                                <div className="flex items-center gap-1 text-red-600 text-xs font-medium">
                                    <TrendingDown className="w-3 h-3" />
                                    <span>-3%</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">94.2%</p>
                            <p className="text-xs text-gray-600 mt-1">Attendance Rate</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Time Range Buttons */}
                        <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-xl">
                            <button className="px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-lg whitespace-nowrap">
                                Last 30 Days
                            </button>
                            <button className="px-4 py-2 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 whitespace-nowrap transition-colors">
                                Last 3 Months
                            </button>
                            <button className="px-4 py-2 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 whitespace-nowrap transition-colors">
                                Last 6 Months
                            </button>
                            <button className="px-4 py-2 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 whitespace-nowrap transition-colors">
                                This Year
                            </button>
                            <button className="px-4 py-2 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 whitespace-nowrap transition-colors">
                                Custom Range
                            </button>
                        </div>

                        {/* Filter & Export */}
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}