"use client";

import Image from 'next/image';
import loginBg from '@/assets/login-bg.jpg';
import { Mail, Lock, Shield, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loginPatient } from "@/actions/patient.actions";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            return toast.error("Please fill all fields");
        }

        setLoading(true);

        const res = await loginPatient(email, password);

        setLoading(false);

        if (!res.success && res.patientId) {
            toast.error("OTP is not verified, first verify your otp. Redirecting...");

            router.push(`/otp-verify?id=${res.patientId}`);
            return;
        }

        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success("Login successful!");
        router.push("/patient/dashboard");
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-5 md:px-4">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 rounded-3xl shadow-2xl overflow-hidden">

                {/* LEFT SIDE */}
                <div className="relative h-72 md:h-auto hidden md:block">
                    <Image src={loginBg} alt="Healthcare professional" fill className="object-cover" priority />

                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,75,133,0.9)_0%,rgba(10,75,133,0.4)_100%)]" />

                    <div className="relative h-full flex flex-col justify-between p-6 text-white">

                        <div className="max-w-md">
                            <div className="flex justify-center md:justify-start mb-3">
                                <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            <h1 className="text-lg md:text-4xl font-semibold mb-2">
                                Secure Access for Healthcare Professionals
                            </h1>

                            <p className="text-sm text-[#DBEAFE] leading-relaxed">
                                Streamline patient care with our HIPAA-compliant platform.
                            </p>
                        </div>

                        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded text-[10px]">
                            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                            <span>24/7 Support Access</span>
                        </div>
                    </div>
                </div>


                {/* RIGHT SIDE FORM */}
                <div className="bg-white px-5 py-6 lg:py-8 lg:px-14 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">

                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">Welcome Back</h2>
                        <p className="text-sm text-gray-600 mb-6">Enter your credentials to access your dashboard.</p>

                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='Enter your email'
                                    className="w-full pl-9 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs
                                    focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                            </div>

                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-5 text-gray-400" />

                                <input
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Enter your password'
                                    className="w-full pl-9 pr-9 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs
                                    focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full bg-[linear-gradient(96.62deg,#0A4B85_0%,#1E6CB3_100%)]
                            text-white font-semibold py-2.5 text-xs rounded-md flex items-center justify-center gap-2
                            cursor-pointer hover:brightness-110 hover:shadow-md transition disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In</>
                            )}

                            {!loading && (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="my-4 flex items-center">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="px-3 text-[9px] text-gray-500 uppercase tracking-wider">Or</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* SSO Buttons */}
                        <div className="grid grid-cols-2 gap-2">
                            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-xs hover:bg-gray-100">
                                Google
                            </button>
                            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-xs hover:bg-gray-100">
                                Microsoft
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <p className="text-[11px] text-gray-600">
                                Don’t have an account?{" "}
                                <Link href="/register" className="font-medium text-blue-600 hover:underline">
                                    Request Access
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 bg-gray-50 py-1.5 rounded-md">
                            <Lock className="w-3 h-3" />
                            <span>HIPAA Compliant & GDPR Secure</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
