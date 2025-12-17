// components/UserManagementCard.tsx
import React from 'react';
import { Users, UserPlus, ChevronRight } from 'lucide-react';
import usersImg from '@/assets/admin-dashboard/providers-header.png';
import Image from 'next/image';

export default function Header() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-500 text-white p-3 rounded-xl flex-shrink-0">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Providers</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Manage all healthcare providers and their schedules
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">24</p>
                                <p className="text-sm text-gray-600">Active Providers</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full flex-shrink-0"></div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">8</p>
                                <p className="text-sm text-gray-600">Departments</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <div>
                                <p className="text-xl font-semibold text-gray-900">156</p>
                                <p className="text-sm text-gray-600">Slots Avaiable</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Image + Button */}
                <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
                    {/* Image with gradient background */}
                    <div className="p-4 sm:p-6 rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-500/10">
                        <Image
                            src={usersImg}
                            alt="User Management Illustration"

                            className="w-30 object-contain"
                            priority
                        />
                    </div>

                    {/* Add New User Button */}
                    <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl text-sm">
                        <UserPlus className="w-5 h-5" />
                        <span>Add Provider</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}