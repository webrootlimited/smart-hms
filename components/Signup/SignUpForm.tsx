"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import SignUpStep4 from "./SignUpStep4";
import type { SignUpData } from "./types";

const totalSteps = 4;

const initialData: SignUpData = {
  fullName: "",
  dob: "",
  phone: "",
  gender: "",
  email: "",
  password: "",
  role: "",
  otp: "",
};

export default function SignUpForm({
  step,
  onStepChange,
}: {
  step: number;
  onStepChange: (step: number) => void;
}) {
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<SignUpData>(initialData);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    onStepChange(next);
  };

  const handleChange = (field: keyof SignUpData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Sign Up Data:", data);
  };

  return (
    <div className="flex flex-col justify-center px-8 sm:px-10 lg:px-12 py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 max-w-md mx-auto w-full">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </span>
          <span className="text-sm font-semibold text-[#0284C7]">
            {step === 1 ? "Personal Info" : step === 2 ? "Account Details" : step === 3 ? "Select Role" : "Verification"}
          </span>
        </div>
        <div className="w-full h-1 bg-gray-100 rounded-full mb-6">
          <div
            className="h-1 bg-[#0284C7] rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="flex items-center gap-3 mb-5">
          {step > 1 && (
            <button
              onClick={() => goTo(step - 1)}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
          <h2 className="text-[24px] font-bold text-[#1E293B]">
            Let&apos;s get you started
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ x: direction * 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -60, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {step === 1 && (
                <SignUpStep1 data={data} onChange={handleChange} onNext={() => goTo(2)} />
              )}
              {step === 2 && (
                <SignUpStep2 data={data} onChange={handleChange} onNext={() => goTo(3)} />
              )}
              {step === 3 && (
                <SignUpStep3 data={data} onChange={handleChange} onNext={() => goTo(4)} />
              )}
              {step === 4 && (
                <SignUpStep4 data={data} onChange={handleChange} onSubmit={handleSubmit} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0284C7] font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
