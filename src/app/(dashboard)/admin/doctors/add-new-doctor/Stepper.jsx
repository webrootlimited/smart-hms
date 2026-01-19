"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
    CheckCircle2,
    X,
    FileText,
    ShieldCheck,
    GraduationCap,
    Pill,
    PenTool,
} from "lucide-react";
import toast from "react-hot-toast";

import PersonalInfoSetup from "./PersonalInfoStep";
import WorkAndScheduleSetup from "./WorkAndScheduleSetup";
import CredentialsSetup from "./CredentialsSetup";
import Loader from "@/components/layout/Loader";
import { getUserDetails } from "@/actions/user.actions";
import Link from "next/link";

/* ------------------ CONSTANTS ------------------ */
const STEPS = [
    { key: "personal-info", label: "Personal Info" },
    { key: "schedule-setup", label: "Schedule & Work" },
    { key: "credentials-setup", label: "Credentials" },
];

export default function DoctorRegistrationForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const stepParam = searchParams.get("step");
    const id = searchParams.get("id");

    const currentStep =
        STEPS.find(s => s.key === stepParam)?.key || "personal-info";

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    /* ------------------ FETCH USER DETAILS ------------------ */
    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                setLoading(true);
                const data = await getUserDetails(id);

                if (data.success) {
                    setUserData(data.user);
                } else {
                    toast.error(data.error);
                }
            } catch (error) {
                console.error("Failed to load user", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    /* ------------------ FORCE FIRST STEP IF NO ID ------------------ */
    useEffect(() => {
        if (!id && currentStep !== "personal-info") {
            router.replace("?step=personal-info");
        }
    }, [id, currentStep, router]);

    /* ------------------ DERIVED COMPLETED STEPS ------------------ */
    const completedSteps = useMemo(() => {
        const completed = new Set();

        // 1. Personal Info
        if (id) {
            completed.add("personal-info");
        }

        const profile = userData?.doctorProfile;
        if (!profile) return completed;

        // 2. Schedule & Work
        if (
            Array.isArray(profile.workLocations) &&
            profile.workLocations.length > 0
        ) {
            completed.add("schedule-setup");
        }

        // 3. Credentials
        const hasCredentials =
            profile.medicalLicense &&
            Array.isArray(profile.certifications) &&
            profile.certifications.length > 0;

        if (hasCredentials) {
            completed.add("credentials-setup");
        }

        return completed;
    }, [id, userData]);

    /* ------------------ NAVIGATION HELPERS ------------------ */
    const goToStep = useCallback(
        (stepKey) => {
            const query = new URLSearchParams();
            query.set("step", stepKey);
            if (id) query.set("id", id);
            router.push(`?${query.toString()}`);
        },
        [id, router]
    );

    const handleCancel = () => {
        router.push("?step=personal-info");
    };

    /* ------------------ RENDER STEP ------------------ */
    const renderStep = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader />
                </div>
            );
        }

        switch (currentStep) {
            case "personal-info":
                return (
                    <PersonalInfoSetup
                        id={id}
                        userData={userData}
                        onComplete={(returnedId) => {
                            if (returnedId && !id) {
                                router.replace(`?step=schedule-setup&id=${returnedId}`);
                                return;
                            }
                            goToStep("schedule-setup");
                        }}
                    />
                );

            case "schedule-setup":
                return (
                    <WorkAndScheduleSetup
                        id={id}
                        userData={userData}
                        onComplete={() => {
                            goToStep("credentials-setup");
                        }}
                    />
                );

            case "credentials-setup":
                return (
                    <CredentialsSetup
                        id={id}
                        userData={userData}
                        onComplete={() => { }}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* LEFT – STEP CONTENT */}
                <div className="md:col-span-2">
                    {renderStep()}
                </div>

                {/* RIGHT – SIDEBAR */}
                <div className="md:col-span-1 space-y-6">

                    {/* Progress Card */}
                    <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center mb-6">
                            <CheckCircle2 className="h-8 w-8 mr-3" />
                            <h3 className="text-xl font-semibold">
                                Registration Summary
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {STEPS.map(step => (
                                <div
                                    key={step.key}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-blue-100">
                                        {step.label}
                                    </span>
                                    <span
                                        className={`px-4 py-1 rounded-full text-sm ${completedSteps.has(step.key)
                                            ? "bg-green-500"
                                            : "bg-blue-500 bg-opacity-50"
                                            }`}
                                    >
                                        {completedSteps.has(step.key)
                                            ? "Completed"
                                            : "Pending"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* <button
                            onClick={handleCancel}
                            className="w-full mt-6 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                        >
                            <X className="h-5 w-5" />
                            Cancel
                        </button> */}

                        {/* View Doctor – only if all steps completed */}
                        {completedSteps.size === STEPS.length && id && (
                            <Link
                                href={`/admin/doctors/${id}`}
                                className="w-full mt-6 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                View Doctor
                            </Link>
                        )}

                    </div>

                    {/* Required Documents */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center mb-4">
                            <FileText className="h-6 w-6 text-blue-600 mr-3" />
                            <h3 className="text-lg font-semibold">
                                Required Documents
                            </h3>
                        </div>

                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" /> Medical License
                            </li>
                            <li className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" /> Board Certification
                            </li>
                            <li className="flex items-center gap-2">
                                <Pill className="h-5 w-5" /> DEA Certificate
                            </li>
                            <li className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" /> Malpractice Insurance
                            </li>
                            <li className="flex items-center gap-2">
                                <PenTool className="h-5 w-5" /> Digital Signature
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
