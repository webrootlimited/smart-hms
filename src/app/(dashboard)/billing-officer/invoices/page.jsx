'use client';

import React, { useState } from 'react';
import {
    FileText,
    Plus,
    Search,
    Eye,
    DollarSign,
    Send,
    CheckCircle,
    XCircle,
    AlertCircle,
    Edit3,
    X as CloseIcon,
    Trash2,
    CreditCard,
    Smartphone,
    Building2,
    Receipt
} from 'lucide-react';

const invoices = [
    {
        id: 'INV-2024-001',
        visitId: 'VST-001',
        patient: 'Sarah Mitchell',
        date: 'Dec 26, 2024',
        amount: '45,000',
        paid: '0',
        due: '45,000',
        status: 'unpaid',
        insurance: true,
    },
    {
        id: 'INV-2024-002',
        visitId: 'Gen02',
        patient: 'Robert Chen',
        date: 'Dec 26, 2024',
        amount: '28,000',
        paid: '28,000',
        due: '',
        status: 'paid',
        insurance: false,
    },
    {
        id: 'INV-2024-003',
        visitId: 'Kef-003',
        patient: 'Emily Parker',
        date: 'Dec 25, 2024',
        amount: '65,000',
        paid: '30,000',
        due: '35,000',
        status: 'partial',
        insurance: true,
    },
    {
        id: 'INV-2024-004',
        visitId: 'VST-004',
        patient: 'Michael Brown',
        date: 'Dec 25, 2024',
        amount: '22,000',
        paid: '0',
        due: '22,000',
        status: 'draft',
        insurance: false,
    },
];

const sampleCharges = [
    { name: 'Consultation Fee', type: 'Consultation', qty: 1, unitPrice: 5000, total: 5000 },
    { name: 'ECG Test', type: 'Diagnostic', qty: 1, unitPrice: 3000, total: 3000 },
];

export default function InvoiceManagement() {
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const handleGenerateClick = () => {
        setShowGenerateModal(true);
    };

    const handlePaymentClick = (invoice) => {
        setSelectedInvoice(invoice);
        setShowPaymentModal(true);
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'unpaid':
                return { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-4 h-4" /> };
            case 'paid':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-4 h-4" /> };
            case 'partial':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <AlertCircle className="w-4 h-4" /> };
            case 'draft':
                return { bg: 'bg-gray-100', text: 'text-gray-700', icon: <Edit3 className="w-4 h-4" /> };
            default:
                return {};
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-4">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 rounded-2xl shadow-sm px-4 py-4 mb-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
                            <p className="text-sm text-gray-600">Generate, track, and manage patient invoices</p>
                        </div>
                        <button
                            onClick={handleGenerateClick}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-medium hover:from-blue-700 hover:to-blue-800 transition flex items-center gap-2 shadow-lg"
                        >
                            <Plus className="w-5 h-5" />
                            Generate Invoice
                        </button>
                    </div>
                </div>

                {/* Summary & Filters */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="bg-blue-100 rounded-2xl px-5 py-3 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-blue-700" />
                            <span className="text-lg font-bold text-blue-900">4</span>
                            <span className="text-sm text-blue-700">Total Invoices</span>
                        </div>
                        <div className="bg-red-100 rounded-2xl px-5 py-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-700" />
                            <span className="text-lg font-bold text-red-900">PKR 45,000</span>
                            <span className="text-sm text-red-700">Unpaid Amount</span>
                        </div>

                        <div className="flex flex-wrap gap-2 ml-auto">
                            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl font-medium">All</button>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50">Draft</button>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50">Unpaid</button>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50">Partial</button>
                            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50">Paid</button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by patient name or invoice ID..."
                            className="w-full pl-12 pr-4 py-3.5 text-sm border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Invoices Table */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">All Invoices (4)</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Invoice ID</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Patient Name</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Visit Date</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Amount</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Paid</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Insurance</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {invoices.map((invoice, index) => {
                                        const statusConfig = getStatusConfig(invoice.status);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-4 h-4 text-blue-600" />
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900">{invoice.id}</p>
                                                            <p className="text-xs text-gray-500">{invoice.visitId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900">{invoice.patient}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700">{invoice.date}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-sm font-medium text-gray-900">PKR {invoice.amount}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {invoice.paid === '0' ? (
                                                        <p className="text-sm text-red-700">Due: PKR {invoice.due}</p>
                                                    ) : (
                                                        <p className="text-sm text-green-700">PKR {invoice.paid}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                        {statusConfig.icon}
                                                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {invoice.insurance ? (
                                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                            Insured
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">—</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition">
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handlePaymentClick(invoice)}
                                                            className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                                                        >
                                                            <DollarSign className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 rounded-lg hover:bg-purple-100 text-purple-600 transition">
                                                            <Send className="w-4 h-4" />
                                                        </button>
                                                    </div>
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

            {/* Generate Invoice Modal */}
            {showGenerateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-3xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Generate Invoice</h2>
                                    <p className="text-sm text-gray-600">Create billing invoice for patient visit</p>
                                </div>
                            </div>
                            <button onClick={() => setShowGenerateModal(false)} className="text-gray-400 hover:text-gray-600">
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="p-6 space-y-6">
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                    <p className="text-base font-semibold text-gray-800 mb-4">Patient & Visit Summary (Read-only)</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-600">Patient Name</p>
                                            <p className="font-medium text-gray-900">Sarah Mitchell</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Visit ID</p>
                                            <p className="font-medium text-gray-900">VST-2024-156</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Doctor</p>
                                            <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Date</p>
                                            <p className="font-medium text-gray-900">Dec 26, 2024</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-gray-200">
                                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Charges Breakdown</h3>
                                        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                                            <Plus className="w-4 h-4" />
                                            Add Item
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Item Name</th>
                                                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">Type</th>
                                                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">Qty</th>
                                                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">Unit Price</th>
                                                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-700">Total</th>
                                                    <th className="text-center px-6 py-3 text-sm font-medium text-gray-700"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {sampleCharges.map((charge, i) => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-4">
                                                            <input type="text" defaultValue={charge.name} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <input type="text" defaultValue={charge.type} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <input type="number" defaultValue={charge.qty} className="w-20 mx-auto px-4 py-2.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <input type="number" defaultValue={charge.unitPrice} className="w-28 mx-auto px-4 py-2.5 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="font-medium text-gray-900">{charge.total.toLocaleString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button className="text-red-600 hover:text-red-700">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-5">Discount (Optional)</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type</label>
                                            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>Percentage %</option>
                                                <option>Fixed Amount</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value</label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-3.5 text-gray-500">%</span>
                                                <input type="number" defaultValue="0" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                                            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>Select Reason...</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                                    <div className="flex items-center gap-3 mb-5">
                                        <FileText className="w-7 h-7 text-green-700" />
                                        <h3 className="text-lg font-semibold text-gray-900">Invoice Summary</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-base">
                                            <span className="text-gray-700">Subtotal:</span>
                                            <span className="font-medium text-gray-900">PKR 8,000</span>
                                        </div>
                                        <div className="flex justify-between text-base">
                                            <span className="text-gray-700">Tax (5%):</span>
                                            <span className="font-medium text-gray-900">PKR 400</span>
                                        </div>
                                        <div className="pt-4 border-t-2 border-green-200 flex justify-between">
                                            <span className="text-xl font-bold text-gray-900">Grand Total:</span>
                                            <span className="text-3xl font-bold text-green-700">PKR 8,400</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pb-6">
                                    <button onClick={() => setShowGenerateModal(false)} className="px-8 py-3.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition w-full sm:w-auto">
                                        Cancel
                                    </button>
                                    <button className="px-8 py-3.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition w-full sm:w-auto">
                                        Save Draft
                                    </button>
                                    <button className="px-10 py-3.5 text-base font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl hover:from-teal-600 hover:to-teal-700 transition shadow-lg flex items-center justify-center gap-3 w-full sm:w-auto">
                                        <FileText className="w-6 h-6" />
                                        Finalize Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Process Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-md h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Process Payment</h2>
                                    <p className="text-xs text-gray-600">Collect payment for invoice {selectedInvoice.id}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600 transition">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 sm:p-5 space-y-5">
                                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                    <div className="grid grid-cols-3 gap-3 text-center text-xs">
                                        <div>
                                            <p className="text-gray-600">Patient</p>
                                            <p className="font-medium text-gray-900">{selectedInvoice.patient}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Total Amount</p>
                                            <p className="font-medium text-gray-900">PKR {selectedInvoice.amount}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Already Paid</p>
                                            <p className="font-medium text-green-700">PKR {selectedInvoice.paid}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 rounded-2xl p-4 text-center border border-yellow-200">
                                    <p className="text-xs text-yellow-700">Outstanding Amount</p>
                                    <p className="text-3xl font-bold text-orange-600 mt-1">
                                        PKR {selectedInvoice.due || selectedInvoice.amount}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { icon: DollarSign, label: 'Cash', color: 'bg-green-100 text-green-700' },
                                            { icon: CreditCard, label: 'POS / Card', color: 'bg-gray-100 text-gray-700' },
                                            { icon: Smartphone, label: 'Online', color: 'bg-gray-100 text-gray-700' },
                                            { icon: Building2, label: 'Bank Transfer', color: 'bg-gray-100 text-gray-700' },
                                        ].map((method, i) => {
                                            const Icon = method.icon;
                                            return (
                                                <div key={i} className="flex flex-col items-center justify-center py-4 rounded-2xl border border-gray-200 bg-white">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.color}`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-xs font-medium text-gray-900 mt-2">{method.label}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                            Amount Received <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                defaultValue={selectedInvoice.due || selectedInvoice.amount}
                                                className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                                            Payment Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                    </div>
                                </div>

                                <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2.5 border border-green-200">
                                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <div className="text-xs text-green-900">
                                        <p className="font-medium">Full Payment</p>
                                        <p>Invoice will be marked as fully paid</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pb-5">
                                    <button onClick={() => setShowPaymentModal(false)} className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto">
                                        Cancel
                                    </button>
                                    <button className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <CheckCircle className="w-4 h-4" />
                                        Confirm Payment
                                    </button>
                                    <button className="px-6 py-2.5 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Receipt className="w-4 h-4" />
                                        Print Receipt
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