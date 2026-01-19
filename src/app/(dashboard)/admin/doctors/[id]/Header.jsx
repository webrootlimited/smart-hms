'use client';

import {
    Mail,
    Phone,
    MapPin,
    IdCard,
    Calendar,
    TrendingUp,
    Video,
    Star,
    Pencil,
    Power,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    Eye,
    Stethoscope, Building2
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { deactivateUser, activateUser } from '@/actions/user.actions';

export default function Header({ userData, isEditMode, setIsEditMode }) {
    const [showSuspendModal, setShowSuspendModal] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const status = (userData?.status || '').toLowerCase();
    const isSuspended = status === 'suspended';

    console.log(userData);

    const toggleEditMode = () => setIsEditMode(!isEditMode);

    const handleActionClick = () => {
        setShowSuspendModal(true);
    };

    const confirmAction = async () => {
        if (!userData?._id) {
            toast.error('Doctor ID missing');
            setShowSuspendModal(false);
            return;
        }

        setIsPending(true);

        try {
            let result;
            if (isSuspended) {
                result = await activateUser(userData._id);
                if (result?.success) {
                    toast.success('Account activated successfully');
                    // Update local status (optimistic)
                    userData.status = 'Active';
                } else {
                    toast.error(result?.error || 'Failed to activate');
                }
            } else {
                result = await deactivateUser(userData._id);
                if (result?.success) {
                    toast.success('Account disabled/suspended');
                    userData.status = 'Suspended';
                } else {
                    toast.error(result?.error || 'Failed to disable');
                }
            }
        } catch (err) {
            console.error(err);
            toast.error('Something went wrong');
        } finally {
            setIsPending(false);
            setShowSuspendModal(false);
        }
    };

    return (
        <div className="bg-gray-50 flex justify-center">
            <div className="w-full">
                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                    {/* Top Section with Background Curve */}
                    <div className="relative w-full pb-8">
                        {/* Decorative Circle */}
                        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200 rounded-full opacity-50 -translate-y-1/2 translate-x-1/3"></div>

                        <div className="relative z-10 pt-6 px-4 sm:px-6 lg:px-8">
                            {/* Back Button */}
                            <button className="mb-6 p-2 rounded-lg bg-white shadow hover:shadow-md transition">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                                        {userData?.profilePic ? (
                                            <img
                                                src={userData.profilePic}
                                                alt={userData?.fullName || 'Doctor'}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            userData?.fullName
                                                ?.split(' ')
                                                .map(word => word[0])
                                                .join('')
                                        )}
                                    </div>

                                    {/* Online / Active Indicator */}
                                    <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white rounded-full"></div>
                                    </div>
                                </div>


                                {/* Provider Info */}
                                <div className="flex-1 w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                        <div className="w-full sm:w-auto">
                                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
                                                {userData?.fullName}
                                                <span className="flex items-center gap-1 text-yellow-500 text-lg sm:text-base">
                                                    <Star className="w-5 h-5 fill-current" />
                                                    0
                                                </span>
                                            </h1>
                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                {/* Specializations */}
                                                {userData?.doctorProfile?.specialities?.length > 0 && (
                                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <Stethoscope className="w-4 h-4" />
                                                        {userData.doctorProfile.specialities.join(', ')}
                                                    </span>
                                                )}

                                                {/* Departments / Locations */}
                                                {userData?.doctorProfile?.workLocations?.length > 0 && (
                                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <Building2 className="w-4 h-4" />
                                                        {userData.doctorProfile.workLocations
                                                            .map((location) => location.department)
                                                            .join(', ')}
                                                    </span>
                                                )}

                                                {/* Board Certification */}
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${userData?.doctorProfile?.medicalLicense
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    {userData?.doctorProfile?.medicalLicense
                                                        ? 'Board Certified'
                                                        : 'Not Board Certified'}
                                                </span>
                                            </div>

                                            <div className="mt-3 flex flex-col gap-3 text-sm text-gray-600">
                                                <div className='flex flex-col sm:flex-row sm:gap-10 gap-2'>
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="w-4 h-4" />
                                                        {userData?.email}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="w-4 h-4" />
                                                        {userData?.phoneNumber}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:gap-10 gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        {userData?.doctorProfile?.workLocations?.[0]?.clinic?.fullAddress || 'Not specified'}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <IdCard className="w-4 h-4" />
                                                        {userData?.doctorProfile?.employeeId || 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons – style unchanged, only text/icon/logic updated */}
                                        <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-0">
                                            <button
                                                onClick={toggleEditMode}
                                                className="px-4 sm:px-5 cursor-pointer py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition flex items-center gap-2"
                                            >
                                                {isEditMode ? (
                                                    <>
                                                        <Eye className="w-4 h-4" />
                                                        View Profile
                                                    </>
                                                ) : (
                                                    <>
                                                        <Pencil className="w-4 h-4" />
                                                        Edit Profile
                                                    </>
                                                )}
                                            </button>

                                            <button
                                                onClick={handleActionClick}
                                                disabled={isPending}
                                                className={`
                                                    px-4 sm:px-5 py-2 cursor-pointer rounded-full text-sm font-medium transition flex items-center gap-2
                                                    ${isSuspended
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                `}
                                            >
                                                {isPending ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : isSuspended ? (
                                                    <>
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        Activate
                                                    </>
                                                ) : (
                                                    <>
                                                        <Power className="w-4 h-4" />
                                                        Disable
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section – unchanged */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 -mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-50 rounded-2xl p-4 text-center">
                                <Calendar className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                                <p className="text-xl font-semibold text-gray-900">{userData.doctorProfile?.patients?.lenght || "0"}</p>
                                <p className="text-xs text-gray-600 mt-1">Patients Served</p>
                            </div>

                            <div className="bg-green-50 rounded-2xl p-4 text-center">
                                <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-2" />
                                <p className="text-xl font-semibold text-gray-900">0</p>
                                <p className="text-xs text-gray-600 mt-1">Attendance Rate</p>
                            </div>

                            <div className="bg-purple-50 rounded-2xl p-4 text-center">
                                <Video className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                                <p className="text-xl font-semibold text-gray-900">0</p>
                                <p className="text-xs text-gray-600 mt-1">Virtual Visits</p>
                            </div>

                            <div className="bg-orange-50 rounded-2xl p-4 text-center">
                                <Star className="w-5 h-5 text-orange-600 mx-auto mb-2 fill-current" />
                                <p className="text-xl font-semibold text-gray-900">0</p>
                                <p className="text-xs text-gray-600 mt-1">Avg Rating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal – placed at the end, style matches your app's aesthetic */}
            {showSuspendModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-full ${isSuspended ? 'bg-green-100' : 'bg-red-100'}`}>
                                {isSuspended ? (
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                ) : (
                                    <AlertTriangle className="w-6 h-6 text-red-600" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">
                                {isSuspended ? 'Activate Doctor Account?' : 'Disable Doctor Account?'}
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to{' '}
                            <strong>{isSuspended ? 'activate' : 'disable'}</strong>{' '}
                            <strong>{userData?.fullName || 'this doctor'}</strong>?
                            <br />
                            {isSuspended
                                ? 'They will be able to log in and accept appointments again.'
                                : 'This will prevent them from logging in or accepting appointments.'}
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowSuspendModal(false)}
                                disabled={isPending}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAction}
                                disabled={isPending}
                                className={`px-5 py-2.5 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer ${isSuspended
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                                    }`}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {isSuspended ? 'Activating...' : 'Disabling...'}
                                    </>
                                ) : (
                                    isSuspended ? 'Activate Account' : 'Disable Account'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}