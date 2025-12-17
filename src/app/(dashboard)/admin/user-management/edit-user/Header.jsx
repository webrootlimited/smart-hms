// components/UserManagementCard.tsx
import React from 'react';
import { Users, UserPlus, ChevronRight, Settings, Activity, Lock, ClipboardList } from 'lucide-react';

import usersImg from '@/assets/admin-dashboard/edit-user.png';
import Image from 'next/image';

export default function Header() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[linear-gradient(135deg,#9810FA_0%,#8200DB_100%)] text-white p-3 rounded-xl flex-shrink-0">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Edit user Profile</h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Update user information and manage permissions
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">

                        <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-purple-600" />
                            <p className="text-sm text-gray-700">Live status</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-purple-600" />
                            <p className="text-sm text-gray-700">Access Control</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-4 h-4 text-blue-500" />
                            <p className="text-sm text-gray-700">Activity Log</p>
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
                    <button className="w-full sm:w-auto bg-[linear-gradient(90deg,#009966_0%,#007A55_100%)]
 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl text-sm">
                        <UserPlus className="w-5 h-5" />
                        <span>Save Changes</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}