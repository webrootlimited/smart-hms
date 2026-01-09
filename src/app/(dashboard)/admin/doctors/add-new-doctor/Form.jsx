"use client"

import { useState, useEffect } from 'react';
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
    Eye,
    EyeOff,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getClinics } from '@/actions/clinic.actions';
import { registerUser } from '@/actions/user.actions';

export default function Form() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        dob: '',
        gender: '',
        password: '',
        department: '',
        speciality: '',
        employeeId: '',
        startDate: '',
        selectedClinic: '',
        profilePic: null,  // ← renamed from profilePhoto
        schedule: {
            Monday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            Tuesday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            Wednesday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            Thursday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            Friday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            Saturday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            Sunday: { open: false, from: '', to: '', break: { from: '', to: '' } },
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [clinics, setClinics] = useState([]);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchClinics = async () => {
            try {
                const res = await getClinics();
                if (res.success && res.clinics) {
                    setClinics(res.clinics);
                } else {
                    toast.error('Failed to load clinics');
                }
            } catch (err) {
                toast.error('Failed to load clinics');
            }
        };
        fetchClinics();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'file') {
            const file = files[0];
            setFormData(prev => ({ ...prev, profilePic: file }));
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => setPreviewUrl(reader.result);
                reader.readAsDataURL(file);
            } else {
                setPreviewUrl(null);
            }
            setTouched(prev => ({ ...prev, profilePic: true }));
        }
        else if (name.includes('schedule.')) {
            const parts = name.split('.');
            const day = parts[1];
            const field = parts[2];
            const subfield = parts[3];

            if (subfield) {
                setFormData(prev => ({
                    ...prev,
                    schedule: {
                        ...prev.schedule,
                        [day]: {
                            ...prev.schedule[day],
                            break: {
                                ...prev.schedule[day].break,
                                [subfield]: value
                            }
                        }
                    }
                }));
            }
            else if (field === 'open') {
                // ← Auto-fill default times when day is checked
                setFormData(prev => ({
                    ...prev,
                    schedule: {
                        ...prev.schedule,
                        [day]: {
                            ...prev.schedule[day],
                            open: checked,
                            from: checked ? '08:00' : '',
                            to: checked ? '17:00' : '',
                            break: checked
                                ? { from: '13:00', to: '14:00' }
                                : { from: '', to: '' }
                        }
                    }
                }));
            }
            else {
                setFormData(prev => ({
                    ...prev,
                    schedule: {
                        ...prev.schedule,
                        [day]: {
                            ...prev.schedule[day],
                            [field]: value
                        }
                    }
                }));
            }
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
            if (name === 'selectedClinic') {
                setFormData(prev => ({ ...prev, department: '' }));
            }
        }

        setTouched(prev => ({ ...prev, [name]: true }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateAllFields = () => {
        const newErrors = {};
        const required = ['fullName', 'email', 'phoneNumber', 'password', 'department', 'speciality', 'startDate', 'selectedClinic'];

        required.forEach(field => {
            const val = formData[field];
            if (!val || (typeof val === 'string' && !val.trim())) {
                newErrors[field] = 'This field is required';
            }
        });

        if (!formData.profilePic) {
            newErrors.profilePic = 'Profile photo is required';
        }

        const hasValidSchedule = Object.values(formData.schedule).some(day =>
            day.open && day.from && day.to
        );
        if (!hasValidSchedule) {
            newErrors.schedule = 'At least one working day with hours is required';
        }

        setErrors(prev => ({ ...prev, ...newErrors }));
        setTouched(prev => {
            const newTouched = { ...prev };
            required.forEach(f => newTouched[f] = true);
            newTouched.profilePic = true;
            return newTouched;
        });

        return Object.keys(newErrors).length === 0;
    };

    const scrollToFirstError = () => {
        const firstError = document.querySelector('.text-red-600');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleRegister = async () => {
        if (!validateAllFields()) {
            scrollToFirstError();
            toast.error('Please fix the highlighted errors.');
            return;
        }

        console.log('Final submission data:', {
            ...formData,
            workLocation: formData.selectedClinic,
            profilePic: formData.profilePic || null
        });
        setIsSubmitting(true);

        try {
            const res = await registerUser({
                ...formData,
                workLocation: formData.selectedClinic,
                profilePic: formData.profilePic || null
            }, 'doctor')
            if (res.success) {
                toast.success("Provider registered successfully");
                handleCancel();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            fullName: '', email: '', phoneNumber: '', dob: '', gender: '',
            password: '', department: '', speciality: '', employeeId: '', startDate: '', selectedClinic: '',
            profilePic: null,
            schedule: {
                Monday: { open: false, from: '', to: '', break: { from: '', to: '' } },
                Tuesday: { open: false, from: '', to: '', break: { from: '', to: '' } },
                Wednesday: { open: false, from: '', to: '', break: { from: '', to: '' } },
                Thursday: { open: false, from: '', to: '', break: { from: '', to: '' } },
                Friday: { open: false, from: '', to: '', break: { from: '', to: '' } },
                Saturday: { open: false, from: '', to: '', break: { from: '', to: '' } },
                Sunday: { open: false, from: '', to: '', break: { from: '', to: '' } },
            }
        });
        setPreviewUrl(null);
        setErrors({});
        setTouched({});
        setShowPassword(false);
    };

    const getInputClass = (field) => {
        const hasError = touched[field] && errors[field];
        return `w-full px-4 py-2 border rounded text-sm md:text-base transition-colors focus:outline-none focus:ring-2 ${hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`;
    };

    const getIconInputClass = (field) => {
        const hasError = touched[field] && errors[field];
        return `w-full pl-12 pr-4 py-2 border rounded text-sm md:text-base transition-colors focus:outline-none focus:ring-2 ${hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`;
    };

    const selectedClinicData = clinics.find(c => c._id === formData.selectedClinic);
    const availableDepartments = selectedClinicData?.services || [];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <User className="h-6 w-6 text-blue-600 mr-3" />
                            <h2 className="text-base md:text-lg font-semibold text-gray-800">Personal Information</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm md:text-base text-gray-700 mb-2">Profile Photo *</label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border-2 border-dashed border-gray-400">
                                        {previewUrl ? (
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="h-16 w-16 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <label className="cursor-pointer px-6 py-4 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition flex flex-col items-center gap-2">
                                        <Upload className="h-8 w-8 text-gray-500" />
                                        <span className="text-sm text-gray-600">Click to upload photo</span>
                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {touched.profilePic && errors.profilePic && (
                                    <p className="mt-2 text-sm text-red-600">{errors.profilePic}</p>
                                )}
                                <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                            </div>

                            <div>
                                <label className="block text-sm md:text-base text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={getInputClass('fullName')}
                                />
                                {touched.fullName && errors.fullName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Email Address *</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={getIconInputClass('email')}
                                        />
                                    </div>
                                    {touched.email && errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Phone Number *</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={getIconInputClass('phoneNumber')}
                                        />
                                    </div>
                                    {touched.phoneNumber && errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm md:text-base text-gray-700 mb-2">Password *</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={getInputClass('password')}
                                        placeholder="Enter strong password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Date of Birth</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded text-sm md:text-base" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded text-sm md:text-base">
                                        <option value="">Select</option>
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

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Department *</label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <select
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            disabled={!formData.selectedClinic}
                                            className={getIconInputClass('department')}
                                        >
                                            <option value="">{formData.selectedClinic ? 'Select Department' : 'Select Location First'}</option>
                                            {availableDepartments.map((dept, i) => (
                                                <option key={i} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {touched.department && errors.department && <p className="mt-1 text-sm text-red-600">{errors.department}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Speciality *</label>
                                    <div className="relative">
                                        <Stethoscope className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            name="speciality"
                                            placeholder="e.g., Cardiologist"
                                            value={formData.speciality}
                                            onChange={handleChange}
                                            className={getIconInputClass('speciality')}
                                        />
                                    </div>
                                    {touched.speciality && errors.speciality && <p className="mt-1 text-sm text-red-600">{errors.speciality}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm md:text-base text-gray-700 mb-2">Work Location *</label>
                                <div className="space-y-2">
                                    {clinics.length === 0 ? (
                                        <p className="text-gray-500 text-sm">Loading clinics...</p>
                                    ) : (
                                        clinics.map(clinic => (
                                            <div
                                                key={clinic._id}
                                                onClick={() => handleChange({ target: { name: 'selectedClinic', value: clinic._id } })}
                                                className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition text-sm md:text-base ${formData.selectedClinic === clinic._id
                                                    ? 'bg-blue-50 border-blue-500'
                                                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <MapPin className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                                                <span>{clinic.fullAddress}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                                {touched.selectedClinic && errors.selectedClinic && (
                                    <p className="mt-1 text-sm text-red-600">{errors.selectedClinic}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Employee ID</label>
                                    <div className="relative">
                                        <IdCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value="Auto-generated"
                                            readOnly
                                            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600 cursor-not-allowed text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm md:text-base text-gray-700 mb-2">Start Date *</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className={getIconInputClass('startDate')}
                                        />
                                    </div>
                                    {touched.startDate && errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Setup */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center mb-4">
                            <Clock className="h-6 w-6 text-green-600 mr-3" />
                            <h2 className="text-base md:text-lg font-semibold text-gray-800">Schedule Setup *</h2>
                        </div>
                        <p className="text-sm md:text-base text-gray-500 mb-5">Set weekly availability and break times</p>

                        {errors.schedule && <p className="text-sm text-red-600 mb-4">{errors.schedule}</p>}

                        <div className="space-y-5">
                            {days.map(day => {
                                const dayData = formData.schedule[day];
                                return (
                                    <div key={day} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center mb-4">
                                            <input
                                                type="checkbox"
                                                id={day}
                                                name={`schedule.${day}.open`}
                                                checked={dayData.open}
                                                onChange={handleChange}
                                                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={day} className="ml-3 text-base font-semibold text-gray-800">{day}</label>
                                        </div>

                                        {dayData.open && (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours From</label>
                                                        <input
                                                            type="time"
                                                            name={`schedule.${day}.from`}
                                                            value={dayData.from}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours To</label>
                                                        <input
                                                            type="time"
                                                            name={`schedule.${day}.to`}
                                                            value={dayData.to}
                                                            onChange={handleChange}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="pt-3 border-t border-gray-300">
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <Coffee className="h-5 w-5 text-orange-600" />
                                                        <label className="text-sm font-medium text-gray-700">Lunch Break (optional)</label>
                                                    </div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm text-gray-600 mb-1">Break From</label>
                                                            <input
                                                                type="time"
                                                                name={`schedule.${day}.break.from`}
                                                                value={dayData.break.from}
                                                                onChange={handleChange}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm text-gray-600 mb-1">Break To</label>
                                                            <input
                                                                type="time"
                                                                name={`schedule.${day}.break.to`}
                                                                value={dayData.break.to}
                                                                onChange={handleChange}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
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
                        </div>

                        <div className="mt-8 space-y-3">
                            <button
                                onClick={handleRegister}
                                disabled={isSubmitting}
                                className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center cursor-pointer justify-center gap-2 transition font-medium disabled:opacity-50"
                            >
                                <CheckCircle2 className="h-5 w-5" />
                                Register Provider
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isSubmitting}
                                className="w-full border border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer hover:text-black"
                            >
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
                            <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-gray-500" /> Medical license (current)</li>
                            <li className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-gray-500" /> Board certification</li>
                            <li className="flex items-center gap-2"><Pill className="h-5 w-5 text-gray-500" /> DEA certificate (if applicable)</li>
                            <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-gray-500" /> Malpractice insurance</li>
                            <li className="flex items-center gap-2"><PenTool className="h-5 w-5 text-gray-500" /> Digital signature sample</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}