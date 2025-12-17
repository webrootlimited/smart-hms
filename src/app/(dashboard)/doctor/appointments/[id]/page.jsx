import { CheckCircle, Phone, Mail, AlertCircle, User, FileText, Download, Eye, Video, Wifi, Menu, FlipVertical } from 'lucide-react';
import Image from 'next/image';
import teleImage from "@/assets/doctor-dashboard/appointments-details-tele-image.jpg"

export default function TelehealthAppointment() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-2 sm:p-4 font-sans">
                {/* Main Container */}
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-10">

                    <div className="flex flex-col lg:flex-row bg-white gap-3 sm:gap-5 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl shadow-sm">

                        {/* LEFT SECTION */}
                        <div className="flex flex-col flex-1 gap-3 sm:gap-4">
                            {/* Header */}
                            <div>
                                <h1 className="text-lg sm:text-xl font-bold text-gray-800">Appointment Details</h1>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    Review patient information, medical history, and visit forms.
                                </p>
                            </div>

                            {/* Patient Card */}
                            <div className="flex bg-[#F0F9FF] w-full items-center gap-3 sm:gap-4 p-3 rounded-xl">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                                    JW
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold text-gray-800">James Wilson, 34</h2>
                                    <p className="text-xs sm:text-sm text-[#0369A1]">Follow-up Consultation</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div
                            className="rounded-xl p-3 sm:p-4 bg-cover bg-center bg-no-repeat flex flex-col min-h-[120px] sm:min-h-[150px]"
                            style={{
                                backgroundImage: "url('src/assets/doctor-dashboard/appointments-details-tele-image.png')"
                            }}
                        >
                            {/* Buttons Row (top aligned) */}
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                <button className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#0284C7] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition flex items-center gap-1 sm:gap-2">
                                    <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Join Telehealth</span>
                                    <span className="sm:hidden">Join</span>
                                </button>

                                <button className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#14B8A6] text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-600 transition flex items-center gap-1 sm:gap-2">
                                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                    <span className="hidden sm:inline">Mark Completed</span>
                                    <span className="sm:hidden">Complete</span>
                                </button>

                                <button className="px-2 sm:px-3 py-2 bg-gray-200 text-black rounded-lg flex items-center justify-center">
                                    <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>
                        </div>

                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

                            {/* Patient Demographics - Compact & Professional Layout */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-5">Patient Demographics</h3>

                                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">

                                    {/* LEFT SECTION */}
                                    <div className="flex-1 space-y-3 sm:space-y-4">
                                        {/* Name + Avatar */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 
                        flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                                                JW
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-base sm:text-lg">James T. Wilson</p>
                                                <p className="text-xs sm:text-sm text-gray-600">34 years old, Male</p>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 font-medium">Phone</span>
                                                <span>(555) 123-4567</span>
                                            </div>
                                        </div>

                                        {/* Emergency Contact */}
                                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 font-medium">Emergency Contact</span>
                                                <span>Sarah Wilson (Spouse) - (555) 987-6543</span>
                                            </div>
                                        </div>


                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            <span className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                                                Allergies: Penicillin
                                            </span>
                                            <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                                Chronic Condition
                                            </span>
                                            <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                                VIP Patient
                                            </span>
                                        </div>
                                    </div>

                                    {/* RIGHT SECTION */}
                                    <div className="flex flex-col gap-3 sm:gap-4 text-xs sm:text-sm items-start">
                                        {/* Patient ID */}
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />

                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 font-medium">Patient ID</span>
                                                <span>PT-8439201</span>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center gap-3 sm:gap-4">
                                            <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />

                                            <div className="flex flex-col">
                                                <span className="text-xs text-gray-500 font-medium">Email</span>
                                                <span className="break-all">james.wilson@email.com</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>



                            {/* Medical History Summary - Tight Spacing */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Medical History Summary</h3>
                                <div className="space-y-3 text-xs sm:text-sm">

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                        <div className="text-gray-500 font-medium sm:w-40">Past Diagnoses</div>
                                        <div className="font-medium text-gray-800">Hypertension, Asthma (Childhood)</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                        <div className="text-gray-500 font-medium sm:w-40">Allergies</div>
                                        <div className="font-medium text-gray-800">Penicillin, Shellfish</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                        <div className="text-gray-500 font-medium sm:w-40">Chronic Conditions</div>
                                        <div className="font-medium text-gray-800">Type 2 Diabetes (Controlled)</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                        <div className="text-gray-500 font-medium sm:w-40">Current Medications</div>
                                        <div className="font-medium text-gray-800">Metformin 500mg, Lisinopril 10mg</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                        <div className="text-gray-500 font-medium sm:w-40">Primary Physician</div>
                                        <div className="font-medium text-gray-800">Dr. Emily Carter</div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3">
                                        <div className="text-gray-500 font-medium sm:w-40">Last Visit</div>
                                        <div>
                                            <div className="font-medium text-gray-800">2025-09-15: Annual Check-up</div>
                                            <div className="text-xs text-gray-600">
                                                Blood pressure stable. A1C levels at 6.8%. Advised on diet adjustments.
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Uploaded Documents - Unchanged */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-5">Uploaded Documents</h3>
                                <div className="space-y-3 sm:space-y-4">
                                    {[
                                        { name: "Lab_Report_CBC_Oct2025.pdf", date: "2025-10-28" },
                                        { name: "Chest_XRay_Series.dcm", date: "2025-10-25" },
                                        { name: "Past_Prescriptions_2024.pdf", date: "2025-09-15" }
                                    ].map((doc) => (
                                        <div key={doc.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition gap-3">
                                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <div className="text-xs sm:text-sm font-medium text-gray-800 truncate">{doc.name}</div>
                                                    <div className="text-xs text-gray-500">Uploaded on {doc.date}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-3 justify-end sm:justify-start">
                                                <button className="text-gray-500 hover:text-gray-700">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                                <button className="text-gray-500 hover:text-gray-700">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Smaller Telehealth Card */}
                        <div className="space-y-4 sm:space-y-6">

                            <div className=" text-white bg-gradient-to-tr from-[#0284C7] to-[#075985] rounded-2xl">
                                <div className="p-3">
                                    <h3 className="text-sm sm:text-base font-bold mb-1">Telehealth Session</h3>
                                    <p className='text-gray-200 text-xs sm:text-sm'>Ready to Join</p>
                                    <div className="p-3 sm:p-5 text-center">
                                        <div className=" w-full flex items-center justify-center">
                                            <div className="text-center w-full">
                                                <div className="w-[50%] rounded mx-auto overflow-hidden">
                                                    <Image
                                                        src={teleImage}
                                                        alt="User"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex p-3 flex-col text-xs pt-3 sm:pt-5 bg-gradient-to-tr from-[#0284C7] to-[#075985] rounded-xl sm:p-5 gap-3 sm:gap-4">
                                    <button className="w-full py-2 sm:py-2.5 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition text-xs">
                                        Join Video Call
                                    </button>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <Wifi className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                            <span>Strong Connection</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                                            <span>Patient is Waiting</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pre-Visit Form */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-5">Pre-Visit Form</h3>
                                <div className="text-xs sm:text-sm space-y-2 sm:space-y-3">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-600">Filled on <strong>2025-12-07</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                        <span>Reason for visit</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                        <span>Symptoms checklist</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                        <span>Pain level: 3/10</span>
                                    </div>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                                        <span>Insurance confirmed</span>
                                    </div>
                                </div>
                                <button className="mt-4 sm:mt-5 w-full py-2 sm:py-2.5 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium rounded-lg bg-[#F0F9FF] hover:bg-gray-50 transition">
                                    View Pre-Visit Form
                                </button>
                            </div>

                            {/* Finalize Visit */}
                            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4 sm:mb-5">Finalize Visit</h3>
                                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Complete the visit to update patient records.</p>
                                <textarea
                                    placeholder="Add optional notes..."
                                    className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg text-xs sm:text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                                <button className="mt-3 sm:mt-4 w-full py-2.5 sm:py-3 bg-[#14B8A6] text-white font-semibold rounded-lg hover:bg-[#14B8A6]/80 transition flex items-center justify-center gap-2 text-xs sm:text-sm">
                                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                    Mark Visit as Completed
                                </button>
                                <div className="mt-3 flex items-center mx-auto bg-[#FEF9C3] px-3 sm:px-4 py-1 w-fit rounded-2xl justify-center gap-2 text-yellow-600 text-xs sm:text-sm font-medium">
                                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span>Pending Documentation</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}