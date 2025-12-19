"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    // If route contains /telehealth → hide sidebar + header
    const hideLayout = pathname?.includes("/telehealth") || pathname?.includes("/profile") || pathname?.includes("/messages") || pathname?.includes("/book-appointment") || pathname?.includes("/payments");

    if (hideLayout) {
        return <>{children}</>; // show ONLY page content
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
