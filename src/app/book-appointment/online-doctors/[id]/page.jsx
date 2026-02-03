"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/layout/Loader";
import { getDoctorDetailsWithSlots } from "@/actions/doctor.actions";

import DoctorSlots from "./DoctorSlots";
import ConsultationDetailsAndPayment from "./ConsultationDetailsAndPayment";

export default function BookingFlow() {
    const { id } = useParams();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState("slots");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        if (!id) return;

        const loadDoctor = async () => {
            setLoading(true);
            try {
                const res = await getDoctorDetailsWithSlots(id);

                if (res?.success) {
                    setDoctor(res.doctor);
                }
            } catch (err) {
                console.error("Failed to load doctor slots:", err);
            } finally {
                setLoading(false);
            }
        };

        loadDoctor();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600 text-lg">Doctor or schedule not found</p>
            </div>
        );
    }

    const handleSlotSelection = (date, time) => {
        setSelectedDate(date);
        setSelectedTime(time);
        setStep("details");
    };

    return (
        <>
            {step === "slots" ? (
                <DoctorSlots doctorData={doctor} onContinue={handleSlotSelection} />
            ) : (
                <ConsultationDetailsAndPayment
                    doctorData={doctor}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    onBack={() => setStep("slots")}
                />
            )}
        </>
    );
}