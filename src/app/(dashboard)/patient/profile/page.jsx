"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import {
    User,
    Shield,
    CreditCard,
    Bell as BellIcon,
    FileText,
    Calendar,
    Users,
    MapPin,
    Mail,
    Phone,
    Check,
    Edit,
    X,
    Menu,
} from "lucide-react";
import Footer from "./Footer";
import profileCrad from "@/assets/profile-section.jpg"
import Image from "next/image";

export default function ProfilePage() {
    const [activeMenu, setActiveMenu] = useState("personal-info");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [profileData, setProfileData] = useState({
        fullName: "Sarah Johnson",
        dateOfBirth: "05/14/1992",
        gender: "Female",
        bloodType: "A+",
        email: "sarah.j@example.com",
        phone: "+1 (555) 000-8839",
        address: "123 Wellness Avenue, Suite 4B, Health District, CA 90210",
    });

    const menuItems = [
        { id: "personal-info", label: "Personal Info", icon: <User className="w-5 h-5" /> },
        { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
        { id: "payment", label: "Payment Methods", icon: <CreditCard className="w-5 h-5" /> },
        { id: "notifications", label: "Notifications", icon: <BellIcon className="w-5 h-5" /> },
        { id: "medical", label: "Medical Records", icon: <FileText className="w-5 h-5" /> },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Navbar />

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 bg-slate-50 min-h-screen">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex w-64 flex-shrink-0 flex-col gap-6">
                    {/* Menu */}
                    <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveMenu(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${activeMenu === item.id
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {item.icon}
                                <span className="font-medium">{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Complete Profile Card */}
                    <div className="bg-gradient-to-b from-blue-900 to-blue-500 rounded-2xl p-4 text-white shadow-lg text-sm">
                        <h3 className="text-lg font-bold mb-1">Complete Profile</h3>
                        <p className="text-blue-100 mb-3">
                            Complete your profile to get better healthcare recommendations.
                        </p>
                        <div className="bg-blue-800 rounded-full h-2 mb-2">
                            <div className="bg-white h-2 rounded-full w-4/5"></div>
                        </div>
                        <p className="text-xs text-blue-100 mb-4">85% Completed</p>
                        <div className="flex justify-center">
                            <div className="bg-blue-400 bg-opacity-30 rounded-full p-5 flex items-center justify-center">
                                <div className="relative w-14 h-14 bg-blue-300 rounded-full flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                    <div className="absolute bottom-0 right-0 bg-green-400 rounded-full p-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Horizontal Scroll Menu */}
                <div className="lg:hidden flex flex-col gap-2">
                    <div className="flex gap-2 overflow-x-auto py-2 px-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveMenu(item.id)}
                                className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-sm ${activeMenu === item.id
                                    ? "bg-blue-100 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Profile Completion Bar */}
                    <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-600">Profile Completion</span>
                        <div className="bg-blue-100 flex-1 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-500 h-2 w-4/5"></div>
                        </div>
                        <span className="text-xs font-medium text-gray-600">85%</span>
                    </div>
                </div>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div
                            className="fixed inset-0 bg-black/40"
                            onClick={() => setSidebarOpen(false)}
                        ></div>
                        <div className="relative w-64 bg-white shadow-lg p-4 flex flex-col">
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mt-10 flex flex-col gap-3">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveMenu(item.id);
                                            setSidebarOpen(false);
                                        }}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${activeMenu === item.id
                                            ? "bg-blue-100 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Profile Content */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                    {/* Header */}
                    <div className="bg-[linear-gradient(90deg,#EFF6FF_0%,#EEF2FF_100%)] py-5 lg:py-0 px-6 shadow-sm flex flex-col lg:flex-row gap-4 lg:h-48">
                        {/* Left Section */}
                        <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:items-start lg:justify-end">
                            <div className="relative lg:self-end flex justify-center lg:justify-start">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                                    alt="Sarah Johnson"
                                    className="lg:relative lg:translate-y-1/2 w-25 h-25 rounded-2xl"
                                />
                                <button className="relative h-fit -bottom-16 right-8 lg:-bottom-28 lg:right-9  bg-blue-500 text-white rounded-lg p-2 shadow-lg hover:bg-blue-600 transform">
                                    <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                                </button>
                            </div>

                            <div className="flex-1 flex flex-col gap-1 lg:self-end text-center lg:text-left">
                                <h1 className="text-lg lg:text-2xl font-bold text-gray-900">
                                    Personal Information
                                </h1>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    Manage your personal details and contact info
                                </p>
                            </div>
                        </div>

                        {/* Right Section - hidden below lg */}
                        <div className="w-20 lg:w-40 flex items-start justify-center hidden lg:flex">
                            <Image
                                src={profileCrad}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>





                    {/* Basic Details */}
                    <div className="bg-white pt-20  px-4 pb-5 lg:px-6 ">
                        <div className="flex items-center gap-2 mb-4">
                            <User className="text-blue-500 w-5 h-5" />
                            <h2 className="text-sm lg:text-lg font-bold text-gray-900">
                                Basic Details
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                            <div>
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={profileData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAFC] lg:py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                    Date of Birth
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        name="dateOfBirth"
                                        value={profileData.dateOfBirth}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAFC] lg:py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                    Gender
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <select
                                        name="gender"
                                        value={profileData.gender}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAFC] lg:py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm lg:text-base"
                                    >
                                        <option>Female</option>
                                        <option>Male</option>
                                        <option>Other</option>
                                    </select>
                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        ▼
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                    Blood Type
                                </label>
                                <div className="relative">
                                    <Users className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <select
                                        name="bloodType"
                                        value={profileData.bloodType}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-1.5 bg-[#F8FAFC] lg:py-2 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none text-sm lg:text-base"
                                    >
                                        <option>A+</option>
                                        <option>A-</option>
                                        <option>B+</option>
                                        <option>B-</option>
                                        <option>O+</option>
                                        <option>O-</option>
                                        <option>AB+</option>
                                        <option>AB-</option>
                                    </select>
                                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        ▼
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white pt-10 pb-5  px-6 lg:px-6 ">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="text-blue-500 w-5 h-5" />
                            <h2 className="text-sm lg:text-lg font-bold text-gray-900">
                                Contact Information
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                            <div>
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-1.5 lg:py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-1.5 lg:py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="block text-xs lg:text-sm font-medium text-gray-700 mb-1">
                                Home Address
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                                <textarea
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full pl-8 pr-3 py-1.5 lg:py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lg:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex bg-white pb-10 px-6 flex-col lg:flex-row justify-end gap-3">
                        <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg text-sm lg:text-base transition-colors">
                            Cancel
                        </button>
                        <button className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1 text-sm lg:text-base">
                            <Edit className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
