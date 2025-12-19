'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import {
    User,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Home,
    AlertCircle,
    Upload,
    GraduationCap,
    Building,
    CheckCircle,
    Users,
    Star,
    Activity,
} from 'lucide-react';

export default function DoctorProfile() {
    const [activeTab, setActiveTab] = useState('Personal Information');

    const tabs = [
        'Personal Information',
        'Professional Details',
        'Work Hours',
        'Locations',
        'Telehealth Settings',
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
            {/* Header Card */}
            <div className="space-y-15">
                <div className="relative bg-gradient-to-b from-[#0284C7] via-[#0369A1] to-[#0284C7] h-32 sm:h-40 w-full rounded-3xl">
                    <Image
                        src="https://i.pravatar.cc/150"
                        width={80}
                        height={80}
                        className="w-20 sm:w-24 border-4 border-white rounded-3xl h-20 sm:h-24 absolute bottom-0 left-4 sm:left-6 translate-y-1/2 object-cover"
                        alt="Dr. Sarah Johnson"
                    />
                    <div className="bg-white/10 absolute -right-10 -top-10 w-32 sm:w-40 h-32 sm:h-40 rounded-full"></div>
                </div>

                <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 text-green-600 text-xs">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span className="font-medium">Active</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dr. Sarah Johnson</h1>
                            <p className="text-sm text-gray-600 mt-1">Cardiologist</p>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3 text-xs text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <GraduationCap className="w-4 h-4" />
                                    <span>15 Years Experience</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Building className="w-4 h-4" />
                                    <span>Main Campus</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>Board Certified</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <div className="bg-blue-100 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-2">
                                <Users className="w-4 h-4" />
                                <span>847 Patients</span>
                            </div>
                            <div className="bg-purple-100 text-purple-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-2">
                                <Star className="w-4 h-4" />
                                <span>4.9 Rating</span>
                            </div>
                            <div className="bg-green-100 text-green-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center space-x-2">
                                <Activity className="w-4 h-4" />
                                <span>98% Success</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto pt-8 sm:pt-10 pb-10 sm:pb-12">
                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-x-auto">
                    <div className="flex border-b border-gray-200 whitespace-nowrap">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition flex-shrink-0 ${activeTab === tab
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Personal Information Tab Content */}
                {activeTab === 'Personal Information' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                                <p className="text-xs text-gray-600 mt-1">
                                    Update your personal details and contact information
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                            {/* Left Column */}
                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Full Name</label>
                                    <div className="mt-2 relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="text"
                                            defaultValue="Dr. Sarah Johnson"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-700">Phone Number</label>
                                    <div className="mt-2 relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="tel"
                                            defaultValue="+1 (555) 123-4567"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-700">Home Address</label>
                                    <div className="mt-2 relative">
                                        <Home className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
                                        <textarea
                                            rows={4}
                                            className="w-full pl-12 pr-4 pt-3 pb-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none resize-none text-sm"
                                            placeholder="Enter address..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-700">Date of Birth</label>
                                    <div className="mt-2 relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="date"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-medium text-gray-700">Email Address</label>
                                    <div className="mt-2 relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="email"
                                            defaultValue="sarah.johnson@healthcare.com"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-700">Emergency Contact</label>
                                    <div className="mt-2 relative">
                                        <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <input
                                            type="tel"
                                            defaultValue="+1 (555) 987-6543"
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-medium text-gray-700">Gender</label>
                                    <div className="mt-2 relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                        <select className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none appearance-none text-sm">
                                            <option>Select gender</option>
                                            <option>Female</option>
                                            <option>Male</option>
                                            <option>Other</option>
                                            <option>Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Photo Upload */}
                        <div className="mt-8 bg-gray-50 rounded-2xl p-5 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Update Profile Photo</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            JPG, PNG or GIF. Max size 5MB. Recommended: 500x500px
                                        </p>
                                    </div>
                                </div>
                                <label className="cursor-pointer w-full sm:w-auto">
                                    <input type="file" accept="image/*" className="hidden" />
                                    <div className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 text-center">
                                        Choose File
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}