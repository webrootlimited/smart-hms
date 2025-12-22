'use client';

import { Shield, Activity, Users, Lock, AlertTriangle, Search, Filter, Download } from 'lucide-react';

export default function Header() {
    return (
        <div className=" bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-3xl shadow-sm p-3">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white">
                                <Shield className="w-7 h-7" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
                                <p className="text-sm text-gray-600 mt-1">Track all system activities and user actions</p>
                            </div>
                        </div>

                        {/* Filter & Export Buttons */}
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:from-purple-600 hover:to-pink-600">
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {/* Total Events Today */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-blue-200 rounded-xl">
                                    <Activity className="w-6 h-6 text-blue-700" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">1,847</p>
                            <p className="text-xs text-gray-600 mt-1">Total Events Today</p>
                        </div>

                        {/* Active Users */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-green-200 rounded-xl">
                                    <Users className="w-6 h-6 text-green-700" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">342</p>
                            <p className="text-xs text-gray-600 mt-1">Active Users</p>
                        </div>

                        {/* Security Events */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-purple-200 rounded-xl">
                                    <Lock className="w-6 h-6 text-purple-700" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">156</p>
                            <p className="text-xs text-gray-600 mt-1">Security Events</p>
                        </div>

                        {/* Failed Attempts */}
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-100 rounded-2xl p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-orange-200 rounded-xl">
                                    <AlertTriangle className="w-6 h-6 text-orange-700" />
                                </div>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">12</p>
                            <p className="text-xs text-gray-600 mt-1">Failed Attempts</p>
                        </div>
                    </div>

                    {/* Search Bar & Tabs */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                        {/* Search Input */}
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by user, action, or IP address..."
                                className="w-full pl-12 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 bg-gray-100 p-1 rounded-2xl">
                            <button className="px-5 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-xl">
                                All Events
                            </button>
                            <button className="px-5 py-2.5 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200">
                                User Actions
                            </button>
                            <button className="px-5 py-2.5 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200">
                                Security
                            </button>
                            <button className="px-5 py-2.5 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200">
                                System
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}