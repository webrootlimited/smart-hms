import { CheckCircle2, Video, Calendar, Clock, FileText, Home, Download, AlertCircle } from 'lucide-react';

export default function PaymentSuccess() {
    return (
        <>
            <div className="min-h-screen bg-gray-50 px-4 py-8 flex items-center justify-center">
                <div className="w-full max-w-2xl">
                    {/* Success Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
                            <CheckCircle2 className="w-9 h-9 text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
                            <CheckCircle2 className="w-7 h-7 text-green-600" />
                            Payment Successful!
                        </h1>
                        <p className="text-xs text-gray-600 mt-2">
                            Your online consultation is confirmed
                        </p>
                    </div>

                    {/* Main Confirmation Card */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8">
                        {/* Video Call Link Section */}
                        <div className="bg-purple-50 rounded-2xl p-6 text-center">
                            <Video className="w-7 h-7 text-purple-600 mx-auto mb-3" />
                            <p className="text-xs font-medium text-gray-700 mb-2">
                                Video Consultation Link
                            </p>
                            <p className="text-xs text-purple-700 font-medium break-all">
                                https://meet.hospital.com/abc-123-def
                            </p>
                            <p className="text-xs text-gray-500 mt-3 bg-gray-100 inline-block px-4 py-2 rounded-full">
                                Join Call (Available 10 mins before appointment)
                            </p>
                        </div>

                        {/* Appointment Details */}
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-orange-100 p-3 rounded-xl">
                                    <FileText className="w-5 h-5 text-orange-600" />
                                </div>
                                <h2 className="text-base font-semibold text-gray-900">
                                    Appointment Details
                                </h2>
                            </div>

                            {/* Doctor Info */}
                            <div className="bg-gray-50 rounded-2xl p-5 flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full border-2 border-dashed border-gray-300 flex-shrink-0" />
                                <div>
                                    <p className="text-xs font-medium text-gray-900">Doctor</p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Dr. Sarah Johnson
                                    </p>
                                    <p className="text-xs text-gray-600">Cardiology</p>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                    <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                                    <p className="text-xs text-gray-600">Date</p>
                                    <p className="text-xs font-semibold text-gray-900">
                                        Thursday, January 1
                                    </p>
                                </div>
                                <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                    <Clock className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                                    <p className="text-xs text-gray-600">Time</p>
                                    <p className="text-xs font-semibold text-gray-900">10:00 AM</p>
                                </div>
                            </div>

                            {/* Payment Status & Amount */}
                            <div className="bg-green-50 rounded-2xl p-5 mt-5 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    <div>
                                        <p className="text-xs text-gray-600">Payment Status</p>
                                        <p className="text-sm font-semibold text-green-700">Paid</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-600">Amount</p>
                                    <p className="text-lg font-bold text-green-700">PKR 2500</p>
                                </div>
                            </div>
                        </div>

                        {/* Important Instructions */}
                        <div className="bg-blue-50 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-5 h-5 text-blue-700" />
                                <h3 className="text-sm font-semibold text-blue-900">
                                    Important Instructions
                                </h3>
                            </div>
                            <ul className="space-y-2 text-xs text-blue-800">
                                <li>• Join the call 5 minutes before your appointment time</li>
                                <li>• Ensure stable internet connection for video call</li>
                                <li>• Doctor will initiate the video consultation</li>
                                <li>• Digital prescription will be sent after consultation</li>
                                <li>• Typical consultation duration: 15 minutes</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-2xl transition text-xs">
                                <Calendar className="w-4 h-4" />
                                Add to Calendar
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-4 rounded-2xl transition text-xs">
                                <Download className="w-4 h-4" />
                                Download Receipt
                            </button>
                            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-2xl transition shadow-md flex items-center justify-center gap-2 text-xs">
                                <Home className="w-4 h-4" />
                                Done
                            </button>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <p className="text-center text-xs text-gray-500 mt-8">
                        Confirmation email sent with video call link and instructions
                    </p>
                </div>
            </div>
        </>
    );
}