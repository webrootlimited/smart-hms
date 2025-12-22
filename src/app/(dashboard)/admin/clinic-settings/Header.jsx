'use client';

import img from "@/assets/admin-dashboard/clinic-header.png";
import React from 'react';
import { Building2, Users, TrendingUp, MapPin, Plus } from 'lucide-react';
import Image from "next/image";

export default function Header() {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg border border-white/50 overflow-hidden relative">

                    {/* Header Section */}
                    <div className="px-3 py-4">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8">

                            {/* Left: Title + Description */}
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                                    <Building2 className="w-6 sm:w-7 h-6 sm:h-7 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Clinic Locations</h1>
                                    <p className="text-[9px] sm:text-xs text-gray-500 mt-1">Manage all hospital facilities and branches</p>
                                </div>
                            </div>

                            {/* Top Right: Add Location Button */}
                            <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-xs sm:text-sm font-medium">
                                <Plus className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                Add Location
                                <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Stats + Image Section */}
                    <div className="px-3 relative">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">

                            {/* Stats Cards */}
                            <div className="flex flex-wrap items-start justify-start gap-3 sm:gap-5">
                                {/* Active Locations */}
                                <div className="bg-gradient-to-br from-teal-400 to-teal-600 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-md min-w-[110px] sm:min-w-28">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                            <Building2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                        </div>
                                        <div>
                                            <p className="text-lg sm:text-2xl font-bold">4</p>
                                            <p className="text-[8px] sm:text-[10px] opacity-90 leading-tight">Active Locations</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Total Staff */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-md min-w-[110px] sm:min-w-28">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                            <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                        </div>
                                        <div>
                                            <p className="text-lg sm:text-2xl font-bold">124</p>
                                            <p className="text-[8px] sm:text-[10px] opacity-90 leading-tight">Total Staff</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Monthly Patients */}
                                <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-md min-w-[110px] sm:min-w-28">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                            <TrendingUp className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                        </div>
                                        <div>
                                            <p className="text-lg sm:text-2xl font-bold">2.4K</p>
                                            <p className="text-[8px] sm:text-[10px] opacity-90 leading-tight">Monthly Patients</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Cities Coverage */}
                                <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white px-4 sm:px-5 py-3 rounded-2xl shadow-md min-w-[110px] sm:min-w-28">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="p-1.5 bg-white/20 rounded-lg">
                                            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                                        </div>
                                        <div>
                                            <p className="text-lg sm:text-2xl font-bold">3</p>
                                            <p className="text-[8px] sm:text-[10px] opacity-90 leading-tight">Cities Coverage</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Image */}
                            <div className="relative mt-4 lg:mt-0 w-full md:w-[200px]">
                                <Image
                                    src={img}
                                    alt="Clinic Dashboard Header"
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
