'use client';

import { useSearchParams } from 'next/navigation';
import OnlineDoctors from './OnlineDoctors';
import DoctorSlots from './DoctorSlots';
import ConsultationDetailsAndPayment from './ConsultationDetailsAndPayment';
import PaymentSuccess from './PaymentSuccess';

export default function Page() {
    const searchParams = useSearchParams();

    const doctorId = searchParams.get('doctorId');
    const tab = searchParams.get('tab');
    const selectedSlot = searchParams.get('selectedSlot');
    const date = searchParams.get('date');

    console.log(doctorId, tab, selectedSlot, date);

    // STEP 1: No id → show doctors list
    if (!doctorId || !tab) {
        return <OnlineDoctors />;
    }

    // STEP 2: Select slot
    if (tab === 'select-slots') {
        return <DoctorSlots doctorId={doctorId} />;
    }

    // STEP 3: Consulation Details and Payment
    if (tab === 'consultation-details' && selectedSlot && date) {
        return <ConsultationDetailsAndPayment doctorId={doctorId} selectedSlot={selectedSlot} date={date} />;
    }

    // STEP 4: Payment Success
    if (tab === 'payment-success' && selectedSlot && date) {
        return <PaymentSuccess doctorId={doctorId} selectedSlot={selectedSlot} date={date} />;
    }

    // fallback
    return <OnlineDoctors />;
}
