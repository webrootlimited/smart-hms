import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
    {
        appointmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
        },
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
        },

        codes: {
            cpt: [String],
            icd10: [String],
        },

        amount: Number,
        copay: Number,
        status: String,
    },
    { timestamps: true }
);

export default mongoose.models.Billing ||
    mongoose.model("Billing", billingSchema);
