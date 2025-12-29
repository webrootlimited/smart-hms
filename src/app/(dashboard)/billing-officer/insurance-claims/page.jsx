'use client';

import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, XCircle, X, Download, Upload, FileText } from 'lucide-react';

const claims = [
    {
        id: 'CLM-2024-001',
        patient: 'Sarah Mitchell',
        provider: 'State Life Insurance',
        policy: 'SLI-45678',
        amount: '45,000',
        status: 'submitted',
    },
    {
        id: 'CLM-2024-002',
        patient: 'Robert Chen',
        provider: 'Jubilee Life',
        policy: 'JUB-98765',
        amount: '65,000',
        status: 'approved',
        approvalDate: 'Dec 22, 2024',
    },
    {
        id: 'CLM-2024-003',
        patient: 'Emily Parker',
        provider: 'Adamjee Insurance',
        policy: 'ADM-12345',
        amount: '32,000',
        status: 'pending',
    },
    {
        id: 'CLM-2024-004',
        patient: 'David Wilson',
        provider: 'EFU Life',
        policy: 'EFU-55555',
        amount: '18,000',
        status: 'rejected',
    },
];

const sampleServices = [
    { name: 'Consultation Fee', description: 'Primary consultation with specialist', amount: '5,000' },
    { name: 'Diagnostic Tests', description: 'ECG, Blood tests, X-Ray', amount: '8,000' },
    { name: 'Medication', description: 'Prescribed medicines', amount: '3,500' },
];

const sampleDocuments = [
    { name: 'Medical_Report.pdf', size: '2.4 MB', date: 'Dec 24' },
    { name: 'Prescription.pdf', size: '1.1 MB', date: 'Dec 24' },
    { name: 'Invoice_Copy.pdf', size: '850 KB', date: 'Dec 24' },
];

export default function InsuranceClaims() {
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState(null);

    const handleViewDetails = (claim) => {
        setSelectedClaim(claim);
        setShowDetailsModal(true);
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'submitted':
                return { bg: 'bg-blue-100', text: 'text-blue-800', icon: <Clock className="w-4 h-4" />, label: 'Submitted' };
            case 'approved':
                return { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle className="w-4 h-4" />, label: 'Approved' };
            case 'pending':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Clock className="w-4 h-4" />, label: 'Pending Submission' };
            case 'rejected':
                return { bg: 'bg-red-100', text: 'text-red-800', icon: <XCircle className="w-4 h-4" />, label: 'Rejected' };
            default:
                return {};
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 ">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 rounded-2xl shadow-sm px-4 py-4 mb-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Insurance Claims</h1>
                            <p className="text-sm text-gray-600">Submit and track insurance claim submissions</p>
                        </div>
                        <div className="bg-purple-600 lg:inline hidden rounded-2xl p-4 shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="max-w-7xl mx-auto mb-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-purple-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-purple-900">4</p>
                            <p className="text-sm text-purple-700 mt-1">Total Claims</p>
                        </div>
                        <div className="bg-yellow-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-yellow-900">1</p>
                            <p className="text-sm text-yellow-700 mt-1">Pending</p>
                        </div>
                        <div className="bg-green-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-green-900">1</p>
                            <p className="text-sm text-green-700 mt-1">Approved</p>
                        </div>
                        <div className="bg-red-100 rounded-2xl px-6 py-4 text-center shadow-sm">
                            <p className="text-3xl font-bold text-red-900">1</p>
                            <p className="text-sm text-red-700 mt-1">Rejected</p>
                        </div>
                    </div>
                </div>

                {/* Claims Table */}
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">All Claims (4)</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px]">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Claim ID</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Patient</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Insurance Provider</th>
                                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-700 uppercase">Policy Number</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Amount</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Status</th>
                                        <th className="text-center px-6 py-3 text-xs font-medium text-gray-700 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {claims.map((claim, index) => {
                                        const statusConfig = getStatusConfig(claim.status);
                                        return (
                                            <tr key={index} className="hover:bg-gray-50 transition">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                            <span className="text-purple-700 font-bold text-xs">C</span>
                                                        </div>
                                                        <p className="text-sm font-medium text-gray-900">{claim.id}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium text-gray-900">{claim.patient}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700">{claim.provider}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-700">{claim.policy}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-sm font-medium text-gray-900">PKR {claim.amount}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                                                        {statusConfig.icon}
                                                        {statusConfig.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {claim.status === 'pending' ? (
                                                        <button className="bg-purple-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition">
                                                            Submit Claim
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleViewDetails(claim)}
                                                            className="bg-white border border-gray-300 text-gray-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                                                        >
                                                            View Details
                                                        </button>
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

            {/* Insurance Claim Details Modal */}
            {showDetailsModal && selectedClaim && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg sm:max-w-2xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-900">Insurance Claim Details</h2>
                                    <p className="text-xs text-gray-600">{selectedClaim.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Fully Scrollable Content */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 sm:p-6 space-y-5">
                                {/* Status Banner */}
                                {selectedClaim.status === 'approved' && (
                                    <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center gap-2.5">
                                                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                                                <div>
                                                    <p className="text-base font-semibold text-green-900">Approved</p>
                                                    <p className="text-xs text-green-800">Claim has been approved by insurance provider</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 text-right">
                                                Approval Date<br />
                                                <span className="font-medium">Dec 22, 2024</span>
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Claim Amount */}
                                <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100">
                                    <p className="text-xs text-purple-700 mb-1">Claim Amount</p>
                                    <p className="text-3xl sm:text-4xl font-bold text-purple-900">PKR {selectedClaim.amount}</p>
                                    <button className="mt-3 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition">
                                        Insurance Coverage Request
                                    </button>
                                </div>

                                {/* Patient & Policy Info */}
                                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                    <h3 className="text-base font-semibold text-gray-900 mb-4">Patient & Policy Information</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-gray-600">Patient Name</p>
                                                <p className="font-medium text-gray-900">{selectedClaim.patient}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Policy Number</p>
                                                <p className="font-medium text-gray-900">{selectedClaim.policy}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Submission Date</p>
                                                <p className="font-medium text-gray-900">December 20, 2024</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-gray-600">Insurance Provider</p>
                                                <p className="font-medium text-gray-900">{selectedClaim.provider}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Claim ID</p>
                                                <p className="font-medium text-gray-900">{selectedClaim.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Claim Amount</p>
                                                <p className="font-medium text-purple-900 text-base">PKR {selectedClaim.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Covered Services */}
                                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                                    <h3 className="text-base font-semibold text-gray-900 mb-4">Covered Services</h3>
                                    <div className="space-y-3">
                                        {sampleServices.map((service, i) => (
                                            <div key={i} className="bg-white rounded-lg p-3 border border-gray-200">
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{service.name}</p>
                                                        <p className="text-xs text-gray-600 mt-0.5">{service.description}</p>
                                                    </div>
                                                    <p className="text-sm font-semibold text-gray-900">PKR {service.amount}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Supporting Documents */}
                                <div className="bg-white rounded-2xl p-4 border border-gray-200">
                                    <h3 className="text-base font-semibold text-gray-900 mb-4">Supporting Documents</h3>
                                    <div className="space-y-3">
                                        {sampleDocuments.map((doc, i) => (
                                            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <FileText className="w-4 h-4 text-red-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                                        <p className="text-xs text-gray-600">{doc.size} • Uploaded on {doc.date}</p>
                                                    </div>
                                                </div>
                                                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1.5 text-xs font-medium">
                                                    <Download className="w-3.5 h-3.5" />
                                                    Download
                                                </button>
                                            </div>
                                        ))}
                                        <button className="w-full py-2.5 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition flex items-center justify-center gap-2 text-xs">
                                            <Upload className="w-4 h-4" />
                                            Upload Additional Documents
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pb-6">
                                    <button
                                        onClick={() => setShowDetailsModal(false)}
                                        className="px-6 py-2.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                                    >
                                        Close
                                    </button>
                                    <button className="px-6 py-2.5 text-xs font-medium text-white bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow flex items-center justify-center gap-2 w-full sm:w-auto">
                                        <Download className="w-4 h-4" />
                                        Download Approval
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