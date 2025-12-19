import React from 'react';
import { Calendar, Plus, RefreshCw } from 'lucide-react';

export default function NoAppointmentsUI() {
    return (
        <>
            <div className=" flex items-center justify-center px-4">
                {/* Subtle background circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-[#0284C71A] opacity-30 blur-3xl"></div>
                </div>

                {/* Card - Centered */}
                <div className="relative z-10 bg-[#0284C71A] py-5 px-6 rounded-4xl w-full max-w-sm text-center">
                    {/* Main Icon */}
                    <div className="mb-6">
                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-b from-[#0284C7] to-[#0369A1]
flex items-center justify-center shadow-xl">
                            <Calendar className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    {/* Title & Message - Smaller text */}
                    <h1 className="text-base font-medium mb-1">No Appointments Scheduled</h1>
                    <p className="text-xs max-w-xs mx-auto leading-relaxed px-4">
                        You don't have any appointments for today. Your schedule is clear.
                    </p>

                    {/* Buttons - Smaller sizes */}
                    <div className="mt-8 space-y-3">
                        <button className="w-full bg-gradient-to-b from-[#0284C7] to-[#0369A1]
 text-white text-xs font-medium py-2.5 rounded-full flex items-center justify-center gap-1.5 shadow-md transition">
                            <Plus className="w-4 h-4" />
                            View Full Schedule
                        </button>

                        <button className="w-full border border-gray-400 hover:border-white text-xs font-medium py-2 rounded-full flex items-center justify-center gap-1.5 hover:bg-gradient-to-b from-[#0284C7] to-[#0369A1] transition">
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>

                    {/* Bottom Links - Small text */}
                    <div className="mt-12 flex flex-col gap-3 text-xs">
                        <a href="#" className="hover:underline">Need assistance?</a>
                        <a href="#" className="hover:underline">Contact Support</a>
                    </div>
                </div>
            </div>
        </>
    );
}