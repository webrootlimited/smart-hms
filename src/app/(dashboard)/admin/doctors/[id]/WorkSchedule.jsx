'use client';

import { useState, useEffect } from 'react';
import {
    Clock,
    Building2,
    MapPin,
    Calendar,
    Edit2,
    Plus,
    Coffee,
    Check,
    Building,
    X
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getClinics } from '@/actions/clinic.actions';
import { updateDoctorWorkSetup } from '@/actions/doctor.actions';

// Simple Map Modal Component (embedded directly - you can also move to separate file)
const MapModal = ({ isOpen, onClose, latitude, longitude, title = 'Clinic Location' }) => {
    if (!isOpen) return null;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
                    <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid Location</h2>
                    <p className="text-gray-600">No coordinates available for this clinic.</p>
                    <button
                        onClick={onClose}
                        className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const delta = 0.015;
    const bbox = `${lon - delta},${lat - delta},${lon + delta},${lat + delta}`;
    const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                            <p className="text-sm text-gray-600">
                                Lat: {lat.toFixed(6)} • Lon: {lon.toFixed(6)}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-600 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 relative bg-gray-100">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src={embedUrl}
                        allowFullScreen
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm font-medium">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        Location Set
                    </div>
                </div>

                <div className="px-6 py-3 text-xs text-gray-500 bg-gray-50 text-center border-t">
                    © <a href="https://www.openstreetmap.org/copyright" target="_blank" className="underline hover:text-blue-600">
                        OpenStreetMap
                    </a> contributors
                </div>
            </div>
        </div>
    );
};

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const defaultDay = {
    day: '',
    open: false,
    from: '',
    to: '',
    break: { from: '', to: '' },
};

export default function WorkLocationsAndSchedule({
    userData = {},
    isEditMode = false,
    setIsEditMode
}) {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        selectedClinics: [],
        clinicData: {},
    });

    // Map modal states
    const [showMapModal, setShowMapModal] = useState(false);
    const [selectedClinic, setSelectedClinic] = useState(null);

    // Pre-fill form data from userData
    useEffect(() => {
        const doctorProfile = userData?.doctorProfile || {};

        if (!doctorProfile?.workLocations?.length) return;

        const selected = [];
        const clinicMap = {};

        doctorProfile.workLocations.forEach((loc) => {
            const clinicId = loc.clinic?._id || loc.clinic;
            if (!clinicId) return;

            selected.push(clinicId);

            const scheduleObj = {};
            dayNames.forEach((day) => {
                const existing = loc.schedule?.find((s) => s.day === day);
                scheduleObj[day] = existing ? { ...existing } : { ...defaultDay, day };
            });

            clinicMap[clinicId] = {
                department: loc.department || '',
                schedule: scheduleObj,
            };
        });

        setFormData({
            selectedClinics: selected,
            clinicData: clinicMap,
        });
    }, [userData]);

    // Load clinics list
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const res = await getClinics();
                if (res.success) {
                    setClinics(res.clinics || []);
                } else {
                    toast.error(res.message || 'Failed to load clinics');
                }
            } catch (err) {
                toast.error('Error loading clinics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const toggleClinic = (clinicId) => {
        setFormData((prev) => {
            const isSelected = prev.selectedClinics.includes(clinicId);
            if (isSelected) {
                const { [clinicId]: _, ...rest } = prev.clinicData;
                return {
                    ...prev,
                    selectedClinics: prev.selectedClinics.filter((id) => id !== clinicId),
                    clinicData: rest,
                };
            }

            return {
                ...prev,
                selectedClinics: [...prev.selectedClinics, clinicId],
                clinicData: {
                    ...prev.clinicData,
                    [clinicId]: {
                        department: '',
                        schedule: dayNames.reduce(
                            (acc, day) => ({ ...acc, [day]: { ...defaultDay, day } }),
                            {}
                        ),
                    },
                },
            };
        });
    };

    const updateDay = (clinicId, day, updates) => {
        setFormData((prev) => {
            const clinic = prev.clinicData[clinicId] || {};
            const currentDay = clinic.schedule?.[day] || { ...defaultDay, day };
            let newDay = { ...currentDay, ...updates };

            if (updates.open === true && !currentDay.from) {
                newDay.from = '08:00';
                newDay.to = '17:00';
                newDay.break = { from: '13:00', to: '14:00' };
            }

            if (updates.open === false) {
                newDay.from = '';
                newDay.to = '';
                newDay.break = { from: '', to: '' };
            }

            return {
                ...prev,
                clinicData: {
                    ...prev.clinicData,
                    [clinicId]: {
                        ...clinic,
                        schedule: { ...(clinic.schedule || {}), [day]: newDay },
                    },
                },
            };
        });
    };

    const updateDepartment = (clinicId, value) => {
        setFormData((prev) => ({
            ...prev,
            clinicData: {
                ...prev.clinicData,
                [clinicId]: {
                    ...prev.clinicData[clinicId],
                    department: value,
                },
            },
        }));
    };

    const validate = () => {
        if (!formData.selectedClinics.length) {
            toast.error('Please select at least one clinic');
            return false;
        }

        for (const clinicId of formData.selectedClinics) {
            const sched = formData.clinicData[clinicId]?.schedule || {};
            const hasActive = dayNames.some((d) => sched[d]?.open && sched[d]?.from && sched[d]?.to);
            if (!hasActive) {
                toast.error(`Set working hours for at least one day in each clinic`);
                return false;
            }
        }
        return true;
    };

    const preparePayload = () => ({
        workLocations: formData.selectedClinics.map((clinicId) => {
            const info = formData.clinicData[clinicId] || {};
            const schedule = dayNames
                .map((day) => info.schedule?.[day])
                .filter(Boolean)
                .filter((s) => s.open);

            return {
                clinic: clinicId,
                department: info.department || '',
                schedule,
            };
        }),
    });

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsSubmitting(true);

        try {
            const payload = preparePayload();
            const response = await updateDoctorWorkSetup(userData._id, payload);

            if (response.success) {
                toast.success('Schedule updated successfully!');
            } else {
                toast.error(response.message || 'Failed to save');
            }
        } catch (err) {
            toast.error('Something went wrong');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ── VIEW MODE ──────────────────────────────────────────────────────────────
    const renderViewMode = () => {
        const workLocations = userData?.doctorProfile?.workLocations || [];

        if (!workLocations.length) {
            return (
                <div className="text-center py-12 text-gray-500">
                    No locations configured yet
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {workLocations.map((loc, index) => {
                    const clinic = loc.clinic || {};
                    const isPrimary = index === 0;
                    const activeDays = (loc.schedule || [])
                        .filter((s) => s.open)
                        .map((s) => s.day);

                    return (
                        <div key={loc._id || index} className="bg-white rounded-3xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                            {clinic.clinicName || 'Unnamed Clinic'}
                                            {isPrimary && (
                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                    Primary
                                                </span>
                                            )}
                                        </h3>
                                        <p className="text-xs text-gray-500">{loc.department || 'General'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {/* Address */}
                                <div className="bg-gray-50 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs text-gray-600">Address</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {clinic.fullAddress || 'No address available'}
                                    </p>
                                </div>

                                {/* Working Days */}
                                <div className="bg-blue-50 rounded-2xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <span className="text-xs text-gray-600">Working Days</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {activeDays.length > 0 ? (
                                            activeDays.map((day) => (
                                                <span
                                                    key={day}
                                                    className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-gray-700"
                                                >
                                                    {day}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-500">Not set</span>
                                        )}
                                    </div>
                                </div>

                                {/* View on Map Button - Opens Modal */}
                                <button
                                    onClick={() => {
                                        setSelectedClinic({
                                            latitude: clinic.latitude,
                                            longitude: clinic.longitude,
                                            title: clinic.clinicName || 'Clinic Location',
                                        });
                                        setShowMapModal(true);
                                    }}
                                    disabled={!clinic.latitude || !clinic.longitude}
                                    className={`w-full py-3 border border-gray-200 rounded-2xl text-sm font-medium transition flex items-center justify-center gap-2 ${clinic.latitude && clinic.longitude
                                        ? 'text-gray-700 hover:bg-gray-50 cursor-pointer'
                                        : 'text-gray-400 cursor-not-allowed opacity-60'
                                        }`}
                                >
                                    <MapPin className="w-4 h-4" />
                                    View on Map
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="text-center py-16 text-gray-500">Loading...</div>
                ) : isEditMode ? (
                    // ── EDIT MODE  ─────────────────────────────────
                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-semibold mb-5 flex items-center gap-3">
                                <Building className="h-6 w-6 text-indigo-600" />
                                Select Clinics
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {clinics.map((clinic) => {
                                    const selected = formData.selectedClinics.includes(clinic._id);
                                    return (
                                        <div
                                            key={clinic._id}
                                            onClick={() => toggleClinic(clinic._id)}
                                            className={`p-2 rounded-2xl border-2 cursor-pointer transition-all ${selected
                                                ? 'border-indigo-500 bg-indigo-50/70 shadow-md'
                                                : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <Building2 className="w-5 h-5 text-indigo-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">{clinic.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                        {clinic.fullAddress}
                                                    </p>
                                                </div>
                                            </div>
                                            {selected && (
                                                <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1.5 shadow">
                                                    <Check size={18} />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {formData.selectedClinics.length > 0 && (
                            <section className="space-y-8">
                                <h2 className="text-xl font-semibold flex items-center gap-3">
                                    <Clock className="h-6 w-6 text-green-600" />
                                    Working Hours
                                </h2>

                                {formData.selectedClinics.map((clinicId) => {
                                    const clinic = clinics.find((c) => c._id === clinicId);
                                    if (!clinic) return null;

                                    const info = formData.clinicData[clinicId] || {};
                                    const schedule = info.schedule || {};

                                    return (
                                        <div key={clinicId} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                                            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-5">
                                                <h3 className="text-xl font-semibold text-gray-800">{clinic.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{clinic.fullAddress}</p>
                                            </div>

                                            <div className="px-6 py-5 border-b border-gray-100">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Department
                                                </label>
                                                <select
                                                    value={info.department || ''}
                                                    onChange={(e) => updateDepartment(clinicId, e.target.value)}
                                                    className="w-full max-w-md p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400"
                                                >
                                                    <option value="">Select Department</option>
                                                    {(clinic.services || []).map((dept) => (
                                                        <option key={dept} value={dept}>
                                                            {dept}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="divide-y divide-gray-100">
                                                {dayNames.map((day) => {
                                                    const d = schedule[day] || { ...defaultDay, day };
                                                    const isActive = d.open && d.from && d.to;

                                                    return (
                                                        <div
                                                            key={day}
                                                            className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50/50 transition"
                                                        >
                                                            <div className="flex items-center gap-4 min-w-[140px]">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={d.open}
                                                                    onChange={(e) => updateDay(clinicId, day, { open: e.target.checked })}
                                                                    className="h-5 w-5 text-green-600 rounded"
                                                                />
                                                                <span className="font-medium text-base">{day}</span>
                                                            </div>

                                                            <div className="flex-1">
                                                                {d.open ? (
                                                                    <div className="flex flex-wrap items-center gap-4">
                                                                        <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-xl">
                                                                            <span className="text-sm font-medium text-gray-700">From</span>
                                                                            <input
                                                                                type="time"
                                                                                value={d.from}
                                                                                onChange={(e) => updateDay(clinicId, day, { from: e.target.value })}
                                                                                className="w-28 p-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400"
                                                                            />
                                                                        </div>

                                                                        <div className="flex items-center gap-3 bg-green-50 px-4 py-2 rounded-xl">
                                                                            <span className="text-sm font-medium text-gray-700">To</span>
                                                                            <input
                                                                                type="time"
                                                                                value={d.to}
                                                                                onChange={(e) => updateDay(clinicId, day, { to: e.target.value })}
                                                                                className="w-28 p-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400"
                                                                            />
                                                                        </div>

                                                                        {d.break?.from && d.break?.to && (
                                                                            <div className="flex items-center gap-2 text-sm bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl">
                                                                                <Coffee size={16} />
                                                                                <span>
                                                                                    Break: {d.break.from} – {d.break.to}
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-sm text-gray-500 italic">Day off</span>
                                                                )}
                                                            </div>

                                                            {isActive && (
                                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </section>
                        )}

                        <div className="flex justify-end pt-8 gap-5">
                            <button
                                onClick={() => setIsEditMode(false)}
                                className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || loading || !formData.selectedClinics.length}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-medium shadow-lg hover:from-indigo-700 hover:to-blue-700 disabled:opacity-60 cursor-pointer"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                ) : (
                    renderViewMode()
                )}



                {/* Map Modal */}
                {showMapModal && selectedClinic && (
                    <MapModal
                        isOpen={showMapModal}
                        onClose={() => setShowMapModal(false)}
                        latitude={selectedClinic.latitude}
                        longitude={selectedClinic.longitude}
                        title={selectedClinic.title}
                    />
                )}
            </div>
        </div>
    );
}