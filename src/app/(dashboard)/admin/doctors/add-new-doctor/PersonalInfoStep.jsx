// components/doctor-registration/PersonalInfoStep.jsx
"use client"

import { useState, useEffect } from 'react'
import { User, Mail, Phone, Calendar, Upload, Eye, EyeOff } from 'lucide-react'
import toast from 'react-hot-toast'

import {
    saveDoctorPersonalInfo,
    updateDoctorPersonalInfo
} from "@/actions/doctor.actions"

export default function PersonalInfoStep({ id, userData, onComplete }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dob: '',
        gender: '',
        password: '',
        profilePic: null,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [previewUrl, setPreviewUrl] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    useEffect(() => {
        if (id && userData) {
            setFormData(prev => ({
                ...prev,
                fullName: userData.fullName || '',
                email: userData.email || '',
                phoneNumber: userData.phoneNumber || '',
                dob: userData.dob || '',
                gender: userData.gender || '',
            }))
            if (userData.profilePic) setPreviewUrl(userData.profilePic)
        }
    }, [id, userData])


    useEffect(() => {
        if (formData.profilePic instanceof File) {
            const reader = new FileReader()
            reader.onloadend = () => setPreviewUrl(reader.result)
            reader.readAsDataURL(formData.profilePic)
        } else if (!id) {
            setPreviewUrl(null)
        }
    }, [formData.profilePic, id])


    const handleChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === 'file') {
            setFormData(prev => ({ ...prev, profilePic: files?.[0] || null }))
            setTouched(prev => ({ ...prev, profilePic: true }))
        } else {
            setFormData(prev => ({ ...prev, [name]: value }))
            setTouched(prev => ({ ...prev, [name]: true }))
        }
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const getInputClass = (field) => {
        const hasError = touched[field] && errors[field]
        return `w-full px-4 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 ${hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`
    }

    const getIconInputClass = (field) => {
        const hasError = touched[field] && errors[field]
        return `w-full pl-11 pr-4 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 ${hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`
    }


    const validateForm = () => {
        const newErrors = {}
        if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required'
        if (!formData.email?.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
        if (!formData.phoneNumber?.trim()) newErrors.phoneNumber = 'Phone number is required'

        // password required only when creating new
        if (!id) {
            if (!formData.password?.trim()) newErrors.password = 'Password is required'
            else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
        }

        // profilePic required only when creating new
        if (!id && !formData.profilePic) newErrors.profilePic = 'Profile photo is required'

        setErrors(newErrors)
        setTouched({
            fullName: true,
            email: true,
            phoneNumber: true,
            password: true,
            profilePic: true,
        })

        return Object.keys(newErrors).length === 0
    }


    const handleSubmit = async () => {
        if (!validateForm()) {
            toast.error('Please fill all required fields correctly')
            return
        }

        setIsSubmitting(true)
        try {


            let res
            if (id) {
                res = await updateDoctorPersonalInfo(id, formData)
            } else {
                res = await saveDoctorPersonalInfo(formData)
            }

            if (res.success) {
                toast.success(id ? 'Personal info updated successfully' : 'Personal info saved successfully')
                onComplete(res.userId)
            } else {
                toast.error(res.message || 'Something went wrong')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center mb-8">
                <User className="h-7 w-7 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
            </div>

            <div className="space-y-7">
                {/* Profile Photo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex-shrink-0">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <User size={48} />
                                </div>
                            )}
                        </div>

                        <label className="cursor-pointer px-6 py-5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 text-gray-500" />
                            <span className="text-sm font-medium text-gray-600">Upload Photo</span>
                            <input
                                type="file"
                                name="profilePic"
                                accept="image/jpeg,image/png,image/gif"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    {touched.profilePic && errors.profilePic && (
                        <p className="mt-2 text-sm text-red-600">{errors.profilePic}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF. Max 2MB recommended.</p>
                </div>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={getInputClass('fullName')}
                        placeholder="Dr. Muhammad Ahmed"
                    />
                    {touched.fullName && errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                    )}
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={getIconInputClass('email')}
                                placeholder="doctor@example.com"
                            />
                        </div>
                        {touched.email && errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className={getIconInputClass('phoneNumber')}
                                placeholder="+92 300 1234567"
                            />
                        </div>
                        {touched.phoneNumber && errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                        )}
                    </div>
                </div>

                {/* Password (only for new doctor) */}
                {!id && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={getInputClass('password')}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {touched.password && errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>
                )}

                {/* DOB & Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob ? formData.dob.split('T')[0] : ""} onChange={handleChange}
                                className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">{formData.gender ?? "Select gender"}</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 cursor-pointer py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed font-medium shadow-md"
                >
                    {isSubmitting ? 'Saving...' : 'Save & Continue'}
                </button>
            </div>
        </div>
    )
}
