import React from 'react';
import { ArrowLeft, Star, Clock, Calendar, MapPin, Phone, Mail, Navigation } from 'lucide-react';

export default function ClinicDetail() {
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            specialty: "Cardiology",
            experience: "15 years",
            rating: 4.8,
            reviews: 156,
            avatar: "👩‍⚕️",
            availableDays: ["Monday", "Wednesday", "Friday"],
            timings: "02:00 PM - 06:00 PM",
            fee: "PKR 3000"
        },
        {
            id: 2,
            name: "Dr. Emily Chen",
            specialty: "General Medicine",
            experience: "8 years",
            rating: 4.7,
            reviews: 128,
            avatar: "👩‍⚕️",
            availableDays: ["Tuesday", "Thursday", "Saturday"],
            timings: "10:00 AM - 02:00 PM",
            fee: "PKR 2000"
        }
    ];

    const operatingHours = [
        { day: "Monday", hours: "09:00 - 17:00" },
        { day: "Tuesday", hours: "09:00 - 17:00" },
        { day: "Wednesday", hours: "09:00 - 17:00" },
        { day: "Thursday", hours: "09:00 - 17:00", highlight: true },
        { day: "Friday", hours: "09:00 - 17:00" },
        { day: "Saturday", hours: "09:00 - 13:00" },
        { day: "Sunday", hours: "Closed" }
    ];

    const specialtyColors = {
        "Cardiology": "bg-purple-100 text-purple-700",
        "General Medicine": "bg-purple-100 text-purple-700"
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Search</span>
                    </button>

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4">
                            {/* Clinic Icon */}
                            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>

                            {/* Clinic Info */}
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900 mb-1">City Medical Center</h1>
                                <p className="text-sm text-gray-600 mb-2">Block C, Main Boulevard, Gulberg III, Lahore 54000</p>

                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs font-medium text-gray-700">4.8</span>
                                        <span className="text-xs text-gray-500">(342 reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                                        <span>Open Now</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-xs font-medium transition">
                            <Navigation className="w-3 h-3" />
                            <span>Get Directions</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Doctors */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span>👨‍⚕️</span>
                                <span>Doctors at This Clinic</span>
                            </h2>

                            <div className="space-y-4">
                                {doctors.map((doctor) => (
                                    <div key={doctor.id} className="bg-blue-50 rounded-xl p-4">
                                        <div className="flex gap-4 mb-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                                                    {doctor.avatar}
                                                </div>
                                            </div>

                                            {/* Doctor Info */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
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
                                                        <div className="text-xs text-gray-500">Appointment</div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 mt-2">
                                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-medium text-gray-700">{doctor.rating}</span>
                                                    <span className="text-xs text-gray-500">({doctor.reviews} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Available Days and Timings */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <div className="text-xs text-gray-600 mb-2">Available Days</div>
                                                <div className="flex flex-wrap gap-1">
                                                    {doctor.availableDays.map((day) => (
                                                        <span key={day} className="bg-teal-100 text-teal-700 px-2 py-1 rounded text-xs">
                                                            {day}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-600 mb-2">Timings</div>
                                                <div className="flex items-center gap-1 text-xs text-gray-700">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{doctor.timings}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Select Slot Button */}
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Select Doctor & Choose Slot</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Clinic Information */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <span>📍</span>
                                <span>Clinic Information</span>
                            </h2>

                            <div className="space-y-4">
                                {/* Address */}
                                <div className="flex gap-3">
                                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-medium text-gray-900 mb-1">Address</div>
                                        <div className="text-xs text-gray-600">
                                            Block C, Main Boulevard, Gulberg III, Lahore 54000
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-3">
                                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-medium text-gray-900 mb-1">Phone</div>
                                        <a href="tel:+924212345678" className="text-xs text-blue-600 hover:underline">
                                            +92 42 1234567
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-3">
                                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="text-xs font-medium text-gray-900 mb-1">Email</div>
                                        <a href="mailto:info@citymedical.com" className="text-xs text-blue-600 hover:underline">
                                            info@citymedical.com
                                        </a>
                                    </div>
                                </div>

                                {/* Operating Hours */}
                                <div className="flex gap-3">
                                    <Clock className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <div className="text-xs font-medium text-gray-900 mb-2">Operating Hours</div>
                                        <div className="space-y-1.5">
                                            {operatingHours.map((item) => (
                                                <div
                                                    key={item.day}
                                                    className={`flex justify-between text-xs ${item.highlight ? 'text-blue-600 font-medium' : 'text-gray-600'}`}
                                                >
                                                    <span>{item.day}</span>
                                                    <span>{item.hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Map Location */}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-xs font-medium text-gray-900 mb-1">Clinic Location</div>
                                        <div className="text-xs text-gray-500">
                                            31.5204,<br />74.3587
                                        </div>
                                    </div>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-xs font-medium transition flex items-center justify-center gap-2 mt-3">
                                        <Navigation className="w-4 h-4" />
                                        <span>Open in Google Maps</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}