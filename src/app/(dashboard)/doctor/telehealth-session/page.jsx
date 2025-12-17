"use client"
import { useState } from "react"
import Image from "next/image"
import { Mic, MicOff, Video, PhoneOff, Shield, Paperclip, Smile, Send, MessageSquare, X, LogOut } from "lucide-react"

export default function VideoCallScreen() {
    const [isChatOpen, setIsChatOpen] = useState(true)

    return (
        <div className="w-full bg-[conic-gradient(from_180deg_at_50%_50%,_rgba(2,132,199,0.3)_0deg,_rgba(181,219,238,0.797368)_43.27deg,_#FEFEFE_211.15deg,_rgba(139,198,229,0.680702)_347.88deg,_rgba(2,132,199,0.3)_360deg)] h-screen flex flex-col">
            {/* Top Header */}
            <div className="w-full  px-2 h-[3rem] translate-y-1/5 md:px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm">
                    {/* Left: Logo + Session Info */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-8 h-8 md:w-9 md:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm md:text-lg shrink-0">
                            S
                        </div>
                        <div className="min-w-0">
                            <h1 className="font-semibold text-gray-900 text-xs md:text-sm truncate">SmartHMS</h1>
                            <p className="text-[9px] md:text-xs text-gray-500 truncate">Session #4829</p>
                        </div>
                    </div>

                    <button className="bg-white rounded py-2 px-4 flex items-center gap-2  transition">
                        <LogOut className="w-5 h-5 text-gray-700" />
                        Leave Room
                    </button>
                </div>
            </div>

            {/* Main Video + Chat Section */}
            <div className="flex-1  flex items-center justify-center overflow-hidden px-4 pt-5 lg:p-4">
                <div className="w-full max-w-7xl flex gap-4 h-full lg:h-auto">
                    {/* Video Container */}
                    <div
                        className={`h-full lg:h-[80vh] relative rounded-2xl overflow-hidden transition-all duration-300 ${isChatOpen ? "flex-1" : "flex-1"}`}
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1280&q=80"
                            alt="Doctor Background"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-white/10" />

                        {/* Local Video - Top Right */}
                        <div className="absolute top-2 right-2 md:top-6 md:right-6 z-30">
                            <div className="w-30 h-30 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                                <Image
                                    src="https://randomuser.me/api/portraits/men/45.jpg"
                                    alt="Your Video"
                                    width={128}
                                    height={128}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Top Status */}
                        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-2 text-[9px] md:text-xs z-20">
                            <div className="flex items-center gap-1 bg-white/70 backdrop-blur-sm px-2 py-1 rounded-full whitespace-nowrap">
                                <Mic className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                                <span className="hidden sm:inline">Mitchell is speaking...</span>
                                <span className="sm:hidden">Speaking...</span>
                            </div>
                            <div className="flex items-center gap-1 bg-red-500 text-white backdrop-blur-sm px-2 py-1 rounded whitespace-nowrap">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                Recording
                            </div>
                        </div>

                        {/* Bottom Control Bar */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-full px-2">
                            <div className="bg-white/10 backdrop-blur-lg px-2 py-1 rounded-2xl flex items-center justify-center gap-2 shadow-md border border-white/30 max-w-fit mx-auto">
                                <button className="p-2 rounded-2xl bg-white/20 hover:bg-gray-300 transition">
                                    <MicOff className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                                </button>
                                <button className="p-2 rounded-2xl bg-white/20 hover:bg-gray-300 transition">
                                    <Video className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                                </button>
                                <div className="w-px h-5 md:h-6 bg-white/30" />
                                <button onClick={() => setIsChatOpen(!isChatOpen)} className="p-2 rounded-2xl bg-[#0284C7] flex items-center justify-center">
                                    <div className="w-5 h-5 bg-white rounded flex items-center justify-center">
                                        <svg className="w-3 h-3 text-black" fill="none" stroke="black" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                </button>
                                <button className="p-2 rounded-2xl bg-white/20 shadow-sm">
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                                    </svg>
                                </button>
                                <div className="w-px h-5 md:h-6 bg-white/30" />
                                <button className="p-2 rounded-2xl bg-red-500 hover:bg-red-600 transition shadow">
                                    <PhoneOff className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                </button>

                            </div>
                        </div>
                    </div>

                    {isChatOpen && (
                        <div className="w-full md:w-80 lg:w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 h-full lg:h-[80vh]">
                            {/* Chat Header */}
                            <div className="px-3 md:px-4 py-2 md:py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
                                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                                    <div className="relative shrink-0">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-300">
                                            <Image
                                                src="https://randomuser.me/api/portraits/women/68.jpg"
                                                alt="Dr. Sarah Mitchell"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 text-sm md:text-base truncate">Sarah Mitchell</p>
                                        <p className="text-xs text-green-600">Online</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="text-gray-400 bg-gray-200 hover:bg-gray-300 p-1 rounded-full hover:text-gray-600 transition shrink-0"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            {/* Scrollable Messages Area */}
                            <div className="flex-1 overflow-y-auto px-3 md:px-4 pt-3 md:pt-4 pb-2 space-y-3 md:space-y-4 bg-gray-50">
                                <div className="text-center text-xs text-gray-500">Today, 10:23 AM</div>
                                <div className="flex gap-2 md:gap-3">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src="https://randomuser.me/api/portraits/women/68.jpg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-white rounded-2xl rounded-tl-none px-3 md:px-4 py-2 shadow-sm max-w-[70%]">
                                        <p className="text-xs md:text-sm">Hello! How are you feeling today?</p>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none px-3 md:px-4 py-2 shadow-sm max-w-[70%]">
                                        <p className="text-xs md:text-sm">Feeling better, thanks!</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 md:gap-3">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <Image
                                            src="https://randomuser.me/api/portraits/women/68.jpg"
                                            alt=""
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-white rounded-2xl rounded-tl-none px-3 md:px-4 py-2 shadow-sm max-w-[70%]">
                                        <p className="text-xs md:text-sm">Great to hear! Any chest pain?</p>
                                    </div>
                                </div>
                            </div>
                            {/* Input - Fixed at bottom */}
                            <div className="p-3 md:p-4 border-t border-gray-200 bg-white shrink-0">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <button className="text-gray-400 hover:text-gray-600 shrink-0">
                                        <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 bg-gray-100 rounded-full px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
                                    />
                                    <button className="text-gray-400 hover:text-gray-600 shrink-0 hidden sm:block">
                                        <Smile className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                    <button className="bg-blue-600 text-white p-2 md:p-2.5 rounded-full hover:bg-blue-700 transition shrink-0">
                                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
