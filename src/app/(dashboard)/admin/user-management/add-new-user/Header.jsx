'use client';

import React from 'react';
import { ArrowLeft, UserPlus, Shield, Mail } from 'lucide-react';
import usersImg from '@/assets/admin-dashboard/new-users-section.png';
import Image from 'next/image';

export default function AddNewUserHeader() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                {/* Left Section */}
                <div className="flex-1">
                    {/* Back Link */}
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Back to User List
                    </button>

                    {/* Title and Description */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-2 md:p-4 rounded-2xl shadow-lg">
                            <UserPlus className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Add New User
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Create a new staff or patient account
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-6 mt-8">
                        <button className="flex items-center gap-3 px-5 py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-all">
                            <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                                <div className="w-4 h-4 bg-blue-500 rounded-full" />
                            </div>
                            <span className="text-sm font-medium">
                                Quick Setup
                            </span>
                        </button>

                        <button className="flex items-center gap-3 px-5 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-all">
                            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                                <Shield className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium">
                                Auto Permissions
                            </span>
                        </button>

                        <button className="flex items-center gap-3 px-5 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all">
                            <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                                <Mail className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-sm font-medium">
                                Email Invitation
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Section - Image Only */}
                <div className="hidden lg:flex w-80 justify-end">
                    <Image
                        src={usersImg}
                        alt="Add New User Illustration"
                        className="w-48 object-contain"
                        priority
                    />
                </div>

            </div>
        </div>
    );
}
