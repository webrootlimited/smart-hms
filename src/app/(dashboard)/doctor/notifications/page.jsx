// app/notifications/page.tsx
import { Bell, Calendar, Video, CheckSquare, MessageSquare, Settings, Clock } from 'lucide-react';


export default function NotificationsPage() {
    return (
        <div className={`min-h-screen bg-gray-50`}>
            <div className="mx-auto max-w-7xl px-4 ">
                <div className="space-y-5">
                    {/* Header - EXACTLY as you had */}
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <div className="p-4 sm:p-6">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative bg-[#0284C7] p-2 rounded-2xl">
                                        <Bell className="h-6 w-6 text-white" />
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                                            3
                                        </span>
                                    </div>
                                    <h1 className="text-xl font-semibold text-gray-900">Notifications</h1>
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button className="text-sm font-medium bg-white border border-gray-300 px-4 py-2 rounded-xl text-blue-600 hover:text-blue-800">
                                        Filters
                                    </button>
                                    <button className="text-sm font-medium bg-[#0284C7] text-white px-4 py-2 rounded-xl hover:bg-blue-600">
                                        Mark All as Read
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs - EXACTLY as you had */}
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        <div className="p-4 sm:p-6 overflow-x-auto">
                            <div className="flex gap-6 whitespace-nowrap">
                                <button className="py-1 text-white shadow-[0px_4px_6px_-4px_#0284C74D,_0px_10px_15px_-3px_#0284C74D]
 rounded px-10 bg-[#0284C7] font-medium">
                                    All
                                </button>
                                <button className="py-1 px-2 text-gray-500 hover:text-gray-700">
                                    Appointments
                                </button>
                                <button className="py-1 px-2 text-gray-500 hover:text-gray-700">
                                    Tasks
                                </button>
                                <button className="py-1 px-2 text-gray-500 hover:text-gray-700">
                                    Messages
                                </button>
                                <button className="py-1 px-2 text-gray-500 hover:text-gray-700">
                                    System
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications - NOW SEPARATE CARDS with gap and borders */}
                    <div className="space-y-5">
                        {/* New Appointment */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6 bg-blue-50/50">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-blue-100 rounded-lg flex-shrink-0">
                                        <Calendar className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            New Appointment Booked
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-700">
                                            Michael Chen has booked an appointment for Dec 18, 2024 at 10:00 AM
                                        </p>
                                        <div className="mt-2 text-xs text-gray-500">5 minutes ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cancelled Appointment */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-red-100 rounded-lg flex-shrink-0">
                                        <Calendar className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                Appointment Cancelled
                                            </h3>
                                            <span className="text-xs text-gray-500">1 hour ago</span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-700">
                                            Sarah Anderson cancelled their appointment scheduled for Dec 16, 2024
                                        </p>
                                        <div className="mt-2">
                                            <button className="text-xs text-blue-600 hover:underline">Mark as read</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Telehealth */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-purple-100 rounded-lg flex-shrink-0">
                                        <Video className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <h3 className="text-base font-semibold text-gray-900">
                                                Telehealth Session Starting Soon
                                            </h3>
                                            <span className="text-xs text-gray-500">2 hours ago</span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-700">
                                            Your video call with Emily Rodriguez starts in 15 minutes
                                        </p>
                                        <div className="mt-2">
                                            <button className="text-xs text-blue-600 hover:underline">Mark as read</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Task Assigned */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-green-100 rounded-lg flex-shrink-0">
                                        <CheckSquare className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900">Task Assigned</h3>
                                        <p className="mt-1 text-sm text-gray-700">
                                            You have been assigned to review lab results for Patient #PT-2845
                                        </p>
                                        <div className="mt-2 text-xs text-gray-500">3 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* New Message */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-pink-100 rounded-lg flex-shrink-0">
                                        <MessageSquare className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900">New Patient Message</h3>
                                        <p className="mt-1 text-sm text-gray-700">
                                            Robert Martinez sent you a message regarding prescription refill
                                        </p>
                                        <div className="mt-2 text-xs text-gray-500">5 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* System Maintenance */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-orange-100 rounded-lg flex-shrink-0">
                                        <Settings className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900">
                                            System Maintenance Scheduled
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-700">
                                            Platform maintenance scheduled for Dec 20, 2024 from 2:00 AM - 4:00 AM
                                        </p>
                                        <div className="mt-2 text-xs text-gray-500">1 day ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Reminder */}
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start gap-4">
                                    <div className="mt-0.5 p-2 bg-amber-100 rounded-lg flex-shrink-0">
                                        <Clock className="h-5 w-5 text-amber-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base font-semibold text-gray-900">Appointment Reminder</h3>
                                        <p className="mt-1 text-sm text-gray-700">
                                            Reminder: You have 3 appointments scheduled for tomorrow
                                        </p>
                                        <div className="mt-2 text-xs text-gray-500">1 day ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}