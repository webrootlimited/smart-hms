import React from 'react';
import { Check, Eye, Paperclip, Clock, User, Clipboard, Search, ClipboardList, Stethoscope, TestTube, FileText, FileCheck } from 'lucide-react';
import img from "@/assets/doctor-dashboard/tasks-header.png";
import Image from "next/image";

export default function TasksList() {
    const tasks = [
        {
            title: "Review Lab Report — John Doe",
            type: "Lab Review",
            priority: "High Priority",
            priorityColor: "red",
            description: "Complete Blood Count (CBC) results need review and approval",
            patient: "John Doe",
            due: "Today, 2:00 PM",
            id: "PT-2847",
        },
        {
            title: "Prescribe Medication — Sarah Anderson",
            type: "Prescription",
            priority: "High Priority",
            priorityColor: "purple",
            description: "Patient requesting refill for hypertension medication",
            patient: "Sarah Anderson",
            due: "Today, 4:30 PM",
            id: "PT-2848",
        },
        {
            title: "Post-Surgery Follow-up — Michael Chen",
            type: "Clinical",
            priority: "Medium Priority",
            priorityColor: "blue",
            description: "Schedule follow-up consultation for post-operative care",
            patient: "Michael Chen",
            due: "Tomorrow, 10:00 AM",
            id: "PT-2846",
        },
        {
            title: "Complete Patient Discharge Summary — Emily Rodriguez",
            type: "Documentation",
            priority: "Medium Priority",
            priorityColor: "orange",
            description: "Finalize discharge documentation and care instructions",
            patient: "Emily Rodriguez",
            due: "Tomorrow, 3:00 PM",
            id: "PT-2849",
        },
    ];

    const getPriorityBg = (color) => {
        switch (color) {
            case "red": return "bg-red-100 text-red-700";
            case "purple": return "bg-purple-100 text-purple-700";
            case "blue": return "bg-blue-100 text-blue-700";
            case "orange": return "bg-orange-100 text-orange-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    const getTypeBg = (color) => {
        switch (color) {
            case "red": return "bg-red-500";
            case "purple": return "bg-purple-500";
            case "blue": return "bg-blue-500";
            case "orange": return "bg-orange-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4">
                <div className="max-w-7xl mx-auto space-y-4">
                    {/* Header Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
                            <div>
                                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Tasks</h1>
                                <p className="text-sm text-gray-600 mt-1">Manage your clinical and administrative responsibilities</p>
                                {/* Search Bar */}
                                <div className="mt-6 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search tasks by patient, type, or priority..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>

                            {/* Floating Icons */}
                            <div className="hidden lg:block flex items-center gap-3">

                                <Image src={img} className='h-full w-full' />
                            </div>
                        </div>



                        {/* Stats Cards */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl px-6 py-4 text-center">
                                <p className="text-2xl font-bold text-blue-700">12</p>
                                <p className="text-xs text-blue-600 mt-1">Pending</p>
                            </div>
                            <div className="bg-red-50 rounded-2xl px-6 py-4 text-center">
                                <p className="text-2xl font-bold text-red-700">5</p>
                                <p className="text-xs text-red-600 mt-1">High Priority</p>
                            </div>
                            <div className="bg-green-50 rounded-2xl px-6 py-4 text-center">
                                <p className="text-2xl font-bold text-green-700">34</p>
                                <p className="text-xs text-green-600 mt-1">Completed</p>
                            </div>
                            <div className="bg-yellow-50 rounded-2xl px-6 py-4 text-center">
                                <p className="text-2xl font-bold text-yellow-700">3</p>
                                <p className="text-xs text-yellow-600 mt-1">Due Today</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-full shadow-md px-4 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {/* All Tasks - Active */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium flex-shrink-0">
                            <ClipboardList className="w-4 h-4" />
                            All Tasks
                            <span className="bg-white/30 px-2 py-0.5 rounded-full text-xs">12</span>
                        </button>

                        {/* Clinical Tasks */}
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-full text-sm font-medium flex-shrink-0 transition">
                            <Stethoscope className="w-4 h-4" />
                            Clinical Tasks
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">5</span>
                        </button>

                        {/* Lab Reviews */}
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-full text-sm font-medium flex-shrink-0 transition">
                            <TestTube className="w-4 h-4" />
                            Lab Reviews
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">3</span>
                        </button>

                        {/* Prescriptions */}
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-full text-sm font-medium flex-shrink-0 transition">
                            <FileText className="w-4 h-4" />
                            Prescriptions
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">2</span>
                        </button>

                        {/* Documentation */}
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 rounded-full text-sm font-medium flex-shrink-0 transition">
                            <FileCheck className="w-4 h-4" />
                            Documentation
                            <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">2</span>
                        </button>
                    </div>

                    {tasks.map((task, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="p-4">
                                {/* Title & Badges */}
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mb-3">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full text-white ${getTypeBg(task.priorityColor)}`}>
                                        {task.type}
                                    </span>
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityBg(task.priorityColor)}`}>
                                        {task.priority}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-xs text-gray-600 mb-4">{task.description}</p>

                                {/* Patient Info */}
                                <div className="flex items-center gap-3 text-xs text-gray-600 mb-5">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#AD46FF] to-[#F6339A]
 flex items-center justify-center text-white text-[10px] font-bold">
                                        {task.patient.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <span className="font-medium text-gray-900">{task.patient}</span>
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{task.due}</span>
                                    <span className="text-gray-500">ID: {task.id}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    <button className=" bg-gradient-to-r from-[#00BC7D] to-[#009689]
 text-white text-xs font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
                                        <Check className="w-4 h-4" />
                                        Mark as Completed
                                    </button>
                                    <button className="px-4 py-2 border border-blue-300 text-blue-700 text-xs font-medium rounded-xl flex items-center gap-1.5 hover:bg-blue-50">
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-xl flex items-center gap-1.5 hover:bg-gray-50">
                                        <Paperclip className="w-4 h-4" />
                                        Attach Document
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}