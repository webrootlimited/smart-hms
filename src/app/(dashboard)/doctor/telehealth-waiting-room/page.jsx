"use client"

import React, { useState } from 'react';
import {
    Plus,
    LayoutGrid,
    Calendar,
    Video,
    Users,
    CheckSquare,
    Settings,
    Menu,
    X,
    FileText,
    Clipboard,
    CheckCircle2,
    RefreshCw,
    PlayCircle,
} from "lucide-react";
import teleWaitingImg from "@/assets/doctor-dashboard/tele-waiting-room.png";
import Image from 'next/image';

export default function TelehealthWaitingRoom() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
                {/* Desktop Sidebar */}
                <div className="hidden md:flex w-16 lg:w-20 bg-white border-r border-gray-200 flex-col items-center py-4 lg:py-6 space-y-4 lg:space-y-8">
                    <Plus className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600 text-white p-1 rounded-lg" />
                    <LayoutGrid className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
                    <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
                    <Video className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
                    <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                    <CheckSquare className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
                    <Settings className="w-5 h-5 lg:w-6 lg:h-6 text-gray-500" />
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs lg:text-sm">
                        DR
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-40">
                    <button
                        onClick={() => setIsMobileSidebarOpen(true)}
                        className="p-2"
                    >
                        <Menu className="w-6 h-6 text-gray-700" />
                    </button>

                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs">DR</div>
                </div>

                {/* Mobile Overlay Sidebar */}
                {isMobileSidebarOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setIsMobileSidebarOpen(false)}
                        />
                        {/* Sidebar Panel */}
                        <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col">
                            <div className="flex items-center justify-between p-5 border-b border-gray-200">
                                <h2 className="text-lg font-semibold">Menu</h2>
                                <button
                                    onClick={() => setIsMobileSidebarOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>

                            <div className="flex-1 px-6 py-8 space-y-6">
                                <button className="flex items-center gap-4 text-gray-700 hover:text-blue-600">
                                    <LayoutGrid className="w-6 h-6" />
                                    <span>Dashboard</span>
                                </button>
                                <button className="flex items-center gap-4 text-gray-700 hover:text-blue-600">
                                    <Calendar className="w-6 h-6" />
                                    <span>Calendar</span>
                                </button>
                                <button className="flex items-center gap-4 text-blue-600 font-medium">
                                    <Video className="w-6 h-6" />
                                    <span>Telehealth</span>
                                </button>
                                <button className="flex items-center gap-4 text-gray-700 hover:text-blue-600">
                                    <Users className="w-6 h-6" />
                                    <span>Patients</span>
                                </button>
                                <button className="flex items-center gap-4 text-gray-700 hover:text-blue-600">
                                    <CheckSquare className="w-6 h-6" />
                                    <span>Tasks</span>
                                </button>
                                <button className="flex items-center gap-4 text-gray-700 hover:text-blue-600">
                                    <Settings className="w-6 h-6" />
                                    <span>Settings</span>
                                </button>
                            </div>

                            <div className="p-6 border-t border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                                        DR
                                    </div>
                                    <div>
                                        <p className="font-semibold">Dr. Reynolds</p>
                                        <p className="text-sm text-gray-500">General Physician</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content - exactly your original code */}
                <div className="flex-1 pt-16 md:pt-0 p-4 md:p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mt-5 mb-20 lg:mb-10 gap-4">
                        <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
                            <div className="w-24 h-24 hidden lg:block lg:w-40 lg:h-40 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                <Image
                                    src={teleWaitingImg}
                                    alt="Telehealth"
                                    className="w-16 h-16 md:w-30 md:h-30 lg:w-45 lg:h-45 object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Telehealth Waiting Room</h1>
                                <p className="text-xs md:text-sm text-gray-600 mt-1">Manage virtual consultations</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
                            <button className="px-3 py-2 md:px-4 md:py-2.5 border border-gray-300 rounded-lg text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1 md:gap-2">
                                <RefreshCw className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="inline">Refresh</span>
                            </button>
                            <button className="px-3 py-2 md:px-5 md:py-2.5 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-blue-700 flex items-center gap-1 md:gap-2 shadow-md">
                                <PlayCircle className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="inline">Start Session</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {/* Queue List */}
                        <div className="lg:col-span-2 space-y-3 md:space-y-4 lg:space-y-5">

                            {/* Patient 1 - Ready */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative">
                                <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl md:rounded-t-2xl bg-[linear-gradient(90deg,#BAE6FD_0%,#F0F9FF_100%)]"></div>
                                <div className="p-3 md:p-4 lg:p-5 relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg flex-shrink-0">AR</div>
                                            <div>
                                                <h3 className="font-semibold text-sm md:text-base text-gray-900">Amelia Rodriguez</h3>
                                                <p className="text-xs text-gray-600">Follow-up Consultation</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm">
                                            <div className="text-center">
                                                <p className="text-gray-500 text-xs">Waiting</p>
                                                <p className="font-bold text-gray-900">12 mins</p>
                                            </div>

                                            {/* Status label + dot + text in horizontal row */}
                                            <div className="flex flex-col items-center">
                                                <span className="text-xs text-gray-500 mb-1">Status</span>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="font-medium text-green-600 text-xs md:text-sm">Ready</span>
                                                </div>
                                            </div>

                                            {/* Docs & Form */}
                                            <div className="hidden md:flex gap-3">
                                                <div className="flex flex-col items-center">
                                                    <button className="p-2 hover:bg-gray-100 rounded"><FileText className="w-4 h-4 text-gray-500" /></button>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Docs</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <button className="p-2 hover:bg-gray-100 rounded"><Clipboard className="w-4 h-4 text-gray-500" /></button>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Form</span>
                                                </div>
                                            </div>

                                            <button className="px-3 py-1.5 md:px-4 md:py-2 lg:px-5 bg-blue-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-blue-700 flex items-center gap-1 md:gap-2">
                                                <Video className="w-3 h-3 md:w-4 md:h-4" />
                                                Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patient 2 - Joining Soon */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-md transition relative">
                                <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl md:rounded-t-2xl bg-[linear-gradient(90deg,#FDE68A_0%,#FFFBEB_100%)]"></div>
                                <div className="p-3 md:p-4 lg:p-5 relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg flex-shrink-0">BC</div>
                                            <div>
                                                <h3 className="font-semibold text-sm md:text-base text-gray-900">Benjamin Carter</h3>
                                                <p className="text-xs text-gray-600">Prescription Refill</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm">
                                            <div className="text-center">
                                                <p className="text-gray-500 text-xs">Waiting</p>
                                                <p className="font-bold text-yellow-600">8 mins</p>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <span className="text-xs text-gray-500 mb-1">Status</span>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                                    <span className="font-medium text-yellow-600 text-xs md:text-sm">Joining</span>
                                                </div>
                                            </div>

                                            <div className="hidden md:flex gap-3">
                                                <div className="flex flex-col items-center">
                                                    <button className="p-2 hover:bg-gray-100 rounded"><FileText className="w-4 h-4 text-gray-500" /></button>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Docs</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <button className="p-2 hover:bg-gray-100 rounded"><Clipboard className="w-4 h-4 text-gray-500" /></button>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Form</span>
                                                </div>
                                            </div>

                                            <button className="px-3 py-1.5 md:px-4 md:py-2 lg:px-5 bg-blue-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-blue-700 flex items-center gap-1 md:gap-2">
                                                <Video className="w-3 h-3 md:w-4 md:h-4" />
                                                Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patient 3 - Waiting */}
                            <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative">
                                <div className="absolute top-0 left-0 w-full h-1 rounded-t-xl md:rounded-t-2xl bg-[linear-gradient(90deg,#E2E8F0_0%,#F8FAFC_100%)]"></div>
                                <div className="p-3 md:p-4 lg:p-5 relative z-10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                                        <div className="flex items-center gap-3 md:gap-4 lg:gap-5">
                                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm md:text-base lg:text-lg flex-shrink-0">CD</div>
                                            <div>
                                                <h3 className="font-semibold text-sm md:text-base text-gray-900">Chloe Davis</h3>
                                                <p className="text-xs text-gray-600">General Check-up</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4 lg:gap-6 text-xs md:text-sm">
                                            <div className="text-center">
                                                <p className="text-gray-500 text-xs">Waiting</p>
                                                <p className="font-bold text-gray-900">2 mins</p>
                                            </div>

                                            <div className="flex flex-col items-center">
                                                <span className="text-xs text-gray-500 mb-1">Status</span>
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                    <span className="font-medium text-gray-600 text-xs md:text-sm">Waiting</span>
                                                </div>
                                            </div>

                                            <div className="hidden md:flex gap-3">
                                                <div className="flex flex-col items-center">
                                                    <button className="p-2 hover:bg-gray-100 rounded"><FileText className="w-4 h-4 text-gray-500" /></button>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Docs</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <button className="p-2 hover:bg-gray-100 rounded"><Clipboard className="w-4 h-4 text-gray-500" /></button>
                                                    <span className="text-[10px] text-gray-500 mt-0.5">Form</span>
                                                </div>
                                            </div>

                                            <button className="px-3 py-1.5 md:px-4 md:py-2 lg:px-5 bg-blue-600 text-white rounded-lg font-medium text-xs md:text-sm hover:bg-blue-700 flex items-center gap-1 md:gap-2">
                                                <Video className="w-3 h-3 md:w-4 md:h-4" />
                                                Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar - unchanged */}
                        <div className='rounded-2xl'>
                            <div className="bg-white p-4 md:p-5 lg:p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h3 className="font-semibold text-sm md:text-base text-gray-900">Today's Summary</h3>
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center">
                                        <PlayCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 md:gap-6 text-center">
                                    <div>
                                        <p className="text-2xl md:text-3xl font-bold text-gray-900">15</p>
                                        <p className="text-xs text-gray-600 mt-1">Appointments</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl md:text-3xl font-bold text-gray-900">3</p>
                                        <p className="text-xs text-gray-600 mt-1">Waiting</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 md:p-5 lg:p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-3 md:mb-4">
                                    <h3 className="font-semibold text-sm md:text-base text-gray-900">Your Availability</h3>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-10 h-5 md:w-11 md:h-6 bg-blue-600 rounded-full peer"></div>
                                        <div className="absolute left-1 top-0.5 md:top-1 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                                    </label>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                                    <p className="text-xs md:text-sm text-green-800">You are online and available for new calls.</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl shadow-sm">
                                <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-3 md:mb-4">Quick Instructions</h3>
                                <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-700">
                                    <li className="flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span>Review patient documents before starting the call.</span>
                                    </li>
                                    <li className="flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span>Ensure your audio and video are working correctly.</span>
                                    </li>
                                    <li className="flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span>End the call formally and complete post-visit notes.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}