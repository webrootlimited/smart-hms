"use client";
import { useState } from "react";
import {
    User,
    Calendar,
    Phone,
    Mail,
    Lock,
    ChevronRight,
    ChevronLeft,
    Star,
    Shield,
    FileText,
    Loader2,
    UserPlus,
    Stethoscope
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import maleImg from "@/assets/male.png";
import femaleImg from "@/assets/female.png";
import patientImg from "@/assets/patient.jpg";
import doctorImg from "@/assets/doctor.jpg";
import toast from "react-hot-toast";
import { register } from "@/actions/user.actions";

export default function UserSignup() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Step 1 state - Personal Info
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Step 2 state - Gender, Email, Password
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Step 3 state - Role
    const [role, setRole] = useState("");

    // VALIDATION HELPERS
    const validatePhoneNumber = (phone) => /^[0-9]{10,15}$/.test(phone);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,15}$/.test(password);

    const handleStep1Continue = () => {
        if (!fullName.trim() || !dob || !phoneNumber.trim()) {
            toast.error("Please fill all fields");
            return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            toast.error("Phone number must be 10–15 digits only");
            return;
        }
        setStep(2);
    };

    const handleStep2Continue = () => {
        if (!gender || !email.trim() || !password.trim()) {
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
        setStep(3);
    };

    const handleStep2Back = () => {
        setStep(1);
    };

    const handleStep3Continue = async () => {
        if (!role) {
            toast.error("Please select your role");
            return;
        }

        try {
            setLoading(true);
            const res = await register({
                fullName: fullName.trim(),
                dob,
                phoneNumber: phoneNumber.trim(),
                role,
                gender,
                email: email.trim(),
                password: password.trim(),
            });

            if (!res.success) {
                toast.error(res.message || "Registration failed");
                setLoading(false);
                return;
            }

            toast.success("Registration successful! Redirecting...");
            router.push(`/otp-verify?id=${res.userId}`);
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleStep3Back = () => {
        setStep(2);
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
                            Join thousands of users who trust MediCare Connect for
                            secure, seamless, and personalized healthcare management.
                        </p>
                    </div>
                    {/* Features - removed dynamic role text since role is now selected last */}
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
                                desc: "Book and manage appointments effortlessly."
                            },
                            {
                                icon: <FileText className="w-5 h-5 text-purple-600" />,
                                title: "Digital Records",
                                desc: "Access medical records and history securely anytime."
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
                            <span className={`text-xs font-semibold ${step === 3 ? "text-[#0EA5E9]" : "text-gray-400"}`}>
                                Step 3
                            </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#0EA5E9] transition-all duration-300"
                                style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
                            ></div>
                        </div>
                    </div>

                    {/* STEP 1 - Personal Info */}
                    {step === 1 && (
                        <>
                            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Personal Information</h2>
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
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
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
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                                    />
                                </div>
                            </div>
                            {/* Phone Number */}
                            <div className="mb-6">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        placeholder="10–15 digits"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleStep1Continue}
                                className="w-full bg-[#0EA5E9] hover:bg-blue-600 text-white text-xs font-semibold py-3 rounded-md flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    {/* STEP 2 - Gender, Email, Password */}
                    {step === 2 && (
                        <>

                            {/* Gender */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setGender("male")}
                                        className={`flex flex-col items-center w-full p-1 rounded-lg border-2 transition-all duration-200 cursor-pointer ${gender === "male"
                                            ? "border-blue-500 bg-blue-50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                            }`}
                                    >
                                        <Image src={maleImg} alt="Male" width={30} height={30} className="mb-2 rounded-full" />
                                        <span className="text-sm font-medium">Male</span>
                                    </button>
                                    <button
                                        onClick={() => setGender("female")}
                                        className={`flex flex-col items-center w-full p-1 rounded-lg border-2 transition-all duration-200 cursor-pointer ${gender === "female"
                                            ? "border-pink-500 bg-pink-50 shadow-md"
                                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                            }`}
                                    >
                                        <Image src={femaleImg} alt="Female" width={30} height={30} className="mb-2 rounded-full" />
                                        <span className="text-sm font-medium">Female</span>
                                    </button>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-8">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="6–15 chars, A-Z, a-z, 0-9"
                                        className="w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleStep2Back}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200 border border-gray-200 cursor-pointer"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    onClick={handleStep2Continue}
                                    className="flex-1 bg-[#0EA5E9] hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200 cursor-pointer"
                                >
                                    Continue <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    )}

                    {/* STEP 3 - Role Selection */}
                    {step === 3 && (
                        <>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">Are you a Patient or Doctor?</label>
                                <div className="flex gap-6 justify-center">
                                    {/* Patient */}
                                    <button
                                        onClick={() => setRole("patient")}
                                        className={`flex flex-col items-center p-4 rounded-xl border-2 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${role === "patient"
                                            ? "border-green-500 bg-green-50 ring-2 ring-green-200"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-md border">
                                            <Image
                                                src={patientImg || "/default-patient.png"}
                                                alt="Patient"
                                                width={48}
                                                height={48}
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <UserPlus className="w-6 h-6 text-green-600 mb-2" />
                                        <span className="text-sm font-semibold text-gray-900">Patient</span>

                                    </button>

                                    {/* Doctor */}
                                    <button
                                        onClick={() => setRole("doctor")}
                                        className={`flex flex-col items-center p-4 rounded-xl border-2 shadow-sm transition-all duration-200 cursor-pointer hover:shadow-md ${role === "doctor"
                                            ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-md border">
                                            <Image
                                                src={doctorImg || "/default-doctor.png"}
                                                alt="Doctor"
                                                width={48}
                                                height={48}
                                                className="rounded-lg "
                                            />
                                        </div>
                                        <Stethoscope className="w-6 h-6 text-blue-600 mb-2" />
                                        <span className="text-sm font-semibold text-gray-900">Doctor</span>

                                    </button>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleStep3Back}
                                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200 border border-gray-200 cursor-pointer"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    onClick={handleStep3Continue}
                                    disabled={loading}
                                    className="flex-1 bg-[#0EA5E9] hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm transition-all duration-200 cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        <>
                                            Create Account <ChevronRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}

                    {/* LOGIN LINK */}
                    <p className="text-center mt-6 text-xs text-gray-600 pt-4 border-t border-gray-100">
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