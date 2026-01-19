'use client';

import { useState, useEffect } from 'react';
import {
    Mail,
    Phone,
    Check,
    X,
    UserPlus,
    Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getStaff } from '@/actions/staff.actions';
import { updateDoctorAssistants } from '@/actions/doctor.actions';

export default function TeamAssistants({
    userData = {},
    isEditMode = false,
    setIsEditMode,
}) {
    const [assistants, setAssistants] = useState([]);
    const [availableStaff, setAvailableStaff] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ───────────────────────── LOAD CURRENT ASSISTANTS ───────────────────────── */
    useEffect(() => {
        if (userData?.doctorProfile?.assistants) {
            setAssistants(userData.doctorProfile.assistants);
        }
    }, [userData]);

    /* ───────────────────────── FETCH STAFF IN EDIT MODE ───────────────────────── */
    useEffect(() => {
        if (!isEditMode) return;

        const fetchStaff = async () => {
            setLoading(true);
            try {
                const res = await getStaff();
                if (res?.success) {
                    setAvailableStaff(res.staff || []);
                } else {
                    toast.error(res?.message || 'Failed to load staff');
                }
            } catch {
                toast.error('Error loading staff');
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [isEditMode]);

    /* ───────────────────────── TOGGLE ASSISTANT ───────────────────────── */
    const toggleAssistant = (staffId) => {
        setAssistants((prev) => {
            const exists = prev.some((a) => a._id === staffId);
            if (exists) return prev.filter((a) => a._id !== staffId);

            const staff = availableStaff.find((s) => s._id === staffId);
            return staff ? [...prev, staff] : prev;
        });
    };

    /* ───────────────────────── SAVE HANDLER ───────────────────────── */
    const handleSave = async () => {
        if (!assistants.length) {
            toast.error('Please assign at least one assistant');
            return;
        }

        try {
            const res = await updateDoctorAssistants(userData._id, assistants.map((a) => a._id));

            if (res?.success) {
                toast.success('Assistants updated successfully');
                setIsEditMode(false);
            } else {
                toast.error(res?.message || 'Failed to save');
            }
        } catch {
            toast.error('Server error');
        }
    };

    /* ───────────────────────── HELPERS ───────────────────────── */
    const getInitials = (name = '') =>
        name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'NA';

    const avatarColors = [
        'bg-blue-500',
        'bg-pink-500',
        'bg-purple-500',
        'bg-teal-500',
        'bg-amber-500',
    ];

    const AssistantCard = ({
        data,
        index,
        onRemove,
        selectable = false,
        selected = false,
    }) => (
        <div
            onClick={selectable ? () => toggleAssistant(data._id) : undefined}
            className={`bg-white rounded-3xl shadow-sm p-6 transition ${selectable ? 'cursor-pointer hover:shadow-md' : ''
                } ${selected ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
        >
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                    <div
                        className={`w-12 h-12 ${avatarColors[index % avatarColors.length]} rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                    >
                        {getInitials(data.name)}
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            {data.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {data.role || 'Assistant'}
                        </p>

                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {data.status || (selected ? 'Selected' : 'Active')}
                        </span>
                    </div>
                </div>

                {onRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(data._id);
                        }}
                        className="p-2 hover:bg-red-50 rounded-full text-red-600"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <div className="space-y-3">
                <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-700">
                        {data.email || '—'}
                    </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-700">
                        {data.phoneNumber || data.phone || '—'}
                    </span>
                </div>
            </div>
        </div>
    );

    /* ───────────────────────── UI ───────────────────────── */
    return (
        <div className="bg-gray-50">
            <div className="max-w-7xl mx-auto">


                {isEditMode ? (
                    <>
                        {/* Selected */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Check className="text-green-600" />
                                Selected Assistants ({assistants.length})
                            </h2>

                            {assistants.length === 0 ? (
                                <div className="rounded-3xl shadow-sm p-8 text-center text-gray-500">
                                    No assistants selected yet
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {assistants.map((a, i) => (
                                        <AssistantCard
                                            key={a._id}
                                            data={a}
                                            index={i}
                                            onRemove={toggleAssistant}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Available */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <UserPlus className="text-indigo-600" />
                                Available Staff
                            </h2>

                            {loading ? (
                                <div className="bg-white rounded-3xl shadow-sm p-8 text-center text-gray-500">
                                    Loading...
                                </div>
                            ) : availableStaff.length === 0 ? (
                                <div className="bg-white rounded-3xl shadow-sm p-8 text-center text-gray-500">
                                    No available staff found
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {availableStaff.map((s, i) => (
                                        <AssistantCard
                                            key={s._id}
                                            data={s}
                                            index={i}
                                            selectable
                                            selected={assistants.some((a) => a._id === s._id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Actions */}
                        <div className="flex justify-end gap-4 pt-10">
                            <button
                                onClick={() => setIsEditMode(false)}
                                className="px-8 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition flex items-center gap-2 cursor-pointer"
                            >
                                <X size={16} />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 shadow-md cursor-pointer"
                            >
                                <Check size={16} />
                                Save
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                        {assistants.length === 0 ? (
                            <div className="col-span-full bg-white rounded-3xl shadow-sm p-8 text-center text-gray-500">
                                No assistants assigned yet
                            </div>
                        ) : (
                            assistants.map((a, i) => (
                                <AssistantCard key={a._id} data={a} index={i} />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}