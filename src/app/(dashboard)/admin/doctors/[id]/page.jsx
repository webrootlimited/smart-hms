'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/components/layout/Loader';

import Header from './Header';
import PersonalInfo from './PersonalInfo';
import WorkSchedule from './WorkSchedule';
import AppointmentRules from './AppointmentRules';
import Telehealth from './Telehealth';
import Certifications from './Certifications';
import Assistants from './Assistants';

import { User, Clock, Home, Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { getUserDetails } from '@/actions/user.actions';

const DoctorDetailPage = () => {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Read edit-mode param
    const editModeParam = searchParams.get('edit-mode')?.toLowerCase().trim();
    const initialEditMode = editModeParam === 'true';

    const [isEditMode, setIsEditModeState] = useState(initialEditMode);

    const [activeTab, setActiveTab] = useState('personal-info');

    // Custom setter that also updates URL query param
    const setIsEditMode = (newMode) => {
        setIsEditModeState(newMode);

        // Update URL without reloading page
        const currentParams = new URLSearchParams(searchParams.toString());
        if (newMode) {
            currentParams.set('edit-mode', 'true');
        } else {
            currentParams.delete('edit-mode');
        }

        router.replace(`?${currentParams.toString()}`, { scroll: false });
    };

    // Fetch doctor data
    useEffect(() => {
        if (!id) {
            setError('No doctor ID provided.');
            setLoading(false);
            return;
        }

        const fetchDoctor = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await getUserDetails(id);
                if (response?.success && response.user) {
                    console.log(response.user);
                    setUserData(response.user);
                } else {
                    setError(response?.error || 'Failed to load doctor details.');
                }
            } catch (err) {
                console.error('Error fetching doctor:', err);
                setError('Something went wrong.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    // Sync state when URL changes (back/forward navigation)
    useEffect(() => {
        const currentParam = searchParams.get('edit-mode')?.toLowerCase().trim();
        setIsEditModeState(currentParam === 'true');
    }, [searchParams]);

    const tabs = [
        { key: 'personal-info', label: 'Personal Info', icon: User },
        { key: 'work-setup', label: 'Work Setup', icon: Clock },
        { key: 'appointment-rules', label: 'Appointment Rules', icon: Calendar },
        { key: 'telehealth', label: 'Telehealth', icon: Briefcase },
        { key: 'certifications', label: 'Certifications', icon: CheckCircle },
        { key: 'assistants', label: 'Assistants', icon: CheckCircle },
    ];

    const renderTabContent = () => {
        const commonProps = {
            userData,
            isEditMode,
            setIsEditMode,
        };

        switch (activeTab) {
            case 'personal-info': return <PersonalInfo {...commonProps} />;
            case 'work-setup': return <WorkSchedule {...commonProps} />;
            case 'appointment-rules': return <AppointmentRules {...commonProps} />;
            case 'telehealth': return <Telehealth {...commonProps} />;
            case 'certifications': return <Certifications {...commonProps} />;
            case 'assistants': return <Assistants {...commonProps} />;
            default: return null;
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;

    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;

    return (
        <div className="p-4 space-y-10">
            <Header userData={userData} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />

            <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
                <div className="flex flex-wrap gap-3 justify-start">
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        return (
                            <button
                                key={t.key}
                                onClick={() => setActiveTab(t.key)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${activeTab === t.key ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-4 h-4" /> {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {renderTabContent()}
        </div>
    );
};

export default DoctorDetailPage;