// app/patients/page.tsx
'use client';

import { useState } from 'react';
import { Search, Calendar, Users, Clock, Activity, X, Eye, Plus, AlertTriangle } from 'lucide-react';
import img from "@/assets/patient-dashboard/prescriptions-header.png";
import Image from 'next/image';

export default function PatientsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNewPrescriptionOpen, setIsNewPrescriptionOpen] = useState(false);


    const stats = [
        { label: 'Total Prescriptions', value: '142' },
        { label: 'Active Prescriptions', value: '28' },
        { label: 'Follow-up Needed', value: '15' },
        { label: 'New This Week', value: '8' },
    ];

    const tabs = [
        { label: 'Active', icon: Users, active: true },
        { label: 'Past', icon: Clock },
        { label: 'Refill Requests', icon: Calendar },
        { label: 'Details', icon: Activity },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header Card */}
                    <div className="flex justify-between items-center bg-white rounded-3xl shadow-sm overflow-hidden relative">
                        <div className="relative p-6 lg:p-8">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Central directory of all your assigned patients
                                    </p>
                                </div>

                                <button onClick={() => setIsNewPrescriptionOpen(true)}
                                    className="flex items-center gap-2 bg-[#007bff] hover:bg-[#0056b3] text-white px-4 py-2 rounded-2xl font-medium transition-all shadow-md text-sm">
                                    <Plus className="h-4 w-4" />
                                    Add Prescription
                                </button>
                            </div>

                            {/* Search Bar */}
                            <div className="mt-4">
                                <div className="relative max-w-2xl">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, ID, or condition..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-all"
                                    >
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Icons */}
                        <div className="hidden lg:block">
                            <Image src={img} alt="Prescriptions header" className="h-60 w-full object-cover" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="my-5 flex gap-2 overflow-x-auto bg-white shadow-lg items-center px-5 py-3 rounded-xl">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${tab.active
                                    ? 'bg-gradient-to-b from-blue-600 to-blue-800 shadow-[0_10px_15px_-3px_rgba(2,132,199,0.3)] text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Prescription List */}
                    <div className="space-y-6">

                        {/* Patient Card 1 - Michael Chen */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-red-500 text-2xl font-bold">
                                            ⚠
                                        </div>
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-900">Michael Chen</h2>
                                            <p className="text-sm text-gray-500">ID: PT-2846</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full">Active</span>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                                        <div className="font-semibold text-gray-800">Lisinopril</div>
                                        <div className="text-gray-600">10mg - Once daily</div>
                                        <div className="text-gray-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Dec 10, 2024
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                                    <span>Duration: 30 days</span>
                                    <span>Refills remaining: 2</span>
                                    <span className="text-red-600 font-medium flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099a1 1 0 011.486 0l5.5 6.5a1 1 0 010 1.342l-5.5 6.5a1 1 0 01-1.486 0l-5.5-6.5a1 1 0 010-1.342l5.5-6.5z" clipRule="evenodd" />
                                        </svg>
                                        Allergies: Penicillin
                                    </span>
                                </div>

                                <div className="bg-yellow-50 rounded-xl px-4 py-3 mb-6">
                                    <p className="text-sm text-gray-700">Instructions: Take with food in the morning</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition"
                                    >
                                        <Eye className="w-5 h-5" />
                                        View Details
                                    </button>

                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>

                                    <button className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Patient Card 2 - John Doe */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-red-500 text-2xl font-bold">
                                            ⚠
                                        </div>
                                        <div>
                                            <h2 className="text-base font-semibold text-gray-900">John Doe</h2>
                                            <p className="text-sm text-gray-500">ID: PT-2847</p>
                                        </div>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full">Active</span>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
                                        <div className="font-semibold text-gray-800">Atorvastatin</div>
                                        <div className="text-gray-600">20mg - Once daily at bedtime</div>
                                        <div className="text-gray-500 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Dec 8, 2024
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                                    <span>Duration: 90 days</span>
                                    <span>Refills remaining: 3</span>
                                    <span className="text-red-600 font-medium flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099a1 1 0 011.486 0l5.5 6.5a1 1 0 010 1.342l-5.5 6.5a1 1 0 01-1.486 0l-5.5-6.5a1 1 0 010-1.342l5.5-6.5z" clipRule="evenodd" />
                                        </svg>
                                        Allergies: Sulfa drugs
                                    </span>
                                </div>

                                <div className="bg-yellow-50 rounded-xl px-4 py-3 mb-6">
                                    <p className="text-sm text-gray-700">Instructions: Take at night</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                                        <Eye className="w-5 h-5" />
                                        View Details
                                    </button>

                                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit
                                    </button>

                                    <button className="bg-red-100 hover:bg-red-200 text-red-700 font-medium px-6 py-2.5 rounded-lg flex items-center gap-2 transition">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Prescription Details Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 px-2 sm:px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500 text-white rounded-full p-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Prescription Details</h2>
                                    <p className="text-sm text-gray-600">Complete medication information</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-6 space-y-6">
                            {/* Patient Info */}
                            <div className="bg-gray-50 rounded-2xl p-5 flex items-start sm:items-center sm:flex-row flex-col gap-4">
                                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-orange-400 flex items-center justify-center text-white text-2xl font-bold">
                                    MC
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">Michael Chen</h3>
                                    <p className="text-sm text-gray-600">Patient ID: PT-2846</p>
                                    <div className="mt-2 inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-medium">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099a1 1 0 011.486 0l5.5 6.5a1 1 0 010 1.342l-5.5 6.5a1 1 0 01-1.486 0l-5.5-6.5a1 1 0 010-1.342l5.5-6.5z" clipRule="evenodd" />
                                        </svg>
                                        Allergies: Penicillin
                                    </div>
                                </div>
                            </div>

                            {/* Medication Information */}
                            <div className="bg-gray-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-500 text-white rounded-full p-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-4m-6 0H5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Medication Information</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <p className="text-gray-600">Medication Name</p>
                                        <p className="font-semibold text-gray-900">Lisinopril</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Dosage</p>
                                        <p className="font-semibold text-gray-900">10mg</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Frequency</p>
                                        <p className="font-semibold text-gray-900">Once daily</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Duration</p>
                                        <p className="font-semibold text-gray-900">30 days</p>
                                    </div>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="bg-yellow-50 rounded-2xl px-5 py-4">
                                <p className="text-sm font-medium text-gray-700">Instructions for Patient:</p>
                                <p className="mt-2 text-base text-gray-800">Take with food in the morning</p>
                            </div>

                            {/* Doctor Notes */}
                            <div className="bg-purple-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-500 text-white rounded-full p-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Doctor Notes</h3>
                                </div>
                                <textarea
                                    className="w-full h-32 bg-transparent border border-purple-200 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                                    placeholder="Add clinical notes or special instructions..."
                                />
                            </div>

                            {/* Pharmacy & Insurance */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-green-50 rounded-2xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-green-500 text-white rounded-full p-2">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-6 0H5" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Pharmacy</h4>
                                    </div>
                                    <p className="font-medium text-gray-800">Main Street Pharmacy</p>
                                    <p className="text-sm text-gray-600">123 Medical Plaza, NY 10001</p>
                                </div>

                                <div className="bg-blue-50 rounded-2xl p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-blue-500 text-white rounded-full p-2">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Insurance</h4>
                                    </div>
                                    <p className="font-medium text-gray-800">BlueCross BlueShield</p>
                                    <p className="text-sm text-gray-600">Policy: BCBS-123456789</p>
                                </div>
                            </div>

                            {/* Safety Verification */}
                            <div className="bg-green-50 rounded-2xl p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-500 text-white rounded-full p-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-gray-900">Safety Verification</h4>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    <li className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        No allergy conflicts detected
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        No duplicate prescriptions found
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Dosage within safe range
                                    </li>
                                </ul>
                            </div>

                            {/* Prescription Footer */}
                            <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-600 space-y-1">
                                <p><strong>Prescribed by:</strong> Dr. Sarah Johnson</p>
                                <p><strong>Digital Signature:</strong> Verified ✓</p>
                                <p><strong>Logged:</strong> Dec 10, 2024 at 2:45 PM</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-2 sm:px-4 py-3 bg-white border-t border-gray-200 flex flex-wrap gap-2 justify-center items-center">
                            <button className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
                                Close
                            </button>
                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl flex items-center gap-1.5 hover:bg-blue-200 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-6 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 0h6" />
                                </svg>
                                <span className="text-xs font-medium">Save as Draft</span>
                            </button>
                            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl flex items-center gap-1.5 hover:bg-purple-200 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-xs font-medium">Download PDF</span>
                            </button>
                            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-1.5 hover:bg-blue-700 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2 9-2m-9-2v-8m0 8l-9-2m9 2l9-2m-9-2V7l-9 2 9 2 9-2-9-2z" />
                                </svg>
                                <span className="text-xs font-medium">Send to Patient</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* New Prescription Modal */}
            {isNewPrescriptionOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 sm:px-6 px-2 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-500 text-white rounded-full p-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">New Prescription</h2>
                                    <p className="text-sm text-gray-600">Create a new medication prescription</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsNewPrescriptionOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-2 sm:px-6 py-6 space-y-6">
                            {/* Select Patient */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Patient *
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search patient by name or ID..."
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Allergy Alert */}
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-red-800">Patient Allergies Detected</p>
                                    <p className="text-sm text-red-700 mt-1">
                                        This patient is allergic to: <strong>Penicillin, Sulfa drugs</strong>
                                    </p>
                                    <p className="text-sm text-red-600 mt-1">Please verify all medications before prescribing.</p>
                                </div>
                            </div>

                            {/* Medications Section */}
                            <div className="flex items-start sm:items-center sm:flex-row gap-3 flex-col justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Medications</h3>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2 text-xs font-medium">
                                    <Plus className="w-4 h-4" />
                                    Add Medication
                                </button>
                            </div>

                            {/* Medication Form Card */}
                            <div className="bg-gray-50 rounded-2xl sm:p-6 p-2 space-y-5">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <span className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs">Medication 1</span>
                                </div>

                                {/* Medication Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Medication Name *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Lisinopril"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Dosage & Duration Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 10mg"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 30 days"
                                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        />
                                    </div>
                                </div>

                                {/* Refills */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Refills</label>
                                    <input
                                        type="number"
                                        defaultValue="0"
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Instructions */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions for Patient</label>
                                    <textarea
                                        placeholder="e.g., Take with food in the morning"
                                        rows={3}
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Clinical Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Clinical Notes (Private)</label>
                                <textarea
                                    placeholder="Add your clinical notes here..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            {/* Preferred Pharmacy & Send Via */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Pharmacy</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Send via</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Digital Signature Confirmation */}
                            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5">
                                <p className="font-semibold text-purple-900">Digital Signature Confirmation</p>
                                <p className="text-sm text-purple-800 mt-2">
                                    I confirm that I have reviewed all medication details, verified patient allergies, and approve this prescription for electronic signature.
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="px-2 sm:px-4 py-3 bg-white border-t border-gray-200 flex flex-wrap gap-2 justify-center items-center">
                            <button
                                onClick={() => setIsNewPrescriptionOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl flex items-center gap-1.5 hover:bg-blue-200 transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-6 0V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 0h6" />
                                </svg>
                                <span className="text-xs font-medium">Save as Draft</span>
                            </button>

                            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-1.5 hover:bg-blue-700 transition font-medium">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs font-medium">Issue Prescription</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}