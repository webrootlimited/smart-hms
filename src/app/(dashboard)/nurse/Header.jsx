"use client";

import { Bell, Settings, Search, ChevronDown, LocationEdit, MapPin, Clock, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
    return (
        <header className="bg-white pl-16 lg:pl-7 border-b border-[#E2E8F0] px-6 py-2 sticky top-0 z-10">
            <div className="flex items-center justify-between">

                {/* Welcome Text - hidden below xl */}
                <div className="flex-1 hidden xl:flex flex-col">
                    <h2 className="text-lg font-bold text-[#0F172A]">
                        Welcome back, Sarah! 👋 <span className="font-medium text-xs bg-blue-200 px-2 py-1 rounded-2xl">Registered Nurse</span>
                    </h2>
                    <div className="flex gap-5 items-center">
                        <p className="text-sm text-[#0F172A] mt-0.5 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            General CLinic Shift
                        </p>
                        <p className="text-xs text-[#0F172A] mt-0.5 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            8:00 am - 4:00 pm</p>
                    </div>
                </div>



                {/* Profile + Icons */}
                <div className="flex items-center gap-4 ml-4">

                    {/* Notification */}
                    <button className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                        <Bell className="w-5 h-5 text-gray-700" />

                        {/* Notification Dot */}
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded"></span>
                    </button>

                    {/* Profile */}
                    <button className="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 hover:bg-gray-100 transition">
                        <User className="w-5 h-5 text-gray-700" />
                    </button>

                </div>

            </div>
        </header>
    );
}
