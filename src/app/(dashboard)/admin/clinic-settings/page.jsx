'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import ClinicLocations from './ClinicLocations';
import { getClinics } from '@/actions/clinic.actions';
import Loader from '@/components/layout/Loader';

export default function ClinicsData() {
    const [clinics, setClinics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchClinics = async () => {
            setLoading(true);
            setError('');

            try {
                const res = await getClinics();

                if (!res.success || !res.clinics) {
                    setError('Failed to load clinics. Please try again later.');
                } else {
                    setClinics(res.clinics);
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong while fetching clinics.');
            } finally {
                setLoading(false);
            }
        };

        fetchClinics();
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
            <div className="text-center py-20">
                <p className="text-red-600 text-lg font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="px-4 space-y-10">
            <Header clinics={clinics} />
            <div className="px-4 py-10 space-y-10 max-w-7xl mx-auto">
                <ClinicLocations clinics={clinics} />
            </div>
        </div>
    );
}
