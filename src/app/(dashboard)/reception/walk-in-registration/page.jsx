'use client';

import React, { useState } from 'react';
import {
    UserPlus,
    User,
    Phone,
    IdCard,
    Calendar,
    FileText,
    ChevronLeft,
    Info,
} from 'lucide-react';

export default function WalkInRegistration() {
    const [gender, setGender] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 px-4 space-y-10">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 shadow-md rounded-lmd">
                <div className="max-w-5xl mx-auto flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-900">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">Walk-In Registration</h1>
                            <p className="text-sm text-gray-600">Register new patient without appointment</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div>
                <div className="space-y-8">

                    {/* Patient Identity Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                <User className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Patient Identity</h2>
                                <p className="text-sm text-gray-600">Basic demographic information</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter patient's full name"
                                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Phone & CNIC Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            defaultValue="+92 300 1234567"
                                            className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        CNIC / ID Number
                                    </label>
                                    <div className="relative">
                                        <IdCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            defaultValue="12345-1234567-1"
                                            className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Gender & Age Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-4">
                                        {['Male', 'Female', 'Other'].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setGender(option)}
                                                className={`flex-1 py-3 px-4 rounded-xl border transition-all ${gender === option
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Age <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                        <input
                                            type="number"
                                            placeholder="Age in years"
                                            className="w-full pl-12 pr-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Visit Information Section */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Visit Information</h2>
                                <p className="text-sm text-gray-600">Reason and department</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Visit Reason & Department Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Visit Reason <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Select Reason...</option>
                                        {/* Add options here */}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Department / Specialty <span className="text-red-500">*</span>
                                    </label>
                                    <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Select Department...</option>
                                        {/* Add options here */}
                                    </select>
                                </div>
                            </div>

                            {/* Preferred Doctor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Preferred Doctor (Optional)
                                </label>
                                <select className="w-full px-4 py-3 text-base border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Auto-assign based on availability...</option>
                                    {/* Add doctor options here */}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                        <button className="px-8 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                            Cancel
                        </button>
                        <button className="px-10 py-3.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-3">
                            <UserPlus className="w-5 h-5" />
                            Register & Create Token
                        </button>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                            <p className="font-medium mb-2">Quick Registration Tips</p>
                            <ul className="list-disc list-inside space-y-1 text-blue-800">
                                <li>Required fields marked with <span className="text-red-500">*</span> must be filled</li>
                                <li>A token will be automatically generated upon registration</li>
                                <li>Patient will be added to the queue immediately</li>
                                <li>Nurse will be notified for vitals entry</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}