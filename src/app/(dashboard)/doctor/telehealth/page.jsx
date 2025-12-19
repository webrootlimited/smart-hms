"use client"

import React from 'react';
import {
    RefreshCw,
    PlayCircle,
    FileText,
    Clipboard,
    CheckCircle2,
    Video
} from "lucide-react";
import teleWaitingImg from "@/assets/doctor-dashboard/tele-waiting-room.png";
import Image from 'next/image';

export default function TelehealthWaitingRoom() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 flex flex-col px-4">
                {/* Main Content - Full width */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 lg:mb-8 gap-4">
                        <div className="flex items-center gap-3 lg:gap-5">
                            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-xl overflow-hidden flex-shrink-0">
                                <Image
                                    src={teleWaitingImg}
                                    alt="Telehealth"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">Telehealth Waiting Room</h1>
                                <p className="text-xs text-gray-600 mt-0.5">Manage virtual consultations</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 lg:gap-3">
                            <button className="px-3 py-1.5 md:px-4 md:py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
                                <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                Refresh
                            </button>
                            <button className="px-4 py-1.5 md:px-5 md:py-2 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 flex items-center gap-1.5">
                                <PlayCircle className="w-4 h-4 md:w-5 md:h-5" />
                                Start Session
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                        {/* Queue List */}
                        <div className="lg:col-span-2 space-y-3">

                            {/* Patient 1 - Ready */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition relative overflow-hidden">
                                <div className="h-1 bg-gradient-to-r from-sky-200 to-sky-50"></div>
                                <div className="p-3 md:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm md:text-base">AR</div>
                                            <div>
                                                <h3 className="font-medium text-sm text-gray-900">Amelia Rodriguez</h3>
                                                <p className="text-xs text-gray-600">Follow-up Consultation</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                                            <div className="text-center">
                                                <p className="text-gray-500">Waiting</p>
                                                <p className="font-bold text-gray-900">12 mins</p>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="font-medium text-green-600">Ready</span>
                                            </div>

                                            <div className="hidden md:flex gap-2">
                                                <button className="p-1.5 hover:bg-gray-100 rounded"><FileText className="w-3.5 h-3.5 text-gray-500" /></button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded"><Clipboard className="w-3.5 h-3.5 text-gray-500" /></button>
                                            </div>

                                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 flex items-center gap-1">
                                                <Video className="w-3.5 h-3.5" />
                                                Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patient 2 - Joining Soon */}
                            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition relative overflow-hidden">
                                <div className="h-1 bg-gradient-to-r from-amber-200 to-amber-50"></div>
                                <div className="p-3 md:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center text-white font-bold text-sm md:text-base">BC</div>
                                            <div>
                                                <h3 className="font-medium text-sm text-gray-900">Benjamin Carter</h3>
                                                <p className="text-xs text-gray-600">Prescription Refill</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                                            <div className="text-center">
                                                <p className="text-gray-500">Waiting</p>
                                                <p className="font-bold text-amber-600">8 mins</p>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                                <span className="font-medium text-yellow-600">Joining</span>
                                            </div>

                                            <div className="hidden md:flex gap-2">
                                                <button className="p-1.5 hover:bg-gray-100 rounded"><FileText className="w-3.5 h-3.5 text-gray-500" /></button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded"><Clipboard className="w-3.5 h-3.5 text-gray-500" /></button>
                                            </div>

                                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 flex items-center gap-1">
                                                <Video className="w-3.5 h-3.5" />
                                                Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patient 3 - Waiting */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition relative overflow-hidden">
                                <div className="h-1 bg-gradient-to-r from-gray-200 to-gray-50"></div>
                                <div className="p-3 md:p-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm md:text-base">CD</div>
                                            <div>
                                                <h3 className="font-medium text-sm text-gray-900">Chloe Davis</h3>
                                                <p className="text-xs text-gray-600">General Check-up</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                                            <div className="text-center">
                                                <p className="text-gray-500">Waiting</p>
                                                <p className="font-bold text-gray-900">2 mins</p>
                                            </div>

                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                <span className="font-medium text-gray-600">Waiting</span>
                                            </div>

                                            <div className="hidden md:flex gap-2">
                                                <button className="p-1.5 hover:bg-gray-100 rounded"><FileText className="w-3.5 h-3.5 text-gray-500" /></button>
                                                <button className="p-1.5 hover:bg-gray-100 rounded"><Clipboard className="w-3.5 h-3.5 text-gray-500" /></button>
                                            </div>

                                            <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 flex items-center gap-1">
                                                <Video className="w-3.5 h-3.5" />
                                                Call
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-4">
                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-sm text-gray-900">Today's Summary</h3>
                                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                        <PlayCircle className="w-6 h-6 text-red-500" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">15</p>
                                        <p className="text-xs text-gray-600 mt-0.5">Appointments</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">3</p>
                                        <p className="text-xs text-gray-600 mt-0.5">Waiting</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-medium text-sm text-gray-900">Your Availability</h3>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-9 h-5 bg-blue-600 rounded-full peer"></div>
                                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4"></div>
                                    </label>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-xs">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <p className="text-green-800">You are online and available.</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-xl shadow-sm">
                                <h3 className="font-medium text-sm text-gray-900 mb-3">Quick Instructions</h3>
                                <ul className="space-y-2 text-xs text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span>Review patient documents before starting the call.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <span>Ensure your audio and video are working correctly.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
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