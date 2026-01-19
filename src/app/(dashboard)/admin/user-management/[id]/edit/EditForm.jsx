'use client';
import { useState, useEffect } from 'react';
import {
    Mail, Phone, User, Shield, MapPin, Building2, XCircle, CheckCircle,
    AlertTriangle, Camera, Settings, Activity, Lock, ClipboardList,
    UserPlus, ChevronRight, Loader2
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Image from 'next/image';
import { updateStaff, deactivateUser, requestPasswordReset } from '@/actions/user.actions';
import { getClinics } from '@/actions/clinic.actions';
import usersImg from '@/assets/admin-dashboard/edit-user.png';

function EditUserHeader({ onSave, isSubmitting }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-3 rounded-xl flex-shrink-0">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">Edit User Profile</h2>
                            <p className="text-sm text-gray-500 mt-1">Update user information and manage permissions</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                        <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-purple-600" />
                            <p className="text-sm text-gray-700">Live status</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Lock className="w-4 h-4 text-purple-600" />
                            <p className="text-sm text-gray-700">Access Control</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <ClipboardList className="w-4 h-4 text-blue-500" />
                            <p className="text-sm text-gray-700">Activity Log</p>
                        </div>
                    </div>
                </div>
                <div className="mt-8 lg:mt-0 flex flex-col sm:flex-row items-center gap-6 lg:gap-10">
                    <div className="p-6 rounded-full bg-gradient-to-br from-sky-500/10 to-cyan-500/10">
                        <Image src={usersImg} alt="User Management Illustration" className="w-32 sm:w-40 object-contain" priority />
                    </div>
                    <button
                        onClick={onSave}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium px-8 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-all hover:shadow-xl text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function EditForm({ user, userId }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeactivating, setIsDeactivating] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [clinics, setClinics] = useState([]);
    const [availableDepartments, setAvailableDepartments] = useState([]);
    const [errors, setErrors] = useState({});

    const initialFormData = {
        fullName: user?.fullName || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        role: user?.role || '',
        profilePic: null,
        profilePicPreview: user?.profilePic || null,
        workLocation: {
            clinicId: user?.staffProfile?.workLocation?.clinic?._id || '',
            departments: user?.staffProfile?.workLocation?.departments || [],
        },
        status: user?.status?.toLowerCase() || 'active',
    };

    const [formData, setFormData] = useState(initialFormData);


    const currentClinic = clinics.find((c) => c._id === formData.workLocation.clinicId);
    const currentFullAddress = currentClinic?.fullAddress || 'Not assigned';

    useEffect(() => {
        async function fetchClinicsData() {
            try {
                const response = await getClinics();
                setClinics(response.clinics || response || []);
            } catch (error) {
                toast.error('Failed to load clinics');
            }
        }
        fetchClinicsData();
    }, []);

    useEffect(() => {
        if (formData.workLocation.clinicId) {
            const selected = clinics.find((c) => c._id === formData.workLocation.clinicId);
            setAvailableDepartments(selected?.services || []);
        } else {
            setAvailableDepartments([]);
        }
    }, [formData.workLocation.clinicId, clinics]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required';
        else if (!/^\+?\d{9,15}$/.test(formData.phoneNumber.trim())) newErrors.phoneNumber = 'Invalid phone number format';
        if (!formData.role) newErrors.role = 'Please select a role';
        if (!formData.workLocation.clinicId) newErrors.clinicId = 'Please select a location';
        if (formData.workLocation.departments.length === 0) newErrors.departments = 'Select at least one department';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, checked, files, type } = e.target;

        if (name === 'profilePic') {
            const file = files?.[0];
            if (file) {
                setFormData((prev) => ({
                    ...prev,
                    profilePic: file,
                    profilePicPreview: URL.createObjectURL(file),
                }));
            }
            return;
        }

        if (name.startsWith('department-')) {
            const dept = name.replace('department-', '');
            setFormData((prev) => ({
                ...prev,
                workLocation: {
                    ...prev.workLocation,
                    departments: checked
                        ? [...new Set([...prev.workLocation.departments, dept])]
                        : prev.workLocation.departments.filter((d) => d !== dept),
                },
            }));
            return;
        }

        if (name === 'clinicId') {
            setFormData((prev) => ({
                ...prev,
                workLocation: { clinicId: value, departments: [] },
            }));
            return;
        }

        if (name === 'status') {
            setFormData((prev) => ({
                ...prev,
                status: type === 'checkbox' ? (checked ? 'active' : 'suspended') : value.toLowerCase(),
            }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSave = async () => {
        if (!validateForm()) {
            toast.error('Please fix all required fields');
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = new FormData();
            payload.append('fullName', formData.fullName.trim());
            payload.append('phoneNumber', formData.phoneNumber.trim());
            payload.append('role', formData.role);
            payload.append('clinicId', formData.workLocation.clinicId);
            payload.append('status', formData.status);
            formData.workLocation.departments.forEach((d) => payload.append('departments[]', d));
            if (formData.profilePic) payload.append('profilePic', formData.profilePic);

            const result = await updateStaff(userId, payload);
            if (result?.success) {
                toast.success('Profile updated successfully');
            } else {
                toast.error(result?.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Update error:', error);
            toast.error('Something went wrong while saving');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordReset = async () => {
        setIsResettingPassword(true);
        try {
            const result = await requestPasswordReset(userId);
            if (result?.success) {
                toast.success('Password reset link sent to user');
                setShowResetModal(false);
            } else {
                toast.error(result?.message || 'Failed to send reset link');
            }
        } catch (err) {
            toast.error('Error sending password reset request');
        } finally {
            setIsResettingPassword(false);
        }
    };

    const handleDeactivate = async () => {
        setIsDeactivating(true);
        try {
            const result = await deactivateUser(userId);
            if (result?.success) {
                toast.success('User account suspended successfully');
                setFormData((prev) => ({ ...prev, status: 'suspended' }));
                setShowDeactivateModal(false);
            } else {
                toast.error(result?.message || 'Failed to suspend user');
            }
        } catch (err) {
            toast.error('Error during account suspension');
        } finally {
            setIsDeactivating(false);
        }
    };

    const handleDiscard = () => {
        setFormData(initialFormData);
        setErrors({});
        toast.success("All changes have been discarded");
    };

    const isActive = formData.status === 'active';
    const isPending = formData.status === 'pending';
    const isSuspended = formData.status === 'suspended';
    const statusDisplay = formData.status.charAt(0).toUpperCase() + formData.status.slice(1);

    const getRolePermissions = (role) => {
        const permissions = {
            nurse: 'Access to patient records, vitals entry, medication administration, care plans, nursing notes',
            receptionist: 'Appointments scheduling, patient registration, check-in/out, queue management, basic patient information',
            billing_officer: 'Billing & invoices, payment processing, insurance claims, financial reports, receipts generation',
        };
        return permissions[role?.toLowerCase()] || 'Standard dashboard access according to role';
    };

    return (
        <>
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
            <div className="min-h-screen bg-gray-50 pb-16">
                <div className="max-w-7xl mx-auto">
                    <EditUserHeader onSave={handleSave} isSubmitting={isSubmitting} />

                    {/* Profile Header */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-gray-100 shadow-md">
                                        {formData.profilePicPreview ? (
                                            <img src={formData.profilePicPreview} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                                                {(user.fullName || '??').slice(0, 2).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 bg-white rounded-full p-2.5 shadow-lg cursor-pointer hover:bg-gray-50">
                                        <Camera className="w-5 h-5 text-gray-600" />
                                        <input type="file" name="profilePic" onChange={handleChange} className="hidden" accept="image/*" />
                                    </label>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">{user.fullName}</h1>
                                    <p className="text-gray-600 mt-1">{user.email}</p>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                                            <User className="w-3.5 h-3.5" /> {formData.role || user.role || 'No role'}
                                        </span>
                                        {formData.workLocation.departments.map((dept) => (
                                            <span key={dept} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                                {dept}
                                            </span>
                                        ))}
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${isActive ? 'bg-green-100 text-green-700' : isPending ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {statusDisplay}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center gap-4">
                                <span className={`font-medium ${isActive ? 'text-green-700' : isPending ? 'text-amber-700' : 'text-red-700'}`}>
                                    {statusDisplay}
                                </span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="status"
                                        checked={isActive}
                                        onChange={handleChange}
                                        className="sr-only peer"
                                    />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Mail className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        readOnly
                                        className="w-full pl-11 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full pl-11 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.phoneNumber ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    />
                                </div>
                                {errors.phoneNumber && <p className="mt-2 text-sm text-red-600">{errors.phoneNumber}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Role & Department Assignment */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-3 rounded-lg">
                                <Shield className="w-5 h-5 text-purple-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Role & Department Assignment</h2>
                        </div>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    User Role <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.role ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                                        }`}
                                >
                                    <option value="">Select role</option>
                                    <option value="Nurse">Nurse</option>
                                    <option value="Receptionist">Receptionist</option>
                                    <option value="Billing_officer">Billing Officer</option>
                                </select>
                                {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assigned Location <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="clinicId"
                                    value={formData.workLocation.clinicId}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.clinicId ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'
                                        }`}
                                >
                                    <option value="">Select clinic / location</option>
                                    {clinics.map((clinic) => (
                                        <option key={clinic._id} value={clinic._id}>
                                            {clinic.fullAddress || clinic.name || 'Unnamed Clinic'}
                                        </option>
                                    ))}
                                </select>
                                {errors.clinicId && <p className="mt-2 text-sm text-red-600">{errors.clinicId}</p>}
                            </div>
                            {availableDepartments.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Departments <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {availableDepartments.map((dept) => {
                                            const isChecked = formData.workLocation.departments.includes(dept);
                                            return (
                                                <label
                                                    key={dept}
                                                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${isChecked ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        name={`department-${dept}`}
                                                        checked={isChecked}
                                                        onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 rounded"
                                                    />
                                                    <span className="text-sm">{dept}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                    {errors.departments && <p className="mt-3 text-sm text-red-600">{errors.departments}</p>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Permissions & Access Control */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Shield className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">Permissions & Access Control</h2>
                        </div>
                        <div className="p-5 bg-gray-50 rounded-xl text-sm text-gray-700 leading-relaxed border border-gray-200">
                            {getRolePermissions(formData.role)}
                        </div>
                    </div>

                    {/* Reset Password & Deactivate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Lock className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-800">Reset Password</h3>
                                    <p className="text-sm text-gray-600 mt-1">Send password reset link to user</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowResetModal(true)}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <Mail className="w-4 h-4" /> Send Reset Link
                            </button>
                        </div>
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-red-100 p-3 rounded-lg">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-medium text-gray-800">Suspend Account</h3>
                                    <p className="text-sm text-gray-600 mt-1">Temporarily suspend user access</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDeactivateModal(true)}
                                disabled={isDeactivating || !isActive}
                                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <AlertTriangle className="w-4 h-4" />
                                {isDeactivating ? 'Suspending...' : 'Suspend User'}
                            </button>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                        <button
                            onClick={handleDiscard}
                            className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <XCircle className="w-5 h-5" /> Discard Changes
                        </button>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <button className="w-full sm:w-auto px-6 py-3 border border-blue-200 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                                <Activity className="w-5 h-5" /> View Activity Log
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-60 cursor-pointer"
                            >
                                <CheckCircle className="w-5 h-5" />
                                {isSubmitting ? 'Saving...' : 'Save All Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Reset Modal */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Mail className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Send Password Reset?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to send a password reset link to <strong>{user.email}</strong>?
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowResetModal(false)}
                                disabled={isResettingPassword}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordReset}
                                disabled={isResettingPassword}
                                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                            >
                                {isResettingPassword ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                                    </>
                                ) : (
                                    'Send Reset Link'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deactivate/Suspend Modal */}
            {showDeactivateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Suspend User?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to suspend <strong>{user.fullName}</strong>? This will temporarily block their access.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowDeactivateModal(false)}
                                disabled={isDeactivating}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeactivate}
                                disabled={isDeactivating}
                                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                            >
                                {isDeactivating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" /> Suspending...
                                    </>
                                ) : (
                                    'Suspend User'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}