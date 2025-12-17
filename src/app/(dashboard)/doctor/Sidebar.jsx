"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, MessageSquare, Pill, FileText, Video, Heart, Menu, X, Settings, Users } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Dashboard", icon: Heart, href: "/doctor/dashboard" },
    { name: "Appointments", icon: Calendar, href: "/doctor/appointments" },
    { name: "Telehealth", icon: MessageSquare, href: "/doctor/telehealth", badge: 3 },
    { name: "Patient Queue", icon: Pill, href: "/doctor/prescriptions" },
    { name: "Tasks", icon: FileText, href: "/doctor/medical-records" },
    { name: "Patients", icon: Users, href: "/doctor/doctors" },
    { name: "Prescriptions", icon: FileText, href: "/doctor/prescriptions" },
    { name: "Messages", icon: MessageSquare, href: "/doctor/messages" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    let pathname = usePathname() || "/doctor/dashboard";
    if (pathname === "/") pathname = "/doctor/dashboard";

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidebarContent = (
        <div className="flex flex-col h-screen justify-between pb-15 lg:pb-5 w-64 py-3 px-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                <span className="w-10 h-10 rounded-full bg-blue-500"></span>
                <span className="font-bold text-2xl">SmartHMS</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 my-5 overflow-y-auto space-y-2">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                                ${isActive
                                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 shadow"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{link.name}</span>
                            {link.badge && (
                                <span className="ml-auto bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {link.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Settings Link */}
            <div className="flex-shrink-0">
                <Link
                    href="/doctor/settings"
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                        ${pathname === "/doctor/settings"
                            ? "bg-blue-100 text-blue-700 border-l-4 border-blue-500 shadow"
                            : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                        }`}
                >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                </Link>

                {/* Premium Card */}
                <div className=" relative w-full px-4">
                    <div className="relative bg-[linear-gradient(135deg,#0284C7_0%,#38BDF8_100%)] rounded-2xl shadow-2xl overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1 bg-white opacity-20 rounded-t-2xl"></div>
                        <div className="p-4 text-white">
                            <h3 className="text-md font-bold mb-1">Premium Plan</h3>
                            <p className="text-blue-100 text-xs mb-4">Your license expires in 24 days</p>
                            <button className="w-full bg-white text-blue-600 font-semibold text-xs py-2 px-6 rounded-xl shadow hover:shadow-lg transition-all duration-200">
                                Renew Now
                            </button>
                        </div>
                    </div>
                    <div className="absolute -inset-1 bg-blue-400 blur-xl opacity-20 rounded-2xl -z-10"></div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed top-0 left-0 z-50 border-r border-gray-200">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={toggleSidebar}
                    ></div>

                    <div className="absolute inset-y-0 left-0 z-50 bg-white border-r border-gray-200 shadow-lg w-64">
                        <button
                            className="absolute top-2 right-2 rounded-md bg-gray-200 shadow-md z-50 cursor-pointer"
                            onClick={toggleSidebar}
                        >
                            <X className="w-6 h-6" />
                        </button>
                        {sidebarContent}
                    </div>
                </div>
            )}

            {/* Mobile Menu Button */}
            {!isOpen && (
                <button
                    className="lg:hidden fixed translate-y-1/2 left-4 z-50 px-2 py-1 rounded-md bg-gray-200 shadow-md cursor-pointer"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-6 h-6" />
                </button>
            )}
        </>
    );
}
