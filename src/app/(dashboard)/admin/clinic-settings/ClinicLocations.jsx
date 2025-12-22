'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, Users, Stethoscope, Activity, Percent, Edit2, Trash2, Star, Building2 } from 'lucide-react';

export default function ClinicLocationsCards() {
    const clinics = [
        {
            name: "Main Hospital",
            type: "Primary Care Center",
            rating: 4.9,
            address: "123 Medical Center Drive, New York, NY 10001",
            phone: "+1 (555) 123-4567",
            email: "main@hospital.",
            hours: ["Mon-Fri: 7:00 AM - 9:00 PM", "Sat-Sun: 8:00 AM - 6:00 PM"],
            stats: { staff: 48, providers: 12, patients: 1250, capacity: "94%" },
            departments: ["Cardiology", "Neurology", "Pediatrics", "Emergency"],
            features: ["Telehealth", "24/7 Support", "High Rated"],
            borderGradient: "from-blue-500 to-indigo-600",
            buttonGradient: "from-blue-600 to-indigo-700",
        },
        {
            name: "North Branch",
            type: "Outpatient Clinic",
            rating: 4.7,
            address: "456 North Avenue, Brooklyn, NY 11201",
            phone: "+1 (555) 234-5678",
            email: "north@hospital.",
            hours: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 3:00 PM"],
            stats: { staff: 24, providers: 6, patients: 680, capacity: "78%" },
            departments: ["General Practice", "Orthopedics", "Physical Therapy"],
            features: ["Telehealth", "24/7 Support", "High Rated"],
            borderGradient: "from-teal-500 to-emerald-600",
            buttonGradient: "from-teal-600 to-emerald-700",
        },
        {
            name: "South Branch",
            type: "Specialty Center",
            rating: 4.8,
            address: "789 South Boulevard, Queens, NY 11375",
            phone: "+1 (555) 345-6789",
            email: "south@hospital.",
            hours: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 5:00 PM"],
            stats: { staff: 32, providers: 8, patients: 890, capacity: "85%" },
            departments: ["Dermatology", "Ophthalmology", "ENT"],
            features: ["24/7 Support", "High Rated"],
            borderGradient: "from-purple-500 to-pink-600",
            buttonGradient: "from-purple-600 to-pink-700",
        },
        {
            name: "Downtown Urgent Care",
            type: "Urgent Care Facility",
            rating: 4.6,
            address: "321 Downtown Plaza, Manhattan, NY 10005",
            phone: "+1 (555) 456-7890",
            email: "urgent@hospital.c",
            hours: ["Open 24/7", "Open 24/7"],
            stats: { staff: 20, providers: 5, patients: 450, capacity: "62%" },
            departments: ["Emergency Care", "Urgent Care", "X-Ray"],
            features: ["Telehealth", "24/7 Support", "High Rated"],
            borderGradient: "from-orange-500 to-red-600",
            buttonGradient: "from-orange-600 to-red-700",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {clinics.map((clinic) => (
                        <div
                            key={clinic.name}
                            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative"
                        >
                            {/* Colored Top Border */}
                            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${clinic.borderGradient} rounded-t-3xl`} />

                            {/* Card Content */}
                            <div className="p-5 sm:p-6 pt-7 sm:pt-8">
                                {/* Header - Fully Responsive */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="p-2.5 sm:p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl">
                                            <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-gray-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{clinic.name}</h3>
                                            <p className="text-xs text-gray-600 flex flex-wrap items-center gap-2 mt-1">
                                                {clinic.type}
                                                <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                    Active
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full self-start sm:self-auto">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-semibold text-gray-800">{clinic.rating}</span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3 mb-4">
                                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                                    <p className="text-xs text-gray-700">{clinic.address}</p>
                                </div>

                                {/* Phone & Email - Wrap on mobile */}
                                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
                                    <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-xl">
                                        <Phone className="w-3.5 h-3.5 text-purple-600" />
                                        <span className="text-xs text-gray-700">{clinic.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl">
                                        <Mail className="w-3.5 h-3.5 text-green-600" />
                                        <span className="text-xs text-gray-700">{clinic.email}</span>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="bg-amber-50/70 rounded-2xl p-4 mb-5">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-orange-500" />
                                        <span className="text-xs font-medium text-gray-800">Working Hours</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {clinic.hours.map((hour, i) => (
                                            <span key={i} className="text-[10px] text-gray-600 bg-amber-100/50 px-2 py-1 rounded-lg">
                                                {hour}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats - Responsive grid */}
                                <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5">
                                    <div className="bg-blue-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                        <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                                        <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.stats.staff}</p>
                                        <p className="text-[10px] text-gray-600">Staff</p>
                                    </div>
                                    <div className="bg-purple-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                        <Stethoscope className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                                        <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.stats.providers}</p>
                                        <p className="text-[10px] text-gray-600">Providers</p>
                                    </div>
                                    <div className="bg-green-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                        <Activity className="w-5 h-5 text-green-600 mx-auto mb-1" />
                                        <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.stats.patients}</p>
                                        <p className="text-[10px] text-gray-600">Patients</p>
                                    </div>
                                    <div className="bg-red-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                        <Percent className="w-5 h-5 text-red-600 mx-auto mb-1" />
                                        <p className="text-base sm:text-lg font-bold text-gray-800">{clinic.stats.capacity}</p>
                                        <p className="text-[10px] text-gray-600">Capacity</p>
                                    </div>
                                </div>

                                {/* Departments */}
                                <div className="mb-4">
                                    <p className="text-xs font-medium text-gray-700 mb-2">Departments Available</p>
                                    <div className="flex flex-wrap gap-2">
                                        {clinic.departments.map((dept) => (
                                            <span
                                                key={dept}
                                                className="text-[10px] bg-indigo-50 text-indigo-700 px-2.5 py-1.5 rounded-full font-medium"
                                            >
                                                {dept}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {clinic.features.map((feat) => (
                                        <span
                                            key={feat}
                                            className="text-[10px] bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium"
                                        >
                                            {feat}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
                                    <button
                                        className={`bg-gradient-to-r ${clinic.buttonGradient} text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                                    >
                                        View Details →
                                    </button>
                                    <div className="flex items-center gap-3 justify-end sm:justify-start">
                                        <button className="p-2.5 bg-blue-50 rounded-full hover:bg-blue-100 transition">
                                            <Edit2 className="w-4 h-4 text-blue-600" />
                                        </button>
                                        <button className="p-2.5 bg-red-50 rounded-full hover:bg-red-100 transition">
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}