"use client";
import { useState } from "react";
import { Menu, X, Bell } from "lucide-react";

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", href: "#", active: false },
        { label: "Appointments", href: "#", active: false },
        { label: "Profile", href: "#", active: true },
        { label: "Messages", href: "#", active: false },
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] backdrop-blur-[12px] border border-white/50 rounded-lg">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-900">SmartHMS</span>
                </div>

                {/* Middle Links (lg only) */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`text-sm font-medium transition-colors ${item.active
                                ? "text-blue-500 border-b-2 border-blue-500 pb-1"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <button className="relative hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
                        <Bell className="w-6 h-6" />
                    </button>

                    {/* Menu button for small screens */}
                    <button
                        className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                            alt="Sarah Johnson"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </div>
                </div>
            </nav>

            {/* Overlay Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">

                    {/* Backdrop blur overlay */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    {/* Sidebar */}
                    <div className="
            relative w-72 h-full 
            bg-white/90 backdrop-blur-xl 
            shadow-[4px_0_25px_-4px_rgba(0,0,0,0.25)]
            px-6 py-8 flex flex-col 
            rounded-r-2xl border-r border-gray-200
        ">

                        {/* Close Button */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute right-3 top-3 text-gray-700 bg-gray-300 rounded-full p-2 hover:text-gray-900 transition"
                        >
                            <X size={26} />
                        </button>

                        {/* Sidebar Logo */}
                        <div className="flex items-center gap-2 mb-8 mt-2">
                            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-gray-800 font-bold text-xl">SmartHMS</span>
                        </div>

                        {/* Menu Items (original logic but new styling) */}
                        <div className="flex-1 flex flex-col gap-4 mt-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                            block w-full text-gray-700 text-base font-medium px-4 py-2.5 rounded-xl
                            bg-white/40 backdrop-blur-sm
                            shadow-[0_2px_6px_rgba(0,0,0,0.06)]
                            hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
                            transition

                            ${item.active ?
                                            "bg-blue-100 text-blue-700 shadow-[0_3px_10px_rgba(0,0,0,0.15)]"
                                            : ""}
                        `}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}
