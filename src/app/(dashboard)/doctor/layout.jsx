"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { checkSession } from "@/actions/checkSession";
import FullPageLoader from "@/components/layout/FullPageLoader";

export default function DashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const [checking, setChecking] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const verifySession = async () => {
            try {
                const res = await checkSession();

                if (!res.success) {
                    toast.error("Please login to continue");
                    router.replace("/login");
                    return;
                }

                // Check if user is a doctor
                if (res?.user?.role !== "doctor") {
                    toast.error("Unauthorized access. You are being redirected to your dashboard");
                    router.replace(`/${res?.user?.role}/dashboard`);
                    return;
                }

                setAuthorized(true);
            } catch (error) {
                console.error(error);
                toast.error("Session expired. Please login again");
                router.replace("/login");
            } finally {
                setChecking(false);
            }
        };

        verifySession();
    }, [router]);

    // While checking session
    if (checking) {
        return <FullPageLoader />;
    }

    // If not authorized (redirect already triggered), render nothing
    if (!authorized) {
        return null;
    }

    // Hide layout only for telehealth routes (as in your original code)
    const hideLayout = pathname?.includes("/telehealth/");

    if (hideLayout) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex flex-col lg:pl-64 min-h-screen">
                <Header />

                <main className="flex-1 px-1 py-6">
                    {children}
                </main>
            </div>
        </div>
    );
}