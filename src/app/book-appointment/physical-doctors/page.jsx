"use client"

import React, { useState } from 'react';
import { MapPin, Search, Calendar, Filter, Star, Navigation, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function DoctorFinder() {
    const [expandedSections, setExpandedSections] = useState({
        gender: true,
        availability: true,
        fee: true,
        experience: true
    });

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiology",
            experience: "15 years",
            rating: 4.8,
            reviews: 156,
            clinic: "City Medical Center",
            location: "Gulberg III, Lahore",
            distance: "2.5 km",
            fee: "PKR 3000",
            avatar: "👩‍⚕️",
            nextAvailable: "Today, 02:00 PM"
        },
        {
            id: 2,
            name: "Dr. Robert Martinez",
            specialty: "Pediatrics",
            experience: "10 years",
            rating: 4.9,
            reviews: 203,
            clinic: "Healthcare Diagnostic Center",
            location: "DHA Phase 5, Karachi",
            distance: "3.8 km",
            fee: "PKR 2500",
            avatar: "👨‍⚕️",
            nextAvailable: "Tomorrow, 10:00 AM"
        },
        {
            id: 3,
            name: "Dr. Emily Chen",
            specialty: "General Medicine",
            experience: "8 years",
            rating: 4.7,
            reviews: 128,
            clinic: "City Medical Center",
            location: "Gulberg III, Lahore",
            distance: "2.5 km",
            fee: "PKR 2000",
            avatar: "👩‍⚕️",
            nextAvailable: "Today, 04:00 PM"
        }
    ];

    const specialtyColors = {
        "Cardiology": "bg-purple-100 text-purple-700",
        "Pediatrics": "bg-pink-100 text-pink-700",
        "General Medicine": "bg-purple-100 text-purple-700"
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-400">
            {/* Header */}
            <div className="p-4 pb-6">
                <div className="flex justify-between items-center mb-6">
                    <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-xs transition">
                        <span>←</span>
                        <span>Change Booking Type</span>
                    </button>
                    <button className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-2 rounded-lg text-xs font-medium">
                        <span>🏥</span>
                        <span>Physical Clinic Visit</span>
                    </button>
                </div>

                <h1 className="text-white text-2xl font-semibold mb-6">Find Doctor & Clinic</h1>

                {/* Search Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-white/70" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="bg-transparent text-white text-sm placeholder-white/60 outline-none w-full"
                        />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
                        <Search className="w-4 h-4 text-white/70" />
                        <input
                            type="text"
                            placeholder="Specialty or Doctor Name"
                            className="bg-transparent text-white text-sm placeholder-white/60 outline-none w-full"
                        />
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-white/70" />
                        <input
                            type="text"
                            placeholder="Date"
                            className="bg-transparent text-white text-sm placeholder-white/60 outline-none w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 min-h-screen rounded-t-3xl p-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-700">3 doctors found in Lahore</p>
                        <button className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-800">
                            <Filter className="w-4 h-4" />
                            <span>Hide Filters</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Filters Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-4 shadow-sm space-y-4 sticky top-4">
                                <h2 className="text-sm font-semibold text-gray-900 mb-3">Filters</h2>

                                {/* Gender Filter */}
                                <div className="border-b border-gray-200 pb-3">
                                    <button
                                        onClick={() => toggleSection('gender')}
                                        className="flex justify-between items-center w-full mb-2"
                                    >
                                        <span className="text-xs font-medium text-gray-700">Gender</span>
                                        {expandedSections.gender ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                    {expandedSections.gender && (
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Male</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Female</span>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Availability Filter */}
                                <div className="border-b border-gray-200 pb-3">
                                    <button
                                        onClick={() => toggleSection('availability')}
                                        className="flex justify-between items-center w-full mb-2"
                                    >
                                        <span className="text-xs font-medium text-gray-700">Availability</span>
                                        {expandedSections.availability ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                    {expandedSections.availability && (
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Available Today</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Available Tomorrow</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Within 3 Days</span>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Fee Range Filter */}
                                <div className="border-b border-gray-200 pb-3">
                                    <button
                                        onClick={() => toggleSection('fee')}
                                        className="flex justify-between items-center w-full mb-2"
                                    >
                                        <span className="text-xs font-medium text-gray-700">Fee Range</span>
                                        {expandedSections.fee ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                    {expandedSections.fee && (
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Under PKR 1500</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>PKR 1500 - 2500</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>PKR 2500 - 4000</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>Above PKR 4000</span>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                {/* Experience Filter */}
                                <div className="pb-3">
                                    <button
                                        onClick={() => toggleSection('experience')}
                                        className="flex justify-between items-center w-full mb-2"
                                    >
                                        <span className="text-xs font-medium text-gray-700">Experience</span>
                                        {expandedSections.experience ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                    </button>
                                    {expandedSections.experience && (
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>0-5 years</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>5-10 years</span>
                                            </label>
                                            <label className="flex items-center gap-2 text-xs text-gray-600">
                                                <input type="checkbox" className="w-3 h-3 rounded" />
                                                <span>10+ years</span>
                                            </label>
                                        </div>
                                    )}
                                </div>

                                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-medium transition">
                                    Apply Filters
                                </button>
                                <button className="w-full text-blue-600 hover:text-blue-700 py-2 text-xs font-medium transition">
                                    Clear All
                                </button>
                            </div>
                        </div>

                        {/* Doctor Cards */}
                        <div className="lg:col-span-3 space-y-4">
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="bg-white rounded-xl p-4 shadow-sm">
                                    <div className="flex gap-4">
                                        {/* Avatar */}
                                        <div className="flex-shrink-0">
                                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                                                {doctor.avatar}
                                            </div>
                                        </div>

                                        {/* Doctor Info */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-base font-semibold text-gray-900">{doctor.name}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`${specialtyColors[doctor.specialty]} px-2 py-0.5 rounded text-xs font-medium`}>
                                                            {doctor.specialty}
                                                        </span>
                                                        <span className="text-xs text-gray-500">{doctor.experience}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-blue-600">{doctor.fee}</div>
                                                    <div className="text-xs text-gray-500">Consultation</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 mb-3">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs font-medium text-gray-700">{doctor.rating}</span>
                                                <span className="text-xs text-gray-500">({doctor.reviews} reviews)</span>
                                            </div>

                                            {/* Clinic Info */}
                                            <div className="bg-blue-50 rounded-lg p-3 mb-3">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex gap-2">
                                                        <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
                                                            <span className="text-sm">🏥</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-xs font-medium text-gray-900">{doctor.clinic}</div>
                                                            <div className="text-xs text-blue-600">{doctor.location}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-600">
                                                        <Navigation className="w-3 h-3" />
                                                        <span>{doctor.distance}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-xs text-green-600">
                                                    <Clock className="w-3 h-3" />
                                                    <span>Next available: {doctor.nextAvailable}</span>
                                                </div>
                                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-medium transition">
                                                    View Clinic & Slots
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}