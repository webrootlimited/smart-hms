'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';


export default function PrescriptionsList() {
    const [activeTab, setActiveTab] = useState('All');
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);

    const tabs = [
        { name: 'All', count: 12 },
        { name: 'Active', count: 5 },
        { name: 'Completed', count: 4 },
        { name: 'Expired', count: 1 },
        { name: 'Refill Requested', count: 2 },
    ];

    // Full 3 prescriptions as in the original screenshot
    const prescriptions = [
        {
            name: 'Lisinopril',
            generic: 'Prinivil (Lisinopril)',
            rxId: 'RX-2024-001',
            status: 'Active',
            statusColor: 'bg-green-100 text-green-700',
            dosage: '10mg',
            frequency: 'Once daily',
            form: 'Tablet',
            duration: '30 days',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Cardiology • City Medical Center',
            instructions: 'Take with food in the morning',
            issued: 'Dec 10, 2024',
            validUntil: 'Jan 10, 2025',
            refillsRemaining: 2,
            quantity: 30,
            hasRefillButton: true,
            refillPending: false,
        },
        {
            name: 'Metformin',
            generic: 'Glucophage (Metformin HCl)',
            rxId: 'RX-2024-002',
            status: 'Refill Requested',
            statusColor: 'bg-yellow-100 text-yellow-700',
            dosage: '500mg',
            frequency: 'Twice daily',
            form: 'Tablet',
            duration: '30 days',
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Endocrinology • City Medical Center',
            instructions: 'Take with meals',
            issued: 'Dec 12, 2024',
            validUntil: 'Jan 12, 2025',
            refillsRemaining: 0,
            quantity: 60,
            hasRefillButton: false,
            refillPending: true,
        },
        {
            name: 'Atorvastatin',
            generic: 'Lipitor (Atorvastatin Calcium)',
            rxId: 'RX-2024-003',
            status: 'Active',
            statusColor: 'bg-green-100 text-green-700',
            dosage: '20mg',
            frequency: 'Once daily at bedtime',
            form: 'Tablet',
            duration: '90 days',
            doctor: 'Dr. Robert Martinez',
            specialty: 'Cardiology • City Medical',
            instructions: 'Take at night before bed',
            issued: 'Dec 8, 2024',
            validUntil: 'Mar 8, 2025',
            refillsRemaining: 3,
            quantity: 90,
            hasRefillButton: false,
            refillPending: false,
        },
    ];

    return (
        <>
            {/* Main Page - Prescriptions List */}
            <div className="min-h-screen bg-gray-50 ">
                <div >
                    {/* Tabs */}
                    <div className="bg-white rounded-2xl shadow-sm p-3 mb-8">
                        <div className="flex flex-wrap gap-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === tab.name
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {tab.name} <span className="ml-1 font-bold">{tab.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* All 3 Prescription Cards */}
                    <div className="space-y-6">
                        {prescriptions.map((prescription, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="p-5">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <span className="text-white text-2xl">∞</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {prescription.name}
                                                    </h3>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${prescription.statusColor}`}
                                                    >
                                                        • {prescription.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{prescription.generic}</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Prescription ID: {prescription.rxId}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dosage Info Bar */}
                                    <div className="bg-blue-50 rounded-xl p-4 mb-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600 text-xs">Dosage</p>
                                                <p className="font-medium text-gray-900">{prescription.dosage}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 text-xs">Frequency</p>
                                                <p className="font-medium text-gray-900">{prescription.frequency}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 text-xs">Form</p>
                                                <p className="font-medium text-gray-900">{prescription.form}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600 text-xs">Duration</p>
                                                <p className="font-medium text-gray-900">{prescription.duration}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Prescribed By */}
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 text-lg font-medium">
                                                {prescription.doctor.charAt(4)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                Prescribed by {prescription.doctor}
                                            </p>
                                            <p className="text-xs text-gray-600">{prescription.specialty}</p>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="bg-yellow-50 rounded-xl p-3 mb-4">
                                        <p className="text-sm text-yellow-800 flex items-start">
                                            <span className="mr-2">📋</span>
                                            <span className="font-medium">Instructions</span>
                                        </p>
                                        <p className="text-sm text-yellow-900 ml-6 mt-1">
                                            {prescription.instructions}
                                        </p>
                                    </div>

                                    {/* Dates & Refills */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-600 mb-5">
                                        <div>
                                            <span className="block">Issued:</span>
                                            <span className="font-medium text-gray-900">{prescription.issued}</span>
                                        </div>
                                        <div>
                                            <span className="block">Valid until:</span>
                                            <span className="font-medium text-gray-900">{prescription.validUntil}</span>
                                        </div>
                                        <div>
                                            <span className="block">Refills remaining:</span>
                                            <span className="font-medium text-gray-900">{prescription.refillsRemaining}</span>
                                        </div>
                                        <div>
                                            <span className="block">Quantity:</span>
                                            <span className="font-medium text-gray-900">{prescription.quantity}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setIsDetailsModalOpen(true)}
                                            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700"
                                        >
                                            View Details
                                        </button>
                                        <button className="px-5 py-2.5 border border-blue-200 text-blue-700 rounded-xl text-sm font-medium hover:bg-blue-50">
                                            Download PDF
                                        </button>
                                        {prescription.hasRefillButton && (
                                            <button
                                                onClick={() => setIsRefillModalOpen(true)}
                                                className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700"
                                            >
                                                Request Refill
                                            </button>
                                        )}
                                        {prescription.refillPending && (
                                            <button className="px-5 py-2.5 bg-yellow-100 text-yellow-700 rounded-xl text-sm font-medium border border-yellow-300">
                                                Refill Pending
                                            </button>
                                        )}
                                        <button className="px-5 py-2.5 border border-purple-200 text-purple-700 rounded-xl text-sm font-medium hover:bg-purple-50">
                                            Message Doctor
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===== REFILL REQUEST MODAL (Exact UI Match) ===== */}
            {isRefillModalOpen && (
                createPortal(<>
                    <div
                        className="fixed inset-0 bg-black/50 z-[99999]"
                        onClick={() => setIsRefillModalOpen(false)}
                    />
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-1 sm:p-4 overflow-y-auto">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-br from-green-50 to-white px-2 py-5 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white text-2xl">↻</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Request Refill</h2>
                                        <p className="text-sm text-gray-600">Confirm your refill request details</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsRefillModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Body - Scrollable */}
                            <div className="flex-1 overflow-y-auto px-2 py-6 space-y-6">
                                {/* Prescription Details */}
                                <div className="bg-blue-50 rounded-2xl p-5">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                        💊 Prescription Details
                                    </h3>
                                    <div className="bg-white rounded-xl p-4 mb-4">
                                        <p className="text-xs text-gray-600">Medication</p>
                                        <p className="text-lg font-bold text-gray-900">Lisinopril 10mg</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/70 rounded-xl p-4">
                                            <p className="text-xs text-gray-600">Frequency</p>
                                            <p className="font-medium">Once daily</p>
                                        </div>
                                        <div className="bg-white/70 rounded-xl p-4">
                                            <p className="text-xs text-gray-600">Quantity</p>
                                            <p className="font-medium">30</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Prescribing Doctor */}
                                <div className="bg-purple-50 rounded-2xl p-5">
                                    <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                        👨‍⚕️ Prescribing Doctor
                                    </h3>
                                    <div className="bg-white rounded-xl p-4 flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                                            <span className="text-purple-700 font-bold text-lg">S</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Dr. Sarah Johnson</p>
                                            <p className="text-sm text-gray-600">Cardiology</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Refills Available */}
                                <div className="bg-green-50 rounded-2xl p-5 text-center">
                                    <div className="flex justify-center mb-2">
                                        <span className="text-3xl text-green-600">✓</span>
                                    </div>
                                    <p className="font-semibold text-gray-800">Refills Available</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        You have <span className="font-bold text-green-700">2 refill(s)</span> remaining for this prescription.
                                    </p>
                                </div>

                                {/* Additional Notes */}
                                <div>
                                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                        ℹ️ Additional Notes (Optional)
                                    </h3>
                                    <textarea
                                        placeholder="Add any comments or questions for your doctor..."
                                        className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-700"
                                        rows={4}
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Let your doctor know if you're experiencing any side effects or have concerns.
                                    </p>
                                </div>

                                {/* Before You Submit */}
                                <div className="bg-blue-50 rounded-2xl p-5">
                                    <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                                        ℹ️ Before you submit:
                                    </h3>
                                    <ul className="space-y-2 text-sm text-blue-900 list-disc pl-5">
                                        <li>Your doctor will review this request within 24-48 hours</li>
                                        <li>You'll receive a notification once it's approved or if more information is needed</li>
                                        <li>Approved refills will be sent directly to your pharmacy</li>
                                        <li>Contact your doctor directly for urgent medication needs</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-between items-stretch sm:items-center">
                                <button
                                    onClick={() => setIsRefillModalOpen(false)}
                                    className="w-full sm:w-auto px-6 py-1 text-base sm:text-sm border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button className="w-full sm:w-auto px-6 py-1 text-base sm:text-sm bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 flex items-center justify-center space-x-2">
                                    <span>Submit Refill Request</span>
                                    <span className="text-lg">↑</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </>, document.body)
            )}

            {/* ===== PRESCRIPTION DETAILS MODAL (Full from earlier) ===== */}
            {isDetailsModalOpen && (
                createPortal(<>
                    <div
                        className="fixed inset-0 bg-black/50 z-[9999]"
                        onClick={() => setIsDetailsModalOpen(false)}
                    />
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-1 sm:p-4 overflow-y-auto">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="bg-gradient-to-br from-blue-50 to-white px-2 py-5 border-b border-gray-200 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                        <span className="text-white text-2xl">∞</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">Lisinopril</h2>
                                        <p className="text-sm text-gray-600">Prinivil (Lisinopril)</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                    ×
                                </button>
                            </div>

                            {/* Scrollable Content - Full Details */}
                            <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-6 space-y-6">
                                {/* Prescription Summary + Prescribed By */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-2xl p-5">
                                        <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                            📄 Prescription Summary
                                        </h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Prescription ID</p>
                                                <p className="font-medium">RX-2024-001</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Issue Date</p>
                                                <p className="font-medium">Dec 10, 2024</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Valid Until</p>
                                                <p className="font-medium">Jan 10, 2025</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Status</p>
                                                <p className="font-medium text-green-700">Active</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-purple-50 rounded-2xl p-5">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                                                    <span className="text-purple-700 font-bold">S</span>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                                                    <p className="text-sm text-gray-600">Cardiology</p>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600">🏥 City Medical Center</p>
                                            <button className="mt-4 w-full bg-purple-100 text-purple-700 py-2 rounded-xl text-sm font-medium hover:bg-purple-200">
                                                Message Doctor
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Medication Details + Refill Status */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 rounded-2xl p-5">
                                        <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
                                            💊 Medication Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white rounded-xl p-3">
                                                    <p className="text-xs text-gray-600">Strength / Dosage</p>
                                                    <p className="font-bold text-lg">10mg</p>
                                                </div>
                                                <div className="bg-white rounded-xl p-3">
                                                    <p className="text-xs text-gray-600">Form</p>
                                                    <p className="font-medium">Tablet</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3 text-sm">
                                                <div className="bg-white/70 rounded-xl p-3 text-center">
                                                    <p className="text-gray-600 text-xs">Frequency</p>
                                                    <p className="font-medium">Once daily</p>
                                                </div>
                                                <div className="bg-white/70 rounded-xl p-3 text-center">
                                                    <p className="text-gray-600 text-xs">Duration</p>
                                                    <p className="font-medium">30 days</p>
                                                </div>
                                                <div className="bg-white/70 rounded-xl p-3 text-center">
                                                    <p className="text-gray-600 text-xs">Quantity</p>
                                                    <p className="font-medium">30 Tablets</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-green-50 rounded-2xl p-5 text-center">
                                            <p className="text-4xl font-bold text-green-700">2</p>
                                            <p className="text-sm text-gray-700 mt-1">Refills Remaining</p>
                                            <button className="mt-4 w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700">
                                                Request Refill
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* How to Take */}
                                <div className="bg-yellow-50 rounded-2xl p-5">
                                    <h3 className="text-sm font-medium text-yellow-800 mb-3 flex items-center">
                                        ℹ️ How to Take This Medicine
                                    </h3>
                                    <p className="text-sm text-yellow-900">Take with food in the morning</p>
                                </div>

                                {/* Important Warnings */}
                                <div className="bg-red-50 rounded-2xl p-5">
                                    <h3 className="text-sm font-medium text-red-800 mb-3 flex items-center">
                                        ⚠️ Important Warnings
                                    </h3>
                                    <div className="space-y-3">
                                        <p className="text-sm text-red-700 flex items-start">
                                            <span className="mr-2">⚠️</span> May cause dizziness
                                        </p>
                                        <p className="text-sm text-red-700 flex items-start">
                                            <span className="mr-2">⚠️</span> Avoid alcohol
                                        </p>
                                    </div>
                                </div>

                                {/* Patient Guidance */}
                                <div className="bg-purple-50 rounded-2xl p-5 space-y-4">
                                    <h3 className="text-sm font-medium text-purple-800 mb-3">💡 Patient Guidance</h3>
                                    <div className="bg-white/70 rounded-xl p-4">
                                        <p className="text-xs text-purple-700 font-medium mb-1">Missed Dose</p>
                                        <p className="text-sm text-gray-700">
                                            Take as soon as you remember. If it's almost time for the next dose, skip the missed dose. Do not double the dose.
                                        </p>
                                    </div>
                                    <div className="bg-white/70 rounded-xl p-4">
                                        <p className="text-xs text-purple-700 font-medium mb-1">Storage</p>
                                        <p className="text-sm text-gray-700">
                                            Store at room temperature away from moisture and heat. Keep out of reach of children.
                                        </p>
                                    </div>
                                    <div className="bg-white/70 rounded-xl p-4">
                                        <p className="text-xs text-purple-700 font-medium mb-1">Best Time to Take</p>
                                        <p className="text-sm text-gray-700">Take with food in the morning</p>
                                    </div>
                                </div>

                                {/* Pharmacy & Insurance */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-blue-50 rounded-2xl p-5">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">🏥 Pharmacy</h4>
                                        <p className="font-medium">Preferred Pharmacy</p>
                                        <p className="text-sm text-gray-600">CVS Pharmacy</p>
                                        <p className="text-sm text-gray-600">123 Main St, New York</p>
                                    </div>
                                    <div className="bg-cyan-50 rounded-2xl p-5">
                                        <h4 className="text-sm font-medium text-gray-700 mb-3">🛡️ Insurance Coverage</h4>
                                        <p className="text-sm text-gray-600">Provider</p>
                                        <p className="font-medium">BlueCross BlueShield</p>
                                        <p className="text-sm text-gray-600 mt-3">Copay</p>
                                        <p className="text-xl font-bold text-cyan-700">$15.00</p>
                                    </div>
                                </div>

                                <div className="text-center text-xs text-gray-500">
                                    🔒 Secure & HIPAA Compliant
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-2 sm:px-6 py-5 bg-gray-50 border-t border-gray-200 flex sm:flex-row flex-col gap-2 justify-between">
                                <button
                                    onClick={() => setIsDetailsModalOpen(false)}
                                    className="px-6 py-1 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-100"
                                >
                                    Close
                                </button>
                                <button className="px-6 py-1 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 flex items-center justify-center space-x-2">
                                    <span>Download Prescription PDF</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </>, document.body)
            )}
        </>
    );
}