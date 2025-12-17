import {
    Mail,
    Phone,
    MapPin,
    IdCard,
    Calendar,
    TrendingUp,
    Video,
    Star,
    Pencil,
    Power,
    CheckCircle2,
} from 'lucide-react';

export default function Header() {
    return (
        <div className="bg-gray-50 flex justify-center">
            <div className="w-full">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Top Section with Background Curve */}
                    <div className="relative w-full pb-8">
                        {/* Decorative Circle */}
                        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200 rounded-full opacity-50 -translate-y-1/2 translate-x-1/3"></div>

                        <div className="relative z-10 pt-6 px-4 sm:px-6 lg:px-8">
                            {/* Back Button */}
                            <button className="mb-6 p-2 rounded-lg bg-white shadow hover:shadow-md transition">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-lg">
                                        SJ
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white rounded-full"></div>
                                    </div>
                                </div>

                                {/* Provider Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="w-full sm:w-auto">
                                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
                                                Dr. Sarah Johnson
                                                <span className="flex items-center gap-1 text-yellow-500 text-lg sm:text-base">
                                                    <Star className="w-5 h-5 fill-current" />
                                                    4.9
                                                </span>
                                            </h1>

                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                                    Cardiologist
                                                </span>
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                                                    Cardiology
                                                </span>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Board Certified
                                                </span>
                                            </div>

                                            <div className="mt-3 flex flex-col gap-3 text-sm text-gray-600">
                                                <div className='flex flex-col sm:flex-row sm:gap-10 gap-2'>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        sarah.johnson@hospital.com
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        +1 (555) 123-4567
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:gap-10 gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        Main Hospital, North Branch
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IdCard className="w-4 h-4" />
                                                        Employee ID: EMP-12345
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-0">
                                            <button className="px-4 sm:px-5 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition flex items-center gap-2">
                                                <Pencil className="w-4 h-4" />
                                                Edit Profile
                                            </button>
                                            <button className="px-4 sm:px-5 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium hover:bg-red-200 transition flex items-center gap-2">
                                                <Power className="w-4 h-4" />
                                                Disable
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 -mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-4 text-center">
                                <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                <p className="text-xl font-semibold text-gray-900">156</p>
                                <p className="text-xs text-gray-600 mt-1">Patients Served</p>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-4 text-center">
                                <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-2" />
                                <p className="text-xl font-semibold text-gray-900">94%</p>
                                <p className="text-xs text-gray-600 mt-1">Attendance Rate</p>
                            </div>

                            <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                <Video className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                                <p className="text-xl font-semibold text-gray-900">48</p>
                                <p className="text-xs text-gray-600 mt-1">Virtual Visits</p>
                            </div>

                            <div className="bg-orange-50 rounded-2xl p-4 text-center">
                                <Star className="w-5 h-5 text-orange-600 mx-auto mb-2 fill-current" />
                                <p className="text-xl font-semibold text-gray-900">4.9</p>
                                <p className="text-xs text-gray-600 mt-1">Avg Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
