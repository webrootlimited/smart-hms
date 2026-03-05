"use client";

import { useState } from "react";
import SignUpLeft from "./SignUpLeft";
import SignUpForm from "./SignUpForm";

export default function SignUpMain() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex justify-center items-center min-h-screen bg-">
      <div className="w-full max-w-275 grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden h-[calc(100vh-4rem)]">
        {/* Left — Marketing (steps 1-3) or OTP illustration (step 4) */}
        <div className="hidden lg:block">
          {step < 4 ? (
            <SignUpLeft />
          ) : (
            <div className="flex items-center justify-center h-full p-8">
              <img
                src="/auth/otp.png"
                alt="Verification"
                className="w-full max-w-sm object-contain"
              />
            </div>
          )}
        </div>

        {/* Right — Form */}
        <SignUpForm step={step} onStepChange={setStep} />
      </div>
    </div>
  );
}
