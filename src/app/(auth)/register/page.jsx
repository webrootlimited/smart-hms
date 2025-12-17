"use client";

import { useState } from "react";
import {
    User,
    Calendar,
    phoneNumber,
    Mail,
    Lock,
    ChevronRight,
    Star,
    Shield,
    FileText,
    Loader2
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import maleImg from "@/assets/male.png";
import femaleImg from "@/assets/female.png";
import toast from "react-hot-toast";
import { registerPatient } from "@/actions/patient.actions";

export default function PatientSignup() {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Step 1 state
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");

    // Step 2 state
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // VALIDATION HELPERS
    const validatephoneNumber = (phoneNumber) => /^[0-9]{10,15}$/.test(phoneNumber);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,15}$/.test(password);

    const handleStep1Continue = () => {
        if (!fullName || !dob || !phoneNumber) {
            toast.error("Please fill all fields");
            return;
        }

        if (!validatephoneNumber(phoneNumber)) {
            toast.error("phoneNumber must be 10–15 digits only");
            return;
        }

        setStep(2);
    };

    const handleStep2Continue = async () => {
        if (!gender || !email || !password) {
            toast.error("All fields are required");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Invalid email format");
            return;
        }

        if (!validatePassword(password)) {
            toast.error("Password must be 6–15 chars and contain uppercase, lowercase & number");
            return;
        }

        try {
            setLoading(true);

            const res = await registerPatient({
                fullName,
                dob,
                phoneNumber,
                gender,
                email,
                password,
            });

            if (!res.success) {
                toast.error(res.message || "Registration failed");
                setLoading(false);
                return;
            }

            toast.success("Registration successful! Redirecting...");
            router.push(`/otp-verify?id=${res.patientId}`);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 relative overflow-x-hidden">

            {/* Background circle */}
            <div className="absolute -top-32 -left-20 w-[500px] h-[500px] bg-[#DBEAFE] opacity-50 rounded-full blur-[64px] mix-blend-multiply z-0" />

            <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-16 relative z-10">

                {/* LEFT SIDE */}
                <div className="space-y-8 w-full lg:w-1/2 flex flex-col items-start px-4 lg:px-0">
                    <div className="relative w-full max-w-md">
                        <div className="absolute -top-5 -left-4 w-8 h-8 bg-[#FEF9C3] rounded-full flex items-center justify-center shadow-md z-10">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold leading-snug">
                            Your Health Journey{" "}
                            <span className="text-[#0EA5E9]">Starts Here</span>
                        </h1>
                        <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
                            Join thousands of patients who trust MediCare Connect for
                            secure, seamless, and personalized healthcare management.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: <Shield className="w-5 h-5 text-green-600" />,
                                title: "Bank-Level Security",
                                desc: "Your medical data is encrypted with HIPAA-compliant protocols."
                            },
                            {
                                icon: <Calendar className="w-5 h-5 text-blue-600" />,
                                title: "Easy Scheduling",
                                desc: "Book appointments with specialists in just a few clicks."
                            },
                            {
                                icon: <FileText className="w-5 h-5 text-purple-600" />,
                                title: "Digital Records",
                                desc: "Access your lab results and prescriptions anytime."
                            }
                        ].map((f, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="w-9 h-9 bg-[#FAF5FF] rounded-xl flex items-center justify-center">
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{f.title}</h3>
                                    <p className="text-xs text-gray-600 mt-1">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT FORM CARD */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full lg:w-[380px]">

                    {/* STEP PROGRESS */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-semibold ${step === 1 ? "text-[#0EA5E9]" : "text-gray-400"}`}>
                                Step 1
                            </span>
                            <span className={`text-xs font-semibold ${step === 2 ? "text-[#0EA5E9]" : "text-gray-400"}`}>
                                Step 2
                            </span>
                        </div>

                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0EA5E9] transition-all duration-300"
                                style={{ width: step === 1 ? "50%" : "100%" }}
                            ></div>
                        </div>
                    </div>

                    {step === 1 && (
                        <>
                            {/* Full Name */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="e.g. John Doe"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs"
                                    />
                                </div>
                            </div>

                            {/* DOB */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Date of Birth</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs"
                                    />
                                </div>
                            </div>

                            {/* phoneNumber */}
                            <div className="mb-5">
                                <label className="block text-xs font-medium text-gray-700 mb-1">phoneNumber Number</label>
                                <div className="relative">
                                    <phoneNumber className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setphoneNumber(e.target.value)}
                                        placeholder="10–15 digits"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={handleStep1Continue}
                                className="w-full bg-[#0EA5E9] text-white text-xs font-semibold py-3 rounded-md flex items-center justify-center gap-2 cursor-pointer"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            {/* Gender */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                <div className="flex gap-6">
                                    <button
                                        onClick={() => setGender("Male")}
                                        className={`flex flex-col items-center w-1/2 rounded border-2 ${gender === "Male" ? "border-blue-500" : "border-gray-200"} p-2`}
                                    >
                                        <Image src={maleImg} alt="Male" width={40} height={40} />
                                        <span className="text-xs font-medium">Male</span>
                                    </button>

                                    <button
                                        onClick={() => setGender("Female")}
                                        className={`flex flex-col items-center w-1/2 rounded border-2 ${gender === "Female" ? "border-pink-500" : "border-gray-200"} p-2`}
                                    >
                                        <Image src={femaleImg} alt="Female" width={40} height={40} />
                                        <span className="text-xs font-medium">Female</span>
                                    </button>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                        className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="6–15 chars, A-Z, a-z, 0-9"
                                        className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                                    />
                                </div>
                            </div>

                            {/* REGISTER BUTTON */}
                            <button
                                onClick={handleStep2Continue}
                                disabled={loading}
                                className="w-full bg-[#0EA5E9] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Register <ChevronRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </>
                    )}

                    {/* LOGIN LINK */}
                    <p className="text-center mt-6 text-xs text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-[#0EA5E9] hover:underline font-medium">
                            Log In
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
