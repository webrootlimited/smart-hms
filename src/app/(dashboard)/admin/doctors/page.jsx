'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import DoctorsTable from './DoctorsTable';
import { getDoctors } from '@/actions/user.actions';
import Loader from '@/components/layout/Loader';

const Page = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            setError('');

            try {
                const res = await getDoctors();

                if (!res.success || !res.doctors) {
                    setError('Failed to load doctors. Please try again later.');
                } else {
                    setDoctors(res.doctors);
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong while fetching doctors.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
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
            <Header doctors={doctors} />
            <DoctorsTable doctors={doctors} />
        </div>
    );
};

export default Page;
