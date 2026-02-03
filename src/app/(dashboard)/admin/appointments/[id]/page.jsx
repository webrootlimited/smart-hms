'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import Form from './Form';
import { getAppointmentTypeDetails } from '@/actions/appointmentType.actions';
import Loader from '@/components/layout/Loader';
import { useParams, useSearchParams } from 'next/navigation';

export default function Page() {
    const [appointmentType, setAppointmentType] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);

    const { id } = useParams();
    const searchParams = useSearchParams();

    // Check if edit-mode=true in search params
    useEffect(() => {
        if (searchParams?.get('edit-mode') === 'true') {
            setIsEditMode(true);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchAppointmentTypeDetails = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getAppointmentTypeDetails(id);

                if (!res.success) {
                    setError(res.message);
                } else {
                    setAppointmentType(res.data);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentTypeDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="px-4 space-y-10">
            <Header
                isEditMode={isEditMode}
                appointmentType={appointmentType}
            />
            <Form
                appointmentType={appointmentType}
                setAppointmentType={setAppointmentType}
                isEditMode={isEditMode}
            />
        </div>
    );
}
