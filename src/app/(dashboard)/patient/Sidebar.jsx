"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Calendar, MessageSquare, Pill, FileText, Video, Heart, Menu, X, CreditCard, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
const navLinks = [
    { name: "Dashboard", icon: Heart, href: "/patient/dashboard" },
    { name: "Appointments", icon: Calendar, href: "/patient/appointments" },
    { name: "Messages", icon: MessageSquare, href: "/patient/messages", badge: 3 },
    { name: "Prescriptions", icon: Pill, href: "/patient/prescriptions" },
    { name: "Medical Records", icon: FileText, href: "/patient/medical-records" },
    { name: "Telehealth", icon: Video, href: "/patient/telehealth" },
    { name: "Payment Methods", icon: CreditCard, href: "/patient/payments" },
    { name: "Profile", icon: User, href: "/patient/profile" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    let pathname = usePathname() || "/dashboard";
    if (pathname === "/") pathname = "/dashboard";

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidebarContent = (
        <div className="bg-white w-64 h-screen pb-30 lg:pb-5 flex flex-col justify-between py-3 px-4">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                <Image src={logo} className="w-10 h-10" alt="Logo" />
                <div><span className="font-bold text-2xl">Smart</span>
                    <span className="font-bold text-2xl bg-gradient-to-b from-[#0284C7] to-[#0369A1]
           bg-clip-text text-transparent">HMS</span></div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 overflow-y-auto">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center font-semibold gap-3 px-4 py-3 rounded-lg transition
            ${isActive
                                    ? "shadow-sm bg-[#F0F9FF] text-[#0369A1]"
                                    : "text-[#64748B] hover:shadow-sm hover:bg-[#F0F9FF]"
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

            {/* Bottom Help Card */}
            <div className="mt-4">
                <div className="relative w-full">
                    {/* Main Card */}
                    <div className="relative bg-gradient-to-b from-blue-500 to-blue-600 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Top subtle highlight */}
                        <div className="absolute inset-x-0 top-0 h-1 bg-white opacity-20 rounded-t-2xl"></div>

                        <div className="p-4 text-center text-white">
                            <h3 className="text-md font-bold mb-1">Need Help?</h3>
                            <p className="text-blue-100 text-xs mb-4">Contact support 24/7</p>

                            {/* Contact Button */}
                            <button className="w-full bg-white text-blue-600 font-semibold text-xs py-2 rounded-xl shadow hover:shadow-lg transition-all duration-200">
                                Contact Support
                            </button>
                        </div>
                    </div>

                    {/* Outer glow effect */}
                    <div className="absolute -inset-1 bg-blue-400 blur-xl opacity-20 rounded-2xl -z-10"></div>
                </div>
            </div>
        </div>

    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden border-r border-[#E2E8F0] lg:flex fixed top-0 left-0 z-50">
                {sidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50">
                    {/* Background overlay */}
                    <div
                        className="absolute inset-0 bg-black/30"
                        onClick={toggleSidebar}
                    ></div>

                    {/* Sidebar panel */}
                    <div className="absolute inset-y-0 left-0 z-50 bg-white border-b border-[#E2E8F0] shadow-lg w-64">
                        {/* Close button at top-right */}
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
