"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);

    const navLinks = [
        { label: "Find Doctors", href: "/doctors" },
        { label: "Hospitals", href: "/hospitals" },
        { label: "Telehealth", href: "/telehealth" },
        { label: "Surgeries", href: "/surgeries" },
    ];

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        <span className="text-2xl md:text-3xl font-bold text-black">
                            Smart<span className="text-[#0284C7]">HMS</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <nav className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-600 hover:text-[#525252] text-sm font-medium transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/login"
                            className="hidden lg:flex items-center space-x-2 text-gray-700 hover:text-[#525252]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <span className="text-sm font-medium">Sign In</span>
                        </Link>

                        <button className="hidden lg:block bg-[linear-gradient(270deg,#4D8BE9_22.29%,#2F548B_54.27%)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-800 transition shadow-sm cursor-pointer">
                            Book Appointment
                        </button>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 text-gray-900" onClick={() => setOpenMenu(true)}>
                            <Menu size={26} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Overlay Sidebar */}
            <AnimatePresence>
                {openMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md lg:hidden"
                        onClick={() => setOpenMenu(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute left-0 top-0 w-72 bg-white/90 backdrop-blur-xl shadow-[4px_0_25px_-4px_rgba(0,0,0,0.2)] px-6 py-8 flex flex-col justify-between min-h-screen rounded-r-2xl border-r border-gray-200"
                        >
                            {/* Close Button */}
                            <motion.button
                                initial={{ opacity: 0, rotate: -180 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setOpenMenu(false)}
                                className="absolute right-3 top-3 text-gray-700 bg-gray-300 rounded-full p-2 hover:text-gray-900 transition"
                            >
                                <X size={26} />
                            </motion.button>

                            {/* Sidebar Logo */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <span className="text-gray-800 font-bold text-xl">SmartHMS</span>
                            </div>

                            {/* Links - justify between top logo and bottom buttons */}
                            <div className="flex-1 flex flex-col justify-start gap-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + index * 0.18, duration: 0.5 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setOpenMenu(false)}
                                            className="block w-full text-gray-700 text-lg font-medium px-4 py-2 rounded-xl
                                bg-white/50 backdrop-blur-sm
                                shadow-[0_2px_6px_rgba(0,0,0,0.08)]
                                hover:bg-white hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)]
                                transition text-left"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Bottom Buttons */}
                            <div className="flex flex-col gap-3 mb-10">
                                <motion.button
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + navLinks.length * 0.18 + 0.2 }}
                                    onClick={() => setOpenMenu(false)}
                                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition cursor-pointer"
                                >
                                    Login
                                </motion.button>

                                <button className="bg-[linear-gradient(270deg,#4D8BE9_22.29%,#2F548B_54.27%)] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-800 transition shadow-sm cursor-pointer">
                                    Book Appointment
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </header>
    );
}
