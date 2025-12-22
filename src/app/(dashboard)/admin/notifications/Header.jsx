'use client';

import React from 'react';
import { Bell, Send, CheckCircle, Eye } from 'lucide-react';
import img from "@/assets/admin-dashboard/notifications-header.png";
import Image from 'next/image';

export default function Header() {
    return (
        <div className="flex items-start justify-center ">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start gap-6 lg:gap-8">

                {/* Left Section: Text + Stats */}
                <div className="flex-1 order-2 lg:order-1 flex flex-col justify-start items-start">
                    <div className="rounded-3xl border border-white/10 p-4 md:p-6 bg-white/5 backdrop-blur-sm w-full lg:w-auto">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg flex-shrink-0">
                                <Bell className="w-6 h-6 md:w-7 md:h-7 text-white" />
                            </div>
                            <div className="text-left">
                                <h1 className="text-xl md:text-2xl font-bold">Notification Templates</h1>
                                <p className="text-[9px] md:text-xs mt-1">Manage automated messages and alerts</p>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="flex flex-wrap gap-3 justify-start">
                            {/* Active Templates */}
                            <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white px-3 py-3 rounded-2xl shadow-lg flex-1 min-w-[90px] max-w-[130px]">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-xl">
                                        <Bell className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <div>
                                        <p className="text-lg md:text-xl font-bold">24</p>
                                        <p className="text-[8px] md:text-[10px] opacity-90">Active Templates</p>
                                    </div>
                                </div>
                            </div>

                            {/* Sent This Month */}
                            <div className="bg-gradient-to-br from-teal-400 to-emerald-600 text-white px-3 py-3 rounded-2xl shadow-lg flex-1 min-w-[90px] max-w-[130px]">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-xl">
                                        <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <div>
                                        <p className="text-lg md:text-xl font-bold">8.4K</p>
                                        <p className="text-[8px] md:text-[10px] opacity-90">Sent This Month</p>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Rate */}
                            <div className="bg-gradient-to-br from-orange-400 to-amber-600 text-white px-3 py-3 rounded-2xl shadow-lg flex-1 min-w-[90px] max-w-[130px]">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-xl">
                                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <div>
                                        <p className="text-lg md:text-xl font-bold">94%</p>
                                        <p className="text-[8px] md:text-[10px] opacity-90">Delivery Rate</p>
                                    </div>
                                </div>
                            </div>

                            {/* Open Rate */}
                            <div className="bg-gradient-to-br from-cyan-400 to-blue-600 text-white px-3 py-3 rounded-2xl shadow-lg flex-1 min-w-[90px] max-w-[130px]">
                                <div className="flex items-center gap-2">
                                    <div className="p-1.5 bg-white/20 rounded-xl">
                                        <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </div>
                                    <div>
                                        <p className="text-lg md:text-xl font-bold">89%</p>
                                        <p className="text-[8px] md:text-[10px] opacity-90">Open Rate</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section: Image (hidden on < lg) */}
                <div className="order-1 lg:order-2 flex-shrink-0 w-1/5 lg:flex justify-end hidden lg:block">
                    <Image
                        src={img}
                        alt="Notifications illustration"
                        className="w-full rounded-3xl"
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
