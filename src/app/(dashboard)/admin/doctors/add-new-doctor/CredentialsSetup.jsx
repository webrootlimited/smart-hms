// components/doctor-registration/CredentialsSetup.jsx
"use client";

import { useState, useEffect } from 'react';
import {
    FileText,
    ShieldCheck,
    GraduationCap,
    Pill,
    PenTool,
    FileUp,
    Check,
    Plus,
    Trash2,
    Eye,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { updateDoctorCredentials } from '@/actions/doctor.actions';
import ViewDocumentModal from './ViewDocumentModal';

const STATUS_OPTIONS = ['Pending', 'Active', 'Suspended', 'Expired'];

export default function CredentialsSetup({ id, userData, onComplete }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrls, setPreviewUrls] = useState({});
    const [modalState, setModalState] = useState({
        open: false,
        file: null,
        title: '',
    });

    const initialCredentials = {
        medicalLicense: {
            file: null,
            documentUrl: '',
            licenseNumber: '',
            issuedAt: '',
            expiryDate: '',
            status: 'Pending',
        },
        certifications: [
            {
                file: null,
                documentUrl: '',
                type: 'Board',
                title: '',
                organization: '',
                licenseNumber: '',
                issuedAt: '',
                expiryDate: '',
                status: 'Pending',
            },
        ],
        deaCertificate: {
            file: null,
            documentUrl: '',
            deaNumber: '',
            issuedAt: '',
            expiryDate: '',
            status: 'Pending',
        },
        malpracticeInsuranceCertificate: {
            file: null,
            documentUrl: '',
            policyNumber: '',
            insuranceProvider: '',
            coverageAmount: '',
            status: 'Pending',
            issuedAt: '',
            expiryDate: '',
        },
        digitalSignature: {
            file: null,
            documentUrl: '',
        },
    };

    const [credentials, setCredentials] = useState(initialCredentials);
    const [errors, setErrors] = useState({});

    // Pre-fill form from existing doctor profile data
    useEffect(() => {
        if (!userData?.doctorProfile) return;

        const profile = userData.doctorProfile;
        const updated = JSON.parse(JSON.stringify(initialCredentials));

        const formatDate = (dateStr) => (dateStr ? new Date(dateStr).toISOString().split('T')[0] : '');

        // Medical License
        if (profile.medicalLicense) {
            const lic = profile.medicalLicense;
            updated.medicalLicense = {
                ...updated.medicalLicense,
                documentUrl: lic.documentUrl || lic.url || '',
                licenseNumber: lic.licenseNumber || '',
                issuedAt: formatDate(lic.issuedAt),
                expiryDate: formatDate(lic.expiryDate),
                status: lic.status || 'Pending',
            };
        }

        // Certifications
        if (Array.isArray(profile.certifications) && profile.certifications.length > 0) {
            updated.certifications = profile.certifications.map((c) => ({
                file: null,
                documentUrl: c.documentUrl || c.url || '',
                type: c.type || 'Board',
                title: c.title || '',
                organization: c.organization || '',
                licenseNumber: c.licenseNumber || '',
                issuedAt: formatDate(c.issuedAt),
                expiryDate: formatDate(c.expiryDate),
                status: c.status || 'Pending',
            }));
        }

        // DEA Certificate
        if (profile.deaCertificate) {
            const dea = profile.deaCertificate;
            updated.deaCertificate = {
                ...updated.deaCertificate,
                documentUrl: dea.documentUrl || dea.url || '',
                deaNumber: dea.deaNumber || '',
                issuedAt: formatDate(dea.issuedAt),
                expiryDate: formatDate(dea.expiryDate),
                status: dea.status || 'Pending',
            };
        }

        // Malpractice Insurance
        if (profile.malpracticeInsuranceCertificate) {
            const mal = profile.malpracticeInsuranceCertificate;
            updated.malpracticeInsuranceCertificate = {
                ...updated.malpracticeInsuranceCertificate,
                documentUrl: mal.documentUrl || mal.url || '',
                policyNumber: mal.policyNumber || '',
                insuranceProvider: mal.insuranceProvider || '',
                coverageAmount: mal.coverageAmount || '',
                issuedAt: formatDate(mal.issuedAt),
                expiryDate: formatDate(mal.expiryDate),
                status: mal.status || 'Pending',
            };
        }

        // Digital Signature
        if (profile.digitalSignature?.documentUrl || profile.digitalSignature?.url) {
            updated.digitalSignature.documentUrl = profile.digitalSignature.documentUrl || profile.digitalSignature.url || '';
        }

        setCredentials(updated);

        // Prepare preview URLs for existing documents
        const previews = {};
        if (updated.medicalLicense.documentUrl) previews.medicalLicense = updated.medicalLicense.documentUrl;
        updated.certifications.forEach((c, i) => {
            if (c.documentUrl) previews[`cert_${i}`] = c.documentUrl;
        });
        if (updated.deaCertificate.documentUrl) previews.deaCertificate = updated.deaCertificate.documentUrl;
        if (updated.malpracticeInsuranceCertificate.documentUrl) {
            previews.malpracticeInsuranceCertificate = updated.malpracticeInsuranceCertificate.documentUrl;
        }
        if (updated.digitalSignature.documentUrl) previews.digitalSignature = updated.digitalSignature.documentUrl;

        setPreviewUrls(previews);
    }, [userData]);

    const openPreview = (fileOrUrl, title) => {
        setModalState({ open: true, file: fileOrUrl, title });
    };

    const addCertification = () => {
        setCredentials((prev) => ({
            ...prev,
            certifications: [
                ...prev.certifications,
                {
                    file: null,
                    documentUrl: '',
                    type: 'Board',
                    title: '',
                    organization: '',
                    licenseNumber: '',
                    issuedAt: '',
                    expiryDate: '',
                    status: 'Pending',
                },
            ],
        }));
    };

    const removeCertification = (index) => {
        if (credentials.certifications.length === 1) {
            toast.error("At least one Board Certification is required");
            return;
        }
        setCredentials((prev) => ({
            ...prev,
            certifications: prev.certifications.filter((_, i) => i !== index),
        }));
        setPreviewUrls((prev) => {
            const next = { ...prev };
            delete next[`cert_${index}`];
            return next;
        });
    };

    const handleFileChange = (key, e, index = -1) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, [`${key}_${index >= 0 ? index : ''}_file`]: 'Max 5MB allowed' }));
            return;
        }
        if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
            setErrors((prev) => ({ ...prev, [`${key}_${index >= 0 ? index : ''}_file`]: 'PDF, JPG or PNG only' }));
            return;
        }

        // Generate preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                const previewKey = key === 'certifications' ? `cert_${index}` : key;
                setPreviewUrls((prev) => ({ ...prev, [previewKey]: reader.result }));
            };
            reader.readAsDataURL(file);
        }

        if (key === 'certifications') {
            setCredentials((prev) => {
                const certs = [...prev.certifications];
                certs[index] = { ...certs[index], file, documentUrl: '' };
                return { ...prev, certifications: certs };
            });
        } else {
            setCredentials((prev) => ({
                ...prev,
                [key]: { ...prev[key], file, documentUrl: '' },
            }));
        }

        setErrors((prev) => {
            const next = { ...prev };
            delete next[`${key}_${index >= 0 ? index : ''}_file`];
            return next;
        });
    };

    const handleInputChange = (key, field, value, index = -1) => {
        if (key === 'certifications') {
            setCredentials((prev) => {
                const certs = [...prev.certifications];
                certs[index] = { ...certs[index], [field]: value };
                return { ...prev, certifications: certs };
            });
        } else {
            setCredentials((prev) => ({
                ...prev,
                [key]: { ...prev[key], [field]: value },
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Medical License
        if (!credentials.medicalLicense.file && !credentials.medicalLicense.documentUrl) {
            newErrors.medicalLicense_file = 'Medical license document required';
        }
        if (!credentials.medicalLicense.licenseNumber?.trim()) {
            newErrors.medicalLicense_number = 'License number required';
        }
        if (!credentials.medicalLicense.expiryDate) {
            newErrors.medicalLicense_expiry = 'Expiry date required';
        }

        // Certifications
        let hasValidCert = false;
        credentials.certifications.forEach((cert, i) => {
            const hasContent = cert.title?.trim() || cert.organization?.trim() || cert.file || cert.documentUrl;
            if (hasContent || i === 0) {
                if (!cert.file && !cert.documentUrl) newErrors[`cert_${i}_file`] = 'Document required';
                if (!cert.title?.trim()) newErrors[`cert_${i}_title`] = 'Title / Specialty required';
                if (!cert.organization?.trim()) newErrors[`cert_${i}_org`] = 'Issuing organization required';
                if (!cert.issuedAt) newErrors[`cert_${i}_issued`] = 'Issue date required';

                if ((cert.file || cert.documentUrl) && cert.title?.trim() && cert.organization?.trim()) {
                    hasValidCert = true;
                }
            }
        });
        if (!hasValidCert) {
            newErrors.certifications = 'At least one complete board/specialty certification required';
        }

        // Malpractice (only if new file is being uploaded)
        if (credentials.malpracticeInsuranceCertificate.file) {
            if (!credentials.malpracticeInsuranceCertificate.policyNumber?.trim()) {
                newErrors.malpractice_policy = 'Policy number required';
            }
            if (!credentials.malpracticeInsuranceCertificate.insuranceProvider?.trim()) {
                newErrors.malpractice_provider = 'Provider required';
            }
            if (!credentials.malpracticeInsuranceCertificate.coverageAmount?.trim()) {
                newErrors.malpractice_coverage = 'Coverage amount required';
            }
            if (!credentials.malpracticeInsuranceCertificate.expiryDate) {
                newErrors.malpractice_expiry = 'Expiry date required';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            toast.error('Please fix the required fields');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            medicalLicense: {
                licenseNumber: credentials.medicalLicense.licenseNumber.trim(),
                issuedAt: credentials.medicalLicense.issuedAt ? new Date(credentials.medicalLicense.issuedAt) : undefined,
                expiryDate: credentials.medicalLicense.expiryDate ? new Date(credentials.medicalLicense.expiryDate) : undefined,
                status: credentials.medicalLicense.status,
                file: credentials.medicalLicense.file || undefined,
            },
            certifications: credentials.certifications
                .filter((c) => c.title?.trim() && c.organization?.trim() && (c.file || c.documentUrl))
                .map((c) => ({
                    type: c.type,
                    title: c.title.trim(),
                    organization: c.organization.trim(),
                    licenseNumber: c.licenseNumber?.trim() || undefined,
                    issuedAt: c.issuedAt ? new Date(c.issuedAt) : undefined,
                    expiryDate: c.expiryDate ? new Date(c.expiryDate) : undefined,
                    status: c.status,
                    file: c.file || undefined,
                })),
            deaCertificate: credentials.deaCertificate.file
                ? {
                    deaNumber: credentials.deaCertificate.deaNumber?.trim() || undefined,
                    issuedAt: credentials.deaCertificate.issuedAt ? new Date(credentials.deaCertificate.issuedAt) : undefined,
                    expiryDate: credentials.deaCertificate.expiryDate ? new Date(credentials.deaCertificate.expiryDate) : undefined,
                    status: credentials.deaCertificate.status,
                    file: credentials.deaCertificate.file,
                }
                : undefined,
            malpracticeInsuranceCertificate: credentials.malpracticeInsuranceCertificate.file
                ? {
                    policyNumber: credentials.malpracticeInsuranceCertificate.policyNumber.trim(),
                    insuranceProvider: credentials.malpracticeInsuranceCertificate.insuranceProvider.trim(),
                    coverageAmount: credentials.malpracticeInsuranceCertificate.coverageAmount.trim(),
                    issuedAt: credentials.malpracticeInsuranceCertificate.issuedAt
                        ? new Date(credentials.malpracticeInsuranceCertificate.issuedAt)
                        : undefined,
                    expiryDate: credentials.malpracticeInsuranceCertificate.expiryDate
                        ? new Date(credentials.malpracticeInsuranceCertificate.expiryDate)
                        : undefined,
                    status: credentials.malpracticeInsuranceCertificate.status,
                    file: credentials.malpracticeInsuranceCertificate.file,
                }
                : undefined,
            digitalSignature: credentials.digitalSignature.file
                ? {
                    file: credentials.digitalSignature.file,
                }
                : undefined,
        };

        try {
            const res = await updateDoctorCredentials(id, payload);
            if (res.success) {
                toast.success('Credentials updated successfully');
                onComplete();
            } else {
                toast.error(res.message || 'Failed to save credentials');
            }
        } catch (error) {
            toast.error('Server error while saving credentials');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render upload area content
    const renderUploadArea = (hasFile, hasUrl, fileName = '') => {
        if (hasFile) {
            return (
                <div className="flex flex-col items-center gap-2 py-4">
                    <Check className="h-8 w-8 text-green-600" />
                    <span className="text-sm font-medium text-green-700 truncate max-w-[260px]">{fileName || 'New file selected'}</span>
                </div>
            );
        }
        if (hasUrl) {
            return (
                <div className="flex flex-col items-center gap-2 py-4">
                    <Check className="h-8 w-8 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Upload New Document</span>
                </div>
            );
        }
        return (
            <div className="flex flex-col items-center gap-2 py-6">
                <FileUp className="h-8 w-8 text-gray-500" />
                <span className="text-sm font-medium text-gray-600">Upload PDF / JPG / PNG (max 5MB)</span>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow p-5 md:p-6">
            <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Credentials & Documents</h2>
            </div>

            <p className="text-gray-500 text-sm mb-6">
                Medical License and at least one Board Certification are required. DEA, Malpractice Insurance and Digital Signature are optional.
            </p>

            <div className="space-y-6">
                {/* Medical License */}
                <section className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-md">
                            <ShieldCheck className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-base">Medical License (Required)</h4>
                            <p className="text-xs text-gray-500 mt-0.5">PMC / equivalent current license</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">License Number *</label>
                                    <input
                                        type="text"
                                        value={credentials.medicalLicense.licenseNumber}
                                        onChange={(e) => handleInputChange('medicalLicense', 'licenseNumber', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. 12345-M"
                                    />
                                    {errors.medicalLicense_number && <p className="mt-1 text-xs text-red-600">{errors.medicalLicense_number}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Issue Date</label>
                                    <input
                                        type="date"
                                        value={credentials.medicalLicense.issuedAt}
                                        onChange={(e) => handleInputChange('medicalLicense', 'issuedAt', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date *</label>
                                    <input
                                        type="date"
                                        value={credentials.medicalLicense.expiryDate}
                                        onChange={(e) => handleInputChange('medicalLicense', 'expiryDate', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                    {errors.medicalLicense_expiry && <p className="mt-1 text-xs text-red-600">{errors.medicalLicense_expiry}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Status *</label>
                                    <select
                                        value={credentials.medicalLicense.status}
                                        onChange={(e) => handleInputChange('medicalLicense', 'status', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    >
                                        {STATUS_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 relative">
                                <div
                                    className={`border-2 border-dashed rounded-lg text-center cursor-pointer min-h-[140px] flex items-center justify-center
                    ${(credentials.medicalLicense.file || credentials.medicalLicense.documentUrl)
                                            ? 'border-green-400 bg-green-50 hover:bg-green-100'
                                            : 'border-gray-300 hover:border-indigo-400'}`}
                                    onClick={() =>
                                        (credentials.medicalLicense.file || credentials.medicalLicense.documentUrl) &&
                                        openPreview(credentials.medicalLicense.file || credentials.medicalLicense.documentUrl, 'Medical License')
                                    }
                                >
                                    {renderUploadArea(
                                        !!credentials.medicalLicense.file,
                                        !!credentials.medicalLicense.documentUrl,
                                        credentials.medicalLicense.file?.name
                                    )}
                                </div>

                                <label className="absolute inset-0 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,application/pdf"
                                        onChange={(e) => handleFileChange('medicalLicense', e)}
                                        className="hidden"
                                    />
                                </label>

                                {(credentials.medicalLicense.file || credentials.medicalLicense.documentUrl) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview(credentials.medicalLicense.file || credentials.medicalLicense.documentUrl, 'Medical License')
                                        }
                                        className="cursor-pointer absolute top-2 right-2 bg-white/90 hover:bg-white shadow rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 transition"
                                        title="View Document"
                                    >
                                        <Eye size={18} />
                                    </button>
                                )}
                            </div>

                            {errors.medicalLicense_file && <p className="mt-1.5 text-xs text-red-600">{errors.medicalLicense_file}</p>}
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                {credentials.certifications.map((cert, index) => (
                    <section key={index} className="border border-gray-200 rounded-lg p-4 relative">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 rounded-md">
                                <GraduationCap className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-gray-800 text-base">
                                        Board / Specialty Certification {index + 1} (Required)
                                    </h4>
                                    {credentials.certifications.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeCertification(index)}
                                            className="text-red-600 hover:text-red-800 p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                                        <select
                                            value={cert.type}
                                            onChange={(e) => handleInputChange('certifications', 'type', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        >
                                            <option value="Board">Board Certification</option>
                                            <option value="Certification">Other Certification</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Specialty / Title *</label>
                                        <input
                                            type="text"
                                            value={cert.title}
                                            onChange={(e) => handleInputChange('certifications', 'title', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="e.g. FCPS Cardiology"
                                        />
                                        {errors[`cert_${index}_title`] && <p className="mt-1 text-xs text-red-600">{errors[`cert_${index}_title`]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Issuing Org *</label>
                                        <input
                                            type="text"
                                            value={cert.organization}
                                            onChange={(e) => handleInputChange('certifications', 'organization', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                            placeholder="e.g. CPSP, ABIM"
                                        />
                                        {errors[`cert_${index}_org`] && <p className="mt-1 text-xs text-red-600">{errors[`cert_${index}_org`]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Cert No. (opt)</label>
                                        <input
                                            type="text"
                                            value={cert.licenseNumber}
                                            onChange={(e) => handleInputChange('certifications', 'licenseNumber', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Issue Date *</label>
                                        <input
                                            type="date"
                                            value={cert.issuedAt}
                                            onChange={(e) => handleInputChange('certifications', 'issuedAt', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                        {errors[`cert_${index}_issued`] && <p className="mt-1 text-xs text-red-600">{errors[`cert_${index}_issued`]}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={cert.expiryDate}
                                            onChange={(e) => handleInputChange('certifications', 'expiryDate', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={cert.status}
                                            onChange={(e) => handleInputChange('certifications', 'status', e.target.value, index)}
                                            className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        >
                                            {STATUS_OPTIONS.map((opt) => (
                                                <option key={opt} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-4 relative">
                                    <div
                                        className={`border-2 border-dashed rounded-lg text-center cursor-pointer min-h-[140px] flex items-center justify-center
                      ${(cert.file || cert.documentUrl) ? 'border-green-400 bg-green-50 hover:bg-green-100' : 'border-gray-300 hover:border-indigo-400'}`}
                                        onClick={() => (cert.file || cert.documentUrl) && openPreview(cert.file || cert.documentUrl, `Certification ${index + 1}`)}
                                    >
                                        {renderUploadArea(!!cert.file, !!cert.documentUrl, cert.file?.name)}
                                    </div>

                                    <label className="absolute inset-0 cursor-pointer">
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,application/pdf"
                                            onChange={(e) => handleFileChange('certifications', e, index)}
                                            className="hidden"
                                        />
                                    </label>

                                    {(cert.file || cert.documentUrl) && (
                                        <button
                                            type="button"
                                            onClick={() => openPreview(cert.file || cert.documentUrl, `Certification ${index + 1}`)}
                                            className="cursor-pointer absolute top-2 right-2 bg-white/90 hover:bg-white shadow rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 transition"
                                            title="View Document"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    )}
                                </div>

                                {errors[`cert_${index}_file`] && <p className="mt-1.5 text-xs text-red-600">{errors[`cert_${index}_file`]}</p>}
                            </div>
                        </div>

                        {index === credentials.certifications.length - 1 && (
                            <button
                                type="button"
                                onClick={addCertification}
                                className="mt-3 flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                            >
                                <Plus size={14} /> Add another certification
                            </button>
                        )}
                    </section>
                ))}

                {errors.certifications && (
                    <p className="text-red-600 text-center font-medium text-sm py-1.5">{errors.certifications}</p>
                )}

                {/* DEA Certificate */}
                <section className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-md">
                            <Pill className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-base">DEA Certificate (Optional)</h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">DEA Number</label>
                                    <input
                                        type="text"
                                        value={credentials.deaCertificate.deaNumber}
                                        onChange={(e) => handleInputChange('deaCertificate', 'deaNumber', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. AB1234567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Issue Date</label>
                                    <input
                                        type="date"
                                        value={credentials.deaCertificate.issuedAt}
                                        onChange={(e) => handleInputChange('deaCertificate', 'issuedAt', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={credentials.deaCertificate.expiryDate}
                                        onChange={(e) => handleInputChange('deaCertificate', 'expiryDate', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={credentials.deaCertificate.status}
                                        onChange={(e) => handleInputChange('deaCertificate', 'status', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    >
                                        {STATUS_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 relative">
                                <div
                                    className={`border-2 border-dashed rounded-lg text-center cursor-pointer min-h-[140px] flex items-center justify-center
                    ${(credentials.deaCertificate.file || credentials.deaCertificate.documentUrl)
                                            ? 'border-green-400 bg-green-50 hover:bg-green-100'
                                            : 'border-gray-300 hover:border-indigo-400'}`}
                                    onClick={() =>
                                        (credentials.deaCertificate.file || credentials.deaCertificate.documentUrl) &&
                                        openPreview(credentials.deaCertificate.file || credentials.deaCertificate.documentUrl, 'DEA Certificate')
                                    }
                                >
                                    {renderUploadArea(
                                        !!credentials.deaCertificate.file,
                                        !!credentials.deaCertificate.documentUrl,
                                        credentials.deaCertificate.file?.name
                                    )}
                                </div>

                                <label className="absolute inset-0 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,application/pdf"
                                        onChange={(e) => handleFileChange('deaCertificate', e)}
                                        className="hidden"
                                    />
                                </label>

                                {(credentials.deaCertificate.file || credentials.deaCertificate.documentUrl) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview(credentials.deaCertificate.file || credentials.deaCertificate.documentUrl, 'DEA Certificate')
                                        }
                                        className="cursor-pointer absolute top-2 right-2 bg-white/90 hover:bg-white shadow rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 transition"
                                        title="View Document"
                                    >
                                        <Eye size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Malpractice Insurance */}
                <section className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-md">
                            <ShieldCheck className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-base">Malpractice Insurance Certificate (Optional)</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Current professional liability insurance</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Policy Number</label>
                                    <input
                                        type="text"
                                        value={credentials.malpracticeInsuranceCertificate.policyNumber}
                                        onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'policyNumber', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. POL-987654"
                                    />
                                    {errors.malpractice_policy && <p className="mt-1 text-xs text-red-600">{errors.malpractice_policy}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Provider</label>
                                    <input
                                        type="text"
                                        value={credentials.malpracticeInsuranceCertificate.insuranceProvider}
                                        onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'insuranceProvider', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. State Life, Jubilee, Allianz"
                                    />
                                    {errors.malpractice_provider && <p className="mt-1 text-xs text-red-600">{errors.malpractice_provider}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Coverage Amount</label>
                                    <input
                                        type="text"
                                        value={credentials.malpracticeInsuranceCertificate.coverageAmount}
                                        onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'coverageAmount', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                        placeholder="e.g. PKR 10 Million"
                                    />
                                    {errors.malpractice_coverage && <p className="mt-1 text-xs text-red-600">{errors.malpractice_coverage}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Issue Date</label>
                                    <input
                                        type="date"
                                        value={credentials.malpracticeInsuranceCertificate.issuedAt}
                                        onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'issuedAt', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                                    <input
                                        type="date"
                                        value={credentials.malpracticeInsuranceCertificate.expiryDate}
                                        onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'expiryDate', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    />
                                    {errors.malpractice_expiry && <p className="mt-1 text-xs text-red-600">{errors.malpractice_expiry}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        value={credentials.malpracticeInsuranceCertificate.status}
                                        onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'status', e.target.value)}
                                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    >
                                        {STATUS_OPTIONS.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 relative">
                                <div
                                    className={`border-2 border-dashed rounded-lg text-center cursor-pointer min-h-[140px] flex items-center justify-center
                    ${(credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl)
                                            ? 'border-green-400 bg-green-50 hover:bg-green-100'
                                            : 'border-gray-300 hover:border-indigo-400'}`}
                                    onClick={() =>
                                        (credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl) &&
                                        openPreview(
                                            credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl,
                                            'Malpractice Insurance Certificate'
                                        )
                                    }
                                >
                                    {renderUploadArea(
                                        !!credentials.malpracticeInsuranceCertificate.file,
                                        !!credentials.malpracticeInsuranceCertificate.documentUrl,
                                        credentials.malpracticeInsuranceCertificate.file?.name
                                    )}
                                </div>

                                <label className="absolute inset-0 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,application/pdf"
                                        onChange={(e) => handleFileChange('malpracticeInsuranceCertificate', e)}
                                        className="hidden"
                                    />
                                </label>

                                {(credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview(
                                                credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl,
                                                'Malpractice Insurance Certificate'
                                            )
                                        }
                                        className="cursor-pointer absolute top-2 right-2 bg-white/90 hover:bg-white shadow rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 transition"
                                        title="View Document"
                                    >
                                        <Eye size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Digital Signature */}
                <section className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-indigo-50 rounded-md">
                            <PenTool className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-base">Digital Signature Sample (Optional)</h4>
                            <p className="text-xs text-gray-500 mt-0.5">For electronic prescriptions & records</p>

                            <div className="mt-4 relative">
                                <div
                                    className={`border-2 border-dashed rounded-lg text-center cursor-pointer min-h-[140px] flex items-center justify-center
                    ${(credentials.digitalSignature.file || credentials.digitalSignature.documentUrl)
                                            ? 'border-green-400 bg-green-50 hover:bg-green-100'
                                            : 'border-gray-300 hover:border-indigo-400'}`}
                                    onClick={() =>
                                        (credentials.digitalSignature.file || credentials.digitalSignature.documentUrl) &&
                                        openPreview(credentials.digitalSignature.file || credentials.digitalSignature.documentUrl, 'Digital Signature')
                                    }
                                >
                                    {renderUploadArea(
                                        !!credentials.digitalSignature.file,
                                        !!credentials.digitalSignature.documentUrl,
                                        credentials.digitalSignature.file?.name
                                    )}
                                </div>

                                <label className="absolute inset-0 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        onChange={(e) => handleFileChange('digitalSignature', e)}
                                        className="hidden"
                                    />
                                </label>

                                {(credentials.digitalSignature.file || credentials.digitalSignature.documentUrl) && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPreview(credentials.digitalSignature.file || credentials.digitalSignature.documentUrl, 'Digital Signature')
                                        }
                                        className="cursor-pointer absolute top-2 right-2 bg-white/90 hover:bg-white shadow rounded-full p-1.5 text-indigo-600 hover:text-indigo-800 transition"
                                        title="View Document"
                                    >
                                        <Eye size={18} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-2.5 cursor-pointer text-white rounded-lg font-medium shadow transition ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            {/* Preview Modal */}
            <ViewDocumentModal
                isOpen={modalState.open}
                onClose={() => setModalState({ open: false, file: null, title: '' })}
                file={modalState.file}
                title={modalState.title}
            />
        </div>
    );
}