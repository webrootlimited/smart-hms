'use client';

import React, { useEffect, useState } from 'react';
import { getPatients } from '@/actions/patient.actions';
import Patients from './Patients';
import Loader from '@/components/layout/Loader';

const Page = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError('');

      try {
        const res = await getPatients();

        if (!res?.success || !res?.patients) {
          setError('Failed to load patients. Please try again later.');
        } else {
          setPatients(res.patients);
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong while fetching patients.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
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
      <Patients patients={patients} setPatients={setPatients} />
    </div>
  );
};

export default Page;
