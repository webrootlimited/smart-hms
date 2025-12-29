'use client';

import React from 'react';
import {
    FileText,
    Shield,
    AlertCircle,
    RefreshCw,
    TrendingUp,
    DollarSign,
    Receipt,
    CreditCard,
} from 'lucide-react';

export default function BillingDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4 space-y-10">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-6 rounded-md shadow-md space-y-10">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Billing Dashboard</h1>
                        <p className="text-sm text-gray-600 mt-1">Financial overview and invoice management</p>
                    </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-green-100 rounded-2xl p-5 text-center">
                        <p className="text-xl font-bold text-green-900">PKR 285,000</p>
                        <p className="text-sm text-green-700 mt-1">Today's Revenue</p>
                    </div>
                    <div className="bg-blue-100 rounded-2xl p-5 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-blue-700" />
                            <p className="text-xl font-bold text-blue-900">12</p>
                        </div>
                        <p className="text-sm text-blue-700">Pending Invoices</p>
                    </div>
                    <div className="bg-yellow-100 rounded-2xl p-5 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-yellow-700" />
                            <p className="text-xl font-bold text-yellow-900">PKR 208,000</p>
                        </div>
                        <p className="text-sm text-yellow-700">Outstanding</p>
                    </div>
                </div>
            </div>

            <div >
                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Pending Invoices Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">12 Pending Invoices</h2>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-600">Draft</span>
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-600">Unpaid</span>
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">7</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-base text-gray-600">Partial</span>
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">2</span>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm mb-6">
                            <div className="flex justify-between">
                                <span className="text-gray-600">PKR 45,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">PKR 125,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">PKR 38,000</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
                            View Invoices →
                        </button>
                    </div>

                    {/* Insurance Claims Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900">25 Insurance Claims</h2>
                        </div>

                        <div className="space-y-5 mb-6">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Pending Submission</span>
                                    <span className="font-medium">8</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Approved</span>
                                    <span className="font-medium">15</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600">Rejected</span>
                                    <span className="font-medium">2</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full border border-purple-300 text-purple-700 py-3 rounded-xl font-medium hover:bg-purple-50 transition">
                            View Claims
                        </button>
                    </div>

                    {/* Failed Payments Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">4 Failed Payments</h2>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Online Payment</p>
                                        <p className="text-xs text-gray-500">Amount: PKR 22,000</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">3 failed</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">POS Payment</p>
                                        <p className="text-xs text-gray-500">Amount: PKR 8,500</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">1 failed</span>
                            </div>
                        </div>

                        <button className="w-full bg-red-600 text-white py-3 rounded-xl font-medium hover:bg-red-700 transition flex items-center justify-center gap-2">
                            <RefreshCw className="w-5 h-5" />
                            Retry Payments
                        </button>
                    </div>

                    {/* Refund Requests Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">3 Refund Requests</h2>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pending Approval</span>
                                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">3</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Processed Today</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">7</span>
                            </div>
                        </div>

                        <button className="w-full border border-orange-300 text-orange-700 py-3 rounded-xl font-medium hover:bg-orange-50 transition">
                            Review Refunds
                        </button>
                    </div>

                    {/* Revenue Overview Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-200 lg:col-span-2">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
                                    <p className="text-sm text-gray-600">Last 7 days performance</p>
                                </div>
                            </div>
                            <button className="border border-green-300 text-green-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-50 transition">
                                View Reports
                            </button>
                        </div>

                        <div className="flex items-end justify-between gap-2 mb-6">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                <div key={day} className="flex-1 text-center">
                                    <div
                                        className="mx-auto bg-gradient-to-b from-green-400 to-green-600 rounded-t-lg"
                                        style={{ height: `${60 + i * 10}px` }}
                                    ></div>
                                    <p className="text-xs text-gray-600 mt-2">{day}</p>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">PKR 1.8M</p>
                                <p className="text-sm text-gray-600">Weekly Revenue</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">PKR 285K</p>
                                <p className="text-sm text-gray-600">Today's Collection</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">PKR 208K</p>
                                <p className="text-sm text-gray-600">Outstanding</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}