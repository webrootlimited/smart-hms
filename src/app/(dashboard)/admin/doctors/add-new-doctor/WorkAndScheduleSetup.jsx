"use client"

import { useState, useEffect } from 'react'
import {
    Clock, Building, MapPin, Coffee, Video, Check,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getClinics } from '@/actions/clinic.actions'
import { updateDoctorWorkSetup } from '@/actions/doctor.actions'

const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const defaultDay = {
    day: '',
    open: false,
    from: '',
    to: '',
    break: { from: '', to: '' }
}

export default function WorkAndScheduleSetup({
    id,
    userData = {},
    onComplete,
}) {
    console.log("User Data:", userData)
    const [clinics, setClinics] = useState([])
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [formData, setFormData] = useState({
        selectedClinics: [],
        clinicData: {},
        specialities: [''],
        startDate: '',
        telehealthEnabled: false,
    })

    // Pre-fill existing data
    useEffect(() => {
        const doctorProfile = userData?.doctorProfile;

        if (!doctorProfile?.workLocations?.length) return;

        const selected = [];
        const clinicMap = {};

        doctorProfile.workLocations.forEach(loc => {
            const clinicId = loc.clinic?._id || loc.clinic;
            if (!clinicId) return;

            selected.push(clinicId);

            const scheduleObj = {};
            dayNames.forEach(day => {
                const existing = loc.schedule?.find(s => s.day === day);
                scheduleObj[day] = existing ? { ...existing } : { ...defaultDay, day };
            });

            clinicMap[clinicId] = {
                department: loc.department || '',
                schedule: scheduleObj
            };
        });

        setFormData(prev => ({
            ...prev,
            selectedClinics: selected,
            clinicData: clinicMap,
            specialities: doctorProfile.specialities?.length
                ? [...doctorProfile.specialities]
                : [''],
            startDate: doctorProfile.startDate
                ? new Date(doctorProfile.startDate).toISOString().split('T')[0]
                : '',
            telehealthEnabled: !!doctorProfile.telehealthEnabled,
        }));
    }, [userData]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const res = await getClinics()
                if (res.success) {
                    setClinics(res.clinics || [])
                } else {
                    toast.error(res.message || 'Failed to load clinics')
                }
            } catch (err) {
                toast.error('Error loading clinics')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const toggleClinic = (clinicId) => {
        setFormData(prev => {
            const isSelected = prev.selectedClinics.includes(clinicId)

            if (isSelected) {
                const { [clinicId]: _, ...rest } = prev.clinicData
                return {
                    ...prev,
                    selectedClinics: prev.selectedClinics.filter(id => id !== clinicId),
                    clinicData: rest
                }
            }

            const clinic = clinics.find(c => c._id === clinicId)
            return {
                ...prev,
                selectedClinics: [...prev.selectedClinics, clinicId],
                clinicData: {
                    ...prev.clinicData,
                    [clinicId]: {
                        department: '',
                        schedule: dayNames.reduce((acc, day) => ({
                            ...acc,
                            [day]: { ...defaultDay, day }
                        }), {})
                    }
                }
            }
        })
    }

    const updateDay = (clinicId, day, updates) => {
        setFormData(prev => {
            const clinic = prev.clinicData[clinicId] || {}
            const currentDay = clinic.schedule?.[day] || { ...defaultDay, day }

            const newDay = { ...currentDay, ...updates }

            // Auto-fill defaults when enabling
            if (updates.open === true && !currentDay.from) {
                newDay.from = '08:00'
                newDay.to = '17:00'
                newDay.break = { from: '13:00', to: '14:00' }
            }

            if (updates.open === false) {
                newDay.from = ''
                newDay.to = ''
                newDay.break = { from: '', to: '' }
            }

            return {
                ...prev,
                clinicData: {
                    ...prev.clinicData,
                    [clinicId]: {
                        ...clinic,
                        schedule: {
                            ...(clinic.schedule || {}),
                            [day]: newDay
                        }
                    }
                }
            }
        })
    }

    const updateDepartment = (clinicId, value) => {
        setFormData(prev => ({
            ...prev,
            clinicData: {
                ...prev.clinicData,
                [clinicId]: {
                    ...prev.clinicData[clinicId],
                    department: value
                }
            }
        }))
    }

    const getClinicServices = (clinicId) => {
        const clinic = clinics.find(c => c._id === clinicId)
        return clinic?.services || []
    }

    const validate = () => {
        if (!formData.selectedClinics.length) {
            toast.error('Select at least one clinic')
            return false
        }

        if (!formData.specialities[0]?.trim()) {
            toast.error('Speciality is required')
            return false
        }

        if (!formData.startDate) {
            toast.error('Start date is required')
            return false
        }

        for (const clinicId of formData.selectedClinics) {
            const sched = formData.clinicData[clinicId]?.schedule || {}
            const hasActive = dayNames.some(d => sched[d]?.open && sched[d]?.from && sched[d]?.to)
            if (!hasActive) {
                toast.error(`Set working hours for at least one day in each clinic`)
                return false
            }
        }
        return true
    }

    const preparePayload = () => {
        return {
            workLocations: formData.selectedClinics.map(clinicId => {
                const info = formData.clinicData[clinicId] || {}
                const schedule = dayNames
                    .map(day => info.schedule?.[day])
                    .filter(Boolean)
                    .filter(s => s.open) // you can change this to send all days if needed

                return {
                    clinic: clinicId,
                    department: info.department || '',
                    schedule
                }
            }),
            specialities: formData.specialities.filter(Boolean),
            startDate: formData.startDate ? new Date(formData.startDate) : undefined,
            telehealthEnabled: formData.telehealthEnabled,
        }
    }

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsSubmitting(true);

        try {
            const payload = preparePayload();
            console.log("Payload being sent:", payload);

            // Call server action
            const response = await updateDoctorWorkSetup(id, payload);

            if (response.success) {
                toast.success(response.message || 'Schedule saved successfully!');
                onComplete();
            } else {
                toast.error(response.message || 'Failed to save schedule');
            }

        } catch (err) {
            console.error("Error updating schedule:", err);
            toast.error('Failed to save schedule');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <Clock className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Work Schedule Setup</h1>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Configure your working hours for each clinic you serve</p>
            </div>

            {loading ? (
                <div className="text-center py-12 sm:py-16 text-gray-500">Loading clinics...</div>
            ) : (
                <div className="space-y-8 sm:space-y-10">
                    {/* Clinic Selection */}
                    <section>
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                            <Building className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600" />
                            Select Clinics
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {clinics.map(clinic => {
                                const selected = formData.selectedClinics.includes(clinic._id)
                                return (
                                    <div
                                        key={clinic._id}
                                        onClick={() => toggleClinic(clinic._id)}
                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 relative
                      ${selected
                                                ? 'border-indigo-500 bg-indigo-50/70 shadow-md'
                                                : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'}`}
                                    >
                                        {selected && (
                                            <div className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full p-1 shadow">
                                                <Check size={16} />
                                            </div>
                                        )}
                                        <div className="flex gap-3">
                                            <MapPin className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h3 className="font-medium text-sm sm:text-base text-gray-900">{clinic.name}</h3>
                                                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 line-clamp-2">{clinic.fullAddress}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Per-Clinic Schedules */}
                    {formData.selectedClinics.length > 0 && (
                        <section className="space-y-6 sm:space-y-8">
                            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                                Working Hours
                            </h2>

                            {formData.selectedClinics.map(clinicId => {
                                const clinic = clinics.find(c => c._id === clinicId)
                                if (!clinic) return null

                                const clinicInfo = formData.clinicData[clinicId] || {}
                                const schedule = clinicInfo.schedule || {}

                                return (
                                    <div key={clinicId} className="bg-gray-50/60 rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm">
                                        <div className="mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-gray-200">
                                            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{clinic.name}</h3>
                                            <p className="text-xs sm:text-sm text-gray-600 mt-1">{clinic.fullAddress}</p>
                                        </div>

                                        {/* Department Select */}
                                        <div className="mb-5 sm:mb-6">
                                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                                Department at this clinic
                                            </label>
                                            <select
                                                value={clinicInfo.department || ''}
                                                onChange={e => updateDepartment(clinicId, e.target.value)}
                                                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                                            >
                                                <option value="">Select Department</option>
                                                {getClinicServices(clinicId).map(dept => (
                                                    <option key={dept} value={dept}>
                                                        {dept}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Days Grid */}
                                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                            {dayNames.map(day => {
                                                const d = schedule[day] || { ...defaultDay, day }
                                                const active = d.open && d.from && d.to

                                                return (
                                                    <div
                                                        key={day}
                                                        className={`rounded-lg border p-3 sm:p-4 transition-all
                              ${active ? 'bg-green-50/70 border-green-200' : 'bg-white border-gray-200'}`}
                                                    >
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-2 sm:gap-3">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={d.open}
                                                                    onChange={e => updateDay(clinicId, day, { open: e.target.checked })}
                                                                    className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                                                />
                                                                <span className="font-medium text-sm sm:text-base text-gray-800">{day}</span>
                                                            </div>
                                                            {active && (
                                                                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-medium">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>

                                                        {d.open && (
                                                            <div className="space-y-3 sm:space-y-4">
                                                                {/* Time Row - Full Width */}
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <div>
                                                                        <label className="block text-xs sm:text-sm text-gray-600 mb-1">From</label>
                                                                        <input
                                                                            type="time"
                                                                            value={d.from}
                                                                            onChange={e => updateDay(clinicId, day, { from: e.target.value })}
                                                                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-xs sm:text-sm text-gray-600 mb-1">To</label>
                                                                        <input
                                                                            type="time"
                                                                            value={d.to}
                                                                            onChange={e => updateDay(clinicId, day, { to: e.target.value })}
                                                                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Break - Bottom, Pretty */}
                                                                <div className="pt-3 border-t border-gray-200">
                                                                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                                                                        <Coffee className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                                                                        <span className="text-xs sm:text-sm font-medium text-gray-700">Lunch / Break (optional)</span>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        <input
                                                                            type="time"
                                                                            value={d.break.from}
                                                                            onChange={e => updateDay(clinicId, day, { break: { ...d.break, from: e.target.value } })}
                                                                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                                        />
                                                                        <input
                                                                            type="time"
                                                                            value={d.break.to}
                                                                            onChange={e => updateDay(clinicId, day, { break: { ...d.break, to: e.target.value } })}
                                                                            className="w-full px-2 sm:px-3 py-1.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </section>
                    )}

                    {/* Global Fields */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                Primary Speciality <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.specialities[0] || ''}
                                onChange={e => setFormData(p => ({ ...p, specialities: [e.target.value] }))}
                                placeholder="e.g. Cardiologist"
                                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5">
                                Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))}
                                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </section>

                    <div className="flex items-center gap-2 sm:gap-3 py-3">
                        <input
                            type="checkbox"
                            id="telehealth"
                            checked={formData.telehealthEnabled}
                            onChange={e => setFormData(p => ({ ...p, telehealthEnabled: e.target.checked }))}
                            className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 rounded border-gray-300"
                        />
                        <label htmlFor="telehealth" className="text-sm sm:text-base text-gray-700 font-medium flex items-center gap-1.5 sm:gap-2">
                            <Video className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            Enable Telehealth / Online Consultations
                        </label>
                    </div>

                    <div className="flex justify-end pt-4 sm:pt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || loading}
                            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-medium shadow-lg hover:from-indigo-700 hover:to-blue-700 disabled:opacity-60 transition-all duration-200 cursor-pointer"
                        >
                            {isSubmitting ? 'Saving...' : 'Save & Continue'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}