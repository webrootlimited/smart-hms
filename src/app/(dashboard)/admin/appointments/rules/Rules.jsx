'use client';

import { useState } from 'react';
import {
    Shield,
    Building2,
    HeartPulse,
    Stethoscope,
    Hospital,
    PlusCircle
} from "lucide-react";


export default function App() {
    const [noShowEnabled, setNoShowEnabled] = useState(true);
    const [telehealthEnabled, setTelehealthEnabled] = useState(false);
    const [insuranceEnabled, setInsuranceEnabled] = useState(true);
    const [referralEnabled, setReferralEnabled] = useState(false);

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <div className="space-y-6">
                    {/* No-Show Fee */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                    <span className="text-pink-600 text-xl font-bold">$</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">No-Show Fee</h3>
                                    <p className="text-sm text-gray-600">Charge for missed appointments without notice</p>
                                </div>
                            </div>
                            {/* Custom Toggle Switch */}
                            <button
                                onClick={() => setNoShowEnabled(!noShowEnabled)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${noShowEnabled ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${noShowEnabled ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                    <input
                                        type="text"
                                        defaultValue="USD"
                                        readOnly
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fee Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-2.5 text-gray-600">$</span>
                                        <input
                                            type="text"
                                            defaultValue="50"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start space-x-3">
                                <span className="text-orange-600 text-xl mt-0.5">!</span>
                                <p className="text-sm text-orange-800">
                                    Policy Impact<br />
                                    Patients will be charged USD $50 if they miss an appointment without 24-hour notice.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reschedule Window */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-yellow-600 text-xl">⏱</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Reschedule Window</h3>
                                    <p className="text-sm text-gray-600">Set minimum notice required for appointment changes</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Minimum Notice Required <span className="text-red-600">*</span>
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="text"
                                            placeholder="24 hours"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-600">before appointment</span>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                                    <span className="text-yellow-600 text-xl mt-0.5">!</span>
                                    <p className="text-sm text-yellow-800">
                                        Patient Impact<br />
                                        Patients must reschedule at least 24 hours before their appointment. Late changes may incur fees.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Telehealth-Only Slots */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-xl">📹</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Telehealth-Only Slots</h3>
                                <p className="text-sm text-gray-600">Designate specific time ranges for virtual appointments only</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setTelehealthEnabled(!telehealthEnabled)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${telehealthEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${telehealthEnabled ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Insurance Restrictions (USA) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 text-xl">📄</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Insurance Restrictions (USA)</h3>
                                    <p className="text-sm text-gray-600">Manage accepted insurance providers and denied plans</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setInsuranceEnabled(!insuranceEnabled)}
                                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${insuranceEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span
                                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${insuranceEnabled ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                    Accepted Insurance Providers
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 border border-[#0284C7] bg-[#0284C70D] px-4 py-3 rounded-lg">
                                            <Shield className="w-5 h-5 text-blue-700" />
                                            <span className="text-gray-900">Blue Cross Blue Shield</span>
                                        </div>

                                        <div className="flex items-center space-x-3 border border-[#0284C7] bg-[#0284C70D] px-4 py-3 rounded-lg">
                                            <Building2 className="w-5 h-5 text-blue-700" />
                                            <span className="text-gray-900">UnitedHealthcare</span>
                                        </div>

                                        <div className="flex items-center space-x-3 border border-[#E5E7EB] px-4 py-3 rounded-lg">
                                            <HeartPulse className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-900">Humana</span>
                                        </div>

                                        <div className="flex items-center space-x-3 border border-[#E5E7EB] px-4 py-3 rounded-lg">
                                            <Hospital className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-900">Medicare</span>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3 border border-[#0284C7] bg-[#0284C70D] px-4 py-3 rounded-lg">
                                            <PlusCircle className="w-5 h-5 text-blue-700" />
                                            <span className="text-gray-900">Aetna</span>
                                        </div>

                                        <div className="flex items-center space-x-3 border border-[#E5E7EB] px-4 py-3 rounded-lg">
                                            <Shield className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-900">Cigna</span>
                                        </div>

                                        <div className="flex items-center space-x-3 border border-[#E5E7EB] px-4 py-3 rounded-lg">
                                            <Building2 className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-900">Kaiser Permanente</span>
                                        </div>

                                        <div className="flex items-center space-x-3 border border-[#E5E7EB] px-4 py-3 rounded-lg">
                                            <Stethoscope className="w-5 h-5 text-gray-600" />
                                            <span className="text-gray-900">Medicaid</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-800">
                                    ✓ 8 insurance providers accepted
                                </div>
                            </div>

                            {/* Denied Section */}
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">
                                    Denied Specific Plans
                                </h4>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="text"
                                        placeholder="Enter plan name to deny..."
                                        className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button className="w-full sm:w-auto bg-[#E7000B] hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2">
                                        <span className="text-xl">✕</span>
                                        <span>Deny</span>
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* Referral Required (NHS UK) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-xl">📋</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Referral Required (NHS UK)</h3>
                                <p className="text-sm text-gray-600">Require GP referral for specialist appointments</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setReferralEnabled(!referralEnabled)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${referralEnabled ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${referralEnabled ? 'translate-x-7' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Footer Actions - Fixed Bottom Bar */}
                    <div className="bg-white border-t border-gray-200 px-6 py-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

                            {/* Left Info */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm text-gray-600">
                                <span className="text-green-600 flex items-center space-x-2">
                                    <span>✓</span>
                                    <span>All rules validated</span>
                                </span>
                                <span>Last saved: 2 minutes ago</span>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
                                <button className="w-full md:w-auto px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                                    Reset to Default
                                </button>

                                <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-b from-[#0284C7] to-[#0369A1] hover:bg-blue-700 text-white rounded-lg flex items-center justify-center space-x-2">
                                    <span>Save Rules</span>
                                    <span>→</span>
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}