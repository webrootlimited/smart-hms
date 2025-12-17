'use client';

import React from 'react';
import { Calendar, Users, Clock, Building2, Video, Activity, AlertTriangle, ArrowDown } from 'lucide-react';

export default function TopStats() {
    const cards = [
        { icon: Calendar, number: 182, label: 'Appointments Today', color: 'text-blue-400' },
        { icon: Users, number: 27, label: 'Active Providers', color: 'text-green-400' },
        { icon: Clock, number: 16, label: 'Waiting List', color: 'text-gray-300' },
        { icon: Building2, number: 8, label: 'Departments Live', color: 'text-yellow-400' },
        { icon: Video, number: 24, label: 'Telehealth Sessions', color: 'text-blue-300' },
        { icon: Activity, number: '92%', label: 'Bed Occupancy', color: 'text-purple-300' },
        { icon: AlertTriangle, number: 3, label: 'Critical Alerts Today', color: 'text-red-400' },
        { icon: ArrowDown, number: 5, label: 'No-shows Today', color: 'text-pink-400' },
    ];

    return (
        <>
            <div>
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="bg-[linear-gradient(98.24deg,rgba(109,220,255,0.1)_0%,rgba(127,96,249,0.1)_100%)]
 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <card.icon className={`w-7 h-7 ${card.color}`} strokeWidth={1.5} />
                                </div>
                                <div className="text-black/80">
                                    <h3 className="text-2xl font-semibold mb-1">{card.number}</h3>
                                    <p className="text-sm opacity-90">{card.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}