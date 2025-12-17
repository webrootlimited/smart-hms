'use client';

import React, { useState } from 'react';
import { Clock, FileText, Upload, CheckSquare, Users, DollarSign, Home, Video, Calendar } from 'lucide-react';

export default function Form() {
    const [selectedProviders, setSelectedProviders] = useState(['SJ']);

    const providers = [
        { id: 'SJ', name: 'Dr. Sarah Johnson', specialty: 'Cardiology', color: 'bg-blue-500' },
        { id: 'MC', name: 'Dr. Michael Chen', specialty: 'Neurology', color: 'bg-purple-500' },
        { id: 'ER', name: 'Dr. Emily Roberts', specialty: 'Pediatrics', color: 'bg-pink-500' },
        { id: 'JW', name: 'Dr. James Williams', specialty: 'Orthopedics', color: 'bg-green-500' },
        { id: 'LA', name: 'Dr. Lisa Anderson', specialty: 'Dermatology', color: 'bg-orange-500' },
    ];

    const forms = [
        'Medical History',
        'Consent Form',
        'Privacy Agreement',
        'Allergy Information',
        'Current Medications',
        'Emergency Contact',
    ];

    const toggleProvider = (id) => {
        setSelectedProviders(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Basic Information */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
                                    <p className="text-xs text-gray-500">Define the appointment type details</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Type Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="e.g., General Checkup"
                                        className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Description</label>
                                    <textarea
                                        placeholder="Brief description of this appointment type..."
                                        rows={3}
                                        className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Duration <span className="text-red-500">*</span></label>
                                    <div className="mt-1 relative">
                                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="30 minutes"
                                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Required Documents */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Upload className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Required Documents</h3>
                                    <p className="text-xs text-gray-500">Pre-visit documents patients must upload</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2">
                                    <Upload className="w-3 h-3" />
                                    Insurance Card
                                    <button className="ml-1 text-yellow-600 hover:text-yellow-800">×</button>
                                </span>
                                <span className="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    ID Verification
                                    <button className="ml-1 text-yellow-600 hover:text-yellow-800">×</button>
                                </span>
                            </div>
                            <div className="flex sm:flex-row flex-col gap-3 items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Add document requirement..."
                                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
                                    + Add
                                </button>
                            </div>
                        </div>

                        {/* Visit Type */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Visit Type</h3>
                                    <p className="text-xs text-gray-500">How will the appointment be conducted?</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 cursor-pointer hover:border-blue-500">
                                    <input type="radio" name="visit" className="text-blue-600" />
                                    <Home className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm font-medium">In-Clinic</p>
                                        <p className="text-xs text-gray-500">Physical visit at hospital</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 cursor-pointer hover:border-blue-500">
                                    <input type="radio" name="visit" className="text-blue-600" />
                                    <Video className="w-5 h-5 text-gray-600" />
                                    <div>
                                        <p className="text-sm font-medium">Telehealth</p>
                                        <p className="text-xs text-gray-500">Virtual video consultation</p>
                                    </div>
                                </label>
                                <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-blue-500 bg-blue-50 cursor-pointer">
                                    <input type="radio" name="visit" className="text-blue-600" defaultChecked />
                                    <div className="flex items-center gap-2">
                                        <Home className="w-5 h-5 text-blue-600" />
                                        <Video className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Both Options</p>
                                        <p className="text-xs text-gray-500">Patient can choose either</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Pre-Visit Forms */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-pink-100 rounded-lg">
                                    <CheckSquare className="w-5 h-5 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Pre-Visit Forms</h3>
                                    <p className="text-xs text-gray-500">Forms patients must complete before appointment</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {forms.map((form, index) => (
                                    <div
                                        key={form}
                                        className={`flex items-center gap-3 p-3 rounded-lg border ${index === 0 ? 'border-pink-500 bg-pink-50' : 'border-gray-300'}`}
                                    >
                                        <FileText className={`w-5 h-5 ${index === 0 ? 'text-pink-600' : 'text-gray-500'}`} />
                                        <span className="text-sm text-gray-700">{form}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                <span className="text-xs font-medium text-red-600">1 form required</span>
                            </div>
                        </div>

                        {/* Provider Eligibility */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <Users className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Provider Eligibility</h3>
                                    <p className="text-xs text-gray-500">Select providers who can perform this appointment</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {providers.map((provider) => (
                                    <label
                                        key={provider.id}
                                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedProviders.includes(provider.id)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        onClick={() => toggleProvider(provider.id)}
                                    >
                                        <div className={`w-8 h-8 rounded-full ${provider.color} flex items-center justify-center text-white text-xs font-bold`}>
                                            {provider.id}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{provider.name}</p>
                                            <p className="text-xs text-gray-500">{provider.specialty}</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={selectedProviders.includes(provider.id)}
                                            onChange={() => { }}
                                            className="text-blue-600"
                                        />
                                    </label>
                                ))}
                            </div>
                            <div className="mt-4 p-2 bg-blue-100 rounded-lg text-center">
                                <span className="text-xs font-medium text-blue-700">
                                    {selectedProviders.length} {selectedProviders.length === 1 ? 'provider' : 'providers'} selected
                                </span>
                            </div>
                        </div>

                        {/* Fee (Optional) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Fee (Optional)</h3>
                                    <p className="text-xs text-gray-500">Set consultation fee for this appointment type</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Currency</label>
                                    <select className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>USD</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Amount</label>
                                    <div className="mt-1 relative">
                                        <span className="absolute left-3 top-2.5 text-gray-500">$</span>
                                        <input
                                            type="text"
                                            defaultValue="0.00"
                                            className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Buttons - Fixed & Beautiful */}
                    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 -mx-4 px-4 py-6 border-t border-gray-200">
                        {/* Cancel */}
                        <button className="
        w-full sm:w-auto
        px-4 py-2
        text-xs font-medium
        border border-gray-400
        text-gray-700 bg-gray-100
        rounded-md
        hover:bg-gray-200
        transition
    ">
                            Cancel
                        </button>

                        {/* Right Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">

                            <button className="
            w-full sm:w-auto
            px-4 py-2
            text-xs font-medium
            text-gray-700 bg-gray-100
            rounded-md
            border border-[#0284C7]
            hover:bg-gray-200
            transition
        ">
                                Save as Draft
                            </button>

                            <button className="
            w-full sm:w-auto
            px-5 py-2
            text-xs font-medium
            text-white bg-blue-600
            rounded-md
            hover:bg-blue-700
            flex items-center justify-center gap-2
            transition
        ">
                                Create User Account
                                <svg
                                    className="w-3.5 h-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}