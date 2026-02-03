"use client";

import { ArrowLeft, CreditCard, FileText, Globe, Upload, X, Shield } from "lucide-react";
import { useState, useRef } from "react";
import { createAppointmentAndStripeSession } from "@/actions/appointment.actions";
import { loadStripe } from "@stripe/stripe-js";

export default function ConsultationDetailsAndPayment({
    doctorData,
    selectedDate,
    selectedTime,
    onBack,
}) {
    const [currentStep, setCurrentStep] = useState("details");

    // ── Form state ──
    const [reason, setReason] = useState("");
    const [language, setLanguage] = useState("English");
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef(null);

    const validateDetailsForm = () => {
        const newErrors = {};
        if (!reason.trim()) newErrors.reason = "Reason for consultation is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinueToPayment = () => {
        if (validateDetailsForm()) setCurrentStep("payment");
    };

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files || []);
        setFiles(selected);
        setErrors((prev) => ({ ...prev, files: "" }));
    };

    const removeFile = (index) => setFiles((prev) => prev.filter((_, i) => i !== index));
    const triggerFileSelect = () => fileInputRef.current?.click();

    // Format date & time safely
    const formattedDateTime = selectedDate && selectedTime
        ? `${new Date(selectedDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        })} at ${new Date(selectedTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })}`
        : "Jan 1 at 10:00 AM";

    return (
        <>
            {currentStep === "details" ? (
                <ConsultationDetails
                    onContinue={handleContinueToPayment}
                    reason={reason}
                    setReason={setReason}
                    language={language}
                    setLanguage={setLanguage}
                    files={files}
                    removeFile={removeFile}
                    triggerFileSelect={triggerFileSelect}
                    fileInputRef={fileInputRef}
                    handleFileChange={handleFileChange}
                    errors={errors}
                    doctorData={doctorData}
                    formattedDateTime={formattedDateTime}
                />
            ) : (
                <Payment
                    onBackToDetails={() => setCurrentStep("details")}
                    doctorData={doctorData}
                    formattedDateTime={formattedDateTime}
                    reason={reason}
                    language={language}
                    files={files}
                    loading={loading}
                    setLoading={setLoading}
                />
            )}
        </>
    );
}

// Consultation Details
function ConsultationDetails({
    onContinue,
    reason,
    setReason,
    language,
    setLanguage,
    files,
    removeFile,
    triggerFileSelect,
    fileInputRef,
    handleFileChange,
    errors,
    doctorData,
    formattedDateTime,
}) {
    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Consultation Details</h1>
                    <p className="text-xs text-gray-600 mt-1">Provide information for the doctor</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-orange-100 p-3 rounded-xl">
                            <FileText className="w-5 h-5 text-orange-600" />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">Enter Details</h2>
                    </div>

                    {/* Reason */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-900 mb-2">
                            Reason for Consultation <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={4}
                                placeholder="Describe your health concern..."
                                className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.reason ? "border-red-500" : "border-gray-200"} rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs text-gray-700 placeholder-gray-400`}
                            />
                        </div>
                        {errors.reason && <p className="text-red-500 text-xs mt-1.5">{errors.reason}</p>}
                    </div>

                    {/* Language */}
                    <div className="mb-6">
                        <label className="block text-xs font-medium text-gray-900 mb-2">Preferred Language</label>
                        <div className="relative">
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs text-gray-700"
                            >
                                <option value="">Select language</option>
                                <option value="English">English</option>
                                <option value="Urdu">Urdu</option>
                                <option value="Punjabi">Punjabi</option>
                                <option value="Spanish">Spanish</option>
                            </select>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="mb-8">
                        <label className="block text-xs font-medium text-gray-900 mb-2">Upload Medical Reports (Optional)</label>
                        <div onClick={triggerFileSelect} className="border-2 border-dashed border-gray-300 rounded-2xl p-6 sm:p-8 text-center hover:border-gray-400 transition cursor-pointer">
                            <Upload className="w-7 h-7 text-gray-400 mx-auto mb-3" />
                            <p className="text-xs text-gray-600 font-medium">
                                {files.length === 0 ? "Drag & drop or click to upload reports, prescriptions, images..." : `${files.length} file${files.length > 1 ? "s" : ""} selected`}
                            </p>

                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl text-xs">
                                            <span className="truncate max-w-[240px]">{file.name}</span>
                                            <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="text-red-500 hover:text-red-700 p-1">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-purple-50 rounded-2xl p-5 mb-8">
                        <h3 className="text-sm font-semibold text-purple-900 mb-3">Summary</h3>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <p className="text-gray-600">Doctor</p>
                                <p className="font-medium text-gray-900">{doctorData?.name || "Dr. Sarah Johnson"}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Date & Time</p>
                                <p className="font-medium text-gray-900">{formattedDateTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button type="button" onClick={() => window.history.back()} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-2xl transition text-xs">
                            Back
                        </button>
                        <button onClick={onContinue} disabled={!reason.trim()} className={`flex-1 font-medium py-4 rounded-2xl transition shadow-md text-xs ${reason.trim() ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white" : "bg-purple-300 text-white/70 cursor-not-allowed"}`}>
                            Continue to Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Payment Step (Stripe Card Only)
function Payment({ onBackToDetails, doctorData, formattedDateTime, reason, language, files, loading, setLoading }) {
    const handlePayment = async () => {
        if (loading) return;
        console.log("formattedDateTime", formattedDateTime);


        const currentYear = new Date().getFullYear();

        // Remove "at" and add year
        const normalized = formattedDateTime
            .replace(" at ", " ")
            .concat(` ${currentYear}`);

        const date = new Date(normalized);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid formattedDateTime");
        }

        formattedDateTime = date.toISOString();

        setLoading(true);

        try {
            const { checkoutUrl } = await createAppointmentAndStripeSession({
                doctorId: doctorData?.id,
                doctorName: doctorData?.name,
                consultationReason: reason,
                language,
                files,
                selectedPaymentMethod: "card",
                dateTime: formattedDateTime,
                amount: 25.5,
            });
            window.location.href = checkoutUrl;

            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_API_KEY
            );

            const { error } = await stripe.redirectToCheckout({
                sessionId: stripeSessionId,
            });

            if (error) {
                console.error("Stripe checkout error:", error);
                alert("Stripe checkout failed. Please try again.");
            }
        } catch (err) {
            console.error("Payment error:", err);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <button onClick={onBackToDetails} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4" type="button">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-xs">Back</span>
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Payment</h1>
                    <p className="text-xs text-gray-600 mt-1">Complete payment to confirm your online consultation</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stripe Card Payment */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="bg-orange-100 p-3 rounded-xl">
                                <CreditCard className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-base font-semibold text-gray-900">Pay with Credit/Debit Card</h2>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                            <div className="flex items-start gap-3">
                                <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-blue-900">Secure Payment</p>
                                    <p className="text-xs text-blue-800 mt-1">Your payment information is encrypted and secure. We do not store card details.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 lg:sticky lg:top-8 h-fit">
                        <h3 className="text-base font-semibold text-gray-900 mb-6">Summary</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-gray-200 rounded-full border-2 border-dashed border-gray-300 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">{doctorData?.name}</p>
                                    <p className="text-xs text-gray-600">{doctorData?.specialty}</p>
                                </div>
                            </div>
                            <div className="bg-purple-50 rounded-2xl px-5 py-4">
                                <p className="text-xs text-gray-700">Date & Time</p>
                                <p className="text-sm font-semibold text-purple-700 mt-1">{formattedDateTime}</p>
                            </div>
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">Consultation Fee</p>
                                    <p className="text-xl font-bold text-purple-700">PKR 2,500</p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handlePayment}
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3.5 rounded-2xl transition shadow-lg text-sm mt-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Processing..." : "Pay PKR 2,500 & Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
