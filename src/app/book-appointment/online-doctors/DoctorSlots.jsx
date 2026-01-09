"use client";

import { ArrowLeft, Calendar, Clock, Video } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function DoctorSlots() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedDate, setSelectedDate] = useState('Thu 1 Jan');
    const [selectedTime, setSelectedTime] = useState('10:00 AM');

    const dates = [
        'Thu 1 Jan', 'Fri 2 Jan', 'Sat 3 Jan', 'Sun 4 Jan', 'Mon 5 Jan',
        'Tue 6 Jan', 'Wed 7 Jan', 'Thu 8 Jan', 'Fri 9 Jan', 'Sat 10 Jan'
    ];

    const timeSlots = {
        morning: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'],
        afternoon: ['01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
    };

    const handleContinue = () => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('tab', 'consultation-details');
        params.set('selectedSlot', selectedTime);
        params.set('date', selectedDate);

        router.push(`?${params.toString()}`);
    };


    return (
        <div className="min-h-screen bg-gray-50 py-5 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-6 border-b border-gray-300 pb-5">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Search
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Select Date & Time</h1>
                    <p className="text-sm text-gray-600 mt-1">Choose your preferred consultation slot</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Date Selection */}
                    <div className="bg-white rounded-2xl shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <h2 className="text-base font-semibold">Select Date</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {dates.map((date) => (
                                <button
                                    key={date}
                                    onClick={() => setSelectedDate(date)}
                                    className={`px-4 py-3 rounded-xl cursor-pointer transition text-sm ${selectedDate === date
                                        ? 'bg-purple-600 text-white shadow '
                                        : 'bg-gray-100 hover:bg-purple-600 hover:text-white'
                                        }`}
                                >
                                    <p className="text-sm">{date.split(' ')[0]}</p>
                                    <p className="text-md font-semibold opacity-80">{date.split(' ').slice(1).join(' ')}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="bg-white rounded-2xl shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-purple-600" />
                            <h2 className="text-base font-semibold">Available Time</h2>
                        </div>

                        {Object.entries(timeSlots).map(([period, slots]) => (
                            <div key={period} className="mb-5">
                                <p className="text-sm font-medium text-gray-700 mb-2 capitalize">{period}</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {slots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`px-4 py-2.5 rounded-xl cursor-pointer flex flex-col items-center justify-center gap-1 text-sm transition ${selectedTime === time
                                                ? 'bg-purple-600 text-white shadow'
                                                : 'bg-gray-100 hover:bg-purple-600 hover:text-white'
                                                }`}
                                        >
                                            <span className='flex items-center gap-2'>
                                                <Video className="w-4 h-4" />
                                                <span>{time}</span>
                                            </span>
                                            <p className='text-xs'>15 min call</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-2xl shadow-sm p-5 h-fit">
                        <h2 className="text-base font-semibold mb-4">Summary</h2>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 bg-gray-200 rounded-full border border-dashed" />
                            <div>
                                <p className="text-sm font-semibold">Dr. Sarah Johnson</p>
                                <p className="text-xs text-gray-600">Cardiology</p>
                            </div>
                        </div>

                        <div className="bg-purple-50 rounded-xl p-3 mb-4">
                            <p className="text-sm text-gray-700">Selected Slot</p>
                            <p className="text-sm font-semibold text-purple-700">
                                {selectedDate} • {selectedTime}
                            </p>
                        </div>

                        <div className="mb-4">
                            <p className="text-sm text-gray-600">Consultation Fee</p>
                            <p className="text-xl font-bold text-purple-700">₨ 2500</p>
                        </div>

                        <button onClick={handleContinue} className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 rounded-xl transition">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
