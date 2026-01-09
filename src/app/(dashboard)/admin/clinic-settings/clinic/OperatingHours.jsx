'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Copy, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { saveClinicOperatingHours } from '@/actions/clinic.actions';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function ClinicOperatingHours({ onNext, onBack, clinicData }) {
    const searchParams = useSearchParams();
    const clinicId = searchParams.get('clinicId');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Default schedule (used when no clinicData)
    const defaultSchedule = {
        Monday: { open: true, from: '08:00', to: '13:00' },
        Tuesday: { open: true, from: '08:00', to: '13:00' },
        Wednesday: { open: true, from: '08:00', to: '13:00' },
        Thursday: { open: true, from: '08:00', to: '13:00' },
        Friday: { open: true, from: '08:00', to: '13:00' },
        Saturday: { open: true, from: '08:00', to: '13:00' },
        Sunday: { open: false, from: '08:00', to: '13:00' },
    };

    const [schedule, setSchedule] = useState(defaultSchedule);

    // Pre-fill with clinicData.operatingHours if available (edit mode)
    useEffect(() => {
        if (clinicData?.operatingHours) {
            const filledSchedule = { ...defaultSchedule };

            daysOfWeek.forEach(day => {
                if (clinicData.operatingHours[day]) {
                    const dayData = clinicData.operatingHours[day];
                    filledSchedule[day] = {
                        open: dayData.open ?? false,
                        from: dayData.from || '08:00',
                        to: dayData.to || '13:00',
                    };
                }
            });

            setSchedule(filledSchedule);
        }
    }, [clinicData]);

    const toggleDay = (day) => {
        setSchedule(prev => ({
            ...prev,
            [day]: { ...prev[day], open: !prev[day].open }
        }));
    };

    const updateTime = (day, field, value) => {
        setSchedule(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const copyToAll = (day) => {
        const { from, to, open } = schedule[day];
        const newSchedule = { ...schedule };
        daysOfWeek.forEach(d => {
            newSchedule[d] = { from, to, open };
        });
        setSchedule(newSchedule);
    };

    const handleSave = async () => {
        console.log('Operating Hours:', schedule);

        try {
            const res = await saveClinicOperatingHours(clinicId, schedule);
            if (res.success) {
                toast.success("Clinic operating hours saved successfully.");
                onNext(clinicId);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto space-y-6">

                {/* Header Card */}
                <div className="bg-teal-50 rounded-2xl border border-teal-200 p-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-teal-600 rounded-xl p-3">
                            <Clock className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Clinic Operating Hours</h1>
                            <p className="text-sm text-gray-600">Define real-world availability for patients</p>
                        </div>
                    </div>
                </div>

                {/* Main Weekly Schedule Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="w-5 h-5 text-teal-600" />
                        <h2 className="text-base font-medium text-gray-900">Weekly Schedule</h2>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-700">Day</th>
                                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-700">Open</th>
                                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-700">From</th>
                                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-700">To</th>
                                    <th className="text-center py-3 px-4 text-xs font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {daysOfWeek.map((day) => {
                                    const dayData = schedule[day];
                                    return (
                                        <tr key={day} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                            <td className="py-5 px-4">
                                                <span className="text-sm font-medium text-gray-900">{day}</span>
                                            </td>
                                            <td className="py-5 px-4 text-center">
                                                <button
                                                    onClick={() => toggleDay(day)}
                                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${dayData.open ? 'bg-teal-600' : 'bg-gray-300'
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${dayData.open ? 'translate-x-6' : 'translate-x-1'
                                                            }`}
                                                    />
                                                </button>
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="time"
                                                    value={dayData.from}
                                                    onChange={(e) => updateTime(day, 'from', e.target.value)}
                                                    disabled={!dayData.open}
                                                    className={`w-28 px-3 py-2 text-sm text-center rounded-lg border ${dayData.open
                                                        ? 'border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500'
                                                        : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                />
                                            </td>
                                            <td className="py-5 px-4">
                                                <input
                                                    type="time"
                                                    value={dayData.to}
                                                    onChange={(e) => updateTime(day, 'to', e.target.value)}
                                                    disabled={!dayData.open}
                                                    className={`w-28 px-3 py-2 text-sm text-center rounded-lg border ${dayData.open
                                                        ? 'border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500'
                                                        : 'border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed'
                                                        }`}
                                                />
                                            </td>
                                            <td className="py-5 px-4 text-center">
                                                <button
                                                    onClick={() => copyToAll(day)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                    Copy to All
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Tip Box */}
                    <div className="mt-8 bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                            Tip: Use "Copy to All" to quickly apply the same hours across all days. You can customize individual days afterwards.
                        </p>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-6">
                    <button onClick={onBack} className="cursor-pointer inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto">
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <div className='flex gap-5'>
                        {clinicData && (
                            <button
                                type="button"
                                onClick={() => onNext(clinicData._id)}
                                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-gray-300 transition cursor-pointer"
                            >
                                Next
                            </button>
                        )}
                        <button
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition shadow-md w-full sm:w-auto order-first sm:order-last disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                        >
                            {isSubmitting ? (
                                "Saving..."
                            ) : (
                                <ArrowRight className="w-5 h-5" />
                            )}
                            Save & Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}