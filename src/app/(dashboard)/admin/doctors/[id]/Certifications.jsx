import { GraduationCap, ShieldCheck, Calendar, Download, CheckCircle } from 'lucide-react';

export default function Certifications() {
    return (
        <div className="bg-gray-50">
            <div className="space-y-6">

                {/* Certification Card */}
                {[
                    {
                        title: "Board Certification in Cardiology",
                        org: "American Board of Internal Medicine",
                        issued: "June 2015",
                        expires: "June 2025",
                    },
                    {
                        title: "Advanced Cardiac Life Support (ACLS)",
                        org: "American Heart Association",
                        issued: "January 2023",
                        expires: "January 2025",
                    },
                    {
                        title: "Interventional Cardiology Fellowship",
                        org: "Johns Hopkins Hospital",
                        issued: "July 2014",
                    },
                ].map((item, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-sm p-6">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 text-center sm:text-left">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="w-10 h-10 bg-[linear-gradient(135deg,#4F39F6_0%,#9810FA_100%)]
 rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                                    <GraduationCap className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">{item.org}</p>
                                </div>
                            </div>

                            {/* Status + Download */}
                            <div className="flex justify-center sm:justify-end items-center gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    Active
                                </span>
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                                    <Download className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <Calendar className="w-4 h-4" />
                                Issued: {item.issued}
                            </div>
                            {item.expires && (
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Expires: {item.expires}
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Bottom Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Medical License */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-3 mb-5 text-center sm:text-left">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-800">
                                Medical License
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <InfoBox label="License Number" value="MD-NY-123456789" />
                            <InfoBox label="Status" value="Active & Verified" success />
                            <InfoBox label="Expiry Date" value="December 31, 2025" />
                        </div>
                    </div>

                    {/* DEA Certificate */}
                    <div className="bg-white rounded-3xl shadow-sm p-6">
                        <div className="flex flex-col sm:flex-row items-center gap-3 mb-5 text-center sm:text-left">
                            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-purple-600" />
                            </div>
                            <h3 className="text-base font-semibold text-gray-800">
                                DEA Certificate
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <InfoBox label="DEA Number" value="BJ1234567" />
                            <InfoBox label="Status" value="Valid" success />
                            <InfoBox label="Expiry Date" value="March 15, 2026" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* Reusable Info Box */
function InfoBox({ label, value, success }) {
    return (
        <div className={`rounded-2xl p-4 ${success ? 'bg-green-50' : 'bg-blue-50'}`}>
            <p className="text-xs text-gray-600 mb-1">{label}</p>
            <p className={`text-sm font-medium flex items-center gap-1 ${success ? 'text-green-700' : 'text-gray-900'}`}>
                {success && <CheckCircle className="w-4 h-4" />}
                {value}
            </p>
        </div>
    );
}
