'use client';

import { useState, useEffect } from 'react';
import {
    GraduationCap,
    ShieldCheck,
    Calendar,
    Download,
    CheckCircle,
    FileUp,
    Plus,
    Trash2,
    Eye,
    FileText,
    Pill,
    PenTool,
    Check, X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { updateDoctorCredentials } from '@/actions/doctor.actions';

// Reusable Info Box (for view mode)
function InfoBox({ label, value, success }) {
    return (
        <div className={`rounded-2xl p-4 ${success ? 'bg-green-50' : 'bg-blue-50'}`}>
            <p className="text-xs text-gray-600 mb-1">{label}</p>
            <p className={`text-sm font-medium flex items-center gap-1 ${success ? 'text-green-700' : 'text-gray-900'}`}>
                {success && <CheckCircle className="w-4 h-4" />}
                {value || '—'}
            </p>
        </div>
    );
}

export default function Certifications({ userData, isEditMode = false, setIsEditMode }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewUrls, setPreviewUrls] = useState({});
    const [modalState, setModalState] = useState({ open: false, file: null, title: '' });

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
            issuedAt: '',
            expiryDate: '',
            status: 'Pending',
        },
        digitalSignature: {
            file: null,
            documentUrl: '',
        },
    };

    const [credentials, setCredentials] = useState(initialCredentials);
    const [errors, setErrors] = useState({});

    // Pre-fill from existing data (doctorProfile)
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
                documentUrl: lic.documentUrl || '',
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
                documentUrl: c.documentUrl || '',
                type: c.type || 'Board',
                title: c.title || '',
                organization: c.organization || '',
                licenseNumber: c.licenseNumber || '',
                issuedAt: formatDate(c.issuedAt),
                expiryDate: formatDate(c.expiryDate),
                status: c.status || 'Pending',
            }));
        }

        // DEA
        if (profile.deaCertificate) {
            const dea = profile.deaCertificate;
            updated.deaCertificate = {
                ...updated.deaCertificate,
                documentUrl: dea.documentUrl || '',
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
                documentUrl: mal.documentUrl || '',
                policyNumber: mal.policyNumber || '',
                insuranceProvider: mal.insuranceProvider || '',
                coverageAmount: mal.coverageAmount || '',
                issuedAt: formatDate(mal.issuedAt),
                expiryDate: formatDate(mal.expiryDate),
                status: mal.status || 'Pending',
            };
        }

        // Digital Signature
        if (profile.digitalSignature?.documentUrl) {
            updated.digitalSignature.documentUrl = profile.digitalSignature.documentUrl;
        }

        setCredentials(updated);

        // Preview URLs for existing documents
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
            toast.error("At least one certification is required");
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
            toast.error('File size must be less than 5MB');
            return;
        }
        if (!['image/jpeg', 'image/png', 'application/pdf'].includes(file.type)) {
            toast.error('Only PDF, JPG, PNG allowed');
            return;
        }

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

        // Medical License (required)
        if (!credentials.medicalLicense.file && !credentials.medicalLicense.documentUrl) {
            newErrors.medicalLicense_file = 'Medical license document required';
        }
        if (!credentials.medicalLicense.licenseNumber?.trim()) {
            newErrors.medicalLicense_number = 'License number required';
        }
        if (!credentials.medicalLicense.expiryDate) {
            newErrors.medicalLicense_expiry = 'Expiry date required';
        }

        // At least one valid certification
        let hasValidCert = false;
        credentials.certifications.forEach((cert, i) => {
            const hasContent = cert.title?.trim() || cert.organization?.trim() || cert.file || cert.documentUrl;
            if (hasContent || i === 0) {
                if (!cert.file && !cert.documentUrl) newErrors[`cert_${i}_file`] = 'Document required';
                if (!cert.title?.trim()) newErrors[`cert_${i}_title`] = 'Title required';
                if (!cert.organization?.trim()) newErrors[`cert_${i}_org`] = 'Organization required';
                if (!cert.issuedAt) newErrors[`cert_${i}_issued`] = 'Issue date required';

                if ((cert.file || cert.documentUrl) && cert.title?.trim() && cert.organization?.trim()) {
                    hasValidCert = true;
                }
            }
        });
        if (!hasValidCert) {
            newErrors.certifications = 'At least one complete certification required';
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
                ? { file: credentials.digitalSignature.file }
                : undefined,
        };

        try {
            const res = await updateDoctorCredentials(userData._id, payload);
            if (res.success) {
                toast.success('Credentials updated successfully!');
            } else {
                toast.error(res.message || 'Failed to update credentials');
            }
        } catch (error) {
            toast.error('Server error while saving');
        } finally {
            setIsSubmitting(false);
        }
    };

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
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto space-y-6">
                {isEditMode ? (
                    // ── EDIT MODE ───────────────────────────────────────────────────────────────
                    <div className="bg-white rounded-xl shadow p-5 md:p-6">
                        <div className="flex items-center mb-6">
                            <FileText className="h-6 w-6 text-indigo-600 mr-2" />
                            <h2 className="text-2xl font-bold text-gray-800">Credentials & Documents</h2>
                        </div>

                        <p className="text-gray-600 mb-8">
                            Medical License and at least one Board Certification are required. Others are optional.
                        </p>

                        <div className="space-y-8">
                            {/* Medical License */}
                            <section className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-indigo-50 rounded-xl">
                                        <ShieldCheck className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Medical License (Required)</h3>
                                        <p className="text-sm text-gray-600 mt-1">PMC / equivalent current license</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
                                        <input
                                            type="text"
                                            value={credentials.medicalLicense.licenseNumber}
                                            onChange={(e) => handleInputChange('medicalLicense', 'licenseNumber', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                            placeholder="e.g. 12345-M"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                        <input
                                            type="date"
                                            value={credentials.medicalLicense.issuedAt}
                                            onChange={(e) => handleInputChange('medicalLicense', 'issuedAt', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                                        <input
                                            type="date"
                                            value={credentials.medicalLicense.expiryDate}
                                            onChange={(e) => handleInputChange('medicalLicense', 'expiryDate', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={credentials.medicalLicense.status}
                                            onChange={(e) => handleInputChange('medicalLicense', 'status', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-400"
                                        >
                                            {['Pending', 'Active', 'Suspended', 'Expired'].map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 relative">
                                    <div
                                        className={`border-2 border-dashed rounded-xl text-center cursor-pointer min-h-[160px] flex items-center justify-center
                      ${(credentials.medicalLicense.file || credentials.medicalLicense.documentUrl)
                                                ? 'border-green-400 bg-green-50'
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
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                        >
                                            <Eye size={20} />
                                        </button>
                                    )}
                                </div>
                            </section>

                            {/* Certifications */}
                            {credentials.certifications.map((cert, index) => (
                                <section key={index} className="border border-gray-200 rounded-xl p-6 relative bg-gray-50">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3 bg-indigo-50 rounded-xl">
                                            <GraduationCap className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    Certification {index + 1} (Required)
                                                </h3>
                                                {credentials.certifications.length > 1 && (
                                                    <button
                                                        onClick={() => removeCertification(index)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                                    <select
                                                        value={cert.type}
                                                        onChange={(e) => handleInputChange('certifications', 'type', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-400"
                                                    >
                                                        <option value="Board">Board Certification</option>
                                                        <option value="Certification">Other Certification</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title / Specialty *</label>
                                                    <input
                                                        type="text"
                                                        value={cert.title}
                                                        onChange={(e) => handleInputChange('certifications', 'title', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                                        placeholder="e.g. FCPS Cardiology"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization *</label>
                                                    <input
                                                        type="text"
                                                        value={cert.organization}
                                                        onChange={(e) => handleInputChange('certifications', 'organization', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                                        placeholder="e.g. CPSP, ABIM"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cert No. (optional)</label>
                                                    <input
                                                        type="text"
                                                        value={cert.licenseNumber}
                                                        onChange={(e) => handleInputChange('certifications', 'licenseNumber', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date *</label>
                                                    <input
                                                        type="date"
                                                        value={cert.issuedAt}
                                                        onChange={(e) => handleInputChange('certifications', 'issuedAt', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                                    <input
                                                        type="date"
                                                        value={cert.expiryDate}
                                                        onChange={(e) => handleInputChange('certifications', 'expiryDate', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                                    <select
                                                        value={cert.status}
                                                        onChange={(e) => handleInputChange('certifications', 'status', e.target.value, index)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-400"
                                                    >
                                                        {['Pending', 'Active', 'Suspended', 'Expired'].map((opt) => (
                                                            <option key={opt} value={opt}>{opt}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mt-6 relative">
                                                <div
                                                    className={`border-2 border-dashed rounded-xl text-center cursor-pointer min-h-[160px] flex items-center justify-center
                            ${(cert.file || cert.documentUrl) ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-indigo-400'}`}
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
                                                        className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                                    >
                                                        <Eye size={20} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {index === credentials.certifications.length - 1 && (
                                        <button
                                            onClick={addCertification}
                                            className="mt-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                        >
                                            <Plus size={16} /> Add another certification
                                        </button>
                                    )}
                                </section>
                            ))}

                            {/* DEA Certificate (Optional) */}
                            <section className="border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-indigo-50 rounded-xl">
                                        <Pill className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">DEA Certificate (Optional)</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">DEA Number</label>
                                        <input
                                            type="text"
                                            value={credentials.deaCertificate.deaNumber}
                                            onChange={(e) => handleInputChange('deaCertificate', 'deaNumber', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                        <input
                                            type="date"
                                            value={credentials.deaCertificate.issuedAt}
                                            onChange={(e) => handleInputChange('deaCertificate', 'issuedAt', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={credentials.deaCertificate.expiryDate}
                                            onChange={(e) => handleInputChange('deaCertificate', 'expiryDate', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={credentials.deaCertificate.status}
                                            onChange={(e) => handleInputChange('deaCertificate', 'status', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-400"
                                        >
                                            {['Pending', 'Active', 'Suspended', 'Expired'].map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 relative">
                                    <div
                                        className={`border-2 border-dashed rounded-xl text-center cursor-pointer min-h-[160px] flex items-center justify-center
                      ${(credentials.deaCertificate.file || credentials.deaCertificate.documentUrl)
                                                ? 'border-green-400 bg-green-50'
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
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                        >
                                            <Eye size={20} />
                                        </button>
                                    )}
                                </div>
                            </section>

                            {/* Malpractice Insurance (Optional) */}
                            <section className="border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-indigo-50 rounded-xl">
                                        <ShieldCheck className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Malpractice Insurance (Optional)</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                                        <input
                                            type="text"
                                            value={credentials.malpracticeInsuranceCertificate.policyNumber}
                                            onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'policyNumber', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                                        <input
                                            type="text"
                                            value={credentials.malpracticeInsuranceCertificate.insuranceProvider}
                                            onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'insuranceProvider', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Amount</label>
                                        <input
                                            type="text"
                                            value={credentials.malpracticeInsuranceCertificate.coverageAmount}
                                            onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'coverageAmount', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
                                        <input
                                            type="date"
                                            value={credentials.malpracticeInsuranceCertificate.issuedAt}
                                            onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'issuedAt', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={credentials.malpracticeInsuranceCertificate.expiryDate}
                                            onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'expiryDate', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-400"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <select
                                            value={credentials.malpracticeInsuranceCertificate.status}
                                            onChange={(e) => handleInputChange('malpracticeInsuranceCertificate', 'status', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-indigo-400"
                                        >
                                            {['Pending', 'Active', 'Suspended', 'Expired'].map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-6 relative">
                                    <div
                                        className={`border-2 border-dashed rounded-xl text-center cursor-pointer min-h-[160px] flex items-center justify-center
                      ${(credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl)
                                                ? 'border-green-400 bg-green-50'
                                                : 'border-gray-300 hover:border-indigo-400'}`}
                                        onClick={() =>
                                            (credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl) &&
                                            openPreview(credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl, 'Malpractice Insurance')
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
                                                openPreview(credentials.malpracticeInsuranceCertificate.file || credentials.malpracticeInsuranceCertificate.documentUrl, 'Malpractice Insurance')
                                            }
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                        >
                                            <Eye size={20} />
                                        </button>
                                    )}
                                </div>
                            </section>

                            {/* Digital Signature (Optional) */}
                            <section className="border border-gray-200 rounded-xl p-6">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-indigo-50 rounded-xl">
                                        <PenTool className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800">Digital Signature (Optional)</h3>
                                    </div>
                                </div>

                                <div className="mt-6 relative">
                                    <div
                                        className={`border-2 border-dashed rounded-xl text-center cursor-pointer min-h-[160px] flex items-center justify-center
                      ${(credentials.digitalSignature.file || credentials.digitalSignature.documentUrl)
                                                ? 'border-green-400 bg-green-50'
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
                                            className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow rounded-full p-2 text-indigo-600 hover:text-indigo-800 cursor-pointer"
                                        >
                                            <Eye size={20} />
                                        </button>
                                    )}
                                </div>
                            </section>
                        </div>

                        <div className="mt-10 flex justify-end gap-5">
                            <button
                                onClick={() => setIsEditMode(false)}
                                className="px-6 cursor-pointer py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`px-10 cursor-pointer py-3 text-white rounded-xl font-medium shadow-lg transition ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                                    }`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Save Credentials'}
                            </button>
                        </div>
                    </div>
                ) : (
                    // ── VIEW MODE ───────────────────────────────────────────────────────────────
                    <div className="space-y-6">
                        {[
                            {
                                title: credentials.medicalLicense?.licenseNumber
                                    ? `Medical License - ${credentials.medicalLicense.licenseNumber}`
                                    : 'Medical License',
                                org: 'Medical Council',
                                issued: credentials.medicalLicense?.issuedAt
                                    ? new Date(credentials.medicalLicense.issuedAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                    : '—',
                                expires: credentials.medicalLicense?.expiryDate
                                    ? new Date(credentials.medicalLicense.expiryDate).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                    : '—',
                            },
                            ...(credentials.certifications || []).map((c) => ({
                                title: c.title || 'Certification',
                                org: c.organization || 'Unknown Organization',
                                issued: c.issuedAt
                                    ? new Date(c.issuedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                    : '—',
                                expires: c.expiryDate
                                    ? new Date(c.expiryDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                    : '—',
                            })),
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-3xl shadow-sm p-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                                            <GraduationCap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
                                            <p className="text-xs text-gray-500">{item.org}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center sm:justify-end items-center gap-2">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3" />
                                            Active
                                        </span>
                                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition cursor-pointer">
                                            <Download className="w-4 h-4 text-gray-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Issued: {item.issued}
                                    </div>
                                    {item.expires !== '—' && (
                                        <div className="flex items-center justify-center sm:justify-start gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Expires: {item.expires}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Medical License & DEA in bottom grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Medical License */}
                            <div className="bg-white rounded-3xl shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">Medical License</h3>
                                </div>

                                <div className="space-y-4">
                                    <InfoBox
                                        label="License Number"
                                        value={credentials.medicalLicense?.licenseNumber || '—'}
                                    />
                                    <InfoBox
                                        label="Status"
                                        value={credentials.medicalLicense?.status || '—'}
                                        success
                                    />
                                    <InfoBox
                                        label="Expiry Date"
                                        value={
                                            credentials.medicalLicense?.expiryDate
                                                ? new Date(credentials.medicalLicense.expiryDate).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                                : '—'
                                        }
                                    />
                                </div>
                            </div>

                            {/* DEA Certificate */}
                            <div className="bg-white rounded-3xl shadow-sm p-6">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-purple-600" />
                                    </div>
                                    <h3 className="text-base font-semibold text-gray-800">DEA Certificate</h3>
                                </div>

                                <div className="space-y-4">
                                    <InfoBox
                                        label="DEA Number"
                                        value={credentials.deaCertificate?.deaNumber || '—'}
                                    />
                                    <InfoBox
                                        label="Status"
                                        value={credentials.deaCertificate?.status || '—'}
                                        success
                                    />
                                    <InfoBox
                                        label="Expiry Date"
                                        value={
                                            credentials.deaCertificate?.expiryDate
                                                ? new Date(credentials.deaCertificate.expiryDate).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    year: 'numeric',
                                                })
                                                : '—'
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Preview Modal (you can reuse your existing ViewDocumentModal or implement simple one) */}
                {modalState.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between px-6 py-4 border-b">
                                <h2 className="text-xl font-semibold">{modalState.title}</h2>
                                <button onClick={() => setModalState({ open: false, file: null, title: '' })}>
                                    <X className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                            <div className="flex-1 p-4 overflow-auto">
                                {typeof modalState.file === 'string' ? (
                                    <iframe src={modalState.file} className="w-full h-full" title="Document Preview" />
                                ) : (
                                    <p className="text-center text-gray-600 mt-20">Preview not available for this file type</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}