'use client';

import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Calendar, Headphones, TrendingUp } from "lucide-react";

const data = [
    { name: 'Mon', activity: 4, trend: 3.5 },
    { name: 'Tue', activity: 3, trend: 3.8 },
    { name: 'Wed', activity: 5, trend: 3.2 },
    { name: 'Thu', activity: 4.5, trend: 4.1 },
    { name: 'Fri', activity: 6, trend: 5.8 },
    { name: 'Sat', activity: 7, trend: 6.5 },
    { name: 'Sun', activity: 5.5, trend: 4.2 },
];

// Your DashboardCards – 100% original, placed at the TOP
function DashboardCards() {
    return (
        <div className="bg-gray-50 pb-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Next Appointment Card */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-md font-bold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-600" />
                                Next Appointment
                            </h3>

                            <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                CONFIRMED
                            </span>
                        </div>

                        <p className="text-xs text-gray-600 mb-6">Don't forget your upcoming checkup</p>

                        {/* RESPONSIVE WRAPPER */}
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            {/* Doctor Section */}
                            <div className="flex items-center gap-4 w-full lg:w-auto">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-purple-600 border-4 border-white shadow-lg"></div>
                                    <img
                                        src="https://i.pravatar.cc/150"
                                        alt="Dr. James Wilson"
                                        className="w-16 h-16 rounded-xl object-cover absolute inset-0 border-4 border-white"
                                    />
                                </div>

                                <div>
                                    <h4 className="text-md font-bold text-gray-900">Dr. James Wilson</h4>
                                    <p className="text-xs font-semibold text-blue-500">Cardiologist</p>
                                    <p className="text-[11px] mt-2 text-gray-500">St. Mary’s Hospital</p>
                                </div>
                            </div>

                            {/* Date + Time (stack on mobile) */}
                            <div className="flex items-center justify-between gap-6 lg:gap-10 w-full lg:w-auto">
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500">Date</p>
                                    <p className="text-sm font-semibold text-gray-900">Mon, Oct 12</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-500">Time</p>
                                    <p className="text-sm font-semibold text-gray-900">09:30 AM</p>
                                </div>
                            </div>

                            {/* Buttons (full width on mobile) */}
                            <div className="flex flex-col gap-2 w-full lg:w-auto">
                                <button className="bg-blue-600 hover:bg-[#0284C7] text-white font-medium px-4 py-2 rounded-lg text-xs cursor-pointer transition shadow-sm hover:shadow-md">
                                    Join Video Call
                                </button>
                                <button className="bg-white text-gray-600 border border-[#E2E8F0] text-xs font-medium cursor-pointer px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#0284C7] hover:text-white hover:shadow-[0_4px_6px_-4px_#BAE6FD,0_10px_15px_-3px_#BAE6FD]">
                                    Reschedule
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Instant Consultation Card */}
                <div className="lg:col-span-4">
                    <div className="rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden"
                        style={{
                            background: "linear-gradient(270deg, #4D8BE9 22.29%, #2F54EB 54.27%)",
                            boxShadow: "0px 4px 6px -4px #0000001A, 0px 10px 15px -3px #0000001A"
                        }}>
                        <div className="relative z-10">
                            <Headphones className="w-6 h-6 mb-4 text-white" />
                            <h3 className="text-md font-bold text-white mb-2">Instant Consultation</h3>
                            <p className="text-[13px] text-blue-100 mb-6 leading-relaxed">
                                Connect with a general physician within 5 minutes.
                            </p>
                            <button className="bg-white w-full text-blue-700 font-semibold px-6 py-2 rounded-xl text-xs cursor-pointer transition shadow-sm hover:shadow-[0_4px_6px_-4px_#BAE6FD,0_10px_15px_-3px_#BAE6FD]">
                                Start Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Heart Rate Card */}
            <div className="mt-6 lg:max-w-fit ml-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1 uppercase">Heart Rate</p>
                    <div className="flex items-end justify-between gap-5">
                        <div className='flex items-center gap-5'>
                            <p className="text-3xl font-bold text-gray-900">
                                72 <span className="text-sm text-gray-500">bpm</span>
                            </p>
                            <span className="text-md flex items-center gap-1 font-medium text-green-600 mt-1"><TrendingUp className="w-5 h-5 -translate-y-0.5" />Normal</span>
                        </div>

                        <div className="w-28 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                            <div className="w-24 h-8 bg-blue-100 rounded-lg relative overflow-hidden">
                                <div className="absolute bottom-1 left-1 right-1 h-5 bg-blue-400 rounded-lg opacity-60"></div>
                                <div className="absolute inset-x-0 bottom-3 h-0.5 bg-blue-600"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default function Home() {
    return (
        <>
            <div className="min-h-screen bg-gray-50">

                {/* 1. CARDS AT THE VERY TOP */}
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <DashboardCards />
                </div>

                {/* 2. GRAPH + SIDEBAR SECTION */}
                <div className="max-w-6xl mx-auto px-4 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Side – Health Activity */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-md font-semibold text-gray-900">Health Activity</h2>
                                    <button className="px-4 py-2 text-xs font-medium border-[#E2E8F0] text-gray-600 bg-[#F8FAFC] rounded-xl hover:bg-gray-200 transition">
                                        Last 7 Days
                                    </button>
                                </div>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Bar dataKey="activity" barSize={40} radius={[12, 12, 0, 0]} fill="#0ea5e9" />
                                            <Line type="monotone" dataKey="trend" stroke="#fbbf24" strokeWidth={4} dot={{ fill: '#fbbf24', r: 6 }} activeDot={{ r: 8 }} />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
                                <button className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center hover:bg-sky-200 transition mb-5">
                                    <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-md font-semibold text-gray-900">Book Appointment</h3>

                                </div>
                                <p className="text-[#64748B] text-sm leading-relaxed">
                                    Schedule a visit with a specialist near you.
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-md font-semibold text-gray-900">Messages</h3>
                                    <a href="#" className="text-sky-500 cursor-pointer text-sm font-medium hover:underline">View All</a>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-10 h-10 bg-gray-300 rounded-full" />
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm text-gray-900">Dr. Sarah Smith</p>
                                                <span className="text-xs text-gray-500">10:24 AM</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1">Your test results are ready for r...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm text-gray-900">Dr. Mark Chen</p>
                                                <span className="text-xs text-gray-500">Yesterday</span>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1">Please remember to fast for 8 ...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. PRESCRIPTIONS & NOTIFICATIONS AT THE BOTTOM */}
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Prescriptions Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5a3.375 3.375 0 00-3.375 3.375V14.25m9.75 3.75h-13.5m9.75 0v3m-9.75-3v3" />
                                        </svg>
                                    </div>
                                    <h2 className="text-md font-bold text-gray-900">Prescriptions</h2>
                                </div>
                                <button className="text-sm font-medium text-[#0284C7] hover:text-sky-600 flex items-center gap-1 cursor-pointer">
                                    Refill Request
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { name: "Amoxicillin", dose: "500mg • 2x Daily • 5 Days left", icon: "pill", color: "blue" },
                                    { name: "Lisinopril", dose: "10mg • 1x Daily • Refill in 12 days", icon: "pill", color: "sky" },
                                    { name: "Vitamin D3", dose: "1000 IU • 1x Daily • Ongoing", icon: "capsule", color: "emerald" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center justify-between hover:bg-[#F8FAFC] transition">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color === "blue" ? "bg-blue-100" : item.color === "sky" ? "bg-sky-100" : "bg-emerald-100"}`}>
                                                {item.icon === "pill" ? (
                                                    <svg className={`w-6 h-6 ${item.color === "blue" ? "text-blue-600" : item.color === "sky" ? "text-sky-600" : "text-emerald-600"}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M4 4h12v12H4z" />
                                                    </svg>
                                                ) : (
                                                    <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3a1 1 0 00.293.707l2 2a1 1 0 001.414-1.414L11 9.586V7z" clipRule="evenodd" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">{item.dose}</p>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notifications Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118.602 14.158V10a4 4 0 10-8 0v4.158a2.032 2.032 0 01-1.595 1.987L7.5 17h5z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-md font-bold text-gray-900">Notifications</h2>
                                </div>
                                <button className="text-sm font-medium text-[#0284C7] hover:text-[#0284C7] cursor-pointer">
                                    Mark all read
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { type: "appointment", title: "Appointment Reminder", desc: "Your appointment with Dr. Wilson is tomorrow at 9:30 AM", time: "2 hours ago", color: "blue" },
                                    { type: "lab", title: "Lab Results Ready", desc: "Your blood test results are now available", time: "5 hours ago", color: "green" },
                                    { type: "prescription", title: "Prescription Expiring", desc: "Amoxicillin prescription expires in 5 days", time: "1 day ago", color: "yellow" },
                                ].map((notif, i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl p-4 flex items-start gap-4 hover:bg-gray-100 transition">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.color === "blue" ? "bg-blue-100" : notif.color === "green" ? "bg-emerald-100" : "bg-amber-100"}`}>
                                            {notif.type === "appointment" && (
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                            {notif.type === "lab" && (
                                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86-.649H10.19a6 6 0 00-3.86.649l-2.387.477a2 2 0 00-1.022.547L3 16l-3 3 1.5 1.5 3-3 3 3 1.5-1.5-3-3 3-3 1.5 1.5 3-3 1.5-1.5z" />
                                                </svg>
                                            )}
                                            {notif.type === "prescription" && (
                                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-xs text-gray-900">{notif.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{notif.desc}</p>
                                            <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}