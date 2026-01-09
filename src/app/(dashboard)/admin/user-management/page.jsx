'use client';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import AllUsersTable from './UsersTable';
import { getUsers } from '@/actions/user.actions';
import Loader from '@/components/layout/Loader';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getUsers();

                if (!res.success || !res.users) {
                    setError('Failed to load users. Please try again later.');
                } else {
                    setUsers(res.users);
                }
            } catch (err) {
                console.error(err);
                setError('Something went wrong while fetching users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
            <Header users={users} />
            <AllUsersTable users={users} setUsers={setUsers} />
        </div>
    );
}