'use client';

import Image from 'next/image';
import React from 'react';
import img from "@/assets/patient-dashboard/prescriptions-header.png";

export default function Header() {
    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
            <div className="px-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
                    {/* Left Side: Even Smaller Text + Stats */}
                    <div className="flex-1">
                        {/* Very small heading and description */}
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                            Your Prescriptions
                        </h1>
                        <p className="text-xs lg:text-sm text-gray-600 mb-6">
                            View and manage medications prescribed by your doctor
                        </p>

                        {/* Very compact stats cards */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Active Prescriptions */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl px-4 py-3 shadow-sm min-w-[140px]">
                                <p className="text-2xl font-bold text-green-700">5</p>
                                <p className="text-xs font-medium text-green-800 mt-1">
                                    Active Prescriptions
                                </p>
                            </div>

                            {/* Refill Requests */}
                            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl px-4 py-3 shadow-sm min-w-[140px]">
                                <p className="text-2xl font-bold text-amber-700">2</p>
                                <p className="text-xs font-medium text-amber-800 mt-1">
                                    Refill Requests
                                </p>
                            </div>

                            {/* Total Prescribed */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl px-4 py-3 shadow-sm min-w-[140px]">
                                <p className="text-2xl font-bold text-indigo-700">12</p>
                                <p className="text-xs font-medium text-indigo-800 mt-1">
                                    Total Prescribed
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Significantly Smaller Image */}
                    <div className="relative w-full lg:w-auto flex justify-center">
                        <Image
                            src={img}
                            alt="Prescriptions"
                            width={300}
                            height={300}
                            className="max-w-full h-auto object-contain drop-shadow-md"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}