'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

// Import your page components
import BasicDetails from './BasicDetails';
import ClinicOperatingHours from './OperatingHours';
import FacilitiesAndServices from './Facilities';
import AssignDoctorsToClinic from './AssignDoctors';
import Success from './Success';

export default function AddNewClinicLocation() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [isSuccess, setIsSuccess] = useState(false);

    const steps = [
        { number: 1, label: 'Basic Details' },
        { number: 2, label: 'Operating Hours' },
        { number: 3, label: 'Facilities & Services' },
        { number: 4, label: 'Assign Doctors' },
    ];

    // Sync currentStep and isSuccess based on URL params on mount and when params change
    useEffect(() => {
        const stepParam = searchParams.get('step');

        if (stepParam === 'success') {
            setIsSuccess(true);
            setCurrentStep(4); // optional: keep visual progress at last step
        } else {
            const stepNum = parseInt(stepParam || '1', 10);
            if (!isNaN(stepNum) && stepNum >= 1 && stepNum <= 4) {
                setCurrentStep(stepNum);
                setIsSuccess(false);
            } else {
                setCurrentStep(1);
                setIsSuccess(false);
            }
        }
    }, [searchParams]);

    const updateUrlStep = (newStep) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('step', newStep.toString());
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const handleNext = () => {
        if (currentStep < 4) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            updateUrlStep(nextStep);
        } else if (currentStep === 4) {
            // Final step completed → show success
            setIsSuccess(true);
            const params = new URLSearchParams(searchParams.toString());
            params.set('step', 'success');
            router.replace(`?${params.toString()}`, { scroll: false });
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            updateUrlStep(prevStep);
        }
    };

    const handleClose = () => {
        // Handle modal/close logic here
        console.log('Close modal');
    };

    // Render the current step component
    const renderStepContent = () => {
        if (isSuccess) {
            return <Success />;
        }

        switch (currentStep) {
            case 1:
                return <BasicDetails onNext={handleNext} />;
            case 2:
                return <ClinicOperatingHours onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <FacilitiesAndServices onNext={handleNext} onBack={handleBack} />;
            case 4:
                return <AssignDoctorsToClinic onNext={handleNext} onBack={handleBack} />;
            default:
                return null;
        }
    };

    return (
        <div className="px-4 space-y-10">
            {/* Progress Header */}
            <div className="border-b border-gray-200 bg-white px-4 sm:px-6 py-4 shadow-sm">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Add New Clinic Location
                        </h2>
                    </div>

                    {/* Hide progress bar on success page */}
                    {!isSuccess && (
                        <div className="relative">
                            {/* Mobile: Vertical Step List */}
                            <div className="block lg:hidden">
                                <div className="space-y-6">
                                    {steps.map((step, index) => (
                                        <div key={step.number} className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${currentStep >= step.number
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                    }`}
                                            >
                                                {step.number}
                                            </div>
                                            <div className="flex-1">
                                                <p
                                                    className={`text-sm font-medium ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                                                        }`}
                                                >
                                                    {step.label}
                                                </p>
                                                {index < steps.length - 1 && (
                                                    <div className="ml-5 mt-3 w-0.5 h-12">
                                                        <div
                                                            className={`h-full ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                                                                }`}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop: Horizontal Progress Bar */}
                            <div className="hidden lg:flex items-center justify-between">
                                {steps.map((step, index) => (
                                    <div key={step.number} className="flex items-center flex-1">
                                        <div className="flex flex-col items-center gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep >= step.number
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                    }`}
                                            >
                                                {step.number}
                                            </div>
                                            <span
                                                className={`text-xs font-medium whitespace-nowrap ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                                                    }`}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className="flex-1 h-0.5 mx-6">
                                                <div
                                                    className={`h-full transition-colors ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                                                        }`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="min-h-screen bg-gray-50">
                {renderStepContent()}
            </div>
        </div>
    );
}