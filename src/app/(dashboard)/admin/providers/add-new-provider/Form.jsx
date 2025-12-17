import {
    User,
    Briefcase,
    Clock,
    Upload,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Building,
    Stethoscope,
    IdCard,
    Coffee,
    FileText,
    ShieldCheck,
    GraduationCap,
    Pill,
    PenTool,
    CheckCircle2,
    X,
} from 'lucide-react';

export default function Form() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form Sections */}
                <div className="md:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <User className="h-6 w-6 text-blue-600 mr-3" />
                            <h2 className="text-base md:text-lg font-semibold text-gray-800">
                                Personal Information
                            </h2>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 mb-6">
                            Basic details about the provider
                        </p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm md:text-base text-gray-700 mb-2">
                                    Profile Photo
                                </label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <label className="cursor-pointer px-5 py-3 border border-gray-300 rounded text-sm md:text-base text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <Upload className="h-5 w-5" />
                                        Upload Photo
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg,image/png,image/gif"
                                        />
                                    </label>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    JPG, PNG or GIF. Max size 2MB.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="John"
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Doe"
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            defaultValue="john.doe@hospital.com"
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            defaultValue="+1 (555) 123-4567"
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">
                                        Date of Birth
                                    </label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">
                                        Gender
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded text-sm md:text-base">
                                        <option>Select</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Work Setup */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <Briefcase className="h-6 w-6 text-purple-600 mr-3" />
                            <h2 className="text-base md:text-lg font-semibold text-gray-800">Work Setup</h2>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 mb-6">Department, specialty, and locations</p>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Department *</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input type="text" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Specialty *</label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="e.g., Cardiologist"
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm md:text-base text-gray-700 mb-2">Work Locations *</label>
                                <div className="space-y-2">
                                    {['Main Hospital - 123 Medical Center Dr', 'North Branch - 456 North Ave', 'South Branch - 789 South Blvd', 'Telehealth Only - Virtual'].map((loc) => (
                                        <div key={loc} className="flex items-center bg-blue-50 border border-blue-300 rounded-lg px-4 py-3 text-sm md:text-base">
                                            <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                                            {loc}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Employee ID *</label>
                                    <div className="relative">
                                        <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            defaultValue="EMP-12345"
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Start Date *</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input type="date" className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Setup */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <Clock className="h-6 w-6 text-green-600 mr-3" />
                            <h2 className="text-base md:text-lg font-semibold text-gray-800">Schedule Setup</h2>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 mb-5">Weekly working hours and breaks</p>

                        <div className="space-y-6">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                <div key={day} className="space-y-2">
                                    <span className="block text-sm md:text-base font-medium text-gray-700">{day}</span>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <input
                                            type="time"
                                            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                        <span className="text-sm md:text-base text-gray-500 px-2 sm:px-0">to</span>
                                        <input
                                            type="time"
                                            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                            ))}

                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <Coffee className="h-5 w-5 text-orange-600" />
                                    <label className="text-sm md:text-base font-medium text-gray-700">Lunch Break</label>
                                </div>
                                <div className="bg-yellow-50 px-4 py-4 rounded-lg space-y-3 sm:space-y-0">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                        <input
                                            type="time"
                                            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                        <span className="text-sm md:text-base text-gray-500 px-2 sm:px-0">to</span>
                                        <input
                                            type="time"
                                            className="w-full sm:w-40 px-4 py-2 border border-gray-300 rounded text-sm md:text-base"
                                        />
                                    </div>
                                    <span className="block text-sm md:text-base font-medium text-orange-700 mt-2 sm:mt-0">
                                        1 hour break
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 text-white">
                        <div className="flex items-center mb-6">
                            <CheckCircle2 className="h-8 w-8 mr-3" />
                            <h3 className="text-xl font-semibold">Registration Summary</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Personal Info</span>
                                <span className="bg-blue-500 bg-opacity-50 px-4 py-1 rounded-full text-sm">Pending</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Work Setup</span>
                                <span className="bg-blue-500 bg-opacity-50 px-4 py-1 rounded-full text-sm">Pending</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Schedule</span>
                                <span className="bg-blue-500 bg-opacity-50 px-4 py-1 rounded-full text-sm">Pending</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Credentials</span>
                                <span className="bg-blue-500 bg-opacity-50 px-4 py-1 rounded-full text-sm">Pending</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-blue-100">Telehealth</span>
                                <span className="bg-gray-500 bg-opacity-50 px-4 py-1 rounded-full text-sm">Disabled</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition">
                                <FileText className="h-5 w-5" />
                                Save as Draft
                            </button>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition font-medium">
                                <CheckCircle2 className="h-5 w-5" />
                                Register Provider
                            </button>
                            <button className="w-full border border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition">
                                <X className="h-5 w-5" />
                                Cancel
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <FileText className="h-6 w-6 text-blue-600 mr-3" />
                            <h3 className="text-base md:text-lg font-semibold text-gray-800">Required Documents</h3>
                        </div>
                        <ul className="space-y-3 text-sm md:text-base text-gray-600">
                            <li className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-gray-500" />
                                Medical license (current)
                            </li>
                            <li className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5 text-gray-500" />
                                Board certification
                            </li>
                            <li className="flex items-center gap-2">
                                <Pill className="h-5 w-5 text-gray-500" />
                                DEA certificate (if applicable)
                            </li>
                            <li className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-gray-500" />
                                Malpractice insurance
                            </li>
                            <li className="flex items-center gap-2">
                                <PenTool className="h-5 w-5 text-gray-500" />
                                Digital signature sample
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}