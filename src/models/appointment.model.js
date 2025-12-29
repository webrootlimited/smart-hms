import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
    {
        appointmentId: { type: String, unique: true },

        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            index: true,
        },

        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
        },

        clinicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Clinic",
        },

        appointmentType: String,
        visitTypeCode: String, // CPT / HCPCS

        startTime: Date,
        endTime: Date,
        timezone: String,

        status: {
            type: String,
            enum: ["booked", "cancelled", "completed", "no-show"],
            index: true,
        },

        isTelehealth: Boolean,
    },
    { timestamps: true }
);

export default mongoose.models.Appointment ||
    mongoose.model("Appointment", appointmentSchema);
