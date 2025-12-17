import { Clock, ShieldCheck, Calendar, ToggleRight, ToggleLeft, AlertTriangle } from 'lucide-react';

export default function AppointmentSettings() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Left: Appointment Settings */}
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-base font-semibold text-gray-800">Appointment Settings</h2>
                    </div>

                    <div className="space-y-5">
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-xs text-gray-600">Appointment Duration</span>
                            <span className="text-sm font-medium text-gray-900">30 minutes</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-xs text-gray-600">Buffer Between Appointments</span>
                            <span className="text-sm font-medium text-gray-900">15 minutes</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-xs text-gray-600">Max Daily Appointments</span>
                            <span className="text-sm font-medium text-gray-900">16 appointments</span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="text-xs text-gray-600">Advance Booking Window</span>
                            <span className="text-sm font-medium text-gray-900">30 days</span>
                        </div>

                        <div className="flex justify-between items-center py-3">
                            <span className="text-xs text-gray-600">Same-Day Booking</span>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                Enabled
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right: Policies */}
                <div className="bg-white rounded-3xl shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-base font-semibold text-gray-800">Policies</h2>
                    </div>

                    <div className="space-y-5">
                        {/* Online Booking */}
                        <div className="bg-green-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">Online Booking</span>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                    ON
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">Patients can book appointments online</p>
                        </div>

                        {/* Auto-Confirmation */}
                        <div className="bg-green-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">Auto-Confirmation</span>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                    ON
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">Appointments confirmed automatically</p>
                        </div>

                        {/* Cancellation Window */}
                        <div className="bg-yellow-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">Cancellation Window</span>
                                <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">
                                    24 hours
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">Minimum notice for cancellations</p>
                        </div>

                        {/* No-Show Fee */}
                        <div className="bg-red-50 rounded-2xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-900">No-Show Fee</span>
                                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
                                    $50
                                </div>
                            </div>
                            <p className="text-xs text-gray-600">Charged for missed appointments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}