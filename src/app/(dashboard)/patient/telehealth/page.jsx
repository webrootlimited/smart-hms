'use client';

import Image from "next/image";
import waitingRoomImg from "@/assets/telehealth/left-section-img.jpg"; // Your image
import { PhoneOff, Mic, MicOff, Video, VideoOff, Wifi, CheckCircle2 } from "lucide-react";
import rightSectionBg from "@/assets/telehealth/right-bg.jpg"

export default function WaitingRoomCard() {
    return (
        <div className="w-full pb-10 bg-[radial-gradient(122.12%_174.22%_at_0%_0%,_#E0F2FE_0%,_#F0F9FF_50%,_#F8FAFC_100%)]">
            <div className="rounded-2xl border border-gray-100 overflow-hidden px-5">

                {/* Video Call Header */}
                <header className=" py-2 sm:py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M8 12h8M12 8v8" />
                            </svg>
                        </div>
                        <span className="text-sm sm:text-base font-bold tracking-tight">
                            MediConnect<span className="text-cyan-400">.</span>
                        </span>
                    </div>

                    <button className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 bg-white hover:bg-white/70 hover:border-gray-200 hover:border-2 backdrop-blur-md text-gray-900 font-medium rounded-lg border border-[#E2E8F0] transition-all duration-150 cursor-pointer">
                        <PhoneOff className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Leave Room</span>
                    </button>
                </header>

                {/* Body Section */}
                <div className="w-full flex flex-col justify-center py-2 px- lg:flex-row gap-6">

                    {/* LEFT SIDE - 60% */}
                    <div className="w-full lg:w-[60%] bg-white rounded">
                        <div className="px-3 py-3">

                            {/* Top Info */}
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div>
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                                        Virtual Waiting Room
                                    </h2>
                                    <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5">
                                        Please wait, your session will begin shortly.
                                    </p>
                                </div>

                                <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-blue-50 text-blue-700 font-medium rounded-full text-[10px] sm:text-xs">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                    Live Connection
                                </span>
                            </div>

                            {/* Image Section */}
                            <div className="relative w-full flex justify-center my-3 sm:my-4">
                                <Image
                                    src={waitingRoomImg}
                                    alt="Virtual Waiting Room"
                                    className="w-[70%] sm:w-[55%] lg:w-[45%] rounded-lg object-cover"
                                    priority
                                />
                            </div>

                            {/* Bottom Section */}
                            <div className="mt-6">

                                {/* Estimated Wait + Queue */}
                                <div className="flex flex-col items-center justify-center gap-2 mb-4">
                                    <div className="bg-white border border-blue-200 rounded-xl px-3 py-2 flex items-center gap-3 sm:gap-3 w-full lg:w-auto">
                                        <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                                            4
                                        </div>
                                        <div>
                                            <p className="text-[8px] sm:text-[9px] font-semibold text-gray-500 uppercase tracking-wide">
                                                Estimated Wait
                                            </p>
                                            <p className="text-xs sm:text-sm font-semibold text-gray-900">
                                                ~4 Minutes
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-500">You are next in line.</p>
                                </div>

                                {/* Tip Box */}
                                <div className="bg-blue-50/70 border border-blue-200 rounded-xl px-3 py-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 backdrop-blur-sm">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm sm:text-[15px]">
                                            While you wait
                                        </h4>
                                        <p className="text-gray-700 text-xs sm:text-sm mt-0.5 leading-tight">
                                            Have your insurance card and list of current medications ready for the doctor.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* RIGHT SIDE - 40% */}
                    <div className="w-full lg:w-[40%] space-y-6">
                        <div className="p-4 bg-white rounded-2xl">

                            {/* Header: Doctor Info */}
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <div className="w-15 h-15 bg-gray-200 border border-dashed rounded overflow-hidden">
                                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-500 text-base font-semibold">JW</span>
                                        </div>
                                    </div>

                                    {/* Online Badge */}
                                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-sm font-semibold text-gray-900 leading-tight">
                                        Dr. James Wilson
                                    </h2>

                                    <p className="text-[11px] text-blue-600 font-medium mt-0.5">
                                        Cardiologist • MD, PhD
                                    </p>

                                    <p className="text-[10px] text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded w-fit mt-1">
                                        City General Hospital
                                    </p>


                                </div>
                            </div>

                            {/* Appointment Details */}
                            <div className="mt-6 space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-[12px]">Appointment Time</span>
                                    <span className="text-sm font-semibold text-gray-900">10:30 AM</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-[12px]">Status</span>
                                    <span className="text-blue-600 text-[11px] font-medium">
                                        Doctor will join shortly...
                                    </span>
                                </div>
                            </div>

                        </div>


                        <div className="relative bg-[linear-gradient(0deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0)_50%,rgba(15,23,42,0)_100%)] w-full overflow-hidden rounded-3xl">

                            {/* Background Image + Video Preview */}
                            <div className="relative h-[300px] md:h-auto md:aspect-video">
                                <Image
                                    src={rightSectionBg}
                                    alt="Video preview"
                                    fill
                                    className="object-cover"
                                />

                                {/* Dark bottom gradient only (more image visible) */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80" />
                            </div>


                            {/* Overlay Content - Bottom Positioned */}
                            <div className="absolute bottom-1 left-1 right-1 p-2 text-white
">

                                {/* Pre-call Check Title */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Video className="w-5 h-5 text-white" />
                                    <span className="text-white text-sm font-semibold">Pre-call Check</span>
                                </div>

                                {/* Mic + Camera Cards → smaller */}
                                <div className="grid grid-cols-2 gap-3 mb-2">

                                    {/* Test Mic */}
                                    <div className="bg-[#1E293BCC] backdrop-blur-md rounded-xl py-1 text-center border border-white/20">
                                        <div className="flex justify-center mb-2">
                                            <div className="relative">
                                                <Mic className="w-5 h-5" />


                                            </div>
                                        </div>

                                        <p className="text-[11px] font-medium">Test Mic</p>

                                        {/* Smaller sound bars */}
                                        <div className="flex justify-center gap-0.5 mt-2">
                                            <div className="w-0.5 bg-green-400 rounded-full animate-pulse" style={{ height: "6px" }} />
                                            <div className="w-0.5 bg-green-400 rounded-full animate-pulse delay-75" style={{ height: "10px" }} />
                                            <div className="w-0.5 bg-green-400 rounded-full animate-pulse delay-150" style={{ height: "14px" }} />
                                            <div className="w-0.5 bg-green-400 rounded-full animate-pulse delay-300" style={{ height: "8px" }} />
                                        </div>
                                    </div>

                                    {/* Test Camera */}
                                    <div className="bg-[#1E293BCC] backdrop-blur-md rounded-xl py-1 text-center border border-white/20">
                                        <div className="flex justify-center mb-2">
                                            <Video className="w-5 h-5" />
                                        </div>

                                        <p className="text-[11px] font-medium">Test Camera</p>

                                        {/* Smaller toggle */}
                                        <div className="flex justify-center mt-2">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                                <div className="w-8 h-4 bg-gray-600 rounded-full peer peer-checked:bg-blue-500 transition"></div>
                                                <div className="absolute left-1 top-0.5 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></div>
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                {/* Status Indicators → smaller */}
                                <div className="flex justify-between bg-[#1E293B80] px-2 py-1 rounded text-[10px]">
                                    <div className="flex items-center gap-1">
                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                        <span className="font-medium">System ready</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Wifi className="w-4 h-4 text-green-400" />
                                        <span className="font-medium">Strong Signal</span>
                                    </div>
                                </div>
                            </div>



                        </div>


                        <button
                            className="w-full flex items-center justify-center gap-3 
                 px-8 py-2 
                 bg-[#E2E8F0] w-full
                 text-blue-700 font-semibold text-lg 
                 rounded-xl 
                 shadow-sm 
                 transition-all duration-200 
                 "
                        >
                            <Video className="w-6 h-6 text-[#94A3B8]" strokeWidth={2.5} />
                            <span className="text-[#94A3B8]">Start Visit</span>
                        </button>

                        <p className="text-sm font-semibold text-center text-[#94A3B8]">Button will activate when the doctor joins.</p>

                    </div>
                </div>

            </div>
        </div>
    );
}
