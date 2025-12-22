'use client';

import { DollarSign, Calendar, Users, Activity, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Top Row - Two Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Revenue Overview */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500 rounded-lg text-white">
                                    <DollarSign className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Revenue Overview</h3>
                                    <p className="text-xs text-gray-600">Monthly revenue vs expenses</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" />
                                <span>+18.2%</span>
                            </div>
                        </div>

                        <p className="text-2xl font-bold text-gray-900 mb-6">$335,000 <span className="text-xs font-normal text-gray-600">this month</span></p>

                        {/* Revenue Chart SVG */}
                        <svg viewBox="0 0 400 200" className="w-full h-48">
                            <defs>
                                <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            {/* Grid lines */}
                            {[0, 85000, 170000, 255000, 340000].map((y) => (
                                <line key={y} x1="40" y1={180 - (y / 340000) * 160} x2="400" y2={180 - (y / 340000) * 160} stroke="#e5e7eb" />
                            ))}

                            {/* Y-axis labels */}
                            {['0', '85,000', '170,000', '255,000', '340,000'].map((label, i) => (
                                <text key={i} x="30" y={180 - (i * 40)} className="text-xs fill-gray-500 text-right" dominantBaseline="middle">
                                    {label}
                                </text>
                            ))}

                            {/* X-axis labels */}
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                                <text key={month} x={80 + i * 60} y="195" className="text-xs fill-gray-600" textAnchor="middle">
                                    {month}
                                </text>
                            ))}

                            {/* Expenses line (red) */}
                            <polyline
                                fill="none"
                                stroke="#f87171"
                                strokeWidth="3"
                                points="80,140 120,135 160,138 200,132 240,130 320,128"
                            />

                            {/* Revenue area (purple) */}
                            <polyline
                                fill="url(#revenueGradient)"
                                stroke="#a78bfa"
                                strokeWidth="3"
                                points="80,120 120,100 160,85 200,70 240,55 320,40"
                            />
                            <polyline
                                fill="none"
                                stroke="#a78bfa"
                                strokeWidth="3"
                                points="80,120 120,100 160,85 200,70 240,55 320,40"
                            />
                        </svg>

                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Revenue</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                <span className="text-xs text-gray-600">Expenses</span>
                            </div>
                        </div>
                    </div>

                    {/* Appointment Trends */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500 rounded-lg text-white">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Appointment Trends</h3>
                                    <p className="text-xs text-gray-600">Weekly appointment status</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" />
                                <span>+8.4%</span>
                            </div>
                        </div>

                        <p className="text-2xl font-bold text-gray-900 mb-6">327 <span className="text-xs font-normal text-gray-600">this week</span></p>

                        {/* Appointment Chart SVG */}
                        <svg viewBox="0 0 400 200" className="w-full h-48">
                            {/* Grid lines */}
                            {[0, 20, 40, 60, 80].map((y) => (
                                <line key={y} x1="50" y1={180 - (y / 80) * 160} x2="380" y2={180 - (y / 80) * 160} stroke="#e5e7eb" />
                            ))}

                            {/* Y-axis labels */}
                            {['0', '20', '40', '60', '80'].map((label, i) => (
                                <text key={i} x="40" y={180 - (i * 40)} className="text-xs fill-gray-500 text-right" dominantBaseline="middle">
                                    {label}
                                </text>
                            ))}

                            {/* X-axis labels */}
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                                <text key={day} x={80 + i * 45} y="195" className="text-xs fill-gray-600" textAnchor="middle">
                                    {day}
                                </text>
                            ))}

                            {/* Total (blue line with dots) */}
                            <polyline
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                                points="80,80 105,60 130,50 175,70 220,90 265,110 310,140 355,160"
                            />
                            {[80, 105, 130, 175, 220, 265, 310, 355].map((x, i) => (
                                <circle key={i} cx={x} cy={[80, 60, 50, 70, 90, 110, 140, 160][i]} r="5" fill="#3b82f6" />
                            ))}

                            {/* Completed (green line) */}
                            <polyline
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="3"
                                points="80,85 105,65 130,55 175,75 220,95 265,115 310,145 355,165"
                            />

                            {/* Cancelled (red dots) */}
                            {[80, 125, 170, 215, 260, 305, 350].map((x, i) => (
                                <circle key={i} cx={x} cy="170" r="3" fill="#ef4444" />
                            ))}
                        </svg>

                        <div className="flex items-center justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Total</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-xs text-gray-600">Cancelled</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Row - Age Groups + Top Providers (Fixed Responsiveness) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Patient Age Groups */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500 rounded-lg text-white">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">Patient Age Groups</h3>
                                <p className="text-xs text-gray-600">Demographics breakdown</p>
                            </div>
                        </div>

                        <div className="flex justify-center mb-8">
                            <svg viewBox="0 0 200 200" className="w-48 h-48">
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="40" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="40" strokeDasharray="100 502.4" strokeDashoffset="0" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#3b82f6" strokeWidth="40" strokeDasharray="135 502.4" strokeDashoffset="-100" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#a78bfa" strokeWidth="40" strokeDasharray="110 502.4" strokeDashoffset="-235" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#f97316" strokeWidth="40" strokeDasharray="100 502.4" strokeDashoffset="-345" />
                                <circle cx="100" cy="100" r="80" fill="none" stroke="#ef4444" strokeWidth="40" strokeDasharray="57 502.4" strokeDashoffset="-445" />
                                <circle cx="100" cy="100" r="50" fill="white" />
                            </svg>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">0-18 years</span>
                                </div>
                                <span className="text-xs font-medium">420</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">19-35 years</span>
                                </div>
                                <span className="text-xs font-medium">680</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">36-50 years</span>
                                </div>
                                <span className="text-xs font-medium">850</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">51-65 years</span>
                                </div>
                                <span className="text-xs font-medium">620</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-xs text-gray-700">65+ years</span>
                                </div>
                                <span className="text-xs font-medium">277</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Providers - Fixed Responsiveness */}
                    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500 rounded-lg text-white">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Top Providers</h3>
                                    <p className="text-xs text-gray-600">By patient volume this month</p>
                                </div>
                            </div>
                            <button className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 whitespace-nowrap">
                                View All
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Horizontal Bars - Responsive Layout */}
                        <div className="space-y-5 flex-1">
                            {[
                                { name: 'Dr. Smith', width: 'w-full sm:w-11/12', value: 160 },
                                { name: 'Dr. Johnson', width: 'w-11/12 sm:w-10/12', value: 140 },
                                { name: 'Dr. Williams', width: 'w-10/12 sm:w-9/12', value: 120 },
                                { name: 'Dr. Brown', width: 'w-9/12 sm:w-7/12', value: 90 },
                                { name: 'Dr. Davis', width: 'w-8/12 sm:w-5/12', value: 60 },
                            ].map((provider) => (
                                <div key={provider.name} className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                                    <span className="text-xs text-gray-700 mb-1 sm:mb-0 sm:w-28">{provider.name}</span>
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                                            <div className={`absolute inset-y-0 left-0 bg-orange-400 rounded-full ${provider.width} transition-all`}></div>
                                        </div>
                                        <span className="text-xs text-gray-500 w-10 text-right whitespace-nowrap">{provider.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Rating Pills - Responsive Wrapping */}
                        <div className="flex flex-wrap justify-center gap-2 mt-8">
                            {['Smith 4.8', 'Johnson 4.9', 'Williams 4.7', 'Brown 4.6', 'Davis 4.8'].map((item, i) => {
                                const ratings = ['4.8', '4.9', '4.7', '4.6', '4.8'];
                                const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis'];
                                return (
                                    <div
                                        key={item}
                                        className="bg-yellow-50 text-orange-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1 whitespace-nowrap"
                                    >
                                        <Activity className="w-3 h-3" />
                                        {ratings[i]} {names[i]}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Quick Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { icon: Users, color: 'blue', title: 'Patient Demographics', value: '2,847', change: '+12% vs last month' },
                        { icon: Calendar, color: 'green', title: 'Appointment Volume', value: '1,234', change: '+8% vs last month' },
                        { icon: DollarSign, color: 'purple', title: 'Revenue Summary', value: '$335K', change: '+18% vs last month' },
                        { icon: Activity, color: 'orange', title: 'Provider Performance', value: '4.8★', change: '+5% vs last month' },
                    ].map((card) => (
                        <div key={card.title} className="bg-white rounded-2xl shadow-sm p-5">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg text-white bg-${card.color}-500`}>
                                    <card.icon className="w-5 h-5" />
                                </div>
                                <p className="text-xs text-gray-600">{card.title}</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
                            <p className="text-xs text-gray-600 mb-4">{card.change}</p>
                            <button className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                Generate Report
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}