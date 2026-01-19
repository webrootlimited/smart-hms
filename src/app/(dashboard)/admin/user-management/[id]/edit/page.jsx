'use client';

import React, { useState, useEffect } from 'react';
import EditForm from './EditForm';
import { getUserDetails, getUsers } from '@/actions/user.actions';
import Loader from '@/components/layout/Loader';
import { useParams } from 'next/navigation';

export default function Page() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const params = useParams();
    const { id: userId } = params;

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getUserDetails(userId);

                if (!res.success || !res.user) {
                    setError('Failed to load users. Please try again later.');
                } else {
                    setUser(res.user);
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong while fetching users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return (
            <>
                <div className="flex items-center justify-center py-20">

                    <Loader />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="p-8 text-center text-red-600">
                    <p>{error}</p>
                </div>
            </>
        );
    }

    return (
        <div className="px-4 space-y-10">
            <EditForm user={user} userId={userId} />
        </div>
    );
}