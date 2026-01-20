"use client";

import { useState, useEffect } from "react";
import {
    Mail,
    Phone,
    Check,
    X,
    UserPlus,
    Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import { getStaff } from "@/actions/staff.actions";
import {
    updateDoctorAssistants,
    deleteDoctorAssistant,
} from "@/actions/doctor.actions";

export default function TeamAssistants({
    userData = {},
    isEditMode = false,
    setIsEditMode,
}) {
    const [assistants, setAssistants] = useState([]);
    const [availableStaff, setAvailableStaff] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    /* ───────── LOAD ASSISTANTS ───────── */
    useEffect(() => {
        if (userData?.doctorProfile?.assistants) {
            setAssistants(userData.doctorProfile.assistants);
        }
    }, [userData]);

    const persistedIds =
        userData?.doctorProfile?.assistants?.map((a) => a._id) || [];

    /* ───────── FETCH STAFF ───────── */
    useEffect(() => {
        if (!isEditMode) return;

        const fetchStaff = async () => {
            setLoading(true);
            try {
                const res = await getStaff();
                if (res?.success) setAvailableStaff(res.staff || []);
                else toast.error(res?.message || "Failed to load staff");
            } catch {
                toast.error("Error loading staff");
            } finally {
                setLoading(false);
            }
        };

        fetchStaff();
    }, [isEditMode]);

    /* ───────── ADD ONLY (NO REMOVE ON CARD CLICK) ───────── */
    const toggleAssistant = (staff) => {
        setAssistants((prev) => {
            if (prev.some((a) => a._id === staff._id)) return prev;
            return [...prev, staff];
        });
    };

    /* ───────── DELETE ICON CLICK ───────── */
    const handleDeleteClick = (assistant) => {
        if (persistedIds.includes(assistant._id)) {
            setConfirmDelete(assistant);
        } else {
            setAssistants((prev) =>
                prev.filter((a) => a._id !== assistant._id)
            );
        }
    };

    /* ───────── CONFIRM DELETE ───────── */
    const confirmDeleteAssistant = async () => {
        if (!confirmDelete) return;

        setDeleting(true);
        try {
            const res = await deleteDoctorAssistant(
                userData._id,
                confirmDelete._id
            );

            if (res?.success) {
                setAssistants((prev) =>
                    prev.filter((a) => a._id !== confirmDelete._id)
                );
                toast.success("Assistant deleted");
            } else {
                toast.error(res?.message || "Delete failed");
            }
        } catch {
            toast.error("Server error");
        } finally {
            setDeleting(false);
            setConfirmDelete(null);
        }
    };

    /* ───────── SAVE ───────── */
    const handleSave = async () => {
        if (!assistants.length) {
            toast.error("Please assign at least one assistant");
            return;
        }

        setSaving(true);
        try {
            const res = await updateDoctorAssistants(
                userData._id,
                assistants.map((a) => a._id)
            );

            if (res?.success) {
                toast.success("Assistants saved");
                setIsEditMode(false);
            } else {
                toast.error(res?.message || "Save failed");
            }
        } catch {
            toast.error("Server error");
        } finally {
            setSaving(false);
        }
    };

    /* ───────── CARD (UNCHANGED STYLES) ───────── */
    const AssistantCard = ({
        data,
        index,
        selectable = false,
        selected = false,
        showDelete = false,
    }) => (
        <div
            onClick={selectable ? () => toggleAssistant(data) : undefined}
            className={`bg-white rounded-3xl shadow-sm p-6 transition ${selectable ? "cursor-pointer hover:shadow-md" : ""
                } ${selected ? "ring-2 ring-indigo-500 ring-offset-2" : ""}`}
        >
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                        {data?.fullName?.slice(0, 2).toUpperCase()}
                    </div>

                    <div>
                        <h3 className="text-base font-semibold text-gray-800">
                            {data?.fullName}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {data?.role || "Assistant"}
                        </p>
                    </div>
                </div>

                {showDelete && (
                    <button
                        disabled={deleting}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(data);
                        }}
                        className="p-2 hover:bg-red-50 rounded-full text-red-600 disabled:opacity-50 cursor-pointer"
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>

            <div className="space-y-3">
                <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-700">
                        {data?.email || "—"}
                    </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-700">
                        {data?.phoneNumber || data?.phone || "—"}
                    </span>
                </div>
            </div>
        </div>
    );

    /* ───────── UI ───────── */
    return (
        <>
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {isEditMode ? (
                        <>
                            <section className="mb-10">
                                <h2 className="text-xl font-semibold mb-4">
                                    Selected Assistants ({assistants.length})
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {assistants.map((a, i) => (
                                        <AssistantCard
                                            key={a._id}
                                            data={a}
                                            index={i}
                                            showDelete
                                        />
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">
                                    Available Staff
                                </h2>

                                {loading ? (
                                    <div className="text-center p-8 bg-white rounded-3xl">
                                        Loading...
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {availableStaff.map((s, i) => (
                                            <AssistantCard
                                                key={s._id}
                                                data={s}
                                                index={i}
                                                selectable
                                                selected={assistants.some(
                                                    (a) => a._id === s._id
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>

                            <div className="flex justify-end gap-4 pt-10">
                                <button
                                    disabled={saving}
                                    onClick={() => setIsEditMode(false)}
                                    className="px-8 py-3 bg-gray-200 rounded-xl disabled:opacity-50 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={saving}
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl disabled:opacity-50 cursor-pointer"
                                >
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6">
                            {assistants.map((a, i) => (
                                <AssistantCard key={a._id} data={a} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* CONFIRM DELETE MODAL */}
            {confirmDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
                        <h3 className="font-semibold text-lg mb-3">
                            Delete Assistant?
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete{" "}
                            <strong>{confirmDelete.name}</strong>?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                disabled={deleting}
                                onClick={() => setConfirmDelete(null)}
                                className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={deleting}
                                onClick={confirmDeleteAssistant}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
