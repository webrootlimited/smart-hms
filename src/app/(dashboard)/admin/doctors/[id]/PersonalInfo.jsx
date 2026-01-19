'use client';
import { useState } from 'react';
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
    Save,
    X,
    Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { updateDoctorPersonalInfo } from '@/actions/doctor.actions';

export default function PersonalInfo({ userData, isEditMode, setIsEditMode }) {
    const [formData, setFormData] = useState({
        fullName: userData?.fullName || '',
        dob: userData?.dob?.toString().slice(0, 10) || '',
        gender: userData?.gender || '',
        email: userData?.email || '',
        phoneNumber: userData?.phoneNumber || '',
        emergencyContact: userData?.emergencyContact || '',
        address: userData?.homeAddress || userData?.address || '',
        employeeId: userData?.doctorProfile?.employeeId || '',
        specialities: Array.isArray(userData?.doctorProfile?.specialities)
            ? userData.doctorProfile.specialities.join(', ')
            : userData?.doctorProfile?.specialities || '',
        department: Array.isArray(userData?.doctorProfile?.workLocations)
            ? userData.doctorProfile.workLocations.map((wl) => wl.department).join(', ')
            : 'Cardiology',
        yearsOfExperience: userData?.doctorProfile?.yearsOfExperience || '',
        startDate: userData?.doctorProfile?.startDate?.toString().slice(0, 10) || '',
        employmentStatus: userData?.doctorProfile?.employmentStatus || 'Full-Time',
        bio: userData?.doctorProfile?.bio || '',
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName?.trim()) {
            newErrors.fullName = 'Full Name is required';
        }

        if (!formData.email?.trim()) {
            newErrors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                newErrors.email = 'Invalid email format';
            }
        }

        if (!formData.phoneNumber?.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (formData.phoneNumber.replace(/\D/g, '').length < 10) {
            newErrors.phoneNumber = 'Must contain at least 10 digits';
        }

        if (!formData.specialities?.trim()) {
            newErrors.specialities = 'At least one specialty is required';
        }

        if (!formData.startDate?.trim()) {
            newErrors.startDate = 'Start Date is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                doctorId: userData?._id,
                fullName: formData.fullName.trim(),
                dob: formData.dob || undefined,
                gender: formData.gender,
                email: formData.email.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                emergencyContact: formData.emergencyContact?.trim() || '',
                address: formData.address?.trim() || '',
                employeeId: formData.employeeId?.trim() || '',
                specialities: formData.specialities
                    .split(',')
                    .map(s => s.trim())
                    .filter(Boolean),
                department: formData.department,
                yearsOfExperience: Number(formData.yearsOfExperience) || 0,
                startDate: formData.startDate,
                employmentStatus: formData.employmentStatus,
                bio: formData.bio?.trim() || '',
            };
            console.log(payload);
            const result = await updateDoctorPersonalInfo(userData?._id, payload);

            if (result?.success) {
                toast.success('Personal information updated successfully');
                setErrors({});
            } else {
                toast.error(result?.message || 'Failed to update information');
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong while saving');
        } finally {
            setIsSaving(false);
        }
    };

    const Field = ({ label, name, value, type = 'text', placeholder = '', readOnly = false }) => {
        if (!isEditMode) {
            return (
                <div className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-medium text-gray-900">
                        {value || '—'}
                    </span>
                </div>
            );
        }

        if (readOnly) {
            return (
                <div className="space-y-1">
                    <label className="block text-xs text-gray-500">{label}</label>
                    <input
                        type={type}
                        value={value || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-sm cursor-not-allowed"
                    />
                </div>
            );
        }

        return (
            <div className="space-y-1">
                <label className="block text-xs text-gray-500">{label}</label>
                <input
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${errors[name]
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                        }`}
                />
                {errors[name] && (
                    <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
                )}
            </div>
        );
    };

    const calculatedAge = formData.dob
        ? new Date().getFullYear() - new Date(formData.dob).getFullYear() + ' years'
        : '—';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">
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
                        </div>
                        <div className="space-y-4 text-sm text-gray-600">
                            <Field label="Full Name" name="fullName" value={formData.fullName} />
                            <Field
                                label="Date of Birth"
                                name="dob"
                                value={formData.dob}
                                type="date"
                            />
                            <Field label="Gender" name="gender" value={formData.gender} />
                            <Field label="Age" value={calculatedAge} readOnly={true} />
                            <Field label="Employee ID" name="employeeId" value={formData.employeeId} />
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
                        </div>
                        <div className="space-y-4">
                            <div className={isEditMode ? '' : 'bg-blue-50 rounded-xl p-4'}>
                                {isEditMode ? (
                                    <Field label="Email Address" name="email" value={formData.email} />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-1">
                                            <Mail className="w-4 h-4 text-blue-600" />
                                            <span className="text-xs text-gray-500">Email Address</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{formData.email || '—'}</p>
                                    </>
                                )}
                            </div>
                            <div className={isEditMode ? '' : 'bg-purple-50 rounded-xl p-4'}>
                                {isEditMode ? (
                                    <Field label="Phone Number" name="phoneNumber" value={formData.phoneNumber} />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-1">
                                            <Phone className="w-4 h-4 text-purple-600" />
                                            <span className="text-xs text-gray-500">Phone Number</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{formData.phoneNumber || '—'}</p>
                                    </>
                                )}
                            </div>
                            <div className={isEditMode ? '' : 'bg-green-50 rounded-xl p-4'}>
                                {isEditMode ? (
                                    <Field
                                        label="Emergency Contact"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                    />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-1">
                                            <Phone className="w-4 h-4 text-green-600" />
                                            <span className="text-xs text-gray-500">Emergency Contact</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{formData.emergencyContact || '—'}</p>
                                    </>
                                )}
                            </div>
                            <div className={isEditMode ? '' : 'bg-yellow-50 rounded-xl p-4'}>
                                {isEditMode ? (
                                    <Field label="Address" name="address" value={formData.address} />
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-1">
                                            <Home className="w-4 h-4 text-yellow-600" />
                                            <span className="text-xs text-gray-500">Address</span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900 whitespace-pre-line">
                                            {formData.address || '—'}
                                        </p>
                                    </>
                                )}
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
                            <Field label="Specialties" name="specialities" value={formData.specialities} placeholder="Comma-separated" />
                            <Field label="Department" name="department" value={formData.department} readOnly={true} />
                            <Field
                                label="Years of Experience"
                                name="yearsOfExperience"
                                value={formData.yearsOfExperience}
                                type="number"
                            />
                            <Field
                                label="Start Date"
                                name="startDate"
                                value={formData.startDate}
                                type="date"
                            />
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Employment Status</span>
                                {isEditMode ? (
                                    <select
                                        name="employmentStatus"
                                        value={formData.employmentStatus}
                                        onChange={handleInputChange}
                                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Full-Time">Full-Time</option>
                                        <option value="Part-Time">Part-Time</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                ) : (
                                    <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                                        {formData.employmentStatus || 'Full-Time'}
                                    </span>
                                )}
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
                        </div>
                        <div className="space-y-5">
                            {isEditMode ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                                    placeholder="Write a short professional bio..."
                                />
                            ) : (
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {formData.bio || 'No bio available.'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {isEditMode && (
                    <div className="mt-8 flex justify-end gap-4">
                        <button
                            onClick={() => setIsEditMode(false)}
                            className="px-6 cursor-pointer py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 cursor-pointer py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-60 shadow-md"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}