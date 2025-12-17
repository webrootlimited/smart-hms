"use client";

import { Bell, Settings, Search, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
    return (
        <header className="bg-white pl-16 lg:pl-7 border-b border-[#E2E8F0] px-6 py-2 sticky top-0 z-10">
            <div className="flex items-center justify-between">

                {/* Welcome Text - hidden below xl */}
                <div className="flex-1 hidden xl:flex flex-col">
                    <h2 className="text-lg font-bold text-[#0F172A]">
                        Admin Overview
                    </h2>
                    <p className="text-sm text-[#0F172A] mt-0.5">
                        Welcome back Dr Evelyn reed
                    </p>
                </div>

                {/* Search Bar - always visible */}
                <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search doctors, records..."
                        className="w-full pl-12 pr-5 py-2 bg-[#F8FAFC] rounded-2xl text-sm text-gray-700 placeholder-gray-500 border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-500 focus:bg-white transition"
                    />
                </div>

                {/* Profile + Icons */}
                <div className="flex items-center gap-4 ml-4">

                    {/* 👉 Notification */}
                    <Bell className="w-10 h-10 xl:inline hidden text-gray-600 border border-[#E2E8F0] rounded-full p-2 cursor-pointer hover:text-gray-900" />


                    {/* Profile with Dropdown */}
                    <div className="relative group cursor-pointer">
                        <div className="flex items-center gap-3 pl-4 ">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <Image
                                    src="https://i.pravatar.cc/150"
                                    alt="User Avatar"
                                    width={48}
                                    height={48}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="hidden xl:flex flex-col">
                                    <p className="text-sm font-bold text-gray-900">Dr Evelyn Reed</p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <div className="absolute right-0 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
                            <ul className="flex flex-col p-2">
                                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    Profile
                                </li>
                                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    Settings
                                </li>
                                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    Notifications
                                </li>
                                <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}
