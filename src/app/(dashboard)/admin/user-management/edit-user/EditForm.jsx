'use client';

import { Mail, Phone, User, Shield, MapPin, Building2, Lock, XCircle, CheckCircle, Activity, AlertTriangle } from 'lucide-react';

export default function EditForm() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full space-y-4">
                {/* Profile Header Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                        {/* Left Part */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative">
                                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                                    SJ
                                </div>
                                <button className="absolute top-15 -right-2 bg-white rounded-full p-1 shadow-md">
                                    <User className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Dr. Sarah Johnson</h1>
                                <p className="text-sm text-gray-600">sarah.johnson@hospital.com</p>
                                <div className="flex flex-wrap items-center gap-2 mt-3">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                                        <User className="w-3 h-3" /> Doctor
                                    </span>
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1">
                                        <Building2 className="w-3 h-3" /> Cardiology
                                    </span>
                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                        Active
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-5">
                                    <div className="text-center bg-[linear-gradient(135deg,#EFF6FF_0%,#ECFEFF_100%)] px-4 py-2 rounded-lg">
                                        <p className="text-gray-500 text-sm">Joined</p>
                                        <p className="font-medium text-sm">Jan 15, 2024</p>
                                    </div>
                                    <div className="text-center bg-[linear-gradient(135deg,#EFF6FF_0%,#ECFEFF_100%)] px-4 py-2 rounded-lg">
                                        <p className="text-gray-500 text-sm">Last Login</p>
                                        <p className="font-medium text-sm">2 hours ago</p>
                                    </div>
                                    <div className="text-center bg-[linear-gradient(135deg,#FAF5FF_0%,#FDF2F8_100%)] px-4 py-2 rounded-lg">
                                        <p className="text-gray-500 text-sm">Sessions</p>
                                        <p className="font-medium text-sm">247 Total</p>
                                    </div>
                                    <div className="text-center bg-[linear-gradient(135deg,#FAF5FF_0%,#FDF2F8_100%)] px-4 py-2 rounded-lg">
                                        <p className="text-gray-500 text-sm">Location</p>
                                        <p className="font-medium text-sm">Main Hospital</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Part */}
                        <div className="flex items-center gap-4 text-sm md:items-start md:mt-0 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">Account Status</span>
                                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500">
                                    <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value="sarah.johnson@hospital.com"
                                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    value="+1 234 567 8901"
                                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role & Department */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="bg-purple-100 p-2 rounded-lg">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Role & Department</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                User Role <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-gray-400" />
                                <select className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent">
                                    <option>Doctor</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Department <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <select className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent">
                                    <option>Cardiology</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Assignment */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="bg-green-100 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">Location Assignment</h2>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                            Assigned Hospital/Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <select className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-transparent">
                                <option>Main Hospital</option>
                            </select>
                        </div>

                        <div className="mt-4 p-4 bg-green-50 rounded-lg flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-800">Multi-Location Access</p>
                                <p className="text-xs text-gray-600">User can access Main Hospital and all associated branches</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Permissions & Access Control */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <Shield className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">Permissions & Access Control</h2>
                                <p className="text-xs text-gray-500">Manage user access to system features</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">5 Active</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
                            <XCircle className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">Full System Access</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
                            <XCircle className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">User Management</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 border border-[#00BC7D] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Patient Records</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 border border-[#00BC7D] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Appointments</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 border border-[#00BC7D] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Prescriptions</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 border border-[#00BC7D] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Medical Reports</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 border border-[#00BC7D] rounded-xl">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Telehealth</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
                            <XCircle className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">Billing Access</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
                            <XCircle className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">Reports & Analytics</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-xl">
                            <XCircle className="w-5 h-5 text-gray-400" />
                            <span className="text-sm text-gray-600">System Settings</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Lock className="w-5 h-5 text-blue-600" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-800">Reset Password</h3>
                                <p className="text-xs text-gray-500">Send password reset link to user</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                            <Mail className="w-4 h-4" />
                            Send Reset Link
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                            <div>
                                <h3 className="text-sm font-medium text-gray-800">Deactivate Account</h3>
                                <p className="text-xs text-gray-500">Temporarily suspend user access</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Deactivate User
                        </button>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    {/* Left Button */}
                    <button className="
        w-full sm:w-auto
        px-4 py-2 sm:px-6 sm:py-3
        border border-[#E5E7EB]
        text-xs sm:text-sm
        font-medium text-gray-700
        rounded-lg
        hover:bg-gray-200
        flex items-center justify-center gap-2
    ">
                        <XCircle className="w-4 h-4" />
                        Discard Changes
                    </button>

                    {/* Right Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-auto">
                        <button className="
            w-full sm:w-auto
            px-4 py-2 sm:px-6 sm:py-3
            border border-[#0284C7]
            text-xs sm:text-sm
            font-medium text-blue-600
            bg-blue-50
            rounded-lg
            hover:bg-blue-100
            flex items-center justify-center gap-2
        ">
                            <Activity className="w-4 h-4" />
                            View Activity Log
                        </button>

                        <button className="
            w-full sm:w-auto
            px-5 py-2 sm:px-8 sm:py-3
            text-xs sm:text-sm
            font-medium text-white
            bg-[linear-gradient(90deg,#009966_0%,#007A55_100%)]
            rounded-lg
            hover:opacity-90
            flex items-center justify-center gap-2
        ">
                            <CheckCircle className="w-4 h-4" />
                            Save All Changes
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}