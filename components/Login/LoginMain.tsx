"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { setSession } from "@/auth/setSession";
import instance from "@/utils/instance";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const LoginMain = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(0);
  const [otpLoading, setOtpLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  useEffect(() => {
    if (showOtp) {
      inputsRef.current[0]?.focus();
    }
  }, [showOtp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await instance.post("/api/auth/login", {
        email,
        password,
      });

      if (!data.success) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      await setSession(data.accessToken);

      const { role, profileSlug } = data.user;
      if (role === "ADMIN" || role === "CLINIC_ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "DOCTOR") {
        router.push(`/doctor/${profileSlug}/dashboard`);
      } else if (role === "PATIENT") {
        router.push(`/patient/${profileSlug}/dashboard`);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr.response?.data?.message || "Unable to connect to server"
      );
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    try {
      await instance.post("/api/auth/resend-otp", { email });
      setShowOtp(true);
      setDigits(Array(OTP_LENGTH).fill(""));
      setTimer(RESEND_SECONDS);
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const char = value.slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (char && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    inputsRef.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) return;

    setError("");
    setOtpLoading(true);

    try {
      const { data } = await instance.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      if (!data.success) {
        setError(data.message || "Verification failed");
        setOtpLoading(false);
        return;
      }

      // OTP verified — set session and redirect
      await setSession(data.accessToken);

      const { role, profileSlug } = data.user;
      if (role === "ADMIN" || role === "CLINIC_ADMIN") {
        router.push("/admin/dashboard");
      } else if (role === "DOCTOR") {
        router.push(`/doctor/${profileSlug}/dashboard`);
      } else if (role === "PATIENT") {
        router.push(`/patient/${profileSlug}/dashboard`);
      } else {
        router.push("/");
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr.response?.data?.message || "Verification failed. Please try again."
      );
      setOtpLoading(false);
    }
  };

  const isEmailNotVerified = error === "Please verify your email before logging in";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 ">
      <div className="w-full max-w-275 grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl sm:shadow-xl overflow-hidden h-[calc(100vh-4rem)]">
        {/* Image Side */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/auth/login.png')" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0A4B85E5 0%, #0A4B8566 100%)",
            }}
          />

          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <img src="/auth/shield.png" alt="" className="w-7 h-7" />
            </div>
            <h2 className="text-3xl font-bold leading-tight mt-3 text-white">
              Secure Access for Healthcare Professionals
            </h2>
            <p className="mt-3 text-[#DBEAFE] text-[18px] leading-relaxed">
              Streamline patient care with our HIPAA-compliant platform designed
              for modern medical teams.
            </p>
          </div>

          <div className="relative z-10 text-white bg-[#FFFFFF1A] rounded-[10px]">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg w-max">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-white">24/7 Support Access</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-6 relative">
          <div className="absolute top-0 right-0">
            <img src="/auth/overlay.png" alt="" />
          </div>
          <div>
            <h1 className="text-[30px] font-bold text-[#0F172A]">
              Welcome Back
            </h1>
            <p className="mt-1 text-[#64748B] ">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              <p>{error}</p>
              {isEmailNotVerified && !showOtp && (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="mt-2 text-[#0284C7] font-semibold hover:underline cursor-pointer text-sm"
                >
                  Resend Verification Code
                </button>
              )}
            </div>
          )}

          {showOtp ? (
            <div className="mt-5 text-center">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#0284C7]" />
                </div>
              </div>
              <h3 className="text-base font-bold text-[#1E293B] mb-0.5">
                Enter Verification Code
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                We&apos;ve sent a 6-digit code to your email.
              </p>

              <div className="flex justify-center gap-2 mb-4" onPaste={handleOtpPaste}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputsRef.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-10 h-11 text-center text-base font-bold border-2 border-gray-200 rounded-xl focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="text-xs text-gray-500 mb-3">
                {timer > 0 ? (
                  <span>
                    Resend OTP in{" "}
                    <span className="font-semibold text-[#0284C7]">
                      {String(Math.floor(timer / 60)).padStart(2, "0")}:
                      {String(timer % 60).padStart(2, "0")}
                    </span>
                  </span>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-[#0284C7] font-semibold hover:underline cursor-pointer"
                  >
                    Resend code
                  </button>
                )}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={digits.some((d) => !d) || otpLoading}
                className="w-full py-2.5 bg-[#0284C7CC] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {otpLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Sign In <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                onClick={() => { setShowOtp(false); setError(""); }}
                className="mt-3 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                Back to login
              </button>
            </div>
          ) : (
          <>
          <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#334155] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hms.com"
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#0A4B85] focus:ring-2 focus:ring-[#0A4B85]/10 transition-all duration-200 placeholder:text-gray-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mt-2 ">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-[#334155]">
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-[#0284C7CC] hover:text-[#0A4B85]/80 font-medium transition"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#0A4B85] focus:ring-2 focus:ring-[#0A4B85]/10 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#0284C7CC] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 cursor-pointer text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                <path d="M11 0H0v11h11V0z" fill="#F25022" />
                <path d="M23 0H12v11h11V0z" fill="#7FBA00" />
                <path d="M11 12H0v11h11V12z" fill="#00A4EF" />
                <path d="M23 12H12v11h11V12z" fill="#FFB900" />
              </svg>
              <span className="text-sm font-medium text-gray-700">
                Microsoft
              </span>
            </button>
          </div>

          {/* Sign Up link */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#0A4B85] font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* HIPAA badge */}
          <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            HIPAA Compliant & GDPR Secure
          </p>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
