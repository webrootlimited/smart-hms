"use client";

import Image from 'next/image';
import loginBg from '@/assets/otp-verify.jpg';
import { Shield, CheckCircle, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

// Placeholder server actions
import { verifyOtp, resendOtp } from "@/actions/patient.actions";

export default function OTPVerificationPage() {
    const router = useRouter();
    const params = useSearchParams();
    const patientId = params.get("id");
    console.log(patientId);


    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const inputsRef = useRef([]);

    // Handle OTP input
    const handleChange = (value, index) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) inputsRef.current[index + 1].focus();
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const digits = paste.split("");
        setCode([...digits, ...Array(6).fill("")].slice(0, 6));
        inputsRef.current[Math.min(paste.length, 5)].focus();
    };

    // Submit OTP
    const handleSubmit = async () => {
        if (code.some(d => !d)) return toast.error("Please enter all 6 digits");

        setLoading(true);
        try {
            const otp = code.join("");
            const res = await verifyOtp(patientId, otp); // Replace with your server action
            if (!res.success) return toast.error(res.message || "OTP verification failed");

            toast.success("OTP verified successfully!");
            router.push("/patient/dashboard");
        } catch (err) {
            toast.error("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // Resend OTP
    const handleResend = async () => {
        setResendLoading(true);
        try {
            const res = await resendOtp(patientId); // Replace with your server action
            if (!res.success) return toast.error(res.message || "Failed to resend OTP");
            toast.success("OTP resent successfully!");
        } catch (err) {
            toast.error("Something went wrong.");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full py-10 max-w-4xl grid md:grid-cols-2 gap-0 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden">

                {/* LEFT IMAGE SIDE */}
                <div className="relative hidden md:block h-auto">
                    <Image src={loginBg} alt="Healthcare professional" fill className="object-cover" priority />

                </div>

                {/* RIGHT FORM SIDE */}
                <div className="bg-white px-6 py-10 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
                        <p className="text-sm text-[#64748B] text-left mb-8">
                            We've sent a 6-digit code to your email****@example.com. Please check your inbox.
                        </p>

                        {/* OTP Inputs */}
                        <div className="flex justify-center gap-2 sm:gap-4 mb-8" onPaste={handlePaste}>
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    ref={(el) => (inputsRef.current[index] = el)}
                                    className="w-10 h-8 sm:w-12 sm:h-12 text-center text-2xl font-bold text-gray-900 bg-white rounded-xl border-2 border-[#0000004D] focus:border-blue-600 focus:bg-white focus:outline-none transition-all"
                                    autoFocus={index === 0}
                                    disabled={loading}
                                />
                            ))}
                        </div>

                        <div className='flex justify-between mt-10'>
                            {/* <p className='text-sm'>Resend OTP in <span className='text-[#0EA5E9CC]'>60 sec</span></p> */}
                            {/* Resend OTP */}
                            <button
                                onClick={handleResend}
                                disabled={resendLoading}
                                className="text-sm text-blue-700 hover:underline disabled:text-gray-400 mb-6 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {resendLoading ? "Resending..." : "Resend OTP"}
                            </button>
                        </div>

                        {/* Verify Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={loading || code.some((d) => !d)}
                            className="w-full bg-[linear-gradient(96.62deg,#0A4B85_0%,#1E6CB3_100%)]
              text-white font-semibold text-sm py-2.5 rounded-md flex items-center justify-center gap-2 transition shadow-md mb-4 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Verify OTP
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>



                        {/* Footer */}
                        <p className="text-center mt-2 text-gray-600 text-sm">
                            Dont share this code
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
