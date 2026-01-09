"use client";

import { ArrowLeft, CreditCard, Smartphone, Building2, Shield, Check, FileText, Globe, Upload } from "lucide-react";
import { useState } from "react";

export default function ConsultationDetailsAndPayment() {
    const [currentStep, setCurrentStep] = useState("details");

    return (
        <>
            {currentStep === "details" ? (
                <ConsultationDetails onContinue={() => setCurrentStep("payment")} />
            ) : (
                <Payment onBack={() => setCurrentStep("details")} />
            )}
        </>
    );
}

// Consultation Details Component
function ConsultationDetails({ onContinue }) {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Consultation Details</h1>
                    <p className="text-xs text-gray-600 mt-1">Provide information for the doctor</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-3xl shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">Enter Details</h2>
                    </div>

                    {/* Reason for Consultation */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-900 mb-2">
                            Reason for Consultation <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <textarea
                                rows={4}
                                placeholder="Describe your health concern..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs text-gray-700 placeholder-gray-400"
                            />
                        </div>
                    </div>

                    {/* Preferred Language */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-900 mb-2">
                            Preferred Language
                        </label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs text-gray-700">
                                <option>Select language</option>
                                <option>English</option>
                                <option>Urdu</option>
                                <option>Punjabi</option>
                                <option>Spanish</option>
                            </select>
                        </div>
                    </div>

                    {/* Upload Medical Reports */}
                    <div className="mb-8">
                        <label className="block text-xs font-medium text-gray-900 mb-2">
                            Upload Medical Reports (Optional)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-gray-400 transition cursor-pointer">
                            <Upload className="w-7 h-7 text-gray-400 mx-auto mb-3" />
                            <p className="text-xs text-gray-600">Upload reports or prescriptions</p>
                            <button className="mt-4 text-xs text-purple-600 font-medium hover:text-purple-700">
                                Browse files
                            </button>
                            <input type="file" multiple className="hidden" />
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-purple-50 rounded-2xl p-5 mb-8">
                        <h3 className="text-sm font-semibold text-purple-900 mb-3">Summary</h3>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <p className="text-gray-600">Doctor</p>
                                <p className="font-medium text-gray-900">Dr. Sarah Johnson</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Date & Time</p>
                                <p className="font-medium text-gray-900">Jan 1 at 10:00 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-2xl transition text-xs">
                            Back
                        </button>
                        <button
                            onClick={onContinue}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-4 rounded-2xl transition shadow-md text-xs"
                        >
                            Continue to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Payment Component
function Payment({ onBack }) {
    const [selectedMethod, setSelectedMethod] = useState("card");

    const paymentMethods = [
        { id: "card", label: "Credit / Debit Card", icon: CreditCard },
        { id: "mobile", label: "JazzCash / Easypaisa", icon: Smartphone },
        { id: "bank", label: "Bank Transfer", icon: Building2 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Payment</h1>
                    <p className="text-xs text-gray-600 mt-1">Complete payment to confirm your online consultation</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* LEFT: Payment Methods */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-orange-100 p-3 rounded-xl">
                                <CreditCard className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-base font-semibold text-gray-900">Select Payment Method</h2>
                        </div>

                        <div className="space-y-4 mb-8">
                            {paymentMethods.map((method) => {
                                const Icon = method.icon;
                                const active = selectedMethod === method.id;

                                return (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl transition-all ${active
                                            ? "bg-purple-50 border-2 border-purple-600"
                                            : "bg-gray-50 hover:bg-gray-100"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`    rounded-xl ${active ? "bg-purple-100" : "bg-gray-200"}`}>
                                                <Icon className={`w-5 h-5 ${active ? "text-purple-600" : "text-gray-600"}`} />
                                            </div>
                                            <span className="text-xs font-medium text-gray-900">{method.label}</span>
                                        </div>
                                        {active && <Check className="w-5 h-5 text-purple-600" />}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-2">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-blue-900">Secure Payment</p>
                                    <p className="text-xs text-blue-800 mt-1">
                                        Your payment information is encrypted and secure. We do not store card details.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Summary Card */}
                    <div className="bg-white rounded-3xl shadow-sm p-8 lg:sticky lg:top-8">
                        <h3 className="text-base font-semibold text-gray-900 mb-6">Summary</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-200 rounded-full border-2 border-dashed border-gray-300" />
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">Dr. Sarah Johnson</p>
                                    <p className="text-xs text-gray-600">Cardiology</p>
                                </div>
                            </div>

                            <div className="bg-purple-50 rounded-2xl px-5 py-4">
                                <p className="text-xs text-gray-700">Date & Time</p>
                                <p className="text-sm font-semibold text-purple-700 mt-1">
                                    Thursday, January 1 at 10:00 AM
                                </p>
                            </div>

                            <div className="pt-5">
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-gray-600">Consultation Fee</p>
                                    <p className="text-xl font-bold text-purple-700">PKR 2500</p>
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 rounded-2xl transition shadow-lg text-sm">
                                Pay PKR 2500 & Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}