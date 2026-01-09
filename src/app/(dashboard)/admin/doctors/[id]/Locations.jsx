import { Building2, MapPin, Calendar, Edit2, Plus } from 'lucide-react';

export default function ProviderLocations() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">
                {/* Locations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Main Hospital Card */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                        Main Hospital
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            Primary
                                        </span>
                                    </h3>
                                    <p className="text-xs text-gray-500">Cardiology Wing, Room 301</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                <Edit2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Address */}
                            <div className="bg-gray-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-gray-600">Address</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    123 Medical Center Dr, New York, NY 10001
                                </p>
                            </div>

                            {/* Working Days */}
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-gray-600">Working Days</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700">
                                        Monday
                                    </span>
                                    <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700">
                                        Tuesday
                                    </span>
                                    <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700">
                                        Wednesday
                                    </span>
                                </div>
                            </div>

                            {/* View on Map Button */}
                            <button className="w-full py-3 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                <MapPin className="w-4 h-4" />
                                View on Map
                            </button>
                        </div>
                    </div>

                    {/* North Branch Card */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800">North Branch</h3>
                                    <p className="text-xs text-gray-500">Suite 205</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                                <Edit2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Address */}
                            <div className="bg-gray-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="text-xs text-gray-600">Address</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    456 North Ave, New York, NY 10002
                                </p>
                            </div>

                            {/* Working Days */}
                            <div className="bg-blue-50 rounded-2xl p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-gray-600">Working Days</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700">
                                        Thursday
                                    </span>
                                    <span className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700">
                                        Friday
                                    </span>
                                </div>
                            </div>

                            {/* View on Map Button */}
                            <button className="w-full py-3 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2">
                                <MapPin className="w-4 h-4" />
                                View on Map
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add New Location Card */}
                <div className="max-w-md mx-auto">
                    <button className="w-full bg-white rounded-3xl shadow-sm p-8 flex flex-col items-center justify-center gap-4 hover:shadow-md transition">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                            <Plus className="w-7 h-7 text-blue-600" />
                        </div>
                        <div className="text-center">
                            <p className="text-base font-medium text-gray-800">Add New Location</p>
                            <p className="text-xs text-gray-500 mt-1">Assign provider to another facility</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}