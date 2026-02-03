import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {

        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            index: true,
        },

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
        },

        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
        },

        appointmentType: String,

        startTime: Date,
        endTime: Date,
        timezone: String,

        status: {
            type: String,
            enum: ["booked", "cancelled", "completed", "pending"],
            index: true,
            default: "pending",
        },

        isTelehealth: Boolean,

        // ── Payment Info ──
        paymentInfo: {
            method: { type: String, enum: ["card", "mobile", "bank"], default: "card" },
            status: { type: String, enum: ["pending", "succeeded", "failed"], default: "pending" },
            stripeSessionId: String,
            amount: Number,
            currency: { type: String, default: "usd" },
        },
    },
    { timestamps: true }
);

export default mongoose.models.Appointment ||
    mongoose.model("Appointment", appointmentSchema);
