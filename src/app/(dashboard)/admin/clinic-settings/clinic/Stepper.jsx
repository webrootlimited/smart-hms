'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import BasicDetails from './BasicDetails';
import ClinicOperatingHours from './OperatingHours';
import FacilitiesAndServices from './Facilities';
import AssignDoctorsToClinic from './AssignDoctors';
import Success from './Success';
import Loader from '@/components/layout/Loader';
import { getClinicDetails } from '@/actions/clinic.actions';

export default function AddNewClinicLocation() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const getInitialStep = () => {
        const step = Number(searchParams.get('step'));
        return !isNaN(step) && step >= 1 && step <= 4 ? step : 1;
    };

    const [currentStep, setCurrentStep] = useState(getInitialStep);
    const [isSuccess, setIsSuccess] = useState(false);
    const [clinicData, setClinicData] = useState(null);
    const [loading, setLoading] = useState(false);

    const clinicId = searchParams.get('clinicId');

    const steps = [
        { number: 1, label: 'Basic Details' },
        { number: 2, label: 'Operating Hours' },
        { number: 3, label: 'Facilities & Services' },
        { number: 4, label: 'Assign Doctors' },
    ];

    useEffect(() => {
        if (!clinicId) return;

        const fetchClinic = async () => {
            setLoading(true);
            try {
                const res = await getClinicDetails(clinicId);
                if (res?.success) {
                    setClinicData(res.clinic);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchClinic();
    }, [clinicId, currentStep]);

    const updateStep = (step) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('step', step.toString());
        router.replace(`?${params.toString()}`, { scroll: false });
        setCurrentStep(step);
    };

    const handleNext = (newClinicId) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newClinicId) params.set('clinicId', newClinicId);

        if (currentStep < 4) {
            updateStep(currentStep + 1);
        } else {
            setIsSuccess(true);
            params.set('step', 'success');
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        if (isSuccess) return <Success clinicData={clinicData} />;

        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader />
                </div>
            );
        }

        switch (currentStep) {
            case 1:
                return <BasicDetails onNext={handleNext} clinicData={clinicData} />;
            case 2:
                return <ClinicOperatingHours onNext={handleNext} onBack={handleBack} clinicData={clinicData} />;
            case 3:
                return <FacilitiesAndServices onNext={handleNext} onBack={handleBack} clinicData={clinicData} />;
            case 4:
                return <AssignDoctorsToClinic onNext={handleNext} onBack={handleBack} clinicData={clinicData} />;
            default:
                return null;
        }
    };

    return (
        <div className="px-4 space-y-10">
            <div className="border-b border-gray-200 bg-white px-4 py-4 shadow-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold">
                            {clinicId ? 'Edit Clinic Location' : 'Add New Clinic Location'}
                        </h2>
                    </div>

                    <div className="relative">
                        <div className="hidden lg:flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.number} className="flex items-center flex-1">
                                    <div className="flex flex-col items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.number
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {step.number}
                                        </div>
                                        <span
                                            className={`text-xs font-medium ${currentStep >= step.number
                                                ? 'text-gray-900'
                                                : 'text-gray-500'
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 h-0.5 mx-6">
                                            <div
                                                className={`h-full ${currentStep > step.number
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-300'
                                                    }`}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen bg-gray-50">
                {renderStepContent()}
            </div>
        </div>
    );
}
