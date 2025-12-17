import React from 'react';
import teleSectionImg from '@/assets/doctor-dashboard/tele-section.jpg';
import Image from 'next/image';

export default function App() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 p-3 xl:p-6 font-sans">
                <div className="max-w-7xl mx-auto space-y-6">

                    {/* ==================== TOP ROW: Telehealth (wider) + Schedule ==================== */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                        {/* Telehealth Session - Takes more space */}
                        <div className="xl:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            {/* Full height grid: left (wide) + right (narrow) */}
                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">

                                {/* LEFT: Content — Takes most width (8/12) */}
                                <div className="xl:col-span-8 flex flex-col justify-start">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                            ONLINE
                                        </span>
                                        <span className="text-sm text-gray-600 font-medium">Queue: 2 Waiting</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 mb-3">Telehealth Session</h2>
                                    <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                                        Your virtual waiting room is active. Next patient, <strong>John Doe</strong>, has been waiting for <strong>4 minutes</strong>.
                                    </p>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <button className="flex items-center justify-center gap-2 px-5 py-2 bg-[#0284C7] hover:bg-[#0284C7]/80 cursor-pointer text-white font-medium rounded-xl transition shadow-sm w-full sm:w-fit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Start Telehealth Now
                                        </button>
                                        <button className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-xl transition cursor-pointer hover:bg-[#0284C7] hover:text-white w-full sm:w-fit">
                                            View Queue Details
                                        </button>
                                    </div>
                                </div>

                                {/* RIGHT: Image — Narrow column (4/12), 50% height, top-aligned */}
                                <div className="hidden xl:block xl:col-span-4 bg-gradient-to-l from-sky-50 to-sky-50/0">
                                    <div className="h-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-start justify-center">
                                        <Image
                                            src={teleSectionImg}
                                            alt="Telehealth device"
                                            className="w-full h-full rounded-2xl object-cover drop-shadow-lg"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Today's Schedule - Narrower */}
                        <div className="xl:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-gray-900">Today's Schedule</h2>
                                <button className="text-blue-600 bg-blue-50 hover:bg-blue-100 cursor-pointer p-2 rounded-lg transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { time: "09:00 AM", title: "Team Meeting", desc: "Weekly case review" },
                                    { time: "10:30 AM", title: "Surgery Prep", desc: "OR Room 3" },
                                    { time: "02:00 PM", title: "Lunch Break", desc: "Cafeteria" }
                                ].map((item, i) => (
                                    <div key={i} className="flex bg-gray-50 items-center gap-4 px-3 py-2 rounded-xl">
                                        <span className="text-sm font-semibold text-gray-600 w-20 border-r-2 border-r-[#0284C74D]">{item.time}</span>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900">{item.title}</p>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ==================== MIDDLE ROW: Appointments + To-Do ==================== */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                        {/* Upcoming Appointments */}
                        <div className="xl:col-span-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">

                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                                <h2 className="text-lg font-bold text-gray-900">Upcoming Appointments</h2>

                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-gray-200 text-sm text-gray-800 font-medium rounded-lg">
                                        All
                                    </button>
                                    <button className="px-3 py-1 text-sm text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition">
                                        Upcoming
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">You have 5 more patients today</p>

                            <div className="space-y-6">

                                {/* Patient Card */}
                                {[
                                    {
                                        name: "Michael Brown",
                                        info: "Annual Checkup • 32 • Male",
                                        time: "11:00 AM",
                                        badgeBg: "bg-green-100",
                                        badgeText: "text-green-800",
                                        badgeLabel: "In-Clinic",
                                        action: "View Details",
                                        actionStyle: "bg-gray-100 text-gray-800 border border-gray-200"
                                    },
                                    {
                                        name: "Emma Davis",
                                        info: "Follow-up: Hypertension • 45 • Female",
                                        time: "11:30 AM",
                                        badgeBg: "bg-blue-100",
                                        badgeText: "text-blue-800",
                                        badgeLabel: "Telehealth",
                                        action: "Join Call",
                                        actionStyle: "bg-blue-600 text-white hover:bg-blue-700"
                                    }
                                ].map((p, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border-2 border-[#F1F5F9] rounded-lg p-4 gap-4"
                                    >
                                        {/* Profile Section */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src="https://via.placeholder.com/48"
                                                alt="patient"
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-900">{p.name}</p>
                                                <p className="text-sm text-gray-600">{p.info}</p>
                                            </div>
                                        </div>

                                        {/* Right Section */}
                                        <div className="flex flex-col sm:items-end gap-3">

                                            {/* Time & Badge */}
                                            <div className="flex items-center sm:justify-end gap-3">
                                                <p className="font-medium">{p.time}</p>

                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${p.badgeBg} ${p.badgeText}`}>
                                                    {p.badgeLabel}
                                                </span>
                                            </div>

                                            {/* Button */}
                                            <button className={`px-3 py-1 font-medium rounded-lg transition ${p.actionStyle}`}>
                                                {p.action}
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>


                        {/* To-Do List */}
                        <div className="xl:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-gray-900">To-Do List</h2>
                                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">3 pending</span>
                            </div>

                            <div className="space-y-5">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">Review lab reports for J. Smith</p>
                                        <span className="inline-flex items-center px-2.5 py-1 mt-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                                            High Priority
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mt-0.5" defaultChecked />
                                    <div>
                                        <p className="font-medium line-through text-gray-400">Approve prescription refills</p>
                                        <span className="text-green-600 font-medium text-sm">Done</span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">Complete medical notes</p>
                                        <p className="text-sm text-gray-600">Due by 5 PM</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ==================== BOTTOM: Patient Queue ==================== */}
                    <div className="bg-white w-full xl:max-w-[66%] rounded-2xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">Patient Queue</h2>
                                    <p className="text-sm text-gray-600">Real-time waiting list</p>
                                </div>
                            </div>
                            <button className="text-blue-600 font-medium hover:underline">View Full List</button>
                        </div>

                        {/* Scrollable Table Container */}
                        <div className="overflow-x-auto -mx-6 px-6"> {/* Negative margin + padding to keep rounded corners clean */}
                            <table className="w-full min-w-[600px] text-sm"> {/* min-w ensures it doesn't shrink too much */}
                                <thead>
                                    <tr className="text-left text-gray-600 border-b border-b-gray-200">
                                        <th className="pb-4 font-semibold w-56">Patient</th>
                                        <th className="pb-4 font-semibold w-64">Reason</th>
                                        <th className="pb-4 font-semibold w-32">Wait Time</th>
                                        <th className="pb-4 font-semibold w-32">Status</th>
                                        <th className="pb-4 font-semibold w-28 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50 transition">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <img src="https://via.placeholder.com/36" alt="" className="w-9 h-9 rounded-full flex-shrink-0" />
                                                <span className="font-medium truncate">Robert Fox</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-gray-600 truncate">Chest Pain (Mild)</td>
                                        <td className="py-4 text-gray-600">15 mins</td>
                                        <td className="py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-orange-100 text-orange-800 whitespace-nowrap">
                                                Urgent
                                            </span>
                                        </td>
                                        <td className="py-4 text-center">
                                            <button className="text-blue-600 hover:text-blue-800 inline-flex">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-gray-50 transition">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <img src="https://via.placeholder.com/36" alt="" className="w-9 h-9 rounded-full flex-shrink-0" />
                                                <span className="font-medium truncate">Jane Cooper</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-gray-600 truncate">Prescription Refill</td>
                                        <td className="py-4 text-gray-600">5 mins</td>
                                        <td className="py-4"></td>
                                        <td className="py-4 text-center">
                                            <button className="text-blue-600 hover:text-blue-800 inline-flex">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}