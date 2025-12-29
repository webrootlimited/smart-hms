'use client';

import React, { useState } from 'react';
import { RefreshCw, Clock, CheckCircle, AlertTriangle, X } from 'lucide-react';

const refundRequests = [
    {
        id: 'REF-2024-001',
        patient: 'Sarah Mitchell',
        invoice: 'INV-2024-045',
        amount: '12,000',
        reason: 'Service not provided',
        date: 'Dec 25',
        status: 'pending',
    },
    {
        id: 'REF-2024-002',
        patient: 'Robert Chen',
        invoice: 'INV-2024-032',
        amount: '8,500',
        reason: 'Duplicate payment',
        date: 'Dec 24',
        status: 'approved',
    },
    {
        id: 'REF-2024-003',
        patient: 'Emily Parker',
        invoice: 'INV-2024-038',
        amount: '5,000',
        reason: 'Overcharged amount',
        date: 'Dec 26',
        status: 'pending',
    },
];

export default function RefundsDisputes() {
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    const handleApproveClick = (request) => {
        setSelectedRequest(request);
        setShowApproveModal(true);
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'pending':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-3.5 h-3.5" /> };
            case 'approved':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-3.5 h-3.5" /> };
            default:
                return {};
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 px-4 space-y-10">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-6">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Refunds & Disputes</h1>
                            <p className="text-sm text-gray-600 mt-1">Manage refund requests and payment disputes</p>
                        </div>
                        <div className="bg-orange-500 lg:inline hidden rounded-2xl p-4 shadow-lg">
                            <RefreshCw className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-orange-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-orange-900">2</p>
                            <p className="text-sm text-orange-700 mt-1">Pending Approval</p>
                        </div>
                        <div className="bg-green-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-green-900">1</p>
                            <p className="text-sm text-green-700 mt-1">Approved Today</p>
                        </div>
                        <div className="bg-blue-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-blue-900">PKR 25,500</p>
                            <p className="text-sm text-blue-700 mt-1">Total Refund Amount</p>
                        </div>
                    </div>
                </div>

                {/* Refund Requests Table */}
                <div>
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">Refund Requests (3)</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Request ID</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Patient</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Invoice ID</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Amount</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Reason</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Request Date</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {refundRequests.map((request, index) => {
                                        const statusConfig = getStatusConfig(request.status);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                            <span className="text-orange-700 font-bold text-xs">R</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-900">{request.id}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900">{request.patient}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700">{request.invoice}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-sm font-medium text-gray-900">PKR {request.amount}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700">{request.reason}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-sm text-gray-700">{request.date}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {request.status === 'approved' ? (
                                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                            {statusConfig.icon}
                                                            Approved
                                                        </span>
                                                    ) : (
                                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                            {statusConfig.icon}
                                                            Pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {request.status === 'pending' ? (
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button
                                                                onClick={() => handleApproveClick(request)}
                                                                className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-green-700 transition"
                                                            >
                                                                Approve
                                                            </button>
                                                            <button className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-red-700 transition">
                                                                Reject
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-500">Processed</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Approve Refund Modal */}
            {showApproveModal && selectedRequest && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Approve Refund</h2>
                                    <p className="text-xs text-gray-600">Review and approve refund request</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 sm:p-5 space-y-5">
                                {/* Critical Warning */}
                                <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
                                        <div className="text-xs">
                                            <p className="font-semibold text-yellow-900">Critical Financial Action</p>
                                            <p className="text-yellow-800 mt-1">
                                                This will initiate a refund of <strong>PKR {selectedRequest.amount}</strong> to the patient. This action cannot be undone. Please ensure all details are verified.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Original Invoice Summary */}
                                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Original Invoice Summary</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                                        <div>
                                            <p className="text-gray-600">Patient</p>
                                            <p className="font-medium text-gray-900">{selectedRequest.patient}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Invoice ID</p>
                                            <p className="font-medium text-gray-900">{selectedRequest.invoice}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Request Date</p>
                                            <p className="font-medium text-gray-900">{selectedRequest.date}, 2024</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Refund Details */}
                                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Refund Details</h3>
                                    <div className="space-y-4 text-xs">
                                        <div>
                                            <p className="text-gray-600">Refund Reason</p>
                                            <p className="font-medium text-gray-900">{selectedRequest.reason}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Requested Amount</p>
                                            <p className="text-2xl font-bold text-orange-900">PKR {selectedRequest.amount}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Add Notes */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-2">Add Notes (Optional)</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Add any internal notes or comments..."
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pb-6">
                                    <button
                                        onClick={() => setShowApproveModal(false)}
                                        className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                    <button className="px-8 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <CheckCircle className="w-4 h-4" />
                                        Approve Refund
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}