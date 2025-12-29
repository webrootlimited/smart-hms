'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Building2, ToggleLeft, Pin } from 'lucide-react';

export default function ClinicRegistrationForm() {
    const [status, setStatus] = useState('active');

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div>
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 rounded-lg p-2">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">Basic Clinic Information</h2>
                                <p className="text-xs text-gray-600">Enter clinic details and location</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {/* Clinic Information */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Clinic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Clinic Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., City Medical Center"
                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Clinic Code (Auto-generated)
                                    </label>
                                    <input
                                        type="text"
                                        value="CLN-R8383Y"
                                        readOnly
                                        className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Clinic Type *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Clinic Type"
                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <button
                                            onClick={() => setStatus('active')}
                                            className={`px-4 py-1.5 text-xs rounded-full transition ${status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            Active
                                        </button>
                                        <button
                                            onClick={() => setStatus('inactive')}
                                            className={`px-4 py-1.5 text-xs rounded-full transition ${status === 'inactive'
                                                ? 'bg-gray-300 text-gray-800'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            Inactive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Contact Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            defaultValue="+92 300 1234567"
                                            className="w-full pl-10 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            defaultValue="info@clinic.com"
                                            className="w-full pl-10 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Emergency Contact
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            defaultValue="+92 333 9876543"
                                            className="w-full pl-10 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-600" />
                                Address Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Area *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Gulberg III, DHA Phase 5"
                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input
                                        type="text"
                                        defaultValue="54000"
                                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Full Address *
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Enter complete address with street, building number, landmarks..."
                                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Map Location */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    Map Location (Critical)
                                </h3>
                                <button className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full flex items-center gap-1">
                                    <Pin className="w-3 h-3" />
                                    Use Current Location
                                </button>
                            </div>
                            <div className="bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 h-64 flex flex-col items-center justify-center relative">
                                <div className="text-blue-600 mb-4">
                                    <MapPin className="w-12 h-12" />
                                </div>
                                <p className="text-sm font-medium text-gray-700">Interactive Map</p>
                                <p className="text-xs text-gray-500 mt-1">Drag pin to set exact location</p>
                                <button className="mt-4 text-xs bg-white text-blue-600 px-4 py-2 rounded-md shadow flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    Click to search location
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Latitude (Auto-filled)
                                    </label>
                                    <input
                                        type="text"
                                        value="31.5204"
                                        readOnly
                                        className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Longitude (Auto-filled)
                                    </label>
                                    <input
                                        type="text"
                                        value="74.3587"
                                        readOnly
                                        className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition">
                                Save & Continue
                                <span className="text-lg">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}