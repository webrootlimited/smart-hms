"use server";

import Appointment from "@/models/appointment.model";
import DoctorProfile from "@/models/doctor.model";
import { generateSlots } from "@/lib/utils";
import connectToDb from "@/lib/connectToDb";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_API_SECRET);

export async function getAvailableSlotsForDoctor(doctorId, clinicId, date) {
    try {
        const doctor = await DoctorProfile.findById(doctorId);
        if (!doctor) return [];

        const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
        });

        const location = doctor.workLocations.find(
            (loc) => loc.clinic.toString() === clinicId
        );
        if (!location) return [];

        const schedule = location.schedule.find(
            (s) => s.day === dayOfWeek
        );
        if (!schedule) return [];

        // Generate all slots
        let slots = generateSlots(schedule, doctor.slotDuration);

        // Fetch booked appointments for the day
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const appointments = await Appointment.find({
            doctorId,
            clinicId,
            startTime: { $gte: startOfDay, $lt: endOfDay },
            status: "booked",
        });

        // Remove booked slots
        slots = slots.filter(
            (slot) =>
                !appointments.some(
                    (a) => slot.start < a.endTime && slot.end > a.startTime
                )
        );

        return { success: true, slots };
    } catch (error) {
        console.error("❌ Error getting available slots:", error);
        return { success: false, message: error.message || "Failed to get available slots" };
    }
}


export async function createAppointmentAndStripeSession({
    doctorId,
    doctorName,
    consultationReason,
    language,
    files,
    selectedPaymentMethod,
    dateTime,
    amount,
}) {
    await connectToDb();

    // ✅ Validate & normalize date (UTC)
    const startTime = new Date(dateTime);

    if (isNaN(startTime.getTime())) {
        throw new Error(`Invalid dateTime received: ${dateTime}`);
    }

    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

    // ✅ Create appointment with PENDING payment
    const appointment = await Appointment.create({
        doctorId,
        appointmentType: "Consultation",
        startTime,
        endTime,
        consultationReason,
        language,
        isTelehealth: true,
        paymentInfo: {
            method: selectedPaymentMethod,
            status: "pending",
            amount: Math.round(amount * 100),
            currency: "usd",
        },
    });

    // ✅ Stripe Checkout Session (2025+ compatible)
    const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Consultation with Dr. ${doctorName}`,
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/book-apppoitnment/online-doctors/${doctorId}/success?appointmentId=${appointment._id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/book-apppoitnment/online-doctors/${doctorId}/cancel?appointmentId=${appointment._id}`,
        metadata: {
            appointmentId: appointment._id.toString(),
            doctorId,
        },
    });

    // ✅ Save Stripe session ID
    appointment.paymentInfo.stripeSessionId = session.id;
    await appointment.save();

    // ✅ IMPORTANT: return checkout URL (NOT sessionId)
    return {
        appointmentId: appointment._id,
        checkoutUrl: session.url,
    };
}

