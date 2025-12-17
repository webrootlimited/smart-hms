'use client';

import React from 'react';

export default function DailyAppointmentVolumeChart() {
    return (
        <div className="mt-10">
            <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 sm:mb-8">
                    Daily Appointment Volume
                </h2>

                {/* Chart Container */}
                <div className="relative h-72 sm:h-96">
                    {/* SVG Area Chart */}
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                        {/* Grid lines */}
                        <line x1="0" y1="50" x2="800" y2="50" stroke="#e5e7eb" />
                        <line x1="0" y1="150" x2="800" y2="150" stroke="#e5e7eb" />
                        <line x1="0" y1="250" x2="800" y2="250" stroke="#e5e7eb" />
                        <line x1="0" y1="350" x2="800" y2="350" stroke="#e5e7eb" />

                        {/* Y-axis labels */}
                        <text x="10" y="355" className="fill-gray-500 text-sm font-medium">0</text>
                        <text x="10" y="255" className="fill-gray-500 text-sm font-medium">25</text>
                        <text x="10" y="155" className="fill-gray-500 text-sm font-medium">50</text>
                        <text x="10" y="55" className="fill-gray-500 text-sm font-medium">75</text>
                        <text x="10" y="20" className="fill-gray-500 text-sm font-medium">100</text>


                        {/* Area fill */}
                        <path
                            d="
                M 50 300
                Q 120 280, 150 260
                Q 200 230, 250 200
                Q 300 160, 350 150
                Q 400 140, 450 145
                Q 500 150, 550 160
                Q 600 180, 650 210
                Q 700 240, 750 270
                L 750 350
                L 50 350
                Z
              "
                            fill="url(#areaGradient)"
                            opacity="0.35"
                        />

                        {/* Stroke */}
                        <path
                            d="
                M 50 300
                Q 120 280, 150 260
                Q 200 230, 250 200
                Q 300 160, 350 150
                Q 400 140, 450 145
                Q 500 150, 550 160
                Q 600 180, 650 210
                Q 700 240, 750 270
              "
                            fill="none"
                            stroke="#60a5fa"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />

                        {/* Gradient */}
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.7" />
                                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.15" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* X-axis labels */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-12 text-sm font-medium text-gray-600">

                        {/* Desktop labels */}
                        <div className="hidden sm:flex justify-between">
                            <span>8am</span>
                            <span>9am</span>
                            <span>10am</span>
                            <span>11am</span>
                            <span>12pm</span>
                            <span>1pm</span>
                            <span>2pm</span>
                            <span>3pm</span>
                            <span>4pm</span>
                            <span>5pm</span>
                        </div>

                        {/* Mobile labels */}
                        <div className="flex sm:hidden justify-between text-xs">
                            <span>8am</span>
                            <span>10am</span>
                            <span>12pm</span>
                            <span>2pm</span>
                            <span>4pm</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
