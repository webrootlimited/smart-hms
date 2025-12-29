'use client';

import React, { useState } from 'react';
import {
    CarFront,
    Accessibility,
    Pill,
    FlaskConical,
    Users,
    Siren,
    Stethoscope,
    Baby,
    HeartPulse,
    Activity,
    BrainCircuit,
    Info,
    ArrowLeft,
    ArrowRight
} from 'lucide-react';

export default function FacilitiesAndServices() {
    const [selectedFacilities, setSelectedFacilities] = useState(['Waiting Area']);
    const [selectedServices, setSelectedServices] = useState(['Pediatrics']);

    const facilities = [
        { name: 'Parking', icon: CarFront },
        { name: 'Wheelchair Access', icon: Accessibility },
        { name: 'Pharmacy', icon: Pill },
        { name: 'Laboratory', icon: FlaskConical },
        { name: 'Waiting Area', icon: Users },
        { name: 'Emergency Services', icon: Siren },
    ];

    const services = [
        { name: 'General Consultation', icon: Stethoscope },
        { name: 'Pediatrics', icon: Baby },
        { name: 'Cardiology', icon: HeartPulse },
        { name: 'Diagnostics', icon: Activity },
        { name: 'Surgery', icon: Activity },
        { name: 'Physiotherapy', icon: BrainCircuit },
    ];

    const toggleSelection = (item, category) => {
        if (category === 'facilities') {
            setSelectedFacilities(prev =>
                prev.includes(item)
                    ? prev.filter(i => i !== item)
                    : [...prev, item]
            );
        } else {
            setSelectedServices(prev =>
                prev.includes(item)
                    ? prev.filter(i => i !== item)
                    : [...prev, item]
            );
        }
    };

    const getSelectedCount = (category) => {
        return category === 'facilities' ? selectedFacilities.length : selectedServices.length;
    };

    return (
        <div className="min-h-screen bg-gray-50 ">
            <div className="space-y-8">

                {/* Header Card */}
                <div className="bg-purple-50 rounded-2xl border border-purple-200 p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="bg-purple-600 rounded-xl p-3 flex-shrink-0">
                            <Stethoscope className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Facilities & Services</h1>
                            <p className="text-sm text-gray-600 mt-1">Transparent patient information</p>
                        </div>
                    </div>
                </div>

                {/* Facilities Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-red-100 rounded-lg p-2 flex-shrink-0">
                            <Info className="w-5 h-5 text-red-600" />
                        </div>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">Facilities Available</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {facilities.map((facility) => {
                            const Icon = facility.icon;
                            const isSelected = selectedFacilities.includes(facility.name);

                            return (
                                <button
                                    key={facility.name}
                                    onClick={() => toggleSelection(facility.name, 'facilities')}
                                    className={`flex flex-col sm:flex-row items-center gap-4 px-5 py-5 sm:px-6 sm:py-4 rounded-2xl border transition-all text-left ${isSelected
                                        ? 'bg-blue-50 border-blue-300 shadow-md'
                                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className={`p-4 rounded-xl flex-shrink-0 ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <Icon className={`w-7 h-7 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base font-medium text-gray-900">{facility.name}</p>
                                        {isSelected && (
                                            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Selected
                                            </p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Services Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-orange-100 rounded-lg p-2 flex-shrink-0">
                            <Stethoscope className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">Medical Services Offered</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const isSelected = selectedServices.includes(service.name);

                            return (
                                <button
                                    key={service.name}
                                    onClick={() => toggleSelection(service.name, 'services')}
                                    className={`flex flex-col sm:flex-row items-center gap-4 px-5 py-5 sm:px-6 sm:py-4 rounded-2xl border transition-all text-left ${isSelected
                                        ? 'bg-green-50 border-green-300 shadow-md'
                                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className={`p-4 rounded-xl flex-shrink-0 ${isSelected ? 'bg-green-100' : 'bg-gray-100'}`}>
                                        <Icon className={`w-7 h-7 ${isSelected ? 'text-green-600' : 'text-gray-500'}`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base font-medium text-gray-900">{service.name}</p>
                                        {isSelected && (
                                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Selected
                                            </p>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selection Summary */}
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-blue-900">Selection Summary</p>
                                <p className="text-sm text-blue-700">
                                    {getSelectedCount('facilities')} facilities • {getSelectedCount('services')} services selected
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <span className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
                                {getSelectedCount('facilities')} Facilities
                            </span>
                            <span className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                {getSelectedCount('services')} Services
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-6">
                    <button className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <button className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition shadow-md">
                        Save & Continue
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}