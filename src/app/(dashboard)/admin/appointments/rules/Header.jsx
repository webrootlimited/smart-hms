'use client';

import React from 'react';
import { ArrowLeft, UserPlus, Mail, Shield, Zap, User, FileText, ShieldCheck } from 'lucide-react';

import usersImg from '@/assets/admin-dashboard/appointment-rules-header.png';
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
                        Back to Appointment Types
                    </button>

                    {/* Title and Description */}
                    <div className="flex items-center gap-4">
                        <div className="bg-[linear-gradient(135deg,#4F39F6_0%,#8200DB_100%)]
 text-white p-2 md:p-4 rounded-2xl shadow-lg">
                            <Shield className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Appointment Rules
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Configure policies, fees, and restrictions for appointment booking
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-5">
                        {/* Active Users */}
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <div>
                                <p className="text-xl font-semibold text-gray-900">5</p>
                                <p className="text-sm text-gray-600">Active Users</p>
                            </div>
                        </div>

                        {/* Pending Reviews */}
                        <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-purple-500 flex-shrink-0" />
                            <div>
                                <p className="text-xl font-semibold text-gray-900">12</p>
                                <p className="text-sm text-gray-600">Pending Reviews</p>
                            </div>
                        </div>

                        {/* Policy Compliance */}
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div>
                                <p className="text-sm text-gray-600">Policy Compliance</p>
                            </div>
                        </div>
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
