'use client';

import React from 'react';
import { BarChart3, DollarSign, TrendingUp, FileText, Download, Calendar } from 'lucide-react';

export default function FinancialReports() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 space-y-10">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-5 rounded shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Financial Reports</h1>
                        <p className="text-xs text-gray-600 mt-1">Generate and export billing analytics</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 lg:inline hidden to-purple-600 rounded-2xl p-3 shadow-lg">
                        <BarChart3 className="w-10 h-10 text-white" />
                    </div>
                </div>
            </div>

            {/* Date Filter */}
            <div>
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                    <div className="flex sm:flex-row flex-col items-center gap-2 flex-1 w-full">
                        <div className="relative flex-1">
                            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <span className="text-gray-600 text-sm font-medium">to</span>
                        <div className="relative flex-1">
                            <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                            <input
                                type="date"
                                className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition shadow">
                        Apply Filter
                    </button>
                </div>

                {/* Report Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                    {/* Daily Revenue Report */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Daily Revenue Report</h3>
                                <p className="text-xs text-gray-600">Comprehensive daily financial summary</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-blue-700 hover:to-blue-800 transition shadow flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                            <button className="bg-white border-2 border-green-300 text-green-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* Payment Method Breakdown */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-2xl shadow flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-700" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Payment Method Breakdown</h3>
                                <p className="text-xs text-gray-600">Analysis by cash, card, online, bank</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-blue-700 hover:to-blue-800 transition shadow flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                            <button className="bg-white border-2 border-green-300 text-green-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* Insurance Claims Summary */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Insurance Claims Summary</h3>
                                <p className="text-xs text-gray-600">Claims submitted, approved, and rejected</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-blue-700 hover:to-blue-800 transition shadow flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                            <button className="bg-white border-2 border-green-300 text-green-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export Excel
                            </button>
                        </div>
                    </div>

                    {/* Outstanding Payments */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-5">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-white rounded-2xl shadow flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-700" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-gray-900">Outstanding Payments</h3>
                                <p className="text-xs text-gray-600">Unpaid and partial invoices report</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2.5">
                            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium hover:from-blue-700 hover:to-blue-800 transition shadow flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                            <button className="bg-white border-2 border-green-300 text-green-700 px-4 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition flex items-center justify-center gap-1.5">
                                <Download className="w-4 h-4" />
                                Export Excel
                            </button>
                        </div>
                    </div>
                </div>

                {/* Today's Financial Summary */}
                <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-6 border border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-900 mb-5">Today's Financial Summary</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-teal-700">PKR 285K</p>
                            <p className="text-xs text-gray-700 mt-1">Revenue Collected</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">18</p>
                            <p className="text-xs text-gray-700 mt-1">Invoices Generated</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-orange-600">PKR 208K</p>
                            <p className="text-xs text-gray-700 mt-1">Outstanding</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">8</p>
                            <p className="text-xs text-gray-700 mt-1">Insurance Claims</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}