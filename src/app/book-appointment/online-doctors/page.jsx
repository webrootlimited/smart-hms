'use client';

import { useSearchParams } from 'next/navigation';
import OnlineDoctors from './OnlineDoctors';
import DoctorSlots from './DoctorSlots';
import ConsultationDetailsAndPayment from './ConsultationDetailsAndPayment';
import PaymentSuccess from './PaymentSuccess';
import { Suspense } from 'react';


function PageContent() {
    const searchParams = useSearchParams();

    const doctorId = searchParams.get('doctorId');
    const tab = searchParams.get('tab');
    const selectedSlot = searchParams.get('selectedSlot');
    const date = searchParams.get('date');

    // STEP 1
    if (!doctorId || !tab) {
        return <OnlineDoctors />;
    }

    // STEP 2
    if (tab === 'select-slots') {
        return <DoctorSlots doctorId={doctorId} />;
    }

    // STEP 3
    if (tab === 'consultation-details' && selectedSlot && date) {
        return (
            <ConsultationDetailsAndPayment
                doctorId={doctorId}
                selectedSlot={selectedSlot}
                date={date}
            />
        );
    }

    // STEP 4
    if (tab === 'payment-success' && selectedSlot && date) {
        return (
            <PaymentSuccess
                doctorId={doctorId}
                selectedSlot={selectedSlot}
                date={date}
            />
        );
    }

    return <OnlineDoctors />;
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

