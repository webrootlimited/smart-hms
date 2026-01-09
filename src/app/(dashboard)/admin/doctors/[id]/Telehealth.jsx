import { Video, CheckCircle, Star, Phone, Edit2 } from 'lucide-react';

export default function TelehealthStatus() {
    return (
        <div className="bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

                {/* Main Telehealth Card */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Video className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-gray-800">
                                    Telehealth Status
                                </h2>
                                <p className="text-xs text-gray-500">
                                    Virtual appointment settings
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto sm:mx-0 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            Enabled
                        </div>
                    </div>

                    {/* Virtual Appointments Box */}
                    <div className="bg-purple-50 rounded-2xl p-5 mb-6">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 text-center lg:text-left">

                            {/* Icon */}
                            <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center mx-auto lg:mx-0">
                                <Video className="w-6 h-6 text-purple-700" />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                    Virtual Appointments Enabled
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Dr. Johnson can conduct secure video consultations with patients through the integrated telehealth platform.
                                </p>

                                {/* Features */}
                                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mt-3">
                                    {['HD Video', 'Screen Share', 'Recording'].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center justify-center lg:justify-start gap-1 text-xs text-purple-700"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            ['Platform', 'Zoom Healthcare'],
                            ['Max Daily Virtual Visits', '10 appointments'],
                            ['Avg Session Duration', '25 minutes'],
                            ['Total Virtual Visits', '48 completed'],
                        ].map(([label, value]) => (
                            <div key={label} className="bg-blue-50 rounded-2xl p-4 text-center sm:text-left">
                                <p className="text-xs text-gray-600 mb-1">{label}</p>
                                <p className="text-sm font-medium text-gray-900">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">

                    {/* Virtual Stats */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 text-white text-center sm:text-left">
                        <h3 className="text-base font-semibold mb-6">Virtual Stats</h3>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs text-blue-100">This Month</p>
                                <p className="text-xl font-medium">48 visits</p>
                            </div>

                            <div>
                                <p className="text-xs text-blue-100">Patient Satisfaction</p>
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <p className="text-xl font-medium">4.8</p>
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-blue-100">No-Show Rate</p>
                                <p className="text-xl font-medium">2.1%</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <h3 className="text-base font-semibold text-gray-800 mb-5 text-center sm:text-left">
                            Quick Actions
                        </h3>

                        <div className="space-y-3">
                            <button className="w-full py-3 border border-blue-500 text-blue-600 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-blue-50 transition">
                                <Phone className="w-5 h-5" />
                                Start Test Call
                            </button>

                            <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                                <Edit2 className="w-5 h-5" />
                                Edit Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
