"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Menu, X,
    Stethoscope,
    Users,
    FileBarChart2, LayoutDashboard,
    CalendarCheck,
    UserRound,
    Settings,
    Bell,
    CreditCard,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";

const navLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard",
    },
    {
        name: "Appointments",
        icon: CalendarCheck,
        href: "/admin/appointments",
    },
    {
        name: "Providers",
        icon: Stethoscope,
        href: "/admin/providers",
    },
    {
        name: "Patients",
        icon: UserRound,
        href: "/admin/patients",
    },
    {
        name: "User Management",
        icon: Users,
        href: "/admin/user-management",
    },
    {
        name: "Clinic Settings",
        icon: Settings,
        href: "/admin/clinic-settings",
    },
    {
        name: "Notifications",
        icon: Bell,
        href: "/admin/notifications",
    },
    {
        name: "Billing Rules",
        icon: CreditCard,
        href: "/admin/billing-rules",
    },
    {
        name: "Reports",
        icon: FileBarChart2,
        href: "/admin/reports",
    },
    {
        name: "Settings",
        icon: Settings,
        href: "/admin/settings",
    },
];


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    let pathname = usePathname() || "/dashboard";
    if (pathname === "/") pathname = "/dashboard";

    const toggleSidebar = () => setIsOpen(!isOpen);

    const sidebarContent = (
        <div className="bg-white w-64 h-screen flex flex-col py-3 px-4">
            {/* Logo */}
            <div className="flex items-center mb-6 gap-3 flex-shrink-0">
                <Image src={logo} className="w-10 h-10" alt="Logo" />
                <div><span className="font-bold text-2xl">Smart</span>
                    <span className="font-bold text-2xl bg-gradient-to-b from-[#0284C7] to-[#0369A1]
                                      bg-clip-text text-transparent">HMS</span></div>
            </div>

            {/* Navigation (SCROLLABLE) */}
            <nav className="flex-1 overflow-y-auto space-y-2 pr-1">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive
                                    ? "bg-[#0284C7] text-white"
                                    : "text-[#64748B] hover:bg-[#0284C7] hover:text-white"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </nav>
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
