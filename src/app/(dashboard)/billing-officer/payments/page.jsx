'use client';

import React, { useState } from 'react';
import { Receipt, CreditCard, Smartphone, Building2, CheckCircle, X, Download, Printer, DollarSign, Search } from 'lucide-react';

const payments = [
    {
        id: 'PAY-2024-001',
        invoice: 'INV-2024-001',
        patient: 'Sarah Mitchell',
        amount: '45,000',
        method: 'cash',
        reference: '-',
        date: 'Dec 26',
        time: '09:30 AM',
        status: 'completed',
    },
    {
        id: 'PAY-2024-002',
        invoice: 'INV-2024-002',
        patient: 'Robert Chen',
        amount: '28,000',
        method: 'card',
        reference: 'TXN-45678 90123',
        date: 'Dec 26',
        time: '10:15 AM',
        status: 'completed',
    },
    {
        id: 'PAY-2024-003',
        invoice: 'INV-2024-003',
        patient: 'Emily Parker',
        amount: '30,000',
        method: 'online',
        reference: 'ONL-98765 43210',
        date: 'Dec 26',
        time: '11:45 AM',
        status: 'completed',
    },
    {
        id: 'PAY-2024-004',
        invoice: 'INV-2024-004',
        patient: 'Michael Brown',
        amount: '15,000',
        method: 'bank',
        reference: 'BANK-1234 567890',
        date: 'Dec 25',
        time: '03:20 PM',
        status: 'completed',
    },
    {
        id: 'PAY-2024-005',
        invoice: 'INV-2024-005',
        patient: 'Jennifer Lee',
        amount: '22,000',
        method: 'online',
        reference: 'ONL-55566 66677',
        date: 'Dec 25',
        time: '02:10 PM',
        status: 'failed',
    },
    {
        id: 'PAY-2024-006',
        invoice: 'INV-2024-006',
        patient: 'David Wilson',
        amount: '18,000',
        method: 'card',
        reference: 'TXN-77788 89999',
        date: 'Dec 25',
        time: '01:30 PM',
        status: 'completed',
    },
];

const getMethodConfig = (method) => {
    switch (method) {
        case 'cash':
            return { bg: 'bg-green-100', text: 'text-green-800', icon: <DollarSign className="w-3 h-3" /> };
        case 'card':
            return { bg: 'bg-blue-100', text: 'text-blue-800', icon: <CreditCard className="w-3 h-3" /> };
        case 'online':
            return { bg: 'bg-purple-100', text: 'text-purple-800', icon: <Smartphone className="w-3 h-3" /> };
        case 'bank':
            return { bg: 'bg-gray-100', text: 'text-gray-800', icon: <Building2 className="w-3 h-3" /> };
        default:
            return {};
    }
};

export default function PaymentHistory() {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const handleViewDetails = (payment) => {
        setSelectedPayment(payment);
        setShowDetailsModal(true);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 px-4 space-y-10">
                {/* Header */}
                <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 py-6 rounded shadow-sm">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment History</h1>
                            <p className="text-sm text-gray-600 mt-1">Track all payment transactions and collections</p>
                        </div>
                        <div className="bg-teal-600 rounded-2xl lg:inline hidden p-4 shadow-lg">
                            <Receipt className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="bg-green-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-green-900">PKR 136,000</p>
                            <p className="text-sm text-green-700 mt-1">Total Collected</p>
                        </div>
                        <div className="bg-blue-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-blue-900">5</p>
                            <p className="text-sm text-blue-700 mt-1">Completed</p>
                        </div>
                        <div className="bg-red-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-red-900">1</p>
                            <p className="text-sm text-red-700 mt-1">Failed</p>
                        </div>
                        <div className="bg-purple-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-purple-900">6</p>
                            <p className="text-sm text-purple-700 mt-1">Total Transactions</p>
                        </div>
                    </div>

                    {/* Payment Method Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        <div className="bg-green-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                            <DollarSign className="w-6 h-6 text-green-700" />
                            <div>
                                <p className="text-sm font-medium text-green-900">Cash</p>
                                <p className="text-lg font-bold text-green-900">PKR 45,000</p>
                            </div>
                        </div>
                        <div className="bg-blue-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                            <CreditCard className="w-6 h-6 text-blue-700" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">Card</p>
                                <p className="text-lg font-bold text-blue-900">PKR 46,000</p>
                            </div>
                        </div>
                        <div className="bg-purple-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                            <Smartphone className="w-6 h-6 text-purple-700" />
                            <div>
                                <p className="text-sm font-medium text-purple-900">Online</p>
                                <p className="text-lg font-bold text-purple-900">PKR 30,000</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-5 py-3 flex items-center gap-3">
                            <Building2 className="w-6 h-6 text-gray-700" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">Bank</p>
                                <p className="text-lg font-bold text-gray-900">PKR 15,000</p>
                            </div>
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by patient, payment ID, or invoice ID..."
                                className="w-full pl-12 pr-4 py-3.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium">All</button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Cash</button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Card</button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Online</button>
                            <button className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">Bank</button>
                        </div>
                    </div>

                    {/* Payments Table - Reduced font sizes */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">All Payments (6)</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Payment ID</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Invoice ID</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Patient</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Amount</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Method</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Reference ID</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Date & Time</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {payments.map((payment, index) => {
                                        const methodConfig = getMethodConfig(payment.method);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                                            <span className="text-teal-700 font-bold text-xs">P</span>
                                                        </div>
                                                        <p className="text-xs font-medium text-gray-900">{payment.id}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs text-gray-700">{payment.invoice}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs font-medium text-gray-900">{payment.patient}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-xs font-medium text-gray-900">PKR {payment.amount}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${methodConfig.bg} ${methodConfig.text}`}>
                                                        {methodConfig.icon}
                                                        {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-xs text-gray-700">{payment.reference}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-xs text-gray-700">{payment.date}<br /><span className="text-xs">{payment.time}</span></p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {payment.status === 'completed' ? (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Completed
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                                            Failed
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => handleViewDetails(payment)}
                                                        className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-200 transition"
                                                    >
                                                        View Details
                                                    </button>
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

            {/* Payment Details Modal */}
            {showDetailsModal && selectedPayment && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Payment Details</h2>
                                    <p className="text-xs text-gray-600">{selectedPayment.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 sm:p-5 space-y-5">
                                {/* Success Banner */}
                                <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-base font-semibold text-green-900">Payment Successful</p>
                                            <p className="text-xs text-green-800">Transaction completed successfully</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Amount Paid */}
                                <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
                                    <p className="text-xs text-gray-700 mb-1">Amount Paid</p>
                                    <p className="text-4xl font-bold text-teal-700">PKR {selectedPayment.amount}</p>
                                    <span className="inline-block mt-3 px-5 py-1.5 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                                        Online Payment
                                    </span>
                                </div>

                                {/* Payment Information */}
                                <div className="bg-white rounded-2xl p-5 border border-gray-200">
                                    <h3 className="text-base font-semibold text-gray-900 mb-4">Payment Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-gray-600">Payment ID</p>
                                                <p className="font-medium text-gray-900">{selectedPayment.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Patient Name</p>
                                                <p className="font-medium text-gray-900">{selectedPayment.patient}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Payment Date</p>
                                                <p className="font-medium text-gray-900">December 26, 2024</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Collected By</p>
                                                <p className="font-medium text-gray-900">System</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-gray-600">Invoice ID</p>
                                                <p className="font-medium text-gray-900">{selectedPayment.invoice}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Reference / Transaction ID</p>
                                                <p className="font-medium text-gray-900">{selectedPayment.reference}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Payment Time</p>
                                                <p className="font-medium text-gray-900">{selectedPayment.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Transaction Note */}
                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <p className="text-xs text-gray-700">
                                        <strong>Transaction Note:</strong> Payment recorded in the system. Invoice has been marked as paid.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pb-6">
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                    >
                                        Close
                                    </button>
                                    <button className="px-6 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Printer className="w-4 h-4" />
                                        Print Receipt
                                    </button>
                                    <button className="px-6 py-2.5 text-xs font-medium text-teal-700 bg-white border-2 border-teal-300 rounded-lg hover:bg-teal-50 transition flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Download className="w-4 h-4" />
                                        Download PDF
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