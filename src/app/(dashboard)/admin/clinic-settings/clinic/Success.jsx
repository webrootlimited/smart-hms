'use client';

import React from 'react';
import { Check, MapPin, Phone, Mail, Clock, Users, Stethoscope, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ClinicAddedSuccess({ clinicData }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full">

                {/* Success Header */}
                <div className="text-center mb-12 mt-10">
                    <div className="relative inline-block">
                        <div className="w-32 h-32 bg-teal-500 rounded-full flex items-center justify-center animate-pulse">
                            <Check className="w-20 h-20 text-white" />
                        </div>
                        <div className="absolute inset-0 w-32 h-32 bg-teal-400 rounded-full animate-ping opacity-75"></div>
                    </div>

                    <h1 className="text-xl font-bold mt-8">
                        <span className="">✔</span> Clinic Added Successfully!
                    </h1>
                    <p className="text-md text-gray-500 mt-4">
                        is now live and available for appointments
                    </p>
                    <p className="text-md text-gray-400 mt-2">
                        Clinic Code: <span className="font-mono font-semibold text-teal-400">{clinicData.clinicCode}</span>
                    </p>
                </div>

                {/* Clinic Summary Card */}
                <div className="bg-white rounded-3xl shadow-md p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-orange-100 rounded-lg p-2">
                            <Stethoscope className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Clinic Summary</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Basic Information */}
                        <div className="bg-purple-50 rounded-2xl p-6">
                            <h3 className="text-sm font-medium text-purple-700 mb-4">Basic Information</h3>
                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="text-gray-600">Clinic Name</dt>
                                    <dd className="font-medium text-gray-900">{clinicData.clinicName}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600">Type</dt>
                                    <dd className="font-medium text-gray-900">{clinicData.clinicType}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600">Status</dt>
                                    <dd>
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {clinicData.status}
                                        </span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Location */}
                        <div className="bg-pink-50 rounded-2xl p-6">
                            <h3 className="text-sm font-medium text-pink-700 mb-4">Location</h3>
                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="text-gray-600">City</dt>
                                    <dd className="font-medium text-gray-900">{clinicData.city}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600">Area</dt>
                                    <dd className="font-medium text-gray-900">{clinicData.area}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600 flex items-center gap-1">
                                        <MapPin className="w-4 h-4" /> Coordinates
                                    </dt>
                                    <dd className="font-medium text-gray-900">{clinicData.latitude}, {clinicData.longitude}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-teal-50 rounded-2xl p-6">
                            <h3 className="text-sm font-medium text-teal-700 mb-4">Contact Details</h3>
                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="text-gray-600 flex items-center gap-1">
                                        <Phone className="w-4 h-4" /> Phone
                                    </dt>
                                    <dd className="font-medium text-gray-900">{clinicData.phoneNumber}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600 flex items-center gap-1">
                                        <Mail className="w-4 h-4" /> Email
                                    </dt>
                                    <dd className="font-medium text-gray-900">{clinicData.email}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* Configuration */}
                        <div className="bg-blue-50 rounded-2xl p-6">
                            <h3 className="text-sm font-medium text-blue-700 mb-4">Configuration</h3>
                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="text-gray-600">Facilities</dt>
                                    <dd className="font-medium text-gray-900">{clinicData.facilities?.length}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600">Services</dt>
                                    <dd className="font-medium text-gray-900">{clinicData.services?.length}</dd>
                                </div>
                                <div>
                                    <dt className="text-gray-600 flex items-center gap-1">
                                        <Users className="w-4 h-4" /> Doctors
                                    </dt>
                                    <dd className="font-medium text-gray-900">{clinicData.assignedDoctors?.length} assigned</dd>
                                </div>
                            </dl>
                        </div>

                    </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-white rounded-3xl shadow-md p-8 mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="w-6 h-6 text-red-600" />
                        <h2 className="text-xl font-semibold text-gray-900">Operating Hours</h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                            <span
                                key={day}
                                className="px-5 py-3 text-sm font-medium text-gray-700 bg-teal-100 rounded-full"
                            >
                                {day}: {clinicData.operatingHours[day].from} - {clinicData.operatingHours[day].to}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/admin/clinic-settings" className="inline-flex cursor-pointer items-center justify-center gap-3 px-8 py-2 text-base font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-blue-600 hover:text-white transition">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Clinic List
                    </Link>

                    <Link href={`/admin/clinic-settings/${clinicData._id}`} className="inline-flex items-center justify-center gap-3 px-10 py-2 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition shadow-lg">
                        <Stethoscope className="w-6 h-6" />
                        View Clinic
                    </Link>
                </div>

            </div>
        </div>
    );
}