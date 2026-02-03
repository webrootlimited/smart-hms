import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDb from "@/lib/connectToDb";
import Appointment from "@/models/appointment.model";


export async function POST(req) {
    await connectToDb();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers.get("stripe-signature");
    const buf = await req.arrayBuffer();
    const rawBody = Buffer.from(buf);

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;

            const appointmentId = session.metadata.appointmentId;

            // Mark appointment as paid
            const appointment = await Appointment.findById(appointmentId);
            if (appointment) {
                appointment.paymentInfo.status = "paid";
                appointment.paymentInfo.stripePaymentIntent = session.payment_intent;
                await appointment.save();
                console.log(`Appointment ${appointmentId} marked as PAID`);
            } else {
                console.warn(`Appointment ${appointmentId} not found`);
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
