'use client';

import React from 'react';

export default function ProviderMetrics() {
    return (
        <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Provider Utilization */}
                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-8">Provider Utilization</h2>

                    {/* Donut Chart - 78% utilized */}
                    <div className="relative w-48 sm:w-60 h-48 sm:h-60">
                        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                            {/* Background circle */}
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="32" />

                            {/* Filled portion */}
                            <circle
                                cx="100"
                                cy="100"
                                r="80"
                                fill="none"
                                stroke="url(#blueGradient)"
                                strokeWidth="32"
                                strokeLinecap="round"
                                strokeDasharray="502.4"
                                strokeDashoffset={502.4 * (1 - 0.78)}
                                className="drop-shadow-md"
                            />

                            {/* Gradient */}
                            <defs>
                                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#93c5fd" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-800">78%</span>
                            <span className="text-sm sm:text-base text-gray-600 mt-2">Utilized</span>
                        </div>
                    </div>
                </div>

                {/* Upcoming Peak Hours */}
                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6 sm:mb-8">Upcoming Peak Hours</h2>

                    {/* Line Chart */}
                    <div className="relative h-64 sm:h-80">
                        <svg viewBox="0 0 800 320" className="w-full h-full">
                            {/* Horizontal grid lines */}
                            {[40, 100, 160, 220, 280].map((y, i) => (
                                <line key={i} x1="80" y1={y} x2="720" y2={y} stroke="#e5e7eb" strokeWidth="1" />
                            ))}

                            {/* Y-axis labels */}
                            {[
                                { y: 45, label: '100' },
                                { y: 105, label: '75' },
                                { y: 165, label: '50' },
                                { y: 225, label: '25' },
                                { y: 285, label: '0' },
                            ].map((item, i) => (
                                <text
                                    key={i}
                                    x="60"
                                    y={item.y}
                                    className="fill-gray-500 text-xs sm:text-sm font-medium"
                                >
                                    {item.label}
                                </text>
                            ))}

                            {/* Data line */}
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                points="80,240 180,180 300,120 420,80 540,90 660,160 720,220"
                            />

                            {/* Data points */}
                            {[{ x: 80, y: 240 }, { x: 180, y: 180 }, { x: 300, y: 120 }, { x: 420, y: 80 }, { x: 540, y: 90 }, { x: 660, y: 160 }, { x: 720, y: 220 }].map((pt, i) => (
                                <circle key={i} cx={pt.x} cy={pt.y} r="6" className="fill-blue-500 sm:fill-blue-600" />
                            ))}
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 px-4 sm:px-20">
                            {/* Desktop */}
                            <div className="hidden sm:flex justify-between text-sm font-medium text-gray-600">
                                <span>8am</span>
                                <span>10am</span>
                                <span>12pm</span>
                                <span>2pm</span>
                                <span>4pm</span>
                                <span>6pm</span>
                            </div>

                            {/* Mobile */}
                            <div className="flex sm:hidden justify-between text-xs">
                                <span>8am</span>
                                <span>12pm</span>
                                <span>4pm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
