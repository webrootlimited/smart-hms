'use client';

import { useState } from 'react';
import { User, Mail, Lock, Phone, Camera, Building2, MapPin, Shield, Info } from 'lucide-react';

export default function NewUserForm() {
    const [sendInvitation, setSendInvitation] = useState(true);

    return (
        <>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full">
                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter first name"
                                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Last Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter last name"
                                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        placeholder="user@hospital.com"
                                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    User Role <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-gray-400" />
                                    <select className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent">
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with uppercase and number</p>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Re-enter password"
                                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        placeholder="+1 (234) 567-8900"
                                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Profile Picture</label>
                                <div className="flex items-center gap-4">
                                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center">
                                        <User className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                        <Camera className="w-4 h-4" />
                                        Upload Photo
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (Max 2MB)</p>
                            </div>
                        </div>
                    </div>

                    {/* Department & Location */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-2 rounded-lg">
                                <Building2 className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Department & Location</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <select className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent">
                                        <option></option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Hospital/Location <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <select className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                            <Building2 className="w-5 h-5 text-purple-600 mt-0.5" />
                            <p className="text-sm text-gray-700">
                                <span className="font-medium">Department Assignment</span><br />
                                Users will be automatically added to the selected department with appropriate access levels.
                            </p>
                        </div>
                    </div>

                    {/* Permissions & Access */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Permissions & Access</h2>
                                <p className="text-xs text-gray-500">Auto-populated based on selected role</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center py-12">
                            <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center mb-4">
                                <Info className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-600">Select a role to view permissions</p>
                        </div>
                    </div>

                    {/* Send Email Invitation */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-600" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-800">Send Email Invitation</h3>
                                    <p className="text-xs text-gray-500">User will receive login credentials via email</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSendInvitation(!sendInvitation)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${sendInvitation ? 'bg-blue-600' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${sendInvitation ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between gap-3">

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