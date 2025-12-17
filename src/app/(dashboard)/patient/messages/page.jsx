"use client"

import { useState } from "react"
import { Phone, Video, Download, ImageIcon, Send, ArrowLeft, MessageCircle } from "lucide-react"
import Navbar from "./Navbar"

export default function MessagesUI() {
    const [activeTab, setActiveTab] = useState("all")
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [showChat, setShowChat] = useState(false)

    const tabs = ["All", "Doctors", "Reception", "Billing"]

    const conversations = [
        {
            id: 1,
            name: "Dr. John Smith",
            preview: "Please review the attached lab results...",
            time: "2:32 PM",
            avatar: "👨‍⚕️",
            unread: 1,
            category: "DERMATOLOGY",
            categoryColor: "blue",
        },
        {
            id: 2,
            name: "Front Desk - Central",
            preview: "Your appointment has been confirmed for...",
            time: "Yesterday",
            avatar: "👩",
            read: true,
        },
        {
            id: 3,
            name: "Billing Department",
            preview: "Invoice #4920 payment received. Thank y...",
            time: "Mon",
            avatar: "📋",
            delivered: true,
        },
        {
            id: 4,
            name: "Dr. Sarah Chen",
            preview: "Remember to fast for 8 hours before...",
            time: "Last Week",
            avatar: "👩‍⚕️",
            category: "CARDIOLOGY",
            categoryColor: "orange",
        },
    ]

    const messages = [
        {
            sender: "doctor",
            name: "Dr. John Smith",
            avatar: "👨‍⚕️",
            time: "10:45 AM",
            content:
                "Hello Alex, hope you're feeling better today. I've reviewed the photos you sent of the rash. It looks like a mild allergic reaction.",
            date: "Today, Oct 24",
        },
        {
            sender: "user",
            time: "10:48 AM",
            content: "Hi Dr. Smith! Yes, it's a bit itchy but hasn't spread. Should I continue with the ointment?",
        },
        {
            sender: "notification",
            type: "prescription",
            title: "Prescription Updated",
            content: "Hydrocortisone Cream 2.5% sent to CVS Pharmacy",
            action: "View Details",
        },
        {
            sender: "doctor",
            name: "Dr. John Smith",
            avatar: "👨‍⚕️",
            time: "11:02 AM",
            content: "Please review these lab results when you have a moment.",
            attachment: {
                name: "Lab_Results_Oct24.pdf",
                size: "2.4 MB",
                icon: "📄",
            },
        },
        {
            sender: "user",
            time: "Just now",
            content: "Here is how it looks now.",
            image: true,
        },
    ]

    const selectedConv = selectedConversation !== null ? conversations[selectedConversation] : null

    const handleConversationClick = (index) => {
        setSelectedConversation(index)
        setShowChat(true)
    }

    return (
        <>
            <Navbar />
            <div className="flex h-screen bg-gray-50 relative pt-16 lg:pt-0">
                {/* Sidebar */}
                <div
                    className={`
                        bg-white border-r border-gray-200 flex flex-col
                        fixed lg:relative top-16 lg:top-0 lg:pt-16 h-[calc(100%-64px)] lg:h-full z-20
                        transition-all duration-300
                        ${showChat && selectedConv ? "w-80 lg:w-auto -translate-x-full lg:translate-x-0" : "w-full lg:w-auto"}
                    `}
                >
                    {/* Tabs */}
                    <div className="p-4 border-b border-gray-200 flex flex-wrap gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase())}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.toLowerCase() || (activeTab === "all" && tab === "All")
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto min-w-80">
                        {conversations.map((conv, idx) => (
                            <div
                                key={conv.id}
                                onClick={() => handleConversationClick(idx)}
                                className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedConversation === idx ? "bg-blue-50" : "hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex gap-3 mb-2">
                                    <div className="text-2xl">{conv.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-900 text-sm">{conv.name}</h3>
                                            <span className="text-xs text-gray-500 ml-2">{conv.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-600 truncate">{conv.preview}</p>
                                    </div>
                                    {conv.unread && (
                                        <div className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                                            {conv.unread}
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-10">
                                    {conv.category && (
                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded ${conv.categoryColor === "blue"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-orange-100 text-orange-700"
                                                }`}
                                        >
                                            {conv.category}
                                        </span>
                                    )}
                                    {conv.read && <span className="text-xs text-blue-600">Read</span>}
                                    {conv.delivered && <span className="text-xs text-gray-500">Delivered</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div
                    className={`
                        flex-1 flex-col bg-[#F8FAFC]
                        fixed lg:relative top-16 lg:top-0 lg:pt-16 h-[calc(100%-64px)] lg:h-full w-full
                        transition-transform duration-300
                        ${showChat ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                        left-0 right-0 lg:left-auto lg:right-auto
                        ${selectedConv ? "flex" : "hidden lg:flex"}
                    `}
                >
                    {!selectedConv ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8">
                            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <MessageCircle size={48} className="text-blue-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No chat selected</h3>
                            <p className="text-gray-600 text-center max-w-md mb-8">
                                Select a conversation from the sidebar to start chatting or view your messages
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div className="bg-white border-b border-gray-200 p-3 lg:p-4 flex justify-between items-center">
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <button className="lg:hidden text-gray-700 mr-1" onClick={() => setShowChat(false)}>
                                        <ArrowLeft size={18} />
                                    </button>

                                    <div className="text-2xl lg:text-3xl">{selectedConv.avatar}</div>

                                    <div className="leading-tight">
                                        <h2 className="font-semibold text-gray-900 text-sm lg:text-base">
                                            {selectedConv.name}
                                        </h2>
                                        <p className="text-[10px] lg:text-xs text-gray-600">
                                            {selectedConv.category || "General"} • Available
                                        </p>
                                    </div>

                                    <span className="text-blue-500 text-base lg:text-lg">●</span>
                                </div>

                                <div className="flex gap-1.5 lg:gap-2 items-center">
                                    <button className="hidden lg:flex px-4 py-2 text-gray-700 font-medium text-sm border border-gray-300 rounded-lg hover:bg-gray-50 items-center gap-2">
                                        <Phone size={18} /> Callback
                                    </button>

                                    <button className="hidden lg:flex px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 items-center gap-2">
                                        <Video size={18} /> Start Telehealth
                                    </button>

                                    <button className="lg:hidden p-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50">
                                        <Phone size={16} />
                                    </button>

                                    <button className="lg:hidden p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                                        <Video size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                <div className="text-center text-xs text-gray-500 mb-6">Today, Oct 24</div>
                                {messages.map((msg, idx) => (
                                    <div key={idx}>
                                        {msg.sender === "notification" && (
                                            <div className="flex justify-center">
                                                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm w-full">
                                                    <div className="flex gap-3">
                                                        <div className="text-2xl">🏥</div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900 text-sm">{msg.title}</h4>
                                                            <p className="text-xs text-gray-600 mt-1">{msg.content}</p>
                                                            <a href="#" className="text-blue-500 text-xs font-medium mt-2 inline-block hover:underline">
                                                                {msg.action}
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {msg.sender === "doctor" && (
                                            <div className="flex gap-3">
                                                <div className="text-2xl">{msg.avatar}</div>
                                                <div className="flex-1">
                                                    <div className="flex gap-2 items-baseline mb-1">
                                                        <span className="text-sm font-semibold text-gray-900">{msg.name}</span>
                                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                                    </div>
                                                    <div className="bg-gray-100 rounded-lg p-3 max-w-lg">
                                                        <p className="text-sm text-gray-900">{msg.content}</p>
                                                    </div>
                                                    {msg.attachment && (
                                                        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-3 max-w-sm">
                                                            <span className="text-xl">{msg.attachment.icon}</span>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-900">{msg.attachment.name}</p>
                                                                <p className="text-xs text-gray-500">{msg.attachment.size}</p>
                                                            </div>
                                                            <Download size={18} className="text-gray-400 cursor-pointer" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {msg.sender === "user" && (
                                            <div className="flex justify-end">
                                                <div>
                                                    <div className="flex gap-2 items-baseline mb-1 justify-end">
                                                        <span className="text-xs text-gray-500">{msg.time}</span>
                                                    </div>
                                                    {msg.image ? (
                                                        <div className="bg-blue-500 rounded-2xl p-3 max-w-xs">
                                                            <div className="bg-blue-600 rounded-lg h-32 flex items-center justify-center mb-2">
                                                                <ImageIcon size={24} className="text-white" />
                                                            </div>
                                                            <p className="text-sm text-white">{msg.content}</p>
                                                        </div>
                                                    ) : (
                                                        <div className="bg-blue-500 text-white rounded-2xl p-3 max-w-xs">
                                                            <p className="text-sm">{msg.content}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="border-t border-gray-200 px-4 py-3 bg-white">
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-blue-500 text-white px-3 py-2.5 rounded-lg hover:bg-blue-600">
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
