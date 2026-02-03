'use client';

import React, { useState, useEffect } from 'react';
import {
    Clock,
    FileText,
    Upload,
    CheckSquare,
    Users,
    DollarSign,
    Home,
    Video,
    Calendar,
    Loader2,
    CheckCircle,
    XCircle,
    Building2,
    Laptop,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { updateAppointmentType } from '@/actions/appointmentType.actions';
import { getDoctors } from '@/actions/doctor.actions';

export default function AppointmentTypeForm({ isEditMode = false, appointmentType = null }) {
    console.log(appointmentType);

    const [formData, setFormData] = useState({
        typeName: '',
        description: '',
        duration: '15 minutes',
        requiredDocuments: [],
        visitType: '',
        preVisitForms: [],
        eligibleDoctors: [],
        fee: { currency: 'USD', amount: 0 },
        status: 'active',
    });

    const [newDoc, setNewDoc] = useState('');
    const [newForm, setNewForm] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const defaultFormOptions = [
        'Medical History',
        'Consent Form',
        'Privacy Agreement',
        'Allergy Information',
        'Current Medications',
        'Emergency Contact',
    ];

    // Fetch doctors list
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await getDoctors();
                if (res.success && res.doctors) {
                    setDoctors(res.doctors);
                }
            } catch { }
        };
        fetchDoctors();
    }, []);

    // Prefill form in edit mode
    useEffect(() => {
        if (isEditMode && appointmentType) {
            setFormData({
                typeName: appointmentType.typeName || '',
                description: appointmentType.description || '',
                duration: appointmentType.duration || '15 minutes',
                requiredDocuments: Array.isArray(appointmentType.requiredDocuments)
                    ? appointmentType.requiredDocuments
                    : [],
                visitType: appointmentType.visitType || '',
                preVisitForms: Array.isArray(appointmentType.preVisitForms)
                    ? appointmentType.preVisitForms
                    : [],
                eligibleDoctors: appointmentType.eligibleDoctors || [],
                fee: {
                    currency: appointmentType.fee?.currency || 'USD',
                    amount: appointmentType.fee?.amount || 0,
                },
                status: appointmentType.status || 'active',
            });
        }
    }, [isEditMode, appointmentType]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.typeName.trim()) newErrors.typeName = 'Type name is required';
        if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
        if (!formData.visitType) newErrors.visitType = 'Please select a visit type';
        if (formData.eligibleDoctors.length === 0) newErrors.eligibleDoctors = 'Select at least one provider';
        if (!formData.fee.currency) newErrors.currency = 'Currency is required';
        if (formData.fee.amount <= 0) newErrors.feeAmount = 'Fee amount must be greater than 0';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (submitStatus) => {
        if (!validateForm()) {
            toast.error('Please complete all required fields');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...formData,
                typeName: formData.typeName.trim(),
                description: formData.description.trim(),
                duration: formData.duration.trim(),
                requiredDocuments: formData.requiredDocuments,
                visitType: formData.visitType,
                preVisitForms: formData.preVisitForms,
                eligibleDoctors: formData.eligibleDoctors.map((d) => d._id),
                fee: formData.fee,
                status: submitStatus,
            };

            if (isEditMode && appointmentType?._id) {
                payload._id = appointmentType._id;
            }

            const res = await updateAppointmentType(appointmentType._id, payload);

            if (res.success) {
                toast.success(
                    isEditMode
                        ? 'Appointment type updated successfully'
                        : submitStatus === 'active'
                            ? 'Appointment type created successfully'
                            : 'Appointment type saved as draft'
                );
            } else {
                toast.error(res.message || (isEditMode ? 'Update failed' : 'Save failed'));
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const toggleDoctor = (doctor) => {
        setFormData((prev) => {
            const exists = prev.eligibleDoctors.some((d) => d._id === doctor._id);
            return {
                ...prev,
                eligibleDoctors: exists
                    ? prev.eligibleDoctors.filter((d) => d._id !== doctor._id)
                    : [...prev.eligibleDoctors, doctor],
            };
        });
    };

    const togglePreVisitForm = (formName) => {
        setFormData((prev) => {
            if (prev.preVisitForms.includes(formName)) {
                return { ...prev, preVisitForms: prev.preVisitForms.filter((n) => n !== formName) };
            }
            return { ...prev, preVisitForms: [...prev.preVisitForms, formName] };
        });
    };

    const addCustomForm = () => {
        if (!newForm.trim()) return;
        const name = newForm.trim();
        if (formData.preVisitForms.includes(name)) return;
        setFormData((prev) => ({ ...prev, preVisitForms: [...prev.preVisitForms, name] }));
        setNewForm('');
    };

    const addDocument = () => {
        if (!newDoc.trim()) return;
        const name = newDoc.trim();
        if (formData.requiredDocuments.includes(name)) return;
        setFormData((prev) => ({ ...prev, requiredDocuments: [...prev.requiredDocuments, name] }));
        setNewDoc('');
    };

    const removeDocument = (docName) => {
        setFormData((prev) => ({
            ...prev,
            requiredDocuments: prev.requiredDocuments.filter((d) => d !== docName),
        }));
    };

    const handleAmountKeyDown = (e) => {
        if (e.key === '0' && (!formData.fee.amount || formData.fee.amount === 0)) {
            e.preventDefault();
        }
    };

    // Read-only View (when !isEditMode)
    const renderReadOnlyView = () => {
        if (!appointmentType) {
            return (
                <div className="p-6 text-center text-gray-500">
                    No appointment type data available
                </div>
            );
        }

        const data = appointmentType;

        return (
            <div className="min-h-screen bg-gray-50 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">


                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Basic Information */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <FileText className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-medium text-gray-700">Type Name</label>
                                            <p className="mt-1 text-sm text-gray-900 font-medium">{data.typeName || '—'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700">Description</label>
                                            <p className="mt-1 text-sm text-gray-700">{data.description || 'No description provided'}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-700">Duration</label>
                                            <div className="mt-1 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{data.duration || '—'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Required Documents */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-orange-100 rounded-lg">
                                            <Upload className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Required Documents</h3>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {data.requiredDocuments?.length > 0 ? (
                                            data.requiredDocuments.map((doc, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2"
                                                >
                                                    <Upload className="w-3 h-3" />
                                                    {doc}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">None required</p>
                                        )}
                                    </div>
                                </div>

                                {/* Visit Type */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Visit Type</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-300">
                                        {data.visitType === 'In-Clinic' && <Home className="w-5 h-5 text-gray-600" />}
                                        {data.visitType === 'Telehealth' && <Video className="w-5 h-5 text-gray-600" />}
                                        {data.visitType === 'Both' && (
                                            <div className="flex items-center gap-2">
                                                <Home className="w-5 h-5 text-blue-600" />
                                                <Video className="w-5 h-5 text-blue-600" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium">{data.visitType || 'Not set'}</p>
                                            <p className="text-xs text-gray-500">
                                                {data.visitType === 'In-Clinic'
                                                    ? 'Physical visit at hospital'
                                                    : data.visitType === 'Telehealth'
                                                        ? 'Virtual video consultation'
                                                        : data.visitType === 'Both'
                                                            ? 'Patient can choose either'
                                                            : ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Pre-Visit Forms */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-pink-100 rounded-lg">
                                            <CheckSquare className="w-5 h-5 text-pink-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Pre-Visit Forms</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {data.preVisitForms?.length > 0 ? (
                                            data.preVisitForms.map((form, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 bg-gray-50"
                                                >
                                                    <FileText className="w-5 h-5 text-gray-500" />
                                                    <span className="text-sm text-gray-700">{form}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No pre-visit forms required</p>
                                        )}
                                    </div>
                                </div>

                                {/* Provider Eligibility */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <Users className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Provider Eligibility</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        {data.eligibleDoctors?.length > 0 ? (
                                            data.eligibleDoctors.map((doc, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 bg-gray-50"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                                                        {(doc.name || '?')[0].toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{doc.name || 'Unknown'}</p>
                                                        <p className="text-xs text-gray-500">{doc.specialty || '—'}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No providers assigned</p>
                                        )}
                                    </div>
                                </div>

                                {/* Fee */}
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Fee</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 bg-gray-50">
                                        <span className="text-sm font-medium text-gray-900">
                                            {data.fee?.amount > 0 ? `${data.fee.amount} ${data.fee.currency || 'USD'}` : 'Free / Not set'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Edit Form (full form - when isEditMode = true)
    const renderEditForm = () => (
        <div className="min-h-screen bg-gray-50 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">


                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Basic Information */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
                                        <p className="text-xs text-gray-500">Define the appointment type details</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-700">
                                            Type Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.typeName}
                                            onChange={(e) => setFormData({ ...formData, typeName: e.target.value })}
                                            placeholder="e.g., General Checkup"
                                            className={`mt-1 w-full px-3 py-2 text-sm border ${errors.typeName ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        />
                                        {errors.typeName && <p className="text-xs text-red-500 mt-1">{errors.typeName}</p>}
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-700">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Brief description of this appointment type..."
                                            rows={3}
                                            className="mt-1 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-medium text-gray-700">
                                            Duration <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1 relative">
                                            <Clock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={formData.duration}
                                                readOnly
                                                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Required Documents */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-orange-100 rounded-lg">
                                        <Upload className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Required Documents</h3>
                                        <p className="text-xs text-gray-500">Pre-visit documents patients must upload</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {formData.requiredDocuments.map((doc, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-2"
                                        >
                                            <Upload className="w-3 h-3" />
                                            {doc}
                                            <button
                                                onClick={() => removeDocument(doc)}
                                                className="ml-1 text-yellow-600 hover:text-yellow-800"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={newDoc}
                                        onChange={(e) => setNewDoc(e.target.value)}
                                        placeholder="Add document requirement..."
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={addDocument}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>

                            {/* Visit Type */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Calendar className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Visit Type <span className="text-red-500">*</span>
                                        </h3>
                                        <p className="text-xs text-gray-500">How will the appointment be conducted?</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {['In-Clinic', 'Telehealth', 'Both'].map((opt) => (
                                        <label
                                            key={opt}
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:border-blue-500 transition-all ${formData.visitType === opt ? 'border-2 border-blue-500 bg-blue-50' : 'border-gray-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                checked={formData.visitType === opt}
                                                onChange={() => setFormData({ ...formData, visitType: opt })}
                                                className="text-blue-600"
                                            />
                                            {opt === 'In-Clinic' && <Home className="w-5 h-5 text-gray-600" />}
                                            {opt === 'Telehealth' && <Video className="w-5 h-5 text-gray-600" />}
                                            {opt === 'Both' && (
                                                <div className="flex items-center gap-2">
                                                    <Home className="w-5 h-5 text-blue-600" />
                                                    <Video className="w-5 h-5 text-blue-600" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium">{opt}</p>
                                                <p className="text-xs text-gray-500">
                                                    {opt === 'In-Clinic'
                                                        ? 'Physical visit at hospital'
                                                        : opt === 'Telehealth'
                                                            ? 'Virtual video consultation'
                                                            : 'Patient can choose either'}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                {errors.visitType && <p className="text-xs text-red-500 mt-2">{errors.visitType}</p>}
                            </div>

                            {/* Pre-Visit Forms */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-pink-100 rounded-lg">
                                        <CheckSquare className="w-5 h-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">Pre-Visit Forms</h3>
                                        <p className="text-xs text-gray-500">Forms patients must complete before appointment</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {[...defaultFormOptions, ...formData.preVisitForms.filter((name) => !defaultFormOptions.includes(name))].map(
                                        (formName) => {
                                            const isSelected = formData.preVisitForms.includes(formName);
                                            return (
                                                <div
                                                    key={formName}
                                                    onClick={() => togglePreVisitForm(formName)}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${isSelected ? 'border-pink-500 bg-pink-50' : 'border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <FileText className={`w-5 h-5 ${isSelected ? 'text-pink-600' : 'text-gray-500'}`} />
                                                    <span className="text-sm text-gray-700">
                                                        {formName}
                                                        {!defaultFormOptions.includes(formName) && (
                                                            <span className="text-xs text-gray-400 ml-1">(custom)</span>
                                                        )}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={newForm}
                                        onChange={(e) => setNewForm(e.target.value)}
                                        placeholder="Add custom form name..."
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={addCustomForm}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
                                    >
                                        + Add
                                    </button>
                                </div>
                            </div>

                            {/* Provider Eligibility */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Users className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Provider Eligibility <span className="text-red-500">*</span>
                                        </h3>
                                        <p className="text-xs text-gray-500">Select providers who can perform this appointment</p>
                                    </div>
                                </div>
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {doctors.map((doctor) => (
                                        <label
                                            key={doctor._id}
                                            onClick={() => toggleDoctor(doctor)}
                                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${formData.eligibleDoctors.some((d) => d._id === doctor._id)
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                                                {(doctor.fullName || doctor.name || '?')[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {doctor.fullName || doctor.name || 'Unknown Doctor'}
                                                </p>
                                                <p className="text-xs text-gray-500">{doctor.doctorprofile?.department || 'Not specified'}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={formData.eligibleDoctors.some((d) => d._id === doctor._id)}
                                                readOnly
                                                className="text-blue-600"
                                            />
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-4 p-2 bg-blue-100 rounded-lg text-center">
                                    <span className="text-xs font-medium text-blue-700">
                                        {formData.eligibleDoctors.length} provider{formData.eligibleDoctors.length !== 1 ? 's' : ''} selected
                                    </span>
                                </div>
                                {errors.eligibleDoctors && <p className="text-xs text-red-500 mt-2">{errors.eligibleDoctors}</p>}
                            </div>

                            {/* Fee */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-900">
                                            Fee <span className="text-red-500">*</span>
                                        </h3>
                                        <p className="text-xs text-gray-500">Set consultation fee for this appointment type</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-700">
                                            Currency <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.fee.currency}
                                            onChange={(e) =>
                                                setFormData({ ...formData, fee: { ...formData.fee, currency: e.target.value } })
                                            }
                                            className={`mt-1 w-full px-3 py-2 text-sm border ${errors.currency ? 'border-red-500' : 'border-gray-300'
                                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="">Select currency</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="PKR">PKR</option>
                                        </select>
                                        {errors.currency && <p className="text-xs text-red-500 mt-1">{errors.currency}</p>}
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-700">
                                            Amount <span className="text-red-500">*</span>
                                        </label>
                                        <div className="mt-1 relative">
                                            <span className="absolute left-3 top-2.5 text-gray-500">
                                                {formData.fee.currency === 'USD'
                                                    ? '$'
                                                    : formData.fee.currency === 'EUR'
                                                        ? '€'
                                                        : formData.fee.currency === 'PKR'
                                                            ? 'Rs'
                                                            : ''}
                                            </span>
                                            <input
                                                type="number"
                                                min="0.01"
                                                step="0.01"
                                                value={formData.fee.amount || ''}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    if (val === '' || Number(val) > 0) {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            fee: { ...prev.fee, amount: Number(val) || 0 },
                                                        }));
                                                    }
                                                }}
                                                onKeyDown={handleAmountKeyDown}
                                                placeholder="0.00"
                                                className={`w-full pl-10 pr-3 py-2 text-sm border ${errors.feeAmount ? 'border-red-500' : 'border-gray-300'
                                                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                                            />
                                        </div>
                                        {errors.feeAmount && <p className="text-xs text-red-500 mt-1">{errors.feeAmount}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white -mx-4 sm:-mx-0 px-6 py-6 border-t border-gray-200 rounded-b-2xl shadow-sm">
                        <button
                            type="button"
                            onClick={() => window.history.back()} // or your cancel logic
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium border border-gray-400 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>

                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => handleSubmit('inactive')}
                                disabled={loading}
                                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg border border-cyan-600 hover:bg-gray-200 transition disabled:opacity-50 cursor-pointer"
                            >
                                {loading ? 'Saving...' : 'Save as Draft'}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSubmit('active')}
                                disabled={loading}
                                className="w-full sm:w-auto px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-sm cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    'Update Appointment Type'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Main Render
    return isEditMode ? renderEditForm() : renderReadOnlyView();
}