// components/AppointmentBooking.tsx
"use client";

import Image from 'next/image';
import { Calendar, Clock, MapPin, Video, Stethoscope, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Doctor Images
import richard from '@/assets/book-appointment/doctor1.jpg';
import emily from '@/assets/book-appointment/doctor2.jpg';
import michael from '@/assets/book-appointment/doctor3.jpg';

export default function Main() {
    const [activeTab, setActiveTab] = useState("clinic"); // clinic or telehealth
    const [selectedSlot, setSelectedSlot] = useState("09:00 AM");
    const [selectedDay, setSelectedDay] = useState(25); // example selected day

    const slots = {
        Morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"],
        Afternoon: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"],
        Evening: ["05:00 PM", "05:30 PM", "06:00 PM"],
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* === LEFT: Filters + Available Doctors === */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Filters */}
                    <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-900 text-xs">Filters</h3>
                            <button className="text-xs text-blue-600 hover:underline">Reset All</button>
                        </div>

                        {/* Specialty */}
                        <div>
                            <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">Specialty</label>
                            <select className="mt-1 w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                                <option>Cardiology</option>
                            </select>
                        </div>

                        {/* Doctor Gender */}
                        <div>
                            <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">Doctor Gender</label>
                            <div className="mt-1 flex gap-1">
                                <button className="flex-1 px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50">Male</button>
                                <button className="flex-1 px-3 py-1 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50">Female</button>
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="text-[10px] font-medium text-gray-700 uppercase tracking-wider">Experience</label>
                            <div className="mt-1 flex flex-wrap gap-1">
                                <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded-xl text-[10px] font-medium">5+ Years</button>
                                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-xl text-[10px] font-medium">10+ Years</button>
                                <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-xl text-[10px] font-medium">15+ Years</button>
                            </div>
                        </div>
                    </div>


                    {/* Available Doctors */}
                    <div className="space-y-3">
                        {/* Dr. Richard James */}
                        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-2 relative border-2 border-[#0284C7CC]">
                            {/* Check Icon */}
                            <span className="absolute top-2 right-2 w-6 h-6 bg-[#0284C7CC] text-white rounded-full flex items-center justify-center">
                                <Check className="w-3 h-3" />
                            </span>

                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <Image src={richard} alt="Dr. Richard James" width={64} height={64} className="rounded-lg w-16 h-16 object-cover" />
                                    {/* Status Indicator */}
                                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></span>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <h3 className="font-semibold text-gray-900 text-sm">Dr. Richard James</h3>
                                    <p className="text-[10px] font-semibold text-[#0284C7CC] px-2 py-0.5 rounded-full inline-block">Cardiologist</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3 text-gray-700" />
                                        <p className="text-[10px] font-semibold text-gray-700">12+ Years Exp.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-yellow-500">
                                        <span>★★★★★</span>
                                        <span className="text-gray-400">(124)</span>
                                    </div>
                                </div>
                            </div>
                            {/* Bottom Availability / Fee Bar */}
                            <div className="flex justify-between items-center mt-2 px-3 pt-2 pb-1 text-[10px] text-gray-600">
                                <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Available Today</span>
                                <span className="font-semibold text-gray-900">$150 <span className='text-gray-400 text-xs'>/ visit</span></span>
                            </div>
                        </div>

                        {/* Dr. Emily Watson */}
                        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-2">
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <Image src={emily} alt="Dr. Emily Watson" width={64} height={64} className="rounded-lg w-16 h-16 object-cover" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-gray-400"></span>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <h3 className="font-semibold text-gray-900 text-sm">Dr. Emily Watson</h3>
                                    <p className="text-[10px] font-semibold text-[#0284C7CC]">Cardiologist</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3 text-gray-700" />
                                        <p className="text-[10px] font-semibold text-gray-700">8+ Years Exp.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-yellow-500">
                                        <span>★★★★☆</span>
                                        <span className="text-gray-400">(89)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2 px-3 pt-2 pb-1 text-[10px] text-gray-600">
                                <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Available Tomorrow</span>
                                <span className="font-semibold text-gray-900">$140 <span className='text-gray-400 text-xs'>/ visit</span></span>
                            </div>
                        </div>

                        {/* Dr. Michael Chen */}
                        <div className="bg-white rounded-2xl shadow-sm p-3 flex flex-col gap-2">
                            <div className="flex items-start gap-3">
                                <div className="relative">
                                    <Image src={michael} alt="Dr. Michael Chen" width={64} height={64} className="rounded-lg w-16 h-16 object-cover" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-red-500"></span>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <h3 className="font-semibold text-gray-900 text-sm">Dr. Michael Chen</h3>
                                    <p className="text-[10px] font-semibold text-[#0284C7CC]">Cardiologist</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3 text-gray-700" />
                                        <p className="text-[10px] font-semibold text-gray-700">15+ Years Exp.</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-semibold text-yellow-500">
                                        <span>★★★★☆</span>
                                        <span className="text-gray-400">(210)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2 px-3 pt-2 pb-1 text-[10px] text-gray-600">
                                <span className="text-gray-500 bg-[#EBF2FE] px-4 py-1 rounded-full text-xs">Next Available: Mon</span>
                                <span className="font-semibold text-gray-900">$180 <span className='text-gray-400 text-xs'>/ visit</span></span>
                            </div>
                        </div>
                    </div>



                </div>

                {/* === MIDDLE: Calendar & Time Slots === */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-gray-900 text-base">Select Date & Time</h3>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Timezone: America/New_York (EST)</p>

                        {/* Clinic / Telehealth Tabs */}
                        <div className="bg-[#F5F8FF80] p-3 rounded-xl">
                            <div className="bg-white rounded-xl flex gap-3 p-2">
                                {/* In-Clinic Visit Tab */}
                                <button
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${activeTab === "clinic" ? "bg-[#E6F0FF] text-gray-900" : "bg-white text-gray-500"
                                        }`}
                                    onClick={() => setActiveTab("clinic")}
                                >
                                    <Stethoscope className={`w-5 h-5  ${activeTab === "clinic" ? "text-blue-600" : "text-gray-500"}`} />
                                    <span className='text-sm font-medium'>In-Clinic Visit</span>
                                </button>

                                {/* Telehealth Tab */}
                                <button
                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${activeTab === "telehealth" ? "bg-[#E6F0FF] text-gray-900" : "bg-white text-gray-500"
                                        }`}
                                    onClick={() => setActiveTab("telehealth")}
                                >
                                    <Video className={`w-5 h-5 ${activeTab === "telehealth" ? "text-gray-700" : "text-gray-500"}`} />
                                    <span className='text-sm font-medium'>Telehealth</span>
                                </button>
                            </div>
                        </div>



                        {/* Month and Arrows */}
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-gray-900 text-sm">October 2023</h4>
                            <div className="flex gap-2">
                                <ChevronLeft className="w-5 h-5 text-gray-400 cursor-pointer" />
                                <ChevronRight className="w-5 h-5 text-gray-400 cursor-pointer" />
                            </div>
                        </div>

                        {/* Week Days */}
                        <div className="grid grid-cols-7 gap-2 text-xs text-gray-400 mb-4">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                                <span
                                    key={day}
                                    className={`py-1 rounded-full text-center cursor-pointer ${index === 2 ? "bg-[#0284C7CC] text-white" : ""
                                        }`}
                                >
                                    {day}
                                </span>
                            ))}
                        </div>

                        {/* Time Slots */}
                        <div className="space-y-4 text-sm">
                            {/* Morning */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">Morning</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"].map((time) => (
                                        <button
                                            key={time}
                                            className={`py-2 rounded-lg text-xs font-medium w-full ${selectedSlot === time
                                                ? "bg-[#0284C7CC] text-white shadow-[0px_4px_6px_-4px_#3B82F64D] shadow-[0px_10px_15px_-3px_#3B82F64D]"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            onClick={() => setSelectedSlot(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Afternoon */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">Afternoon</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"].map((time) => (
                                        <button
                                            key={time}
                                            className={`py-2 rounded-lg text-xs font-medium w-full ${selectedSlot === time
                                                ? "bg-[#0284C7CC] text-white shadow-[0px_4px_6px_-4px_#3B82F64D] shadow-[0px_10px_15px_-3px_#3B82F64D]"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            onClick={() => setSelectedSlot(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Evening */}
                            <div>
                                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">Evening</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {["05:00 PM", "05:30 PM", "06:00 PM"].map((time) => (
                                        <button
                                            key={time}
                                            className={`py-2 rounded-lg text-xs font-medium w-full ${selectedSlot === time
                                                ? "bg-[#0284C7CC] text-white shadow-[0px_4px_6px_-4px_#3B82F64D] shadow-[0px_10px_15px_-3px_#3B82F64D]"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                }`}
                                            onClick={() => setSelectedSlot(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                {/* === RIGHT: Appointment Summary === */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        {/* Heading */}
                        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Appointment Summary</h3>

                        {/* Doctor Info */}
                        <div className="flex gap-4 mb-4">
                            <Image
                                src={richard}
                                alt="Dr. Richard James"
                                width={60}
                                height={60}
                                className="rounded-lg w-16 h-16 object-cover"
                            />
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">Dr. Richard James</h4>
                                <p className="text-xs text-[#0284C7]">Cardiologist</p>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="space-y-3 text-sm">
                            {/* Date */}
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-[#0284C7]" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-xs">Date</p>
                                    <p className="text-gray-900 font-semibold text-xs">Wednesday, Oct 25, 2023</p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-[#0284C7]" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-xs">Time</p>
                                    <p className="text-gray-900 font-semibold text-xs">10:00 AM - 10:30 AM</p>
                                </div>
                            </div>

                            {/* Type */}
                            <div className="flex items-center gap-3">
                                <Stethoscope className="w-4 h-4 text-[#0284C7]" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-xs">Type</p>
                                    <p className="text-gray-900 font-semibold text-xs">In-Clinic Visit</p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-[#0284C7]" />
                                <div className="flex flex-col">
                                    <p className="text-gray-500 text-xs">Duration</p>
                                    <p className="text-gray-900 font-semibold text-xs">30 Minutes</p>
                                </div>
                            </div>
                        </div>


                        {/* Fees */}
                        <div className="mt-5 pt-4 space-y-1 text-sm text-gray-700">
                            <div className="flex justify-between">
                                <span>Consultation Fee</span>
                                <span className="text-black font-semibold">$150.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service Charge</span>
                                <span className="text-black font-semibold">$5.00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className='text-black font-semibold'>Total</span>
                                <span className="text-[#0284C7] font-semibold">$155.00</span>
                            </div>
                        </div>


                        {/* Buttons */}
                        <button className="w-full mt-6 bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm">
                            <Check className="w-5 h-5" /> Confirm Appointment
                        </button>
                        <button className="w-full mt-3 border border-gray-300 text-gray-700 font-medium py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 text-sm">
                            <X className="w-4 h-4" /> Change Slot
                        </button>
                    </div>
                </div>


            </div>
        </div>
    );
}
