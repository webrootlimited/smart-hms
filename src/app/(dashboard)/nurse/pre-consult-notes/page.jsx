"use client"
import React, { useState } from 'react';
import { ArrowLeft, FileText, Heart, AlertCircle, Pill, Save, UserCheck } from 'lucide-react';

export default function PreConsultationNotes() {
    const [painLevel, setPainLevel] = useState(0);
    const [hasAllergies, setHasAllergies] = useState(false);
    const [allergies, setAllergies] = useState('');
    const [chiefComplaint, setChiefComplaint] = useState('');
    const [medications, setMedications] = useState('');
    const [pregnancyStatus, setPregnancyStatus] = useState('not-disclosed');
    const [additionalNotes, setAdditionalNotes] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 pb-6 px-4 space-y-10 ">
            {/* Header */}
            <div className="bg-white">
                <div className=" px-4 py-4 flex items-center gap-4 shadow-md">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="flex items-center gap-3 flex-1">
                        <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            E
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Pre-Consultation Notes</h1>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Emily Parker • Token: A-14</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4">

                {/* Chief Complaint */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 rounded-xl p-3">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Chief Complaint</h2>
                            <p className="text-xs text-gray-500">What brings the patient in today?</p>
                        </div>
                    </div>

                    <textarea
                        value={chiefComplaint}
                        onChange={(e) => setChiefComplaint(e.target.value)}
                        placeholder="Example: Patient complains of persistent headache for 3 days..."
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                    />
                </div>

                {/* Pain Level */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500 rounded-xl p-3">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">Pain Level</h2>
                                <p className="text-xs text-gray-500">0 = No Pain, 10 = Worst Pain Imaginable</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl">😊</div>
                            <div className="text-xs text-gray-500">No Pain</div>
                        </div>
                    </div>

                    {/* Pain Scale */}
                    <div className="relative">
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={painLevel}
                            onChange={(e) => setPainLevel(parseInt(e.target.value))}
                            className="w-full h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-red-200 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, #86efac 0%, #fef08a 50%, #fca5a5 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
                            <span>0</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        Current Pain Level: <span className="font-semibold text-gray-900">{painLevel}/10</span> - No Pain
                    </div>
                </div>

                {/* Allergies */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500 rounded-xl p-3">
                            <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Allergies</h2>
                            <p className="text-xs text-gray-500">Does the patient have any known allergies?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <button
                            onClick={() => setHasAllergies(false)}
                            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${!hasAllergies
                                ? 'bg-green-50 border-green-500 text-green-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <span className="mr-2">✓</span> No Known Allergies
                        </button>
                        <button
                            onClick={() => setHasAllergies(true)}
                            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${hasAllergies
                                ? 'bg-yellow-50 border-yellow-500 text-yellow-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            <span className="mr-2">⚠</span> Has Allergies
                        </button>
                    </div>

                    {hasAllergies && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <label className="block text-xs text-yellow-800 font-medium mb-2">
                                Please list all allergies:
                            </label>
                            <textarea
                                value={allergies}
                                onChange={(e) => setAllergies(e.target.value)}
                                placeholder="Example: Penicillin, Peanuts, Latex..."
                                className="w-full px-4 py-3 text-sm border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[80px] resize-none bg-white"
                            />
                        </div>
                    )}
                </div>

                {/* Current Medications */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-purple-500 rounded-xl p-3">
                            <Pill className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Current Medications</h2>
                            <p className="text-xs text-gray-500">List all medications the patient is currently taking</p>
                        </div>
                    </div>

                    <textarea
                        value={medications}
                        onChange={(e) => setMedications(e.target.value)}
                        placeholder="Example: Lisinopril 10mg daily, Metformin 500mg twice daily..."
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px] resize-none"
                    />
                </div>

                {/* Pregnancy Status */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-pink-500 rounded-xl p-3">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Pregnancy Status</h2>
                            <p className="text-xs text-gray-500">Is the patient currently pregnant or possibly pregnant?</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                            onClick={() => setPregnancyStatus('not-pregnant')}
                            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${pregnancyStatus === 'not-pregnant'
                                ? 'bg-gray-50 border-gray-400 text-gray-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            Not Pregnant
                        </button>
                        <button
                            onClick={() => setPregnancyStatus('pregnant-possibly')}
                            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${pregnancyStatus === 'pregnant-possibly'
                                ? 'bg-gray-50 border-gray-400 text-gray-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            Pregnant or Possibly Pregnant
                        </button>
                        <button
                            onClick={() => setPregnancyStatus('not-disclosed')}
                            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium ${pregnancyStatus === 'not-disclosed'
                                ? 'bg-blue-50 border-blue-400 text-blue-700'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                                }`}
                        >
                            Not Disclosed
                        </button>
                    </div>
                </div>

                {/* Additional Notes */}
                <div className="bg-white rounded-xl shadow-sm p-5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gray-600 rounded-xl p-3">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-gray-900">Additional Notes</h2>
                            <p className="text-xs text-gray-500">Any other observations or concerns</p>
                        </div>
                    </div>

                    <textarea
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        placeholder="Optional: Patient appears anxious, needs interpreter, etc."
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 min-h-[120px] resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        Cancel
                    </button>
                    <button className="px-6 py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm">
                        <Save className="w-4 h-4" />
                        Save Notes
                    </button>
                    <button className="px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 text-sm">
                        <UserCheck className="w-4 h-4" />
                        Save & Mark Ready for Doctor
                    </button>
                </div>
            </div>
        </div>
    );
}