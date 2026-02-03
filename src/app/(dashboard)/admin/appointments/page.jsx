'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import AppointmentTypesTable from './AppointmentsTable';
import { getAppointmentTypes } from '@/actions/appointmentType.actions';
import Loader from '@/components/layout/Loader';

export default function Page() {
    const [appointmentTypes, setAppointmentTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointmentTypes = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getAppointmentTypes();

                if (!res.success) {
                    setError('Failed to load appointment types. Please try again later.');
                } else {
                    setAppointmentTypes(res.data);
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong while fetching appointment types.');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointmentTypes();
    }, []);

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
            <Header appointmentTypes={appointmentTypes} />
            <AppointmentTypesTable
                appointmentTypes={appointmentTypes}
                setAppointmentTypes={setAppointmentTypes}
            />
        </div>
    );
}
