import React from 'react';
import { FileText, Users, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import img from "@/assets/nurse-dashboard/tasks-header.png"

export default function TasksPage() {
    const pendingTasks = [
        {
            id: 1,
            icon: <FileText className="w-6 h-6" />,
            iconBg: 'bg-teal-500',
            title: 'Upload Lab Sample Info',
            description: 'Blood sample collected for CBC test',
            patient: 'Michael Brown',
            token: 'A-15',
            details: [
                { label: 'Sample Type:', value: 'Blood - CBC' },
                { label: 'Collection Time:', value: '10:30 AM' }
            ]
        },
        {
            id: 2,
            icon: <FileText className="w-6 h-6" />,
            iconBg: 'bg-teal-500',
            title: 'Follow-Up Instructions',
            description: 'Share post-consultation instructions with patient',
            patient: 'Jennifer Lee',
            token: 'A-16',
            details: []
        },
        {
            id: 3,
            icon: <Users className="w-6 h-6" />,
            iconBg: 'bg-teal-500',
            title: 'Discharge Assistance',
            description: 'Help patient with discharge paperwork',
            patient: 'David Wilson',
            token: 'A-17',
            details: []
        }
    ];

    const completedTasks = [
        {
            id: 1,
            title: 'Vitals Entry Completed',
            patient: 'Sarah Mitchell',
            token: 'A-12',
            completedAt: '09:45 AM'
        },
        {
            id: 2,
            title: 'Pre-Consult Notes Added',
            patient: 'Robert Chen',
            token: 'A-13',
            completedAt: '10:15 AM'
        }
    ];

    return (
        <div className="min-h-screen px-4 space-y-10">
            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-md rounded-md">
                <div className="max-w-7xl ">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Tasks</h1>
                            <p className="text-sm sm:text-base text-gray-600">Post-consultation and follow-up tasks</p>
                        </div>
                        <div className="relative w-48">
                            <Image
                                src={img}
                                alt="Tasks illustration"
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Pending Tasks */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Pending Tasks</h2>
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                3 tasks
                            </div>
                        </div>

                        <div className="space-y-4">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="bg-white rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                        <div className={`${task.iconBg} rounded-xl p-2.5 sm:p-3 text-white flex-shrink-0`}>
                                            {task.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                                                {task.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mb-2">
                                                {task.description}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                                                <span>{task.patient}</span>
                                                <span>•</span>
                                                <span>Token: {task.token}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {task.details.length > 0 && (
                                        <div className="bg-gray-50 rounded-lg p-3 mb-4 space-y-2">
                                            {task.details.map((detail, index) => (
                                                <div key={index} className="flex justify-between text-xs sm:text-sm">
                                                    <span className="text-gray-600">{detail.label}</span>
                                                    <span className="text-gray-900 font-medium">{detail.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <button className="w-full bg-[#009966] hover:bg-[#009966] text-white font-medium py-2.5 rounded-2xl transition-colors text-sm sm:text-base">
                                        Complete Task
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Completed Today */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Completed Today</h2>
                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                                2 completed
                            </div>
                        </div>

                        <div className="space-y-4">
                            {completedTasks.map((task) => (
                                <div key={task.id} className="bg-green-50 border border-green-200 rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="bg-green-100 rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                                                {task.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
                                                <span>{task.patient}</span>
                                                <span>•</span>
                                                <span>Token: {task.token}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-teal-600">
                                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                <span>Completed at {task.completedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}