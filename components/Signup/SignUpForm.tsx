"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SignUpStep1 from "./SignUpStep1";
import SignUpStep2 from "./SignUpStep2";
import SignUpStep3 from "./SignUpStep3";
import SignUpStep4 from "./SignUpStep4";
import SignUpDoctorStep from "./SignUpDoctorStep";
import ApplicationSubmitted from "./ApplicationSubmitted";
import { setSession } from "@/auth/setSession";
import instance from "@/utils/instance";
import { toast } from "sonner";
import type { SignUpData } from "./types";

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

// Steps: 1=Personal Info, 2=Account Details, 3=Role Selection
// Patient path: 4=OTP
// Doctor path: 4=Doctor Details, 5=Application Submitted

export default function SignUpForm({
  step,
  onStepChange,
}: {
  step: number;
  onStepChange: (step: number) => void;
}) {
  const router = useRouter();
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<SignUpData>(initialData);
  const [loading, setLoading] = useState(false);

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    onStepChange(next);
  };

  const handleChange = (field: keyof SignUpData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleNext = () => {
    if (data.role === "patient") {
      handlePatientRegister();
    } else if (data.role === "doctor") {
      goTo(4);
    }
  };

  const handlePatientRegister = async () => {
        setLoading(true);

    try {
      const { data: res } = await instance.post("/api/auth/register/patient", {
        fullName: data.fullName,
        dob: data.dob,
        phone: data.phone,
        gender: data.gender,
        email: data.email,
        password: data.password,
      });

      if (!res.success) {
        toast.error(res.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Account created, go to OTP step (no session yet — tokens come after verification)
      goTo(4);
      setLoading(false);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || "Unable to connect to server");
      setLoading(false);
    }
  };

  const handleDoctorRegister = async (doctorData: {
    specialization: string;
    licenseNumber: string;
    experienceYears: number;
    consultationFee: number;
    bio: string;
    licenseFile: File | null;
    certificates: File[];
  }) => {
        setLoading(true);

    try {
      const { licenseFile, certificates, ...rest } = doctorData;

      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("dob", data.dob);
      formData.append("phone", data.phone);
      formData.append("gender", data.gender);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("specialization", rest.specialization);
      formData.append("licenseNumber", rest.licenseNumber);
      formData.append("experienceYears", String(rest.experienceYears));
      formData.append("consultationFee", String(rest.consultationFee));
      formData.append("bio", rest.bio);
      if (licenseFile) formData.append("license", licenseFile);
      certificates.forEach((f) => formData.append("certificates", f));

      const { data: res } = await instance.post("/api/auth/register/doctor", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.success) {
        toast.error(res.message || "Registration failed");
        setLoading(false);
        return;
      }

      goTo(5);
      setLoading(false);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      toast.error(axiosErr.response?.data?.message || "Unable to connect to server");
      setLoading(false);
    }
  };

  const handlePatientVerify = async (tokenData: {
    accessToken: string;
    user: { profileSlug: string };
  }) => {
    await setSession(tokenData.accessToken);
    router.push(`/patient/${tokenData.user.profileSlug}/dashboard`);
  };

  const isPatientPath = data.role === "patient";
  const isDoctorPath = data.role === "doctor";
  const isFinalStep =
    (isPatientPath && step === 4) ||
    (isDoctorPath && step === 5);
  const totalSteps = isDoctorPath ? 5 : 4;

  const stepLabel = (() => {
    if (step === 1) return "Personal Info";
    if (step === 2) return "Account Details";
    if (step === 3) return "Select Role";
    if (step === 4 && isPatientPath) return "Verification";
    if (step === 4 && isDoctorPath) return "Professional Info";
    if (step === 5) return "Submitted";
    return "";
  })();

  const heading = (() => {
    if (step <= 3) return "Let's get you started";
    if (step === 4 && isPatientPath) return "Almost there!";
    if (step === 4 && isDoctorPath) return "Professional Details";
    if (step === 5) return "Application Submitted";
    return "";
  })();

  const showBackButton = step > 1 && !isFinalStep;

  return (
    <div className="flex flex-col justify-center px-8 sm:px-10 lg:px-12 py-8 overflow-y-auto"
    style={{scrollbarWidth:"none"}}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 max-w-md mx-auto w-full">
        {!isFinalStep && (
          <>
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-500">
                Step {step} of {totalSteps}
              </span>
              <span className="text-sm font-semibold text-[#0284C7]">
                {stepLabel}
              </span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded-full mb-6">
              <div
                className="h-1 bg-[#0284C7] rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </>
        )}

        <div className="flex items-center gap-3 mb-5">
          {showBackButton && (
            <button
              onClick={() => goTo(step - 1)}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
          {!isFinalStep && (
            <h2 className="text-[24px] font-bold text-[#1E293B]">
              {heading}
            </h2>
          )}
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
                <SignUpStep1
                  data={data}
                  onChange={handleChange}
                  onNext={() => goTo(2)}
                />
              )}
              {step === 2 && (
                <SignUpStep2
                  data={data}
                  onChange={handleChange}
                  onNext={() => goTo(3)}
                />
              )}
              {step === 3 && (
                <SignUpStep3
                  data={data}
                  onChange={handleChange}
                  onNext={handleRoleNext}
                  loading={loading}
                />
              )}
              {step === 4 && isPatientPath && (
                <SignUpStep4
                  data={data}
                  onChange={handleChange}
                  onSubmit={handlePatientVerify}
                />
              )}
              {step === 4 && isDoctorPath && (
                <SignUpDoctorStep
                  onSubmit={handleDoctorRegister}
                  loading={loading}
                />
              )}
              {step === 5 && isDoctorPath && <ApplicationSubmitted />}
            </motion.div>
          </AnimatePresence>
        </div>

        {!isFinalStep && (
          <p className="text-center text-sm text-gray-500 mt-5">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#0284C7] font-semibold hover:underline"
            >
              Log In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
