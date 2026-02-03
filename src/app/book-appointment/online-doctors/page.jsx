"use client";

import { ArrowLeft, Search, Video, Globe, Calendar, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getOnlineDoctors } from '@/actions/doctor.actions';
import Loader from '@/components/layout/Loader';
import Link from 'next/link';

export default function OnlineDoctors() {


    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDoctors() {
            setLoading(true);
            const res = await getOnlineDoctors();
            if (res.success) {
                setDoctors(res.doctors);
            } else {
                console.error(res.message);
                setDoctors([]);
            }
            setLoading(false);
        }
        fetchDoctors();
    }, []);


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-700 text-white px-4 py-5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition text-sm">
                            <ArrowLeft className="w-4 h-4" />
                            Change Booking Type
                        </button>
                        <span className="bg-white/30 px-4 py-1.5 rounded-full text-xs flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-green-400 rounded-full"></span>
                            Online Consultation
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold mb-6">
                        Find Doctor for Online Consultation
                    </h1>

                    {/* Search Bar */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300" />
                            <input
                                type="text"
                                placeholder="Specialty or Doctor Name"
                                className="w-full pl-10 pr-5 py-3 bg-white/20 backdrop-blur rounded-2xl placeholder-purple-200 text-white text-sm focus:outline-none focus:ring-3 focus:ring-white/30"
                            />
                        </div>
                        <button className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-2xl transition">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-5">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <p className="text-gray-700 mb-6 text-sm">
                            {doctors.length} doctor{doctors.length !== 1 ? 's' : ''} available for online consultation
                        </p>

                        {/* Benefits Box */}
                        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 mb-8">
                            <h3 className="font-semibold text-purple-900 mb-2.5 flex items-center gap-2 text-sm">
                                <Video className="w-4 h-4" />
                                Online Consultation Benefits
                            </h3>
                            <ul className="space-y-1.5 text-purple-800 text-xs">
                                <li>• No travel required - consult from anywhere</li>
                                <li>• Secure video call with doctor</li>
                                <li>• Instant confirmation after payment</li>
                                <li>• Digital prescription provided</li>
                            </ul>
                        </div>

                        {/* Doctors List */}
                        <div className="space-y-5">
                            {doctors.map((doctor) => (
                                <div
                                    key={doctor._id}
                                    className="bg-white rounded-3xl shadow-md p-5 hover:shadow-lg transition"
                                >
                                    <div className="flex flex-col sm:flex-row items-start gap-5">
                                        {/* Avatar */}
                                        <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0 border-2 border-dashed border-gray-300" />

                                        {/* Doctor Info */}
                                        <div className="flex-1 w-full">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1.5 gap-3">
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {doctor.name || doctor.fullName}
                                                    </h3>
                                                    <p className="text-purple-700 font-medium text-sm">
                                                        {doctor.doctorProfile?.specialities?.join(', ')} •{" "}
                                                        {doctor.doctorProfile?.yearsOfExperience ? `${doctor.doctorProfile?.yearsOfExperience} years` : ""}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-gray-500">USD</p>
                                                    <p className="text-xl font-bold text-purple-700">
                                                        $ {doctor.fee || doctor.doctorProfile?.consultationFee}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1.5 mb-3">
                                                <span className="text-yellow-500 text-sm">★</span>
                                                <span className="font-semibold text-sm">
                                                    {doctor.rating || doctor.doctorProfile?.rating || 0}
                                                </span>
                                                <span className="text-gray-500 text-xs">
                                                    ({doctor.reviews || 0} reviews)
                                                </span>
                                            </div>

                                            {/* Features */}
                                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                                <span className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs">
                                                    <Video className="w-3.5 h-3.5" />
                                                    Video Call
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs">
                                                    <Globe className="w-3.5 h-3.5" />
                                                    {doctor.languages || doctor.doctorProfile?.languages?.join(', ') || "English"}
                                                </span>
                                                <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs ml-auto">
                                                    <Check className="w-3.5 h-3.5" />
                                                    Online Available
                                                </span>
                                            </div>

                                            {/* Next Available & Book */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                                <span className="flex items-center gap-1.5 text-gray-700 text-sm">
                                                    <Calendar className="w-4 h-4 text-green-600" />
                                                    Next available: {doctor.nextAvailable || "Not set"}
                                                </span>
                                                <Link
                                                    href={`/book-appointment/online-doctors/${doctor._id}`}
                                                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl text-sm transition w-full sm:w-auto text-center cursor-pointer"
                                                >
                                                    Book Online
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
