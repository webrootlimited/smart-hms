'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Globe, Building2, Pin, Search, X, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { saveClinicBasicDetails, updateClinicBasicDetails } from '@/actions/clinic.actions';

export default function ClinicRegistrationForm({ onNext, clinicData }) {
    const [formData, setFormData] = useState({
        clinicName: "",
        clinicCode: "",
        clinicType: "",
        status: "active",
        phoneNumber: "",
        email: "",
        emergencyContact: "",
        country: "",
        city: "",
        area: "",
        postalCode: "",
        fullAddress: "",
        latitude: "",
        longitude: ""
    });

    // Pre-fill form when clinicData is provided (edit mode)
    useEffect(() => {
        if (clinicData) {
            setFormData({
                clinicName: clinicData.clinicName || "",
                clinicCode: clinicData.clinicCode || "",
                clinicType: clinicData.clinicType || "",
                status: clinicData.status || "active",
                phoneNumber: clinicData.phoneNumber || "",
                email: clinicData.email || "",
                emergencyContact: clinicData.emergencyContact || "",
                country: clinicData.country || "",
                city: clinicData.city || "",
                area: clinicData.area || "",
                postalCode: clinicData.postalCode || "",
                fullAddress: clinicData.fullAddress || "",
                latitude: clinicData.latitude?.toString() || "",
                longitude: clinicData.longitude?.toString() || ""
            });

            // If coordinates exist, show location as set
            if (clinicData.latitude && clinicData.longitude) {
                setHasLocation(true);
            }
        }
    }, [clinicData]);

    // FIX: Keep hasLocation in sync whenever latitude/longitude changes
    // This ensures map reappears with updated coordinates after search/edit
    useEffect(() => {
        if (formData.latitude && formData.longitude) {
            setHasLocation(true);
        }
    }, [formData.latitude, formData.longitude]);

    const [errors, setErrors] = useState({});
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showEditOptions, setShowEditOptions] = useState(false);
    const [hasLocation, setHasLocation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleStatusChange = (newStatus) => {
        setFormData(prev => ({ ...prev, status: newStatus }));
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        toast.loading("Getting your location...", { id: 'geolocation' });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setFormData(prev => ({
                    ...prev,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
                }));
                setShowEditOptions(false);
                toast.success("Location captured successfully!", { id: 'geolocation' });
            },
            (error) => {
                toast.error(`Unable to get location: ${error.message}`, { id: 'geolocation' });
            }
        );
    };

    const handleSearchLocation = async () => {
        if (!searchQuery.trim()) {
            toast.error("Please enter a location to search");
            return;
        }

        setIsSearching(true);
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=5`
            );
            const data = await res.json();

            if (data.length > 0) {
                setSearchResults(data);
                toast.success(`Found ${data.length} location(s)`);
            } else {
                setSearchResults([]);
                toast.error("No locations found. Try a different search term.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error searching location. Please try again.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectLocation = (location) => {
        setFormData(prev => ({
            ...prev,
            latitude: parseFloat(location.lat).toString(),
            longitude: parseFloat(location.lon).toString(),
        }));
        toast.success("Location selected successfully!");
        setShowLocationModal(false);
        setSearchQuery("");
        setSearchResults([]);
        setShowEditOptions(false); // Hide edit options after selection
    };

    const openLocationModal = () => {
        setShowLocationModal(true);
        setSearchResults([]);
        setSearchQuery("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic Name is required";
        if (!formData.clinicType.trim()) newErrors.clinicType = "Clinic Type is required";

        const phoneDigits = formData.phoneNumber.replace(/\D/g, '');
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone Number is required";
        } else if (phoneDigits.length < 10 || !/^\+?[\d\s\-\(\)]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Invalid phone number format";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[\w\.\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.emergencyContact.trim()) {
            newErrors.emergencyContact = "Emergency Contact is required";
        } else {
            const ecDigits = formData.emergencyContact.replace(/\D/g, '');
            if (ecDigits.length < 10 || !/^\+?[\d\s\-\(\)]+$/.test(formData.emergencyContact)) {
                newErrors.emergencyContact = "Invalid emergency contact format";
            }
        }

        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.area.trim()) newErrors.area = "Area is required";

        if (!formData.postalCode.trim()) {
            newErrors.postalCode = "Postal Code is required";
        } else if (!/^\d+$/.test(formData.postalCode.trim())) {
            newErrors.postalCode = "Postal Code must be numeric";
        }

        if (!formData.fullAddress.trim()) newErrors.fullAddress = "Full Address is required";

        if (!formData.latitude) {
            newErrors.latitude = "Latitude is required";
        } else {
            const lat = parseFloat(formData.latitude);
            if (isNaN(lat) || lat < -90 || lat > 90) {
                newErrors.latitude = "Invalid latitude (must be -90 to 90)";
            }
        }

        if (!formData.longitude) {
            newErrors.longitude = "Longitude is required";
        } else {
            const lon = parseFloat(formData.longitude);
            if (isNaN(lon) || lon < -180 || lon > 180) {
                newErrors.longitude = "Invalid longitude (must be -180 to 180)";
            }
        }

        if (!formData.country.trim()) newErrors.country = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            setIsSubmitting(true);

            try {
                let res;
                if (clinicData?._id) {
                    // Editing existing clinic
                    res = await updateClinicBasicDetails(clinicData._id, formData);
                    if (res.success) {
                        toast.success("Clinic updated successfully!");
                        onNext(clinicData._id);
                    } else {
                        toast.error(res.message || "Failed to update clinic");
                    }
                } else {
                    // Creating new clinic
                    res = await saveClinicBasicDetails(formData);
                    if (res.success) {
                        toast.success("Clinic saved successfully!");
                        onNext(res.clinic._id);
                    } else {
                        toast.error(res.message || "Failed to save clinic");
                    }
                }
            } catch (error) {
                toast.error(error.message || "Something went wrong");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            toast.error("Please fix the errors in the form");
        }
    };

    return (
        <>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 rounded-lg p-2">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">
                                    {clinicData ? "Edit Clinic Information" : "Basic Clinic Information"}
                                </h2>
                                <p className="text-xs text-gray-600">Enter clinic details and location</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {/* Clinic Information */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Clinic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Clinic Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="clinicName"
                                        value={formData.clinicName}
                                        onChange={handleChange}
                                        placeholder="e.g., City Medical Center"
                                        className={`w-full px-3 py-2 text-xs border ${errors.clinicName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.clinicName && <p className="text-xs text-red-600 mt-1">{errors.clinicName}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Clinic Code (Auto-generated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.clinicCode}
                                        readOnly
                                        placeholder="Auto-generated on server"
                                        className="w-full px-3 py-2 text-xs bg-gray-100 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Clinic Type *
                                    </label>
                                    <input
                                        type="text"
                                        name="clinicType"
                                        value={formData.clinicType}
                                        onChange={handleChange}
                                        placeholder="e.g., General Practice, Dental, Specialist"
                                        className={`w-full px-3 py-2 text-xs border ${errors.clinicType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.clinicType && <p className="text-xs text-red-600 mt-1">{errors.clinicType}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="inline-flex rounded-md shadow-sm bg-gray-100" role="group">
                                            <button
                                                type="button"
                                                onClick={() => handleStatusChange('active')}
                                                className={`px-4 py-1.5 text-xs font-medium rounded-l-md transition-colors ${formData.status === 'active'
                                                    ? 'bg-green-600 text-white'
                                                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                                            >
                                                Active
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleStatusChange('inactive')}
                                                className={`px-4 py-1.5 text-xs font-medium rounded-r-md transition-colors border-l border-gray-300 ${formData.status === 'inactive'
                                                    ? 'bg-gray-700 text-white'
                                                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                                    } focus:outline-none focus:ring-2 focus:ring-gray-500`}
                                            >
                                                Inactive
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                Contact Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="+92 300 1234567"
                                            className={`w-full pl-10 pr-3 py-2 text-xs border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        />
                                    </div>
                                    {errors.phoneNumber && <p className="text-xs text-red-600 mt-1">{errors.phoneNumber}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="clinic@example.com"
                                            className={`w-full pl-10 pr-3 py-2 text-xs border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Emergency Contact *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            placeholder="+92 300 1234567"
                                            className={`w-full pl-10 pr-3 py-2 text-xs border ${errors.emergencyContact ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        />
                                    </div>
                                    {errors.emergencyContact && <p className="text-xs text-red-600 mt-1">{errors.emergencyContact}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Address Details */}
                        <div className="mb-8">
                            <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-600" />
                                Address Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Country *</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="e.g., Pakistan"
                                        className={`w-full px-3 py-2 text-xs border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="e.g., Islamabad, Karachi"
                                        className={`w-full px-3 py-2 text-xs border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Area *</label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        placeholder="e.g., Gulberg III, DHA Phase 5"
                                        className={`w-full px-3 py-2 text-xs border ${errors.area ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.area && <p className="text-xs text-red-600 mt-1">{errors.area}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Postal Code *</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="e.g., 44000"
                                        className={`w-full px-3 py-2 text-xs border ${errors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    />
                                    {errors.postalCode && <p className="text-xs text-red-600 mt-1">{errors.postalCode}</p>}
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                    Full Address *
                                </label>
                                <textarea
                                    name="fullAddress"
                                    value={formData.fullAddress}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Enter complete address with street, building number, landmarks..."
                                    className={`w-full px-3 py-2 text-xs border ${errors.fullAddress ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                                {errors.fullAddress && <p className="text-xs text-red-600 mt-1">{errors.fullAddress}</p>}
                            </div>
                        </div>

                        {/* Map Location */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    Map Location (Critical) *
                                </h3>
                                {hasLocation && !showEditOptions && (
                                    <button
                                        type="button"
                                        onClick={() => setShowEditOptions(true)}
                                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center gap-1 hover:bg-gray-200 transition cursor-pointer"
                                    >
                                        Edit Location
                                    </button>
                                )}
                            </div>

                            {hasLocation && !showEditOptions ? (
                                <div className="space-y-4">
                                    <div className="bg-white rounded-lg border-2 border-green-300 h-64 overflow-hidden relative">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            scrolling="no"
                                            marginHeight="0"
                                            marginWidth="0"
                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(formData.longitude) - 0.01},${parseFloat(formData.latitude) - 0.01},${parseFloat(formData.longitude) + 0.01},${parseFloat(formData.latitude) + 0.01}&layer=mapnik&marker=${formData.latitude},${formData.longitude}`}
                                        />
                                        <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-xs font-medium text-gray-700">Location Set</span>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-green-900 mb-2">Location Coordinates</p>
                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                    <div>
                                                        <span className="text-gray-600">Latitude:</span>
                                                        <span className="ml-2 font-medium text-gray-900">{parseFloat(formData.latitude).toFixed(6)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Longitude:</span>
                                                        <span className="ml-2 font-medium text-gray-900">{parseFloat(formData.longitude).toFixed(6)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {showEditOptions ? (
                                        <div className="space-y-4">
                                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                                                <p className="text-sm font-medium text-gray-900 mb-4 text-center">Choose how to set location</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={handleUseCurrentLocation}
                                                        className="bg-white border-2 border-blue-300 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-400 transition group cursor-pointer"
                                                    >
                                                        <Pin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                                        <p className="text-sm font-medium text-gray-900 mb-1">Use Current Location</p>
                                                        <p className="text-xs text-gray-600">Get your device's GPS location</p>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={openLocationModal}
                                                        className="bg-white border-2 border-blue-300 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-400 transition group cursor-pointer"
                                                    >
                                                        <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                                        <p className="text-sm font-medium text-gray-900 mb-1">Search Location</p>
                                                        <p className="text-xs text-gray-600">Find and select from map</p>
                                                    </button>
                                                </div>
                                                {hasLocation && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowEditOptions(false)}
                                                        className="mt-4 w-full text-xs text-gray-600 hover:text-gray-800 transition cursor-pointer"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-300 h-64 flex flex-col items-center justify-center relative">
                                            <div className="text-blue-600 mb-4">
                                                <MapPin className="w-12 h-12" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-700">No Location Set</p>
                                            <p className="text-xs text-gray-500 mt-1 mb-4">Choose an option below to set location</p>
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={handleUseCurrentLocation}
                                                    className="text-xs bg-white text-blue-600 px-4 py-2 rounded-md shadow flex items-center gap-1 hover:bg-gray-50 transition border border-blue-200 cursor-pointer"
                                                >
                                                    <Pin className="w-3 h-3" />
                                                    Current Location
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={openLocationModal}
                                                    className="text-xs bg-blue-600 text-white px-4 py-2 rounded-md shadow flex items-center gap-1 hover:bg-blue-700 transition cursor-pointer"
                                                >
                                                    <Search className="w-3 h-3" />
                                                    Search Location
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Latitude (Auto-filled) *
                                    </label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleChange}
                                        placeholder="e.g., 33.6844"
                                        className={`w-full px-3 py-2 text-xs border ${errors.latitude ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        readOnly
                                    />
                                    {errors.latitude && <p className="text-xs text-red-600 mt-1">{errors.latitude}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                        Longitude (Auto-filled) *
                                    </label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleChange}
                                        placeholder="e.g., 73.0479"
                                        className={`w-full px-3 py-2 text-xs border ${errors.longitude ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        readOnly
                                    />
                                    {errors.longitude && <p className="text-xs text-red-600 mt-1">{errors.longitude}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3">
                            {clinicData && (
                                <button
                                    type="button"
                                    onClick={() => onNext(clinicData._id)}
                                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-300 transition cursor-pointer"
                                >
                                    Next
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Saving...' : (clinicData ? 'Update & Continue' : 'Save & Continue')}
                                <span className="text-lg">→</span>
                            </button>
                        </div>
                    </div>

                    {/* Location Search Modal */}
                    {showLocationModal && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col animate-slideUp">
                                {/* Modal Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <Search className="w-5 h-5 text-blue-600" />
                                        </div>
                                        Search Location
                                    </h3>
                                    <button
                                        onClick={() => setShowLocationModal(false)}
                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Search Input */}
                                <div className="p-6 border-b border-gray-100 bg-gray-50">
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSearchLocation()}
                                            placeholder="Enter city, address, or landmark..."
                                            className="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                        />
                                        <button
                                            onClick={handleSearchLocation}
                                            disabled={isSearching}
                                            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                                        >
                                            {isSearching ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Searching...
                                                </>
                                            ) : (
                                                <>
                                                    <Search className="w-4 h-4" />
                                                    Search
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 flex items-center gap-1">
                                        <span className="text-blue-600">Tip</span>
                                        Try searching: "Blue Area Islamabad", "F-7 Islamabad", "Karachi Clifton"
                                    </p>
                                </div>

                                {/* Search Results */}
                                <div className="flex-1 overflow-y-auto p-6">
                                    {searchResults.length === 0 ? (
                                        <div className="text-center py-16">
                                            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <MapPin className="w-10 h-10 text-blue-400" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">
                                                {isSearching ? "Searching..." : "Ready to search"}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Enter a location and click search to find results
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {searchResults.map((result, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSelectLocation(result)}
                                                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-400 transition-all group shadow-sm hover:shadow-md cursor-pointer"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="bg-gray-100 group-hover:bg-blue-100 p-2 rounded-lg transition">
                                                            <MapPin className="w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 mb-1">
                                                                {result.display_name}
                                                            </p>
                                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                                <span className="bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded">
                                                                    Lat: {parseFloat(result.lat).toFixed(6)}
                                                                </span>
                                                                <span className="bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded">
                                                                    Lon: {parseFloat(result.lon).toFixed(6)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}