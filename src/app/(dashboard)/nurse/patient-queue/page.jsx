"use client"
import React, { useState } from 'react';
import { Phone, Activity, FileText, Clock, CheckCircle, Users, X, Info } from 'lucide-react';
import Image from 'next/image';
import img from "@/assets/nurse-dashboard/patient-queue-header.png"

// Call Patient Modal Component
function CallPatientModal({ isOpen, onClose, patient }) {
    if (!isOpen || !patient) return null;

    return (
        <>


            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
                <div className="bg-white rounded-2xl shadow-2xl h-[90vh] overflow-y-auto w-full max-w-lg mx-auto sm:mx-0">
                    {/* Header */}
                    <div className="flex flex-row items-start sm:items-center justify-between p-6  gap-3 sm:gap-0">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="bg-blue-500 rounded-2xl p-4">
                                <Phone className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">Call Patient</h2>
                                <p className="text-sm text-gray-500">Notify patient to proceed</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors ml-auto sm:ml-0"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">

                        {/* Patient Info Card */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                                <div className="bg-blue-200 text-blue-700 font-semibold text-sm px-3 py-2 rounded-lg">
                                    {patient.token}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{patient.name}</h3>
                                    <p className="text-sm text-gray-600">{patient.age} / {patient.gender}</p>
                                </div>
                            </div>

                            <div className="space-y-2.5 text-sm">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <span className="text-gray-600">Appointment Type:</span>
                                    <span className="font-medium text-gray-900">{patient.appointmentType}</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <span className="text-gray-600">Doctor:</span>
                                    <span className="font-medium text-gray-900">Dr. Sarah Johnson</span>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <span className="text-gray-600">Wait Time:</span>
                                    <span className="font-medium text-gray-900">{patient.waitTime}</span>
                                </div>
                            </div>
                        </div>

                        {/* Notification Info */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-900 mb-1">Patient Notification</h4>
                                    <p className="text-sm text-blue-700">
                                        This will announce the patient's name and token number over the PA system or display screen.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold rounded-xl transition-colors w-full"
                            >
                                No Response
                            </button>
                            <button
                                onClick={() => {
                                    alert(`Calling ${patient.name}...`);
                                    onClose();
                                }}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 w-full"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default function PatientQueue() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const patients = [
        {
            token: 'A-12',
            name: 'Sarah Mitchell',
            age: '34Y',
            gender: 'F',
            appointmentType: 'General Checkup',
            priority: null,
            status: 'Waiting',
            statusColor: 'gray',
            waitTime: '15 min',
            actions: ['phone', 'vitals']
        },
        {
            token: 'A-13',
            name: 'Robert Chen',
            age: '45Y',
            gender: 'M',
            appointmentType: 'Follow-up',
            priority: null,
            status: 'Waiting',
            statusColor: 'gray',
            waitTime: '8 min',
            actions: ['phone', 'vitals']
        },
        {
            token: 'A-14',
            name: 'Emily Parker',
            age: '28Y',
            gender: 'F',
            appointmentType: 'Consultation',
            priority: null,
            status: 'Waiting',
            statusColor: 'gray',
            waitTime: '5 min',
            actions: ['phone', 'vitals']
        },
        {
            token: 'A-15',
            name: 'Michael Brown',
            age: '52Y',
            gender: 'M',
            appointmentType: 'Diabetes Follow-up',
            priority: 'High',
            status: 'Vitals Taken',
            statusColor: 'blue',
            waitTime: '22 min',
            actions: ['phone', 'notes']
        },
        {
            token: 'A-16',
            name: 'Jennifer Lee',
            age: '38Y',
            gender: 'F',
            appointmentType: 'Annual Physical',
            priority: null,
            status: 'Vitals Taken',
            statusColor: 'blue',
            waitTime: '18 min',
            actions: ['phone', 'notes']
        },
        {
            token: 'A-17',
            name: 'David Wilson',
            age: '60Y',
            gender: 'M',
            appointmentType: 'Hypertension Review',
            priority: 'Urgent',
            status: 'Ready for Doctor',
            statusColor: 'green',
            waitTime: '30 min',
            actions: ['phone']
        },
        {
            token: 'A-18',
            name: 'Lisa Anderson',
            age: '42Y',
            gender: 'F',
            appointmentType: 'General Consultation',
            priority: null,
            status: 'Ready for Doctor',
            statusColor: 'green',
            waitTime: '25 min',
            actions: ['phone']
        },
        {
            token: 'A-19',
            name: 'James Taylor',
            age: '55Y',
            gender: 'M',
            appointmentType: 'Post-Surgery Follow-up',
            priority: null,
            status: 'In Consultation',
            statusColor: 'purple',
            waitTime: '40 min',
            actions: ['phone']
        }
    ];

    const handleCallPatient = (patient) => {
        setSelectedPatient(patient);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 space-y-10">
            {/* Header */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-6 py-8 shadow-md rounded-lg flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-1">Patient Queue</h1>
                        <p className="text-sm text-gray-500">Manage patient flow and pre-consultation</p>
                    </div>
                    <div className="relative lg:inline hidden">
                        <Image
                            src={img}
                            alt="Queue illustration"
                            className="w-72"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto ">
                <div className="bg-white rounded-xl shadow-sm">
                    {/* Table Header */}
                    <div className="px-6 py-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Today's Patients</h2>
                            <p className="text-sm text-gray-500">(8)</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 mr-2">Quick Filters:</span>
                            <button className="px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">All</button>
                            <button className="px-4 py-1.5 text-gray-600 text-sm rounded-lg hover:bg-gray-100">Waiting</button>
                            <button className="px-4 py-1.5 text-gray-600 text-sm rounded-lg hover:bg-gray-100">Ready</button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className=" bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Token #</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Appointment Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wait Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {patients.map((patient) => (
                                    <tr key={patient.token} className="hover:bg-gray-50">
                                        {/* Token */}
                                        <td className="px-6 py-4">
                                            <div className="bg-blue-100 text-blue-600 font-semibold text-sm px-3 py-1.5 rounded-lg inline-block">
                                                {patient.token}
                                            </div>
                                        </td>

                                        {/* Patient Name */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                                            <div className="text-xs text-gray-500">{patient.age} / {patient.gender}</div>
                                        </td>

                                        {/* Appointment Type */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-700">{patient.appointmentType}</div>
                                        </td>

                                        {/* Priority */}
                                        <td className="px-6 py-4">
                                            {patient.priority === 'High' && (
                                                <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                                                    <span className="text-yellow-600">▲</span> High
                                                </div>
                                            )}
                                            {patient.priority === 'Urgent' && (
                                                <div className="bg-red-100 text-red-700 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1">
                                                    <span className="text-red-600">●</span> Urgent
                                                </div>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            {patient.status === 'Waiting' && (
                                                <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                                                    <Clock className="w-3 h-3" /> Waiting
                                                </div>
                                            )}
                                            {patient.status === 'Vitals Taken' && (
                                                <div className="bg-blue-100 text-blue-700 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                                                    <Activity className="w-3 h-3" /> Vitals Taken
                                                </div>
                                            )}
                                            {patient.status === 'Ready for Doctor' && (
                                                <div className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                                                    <CheckCircle className="w-3 h-3" /> Ready for Doctor
                                                </div>
                                            )}
                                            {patient.status === 'In Consultation' && (
                                                <div className="bg-purple-100 text-purple-700 text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                                                    <Users className="w-3 h-3" /> In Consultation
                                                </div>
                                            )}
                                        </td>

                                        {/* Wait Time */}
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                                {patient.waitTime}
                                            </div>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {patient.actions.includes('phone') && (
                                                    <button
                                                        onClick={() => handleCallPatient(patient)}
                                                        className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors"
                                                    >
                                                        <Phone className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {patient.actions.includes('vitals') && (
                                                    <button className="bg-yellow-50 text-yellow-600 p-2 rounded-lg hover:bg-yellow-100">
                                                        <Activity className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {patient.actions.includes('notes') && (
                                                    <button className="bg-green-50 text-green-600 p-2 rounded-lg hover:bg-green-100">
                                                        <FileText className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Call Patient Modal */}
            <CallPatientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                patient={selectedPatient}
            />
        </div>
    );
}