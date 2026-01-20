'use client';

import React, { useState, useMemo } from 'react';
import {
    Search,
    MoreVertical,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Shield,
    User,
    Heart,
    Activity,
    Clock,
    DollarSign,
    Edit,
    Trash2,
    Plus,
    AlertTriangle,
    Loader2,
} from 'lucide-react';
import { deleteUser } from '@/actions/user.actions';
import toast from 'react-hot-toast';

export default function Patients({ patients = [], setPatients }) {
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState('all');
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Find the patient name for the confirmation message
    const patientToDelete = patients.find(p => p._id === deleteId);

    // ---------------- FILTER + SEARCH ----------------
    const filteredPatients = useMemo(() => {
        let data = [...patients];

        if (tab === 'active') data = data.filter(p => p.active);
        if (tab === 'new') data = data.filter(p => p.isNew);

        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(
                p =>
                    (p.fullName?.toLowerCase().includes(q)) ||
                    (p.email?.toLowerCase().includes(q)) ||
                    (p.phoneNumber?.toLowerCase().includes(q)) ||
                    (p._id?.toLowerCase().includes(q))
            );
        }

        return data;
    }, [patients, search, tab]);

    // ---------------- DELETE ----------------
    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await deleteUser(deleteId);
            if (res.success) {
                toast.success("Patient deleted successfully");
                setPatients(p => p.filter(patient => patient._id !== deleteId));
                setDeleteId(null);
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Failed to delete patient");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                        <div className="flex items-start md:items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Patient Management
                                </h1>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Manage all patient records and information
                                </p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Export
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-100 rounded-xl p-4">
                            <p className="text-2xl font-bold text-gray-900">{patients.length}</p>
                            <p className="text-xs text-gray-600 mt-1">Total Patients</p>
                        </div>
                        <div className="bg-green-100 rounded-xl p-4">
                            <p className="text-2xl font-bold text-green-700">0</p>
                            <p className="text-xs text-gray-600 mt-1">New This Month</p>
                        </div>
                        <div className="bg-purple-100 rounded-xl p-4">
                            <p className="text-2xl font-bold text-purple-700">0</p>
                            <p className="text-xs text-gray-600 mt-1">Appointments Today</p>
                        </div>
                        <div className="bg-pink-100 rounded-xl p-4">
                            <p className="text-2xl font-bold text-pink-700">0%</p>
                            <p className="text-xs text-gray-600 mt-1">Growth Rate</p>
                        </div>
                    </div>

                    {/* Search + Tabs */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search by name, ID, phone, or email..."
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {['all', 'active', 'new'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTab(t)}
                                    className={`px-4 py-2 rounded-lg text-sm cursor-pointer font-medium ${tab === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                        }`}
                                >
                                    {t === 'all' ? 'All Patients' : t === 'active' ? 'Active' : 'New'}
                                </button>
                            ))}
                            <button className="p-2 bg-gray-100 rounded-lg">
                                <MoreVertical className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* ---------------- Patient List ---------------- */}
                <div className="space-y-4">
                    {filteredPatients.length === 0 && (
                        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                            <User className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-gray-800">No patients found</h3>
                            <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {filteredPatients.map(patient => {
                        const profile = patient.patientProfile || {};

                        return (
                            <div key={patient._id} className="bg-white rounded-2xl shadow-sm p-6">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 ${profile.avatarColor || 'bg-blue-500'} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                                            {profile.gender === 'female' ? '♀' : '♂'}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                                    {patient.fullName || 'Unnamed Patient'}
                                                </h3>
                                                <span className="text-sm text-gray-500">{patient._id}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-600">
                                                <span>{profile.age ?? '—'} years</span>
                                                <span>•</span>
                                                <span>{profile.gender || '—'}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Heart className="w-3 h-3" />
                                                    {profile.bloodType || '—'}
                                                </span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Activity className="w-3 h-3" />
                                                    {profile.visits ?? 0} visits
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                    </button>
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <Info icon={<Phone className="w-3 h-3" />} label="Phone" value={patient.phoneNumber} />
                                    <Info icon={<Mail className="w-3 h-3" />} label="Email" value={patient.email} />
                                    <Info icon={<MapPin className="w-3 h-3" />} label="Address" value={patient.address} />
                                    <Info icon={<Shield className="w-3 h-3" />} label="Insurance" value={profile.insurance} />
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                    <Info label="Primary Doctor" value={profile.primaryDoctor} />
                                    <Info label="Last Visit" value={profile.lastVisit} />
                                    <Info label="Next Appointment" value={profile.nextAppointment || 'Not scheduled'} />
                                    <Info label="Balance Due" value={profile.balance ? `$${Number(profile.balance).toFixed(2)}` : '$0.00'} />
                                </div>

                                {/* Conditions */}
                                {Array.isArray(profile.conditions) && profile.conditions.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-600 mb-2">Conditions:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {profile.conditions.map(c => (
                                                <span key={c} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer">
                                        <User className="w-4 h-4" />
                                        View Details
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 cursor-pointer">
                                        <Edit className="w-4 h-4" />
                                        Edit Profile
                                    </button>
                                    <button
                                        className="p-2 bg-white border border-gray-300 hover:bg-blue-600 hover:text-white rounded-lg cursor-pointer"
                                        onClick={() => setDeleteId(patient._id)}
                                    >
                                        <Trash2 className="w-4 h-4 text-gray-500 hover:text-white" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ---------------- DELETE CONFIRMATION MODAL (designed exactly like your example) ---------------- */}
            {deleteId && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Delete Patient?</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete <strong>{patientToDelete?.fullName || 'this patient'}</strong>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                disabled={loading}
                                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={loading}
                                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Patient'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Info({ icon, label, value }) {
    return (
        <div className="bg-gray-100 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                {icon}
                {label}
            </div>
            <p className="text-sm font-medium text-gray-900">{value ?? '--'}</p>
        </div>
    );
}