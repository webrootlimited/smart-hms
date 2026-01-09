import {
    User,
    Mail,
    Phone,
    Home,
    Briefcase,
    Calendar,
    Clock,
    Edit2,
    CheckCircle,
} from 'lucide-react';

export default function PersonalInfo() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">

                {/* Four Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                Basic Information
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Edit2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Full Name</span>
                                <span className="font-medium text-gray-900">Dr. Sarah Johnson</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Date of Birth</span>
                                <span className="font-medium text-gray-900">March 15, 1985</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Gender</span>
                                <span className="font-medium text-gray-900">Female</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Age</span>
                                <span className="font-medium text-gray-900">38 years</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Employee ID</span>
                                <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    EMP-12345
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-purple-600" />
                                </div>
                                Contact Information
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Edit2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-blue-50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs text-gray-500">Email Address</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">sarah.johnson@hospital.com</p>
                            </div>

                            <div className="bg-purple-50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <Phone className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs text-gray-500">Phone Number</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">+1 (555) 123-4567</p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <Phone className="w-4 h-4 text-green-600" />
                                    <span className="text-xs text-gray-500">Emergency Contact</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">+1 (555) 987-6543</p>
                            </div>

                            <div className="bg-yellow-50 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-1">
                                    <Home className="w-4 h-4 text-yellow-600" />
                                    <span className="text-xs text-gray-500">Home Address</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    123 Medical Plaza, Suite 450<br />
                                    New York, NY 10001
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Details */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                </div>
                                Professional Details
                            </h3>
                        </div>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Specialty</span>
                                <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                    Cardiologist
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Department</span>
                                <span className="font-medium text-gray-900">Cardiology</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Years of Experience</span>
                                <span className="font-medium text-gray-900">12 years</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Join Date</span>
                                <span className="font-medium text-gray-900">January 15, 2018</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Employment Status</span>
                                <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                    Full-Time
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Professional Bio */}
                    <div className="bg-white rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-pink-600" />
                                </div>
                                Professional Bio
                            </h3>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                                <Edit2 className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-5">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in cardiovascular medicine.
                                She specializes in interventional cardiology and has performed over 500 successful procedures.
                                Dr. Johnson is passionate about patient care and education.
                            </p>

                            <div>
                                <span className="text-xs text-gray-500 mb-2 block">Specializations</span>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        Interventional Cardiology
                                    </span>
                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        Echocardiography
                                    </span>
                                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                                        Heart Failure
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}