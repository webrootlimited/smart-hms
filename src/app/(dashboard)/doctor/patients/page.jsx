"use client";
import { Search, Plus, HeartPulse, Eye, Calendar, Users, Clock, Activity, X } from 'lucide-react';
import img from "@/assets/patient-dashboard/patients-header.png";
import Image from 'next/image';
import { useState } from 'react';

export default function PatientsPage() {
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);

    const stats = [
        { label: 'Total Patients', value: '142' },
        { label: 'Active Treatment', value: '28' },
        { label: 'Follow-up Needed', value: '15' },
        { label: 'New This Week', value: '8' },
    ];

    const tabs = [
        { label: 'All Patients', icon: Users, active: true },
        { label: 'Recent Visits', icon: Clock },
        { label: 'Upcoming Appointments', icon: Calendar },
        { label: 'Active Treatment', icon: Activity },
    ];

    const patients = [
        {
            name: 'Michael Chen',
            age: 45,
            gender: 'Male',
            id: 'PT-2846',
            condition: 'Post-Surgery Follow-up',
            lastVisit: 'Dec 12, 2024',
            nextAppointment: 'Dec 20, 2024 10:00 AM',
            status: 'Active',
        },
        {
            name: 'Sarah Anderson',
            age: 52,
            gender: 'Female',
            id: 'PT-2848',
            condition: 'Diabetes Management',
            lastVisit: 'Dec 14, 2024',
            nextAppointment: 'Dec 22, 2024 2:00 PM',
            status: 'Follow-up needed',
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header Card */}
                    <div className="flex justify-between items-centerbg-white rounded-3xl shadow-sm overflow-hidden relative">

                        <div className="relative p-6 lg:p-8">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Central directory of all your assigned patients
                                </p>
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
                            <Image src={img} className="h-70 w-full" />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="my-5 flex gap-2 overflow-x-auto bg-white shadow-lg  items-center px-5 py-2 rounded-xl">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap text-sm ${tab.active
                                    ? 'bg-gradient-to-r from-[#9810FA] to-[#4F39F6] text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-purple-50 border border-gray-200'
                                    }`}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Patient List */}
                    <div className="mt-4 space-y-3">
                        {patients.map((patient, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {patient.name[0]}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                                        <p className="text-xs text-gray-600 mt-0.5">
                                            {patient.age} years • {patient.gender}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-0.5">ID: {patient.id}</p>
                                        <p className="text-sm font-medium text-gray-800 mt-1">{patient.condition}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Last Visit</p>
                                        <p className="text-sm font-medium text-gray-900">{patient.lastVisit}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">Next Appointment</p>
                                        <p className="text-sm font-medium text-gray-900">{patient.nextAppointment}</p>
                                    </div>
                                    <div>
                                        <span
                                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${patient.status === 'Active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                                }`}
                                        >
                                            {patient.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-2 sm:mt-0">
                                    <button onClick={() => setIsPatientModalOpen(true)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all flex items-center gap-1.5 shadow-sm text-sm">
                                        <Eye className="h-3.5 w-3.5" />
                                        View
                                    </button>
                                    <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium transition-all text-sm">
                                        Schedule
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Patient Profile Modal - Only this part */}
            {isPatientModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
                        {/* Header - Fixed */}
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-5 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-lg">
                                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-2xl font-bold">
                                        JD
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                                    <p className="text-sm text-gray-600">38 years • Male</p>
                                    <p className="text-sm text-gray-500">PT-2847</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsPatientModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Tabs - Fixed */}
                        <div className="border-b border-gray-200 px-6 bg-gray-50 flex-shrink-0">
                            <div className="flex items-center gap-8 py-4 overflow-x-auto whitespace-nowrap">
                                <button className="flex items-center gap-2 pb-3 border-b-4 border-purple-600 text-purple-700 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Overview
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
                                    </svg>
                                    Medical History
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Appointments
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-4m-6 0H5" />
                                    </svg>
                                    Prescriptions
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
                                    </svg>
                                    Lab Reports
                                </button>
                                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Doctor Notes
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <p className="text-sm font-medium text-gray-600">Email</p>
                                    <p className="text-base text-gray-900 mt-1">michael.chen@email.com</p>
                                </div>
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <p className="text-sm font-medium text-gray-600">Phone</p>
                                    <p className="text-base text-gray-900 mt-1">+1 (555) 123-4567</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-gray-50 rounded-2xl p-4">
                                <p className="text-sm font-medium text-gray-600">Address</p>
                                <p className="text-base text-gray-900 mt-1">123 Main Street, New York, NY 10001</p>
                            </div>

                            {/* Allergies */}
                            <div className="bg-red-50 rounded-2xl p-4 flex items-center gap-3 border border-red-200">
                                <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099a1 1 0 011.486 0l5.5 6.5a1 1 0 010 1.342l-5.5 6.5a1 1 0 01-1.486 0l-5.5-6.5a1 1 0 010-1.342l5.5-6.5z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="font-semibold text-red-800">Allergies</p>
                                    <p className="text-base text-red-700 mt-0.5">Penicillin</p>
                                </div>
                            </div>

                            {/* Current Medications */}
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <p className="text-sm font-medium text-blue-800">Current Medications</p>
                                <p className="text-base text-blue-900 mt-1">Lisinopril 10mg, Atorvastatin 20mg</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
