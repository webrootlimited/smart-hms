"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import topImg from "@/assets/homepage/hero-top-img.jpg";
import bottomImg from "@/assets/homepage/hero-bottom-img.jpg";
import { X, Menu } from "lucide-react";
import logo from "@/assets/logo.png";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function HeroSection() {
    const [openMenu, setOpenMenu] = useState(false);
    const [navbarFixed, setNavbarFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setNavbarFixed(true);
            else setNavbarFixed(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Animation Variants (same as before)
    const navVariants = {
        hidden: { y: -100 },
        visible: { y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const staggerContainer = {
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const imageVariants = {
        hidden: { opacity: 0, x: 100, scale: 0.9 },
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: "easeOut" } },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.8, x: -50 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            x: 0,
            transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
        }),
    };

    return (
        <>
            {/* Full Background + Overlay */}
            <div className="relative min-h-screen flex flex-col bg-[conic-gradient(from_180deg_at_50%_50%,rgba(2,132,199,0.3)_0deg,rgba(181,219,238,0.797368)_43.27deg,#FEFEFE_211.15deg,rgba(139,198,229,0.680702)_347.88deg,rgba(2,132,199,0.3)_360deg),linear-gradient(0deg,rgba(195,195,195,0.2),rgba(195,195,195,0.2))] overflow-hidden">

                {/* Navbar - unchanged */}
                <motion.nav
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 
                        ${navbarFixed ? "bg-white py-3 shadow-lg" : "bg-transparent py-7"}
                    `}
                >
                    <div className="flex items-center justify-between mx-auto w-full max-w-7xl px-4 md:px-6">
                        <div className="flex items-center gap-1">
                            <div className={`rounded-lg flex items-center justify-center transition 
                                ${navbarFixed ? "bg-blue-600" : "bg-blue-600/90"}
                            `}>
                                <Image src={logo} alt="Logo" width={35} height={35} />
                            </div>
                            <span
                                className={`text-2xl font-bold transition 
    bg-[linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%)]
    bg-clip-text text-transparent
  `}
                            >
                                SmartHMS
                            </span>
                        </div>

                        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition
                            ${navbarFixed ? "text-gray-700" : "text-black"}
                        `}>
                            <Link href="#" className="hover:text-[#0284C7]  transition">Home</Link>
                            <Link href="#" className="hover:text-[#0284C7] transition">Features</Link>
                            <Link href="#" className="hover:text-[#0284C7] transition">Pricing</Link>
                            <Link href="#" className="hover:text-[#0284C7] transition">Contact</Link>
                            <Link href="#" className="hover:text-[#0284C7] transition">About</Link>
                        </div>

                        <div className="hidden md:block">
                            <Link href="/login"
                                className={`px-8 py-2 rounded-3xl text-sm font-medium border transition cursor-pointer
                                    ${navbarFixed
                                        ? "text-black border-[#7F60F9] hover:bg-[#7F60F9] hover:text-white"
                                        : "text-black border-[#7F60F9] hover:border-none hover:bg-[linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%)] hover:text-white"
                                    }
                                `}
                            >
                                Start free trial
                            </Link>
                        </div>

                        <button
                            className={`md:hidden p-2 transition cursor-pointer
                                ${navbarFixed ? "text-gray-900" : "text-black"}
                            `}
                            onClick={() => setOpenMenu(true)}
                        >
                            <Menu size={26} />
                        </button>
                    </div>
                </motion.nav>

                {/* Mobile Sidebar - unchanged */}
                <AnimatePresence>
                    {openMenu && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-md"
                            onClick={() => setOpenMenu(false)}
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="absolute left-0 top-0 w-72 bg-white/90 backdrop-blur-xl shadow-[4px_0_25px_-4px_rgba(0,0,0,0.2)] px-6 pb-12 flex flex-col justify-between min-h-screen max-h-screen rounded-r-2xl border-r border-gray-200"
                            >
                                <motion.button
                                    initial={{ opacity: 0, rotate: -180 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.2 }}
                                    onClick={() => setOpenMenu(false)}
                                    className="absolute right-3 top-2 text-gray-700 bg-gray-300 rounded cursor-pointer p-2 hover:text-gray-900 transition"
                                >
                                    <X size={26} />
                                </motion.button>

                                <div className="space-y-6 mt-8 w-full">
                                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex items-center gap-2 mb-2">
                                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-lg">S</span>
                                        </div>
                                        <span className="text-gray-800 font-bold text-xl">SmartHMS</span>
                                    </motion.div>

                                    <hr className="border-gray-300/60" />

                                    <motion.div className="flex flex-col gap-4 mt-2">
                                        {["Home", "Features", "Pricing", "Contact", "About"].map((item, index) => (
                                            <motion.div
                                                key={item}
                                                initial={{ opacity: 0, x: -40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.25 + index * 0.18, duration: 0.5, ease: "easeOut" }}
                                            >
                                                <Link href="#" onClick={() => setOpenMenu(false)} className="block w-full text-gray-700 text-lg font-medium px-4 py-2 rounded-xl bg-white/50 backdrop-blur-sm shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:bg-white hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition text-left">
                                                    {item}
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </div>

                                <motion.button
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25 + 5 * 0.18 + 0.2 }}
                                    onClick={() => setOpenMenu(false)}
                                    className="mb-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition cursor-pointer"
                                >
                                    Login
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HERO CONTENT - Two columns */}
                <div className="relative z-10 flex-1 flex items-center">
                    <div className="max-w-7xl mx-auto pt-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Side: Text content - appears first on mobile */}
                        <motion.div
                            className="relative z-10 flex-1 flex items-end pb-25 sm:pb-10 order-1 lg:order-1"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={staggerContainer}
                        >
                            <div className="max-w-7xl mx-auto px-6 w-full">
                                <motion.h1
                                    variants={fadeUp}
                                    className="mt-8 text-3xl md:text-4xl font-bold text-black leading-tight"
                                >
                                    Smarter Scheduling for <br className="sm:block hidden" />
                                    Smarter Healthcare <br className="sm:block hidden" />
                                    <span className="bg-[linear-gradient(270deg,#4D8BE9_22.29%,#2F548B_54.27%)]
 bg-clip-text text-transparent">
                                        Anytime, Anywhere
                                    </span>
                                </motion.h1>

                                <motion.p
                                    variants={fadeUp}
                                    className="mt-6 text-md text-black leading-relaxed max-w-xl"
                                >
                                    Book, manage, and monitor appointments seamlessly.
                                    Engineered for healthcare providers with full UK NHS & USA
                                    HIPAA compliance standards.
                                </motion.p>

                                <motion.div
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="relative w-full mt-6"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.4,
                                            ease: "easeOut",
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 20
                                        }}
                                        whileHover={{ scale: 1.015 }}
                                        className="relative"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Search for a doctor, specialty, or condition..."
                                            className="w-full px-5 py-3 pr-40 rounded-xl border border-gray-400 
                       transition-all duration-300 placeholder-gray-500 text-sm focus:outline-2 focus:outline-cyan-200/60"
                                            style={{
                                                borderImageSource: "linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%)",
                                                borderImageSlice: 1,
                                            }}
                                        />

                                        <button className="absolute right-1 top-1/2 -translate-y-1/2 px-5 py-2 bg-black text-white text-xs rounded-full shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                                            FIND A DOCTOR
                                        </button>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    variants={fadeUp}
                                    className="mt-10 flex flex-wrap gap-4"
                                >
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-medium  tracking-wide">
                                            Trusted by 50k+ users
                                        </p>

                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-px">
                                                {/* Full stars */}
                                                {[...Array(4)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-5 h-5 fill-current stroke-black stroke-[0.5px] shadow-sm border border-black/25 px-[2px]"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}

                                                {/* Half star */}
                                                <svg
                                                    className="w-5 h-5 fill-current stroke-black stroke-[0.5px] shadow-sm border border-black/25 px-[2px]"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <defs>
                                                        <linearGradient id="half">
                                                            <stop offset="50%" stopColor="currentColor" />
                                                            <stop offset="50%" stopColor="#374151" />
                                                        </linearGradient>
                                                    </defs>
                                                    <path
                                                        fill="url(#half)"
                                                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                                                    />
                                                </svg>
                                            </div>

                                            <span className="text-xs font-semibold">
                                                4.1/5 <span className="text-gray-500 font-medium">(14k Reviews)</span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Side: Images - appears below text on mobile */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={imageVariants}
                            className="order-2 lg:order-2 h-[500px] flex flex-col items-center justify-center gap-10 relative"
                        >
                            {/* Rectangle between images */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  w-20 h-[300px] -rotate-30 sm:-rotate-40 border-[7px_solid] border-image-source-[linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%)] bg-gradient-to-r from-[#6DDCFF] to-[#7F60F9] p-[7px] rounded-lg z-0"
                            >
                                <div className="bg-white/60 h-full w-full">
                                </div>
                            </div>

                            {/* Top image */}
                            <div className="w-40 h-50 rounded-[4rem] overflow-hidden relative z-10 right-10 sm:right-20">
                                <Image
                                    src={topImg}
                                    alt="Healthcare professional"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Bottom image */}
                            <div className="w-45 h-45sm:w-55 sm:h-55 rounded-full shadow-2xl overflow-hidden border-8 border-white relative z-10 left-10 sm:left-20">
                                <Image
                                    src={bottomImg}
                                    alt="Patient using app"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Partner Logos Section - unchanged */}
            <div className="py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        className="flex flex-col sm:flex-row items-start sm:justify-center sm:items-center gap-6 lg:gap-x-16 w-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                    >
                        {[
                            { name: "HMS", bold: false },
                            { name: "HMS", bold: false },
                            { name: "HealTrust", bold: false },
                            { name: "HMS", bold: false },
                            { name: "SmartHMS", bold: true },
                        ].map((logo, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={logoVariants}
                                className="flex items-center gap-1 w-full lg:w-auto"
                            >
                                <div className="w-8 h-8 bg-[linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%)] rounded-full flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-black/40 rounded-full"></div>
                                </div>
                                <span className={`bg-[linear-gradient(98.24deg,#6DDCFF_0%,#7F60F9_100%)] bg-clip-text text-transparent font-medium ${logo.bold ? "font-semibold text-2xl" : "text-2xl"}`}>
                                    {logo.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
}