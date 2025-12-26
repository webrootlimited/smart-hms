import React from "react";
import { Users, Clock, CheckCircle } from "lucide-react";

export default function Header() {
    return (
        <div className="bg-white rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between px-4 sm:px-6 py-6 gap-6">

                {/* LEFT SECTION */}
                <div className="space-y-6 w-full">

                    {/* Title */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
                            Nurse Dashboard
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Manage patient flow and pre-consultation workflows
                        </p>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        {/* Patients Today */}
                        <div className="bg-green-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-green-700">8</div>
                                <div className="text-sm text-green-700">Patients Today</div>
                            </div>
                        </div>

                        {/* Pending Vitals */}
                        <div className="bg-orange-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-orange-700">3</div>
                                <div className="text-sm text-orange-700">Pending Vitals</div>
                            </div>
                        </div>

                        {/* Ready for Doctor */}
                        <div className="bg-blue-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
                            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-blue-700">5</div>
                                <div className="text-sm text-blue-700">Ready for Doctor</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* RIGHT SIDE (Hidden on small screens) */}
                <div className="hidden lg:block w-1/3">
                    {/* img */}
                </div>
            </div>
        </div>
    );
}
