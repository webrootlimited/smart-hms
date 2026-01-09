import { Clock, Edit2, Calendar, Coffee } from 'lucide-react';

export default function WeeklySchedule() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Main Schedule Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Weekly Schedule</h2>
                                        <p className="text-xs text-gray-500 mt-1">Regular working hours</p>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 border border-blue-500 text-blue-600 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition whitespace-nowrap">
                                    <Edit2 className="w-4 h-4" />
                                    Edit Schedule
                                </button>
                            </div>

                            <div className="space-y-3">
                                {/* Monday */}
                                <div className="bg-green-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-800">Monday</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                        <span className="text-sm text-gray-700 text-center sm:text-left">09:00 → 17:00</span>
                                        <span className="text-xs text-green-700 flex items-center justify-center sm:justify-start gap-1">
                                            <Calendar className="w-4 h-4" />
                                            12 patients
                                        </span>
                                    </div>
                                </div>

                                {/* Tuesday */}
                                <div className="bg-green-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-800">Tuesday</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                        <span className="text-sm text-gray-700 text-center sm:text-left">09:00 → 17:00</span>
                                        <span className="text-xs text-green-700 flex items-center justify-center sm:justify-start gap-1">
                                            <Calendar className="w-4 h-4" />
                                            10 patients
                                        </span>
                                    </div>
                                </div>

                                {/* Wednesday */}
                                <div className="bg-green-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-800">Wednesday</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                        <span className="text-sm text-gray-700 text-center sm:text-left">09:00 → 17:00</span>
                                        <span className="text-xs text-green-700 flex items-center justify-center sm:justify-start gap-1">
                                            <Calendar className="w-4 h-4" />
                                            14 patients
                                        </span>
                                    </div>
                                </div>

                                {/* Thursday */}
                                <div className="bg-green-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-800">Thursday</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                        <span className="text-sm text-gray-700 text-center sm:text-left">09:00 → 17:00</span>
                                        <span className="text-xs text-green-700 flex items-center justify-center sm:justify-start gap-1">
                                            <Calendar className="w-4 h-4" />
                                            11 patients
                                        </span>
                                    </div>
                                </div>

                                {/* Friday */}
                                <div className="bg-green-50 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-800">Friday</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                                        <span className="text-sm text-gray-700 text-center sm:text-left">09:00 → 15:00</span>
                                        <span className="text-xs text-green-700 flex items-center justify-center sm:justify-start gap-1">
                                            <Calendar className="w-4 h-4" />
                                            8 patients
                                        </span>
                                    </div>
                                </div>

                                {/* Saturday */}
                                <div className="bg-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-600">Saturday</span>
                                    </div>
                                    <span className="text-sm text-gray-500">Day Off</span>
                                </div>

                                {/* Sunday */}
                                <div className="bg-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 bg-gray-400 rounded-full flex-shrink-0"></div>
                                        <span className="text-sm font-medium text-gray-600">Sunday</span>
                                    </div>
                                    <span className="text-sm text-gray-500">Day Off</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Cards - Stack on mobile, side-by-side on lg+ */}
                    <div className="space-y-6">
                        {/* Schedule Summary */}
                        <div className="bg-gradient-to-b from-blue-500 to-blue-600 rounded-3xl p-6 text-white">
                            <h3 className="text-lg font-medium mb-6">Schedule Summary</h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-blue-100">Total Hours/Week</p>
                                    <p className="text-xl font-medium mt-2">38 hours</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-100">Working Days</p>
                                    <p className="text-xl font-medium mt-2">5 days</p>
                                </div>
                                <div>
                                    <p className="text-sm text-blue-100">Avg Patients/Day</p>
                                    <p className="text-xl font-medium mt-2">11 patients</p>
                                </div>
                            </div>
                        </div>

                        {/* Break Times */}
                        <div className="bg-white rounded-3xl shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Coffee className="w-5 h-5 text-orange-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Break Times</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-orange-50 rounded-2xl p-4">
                                    <p className="text-xs text-gray-600 mb-1">Lunch Break</p>
                                    <p className="text-sm font-medium text-gray-900">12:00 PM - 1:00 PM</p>
                                </div>

                                <div className="bg-purple-50 rounded-2xl p-4">
                                    <p className="text-xs text-gray-600 mb-1">Buffer Time</p>
                                    <p className="text-sm font-medium text-purple-800">15 min between appointments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}