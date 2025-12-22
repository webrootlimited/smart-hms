'use client';

import {
    Activity,
    Pencil,
    PlusCircle,
    Calendar,
    AlertTriangle,
    Trash2,
    CloudUpload,
    FileText,
    Settings,
    LogOut,
    LogIn,
    ShieldCheck,
    User,
    Globe,
    Monitor,
    Smartphone,
    Tablet,
    Info,
    CheckCircle,
    XCircle
} from 'lucide-react';

export default function ActivityTimeline() {
    const activities = [
        // ... (same activities array as before)
        {
            id: 1,
            icon: Pencil,
            color: 'blue',
            title: 'Updated Patient Record',
            subtitle: 'Patient #2847',
            description: 'Modified medical history and added prescription notes',
            user: 'Dr. Sarah Provider',
            userRole: 'Provider',
            ip: '192.168.1.4',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '2 minutes ago',
            details: 'Record ID: Details'
        },
        {
            id: 2,
            icon: PlusCircle,
            color: 'green',
            title: 'Created New Provider',
            subtitle: 'Dr. Michael Chen',
            description: 'Added new Provider with specialization in Cardiology',
            user: 'Admin User',
            userRole: 'Administrator',
            ip: '192.168.1.12',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '8 minutes ago',
            details: 'Provider ID: Details'
        },
        {
            id: 3,
            icon: Calendar,
            color: 'green',
            title: 'Scheduled Appointment',
            subtitle: 'Appointment #5623',
            description: 'Booked appointment for John Doe with Dr. Williams',
            user: 'Emily Rodriguez',
            userRole: 'Receptionist',
            ip: '192.168.1.88',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '15 minutes ago',
            details: 'Date: Dec 15, 20 Details'
        },
        {
            id: 4,
            icon: AlertTriangle,
            color: 'orange',
            title: 'Failed Login Attempt',
            subtitle: 'admin@hospital.com',
            description: 'Multiple failed login attempts detected from unknown IP',
            user: 'Unknown User',
            userRole: 'N/A',
            ip: '185.234.12.98',
            device: 'Mobile',
            status: 'Error',
            statusColor: 'red',
            time: '23 minutes ago',
            details: 'Attempts: 5 Details'
        },
        {
            id: 5,
            icon: Trash2,
            color: 'red',
            title: 'Deleted Appointment',
            subtitle: 'Appointment #5589',
            description: 'Cancelled appointment due to patient request',
            user: 'Dr. James Provider',
            userRole: 'Provider',
            ip: '192.168.1.6',
            device: 'Tablet',
            status: 'Warning',
            statusColor: 'yellow',
            time: '35 minutes ago',
            details: 'Reason: Patient Details'
        },
        {
            id: 6,
            icon: CloudUpload,
            color: 'blue',
            title: 'Automated Backup',
            subtitle: 'Database Backup',
            description: 'Daily automated database backup completed successfully',
            user: 'System',
            userRole: 'System',
            ip: '127.0.0.1',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '42 minutes ago',
            details: 'Size: 2.4 Gi Details'
        },
        {
            id: 7,
            icon: FileText,
            color: 'green',
            title: 'Generated Invoice',
            subtitle: 'Invoice #INV-2847',
            description: 'Created invoice for patient consultation and lab tests',
            user: 'Lisa Martinez',
            userRole: 'Billing Manager',
            ip: '192.168.1.3',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '1 hour ago',
            details: 'Amount: $450.00 Details'
        },
        {
            id: 8,
            icon: Settings,
            color: 'blue',
            title: 'Updated System Settings',
            subtitle: 'Billing Configuration',
            description: 'Modified tax rate and payment grace period settings',
            user: 'Admin User',
            userRole: 'Administrator',
            ip: '192.168.1.1',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '1 hour ago',
            details: 'Tax Rate: 8.5% Details'
        },
        {
            id: 9,
            icon: LogOut,
            color: 'gray',
            title: 'Logged Out',
            subtitle: 'Session Ended',
            description: 'User logged out from the system',
            user: 'Dr. Sarah Provider',
            userRole: 'Provider',
            ip: '192.168.1.4',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '2 hours ago',
            details: 'Session Duration Details'
        },
        {
            id: 10,
            icon: LogIn,
            color: 'purple',
            title: 'Logged In',
            subtitle: 'New Session',
            description: 'User successfully authenticated and logged into the system',
            user: 'Dr. Michael Provider',
            userRole: 'Provider',
            ip: '192.168.1.7',
            device: 'Mobile',
            status: 'Success',
            statusColor: 'green',
            time: '2 hours ago',
            details: 'Location: Main Details'
        },
        {
            id: 11,
            icon: ShieldCheck,
            color: 'orange',
            title: 'Security Scan',
            subtitle: 'System Security',
            description: 'Completed scheduled security vulnerability scan',
            user: 'System',
            userRole: 'System',
            ip: '127.0.0.1',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '3 hours ago',
            details: 'Threats Found: 0 Details'
        },
        {
            id: 12,
            icon: Pencil,
            color: 'blue',
            title: 'Updated Patient Info',
            subtitle: 'Patient #1456',
            description: 'Updated contact information and insurance details',
            user: 'Emily Rodriguez',
            userRole: 'Receptionist',
            ip: '192.168.1.8',
            device: 'Desktop',
            status: 'Success',
            statusColor: 'green',
            time: '4 hours ago',
            details: 'Fields Updated: 5 Details'
        },
    ];

    const getIconBgColor = (color) => {
        switch (color) {
            case 'blue': return 'bg-blue-100 text-blue-600';
            case 'green': return 'bg-green-100 text-green-600';
            case 'orange': return 'bg-orange-100 text-orange-600';
            case 'red': return 'bg-red-100 text-red-600';
            case 'purple': return 'bg-purple-100 text-purple-600';
            case 'gray': return 'bg-gray-100 text-gray-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    const getStatusColor = (color) => {
        switch (color) {
            case 'green': return 'bg-green-100 text-green-800 border-green-200';
            case 'red': return 'bg-red-100 text-red-800 border-red-200';
            case 'yellow': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-green-100 text-green-800 border-green-200';
        }
    };

    const getDeviceIcon = (device) => {
        if (device === 'Desktop') return <Monitor className="w-4 h-4" />;
        if (device === 'Mobile') return <Smartphone className="w-4 h-4" />;
        if (device === 'Tablet') return <Tablet className="w-4 h-4" />;
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 ">
            <div >
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Activity className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Activity Timeline</h1>
                            <p className="text-sm text-gray-600 mt-1">Recent system events and user actions</p>
                        </div>
                    </div>
                </div>

                {/* Separate Responsive Cards */}
                <div className="space-y-6">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div
                                key={activity.id}
                                className="bg-gray-100 rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                    {/* Activity Icon */}
                                    <div className={`w-12 h-12 rounded-xl ${getIconBgColor(activity.color)} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 min-w-0">
                                        {/* Title + Status + Time - Responsive Layout */}
                                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                    <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
                                                    <span className="text-sm text-gray-500">• {activity.subtitle}</span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-2">{activity.description}</p>

                                                {/* Meta Info - Stack on small screens */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 text-sm text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <User className="w-4 h-4 text-purple-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{activity.user}</p>
                                                            <p className="text-xs text-gray-500">{activity.userRole}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate">{activity.ip}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {getDeviceIcon(activity.device)}
                                                        <span>{activity.device}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Info className="w-4 h-4 flex-shrink-0" />
                                                        <span className="truncate">{activity.details}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status & Time - Align to top on mobile */}
                                            <div className="flex flex-row md:flex-col items-start md:items-end gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.statusColor)} flex items-center gap-1 whitespace-nowrap`}>
                                                    {activity.status === 'Success' && <CheckCircle className="w-4 h-4" />}
                                                    {activity.status === 'Error' && <XCircle className="w-4 h-4 text-red-600" />}
                                                    {activity.status === 'Warning' && <AlertTriangle className="w-4 h-4 text-yellow-600" />}
                                                    {activity.status}
                                                </span>
                                                <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Load More Button */}
                <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-white border border-gray-300 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Load More Events
                    </button>
                </div>
            </div>
        </div>
    );
}