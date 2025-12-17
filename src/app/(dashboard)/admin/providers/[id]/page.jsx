"use client";

import React from 'react';
import Header from './Header';
import PersonalInfo from './PersonalInfo';
import WorkSchedule from './WorkSchedule';
import Locations from './Locations';
import AppointmentRules from './AppointmentRules';
import Telehealth from './Telehealth';
import Certifications from './Certifications';
import Documents from './Documents';
import Assistants from './Assistants';

import { User, Clock, Home, Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

const Page = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const tab = searchParams.get('tab') || 'personal-info'; // default tab

    const handleTabClick = (tabName) => {
        // Update URL without reloading the page
        router.push(`?tab=${tabName}`);
    };

    return (
        <div className="p-4 space-y-10">
            {tab === 'personal-info' && <Header />}

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
                <div className="flex flex-wrap gap-3 justify-start">
                    <button
                        onClick={() => handleTabClick('personal-info')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'personal-info' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <User className="w-4 h-4" /> Personal Info
                    </button>

                    <button
                        onClick={() => handleTabClick('work-schedule')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'work-schedule' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Clock className="w-4 h-4" /> Work Schedule
                    </button>

                    <button
                        onClick={() => handleTabClick('locations')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'locations' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Home className="w-4 h-4" /> Locations
                    </button>

                    <button
                        onClick={() => handleTabClick('appointment-rules')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'appointment-rules' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Calendar className="w-4 h-4" /> Appointment Rules
                    </button>

                    <button
                        onClick={() => handleTabClick('telehealth')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'telehealth' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <Briefcase className="w-4 h-4" /> Telehealth
                    </button>

                    <button
                        onClick={() => handleTabClick('certifications')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'certifications' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <CheckCircle className="w-4 h-4" /> Certifications
                    </button>

                    <button
                        onClick={() => handleTabClick('documents')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'documents' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Documents
                    </button>

                    <button
                        onClick={() => handleTabClick('assistants')}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 ${tab === 'assistants' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Assistants
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div>
                {tab === 'personal-info' && <PersonalInfo />}
                {tab === 'work-schedule' && <WorkSchedule />}
                {tab === 'locations' && <Locations />}
                {tab === 'appointment-rules' && <AppointmentRules />}
                {tab === 'telehealth' && <Telehealth />}
                {tab === 'certifications' && <Certifications />}
                {tab === 'documents' && <Documents />}
                {tab === 'assistants' && <Assistants />}
            </div>
        </div>
    );
};

export default Page;
