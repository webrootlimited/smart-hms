"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MapPin, Video } from "lucide-react";
import clinicLogo from "@/assets/book-appointment/hero-img.png";

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState("clinic");

    return (
        <section className="bg-[#F5F8FF] py-30 px-4 overflow-hidden relative">

            {/* Right Side Image */}
            <div className="hidden lg:block absolute right-0 top-20 w-60 opacity-95 pointer-events-none">
                <Image src={clinicLogo} alt="Doctor" className="object-contain" />
            </div>

            <div className="max-w-5xl mx-auto text-center relative z-10">

                {/* Heading */}
                <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
                    Book Your Appointment <span className="text-[#0284C7]">in Minutes</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg font-medium text-gray-600 max-w-xl mx-auto leading-relaxed mb-10">
                    Choose a doctor, select a time, and confirm — fast and easy access to quality care.
                </p>

                {/* Search Bar */}
                <div className="mt-8 mx-auto max-w-6xl">
                    <div className="bg-white rounded-2xl shadow-md py-4 px-4 flex flex-col md:flex-row items-center gap-4 md:gap-6 justify-between">

                        {/* Left Side - Search + Location */}
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full md:flex-1">

                            {/* Search Input */}
                            <div className="w-full md:w-auto flex-1">
                                <div className="flex items-center bg-[#F5F8FF] rounded-xl px-4 py-2 gap-2">
                                    <Search className="w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search Doctor or Clinic"
                                        className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full text-sm"
                                    />
                                </div>
                            </div>

                            {/* Location Input */}
                            <div className="w-full md:w-auto flex-1">
                                <div className="flex items-center bg-[#F5F8FF] rounded-xl px-4 py-2 gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Tabs + Button */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 md:mt-0">

                            {/* Tabs */}
                            <div className="flex gap-2 bg-[#F5F8FF] rounded-xl border border-[#EBF2FE] p-1.5">
                                <button
                                    onClick={() => setActiveTab("clinic")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer
                                    ${activeTab === "clinic"
                                            ? "bg-white text-gray-800 shadow-[0px_4px_6px_-4px_#0000000D]"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Image src={clinicLogo} alt="Clinic" width={16} height={16} />
                                    Clinic
                                </button>

                                <button
                                    onClick={() => setActiveTab("telehealth")}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition cursor-pointer
                                    ${activeTab === "telehealth"
                                            ? "bg-white text-gray-800 shadow-[0px_4px_6px_-4px_#0000000D]"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Video className="w-4 h-4" />
                                    Telehealth
                                </button>
                            </div>

                            {/* Find Appointments Button */}
                            <button
                                className="text-white font-semibold px-6 py-3 rounded-xl text-sm whitespace-nowrap transition
                                bg-[#0284C7E5]
                                shadow-[0px_4px_6px_-4px_#3B82F633]
                                shadow-[0px_10px_15px_-3px_#3B82F633]
                                hover:bg-[#0284C7] cursor-pointer"
                            >
                                Find Appointments
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
