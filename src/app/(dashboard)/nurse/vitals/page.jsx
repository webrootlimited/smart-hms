"use client";
import React, { useState } from 'react';
import { ArrowLeft, Clock, Activity, Thermometer, Heart, Wind, Ruler, Weight, Calculator, User, Save, CheckCircle } from 'lucide-react';

export default function VitalsEntry() {
    const [systolic, setSystolic] = useState('120');
    const [diastolic, setDiastolic] = useState('80');
    const [temperature, setTemperature] = useState('98.6');
    const [pulse, setPulse] = useState('72');
    const [spo2, setSpo2] = useState('98');
    const [height, setHeight] = useState('170');
    const [weight, setWeight] = useState('70');

    return (
        <div className="min-h-screen bg-gray-50 pb-6 px-4 sm:px-6 space-y-10">

            {/* Header */}
            <div className="bg-white px-4 py-4 shadow-md rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg w-fit">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-1">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                M
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900">Michael Brown</h1>
                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-xs text-gray-500">
                                    <span>52Y / M</span>
                                    <span>Token: A-15</span>
                                    <span>Diabetes Follow-up</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock className="w-4 h-4" />
                            <div>
                                <div>Check-in: 22 min</div>
                                <div>ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4">

                {/* Blood Pressure */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-500 rounded-xl p-3">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Blood Pressure</h2>
                            <p className="text-xs text-gray-500">Systolic / Diastolic (mmHg)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Systolic</label>
                            <input
                                type="text"
                                value={systolic}
                                onChange={(e) => setSystolic(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1.5">Normal: 90-120</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Diastolic</label>
                            <input
                                type="text"
                                value={diastolic}
                                onChange={(e) => setDiastolic(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-1.5">Normal: 60-80</p>
                        </div>
                    </div>
                </div>

                {/* Temperature */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500 rounded-xl p-3">
                            <Thermometer className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Temperature</h2>
                            <p className="text-xs text-gray-500">Body temperature</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Temperature</label>
                            <input
                                type="text"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">Unit</label>
                            <select className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none bg-white">
                                <option>°F</option>
                                <option>°C</option>
                            </select>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Normal: 97.8-99.1°F (36.5-37.3°C)</p>
                </div>

                {/* Pulse & SpO2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pulse */}
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-pink-500 rounded-xl p-3">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Pulse</h2>
                                <p className="text-xs text-gray-500">Beats per minute</p>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={pulse}
                            onChange={(e) => setPulse(e.target.value)}
                            className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none mb-2"
                        />
                        <p className="text-xs text-gray-500">Normal: 60-100 bpm</p>
                    </div>

                    {/* SpO2 */}
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-blue-500 rounded-xl p-3">
                                <Wind className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">SpO₂</h2>
                                <p className="text-xs text-gray-500">Oxygen saturation (%)</p>
                            </div>
                        </div>
                        <input
                            type="text"
                            value={spo2}
                            onChange={(e) => setSpo2(e.target.value)}
                            className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none mb-2"
                        />
                        <p className="text-xs text-gray-500">Normal: 95-100%</p>
                    </div>
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Height */}
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-purple-500 rounded-xl p-3">
                                <Ruler className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Height</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                                placeholder="cm"
                            />
                            <input
                                type="text"
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                                placeholder="in"
                            />
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-teal-500 rounded-xl p-3">
                                <Weight className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Weight</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="text"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                                placeholder="kg"
                            />
                            <input
                                type="text"
                                className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none"
                                placeholder="lbs"
                            />
                        </div>
                    </div>
                </div>

                {/* BMI */}
                <div className="bg-purple-50 rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-500 rounded-xl p-3">
                                <Calculator className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Body Mass Index (BMI)</h2>
                                <p className="text-xs text-gray-500">Automatically calculated</p>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">--</div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Recorded by: Maria Johnson, RN</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Timestamp: 12/24/2025, 3:06:19 PM</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Vitals
                    </button>
                    <button className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Save & Add Notes
                    </button>
                </div>
            </div>
        </div>
    );
}
