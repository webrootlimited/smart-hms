// app/messages/page.tsx
'use client';

import { useState } from 'react';
import {
    Search,
    MoreVertical,
    Paperclip,
    Send,
    Clock,
    ArrowLeft,
    Video,
    Phone,
    User,
    Calendar,
} from 'lucide-react';
import Image from 'next/image';
import img from "@/assets/doctor-dashboard/messages-header.png";

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(null);

    const conversations = [
        {
            name: "Michael Chen",
            time: "2m ago",
            message: "Thank you for the prescription update",
            unread: 2,
            online: true,
        },
        {
            name: "Sarah Anderson",
            time: "15m ago",
            message: "When should I schedule my next app",
            unread: 1,
        },
        {
            name: "Dr. James Wilson",
            time: "1h ago",
            message: "Patient consultation notes ready for review",
        },
        {
            name: "Emily Rodriguez",
            time: "3h ago",
            message: "Lab results question",
            unread: 1,
        },
        {
            name: "System Notifications",
            time: "5h ago",
            message: "New prescription approval pending",
            unread: 1,
        },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* TOP HEADER */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="p-6 lg:p-8">
                            <div className="flex items-center gap-5 mb-4">
                                <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
                                <span className="bg-[#FB2C36] text-white text-sm font-medium px-3 py-1 rounded-full">
                                    5 Unread
                                </span>
                            </div>
                            <p className="text-gray-500 mb-6">Secure communication with patients and staff</p>

                            <div className="relative mb-6">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center py-3 px-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-semibold text-gray-900">45</p>
                                    <p className="text-sm text-gray-600">Active Chats</p>
                                </div>
                                <div className="text-center py-3 px-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-semibold text-gray-900">5</p>
                                    <p className="text-sm text-gray-600">Unread</p>
                                </div>
                                <div className="text-center py-3 px-4 bg-gray-50 rounded-xl">
                                    <p className="text-2xl font-semibold text-gray-900">128</p>
                                    <p className="text-sm text-gray-600">Total Messages</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:flex items-center justify-center">
                            <Image src={img} alt="Messages illustration" className="w-96 max-w-full" />
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex flex-col xl:flex-row gap-6">
                    {/* Left: Conversation List */}
                    <div className={`${selectedChat !== null ? 'hidden xl:block' : 'block'} xl:w-80 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-screen xl:h-auto`}>
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 text-sm font-medium bg-[#ECFDF5] border border-gray-300 rounded-xl">All</button>
                                <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Patients</button>
                                <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl">Staff</button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                            {conversations.map((conv, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedChat(i)}
                                    className={`w-full text-left p-4 hover:bg-gray-50 transition ${i === selectedChat ? "bg-teal-50/50" : ""}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-medium text-gray-900 truncate">{conv.name}</p>
                                                <span className="text-xs text-gray-500">{conv.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-0.5 truncate">{conv.message}</p>
                                            {conv.unread && (
                                                <span className="inline-block mt-1 bg-teal-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                                                    {conv.unread}
                                                </span>
                                            )}
                                            {conv.online && (
                                                <div className="mt-1 flex items-center gap-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                    <span className="text-xs text-green-600">Online</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center + Right: Chat + Quick Actions (stacked below xl) */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Chat Area */}
                        <div className={`${selectedChat === null ? 'hidden xl:flex' : 'flex'} flex-1 bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col`}>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                                {selectedChat !== null && (
                                    <button
                                        onClick={() => setSelectedChat(null)}
                                        className="xl:hidden p-2 hover:bg-gray-100 rounded-full"
                                    >
                                        <ArrowLeft className="h-5 w-5 text-gray-600" />
                                    </button>
                                )}
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gray-200 rounded-full" />
                                    <div>
                                        <h3 className="text-base xl:text-lg font-semibold text-gray-900">
                                            {selectedChat !== null ? conversations[selectedChat].name : "Select a conversation"}
                                        </h3>
                                        {selectedChat !== null && (
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                <span className="text-xs xl:text-sm text-gray-600">Online</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {selectedChat !== null && (
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-full"><Video className="h-5 w-5 text-gray-600" /></button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full"><Phone className="h-5 w-5 text-gray-600" /></button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full"><MoreVertical className="h-5 w-5 text-gray-600" /></button>
                                    </div>
                                )}
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 xl:p-6 overflow-y-auto">
                                {selectedChat === null ? (
                                    <div className="h-full flex items-center justify-center text-center">
                                        <p className="text-gray-500 text-sm xl:text-base">Select a conversation to start messaging</p>
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">10:30 AM</p>
                                                <div className="mt-1 bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-gray-800">
                                                    Hello Doctor, I have a question about my medication
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <div>
                                                <p className="text-xs text-gray-500 text-right">10:32 AM</p>
                                                <div className="mt-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                                                    Hello Michael! Of course, what would you like to know?
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <div>
                                                <p className="text-xs text-gray-500 text-right">10:33 AM</p>
                                                <div className="mt-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm">
                                                    Should I take it with food or on an empty stomach?
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-gray-500">10:35 AM</p>
                                                <div className="mt-1 bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-gray-800">
                                                    For Lisinopril, it's best to take it with food in the morning. This helps with absorption and reduces any potential stomach upset.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Bar */}
                            {selectedChat !== null && (
                                <div className="p-4 border-t border-gray-200 bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <button className="p-2 hover:bg-gray-200 rounded-full">
                                            <Paperclip className="h-5 w-5 text-gray-600" />
                                        </button>
                                        <input
                                            type="text"
                                            placeholder="Type your message..."
                                            className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                        />
                                        <button className="p-2.5 bg-teal-600 text-white rounded-2xl hover:bg-teal-700">
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                                        <Clock className="h-3.5 w-3.5" />
                                        Draft auto-saved
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions - Always shown below chat when a chat is selected (below xl) */}
                        {selectedChat !== null && (
                            <div className="xl:hidden bg-white rounded-2xl shadow-lg p-6 space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>

                                <div className="space-y-3">
                                    <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl text-left">
                                        <User className="h-5 w-5 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-900">View Patient Profile</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-left">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                        <span className="text-sm font-medium text-gray-900">View Appointment</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 p-3 bg-teal-50 hover:bg-teal-100 rounded-xl text-left">
                                        <Video className="h-5 w-5 text-teal-600" />
                                        <span className="text-sm font-medium text-gray-900">Start Telehealth</span>
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Appointment</h4>
                                    <div className="bg-gray-50 p-4 rounded-xl">
                                        <p className="text-sm text-gray-700">Dec 20, 2024 - 10:00 AM</p>
                                        <p className="text-xs text-gray-500 mt-1">Follow-up Consultation</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Prescriptions</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Lisinopril 10mg</span>
                                            <span className="text-gray-500">Dec 10, 2024</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Atorvastatin 20mg</span>
                                            <span className="text-gray-500">Nov 28, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Only visible on xl+ (side by side) */}
                    <div className=" xl:block xl:w-80 bg-white rounded-2xl shadow-lg p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>

                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-xl text-left">
                                <User className="h-5 w-5 text-purple-600" />
                                <span className="text-sm font-medium text-gray-900">View Patient Profile</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl text-left">
                                <Calendar className="h-5 w-5 text-blue-600" />
                                <span className="text-sm font-medium text-gray-900">View Appointment</span>
                            </button>
                            <button className="w-full flex items-center gap-3 p-3 bg-teal-50 hover:bg-teal-100 rounded-xl text-left">
                                <Video className="h-5 w-5 text-teal-600" />
                                <span className="text-sm font-medium text-gray-900">Start Telehealth</span>
                            </button>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Upcoming Appointment</h4>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-gray-700">Dec 20, 2024 - 10:00 AM</p>
                                <p className="text-xs text-gray-500 mt-1">Follow-up Consultation</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Recent Prescriptions</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Lisinopril 10mg</span>
                                    <span className="text-gray-500">Dec 10, 2024</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Atorvastatin 20mg</span>
                                    <span className="text-gray-500">Nov 28, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}