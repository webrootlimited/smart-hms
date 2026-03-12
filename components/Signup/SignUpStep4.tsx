"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import instance from "@/utils/instance";
import type { SignUpData } from "./types";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

export default function SignUpStep4({
  data,
  onChange,
  onSubmit,
}: {
  data: SignUpData;
  onChange: (field: keyof SignUpData, value: string) => void;
  onSubmit: (tokenData: {
    accessToken: string;
    user: { profileSlug: string };
  }) => void;
}) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const updateOtp = (next: string[]) => {
    setDigits(next);
    onChange("otp", next.join(""));
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const char = value.slice(-1);
    const next = [...digits];
    next[index] = char;
    updateOtp(next);
    if (char && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    updateOtp(next);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  const handleVerify = async () => {
    const otp = digits.join("");
    if (otp.length !== OTP_LENGTH) return;

    setError("");
    setLoading(true);

    try {
      const { data: res } = await instance.post("/api/auth/verify-otp", {
        email: data.email,
        otp,
      });

      if (!res.success) {
        setError(res.message || "Verification failed");
        setLoading(false);
        return;
      }

      onSubmit({ accessToken: res.accessToken, user: res.user });
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr.response?.data?.message || "Verification failed. Please try again."
      );
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await instance.post("/api/auth/resend-otp", { email: data.email });
      setTimer(RESEND_SECONDS);
      setDigits(Array(OTP_LENGTH).fill(""));
      setError("");
      inputsRef.current[0]?.focus();
    } catch {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const maskedEmail = data.email
    ? data.email.replace(/^(.{2})(.*)(@)/, (_, a, b, c) => a + "*".repeat(b.length) + c)
    : "****@example.com";

  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-[#0284C7]" />
        </div>
      </div>
      <h3 className="text-base font-bold text-[#1E293B] mb-0.5">
        Enter Verification Code
      </h3>
      <p className="text-xs text-gray-500 mb-4">
        We&apos;ve sent a 6-digit code to{" "}
        <span className="font-medium text-[#334155]">{maskedEmail}</span>.
        <br />
        Please check your inbox.
      </p>

      {error && (
        <div className="mb-3 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
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
            onClick={handleResend}
            className="text-[#0284C7] font-semibold hover:underline cursor-pointer"
          >
            Resend code
          </button>
        )}
      </div>

      <button
        onClick={handleVerify}
        disabled={digits.some((d) => !d) || loading}
        className="w-full py-2 bg-[#0284C7] text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Verifying...
          </>
        ) : (
          <>
            Verify <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" /> Don&apos;t share this code with anyone
      </p>
    </div>
  );
}
