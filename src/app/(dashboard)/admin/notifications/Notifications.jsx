'use client';

import React from 'react';
import { Mail, MessageSquare, Bell, Calendar, Clock, XCircle, UserPlus, FileText, Pill, Video, DollarSign, AlertCircle, Edit2, Trash2, Eye, Send, TrendingUp } from 'lucide-react';

export default function NotificationTemplatesList() {
    const templates = [
        {
            title: "Appointment Confirmation",
            channel: "EMAIL",
            type: "Appointments",
            subject: "Your appointment is confirmed",
            preview: "Dear {{patient_name}}, Your appointment with Dr. {{doctor_name}} is confirmed.",
            trigger: "Appointment Booked",
            stats: { sent: "1,243", openRate: "94", lastModified: "2 hours ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "blue",
            icon: Calendar,
        },
        {
            title: "Appointment Reminder",
            channel: "SMS",
            type: "Appointments",
            subject: "Reminder: Appointment Tomorrow",
            preview: "Hi {{patient_name}}! Reminder: Your appointment is tomorrow at {{time}} with Dr. {{doctor_name}}.",
            trigger: "24h Before Appointment",
            stats: { sent: "2,156", openRate: "98", lastModified: "5 hours ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "green",
            icon: Clock,
        },
        {
            title: "Appointment Cancelled",
            channel: "EMAIL",
            type: "Appointments",
            subject: "Appointment Cancellation Notice",
            preview: "Your appointment scheduled for {{date}} has been cancelled. Please contact us to reschedule.",
            trigger: "Appointment Cancelled",
            stats: { sent: "234", openRate: "87", lastModified: "1 day ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "red",
            icon: XCircle,
        },
        {
            title: "New Patient",
            channel: "EMAIL",
            type: "Patient",
            subject: "Welcome to Our Healthcare Family",
            preview: "Welcome {{patient_name}}! We are excited to have you as part of our healthcare family.",
            trigger: "Patient Registration",
            stats: { sent: "456", openRate: "91", lastModified: "3 days ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "purple",
            icon: UserPlus,
        },
        {
            title: "Lab Results Ready",
            channel: "PUSH",
            type: "Results",
            subject: "Your Lab Results Are Ready",
            preview: "Your lab results from {{test_name}} are now available. Tap to view in the app.",
            trigger: "Lab Results Available",
            stats: { sent: "892", openRate: "96", lastModified: "1 week ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "orange",
            icon: FileText,
        },
        {
            title: "Prescription Ready",
            channel: "SMS",
            type: "Pharmacy",
            subject: "Prescription Ready for Pickup",
            preview: "Your prescription is ready for pickup at {{pharmacy_name}}. Pharmacy hours: {{hours}}.",
            trigger: "Prescription Filled",
            stats: { sent: "678", openRate: "92", lastModified: "4 days ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "pink",
            icon: Pill,
        },
        {
            title: "Telehealth Link",
            channel: "EMAIL",
            type: "Telehealth",
            subject: "Your Virtual Appointment Link",
            preview: "Join your virtual appointment with Dr. {{doctor_name}}. Click here: {{link}}",
            trigger: "15min Before Virtual Appointment",
            stats: { sent: "534", openRate: "97", lastModified: "2 days ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "purple",
            icon: Video,
        },
        {
            title: "Payment Receipt",
            channel: "EMAIL",
            type: "Billing",
            subject: "Payment Confirmation",
            preview: "Thank you for your payment of ${{amount}}. Transaction ID: {{transaction_id}}",
            trigger: "Payment Received",
            stats: { sent: "1,890", openRate: "89", lastModified: "6 hours ago" },
            status: "Active & Sending",
            live: true,
            borderColor: "green",
            icon: DollarSign,
        },
        {
            title: "Missed Appointment",
            channel: "SMS",
            type: "Appointments",
            subject: "Missed Appointment Notice",
            preview: "We missed you today. Please call {{phone}} to reschedule your appointment.",
            trigger: "Appointment No-Show",
            stats: { sent: "89", openRate: "76", lastModified: "1 week ago" },
            status: "Disabled",
            live: false,
            borderColor: "gray",
            icon: AlertCircle,
        },
    ];

    const getColorClasses = (color) => {
        switch (color) {
            case "blue": return { border: "from-blue-500 to-blue-600", button: "bg-blue-600 hover:bg-blue-700" };
            case "green": return { border: "from-green-500 to-green-600", button: "bg-green-600 hover:bg-green-700" };
            case "red": return { border: "from-red-500 to-red-600", button: "bg-red-600 hover:bg-red-700" };
            case "purple": return { border: "from-purple-500 to-purple-600", button: "bg-purple-600 hover:bg-purple-700" };
            case "orange": return { border: "from-orange-500 to-orange-600", button: "bg-orange-600 hover:bg-orange-700" };
            case "pink": return { border: "from-pink-500 to-pink-600", button: "bg-pink-600 hover:bg-pink-700" };
            case "gray": return { border: "from-gray-400 to-gray-500", button: "bg-gray-500 hover:bg-gray-600" };
            default: return { border: "from-blue-500 to-blue-600", button: "bg-blue-600" };
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto">
                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {templates.map((template) => {
                        const colors = getColorClasses(template.borderColor);
                        const Icon = template.icon;

                        return (
                            <div key={template.title} className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative">
                                {/* Colored Top Border Only */}
                                <div className={`absolute top-0 left-0 right-0 h-3 bg-gradient-to-r ${colors.border} rounded-t-3xl`} />

                                {/* White Header - Now Fully Responsive */}
                                <div className="p-4 pt-7 sm:p-5 sm:pt-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                        {/* Title + Channel + Icon */}
                                        <div className="flex items-start sm:items-center gap-3">
                                            <div className="p-2.5 bg-gray-100 rounded-xl flex-shrink-0">
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                                            </div>
                                            <div>
                                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-tight">{template.title}</h3>
                                                <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-1">
                                                    <Mail className="w-3 h-3" />
                                                    <span className="text-[10px] sm:text-xs">{template.channel}</span>
                                                    <span className="text-[10px] sm:text-xs">• {template.type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Live Status Dot */}
                                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${template.live ? 'bg-green-400' : 'bg-gray-400'}`} />
                                    </div>

                                    {/* Subject */}
                                    <div className="bg-gray-50 rounded-2xl p-3 mb-3">
                                        <p className="text-[10px] text-gray-500 mb-1">Subject</p>
                                        <p className="text-xs font-medium text-gray-800">{template.subject}</p>
                                    </div>

                                    {/* Preview */}
                                    <div className="bg-gray-50 rounded-2xl p-3 mb-3">
                                        <p className="text-[10px] text-gray-500 mb-1">Preview</p>
                                        <p className="text-xs text-gray-700 leading-relaxed">{template.preview}</p>
                                    </div>

                                    {/* Trigger Event */}
                                    <div className="bg-amber-50 rounded-2xl p-3 mb-4">
                                        <p className="text-[10px] text-amber-600 font-medium">Trigger Event</p>
                                        <p className="text-xs text-amber-800 mt-1">{template.trigger}</p>
                                    </div>

                                    {/* Stats - Responsive spacing */}
                                    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                                        <div className="bg-blue-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                            <Send className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-gray-800">{template.stats.sent}</p>
                                            <p className="text-[9px] text-gray-600">Sent</p>
                                        </div>
                                        <div className="bg-purple-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                            <TrendingUp className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                            <p className="text-sm font-bold text-gray-800">{template.stats.openRate}%</p>
                                            <p className="text-[9px] text-gray-600">Open Rate</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-2xl p-2.5 sm:p-3 text-center">
                                            <Clock className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                                            <p className="text-[10px] font-medium text-gray-700">{template.stats.lastModified}</p>
                                            <p className="text-[9px] text-gray-600">Modified</p>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`w-2 h-2 rounded-full ${template.live ? 'bg-green-500' : 'bg-gray-400'}`} />
                                        <span className="text-xs text-gray-600">{template.status}</span>
                                        {template.live && <span className="text-xs text-green-600 font-medium">• Live</span>}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
                                        <button className={`${colors.button} text-white px-5 py-2 rounded-full text-xs font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition`}>
                                            <Edit2 className="w-3 h-3" />
                                            Edit
                                        </button>
                                        <div className="flex items-center justify-center sm:justify-end gap-3">
                                            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                                                <Eye className="w-3 h-3 text-gray-600" />
                                            </button>
                                            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
                                                <Trash2 className="w-3 h-3 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Create New Template Card */}
                <div className="max-w-md mx-auto">
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 text-center">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl">
                            <Bell className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Create New Template</h3>
                        <p className="text-sm text-gray-600 mb-8">Design custom notification templates for your workflows</p>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3 mx-auto">
                            <Bell className="w-4 h-4" />
                            New Template
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}