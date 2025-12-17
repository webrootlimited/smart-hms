'use client';

import React from 'react';
import { ArrowLeft, UserPlus, Shield, Mail } from 'lucide-react';
import usersImg from '@/assets/admin-dashboard/new-provider-header.png';
import Image from 'next/image';

export default function Header() {
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
                                Add New Provider
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Register a new healthcare provider to the system
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-5">
                        <div className="flex items-center gap-3">
                            <p className=" text-gray-900 bg-gray-200 px-2 rounded">1</p>
                            <div>
                                <p className="text-sm text-gray-600">Personal Info</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className=" text-gray-900 bg-gray-200 px-2 rounded">2</p>                            <div>

                                <p className="text-sm text-gray-600">Work setup</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className=" text-gray-900 bg-gray-200 px-2 rounded">3</p>
                            <div>
                                <p className="text-sm text-gray-600">Credentials</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Image Only */}
                <div className="hidden lg:flex w-80 justify-end">
                    <Image
                        src={usersImg}
                        alt="Add New User Illustration"
                        className="w-40 object-contain"
                        priority
                    />
                </div>

            </div>
        </div>
    );
}
